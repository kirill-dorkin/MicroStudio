import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { featuredProjects, localizeProject } from "@/lib/content";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/browser-frame";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/**
 * Offer on the left, two real screenshots of the strongest work on the right:
 * a full desktop screen and a phone from another project, both readable and
 * linking to their case pages. Static: nothing rotates.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [main, second] = featuredProjects(8).map((p) => localizeProject(p, locale));
  const phone = featuredProjects(8)
    .map((p) => localizeProject(p, locale))
    .find((p) => p.slug !== main.slug && p.slug !== second?.slug) ?? second;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-14 pt-[calc(62px+1.75rem)] lg:pb-20 lg:pt-[calc(74px+3rem)]">
      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <p className="eyebrow mb-5">{t.hero.kicker}</p>
          <h1 id="hero-title" className="font-display text-[clamp(2.4rem,1.5rem+3.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
            {t.hero.titleStart} <span className="accent-serif text-lime">{t.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-[32rem] text-[1.08rem] leading-relaxed text-muted md:text-[1.15rem]">{t.hero.body}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <WhatsappCta locale={locale} intent={{ kind: "generic" }} location="hero" size="lg" label={t.hero.primary} />
            <Link href={href(locale, "/work")} className={buttonClass("secondary", undefined, "lg")}>
              {t.hero.secondary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-8 text-sm text-subtle">
            <Link href={href(locale, "/special")} className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-text hover:decoration-lime">
              {t.hero.promo}
            </Link>
          </p>
        </div>

        <figure className="relative" aria-label={t.hero.collageLabel}>
          <Link href={href(locale, `/work/${main.slug}`)} className="block rounded-[14px] lg:mr-[14%]">
            <BrowserFrame host={main.demoHost}>
              <Image src={main.images.desktop.src} width={main.images.desktop.width} height={main.images.desktop.height} alt={main.name} priority sizes="(min-width: 1024px) 46vw, 100vw" className="block h-auto w-full" />
            </BrowserFrame>
          </Link>
          {phone && (
            <Link href={href(locale, `/work/${phone.slug}`)} className="absolute -bottom-8 right-0 hidden w-[27%] rounded-[30px] lg:block">
              <PhoneFrame>
                <Image src={phone.images.mobile.src} width={phone.images.mobile.width} height={phone.images.mobile.height} alt={phone.name} sizes="14vw" className="block h-auto w-full" />
              </PhoneFrame>
            </Link>
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
