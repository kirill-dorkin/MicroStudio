import type { Locale } from "@/config/site";
import ru from "./ru";
import en from "./en";
import type { ServiceSlug } from "./types";

export type { Service, ServiceSlug } from "./types";

/** Full cycle, in the order a project goes through it. */
export const serviceSlugs: ServiceSlug[] = ["strategy", "design", "websites", "automation", "marketing", "support"];

export function getServices(locale: Locale) {
  return locale === "ru" ? ru : en;
}

export function getService(locale: Locale, slug: string) {
  return getServices(locale).find((s) => s.slug === slug);
}
