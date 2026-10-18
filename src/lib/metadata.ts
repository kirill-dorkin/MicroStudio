import type { Metadata } from "next";
import { site, type Locale } from "@/config/site";
import { ogLocale } from "./i18n";

type PageMeta = {
  locale: Locale;
  /** Path without the locale prefix, e.g. "/work". */
  path: string;
  title: string;
  description: string;
  /** Key of the pre-rendered image in public/og/{key}-{locale}.jpg. */
  og: string;
  /** Path of the same page in each locale when slugs differ (blog). */
  alternatePaths?: Record<Locale, string>;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
};

export function pageMetadata(m: PageMeta): Metadata {
  const paths = m.alternatePaths ?? { ru: m.path, en: m.path };
  const url = `/${m.locale}${paths[m.locale]}`;
  const image = `/og/${m.og}-${m.locale}.jpg`;
  const index = site.indexable && !m.noindex;

  return {
    metadataBase: new URL(site.siteUrl),
    title: { absolute: m.title },
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        ru: `/ru${paths.ru}`,
        en: `/en${paths.en}`,
        "x-default": `/ru${paths.ru}`,
      },
    },
    openGraph: {
      type: m.type ?? "website",
      url,
      siteName: site.name,
      title: m.title,
      description: m.description,
      locale: ogLocale[m.locale],
      alternateLocale: [ogLocale[m.locale === "ru" ? "en" : "ru"]],
      images: [{ url: image, width: 1200, height: 630, alt: m.title }],
      ...(m.publishedTime ? { publishedTime: m.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [image],
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}
