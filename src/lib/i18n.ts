import blogJson from "@/data/blog.seed.json";
import { site, type Locale } from "@/config/site";

export const locales = site.supportedLocales;
export const defaultLocale: Locale = "ru";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Builds a locale-prefixed path: href("ru", "/work") → "/ru/work". */
export function href(locale: Locale, path = "") {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}

const blogPairs = blogJson.map((p) => ({ ru: p.slug, en: p.enSlug }));

/** Path of the same page in another locale (blog slugs differ per language). */
export function translatePath(pathname: string, target: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  if (parts[0] === "blog" && parts[1]) {
    const pair = blogPairs.find((p) => p.ru === parts[1] || p.en === parts[1]);
    if (pair) parts[1] = pair[target];
  }
  return "/" + [target, ...parts].join("/");
}

export const ogLocale: Record<Locale, string> = { ru: "ru_RU", en: "en_US" };

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}
