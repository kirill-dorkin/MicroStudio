import { expect, test } from "@playwright/test";
import { published } from "./helpers";

test("22–23. special offer shows price, contents and exclusions", async ({ page }) => {
  await page.goto("/ru/special");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Одностраничный сайт для бизнеса");
  await expect(page.locator("main").getByText("1\u00a0500\u00a0сом", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Оплачивается отдельно" })).toBeVisible();
  for (const item of ["Домен", "Вторая языковая версия", "Интернет-магазин и онлайн-оплата", "Реклама и рекламный бюджет"]) {
    await expect(page.getByText(item, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole("heading", { name: "Срок, правки и оплата" })).toBeVisible();
  await expect(page.locator("main")).not.toContainText("не входят в стоимость");
});

test("24. six service pages with FAQ and examples", async ({ page }) => {
  for (const slug of ["strategy", "design", "websites", "automation", "marketing", "support"]) {
    await page.goto(`/ru/services/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Вопросы об услуге" })).toBeVisible();
    expect(await page.locator("details").count()).toBeGreaterThanOrEqual(4);
    expect(await page.locator("#examples article").count()).toBeGreaterThanOrEqual(2);
  }
  await page.goto("/en/services");
  await expect(page.locator("main ul h2")).toHaveCount(6);
  await page.goto("/ru/services/advertising");
  await expect(page).toHaveURL(/\/ru\/services\/marketing$/);
});

test("25–26. blog lists and renders every article in both languages", async ({ page }) => {
  for (const locale of ["ru", "en"]) {
    await page.goto(`/${locale}/blog`);
    const links = page.locator("main article h2 a");
    await expect(links).toHaveCount(3);
    const hrefs = await links.evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
    for (const href of hrefs) {
      const res = await page.goto(href);
      expect(res?.status()).toBe(200);
      expect(await page.locator(".prose-ms h2").count()).toBeGreaterThanOrEqual(2);
    }
  }
});

test("32. sitemap lists every indexable route", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = xml.match(/<loc>/g)?.length ?? 0;
  // 2 locales × (home, services + 6 services, work + projects, about, special, contact, blog + 3 posts, privacy)
  expect(urls).toBe(2 * (17 + published.length));
  expect(xml).toContain("/en/blog/which-website-for-your-business");
  expect(xml).toContain('hreflang="ru"');
});

test("33. robots closes non-production deployments", async ({ request, page }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
  await page.goto("/ru");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("34. canonical, hreflang and OG image are present", async ({ page, request }) => {
  await page.goto("/ru/blog/kakoy-sayt-nuzhen-biznesu");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/ru\/blog\/kakoy-sayt-nuzhen-biznesu$/);
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", /\/en\/blog\/which-website-for-your-business$/);
  await expect(page.locator('link[hreflang="x-default"]')).toHaveCount(1);
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  const res = await request.get(new URL(og!).pathname);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/jpeg");
});

test("unique titles and descriptions across pages", async ({ page }) => {
  const seen = new Set<string>();
  for (const path of ["/ru", "/ru/services", "/ru/services/design", "/ru/work", "/ru/work/marby-realty", "/ru/about", "/ru/blog", "/ru/special", "/ru/contact", "/ru/privacy", "/en", "/en/work"]) {
    await page.goto(path);
    const title = await page.title();
    expect(seen.has(title), title).toBe(false);
    seen.add(title);
    const desc = await page.locator('meta[name="description"]').getAttribute("content");
    expect(desc?.length ?? 0).toBeGreaterThan(60);
  }
});

test("45. privacy page describes the real behaviour", async ({ page }) => {
  await page.goto("/ru/privacy");
  await expect(page.getByText("не отправляем их автоматически на сервер", { exact: false })).toBeVisible();
  await expect(page.getByText("рекламные пиксели не подключены", { exact: false })).toBeVisible();
});

test("43. no fabricated testimonials, team or metrics", async ({ page }) => {
  for (const path of ["/ru", "/ru/about", "/en"]) {
    await page.goto(path);
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/отзыв|клиентов довольны|лет на рынке|100\+|testimonial|happy clients|years of experience/i);
  }
});

test("49. English pages contain no Russian text", async ({ page }) => {
  for (const path of ["/en", "/en/services", "/en/services/marketing", "/en/work", "/en/work/saima-hotel", "/en/about", "/en/blog", "/en/blog/what-happens-after-an-ad-click", "/en/special", "/en/contact", "/en/privacy"]) {
    await page.goto(path);
    const text = await page.locator("body").innerText();
    expect(text.match(/[А-Яа-яЁё]+/g) ?? [], path).toEqual([]);
  }
});

test("36. reduced motion removes transitions and smooth scrolling", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/ru");
  const duration = await page
    .locator("main")
    .getByRole("link", { name: /Написать в WhatsApp/ })
    .first()
    .evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration));
  expect(duration).toBeLessThan(0.01);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  await context.close();
});

test("hero: full-cycle offer, two actions, real screenshots and a secondary promo", async ({ page }) => {
  await page.goto("/ru");
  const hero = page.locator("section[aria-labelledby='hero-title']");
  await expect(hero.getByRole("heading", { level: 1 })).toHaveText("Создаём сайты. Помогаем бизнесу расти.");
  const wa = hero.getByRole("link", { name: /Обсудить проект/ });
  expect(new URL((await wa.getAttribute("href"))!).searchParams.get("text")).toBe("Здравствуйте! Хочу обсудить проект для моего бизнеса.");
  await expect(hero.getByRole("link", { name: /Смотреть проекты/ })).toHaveAttribute("href", "/ru/work");
  await expect(hero.locator(`a[href="/ru/work/${published[0].slug}"]`)).toHaveCount(1);
  await expect(hero.getByRole("link", { name: /1\s500 сом/ })).toHaveAttribute("href", "/ru/special");
});

test("home lists six full-cycle services", async ({ page }) => {
  await page.goto("/ru");
  await expect(page.locator("section[aria-labelledby='services-title'] li")).toHaveCount(6);
});

test("fixed header does not cover anchored headings", async ({ page }) => {
  await page.goto("/ru/special");
  await page.locator("main").getByRole("link", { name: /Что входит/ }).first().click();
  await expect(page).toHaveURL(/#included$/);
  await page.waitForTimeout(600);
  const headerBottom = await page.locator("header").evaluate((el) => el.getBoundingClientRect().bottom);
  const headingTop = await page.locator("#included-title").evaluate((el) => el.getBoundingClientRect().top);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
});

test("FAQ items open and close", async ({ page }) => {
  await page.goto("/ru");
  const item = page.locator("details").first();
  await item.locator("summary").click();
  await expect(item).toHaveAttribute("open", "");
  await item.locator("summary").click();
  await expect(item).not.toHaveAttribute("open", "");
});

test("37–38. images load and nothing overflows horizontally", async ({ page }) => {
  test.setTimeout(180_000);
  for (const width of [360, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/ru", "/ru/work", "/ru/contact", "/ru/special", "/ru/services/websites", `/ru/work/${published[0].slug}`]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => {
        document.body.style.overflowX = "visible";
        return document.documentElement.scrollWidth - window.innerWidth;
      });
      expect(overflow, `${path} @${width}`).toBeLessThanOrEqual(0);
    }
  }
  await page.goto("/ru");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  await page.waitForLoadState("networkidle");
  const broken = await page.locator("img").evaluateAll((imgs) =>
    (imgs as HTMLImageElement[]).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
  );
  expect(broken).toEqual([]);
});

test("39. every internal link resolves", async ({ page, request }) => {
  test.setTimeout(120_000);
  const pages = ["/ru", "/en", "/ru/work", "/ru/services", "/ru/blog", "/ru/about", "/ru/special", "/ru/contact", "/ru/privacy", `/en/work/${published[0].slug}`];
  const links = new Set<string>();
  for (const path of pages) {
    await page.goto(path);
    for (const href of await page.locator("a[href^='/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")!))) {
      links.add(href.split("#")[0]);
    }
  }
  for (const href of links) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
  expect(links.size).toBeGreaterThan(30);
});
