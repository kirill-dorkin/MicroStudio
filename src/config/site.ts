/**
 * Public site configuration. Everything here is shown to visitors, so only
 * verified values belong in it — never placeholders.
 */

const E164_DIGITS = /^[1-9][0-9]{7,14}$/;

/**
 * WhatsApp/phone number confirmed by the MicroStudio owner (brief of
 * 2026-10-18). NEXT_PUBLIC_WHATSAPP_E164 overrides it; "off" hides WhatsApp.
 */
const CONFIRMED_WHATSAPP = "996700779919";

function resolveWhatsapp(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_E164?.trim();
  if (fromEnv === "off") return null;
  const value = (fromEnv || CONFIRMED_WHATSAPP).replace(/^\+/, "");
  return E164_DIGITS.test(value) ? value : null;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  // Temporary canonical until a real domain is connected.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "MicroStudio",
  instagram: "https://www.instagram.com/microstudio_official/",
  instagramHandle: "@microstudio_official",
  whatsappE164: resolveWhatsapp(),
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() || null,
  siteUrl: resolveSiteUrl(),
  /** Search engines index only the production deployment. */
  indexable:
    process.env.VERCEL_ENV === "production" ||
    (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production" && !!process.env.NEXT_PUBLIC_SITE_URL),
  gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || null,
  localeDefault: "ru",
  supportedLocales: ["ru", "en"] as const,
} as const;

export type Locale = (typeof site.supportedLocales)[number];

export function isWhatsappNumber(value: string) {
  return E164_DIGITS.test(value);
}

/** "+996 700 779 919" for Kyrgyz numbers, "+<digits>" otherwise. */
export function formatPhone(digits: string) {
  const kg = digits.match(/^(996)(\d{3})(\d{3})(\d{3})$/);
  return kg ? `+${kg[1]} ${kg[2]} ${kg[3]} ${kg[4]}` : `+${digits}`;
}
