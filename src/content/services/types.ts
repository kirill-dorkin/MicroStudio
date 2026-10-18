import type { ProjectCategory } from "@/lib/schemas";

export type ServiceSlug = "websites" | "design" | "advertising" | "support";

export type Service = {
  slug: ServiceSlug;
  title: string;
  preview: { title: string; thought: string; points: string[] };
  heroTitle: string;
  lead: string;
  forWhom: string[];
  whatWeDo: { title: string; body: string }[];
  youGet: string[];
  process: { title: string; body: string }[];
  outcome: string;
  price: string;
  faq: { question: string; answer: string }[];
  relatedCategories: ProjectCategory[];
  /** Russian slug of a related blog post (the EN slug is resolved via blog data). */
  relatedPost: string;
};
