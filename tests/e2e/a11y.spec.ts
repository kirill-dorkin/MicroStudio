import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/ru",
  "/en",
  "/ru/services",
  "/ru/services/advertising",
  "/ru/work",
  "/ru/work/photo-lumen",
  "/ru/about",
  "/ru/blog",
  "/ru/blog/sayt-i-reklama-posle-klika",
  "/ru/special",
  "/ru/contact",
  "/ru/privacy",
  "/en/contact",
];

for (const path of pages) {
  test(`35/a11y: ${path} has no WCAG A/AA violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
    expect(summary).toEqual([]);
  });
}
