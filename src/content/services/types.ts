import type { ProjectFormat } from "@/lib/schemas";

export type ServiceSlug = "strategy" | "design" | "websites" | "automation" | "marketing" | "support";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Home and overview card: 15–25 words and the main deliverables. */
  card: string;
  points: string[];
  heroTitle: string;
  lead: string;
  forWhom: string[];
  whatWeDo: { title: string; body: string }[];
  youGet: string[];
  process: { title: string; body: string }[];
  price: string;
  faq: { question: string; answer: string }[];
  /** Portfolio formats that illustrate the service. */
  relatedFormats: ProjectFormat[];
  /** Russian slug of a related blog post (the EN slug is resolved via blog data). */
  relatedPost: string;
};
