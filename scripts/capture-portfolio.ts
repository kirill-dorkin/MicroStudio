/**
 * Captures real screenshots of every open-source demo listed in
 * src/data/portfolio.json and writes them to public/portfolio/.
 *
 *   pnpm capture:portfolio            # all projects
 *   pnpm capture:portfolio photo-lumen  # selected slugs
 *
 * Output per project:
 *   {slug}.webp          desktop first screen, 1440x900 @2x
 *   {slug}-detail.webp   desktop, one screen further down the page
 *   {slug}-mobile.webp   mobile first screen, 390x844 @2x
 *   {slug}-og.jpg        1200x630 crop of the desktop shot
 * and src/data/capture-manifest.json with source URL, time, status and SHA-256.
 *
 * Uses the locally installed Google Chrome (channel "chrome"): Playwright's
 * bundled Chromium no longer supports older macOS releases.
 */
import { chromium, type Browser, type Page } from "playwright";
import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Project = { slug: string; demo: string; captureRoute: string };

const root = process.cwd();
const outDir = path.join(root, "public/portfolio");
const manifestPath = path.join(root, "src/data/capture-manifest.json");

const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important; animation-delay: 0s !important;
    transition-duration: 0s !important; transition-delay: 0s !important;
    caret-color: transparent !important; scroll-behavior: auto !important;
  }
`;

async function settle(page: Page) {
  await page.addStyleTag({ content: FREEZE_CSS });
  await page.evaluate(() => document.fonts.ready);
  // Walk down the page so scroll-triggered reveals and lazy images run.
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.6));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1200);
}

async function shoot(
  browser: Browser,
  url: string,
  viewport: { width: number; height: number },
  isMobile: boolean,
  scrollScreens = 0,
) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    isMobile,
    hasTouch: isMobile,
    colorScheme: "light",
    locale: "en-US",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    const response = await page.goto(url, { waitUntil: "load", timeout: 60_000 });
    if (!response || !response.ok()) {
      throw new Error(`HTTP ${response?.status() ?? "no response"}`);
    }
    await settle(page);
    if (scrollScreens) {
      await page.evaluate((y) => window.scrollTo(0, y), viewport.height * scrollScreens);
      await page.waitForTimeout(800);
    }
    return await page.screenshot({ type: "png" });
  } finally {
    await context.close();
  }
}

const sha = (buf: Buffer) => createHash("sha256").update(buf).digest("hex");

async function main() {
  const projects: Project[] = JSON.parse(
    await readFile(path.join(root, "src/data/portfolio.json"), "utf8"),
  );
  const only = process.argv.slice(2);
  const selected = only.length ? projects.filter((p) => only.includes(p.slug)) : projects;

  await mkdir(outDir, { recursive: true });
  let manifest: Record<string, unknown> = {};
  try {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch {}

  const browser = await chromium.launch({ channel: "chrome" });
  let failures = 0;

  for (const project of selected) {
    const url = new URL(project.captureRoute, project.demo).toString();
    process.stdout.write(`→ ${project.slug} (${url}) … `);
    try {
      const desktop = await shoot(browser, url, { width: 1440, height: 900 }, false);
      const detail = await shoot(browser, url, { width: 1440, height: 900 }, false, 1);
      const mobile = await shoot(browser, url, { width: 390, height: 844 }, true);

      const files = {
        desktop: await sharp(desktop).resize({ width: 2160 }).webp({ quality: 82 }).toBuffer(),
        detail: await sharp(detail).resize({ width: 2160 }).webp({ quality: 82 }).toBuffer(),
        mobile: await sharp(mobile).webp({ quality: 82 }).toBuffer(),
        og: await sharp(desktop)
          .resize({ width: 1200, height: 630, fit: "cover", position: "top" })
          .jpeg({ quality: 84, mozjpeg: true })
          .toBuffer(),
      };
      const names = {
        desktop: `${project.slug}.webp`,
        detail: `${project.slug}-detail.webp`,
        mobile: `${project.slug}-mobile.webp`,
        og: `${project.slug}-og.jpg`,
      };
      for (const key of Object.keys(files) as (keyof typeof files)[]) {
        await writeFile(path.join(outDir, names[key]), files[key]);
      }
      manifest[project.slug] = {
        source: project.demo,
        url,
        capturedAt: new Date().toISOString(),
        status: "ok",
        browser: "Google Chrome (Playwright, channel chrome)",
        viewports: { desktop: "1440x900@2x", mobile: "390x844@2x" },
        files: Object.fromEntries(
          (Object.keys(files) as (keyof typeof files)[]).map((k) => [
            names[k],
            { sha256: sha(files[k]), bytes: files[k].length },
          ]),
        ),
      };
      console.log("ok");
    } catch (error) {
      failures++;
      manifest[project.slug] = {
        source: project.demo,
        url,
        capturedAt: new Date().toISOString(),
        status: "failed",
        error: String(error),
      };
      console.log(`FAILED: ${error}`);
    }
  }

  await browser.close();
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  if (failures) {
    console.error(`${failures} capture(s) failed — see capture-manifest.json`);
    process.exit(1);
  }
}

main();
