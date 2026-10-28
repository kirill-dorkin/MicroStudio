import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getSeo } from "@/lib/content";
import { intentParams, intentWhatsapp } from "@/lib/intent";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/home/hero";
import { SelectedWork } from "@/components/sections/home/selected-work";
import { Leaks } from "@/components/sections/home/leaks";
import { SiteCheck } from "@/components/sections/home/site-check";
import { Formats } from "@/components/sections/home/formats";
import { Process } from "@/components/sections/home/process";
import { Terms } from "@/components/sections/home/terms";
import { FaqSection } from "@/components/sections/home/faq-section";
import { Founder } from "@/components/sections/founder";
import { CtaBand } from "@/components/sections/cta-band";
import { StickyCta } from "@/components/ui/sticky-cta";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = getSeo("home", locale)!;
  return pageMetadata({ locale, path: "", og: "home", ...seo });
}

/**
 * Order follows the visitor's questions: what is it and what do I do (hero) →
 * can they do it (work) → is this my problem (leaks) → how bad is mine (check)
 * → what will it cost (formats) → how does it go and what if (process, terms,
 * FAQ) → one last, low-risk ask (free review).
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const audit = { kind: "audit" } as const;
  const wa = intentWhatsapp(locale, audit);
  return (
    <>
      <Hero locale={locale} />
      <SelectedWork locale={locale} />
      <Leaks locale={locale} />
      <SiteCheck locale={locale} />
      <Formats locale={locale} />
      <Process locale={locale} />
      <Terms locale={locale} />
      <Founder locale={locale} />
      <FaqSection locale={locale} />
      <CtaBand locale={locale} location="home" intent={audit} title={t.home.final.title} body={t.home.final.body} ctaId="home-final-cta" label={t.home.hero.primary} />
      {wa && (
        <StickyCta
          href={wa}
          label={t.home.sticky}
          newTabLabel={t.common.newTab}
          location="home_sticky"
          params={intentParams(audit)}
          watch={["hero-cta", "check", "formats", "home-final-cta"]}
        />
      )}
    </>
  );
}
