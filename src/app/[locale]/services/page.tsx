import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getServices } from "@/content/services";
import { getSeo } from "@/lib/content";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Process } from "@/components/sections/home/process";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/services", og: "services", ...getSeo("services", locale)! });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const services = getServices(locale);

  return (
    <>
      <section className="container-page pb-16 pt-[calc(62px+3rem)] lg:pt-[calc(74px+4.5rem)]">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.services, href: href(locale, "/services") },
          ]}
        />
        <p className="eyebrow mb-5">{t.services.eyebrow}</p>
        <h1 className="h1 max-w-5xl">{t.services.title}</h1>
        <p className="lead mt-6 max-w-2xl">{t.services.lead}</p>
      </section>

      <section aria-label={t.nav.services} className="container-page pb-20 lg:pb-28">
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.slug} className="group relative flex flex-col rounded-[24px] border border-line bg-elevated p-7 transition-colors duration-300 hover:border-line-strong md:p-9" data-reveal>
              <div className="flex items-start justify-between gap-6">
                <span className="font-display text-sm font-semibold text-lime">0{i + 1}</span>
                <span aria-hidden="true" className="inline-flex size-12 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-bg">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
              <h2 className="mt-8 font-display text-[1.9rem] font-bold leading-tight tracking-[-0.025em] md:text-[2.4rem]">
                <Link href={href(locale, `/services/${s.slug}`)} className="after:absolute after:inset-0 after:rounded-[24px] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-lime">
                  {s.title}
                </Link>
              </h2>
              <p className="mt-4 text-muted">{s.lead}</p>
              <ul className="mt-8 grid gap-2 border-t border-line pt-6 text-[0.95rem] sm:grid-cols-2">
                {s.whatWeDo.map((w) => (
                  <li key={w.title} className="flex gap-2.5">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-lime" aria-hidden="true" />
                    {w.title}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 text-sm text-subtle">{s.price}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-muted">
          <Link href={href(locale, "/special")} className="text-text underline decoration-lime underline-offset-4 hover:text-lime">
            {t.services.specialHint}
          </Link>
        </p>
      </section>

      <Process locale={locale} />
      <CtaBand locale={locale} location="services" title={t.services.ctaTitle} body={t.services.ctaBody} />
    </>
  );
}
