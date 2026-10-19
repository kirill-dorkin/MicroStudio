import type { Page } from "@playwright/test";

export const ownSlugs = [
  "best-electronics-link",
  "best-electronics-store",
  "anna-art",
  "jarjar",
  "nova-ielts",
  "tikitaki",
];

export const projectSlugs = [
  "fashion-store",
  "restaurant-tablefork",
  "photo-lumen",
  "saas-launchpad",
  "dashboard-pulse",
  "startup-ignite",
  "blog-nova",
];

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
