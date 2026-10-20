import { readFileSync } from "node:fs";
import path from "node:path";

/** Minutes to read an article at ~180 words per minute (build time only). */
export function readingTime(slug: string) {
  const text = readFileSync(path.join(process.cwd(), "src/content/blog", `${slug}.mdx`), "utf8");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}
