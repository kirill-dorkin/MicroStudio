import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getProject, localizeProject } from "@/lib/content";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";
import { HeroShowcase } from "@/components/portfolio/hero-showcase";

const heroSlugs = ["fashion-store", "restaurant-tablefork", "saas-launchpad", "dashboard-pulse"];

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const slides = heroSlugs.map((slug) => {
    const p = localizeProject(getProject(slug)!, locale);
    return {
      slug,
      name: p.name,
      short: p.short,
      image: p.screenshots.desktop,
      mobile: p.screenshots.mobile,
      host: p.demoHost,
      href: href(locale, `/work/${slug}`),
    };
  });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-14 pt-[calc(62px+1.75rem)] lg:pb-20 lg:pt-[calc(74px+3.5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <p className="eyebrow mb-5">{t.hero.kicker}</p>
          <h1 id="hero-title" className="h1 max-w-[12ch]">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted md:text-[1.125rem]">{t.hero.body}</p>
          <div className="mt-7 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <WhatsappCta locale={locale} intent={{ kind: "generic" }} location="hero" size="lg" />
            <Link href={href(locale, "/work")} className={buttonClass("secondary", undefined, "lg")}>
              {t.hero.secondary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-subtle">{t.hero.replyNote}</p>
          <ul className="mt-8 hidden flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-sm text-muted sm:flex">
            {t.hero.formats.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-lime/70" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <HeroShowcase
          slides={slides}
          labels={{
            note: t.hero.note,
            prev: t.hero.prev,
            next: t.hero.next,
            position: t.hero.position,
            open: t.hero.open,
            demo: t.common.demoBadge,
            choose: t.hero.choose,
          }}
        />
      </div>
    </section>
  );
}
