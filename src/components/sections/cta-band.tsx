import { ArrowRight } from "lucide-react";
import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import { buttonClass } from "@/components/ui/button";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { TrackedLink } from "@/components/ui/tracked-link";

/** Final call to action with the real, configured contact channels. */
export function CtaBand({
  locale,
  title,
  body,
  location,
}: {
  locale: Locale;
  title?: string;
  body?: string;
  location: string;
}) {
  const t = getDictionary(locale);
  return (
    <section aria-labelledby={`cta-${location}`} className="border-t border-line py-24 lg:py-36">
      <div className="container-page" data-reveal>
        <h2 id={`cta-${location}`} className="font-display text-[clamp(2.5rem,1.2rem+6vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
          {title ?? t.finalCta.title}
          <span className="text-lime">.</span>
        </h2>
        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="lead max-w-xl">{body ?? t.finalCta.copy}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href={href(locale, "/contact")}
              event="cta_contact"
              params={{ location }}
              className={buttonClass("primary")}
            >
              {t.finalCta.brief}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            {site.whatsappE164 && (
              <TrackedLink
                href={whatsappUrl(site.whatsappE164)}
                event="contact_method"
                params={{ method: "whatsapp", location }}
                newTabLabel={t.common.newTab}
                className={buttonClass("secondary")}
              >
                <WhatsappIcon className="size-4" />
                {t.finalCta.whatsapp}
              </TrackedLink>
            )}
            <TrackedLink
              href={site.instagram}
              event="contact_method"
              params={{ method: "instagram", location }}
              newTabLabel={t.common.newTab}
              className={buttonClass("secondary")}
            >
              <InstagramIcon className="size-4" />
              {t.finalCta.instagram}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
