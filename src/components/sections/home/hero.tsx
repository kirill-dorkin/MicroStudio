import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getProject, localizeProject } from "@/lib/content";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";
import { WorkCollage } from "@/components/portfolio/work-collage";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const item = (slug: string) => ({
    project: localizeProject(getProject(slug)!, locale),
    href: href(locale, `/work/${slug}`),
  });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-14 pt-[calc(62px+1.75rem)] lg:pb-20 lg:pt-[calc(74px+3rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_75%_10%,rgba(199,246,108,0.08),transparent_70%)]"
      />
      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <Link
            href={href(locale, "/special")}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-lime/35 bg-lime/[0.07] px-3.5 text-[0.82rem] font-medium text-lime transition-colors hover:bg-lime/[0.12]"
          >
            {t.hero.priceChip}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <h1 id="hero-title" className="mt-5 font-display text-[clamp(2.3rem,1.5rem+3.3vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            {t.hero.titleStart} <span className="accent-serif text-lime">{t.hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted md:text-[1.125rem]">{t.hero.body}</p>
          <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <WhatsappCta locale={locale} intent={{ kind: "generic" }} location="hero" size="lg" />
            <Link href={href(locale, "/work")} className={buttonClass("secondary", undefined, "lg")}>
              {t.hero.secondary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 hidden flex-wrap gap-x-5 gap-y-2 text-sm text-subtle sm:flex">
            {t.hero.formats.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <WorkCollage
          desktop={item("best-electronics-store")}
          phones={[item("best-electronics-link"), item("anna-art"), item("nova-ielts")]}
          label={t.hero.collageLabel}
        />
      </div>
    </section>
  );
}
