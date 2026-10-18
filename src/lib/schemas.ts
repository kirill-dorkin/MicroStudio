import { z } from "zod";

const url = z.string().url();

export const projectCategories = [
  "ecommerce",
  "business",
  "landing",
  "webapp",
  "portfolio",
  "content",
] as const;

export const projectSchema = z
  .object({
    id: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string(),
    titleEn: z.string(),
    shortTitle: z.string(),
    shortTitleEn: z.string(),
    sectorRu: z.string(),
    sectorEn: z.string(),
    category: z.enum(projectCategories),
    /** "client-project" only with the client's documented permission. */
    kind: z.enum(["open-source-demo", "client-project"]),
    author: z.string(),
    copyright: z.string(),
    source: url,
    demo: url,
    license: z.string(),
    licenseUrl: url,
    tech: z.array(z.string()).min(1),
    descriptionRu: z.string(),
    descriptionEn: z.string(),
    overviewRu: z.string(),
    overviewEn: z.string(),
    featureRu: z.array(z.string()).length(3),
    featureEn: z.array(z.string()).length(3),
    lookForRu: z.array(z.string()).min(2),
    lookForEn: z.array(z.string()).min(2),
    screenshotPath: z.string().startsWith("/portfolio/"),
    captureRoute: z.string(),
    screenshotPriority: z.number().int(),
    // Fields for future own projects — fill only with confirmed facts.
    client: z.string().optional(),
    year: z.number().int().optional(),
    goal: z.string().optional(),
    contribution: z.string().optional(),
    permission: z.string().optional(),
    result: z.string().optional(),
  })
  .refine((p) => p.kind === "open-source-demo" || !!p.permission, {
    message: "client-project entries need a documented permission",
  });

export type Project = z.infer<typeof projectSchema>;
export type ProjectCategory = (typeof projectCategories)[number];

export const faqSchema = z.array(z.object({ question: z.string(), answer: z.string() })).min(5);
export type FaqItem = { question: string; answer: string };

export const blogSchema = z.array(
  z.object({
    slug: z.string(),
    enSlug: z.string(),
    titleRu: z.string(),
    titleEn: z.string(),
    descriptionRu: z.string(),
    descriptionEn: z.string(),
    category: z.enum(["websites", "planning", "advertising"]),
    author: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }),
);

const seoEntry = z.object({ title: z.string(), description: z.string() });
export const seoSchema = z.record(z.string(), z.object({ ru: seoEntry, en: seoEntry }));
