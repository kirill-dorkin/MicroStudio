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
import { WhatsappCta } from "@/components/ui/whatsapp-cta";
import { SectionHeading } from "@/components/ui/section-heading";
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

      <section className="container-page page-top pb-12">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.services, href: href(locale, "/services") },
            { name: s.title, href: path },
          ]}
        />
        <p className="eyebrow mb-4">{s.title}</p>
        <h1 className="h1 max-w-[20ch]">{s.heroTitle}</h1>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-10">
          <p className="lead">{s.lead}</p>
          <div className="flex flex-col gap-2.5 sm:flex-row lg:justify-end">
            <WhatsappCta locale={locale} intent={{ kind: "service", slug: s.slug }} location={`service_${slug}`} />
            <a href="#examples" className={buttonClass("secondary")}>
              {ts.examples}
            </a>
          </div>
        </div>
      </section>

      <section aria-label={`${ts.forWhom} · ${ts.youGet}`} className="section-tight border-t border-line">
        <div className="container-page grid gap-4 lg:grid-cols-2">
          <div className="card p-6 md:p-8">
            <h2 className="h3">{ts.forWhom}</h2>
            <ul className="mt-5 space-y-3.5">
              {s.forWhom.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-line p-6 md:p-8">
            <h2 className="h3">{ts.youGet}</h2>
            <ul className="mt-5 space-y-3.5">
              {s.youGet.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
              <span className="font-semibold text-text">{ts.price}: </span>
              {s.price}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="what-we-do" className="section border-t border-line">
        <div className="container-page">
          <h2 id="what-we-do" className="h2">
            {ts.whatWeDo}
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-2">
            {s.whatWeDo.map((w) => (
              <li key={w.title} className="bg-bg p-6 md:p-7">
                <h3 className="h3">{w.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{w.body}</p>
              </li>
            ))}
          </ul>
          <h3 className="label mt-10">{ts.howWeWork}</h3>
          <ol className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-xs font-semibold text-lime">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-[0.92rem] text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="examples" aria-labelledby="examples-title" className="section border-t border-line">
        <div className="container-page">
          <SectionHeading
            id="examples-title"
            title={ts.examples}
            lead={ts.examplesNote}
            action={
              <Link href={href(locale, "/work")} className={buttonClass("secondary")}>
                {t.selected.cta}
              </Link>
            }
          />
          <ul className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
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

      <section aria-labelledby="service-faq" className="section border-t border-line">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div>
            <h2 id="service-faq" className="h2">
              {ts.faq}
            </h2>
            {post && (
              <Link
                href={href(locale, `/blog/${post.slug}`)}
                className="group mt-8 block rounded-[20px] border border-line bg-elevated p-5 transition-colors hover:border-line-strong"
              >
                <span className="label">{ts.readAlso}</span>
                <span className="mt-2 flex items-start justify-between gap-4 font-semibold">
                  {post.title}
                  <ArrowUpRight className="size-5 shrink-0 text-lime" aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
          <FaqList items={s.faq} />
        </div>
      </section>

      <section aria-labelledby="other-services" className="section-tight border-t border-line">
        <div className="container-page">
          <h2 id="other-services" className="label">
            {ts.other}
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={href(locale, `/services/${o.slug}`)}
                  className="group flex min-h-14 items-center justify-between gap-4 rounded-[16px] border border-line px-5 py-4 font-semibold transition-colors hover:border-line-strong hover:bg-white/[0.03]"
                >
                  {o.title}
                  <ArrowRight className="size-4 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-lime" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          {slug === "websites" && (
            <p className="mt-6">
              <Link href={href(locale, "/special")} className="text-muted underline decoration-lime underline-offset-4 hover:text-text">
                {ts.specialHint}
              </Link>
            </p>
          )}
        </div>
      </section>

      <CtaBand locale={locale} location={`service_${slug}`} title={ts.ctaTitle} body={ts.ctaBody} intent={{ kind: "service", slug: s.slug }} />
    </>
  );
}
