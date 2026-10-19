import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Minus } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getProject, getSeo, localizeProject } from "@/lib/content";
import { href } from "@/lib/i18n";
import { intentWhatsapp } from "@/lib/intent";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, faqLd } from "@/lib/jsonld";
import { buttonClass } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { StickyCta } from "@/components/ui/sticky-cta";
import { TrackView } from "@/components/ui/track-view";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/special", og: "special", ...getSeo("special", locale)! });
}

export default async function SpecialPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const s = t.specialPage;
  const example = localizeProject(getProject("best-electronics-link")!, locale);
  const wa = intentWhatsapp(locale, { kind: "special" });

  return (
    <>
      <TrackView event="special_offer_view" />
      <JsonLd data={faqLd(s.faq)} />

      <section aria-labelledby="special-title" className="relative overflow-hidden page-top pb-14 lg:pb-20">
        <div className="container-page grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="inline-flex rounded-full border border-lime/40 bg-lime/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-lime">
              {s.eyebrow}
            </p>
            <h1 id="special-title" className="h1 mt-5 max-w-[14ch]">
              {s.title}
            </h1>
            <p className="mt-4 font-display text-[clamp(2.5rem,1.9rem+2.6vw,4rem)] font-extrabold leading-none tracking-[-0.04em] text-lime">
              {s.price}
            </p>
            <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted">{s.lead}</p>
            <div id="special-hero-cta" className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <WhatsappCta locale={locale} intent={{ kind: "special" }} location="special_hero" label={s.cta} size="lg" />
              <a href="#included" className={buttonClass("secondary", undefined, "lg")}>
                {s.secondary}
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {s.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <Check className="size-4 text-lime" aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-subtle">{s.priceNote}</p>
          </div>

          <figure>
            <div className="relative mx-auto flex max-w-[480px] items-end justify-center gap-4">
              <div className="w-[48%] overflow-hidden rounded-[28px] border-[6px] border-[#2b3033] bg-[#2b3033] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[390/844] overflow-hidden rounded-[22px] bg-white">
                  <Image src={example.screenshots.mobile} alt={example.name} fill priority sizes="(min-width: 1024px) 230px, 46vw" className="object-cover object-top" />
                </div>
              </div>
              <div className="mb-[12%] w-[44%] overflow-hidden rounded-[26px] border-[6px] border-[#2b3033] bg-[#2b3033] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[390/844] overflow-hidden rounded-[20px] bg-white">
                  <Image src={example.screenshots.detail ?? example.screenshots.mobile} alt="" fill sizes="(min-width: 1024px) 210px, 42vw" className="object-cover object-[center_top]" />
                </div>
              </div>
            </div>
            <figcaption className="mt-5 text-center text-sm text-subtle">
              {s.exampleCaption}{" "}
              <Link href={href(locale, `/work/${example.slug}`)} className="text-muted underline underline-offset-4 hover:text-text">
                {t.work.cardCta}
              </Link>
              <span className="mt-1 block">{s.exampleNote}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="included" aria-labelledby="included-title" className="section border-t border-line">
        <div className="container-page">
          <h2 id="included-title" className="h2">
            {s.includedTitle}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {s.included.map((item, i) => (
              <li key={item.title} className="card flex gap-4 p-5 md:p-6">
                <span className="pt-0.5 font-display text-sm font-semibold tabular-nums text-lime">0{i + 1}</span>
                <div>
                  <h3 className="h3">{item.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label={`${s.fromYouTitle} · ${s.excludedTitle}`} className="section-tight">
        <div className="container-page grid gap-4 lg:grid-cols-2">
          <div className="card p-6 md:p-8">
            <h2 className="h3">{s.fromYouTitle}</h2>
            <ul className="mt-5 space-y-3">
              {s.fromYou.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-line p-6 md:p-8">
            <h2 className="h3">{s.excludedTitle}</h2>
            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {s.excluded.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <Minus className="mt-1 size-4 shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="section border-t border-line">
        <div className="container-page">
          <h2 id="steps-title" className="h2">
            {s.stepsTitle}
          </h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {s.steps.map((step, i) => (
              <li key={step.title} className="bg-bg p-6">
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-strong font-display text-sm font-semibold text-lime">
                  {i + 1}
                </span>
                <h3 className="h3 mt-4">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {[
              [s.lookTitle, s.lookBody],
              [s.publishTitle, s.publishBody],
              [s.termsTitle, s.termsBody],
            ].map(([title, body]) => (
              <div key={title} className="card p-6">
                <h3 className="h3">{title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="special-faq" className="section border-t border-line">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div>
            <h2 id="special-faq" className="h2">
              {s.faqTitle}
            </h2>
            <div className="card mt-8 p-6">
              <h3 className="h3">{s.biggerTitle}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{s.biggerBody}</p>
              <Link href={href(locale, "/services/websites")} className={buttonClass("secondary", "mt-5", "sm")}>
                {s.biggerCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <FaqList items={s.faq} />
        </div>
      </section>

      <CtaBand
        locale={locale}
        location="special_final"
        intent={{ kind: "special" }}
        title={s.finalTitle}
        body={s.finalBody}
        ctaId="special-final-cta"
      />

      {wa && (
        <StickyCta
          href={wa}
          label={s.stickyCta}
          newTabLabel={t.common.newTab}
          location="special_sticky"
          params={{ intent: "special" }}
          watch={["special-hero-cta", "special-final-cta"]}
        />
      )}
    </>
  );
}
