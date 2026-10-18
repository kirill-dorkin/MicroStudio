/**
 * Renders Open Graph images (1200x630) for every route and locale into
 * public/og/{key}-{locale}.jpg. Uses the local Google Chrome via Playwright.
 *
 *   pnpm og
 */
import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getDictionary } from "../src/content/locales";
import { getServices } from "../src/content/services";
import { getPosts, getSeo, localizeProject, projects } from "../src/lib/content";
import type { Locale } from "../src/config/site";

const root = process.cwd();
const outDir = path.join(root, "public/og");

type Card = { key: string; eyebrow: string; title: string; image?: string };

const strip = (title: string) => title.replace(/\s+[—|]\s+MicroStudio$/, "").replace(/^MicroStudio\s+[—|]\s+/, "");

function cards(locale: Locale): Card[] {
  const t = getDictionary(locale);
  const seo = (k: string) => strip(getSeo(k, locale)!.title);
  return [
    { key: "home", eyebrow: t.hero.kicker, title: t.hero.title },
    { key: "services", eyebrow: t.services.eyebrow, title: seo("services") },
    ...getServices(locale).map((s) => ({ key: `service-${s.slug}`, eyebrow: s.title, title: s.heroTitle })),
    { key: "work", eyebrow: t.work.eyebrow, title: t.work.title },
    ...projects.map((p) => {
      const lp = localizeProject(p, locale);
      return {
        key: `work-${p.slug}`,
        eyebrow: `${t.common.demoBadgeLong} · ${lp.author}`,
        title: lp.name,
        image: lp.screenshots.desktop,
      };
    }),
    { key: "about", eyebrow: t.about.eyebrow, title: t.about.title },
    { key: "blog", eyebrow: t.blog.eyebrow, title: t.blog.title },
    ...getPosts(locale).map((p) => ({ key: `blog-${p.ruSlug}`, eyebrow: t.blog.eyebrow, title: p.title })),
    { key: "special", eyebrow: t.specialPage.eyebrow, title: t.special.title },
    { key: "contact", eyebrow: t.contact.eyebrow, title: t.contact.title },
    { key: "privacy", eyebrow: "MicroStudio", title: t.privacy.title },
  ];
}

const logoPath =
  "M27.53 40.14c.046-4.59-1.118-8.322-2.598-8.336-1.48-.015-2.716 3.694-2.76 8.283-.046 4.59 1.118 8.321 2.598 8.336 1.48.014 2.716-3.694 2.76-8.284ZM18.947 39.097c2.52-3.836 3.558-7.605 2.321-8.417-1.237-.813-4.282 1.639-6.801 5.475-2.52 3.837-3.559 7.605-2.321 8.418 1.237.812 4.282-1.64 6.801-5.476ZM12.28 33.593c4.193-1.865 7.104-4.474 6.503-5.826-.602-1.352-4.489-.937-8.682.929-4.194 1.865-7.105 4.473-6.504 5.826.602 1.352 4.489.936 8.682-.929ZM18.28 23.974c.225-1.462-3.27-3.214-7.806-3.913-4.536-.698-8.396-.078-8.621 1.385-.225 1.463 3.27 3.215 7.805 3.913 4.537.698 8.396.078 8.621-1.385ZM19.908 20.49c.98-1.11-1.013-4.472-4.452-7.512-3.439-3.039-7.021-4.604-8.001-3.495-.98 1.11 1.013 4.472 4.452 7.512 3.438 3.039 7.02 4.604 8.001 3.494ZM23.151 18.453c1.425-.403 1.566-4.31.317-8.726-1.25-4.416-3.418-7.67-4.842-7.266-1.424.403-1.566 4.31-.316 8.726 1.25 4.415 3.417 7.669 4.841 7.266ZM31.958 11.324c1.337-4.39 1.273-8.3-.143-8.73-1.417-.431-3.648 2.778-4.984 7.169-1.337 4.39-1.272 8.3.144 8.73 1.416.431 3.647-2.778 4.983-7.17ZM38.251 17.256c3.498-2.971 5.557-6.294 4.598-7.422-.958-1.128-4.57.366-8.068 3.338-3.498 2.971-5.556 6.294-4.598 7.422.959 1.128 4.57-.366 8.068-3.338ZM40.332 25.652c4.55-.609 8.078-2.291 7.881-3.758-.196-1.467-4.043-2.163-8.592-1.555-4.549.609-8.077 2.291-7.88 3.759.195 1.466 4.042 2.163 8.591 1.554ZM46.2 34.941c.628-1.34-2.231-4.006-6.387-5.953-4.156-1.948-8.034-2.44-8.662-1.1-.628 1.34 2.232 4.006 6.387 5.953 4.156 1.948 8.034 2.44 8.662 1.1ZM37.459 44.83c1.253-.788.288-4.576-2.155-8.462-2.443-3.885-5.439-6.396-6.692-5.608-1.253.788-.288 4.576 2.155 8.461 2.443 3.886 5.439 6.397 6.692 5.609Z";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

async function html(card: Card) {
  const shot = card.image
    ? `data:image/webp;base64,${(await readFile(path.join(root, "public", card.image))).toString("base64")}`
    : null;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@500;600&display=block&subset=cyrillic" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#0b0d0f;color:#f6f7f3;font-family:Inter,sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.045) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse at 20% 0%,#000 10%,transparent 70%)}
.wrap{position:absolute;inset:64px 72px;display:flex;flex-direction:column}
.eyebrow{display:flex;align-items:center;gap:12px;font:600 18px Inter;letter-spacing:.14em;text-transform:uppercase;color:#a2a8a6;max-width:${shot ? 560 : 1000}px}
.eyebrow:before{content:"";width:9px;height:9px;border-radius:9px;background:#c7f66c;flex:none}
h1{margin-top:28px;font:800 ${shot ? 58 : 76}px/1.04 Manrope;letter-spacing:-.035em;max-width:${shot ? 560 : 980}px}
.foot{margin-top:auto;display:flex;align-items:center;gap:14px;font:700 28px Manrope;letter-spacing:-.03em}
.foot svg{width:40px;height:40px;fill:#c7f66c}
.shot{position:absolute;right:-40px;top:110px;width:600px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.12);box-shadow:0 40px 80px rgba(0,0,0,.6);background:#1b1e21}
.bar{height:30px;display:flex;gap:7px;align-items:center;padding:0 14px}.bar i{width:9px;height:9px;border-radius:9px;background:rgba(255,255,255,.18)}
.shot img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top}
.line{position:absolute;left:72px;right:72px;bottom:130px;height:1px;background:#2a2f2d}
</style></head><body><div class="grid"></div>
${shot ? `<div class="shot"><div class="bar"><i></i><i></i><i></i></div><img src="${shot}"></div>` : ""}
<div class="wrap"><p class="eyebrow">${esc(card.eyebrow)}</p><h1>${esc(card.title)}</h1>
<div class="foot"><svg viewBox="0 0 50 50"><path d="${logoPath}"/></svg>MicroStudio</div></div></body></html>`;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  let count = 0;
  for (const locale of ["ru", "en"] as Locale[]) {
    for (const card of cards(locale)) {
      await page.setContent(await html(card), { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const png = await page.screenshot({ type: "png" });
      await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(outDir, `${card.key}-${locale}.jpg`));
      count++;
    }
  }
  await browser.close();
  console.log(`Generated ${count} OG images in public/og`);
}

main();
