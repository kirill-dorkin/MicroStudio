import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import type { LocalizedProject } from "./content";

/** Labels a project card needs, in the visitor's language. */
export function cardLabels(p: Pick<LocalizedProject, "workType" | "format">, locale: Locale) {
  const t = getDictionary(locale);
  return {
    type: t.labels.workType[p.workType],
    format: t.labels.format[p.format],
    open: p.workType === "demo" ? t.common.openDemo : t.common.openSite,
    details: t.selected.details,
    newTab: t.common.newTab,
  };
}
