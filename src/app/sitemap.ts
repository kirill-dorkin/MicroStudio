import type { MetadataRoute } from "next";
import { site, type Locale } from "@/config/site";
import { getPosts, projects } from "@/lib/content";
import { serviceSlugs } from "@/content/services";
import { locales } from "@/lib/i18n";

type Entry = { paths: Record<Locale, string>; priority: number; lastModified?: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const same = (path: string) => ({ ru: path, en: path });
  const entries: Entry[] = [
    { paths: same(""), priority: 1 },
    { paths: same("/services"), priority: 0.9 },
    ...serviceSlugs.map((s) => ({ paths: same(`/services/${s}`), priority: 0.8 })),
    { paths: same("/work"), priority: 0.9 },
    ...projects.map((p) => ({ paths: same(`/work/${p.slug}`), priority: 0.6 })),
    { paths: same("/about"), priority: 0.6 },
    { paths: same("/special"), priority: 0.7 },
    { paths: same("/contact"), priority: 0.8 },
    { paths: same("/blog"), priority: 0.6 },
    ...getPosts("ru").map((p) => ({
      paths: { ru: `/blog/${p.ruSlug}`, en: `/blog/${p.enSlug}` },
      priority: 0.5,
      lastModified: p.date,
    })),
    { paths: same("/privacy"), priority: 0.2 },
  ];

  return entries.flatMap((entry) =>
    locales.map((locale) => ({
      url: `${site.siteUrl}/${locale}${entry.paths[locale]}`,
      priority: entry.priority,
      ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.siteUrl}/${l}${entry.paths[l]}`]),
        ),
      },
    })),
  );
}
