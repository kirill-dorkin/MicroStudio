import type { Locale } from "@/config/site";
import ru from "./ru";
import en from "./en";
import type { ServiceSlug } from "./types";

export type { Service, ServiceSlug } from "./types";

export const serviceSlugs: ServiceSlug[] = ["websites", "design", "advertising", "support"];

export function getServices(locale: Locale) {
  return locale === "ru" ? ru : en;
}

export function getService(locale: Locale, slug: string) {
  return getServices(locale).find((s) => s.slug === slug);
}
