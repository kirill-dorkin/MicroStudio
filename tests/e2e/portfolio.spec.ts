import { expect, test } from "@playwright/test";
import { projectSlugs } from "./helpers";

test("9. home shows four selected demos with badges", async ({ page }) => {
  await page.goto("/ru");
  const items = page.locator("#work li");
  await expect(items).toHaveCount(4);
  for (const name of ["Storefront", "Table & Fork", "Lumen", "LaunchPad"]) {
    await expect(page.locator("#work").getByRole("heading", { name: new RegExp(name) })).toBeVisible();
  }
  await expect(page.locator("#work").getByText("Открытое демо")).toHaveCount(4);
});

test("10. work page shows all seven demos and the disclaimer", async ({ page }) => {
  await page.goto("/ru/work");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Проекты и примеры");
  await expect(page.getByText("Это не клиентские кейсы MicroStudio.", { exact: false })).toBeVisible();
  await expect(page.locator("main ul li article")).toHaveCount(7);
});

test("11–16. category filter updates list and URL without reload", async ({ page }) => {
  await page.goto("/ru/work");
  const group = page.getByRole("group", { name: "Фильтр по типу проекта" });
  const cards = page.locator("main ul li article");
  const cases: [string, string, number][] = [
    ["Интернет-магазины", "ecommerce", 1],
    ["Сайты для бизнеса", "business", 1],
    ["Лендинги", "landing", 2],
    ["Веб-приложения", "webapp", 1],
    ["Портфолио", "portfolio", 1],
    ["Контентные сайты", "content", 1],
  ];
  const before = await page.evaluate(() => window.scrollY);
  for (const [label, type, count] of cases) {
    await group.getByRole("button", { name: new RegExp(`^${label}`) }).click();
    await expect(page).toHaveURL(new RegExp(`\\?type=${type}$`));
    await expect(cards).toHaveCount(count);
    await expect(group.getByRole("button", { name: new RegExp(`^${label}`) })).toHaveAttribute("aria-pressed", "true");
  }
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(5);
  await page.reload();
  await expect(cards).toHaveCount(1);
  await expect(group.getByRole("button", { name: /^Контентные сайты/ })).toHaveAttribute("aria-pressed", "true");
  await group.getByRole("button", { name: /^Все/ }).click();
  await expect(page).toHaveURL(/\/ru\/work$/);
  await expect(cards).toHaveCount(7);
});

test("17. every card opens its detail page", async ({ page }) => {
  await page.goto("/ru/work");
  for (const slug of projectSlugs) {
    await page.locator(`main a[href="/ru/work/${slug}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/ru/work/${slug}$`));
    await page.goBack();
  }
});

for (const slug of projectSlugs) {
  test(`18–21. detail ${slug}: disclosure, demo, source, licence`, async ({ page }) => {
    await page.goto(`/ru/work/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("не работа для клиента MicroStudio", { exact: false })).toBeVisible();
    await expect(page.getByText("Не разработано для заказчика MicroStudio.")).toBeVisible();

    const demo = page.getByRole("link", { name: /Открыть живое демо/ });
    await expect(demo).toHaveAttribute("target", "_blank");
    await expect(demo).toHaveAttribute("rel", "noopener noreferrer");
    await expect(demo).toHaveAttribute("href", /^https:\/\/.+\.(vercel\.app|pages\.dev)\/$/);

    const gh = page.getByRole("link", { name: /^GitHub/ });
    await expect(gh).toHaveAttribute("href", /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/);
    await expect(page.getByRole("link", { name: /MIT — Текст лицензии/ })).toHaveAttribute("href", /\/LICENSE$/);

    // All three screenshots are real, loaded images.
    const images = page.locator("main img");
    await expect(images).toHaveCount(3);
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(250);
    }
  });
}

test("EN detail is fully translated", async ({ page }) => {
  await page.goto("/en/work/dashboard-pulse");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pulse — analytics dashboard");
  await expect(page.getByText("Not developed for a MicroStudio client.")).toBeVisible();
});
