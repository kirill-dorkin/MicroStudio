import { z } from "zod";

const url = z.string().url();
const text = z.object({ ru: z.string().min(1), en: z.string().min(1) });
const image = z.object({ src: z.string().startsWith("/portfolio/"), width: z.number().int().positive(), height: z.number().int().positive() });

/** Primary format of a project — one per project. */
export const projectFormats = ["landing", "corporate", "shop", "app", "special"] as const;
/** Industry group, a separate axis from the format. */
export const projectIndustries = ["local-services", "commerce", "food-travel-realty", "education", "b2b", "products", "creative"] as const;
/**
 * client — made for a confirmed client; product — MicroStudio's own product;
 * demo — a self-initiated demonstration project (fictional company).
 */
export const workTypes = ["client", "product", "demo"] as const;
/** What a feature really is in the demo, shown honestly on the case page. */
export const featureKinds = ["production-ready", "demo-logic", "missing-integration"] as const;

export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    workType: z.enum(workTypes),
    format: z.enum(projectFormats),
    industry: z.enum(projectIndustries),
    niche: text,
    title: text,
    /** One line for cards. */
    summary: text,
    /** What the project solves — 2–3 sentences for the case page. */
    problem: text,
    scenario: text,
    features: z.array(text.extend({ kind: z.enum(featureKinds) })).min(2),
    limits: text,
    /** What MicroStudio did: 3–6 concrete points. */
    studio: z.object({ ru: z.array(z.string()).min(3).max(6), en: z.array(z.string()).min(3).max(6) }),
    provenance: z.object({
      type: z.enum(["original", "derived", "own", "client"]),
      ru: z.string(),
      en: z.string(),
      assets: z.array(z.object({ name: z.string(), license: z.string(), source: url })),
      upstream: z.object({ name: z.string(), url, sha: z.string(), license: z.string(), licenseUrl: url, authors: z.string() }).optional(),
    }),
    client: z.object({ name: z.string(), permission: z.string() }).nullable(),
    demoUrl: url,
    /** showcase — our deployment from the showcase repo; external — hosted by the owner/client. */
    hosting: z.enum(["showcase", "external"]),
    /** Release date of our version (first deployment). */
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    /** Editorial order for "Recommended"; null = after ranked projects. */
    featuredRank: z.number().int().positive().nullable(),
    language: z.string(),
    mobileFirst: z.boolean(),
    images: z.object({
      desktop: image,
      mobile: image,
      gallery: z.array(image.extend({ viewport: z.enum(["desktop", "mobile"]), alt: text })),
    }),
  })
  .refine((p) => p.workType !== "client" || !!p.client?.permission, { message: "client projects need a documented permission" })
  .refine((p) => p.provenance.type !== "derived" || !!p.provenance.upstream, { message: "derived projects need upstream, SHA and licence" });

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormat = (typeof projectFormats)[number];
export type ProjectIndustry = (typeof projectIndustries)[number];
export type WorkType = (typeof workTypes)[number];

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
