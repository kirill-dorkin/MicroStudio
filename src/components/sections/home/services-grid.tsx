import Link from "next/link";
import { ArrowUpRight, LayoutTemplate, LifeBuoy, Megaphone, Palette, Search, Workflow } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getServices, type ServiceSlug } from "@/content/services";
import { href } from "@/lib/i18n";

const icons: Record<ServiceSlug, typeof Search> = {
  strategy: Search,
  design: Palette,
  websites: LayoutTemplate,
  automation: Workflow,
  marketing: Megaphone,
  support: LifeBuoy,
};

/** Six full-cycle directions on a light surface: the one bright break in a dark page. */
export function ServicesGrid({ locale, headingLevel = "h2" }: { locale: Locale; headingLevel?: "h2" | "h3" }) {
  const t = getDictionary(locale);
  const services = getServices(locale);
  const Title = headingLevel;
  return (
    <section aria-labelledby="services-title" className="section bg-[#f2f1ec] text-[#14171a]">
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#4b524f]">{t.servicesHome.eyebrow}</p>
            <h2 id="services-title" className="h2">
              {t.servicesHome.title}
            </h2>
            <p className="mt-4 text-[1.05rem] text-[#4b524f]">{t.servicesHome.subtitle}</p>
          </div>
          <Link href={href(locale, "/services")} className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-[#14171a]/30 underline-offset-4 hover:decoration-[#14171a]">
            {t.nav.services}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-[#d9d7cf] bg-[#d9d7cf] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.slug];
            return (
              <li key={s.slug} className="group relative flex flex-col bg-[#f8f7f3] p-6 transition-colors hover:bg-white md:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-[#14171a] text-[#c7f66c]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tabular-nums text-[#6b716e]">0{i + 1}</span>
                </div>
                <Title className="mt-5 font-display text-[1.3rem] font-bold tracking-[-0.02em]">
                  <Link href={href(locale, `/services/${s.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-[#14171a]">
                    {s.title}
                  </Link>
                </Title>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-[#3f4643]">{s.card}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold" aria-hidden="true">
                  {t.servicesHome.more}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
