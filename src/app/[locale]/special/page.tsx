import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getFaq, getSeo } from "@/lib/content";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { TrackedLink } from "@/components/ui/tracked-link";
import { TrackView } from "@/components/ui/track-view";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/special", og: "special", ...getSeo("special", locale)! });
}

export default async function SpecialPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const s = t.specialPage;
  // The two FAQ entries about pricing and the offer's scope.
  const faq = getFaq(locale).slice(0, 2).concat(getFaq(locale)[8]);

  return (
    <>
      <TrackView event="special_offer_view" />
      <section className="container-page pb-16 pt-[calc(62px+3rem)] lg:pt-[calc(74px+4.5rem)]">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: s.eyebrow, href: href(locale, "/special") },
          ]}
        />
        <p className="inline-flex rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-bg">
          {s.eyebrow}
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <h1 className="h1 max-w-4xl">{s.title}</h1>
            <p className="lead mt-6 max-w-2xl">{s.lead}</p>
          </div>
          <div className="rounded-[24px] border border-lime/30 bg-elevated p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-subtle">{s.priceLabel}</p>
            <p className="mt-2 font-display text-[clamp(2.5rem,1.8rem+2.5vw,3.25rem)] font-extrabold leading-none tracking-[-0.04em] text-lime">
              {s.price}
            </p>
            <p className="mt-4 text-sm text-muted">{s.priceNote}</p>
            <TrackedLink
              href={`${href(locale, "/contact")}?service=special`}
              event="special_offer_cta"
              params={{ location: "special_hero" }}
              className={buttonClass("primary", "mt-6 w-full")}
            >
              {s.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <section aria-label={`${s.includedTitle} / ${s.excludedTitle}`} className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-line bg-elevated p-7 md:p-9">
            <h2 className="h3">{s.includedTitle}</h2>
            <ul className="mt-6 space-y-4">
              {s.included.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-bg">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-line p-7 md:p-9">
            <h2 className="h3">{s.excludedTitle}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {s.excluded.map((item) => (
                <li key={item} className="flex gap-3.5 text-muted">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong">
                    <Minus className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="h2">{s.fitTitle}</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {s.fit.map((item) => (
                <li key={item} className="py-5 text-[1.05rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2">{s.termsTitle}</h2>
            <p className="lead mt-8">{s.terms}</p>
            <div className="mt-10 rounded-[24px] border border-line bg-elevated p-7">
              <h3 className="h3">{s.biggerTitle}</h3>
              <p className="mt-3 text-muted">{s.biggerBody}</p>
              <Link href={href(locale, "/services/websites")} className={buttonClass("secondary", "mt-6")}>
                {s.biggerCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="special-faq" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 id="special-faq" className="h2">
              {s.faqTitle}
            </h2>
            <TrackedLink
              href={`${href(locale, "/contact")}?service=special`}
              event="special_offer_cta"
              params={{ location: "special_faq" }}
              className={buttonClass("primary", "mt-10")}
            >
              {s.cta}
            </TrackedLink>
          </div>
          <FaqList items={faq} />
        </div>
      </section>
    </>
  );
}
