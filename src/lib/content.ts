import portfolioJson from "@/data/portfolio.json";
import faqRuJson from "@/data/faq.ru.json";
import faqEnJson from "@/data/faq.en.json";
import blogJson from "@/data/blog.seed.json";
import seoJson from "@/data/seo.seed.json";
import type { Locale } from "@/config/site";
import { blogSchema, faqSchema, projectSchema, seoSchema, type Project, type ProjectFormat } from "./schemas";

// Content is validated once at import: a broken data file fails the build.
// Only projects that passed the showcase QA are in portfolio.json (see scripts/sync-showcase.ts).
export const projects: Project[] = projectSchema
  .array()
  .min(1)
  .parse(portfolioJson)
  .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999) || a.slug.localeCompare(b.slug));

const faqs = { ru: faqSchema.parse(faqRuJson), en: faqSchema.parse(faqEnJson) };
const posts = blogSchema.parse(blogJson);
const seo = seoSchema.parse(seoJson);

export const getFaq = (locale: Locale) => faqs[locale];
export const getSeo = (key: string, locale: Locale) => seo[key]?.[locale];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Editorial selection for the home page. */
export const featuredProjects = (limit = 8) => projects.filter((p) => p.featuredRank !== null).slice(0, limit);

export function localizeProject(p: Project, locale: Locale) {
  const l = locale;
  return {
    slug: p.slug,
    workType: p.workType,
    format: p.format,
    industry: p.industry,
    name: p.title[l],
    niche: p.niche[l],
    summary: p.summary[l],
    problem: p.problem[l],
    scenario: p.scenario[l],
    features: p.features.map((f) => ({ text: f[l], kind: f.kind })),
    limits: p.limits[l],
    studio: p.studio[l],
    provenance: { type: p.provenance.type, text: p.provenance[l], assets: p.provenance.assets, upstream: p.provenance.upstream ?? null },
    client: p.client,
    demoUrl: p.demoUrl,
    demoHost: new URL(p.demoUrl).host,
    hosting: p.hosting,
    publishedAt: p.publishedAt,
    verifiedAt: p.verifiedAt,
    mobileFirst: p.mobileFirst,
    images: {
      desktop: p.images.desktop,
      mobile: p.images.mobile,
      gallery: p.images.gallery.map((g) => ({ src: g.src, width: g.width, height: g.height, viewport: g.viewport, alt: g.alt[l] })),
    },
    og: `/og/work-${p.slug}.jpg`,
  };
}
export type LocalizedProject = ReturnType<typeof localizeProject>;

/** Same format first, then same industry, then the editorial order. */
export function relatedProjects(p: Project, limit = 3) {
  const rest = projects.filter((x) => x.slug !== p.slug);
  return [...rest.filter((x) => x.format === p.format), ...rest.filter((x) => x.industry === p.industry), ...rest]
    .filter((x, i, all) => all.indexOf(x) === i)
    .slice(0, limit);
}

/** Projects that illustrate a service, by format, in editorial order. */
export function projectsForFormats(formats: ProjectFormat[], limit = 3) {
  return [...projects.filter((p) => formats.includes(p.format)), ...projects].filter((x, i, all) => all.indexOf(x) === i).slice(0, limit);
}

export type Post = {
  slug: string;
  ruSlug: string;
  enSlug: string;
  title: string;
  description: string;
  category: "websites" | "planning" | "advertising";
  date: string;
  author: string;
};

export function getPosts(locale: Locale): Post[] {
  return posts.map((p) => ({
    slug: locale === "ru" ? p.slug : p.enSlug,
    ruSlug: p.slug,
    enSlug: p.enSlug,
    title: locale === "ru" ? p.titleRu : p.titleEn,
    description: locale === "ru" ? p.descriptionRu : p.descriptionEn,
    category: p.category,
    date: p.date,
    author: p.author,
  }));
}

export function getPost(locale: Locale, slug: string) {
  return getPosts(locale).find((p) => p.slug === slug);
}
