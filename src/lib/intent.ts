import { site, type Locale } from "@/config/site";
import { fmt, getDictionary } from "@/content/locales";
import { getService, type ServiceSlug } from "@/content/services";
import { getProject, localizeProject } from "./content";
import { whatsappUrl } from "./contact";
import { href } from "./i18n";

/**
 * What a visitor wants to talk about. It travels with every contact action:
 * into the ready WhatsApp message, the brief (?service=&project=) and across
 * language switches, so the visitor never has to choose it twice.
 */
export type ContactIntent =
  | { kind: "generic" }
  | { kind: "special" }
  | { kind: "format"; id: "company" | "store" | "custom" }
  | { kind: "service"; slug: ServiceSlug }
  | { kind: "project"; slug: string };

/** Brief project-type id for a service page. */
const serviceToBriefType: Record<ServiceSlug, string> = {
  strategy: "strategy",
  design: "design",
  websites: "company",
  automation: "automation",
  marketing: "marketing",
  support: "support",
};

export function intentMessage(locale: Locale, intent: ContactIntent) {
  const t = getDictionary(locale);
  const m = t.wa.messages;
  switch (intent.kind) {
    case "special":
      return m.special;
    case "format":
      return fmt(m.format, { name: t.formats.items.find((f) => f.id === intent.id)!.name });
    case "service":
      return fmt(m.service, { name: getService(locale, intent.slug)!.title });
    case "project": {
      const p = getProject(intent.slug);
      return p ? fmt(m.project, { name: localizeProject(p, locale).name }) : m.generic;
    }
    default:
      return m.generic;
  }
}

/** wa.me link with the intent's message, or null when WhatsApp is not configured. */
export function intentWhatsapp(locale: Locale, intent: ContactIntent) {
  return site.whatsappE164 ? whatsappUrl(site.whatsappE164, intentMessage(locale, intent)) : null;
}

/** Link to the optional brief with the intent preselected. */
export function briefHref(locale: Locale, intent: ContactIntent) {
  const params = new URLSearchParams();
  if (intent.kind === "special") params.set("service", "special");
  if (intent.kind === "format") params.set("service", intent.id);
  if (intent.kind === "service") params.set("service", serviceToBriefType[intent.slug]);
  if (intent.kind === "project") params.set("project", intent.slug);
  const query = params.toString();
  return `${href(locale, "/contact")}${query ? `?${query}` : ""}#brief`;
}

/** Analytics parameters for an intent — ids only, never visitor input. */
export function intentParams(intent: ContactIntent): Record<string, string> {
  switch (intent.kind) {
    case "format":
      return { intent: "format", service: intent.id };
    case "service":
      return { intent: "service", service: intent.slug };
    case "project":
      return { intent: "project", project: intent.slug };
    default:
      return { intent: intent.kind };
  }
}
