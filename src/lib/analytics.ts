"use client";

export type AnalyticsEvent =
  | "view_service"
  | "view_project"
  | "filter_portfolio"
  | "cta_contact"
  | "contact_method"
  | "copy_brief"
  | "open_demo"
  | "open_github"
  | "special_offer_view"
  | "special_offer_cta"
  | "select_service";

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends an event to the analytics provider when one is configured
 * (NEXT_PUBLIC_GA_ID); otherwise only dispatches a DOM event so tests can
 * observe it. Never pass personal data in params.
 */
export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  window.dispatchEvent(new CustomEvent("ms:analytics", { detail: { event, params } }));
}
