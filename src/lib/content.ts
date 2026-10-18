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

const faqs = { ru: faqSchema.parse(faqRuJson), en: faqSchema.parse(faqEnJson) };
const posts = blogSchema.parse(blogJson);
const seo = seoSchema.parse(seoJson);

export const getFaq = (locale: Locale) => faqs[locale];
export const getSeo = (key: string, locale: Locale) => seo[key]?.[locale];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Home page "selected work": store, restaurant, photographer, SaaS. */
export const featuredSlugs = [
  "fashion-store",
  "restaurant-tablefork",
  "photo-lumen",
  "saas-launchpad",
] as const;

export const featuredProjects = featuredSlugs.map((slug) => getProject(slug)!);

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
    screenshots: {
      desktop: p.screenshotPath,
      detail: p.screenshotPath.replace(/\.webp$/, "-detail.webp"),
      mobile: p.screenshotPath.replace(/\.webp$/, "-mobile.webp"),
      og: p.screenshotPath.replace(/\.webp$/, "-og.jpg"),
    },
    demoHost: new URL(p.demo).host,
  };
}
export type LocalizedProject = ReturnType<typeof localizeProject>;

export function relatedProjects(categories: ProjectCategory[], limit = 3) {
  return projects.filter((p) => categories.includes(p.category)).slice(0, limit);
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
