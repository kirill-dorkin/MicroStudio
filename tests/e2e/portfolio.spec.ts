import { expect, test } from "@playwright/test";
import { legacyHidden, published } from "./helpers";

const cards = (page: import("@playwright/test").Page) => page.locator("main ul > li > article");

test("9. home shows an even set of featured projects with demo and case links", async ({ page }) => {
  await page.goto("/ru");
  const work = page.locator("#work");
  const count = await work.locator("article").count();
  expect(count).toBeGreaterThanOrEqual(4);
  expect(count % 2).toBe(0);
  for (const card of await work.locator("article").all()) {
    await expect(card.getByRole("link", { name: /Открыть (демо|сайт)/ })).toHaveAttribute("target", "_blank");
    await expect(card.getByRole("link", { name: /Подробнее/ })).toHaveAttribute("href", /^\/ru\/work\/[a-z0-9-]+$/);
    await expect(card.getByText(/Демо-проект|Клиентский проект|Собственный продукт/)).toBeVisible();
  }
});

test("10. catalogue lists every published project with the counter", async ({ page }) => {
  await page.goto("/ru/work");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Проекты");
  await expect(cards(page)).toHaveCount(Math.min(12, published.length));
  await expect(page.getByRole("status")).toContainText(`${published.length} из ${published.length}`);
});

test("11–16. search, filters, sort and reset keep state in the URL and history", async ({ page, isMobile }) => {
  await page.goto("/ru/work");
  if (isMobile) await page.getByRole("button", { name: "Показать фильтры" }).click();
  const shops = published.filter((p) => p.format === "shop").length;
  await page.getByLabel("Формат").selectOption("shop");
  await expect(page).toHaveURL(/\?format=shop$/);
  await expect(cards(page)).toHaveCount(Math.min(12, shops));

  await page.getByLabel("Формат").selectOption("");
  const demos = published.filter((p) => p.type === "demo").length;
  await page.getByLabel("Тип работы").selectOption("demo");
  await expect(cards(page)).toHaveCount(Math.min(12, demos));
  await page.getByLabel("Сортировка").selectOption("az");
  await expect(page).toHaveURL(/type=demo&sort=az/);
  const names = await page.locator("main ul > li > article h3").allTextContents();
  expect([...names].sort((a, b) => a.localeCompare(b, "ru"))).toEqual(names);

  // Back restores the previous filter set.
  await page.goBack();
  await expect(page).toHaveURL(/\?type=demo$/);
  await expect(cards(page)).toHaveCount(Math.min(12, demos));

  // Search runs over the registry; an impossible query shows the empty state.
  await page.getByLabel("Поиск по проектам").fill("мебель");
  await expect(page).toHaveURL(/q=/);
  await expect(cards(page)).toHaveCount(1);
  await page.getByLabel("Поиск по проектам").fill("несуществующее слово");
  await expect(page.getByText("По этим условиям проектов нет.")).toBeVisible();
  await page.getByRole("button", { name: "Сбросить" }).last().click();
  await expect(page).toHaveURL(/\/ru\/work$/);
  await expect(cards(page)).toHaveCount(Math.min(12, published.length));
});

test("filters survive reload and returning from a case page", async ({ page }) => {
  await page.goto("/ru/work?format=app");
  const apps = published.filter((p) => p.format === "app").length;
  await expect(cards(page)).toHaveCount(apps);
  await page.locator("main ul > li > article").first().getByRole("link", { name: /Подробнее/ }).click();
  await expect(page).toHaveURL(/\/ru\/work\/[a-z0-9-]+$/);
  await page.goBack();
  await expect(page).toHaveURL(/\?format=app$/);
  await expect(cards(page)).toHaveCount(apps);
});

for (const p of published) {
  test(`case ${p.slug}: type, demo link, gallery, origin`, async ({ page }) => {
    await page.goto(`/ru/work/${p.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.name);
    const demo = page.locator("main").getByRole("link", { name: /Открыть (демо|сайт)/ }).first();
    await expect(demo).toHaveAttribute("href", p.demoUrl);
    await expect(demo).toHaveAttribute("rel", "noopener noreferrer");
    if (p.hosting === "showcase") expect(new URL(p.demoUrl).host).toMatch(/^ms-[a-z0-9-]+\.vercel\.app$/);
    const wa = page.locator("main").getByRole("link", { name: /Обсудить похожий проект/ }).first();
    expect(new URL((await wa.getAttribute("href"))!).searchParams.get("text")).toBe(`Здравствуйте! Интересует решение, похожее на «${p.name}».`);
    await expect(page.getByRole("heading", { name: "Что сделала MicroStudio" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Происхождение" })).toBeVisible();
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth), { timeout: 15_000 }).toBeGreaterThan(64);
    }
  });
}

test("hidden legacy case pages redirect to the catalogue", async ({ page }) => {
  for (const slug of legacyHidden.filter((s) => !published.some((p) => p.slug === s))) {
    await page.goto(`/ru/work/${slug}`);
    await expect(page).toHaveURL(/\/ru\/work$/);
  }
});

test("EN case page is translated", async ({ page }) => {
  const p = published[0];
  await page.goto(`/en/work/${p.slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.nameEn);
  await expect(page.getByRole("heading", { name: "What MicroStudio did" })).toBeVisible();
});
