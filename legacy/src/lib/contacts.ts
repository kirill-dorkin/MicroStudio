export const CONTACTS = {
  phoneDisplay: "+996 700 779 919",
  phoneHref: "tel:+996700779919",
  whatsappNumber: "996700779919",
  whatsappHref: "https://wa.me/996700779919",
  instagramHandle: "@microstudio_official",
  instagramHref: "https://www.instagram.com/microstudio_official/",
} as const;

/** Builds a wa.me link with a prefilled, URL-encoded message. */
export function whatsappLink(message?: string) {
  if (!message) return CONTACTS.whatsappHref;
  return `${CONTACTS.whatsappHref}?text=${encodeURIComponent(message)}`;
}

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://micro-studio.vercel.app")
).replace(/\/$/, "");
