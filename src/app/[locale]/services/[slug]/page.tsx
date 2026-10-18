import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getService, getServices, serviceSlugs } from "@/content/services";
import { getPosts, localizeProject, relatedProjects } from "@/lib/content";
import { href, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, faqLd, serviceLd } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { TrackedLink } from "@/components/ui/tracked-link";
import { TrackView } from "@/components/ui/track-view";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

const seoTitles: Record<Locale, Record<string, string>> = {
  ru: {
    websites: "Разработка сайтов для бизнеса — MicroStudio",
    design: "Дизайн сайтов и UX/UI для бизнеса — MicroStudio",
    advertising: "Реклама, посадочные страницы и аналитика — MicroStudio",
    support: "Доработка и поддержка сайтов — MicroStudio",
  },
  en: {
    websites: "Website Development for Business — MicroStudio",
    design: "Website Design and UX/UI — MicroStudio",
    advertising: "Advertising, Landing Pages and Analytics — MicroStudio",
    support: "Website Improvements and Support — MicroStudio",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getService(locale, slug);
  if (!s) return {};
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    og: `service-${slug}`,
    title: seoTitles[locale][slug],
    description: s.lead,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const s = getService(locale, slug);
  if (!s) notFound();
  const t = getDictionary(locale);
  const ts = t.services;
  const related = relatedProjects(s.relatedCategories, 3).map((p) => localizeProject(p, locale));
  const post = getPosts(locale).find((p) => p.ruSlug === s.relatedPost)!;
  const others = getServices(locale).filter((o) => o.slug !== s.slug);
  const path = href(locale, `/services/${slug}`);

  return (
    <>
      <TrackView event="view_service" params={{ service: slug }} />
      <JsonLd data={serviceLd(s.title, s.lead, path, locale)} />
      <JsonLd data={faqLd(s.faq)} />

      <section className="container-page pb-16 pt-[calc(62px+3rem)] lg:pb-24 lg:pt-[calc(74px+4.5rem)]">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.services, href: href(locale, "/services") },
            { name: s.title, href: path },
          ]}
        />
        <p className="eyebrow mb-5">{s.title}</p>
        <h1 className="h1 max-w-5xl">{s.heroTitle}</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <p className="lead max-w-2xl">{s.lead}</p>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <TrackedLink
              href={`${href(locale, "/contact")}?service=${slug}`}
              event="cta_contact"
              params={{ location: `service_${slug}` }}
              className={buttonClass("primary")}
            >
              {t.nav.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            <a href="#examples" className={buttonClass("secondary")}>
              {ts.examples}
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="for-whom" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <h2 id="for-whom" className="h2" data-reveal>
            {ts.forWhom}
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {s.forWhom.map((item) => (
              <li key={item} className="flex gap-4 py-5 text-[1.05rem]" data-reveal>
                <Check className="mt-1 size-5 shrink-0 text-lime" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="what-we-do" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <h2 id="what-we-do" className="h2" data-reveal>
            {ts.whatWeDo}
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {s.whatWeDo.map((w, i) => (
              <li key={w.title} className="bg-bg p-7 md:p-9" data-reveal>
                <span className="font-display text-sm font-semibold text-lime">0{i + 1}</span>
                <h3 className="h3 mt-5">{w.title}</h3>
                <p className="mt-3 text-muted">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="you-get" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 id="you-get" className="h2">
              {ts.youGet}
            </h2>
            <p className="lead mt-6">{s.outcome}</p>
            <div className="mt-10 rounded-2xl border border-line bg-elevated p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-subtle">{ts.price}</p>
              <p className="mt-2">{s.price}</p>
            </div>
          </div>
          <ul className="space-y-3">
            {s.youGet.map((item) => (
              <li key={item} className="flex gap-4 rounded-2xl border border-line p-5" data-reveal>
                <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-lime text-bg">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-we-work" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <h2 id="how-we-work" className="h2" data-reveal>
            {ts.howWeWork}
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((step, i) => (
              <li key={step.title} className="border-t border-line pt-6" data-reveal>
                <span className="font-display text-sm font-semibold tabular-nums text-lime">0{i + 1}</span>
                <h3 className="h3 mt-4">{step.title}</h3>
                <p className="mt-3 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="examples" aria-labelledby="examples-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
            <div>
              <h2 id="examples-title" className="h2">
                {ts.examples}
              </h2>
              <p className="mt-4 max-w-2xl text-muted">{ts.examplesNote}</p>
            </div>
            <Link href={href(locale, "/work")} className={buttonClass("secondary")}>
              {t.selected.cta}
            </Link>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug} data-reveal>
                <ProjectCard
                  project={p}
                  href={href(locale, `/work/${p.slug}`)}
                  categoryLabel={t.work.categories[p.category]}
                  demoLabel={t.common.demoBadge}
                  authorLabel={t.selected.author}
                  ctaLabel={t.work.cardCta}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="service-faq" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 id="service-faq" className="h2" data-reveal>
              {ts.faq}
            </h2>
            {post && (
              <Link
                href={href(locale, `/blog/${post.slug}`)}
                className="group mt-10 block rounded-2xl border border-line bg-elevated p-6 transition-colors hover:border-line-strong"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">{ts.readAlso}</span>
                <span className="mt-3 flex items-start justify-between gap-4 font-display text-lg font-semibold">
                  {post.title}
                  <ArrowUpRight className="size-5 shrink-0 text-lime" aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
          <FaqList items={s.faq} />
        </div>
      </section>

      <section aria-labelledby="other-services" className="border-t border-line py-16">
        <div className="container-page">
          <h2 id="other-services" className="text-sm font-semibold uppercase tracking-[0.14em] text-subtle">
            {ts.other}
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={href(locale, `/services/${o.slug}`)}
                  className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-line px-6 py-5 font-display text-lg font-semibold transition-colors hover:border-lime/50"
                >
                  {o.title}
                  <ArrowRight className="size-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-lime" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          {slug === "websites" && (
            <p className="mt-8 text-muted">
              <Link href={href(locale, "/special")} className="text-text underline decoration-lime underline-offset-4 hover:text-lime">
                {ts.specialHint}
              </Link>
            </p>
          )}
        </div>
      </section>

      <CtaBand locale={locale} location={`service_${slug}`} title={ts.ctaTitle} body={ts.ctaBody} />
    </>
  );
}
