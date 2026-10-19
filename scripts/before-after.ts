/**
 * Captures home, special offer and contact pages (first screen + full page)
 * on desktop and phone for before/after comparisons.
 *
 *   BASE_URL=http://localhost:3000 tsx scripts/before-after.ts before|after
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const label = process.argv[2] ?? "after";
const out = path.join(process.cwd(), "docs/qa", label);
const pages = { home: "/ru", special: "/ru/special", contact: "/ru/contact" };
const viewports = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true },
];

async function main() {
  await mkdir(out, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const [name, url] of Object.entries(pages)) {
      await page.goto(BASE + url, { waitUntil: "networkidle" });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      const first = await page.screenshot();
      await sharp(first).webp({ quality: 75 }).toFile(path.join(out, `${name}-${vp.name}-first.webp`));
      const full = await page.screenshot({ fullPage: true });
      await sharp(full)
        .resize({ width: vp.mobile ? 390 : 1000 })
        .webp({ quality: 62 })
        .toFile(path.join(out, `${name}-${vp.name}-full.webp`));
    }
    await context.close();
  }
  await browser.close();
  console.log(`Saved to docs/qa/${label}`);
}

main();
