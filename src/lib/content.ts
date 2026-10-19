import portfolioJson from "@/data/portfolio.json";
import faqRuJson from "@/data/faq.ru.json";
import faqEnJson from "@/data/faq.en.json";
import blogJson from "@/data/blog.seed.json";
import seoJson from "@/data/seo.seed.json";
import type { Locale } from "@/config/site";
import {
  blogSchema,
  faqSchema,
  projectSchema,
  seoSchema,
  type Project,
  type ProjectCategory,
} from "./schemas";

// Content is validated once at import: a broken data file fails the build.
export const projects: Project[] = projectSchema
  .array()
  .min(7)
  .parse(portfolioJson)
  .sort((a, b) => a.screenshotPriority - b.screenshotPriority);

export const isOwn = (p: Project) => p.kind !== "open-source-demo";
/** Work made by MicroStudio — shown first everywhere. */
export const ownProjects = projects.filter(isOwn);
/** Third-party open-source templates — a secondary "references" section. */
export const referenceProjects = projects.filter((p) => !isOwn(p));

const faqs = { ru: faqSchema.parse(faqRuJson), en: faqSchema.parse(faqEnJson) };
const posts = blogSchema.parse(blogJson);
const seo = seoSchema.parse(seoJson);

export const getFaq = (locale: Locale) => faqs[locale];
export const getSeo = (key: string, locale: Locale) => seo[key]?.[locale];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Home page selection: MicroStudio's own work. */
export const featuredProjects = ownProjects.slice(0, 6);

export function localizeProject(p: Project, locale: Locale) {
  const ru = locale === "ru";
  return {
    ...p,
    name: ru ? p.title : p.titleEn,
    short: ru ? p.shortTitle : p.shortTitleEn,
    sector: ru ? p.sectorRu : p.sectorEn,
    description: ru ? p.descriptionRu : p.descriptionEn,
    overview: ru ? p.overviewRu : p.overviewEn,
    features: ru ? p.featureRu : p.featureEn,
    lookFor: ru ? p.lookForRu : p.lookForEn,
    own: isOwn(p),
    mobileFirst: !!p.mobileFirst,
    screenshots: {
      desktop: p.screenshotPath,
      detail: p.hideDetail ? null : p.screenshotPath.replace(/\.webp$/, "-detail.webp"),
      mobile: p.screenshotPath.replace(/\.webp$/, "-mobile.webp"),
      og: p.screenshotPath.replace(/\.webp$/, "-og.jpg"),
    },
    demoHost: new URL(p.demo).host,
  };
}
export type LocalizedProject = ReturnType<typeof localizeProject>;

/** Own work first, then references, matching the categories. */
export function relatedProjects(categories: ProjectCategory[], limit = 3) {
  const match = (p: Project) => categories.includes(p.category);
  return [...ownProjects.filter(match), ...referenceProjects.filter(match), ...ownProjects].filter(
    (p, i, all) => all.indexOf(p) === i,
  ).slice(0, limit);
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
