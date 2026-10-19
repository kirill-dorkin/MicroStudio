import { expect, test } from "@playwright/test";
import { watchConsole } from "./helpers";

test.describe("routing and locales", () => {
  test("1. RU home loads with hero and CTA above the fold", async ({ page }) => {
    await page.goto("/ru");
    await expect(page).toHaveTitle(/MicroStudio/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Сайты, с которых клиенты пишут вам в WhatsApp");
    const cta = page.locator("main").getByRole("link", { name: /Написать в WhatsApp/ }).first();
    await expect(cta).toBeInViewport();
    await expect(cta).toHaveAttribute("href", /^https:\/\/wa\.me\/996700779919\?text=/);
  });

  test("2. EN home loads in English", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Websites that get customers messaging you on WhatsApp");
  });

  test("3. root redirects to /ru", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/ru$/);
  });

  test("4b. language switch keeps the selected service and project", async ({ page }) => {
    await page.goto("/ru/contact?service=special");
    await page.getByRole("link", { name: /Switch to English/ }).first().click();
    await expect(page).toHaveURL(/\/en\/contact\?service=special/);
    await expect(page.getByRole("radio", { name: /One-page website for 1,500/ })).toBeChecked();
    await page.goto("/en/contact?project=photo-lumen");
    await page.getByRole("link", { name: /Перейти на русский/ }).first().click();
    await expect(page).toHaveURL(/\/ru\/contact\?project=photo-lumen/);
    await expect(page.locator("output")).toContainText("Lumen — сайт фотографа");
  });

  test("4. language switch keeps the equivalent page", async ({ page }) => {
    await page.goto("/ru/work/photo-lumen");
    await page.getByRole("link", { name: "Switch to English" }).first().click();
    await expect(page).toHaveURL(/\/en\/work\/photo-lumen$/);
    await page.goto("/ru/blog/kakoy-sayt-nuzhen-biznesu");
    await page.getByRole("link", { name: "Switch to English" }).first().click();
    await expect(page).toHaveURL(/\/en\/blog\/which-website-for-your-business$/);
    await page.getByRole("link", { name: "Перейти на русский" }).first().click();
    await expect(page).toHaveURL(/\/ru\/blog\/kakoy-sayt-nuzhen-biznesu$/);
  });

  test("5. header navigation reaches every section", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop header");
    await page.goto("/ru");
    const nav = page.getByRole("navigation", { name: "Основное меню" });
    for (const [name, url] of [
      ["Услуги", /\/ru\/services$/],
      ["Проекты", /\/ru\/work$/],
      ["О студии", /\/ru\/about$/],
      ["Блог", /\/ru\/blog$/],
      ["Контакты", /\/ru\/contact$/],
    ] as const) {
      await nav.getByRole("link", { name }).click();
      await expect(page).toHaveURL(url);
    }
    const wa = page.getByRole("banner").getByRole("link", { name: /WhatsApp/ });
    await expect(wa).toHaveAttribute("href", /^https:\/\/wa\.me\/996700779919\?text=/);
    await expect(wa).toHaveAttribute("target", "_blank");
  });

  test("31. unknown page renders localized 404", async ({ page }) => {
    const res = await page.goto("/en/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page doesn’t exist");
    const ru = await page.goto("/ru/net-takoy");
    expect(ru?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Такой страницы нет");
  });

  test("41–42. no console errors or hydration warnings", async ({ page }) => {
    const problems = watchConsole(page);
    for (const path of ["/ru", "/en", "/ru/work", "/ru/work/fashion-store", "/ru/services/design", "/ru/contact", "/en/blog/getting-ready-for-a-website", "/ru/special", "/ru/about", "/ru/privacy"]) {
      await page.goto(path, { waitUntil: "networkidle" });
    }
    expect(problems).toEqual([]);
  });
});

test.describe("mobile menu", () => {
  test.beforeEach(({ isMobile }) => test.skip(!isMobile, "mobile only"));

  test("6–8. opens, traps focus, closes with Esc and restores focus", async ({ page }) => {
    await page.goto("/ru");
    const button = page.getByRole("button", { name: "Открыть меню" });
    await button.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await expect(dialog.getByRole("link", { name: "Услуги" })).toBeFocused();
    // Shift+Tab from the first item wraps to the last focusable element.
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.locator("a").last()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Открыть меню" })).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });

  test("mobile menu links navigate and close the menu", async ({ page }) => {
    await page.goto("/ru");
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Блог" }).click();
    await expect(page).toHaveURL(/\/ru\/blog$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
