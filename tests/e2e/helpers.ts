import type { Page } from "@playwright/test";

import portfolio from "../../src/data/portfolio.json";

/** Published projects, in editorial order. */
export const published = portfolio.map((p) => ({ slug: p.slug, name: p.title.ru, nameEn: p.title.en, type: p.workType, format: p.format, demoUrl: p.demoUrl, hosting: p.hosting }));
export const legacyHidden = ["fashion-store", "dashboard-pulse", "anna-art", "jarjar", "nova-ielts", "best-electronics-store"];

export async function openMenuIfMobile(page: Page, label: string) {
  const button = page.getByRole("button", { name: label });
  if (await button.isVisible()) await button.click();
}

/** Collects console errors and React hydration warnings on a page. */
export function watchConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error" || /hydrat/i.test(text)) problems.push(`${msg.type()}: ${text}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  return problems;
}
