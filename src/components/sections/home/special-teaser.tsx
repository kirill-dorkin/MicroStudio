import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";

export function SpecialTeaser({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).special;
  return (
    <section aria-labelledby="special-title" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] border border-lime/25 bg-elevated p-8 md:p-12 lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16 lg:p-16" data-reveal>
          <div>
            <p className="inline-flex rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-bg">
              {t.badge}
            </p>
            <h2 id="special-title" className="h2 mt-6 max-w-[16ch]">
              {t.title}
            </h2>
          </div>
          <div className="mt-6 lg:mt-0">
            <p className="text-muted">{t.copy}</p>
            <p className="mt-3 text-sm text-subtle">{t.note}</p>
            <TrackedLink
              href={href(locale, "/special")}
              event="special_offer_cta"
              params={{ location: "home" }}
              className={buttonClass("secondary", "mt-8 border-lime/50 text-lime hover:border-lime hover:bg-lime/10")}
            >
              {t.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
