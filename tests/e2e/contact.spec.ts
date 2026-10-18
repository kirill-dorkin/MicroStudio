import { expect, test } from "@playwright/test";

test.describe("contact brief", () => {
  test("46. keyboard validation focuses the first missing field", async ({ page }) => {
    await page.goto("/ru/contact");
    await page.getByRole("button", { name: "Перейти в WhatsApp с сообщением" }).click();
    // Every missing field is reported; focus goes to the first one.
    await expect(page.locator("main").getByRole("alert")).toHaveText([
      "Выберите тип проекта",
      "Подтвердите, что отправите сообщение самостоятельно",
    ]);
    await expect(page.getByRole("radio", { name: "Одностраничный сайт" })).toBeFocused();
    await page.keyboard.press("Space");
    await expect(page.getByRole("radio", { name: "Одностраничный сайт" })).toBeChecked();
    await page.getByRole("button", { name: "Перейти в WhatsApp с сообщением" }).click();
    await expect(page.locator("main").getByRole("alert")).toHaveText("Подтвердите, что отправите сообщение самостоятельно");
    await expect(page.getByRole("checkbox")).toBeFocused();
  });

  test("30. WhatsApp opens wa.me with the encoded brief", async ({ page }) => {
    await page.goto("/ru/contact");
    await page.getByText("Интернет-магазин или каталог", { exact: true }).click();
    await page.getByLabel("Что хотите сделать?").fill("Магазин обуви & аксессуаров");
    await page.getByText("до 10 000 сом").click().catch(async () => page.getByText(/до 10/).click());
    await page.getByRole("checkbox").check();
    await expect(page.locator("output")).toContainText("Магазин обуви & аксессуаров");
    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Перейти в WhatsApp с сообщением" }).click();
    const popup = await popupPromise;
    const url = popup.url();
    await popup.close();
    // wa.me may redirect to api.whatsapp.com; the number and text must survive.
    expect(url).toMatch(/996700779919/);
    const text = new URL(url).searchParams.get("text");
    expect(text).toContain("Интернет-магазин или каталог");
    expect(text).toContain("Магазин обуви & аксессуаров");
    await expect(page.getByText("Открываем WhatsApp", { exact: false })).toBeVisible();
    await expect(page.getByText(/заявка отправлена|сообщение отправлено/i)).toHaveCount(0);
  });

  test("27–28. Instagram path copies text and reports success only after a real copy", async ({ page, context, browserName }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/ru/contact");
    await page.getByText("Сайт компании", { exact: true }).click();
    await page.getByText("Instagram", { exact: true }).first().click();
    await page.getByRole("checkbox").check();
    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Скопировать и открыть Instagram" }).click();
    const popup = await popupPromise;
    expect(popup.url()).toMatch(/instagram\.com\/microstudio_official/);
    await popup.close();
    await expect(page.getByText("Текст скопирован. Вставьте его в сообщение в Instagram.")).toBeVisible();
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    expect(clip).toContain("Сайт компании");
  });

  test("27b. failed copy shows manual fallback instead of success", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("denied")) },
      });
    });
    await page.goto("/ru/contact");
    await page.getByText("Дизайн и UX", { exact: true }).click();
    await page.getByRole("button", { name: "Скопировать текст" }).click();
    await expect(page.getByText("Не удалось скопировать автоматически", { exact: false })).toBeVisible();
    await expect(page.getByText("Текст скопирован", { exact: false })).toHaveCount(0);
  });

  test("47–48. direct channels point to the real profiles", async ({ page }) => {
    await page.goto("/ru/contact");
    const direct = page.locator("section", { has: page.getByRole("heading", { name: "Или напишите напрямую" }) });
    await expect(direct.getByRole("link", { name: /Instagram/ })).toHaveAttribute("href", "https://www.instagram.com/microstudio_official/");
    await expect(direct.getByRole("link", { name: /WhatsApp/ })).toHaveAttribute("href", "https://wa.me/996700779919");
    await expect(direct.getByRole("link", { name: /Телефон/ })).toHaveAttribute("href", "tel:+996700779919");
  });

  test("EN brief produces an English message", async ({ page }) => {
    await page.goto("/en/contact?service=advertising");
    await expect(page.getByRole("radio", { name: "Advertising and analytics" })).toBeChecked();
    await expect(page.locator("output")).toContainText("I'd like to discuss a project: Advertising and analytics.");
  });
});
