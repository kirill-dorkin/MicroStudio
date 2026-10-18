import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getProject, localizeProject } from "@/lib/content";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { HeroShowcase } from "@/components/portfolio/hero-showcase";

const heroSlugs = ["fashion-store", "dashboard-pulse", "restaurant-tablefork"];

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const slides = heroSlugs.map((slug) => {
    const p = localizeProject(getProject(slug)!, locale);
    return {
      slug,
      name: p.name,
      short: p.name,
      image: p.screenshots.desktop,
      host: p.demoHost,
      href: href(locale, `/work/${slug}`),
    };
  });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(62px+2.5rem)] lg:pt-[calc(74px+4rem)]">
      {/* Quiet grid texture instead of glow effects. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <div className="container-page relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 pb-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-16 lg:pb-28">
        <div>
          <p className="eyebrow mb-6">{t.hero.kicker}</p>
          <h1 id="hero-title" className="h1 max-w-[14ch]">
            {t.hero.title}
          </h1>
          <p className="lead mt-6 max-w-[36rem]">{t.hero.body}</p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <TrackedLink
              href={href(locale, "/contact")}
              event="cta_contact"
              params={{ location: "hero" }}
              className={buttonClass("primary")}
            >
              {t.hero.primary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </TrackedLink>
            <Link href={href(locale, "/work")} className={buttonClass("secondary")}>
              {t.hero.secondary}
            </Link>
          </div>
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
          }}
        />
      </div>
    </section>
  );
}
