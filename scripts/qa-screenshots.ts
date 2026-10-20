/**
 * Visual QA matrix: captures key pages at the required viewports into
 * artifacts/screenshots/{viewport}/{page}.png plus a contact sheet per viewport,
 * and reports horizontal overflow.
 *
 *   BASE_URL=http://localhost:3310 pnpm qa:screens [--full]
 */
import { chromium, type Page } from "playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const full = process.argv.includes("--full");
const out = path.join(process.cwd(), "artifacts/screenshots");

const viewports = [
  { name: "360x780", width: 360, height: 780, mobile: true },
  { name: "390x844", width: 390, height: 844, mobile: true },
  { name: "430x932", width: 430, height: 932, mobile: true },
  { name: "768x1024", width: 768, height: 1024, mobile: true },
  { name: "1024x768", width: 1024, height: 768, mobile: false },
  { name: "1440x900", width: 1440, height: 900, mobile: false },
];

type Shot = { name: string; path: string; action?: (page: Page) => Promise<void>; fullPage?: boolean };

const shots: Shot[] = [
  { name: "home", path: "/ru" },
  { name: "home-work", path: "/ru", action: async (p) => { await p.locator("#work").scrollIntoViewIfNeeded(); await p.waitForTimeout(400); } },
  { name: "home-en", path: "/en" },
  { name: "work", path: "/ru/work" },
  { name: "work-filtered", path: "/ru/work?type=landing" },
  { name: "work-detail", path: "/ru/work/restaurant-tablefork" },
  { name: "service", path: "/ru/services/websites" },
  { name: "special", path: "/ru/special" },
  { name: "contact", path: "/ru/contact" },
  { name: "blog-article", path: "/ru/blog/kakoy-sayt-nuzhen-biznesu" },
  { name: "about", path: "/ru/about" },
  { name: "404", path: "/ru/missing-page" },
  {
    name: "menu-open",
    path: "/ru",
    action: async (p) => {
      const button = p.getByRole("button", { name: "Открыть меню" });
      if (await button.isVisible()) {
        await button.click();
        await p.waitForTimeout(500);
      }
    },
    fullPage: false,
  },
];

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  const report: string[] = [];
  for (const vp of viewports) {
    const dir = path.join(out, vp.name);
    await mkdir(dir, { recursive: true });
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      isMobile: vp.mobile && vp.width < 768,
      hasTouch: vp.mobile,
      // Scroll-driven reveals never run in a full-page capture; show final state.
      reducedMotion: full ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    const tiles: Buffer[] = [];
    for (const shot of shots) {
      await page.goto(BASE + shot.path, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      if (full) {
        // Walk the page so lazy images load before a full-page capture.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 500) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(300);
      }
      if (shot.action) await shot.action(page);
      else await page.waitForTimeout(300);
      // body uses overflow-x: clip, so lift it to measure real overflow.
      const overflow = await page.evaluate(() => {
        document.body.style.overflowX = "visible";
        const w = document.documentElement.scrollWidth - window.innerWidth;
        document.body.style.overflowX = "";
        return w;
      });
      if (overflow > 0) report.push(`OVERFLOW ${vp.name} ${shot.name}: +${overflow}px`);
      const fullPage = full && shot.fullPage !== false && !shot.action;
      const buf = await page.screenshot({ fullPage });
      await writeFile(path.join(dir, `${shot.name}.png`), buf);
      tiles.push(await sharp(buf).resize({ width: 360, height: 640, fit: "contain", position: "top", background: "#222" }).png().toBuffer());
    }
    // Contact sheet: first screen of every page for this viewport.
    const cols = 5;
    const rows = Math.ceil(tiles.length / cols);
    await sharp({ create: { width: cols * 370, height: rows * 650, channels: 3, background: "#444" } })
      .composite(tiles.map((input, i) => ({ input, left: (i % cols) * 370, top: Math.floor(i / cols) * 650 })))
      .jpeg({ quality: 80 })
      .toFile(path.join(out, `sheet-${vp.name}.jpg`));
    await context.close();
    console.log(`✓ ${vp.name}`);
  }
  await browser.close();
  console.log(report.length ? report.join("\n") : "No horizontal overflow detected.");
}

main();
