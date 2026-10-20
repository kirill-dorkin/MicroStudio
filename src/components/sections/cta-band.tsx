import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { briefHref, type ContactIntent } from "@/lib/intent";
import { buttonClass } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/icons";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/** Ends a sentence with a lime full stop unless it already has punctuation. */
function withStop(title: string) {
  return /[.!?…]$/.test(title) ? (
    title
  ) : (
    <>
      {title}
      <span className="text-lime">.</span>
    </>
  );
}

/** Final call to action: WhatsApp first, the optional brief and Instagram second. */
export function CtaBand({
  locale,
  title,
  body,
  location,
  intent = { kind: "generic" },
  ctaId,
}: {
  locale: Locale;
  title?: string;
  body?: string;
  location: string;
  intent?: ContactIntent;
  /** Id of the actions block, e.g. for a sticky CTA to watch. */
  ctaId?: string;
}) {
  const t = getDictionary(locale);
  return (
    <section aria-labelledby={`cta-${location}`} className="section border-t border-line">
      <div className="container-page">
        <div className="card relative overflow-hidden px-6 py-10 md:px-12 md:py-14 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-12">
          <div>
            <h2 id={`cta-${location}`} className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
              {withStop(title ?? t.finalCta.title)}
            </h2>
            <p className="lead mt-4">{body ?? t.finalCta.copy}</p>
          </div>
          <div id={ctaId} className="mt-8 flex flex-col gap-3 lg:mt-0">
            <WhatsappCta locale={locale} intent={intent} location={location} size="lg" className="w-full" label={intent.kind === "special" ? t.specialPage.cta : undefined} />
            <div className="mt-1 grid grid-cols-1 gap-3 xs:grid-cols-2">
              <Link href={briefHref(locale, intent)} className={buttonClass("secondary", "w-full", "sm")}>
                {t.finalCta.briefShort}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
              <TrackedLink
                href={site.instagram}
                event="contact_method"
                params={{ method: "instagram", location }}
                newTabLabel={t.common.newTab}
                className={buttonClass("secondary", "w-full", "sm")}
              >
                <InstagramIcon className="size-4 shrink-0" />
                {t.finalCta.instagram}
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
