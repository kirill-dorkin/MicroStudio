import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { intentParams, intentWhatsapp, type ContactIntent } from "@/lib/intent";
import { cn } from "@/lib/utils";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./button";
import { InstagramIcon, WhatsappIcon } from "./icons";
import { TrackedLink } from "./tracked-link";

type Props = {
  locale: Locale;
  intent: ContactIntent;
  /** Where on the site the button is — sent to analytics as the CTA source. */
  location: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * Opens WhatsApp with a ready message for the given intent. Without a
 * configured number it honestly becomes an Instagram link instead.
 */
export function WhatsappCta({ locale, intent, location, label, variant = "primary", size, className }: Props) {
  const t = getDictionary(locale);
  const wa = intentWhatsapp(locale, intent);
  const params = { ...intentParams(intent), location };

  if (!wa) {
    return (
      <TrackedLink
        href={site.instagram}
        event="contact_method"
        params={{ ...params, method: "instagram" }}
        newTabLabel={t.common.newTab}
        className={buttonClass(variant, cn(className), size)}
      >
        <InstagramIcon className="size-[1.1em] shrink-0" />
        {t.wa.instagramCta}
      </TrackedLink>
    );
  }

  return (
    <TrackedLink
      href={wa}
      event="contact_method"
      params={{ ...params, method: "whatsapp" }}
      newTabLabel={t.common.newTab}
      className={buttonClass(variant, className, size)}
    >
      <WhatsappIcon className="size-[1.1em] shrink-0" />
      {label ?? t.wa.cta}
    </TrackedLink>
  );
}
