import { expect, test } from "@playwright/test";

const waText = (href: string | null) => new URL(href!).searchParams.get("text") ?? "";

test.describe("contact page and brief", () => {
  test("direct WhatsApp is visible at the top without filling anything", async ({ page }) => {
    await page.goto("/ru/contact");
    const wa = page.locator("main").getByRole("link", { name: /Написать в WhatsApp/ }).first();
    await expect(wa).toBeInViewport();
    expect(waText(await wa.getAttribute("href"))).toContain("Хочу обсудить проект для моего бизнеса");
    // No mandatory consent checkbox anywhere.
    await expect(page.getByRole("checkbox")).toHaveCount(0);
  });

  test("46. brief works from the keyboard and never blocks WhatsApp", async ({ page }) => {
    await page.goto("/ru/contact");
    const send = page.getByRole("link", { name: /Открыть WhatsApp с сообщением/ });
    // Even with nothing selected there is a usable message.
    expect(waText(await send.getAttribute("href"))).toContain("Здравствуйте, MicroStudio!");
    await page.getByRole("radio", { name: "Лендинг или сайт компании" }).focus();
    await page.keyboard.press("Space");
    await expect(page.getByRole("radio", { name: "Лендинг или сайт компании" })).toBeChecked();
    await expect(page).toHaveURL(/service=company/);
    expect(waText(await send.getAttribute("href"))).toContain("Лендинг или сайт компании");
  });

  test("30. WhatsApp link carries the encoded brief; no fake 'sent' state", async ({ page }) => {
    await page.goto("/ru/contact");
    await page.getByText("Интернет-магазин или каталог", { exact: true }).click();
    await page.getByLabel("Коротко о задаче").fill("Магазин обуви & аксессуаров");
    await page.getByText("до 10 000 сом").click();
    await expect(page.locator("output")).toContainText("Магазин обуви & аксессуаров");
    const send = page.getByRole("link", { name: /Открыть WhatsApp с сообщением/ });
    const text = waText(await send.getAttribute("href"));
    expect(text).toContain("Интернет-магазин или каталог");
    expect(text).toContain("Магазин обуви & аксессуаров");
    expect(text).toContain("до 10");
    await expect(send).toHaveAttribute("target", "_blank");
    const popupPromise = page.waitForEvent("popup");
    await send.click();
    const popup = await popupPromise;
    expect(popup.url()).toMatch(/996700779919/);
    await popup.close();
    await expect(page.getByText("Сообщение уйдёт, когда вы нажмёте «Отправить»", { exact: false })).toBeVisible();
    await expect(page.getByText(/заявка отправлена|сообщение отправлено/i)).toHaveCount(0);
  });

  test("special offer hides the budget question", async ({ page }) => {
    await page.goto("/ru/contact?service=special");
    await expect(page.getByRole("radio", { name: /Одностраничный сайт за 1/ })).toBeChecked();
    await expect(page.getByText("Ориентир по бюджету")).toHaveCount(0);
    await page.getByRole("radio", { name: "Лендинг или сайт компании" }).check({ force: true });
    await expect(page.getByText("Ориентир по бюджету")).toBeVisible();
  });

  test("27–28. Instagram path copies text and reports success only after a real copy", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/ru/contact?service=company");
    await page.getByRole("radio", { name: "Instagram" }).check({ force: true });
    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("button", { name: "Скопировать и открыть Instagram" }).click();
    const popup = await popupPromise;
    expect(popup.url()).toMatch(/instagram\.com\/microstudio_official/);
    await popup.close();
    await expect(page.getByText("Текст скопирован. Вставьте его в сообщение в Instagram.")).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Лендинг или сайт компании");
  });

  test("27b. failed copy shows manual fallback instead of success", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("denied")) },
      });
    });
    await page.goto("/ru/contact?service=design");
    await page.getByRole("button", { name: "Скопировать текст" }).click();
    await expect(page.getByText("Не удалось скопировать автоматически", { exact: false })).toBeVisible();
    await expect(page.getByText("Текст скопирован", { exact: false })).toHaveCount(0);
  });

  test("project from a portfolio page travels into the brief and can be removed", async ({ page }) => {
    await page.goto("/ru/work/saima-hotel");
    await page.getByRole("link", { name: "Заполнить бриф с этим примером" }).click();
    await expect(page).toHaveURL(/\/ru\/contact\?project=saima-hotel/);
    await expect(page.locator("output")).toContainText("Saima — бутик-отель в Бишкеке");
    await page.getByRole("button", { name: /Убрать пример/ }).click();
    await expect(page.locator("output")).not.toContainText("Saima");
    await expect(page).not.toHaveURL(/project=/);
  });

  test("47–48. direct channels point to the real profiles", async ({ page }) => {
    await page.goto("/ru/contact");
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: /@microstudio_official/ })).toHaveAttribute("href", "https://www.instagram.com/microstudio_official/");
    await expect(main.getByRole("link", { name: /Телефон/ })).toHaveAttribute("href", "tel:+996700779919");
  });

  test("EN brief produces an English message", async ({ page }) => {
    await page.goto("/en/contact?service=marketing");
    await expect(page.getByRole("radio", { name: "Launch, ads and analytics" })).toBeChecked();
    await expect(page.locator("output")).toContainText("I'd like to discuss a project: Launch, ads and analytics.");
  });
});

test.describe("WhatsApp context from other pages", () => {
  test("special offer: one tap opens WhatsApp with offer and price", async ({ page }) => {
    await page.goto("/ru/special");
    const cta = page.locator("main").getByRole("link", { name: /Хочу сайт за 1/ }).first();
    await expect(cta).toBeInViewport();
    const text = waText(await cta.getAttribute("href"));
    expect(text).toContain("одностраничный сайт за 1 500 сом");
    await page.goto("/en/special");
    const en = page.locator("main").getByRole("link", { name: /I want a site for 1,500/ }).first();
    expect(waText(await en.getAttribute("href"))).toContain("one-page website for 1,500");
  });

  test("project page: 'discuss a similar project' names the example", async ({ page }) => {
    await page.goto("/ru/work/marby-realty");
    const cta = page.locator("main").getByRole("link", { name: /Обсудить похожий проект/ }).first();
    expect(waText(await cta.getAttribute("href"))).toBe("Здравствуйте! Интересует решение, похожее на «Marby — агентство недвижимости».");
  });

  test("service page names the service", async ({ page }) => {
    await page.goto("/ru/services/marketing");
    const cta = page.locator("main").getByRole("link", { name: /Написать в WhatsApp/ }).first();
    expect(waText(await cta.getAttribute("href"))).toBe("Здравствуйте! Хочу обсудить услугу «Запуск и продвижение».");
  });

  test("sticky offer CTA on phones appears after the hero and hides at the end", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/ru/special");
    const bar = page.locator("[aria-hidden] a", { hasText: /Сайт за 1/ });
    await expect(bar).not.toBeInViewport();
    await page.locator("#steps-title").scrollIntoViewIfNeeded();
    await expect(bar).toBeInViewport();
    expect(waText(await bar.getAttribute("href"))).toContain("1 500");
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(bar).not.toBeInViewport();
  });
});
