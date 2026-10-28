import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Check } from "lucide-react";
import type { Locale } from "@/config/site";
import { fmt, getDictionary } from "@/content/locales";
import { featuredProjects, localizeProject, projects } from "@/lib/content";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/browser-frame";
import { WhatsappIcon } from "@/components/ui/icons";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/**
 * One promise, one main action. The free review is the smallest possible
 * first step, so the primary button asks for that and nothing else; the
 * secondary only scrolls to proof. Right side: real screenshots, the phone
 * being a client page with one-tap WhatsApp — the thing the promise is about.
 */
const HERO_PROJECT = "marby-realty";
const HERO_PHONE = "best-electronics-link";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.hero;
  const all = featuredProjects(8).map((p) => localizeProject(p, locale));
  const main = all.find((p) => p.slug === HERO_PROJECT) ?? all[0];
  const phone = all.find((p) => p.slug === HERO_PHONE && p.slug !== main.slug) ?? all.find((p) => p.slug !== main.slug);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-[calc(62px+2rem)] lg:pb-20 lg:pt-[calc(74px+2.5rem)]">
      {/* Soft light behind the screenshots and a faint grid: depth without noise. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] top-[8%] h-[38rem] w-[38rem] rounded-full bg-lime/[0.09] blur-[120px]" />
        <div className="hero-grid absolute inset-0" />
      </div>

      <div className="container-page grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        <div className="animate-fade-up">
          <p className="eyebrow mb-5">{t.kicker}</p>
          <h1 id="hero-title" className="font-display text-[clamp(2.4rem,1.3rem+3.4vw,4.35rem)] font-extrabold leading-[1.0] tracking-[-0.045em]">
            {t.titleStart} <span className="text-lime">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.08rem] leading-relaxed text-muted md:text-[1.2rem]">{t.body}</p>

          <div id="hero-cta" className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
            <WhatsappCta locale={locale} intent={{ kind: "audit" }} location="hero" size="lg" label={t.primary} className="cta-glow" />
            <Link href="#work" className={buttonClass("secondary", undefined, "lg")}>
              {t.secondary}
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 flex max-w-[30rem] items-start gap-2 text-sm leading-snug text-subtle">
            <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
            {t.note}
          </p>

          <ul className="mt-9 grid max-w-[36rem] grid-cols-3 gap-4 border-t border-line pt-6">
            {t.facts.map((f, i) => {
              const body = (
                <>
                  <span className="block font-display text-[clamp(1.15rem,0.9rem+1vw,1.6rem)] font-bold leading-none tracking-[-0.03em] text-text">
                    {fmt(f.value, { count: projects.length })}
                  </span>
                  <span className="mt-2 block text-[0.8rem] leading-snug text-subtle">{f.label}</span>
                </>
              );
              // The fixed price is the one fact worth a click: it opens the offer terms.
              return (
                <li key={f.label}>
                  {i === 0 ? (
                    <Link href={href(locale, "/special")} className="group/fact block rounded-md [&>span:last-child]:underline [&>span:last-child]:decoration-line-strong [&>span:last-child]:underline-offset-4 hover:[&>span:last-child]:decoration-lime">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="relative animate-fade-up [animation-delay:120ms]">
          <Link href={href(locale, `/work/${main.slug}`)} className="block rounded-[14px] transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 lg:mr-[16%]">
            <BrowserFrame host={main.demoHost}>
              <Image src={main.images.desktop.src} width={main.images.desktop.width} height={main.images.desktop.height} alt={main.name} priority sizes="(min-width: 1024px) 46vw, 100vw" className="block h-auto w-full" />
            </BrowserFrame>
          </Link>
          {phone && (
            <div className="absolute -bottom-10 right-0 hidden w-[28%] lg:block">
              <Link href={href(locale, `/work/${phone.slug}`)} className="block rounded-[30px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1">
                <PhoneFrame>
                  <Image src={phone.images.mobile.src} width={phone.images.mobile.width} height={phone.images.mobile.height} alt={phone.name} sizes="14vw" className="block h-auto w-full" />
                </PhoneFrame>
              </Link>
              <span className="absolute -left-[50%] -top-5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-bg/85 px-3.5 py-2 text-[0.8rem] font-semibold text-text shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-lime text-bg">
                  <WhatsappIcon className="size-3" />
                </span>
                {t.chip}
              </span>
            </div>
          )}
          <figcaption className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted lg:mt-6 lg:max-w-[70%]">
            <span>
              <span className="mr-2 inline-block size-1.5 rounded-full bg-lime align-middle" aria-hidden="true" />
              {main.name}
            </span>
            {phone && <span className="hidden lg:inline">· {phone.name}</span>}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
