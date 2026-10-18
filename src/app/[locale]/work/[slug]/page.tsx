import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github, ShieldAlert } from "lucide-react";
import type { Locale } from "@/config/site";
import { fmt, getDictionary } from "@/content/locales";
import manifest from "@/data/capture-manifest.json";
import { getProject, localizeProject, projects } from "@/lib/content";
import { formatDate, href, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { BrowserFrame, PhoneFrame } from "@/components/ui/browser-frame";
import { DemoBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { TrackView } from "@/components/ui/track-view";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = getProject(slug);
  if (!raw) return {};
  const p = localizeProject(raw, locale);
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    og: `work-${slug}`,
    title: `${p.name} | MicroStudio`,
    description: `${locale === "ru" ? "Open-source демо" : "Open-source demo"}: ${p.description} ${locale === "ru" ? "Автор" : "Author"}: ${p.author}, ${p.license}.`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const raw = getProject(slug);
  if (!raw) notFound();
  const p = localizeProject(raw, locale);
  const t = getDictionary(locale);
  const tp = t.project;
  const capturedAt = (manifest as Record<string, { capturedAt?: string }>)[slug]?.capturedAt;
  const index = projects.findIndex((x) => x.slug === slug);
  const next = localizeProject(projects[(index + 1) % projects.length], locale);

  const meta = [
    [tp.sector, p.sector],
    [tp.category, t.work.categories[p.category]],
    [tp.stack, p.tech.join(", ")],
    [tp.license, p.license],
    [tp.author, p.author],
  ];

  return (
    <>
      <TrackView event="view_project" params={{ project: slug }} />
      <section className="container-page pt-[calc(62px+3rem)] lg:pt-[calc(74px+4.5rem)]">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.work.title, href: href(locale, "/work") },
            { name: p.name, href: href(locale, `/work/${slug}`) },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3">
          <DemoBadge label={t.common.demoBadgeLong} />
          <span className="text-sm text-subtle">
            {t.work.categories[p.category]} · {p.sector}
          </span>
        </div>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.25rem,1.3rem+4vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.035em]">
          {p.name}
        </h1>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <p className="lead max-w-2xl">{p.description}</p>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <TrackedLink
              href={p.demo}
              event="open_demo"
              params={{ project: slug }}
              newTabLabel={t.common.newTab}
              className={buttonClass("primary")}
            >
              {t.common.openDemo}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={p.source}
              event="open_github"
              params={{ project: slug }}
              newTabLabel={t.common.newTab}
              className={buttonClass("secondary")}
            >
              <Github className="size-4" aria-hidden="true" />
              GitHub
            </TrackedLink>
          </div>
        </div>

        <div className="mt-10 flex gap-4 rounded-2xl border border-lime/25 bg-lime/[0.05] p-5 md:p-6" role="note">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-lime" aria-hidden="true" />
          <p className="text-[0.98rem] text-text/90">{tp.disclosure}</p>
        </div>

        <BrowserFrame host={p.demoHost} className="mt-12 lg:mt-16">
          <div className="relative aspect-[16/10] bg-[#f3f3f1]">
            <Image
              src={p.screenshots.desktop}
              alt={fmt(tp.heroAlt, { name: p.name })}
              fill
              priority
              sizes="(min-width: 1408px) 1280px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </BrowserFrame>
      </section>

      <section className="container-page grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-28">
        <div>
          <h2 className="h3 text-subtle">{tp.overview}</h2>
          <p className="mt-5 font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.85rem)] font-medium leading-[1.4] tracking-[-0.015em]">
            {p.overview}
          </p>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="h3">{tp.features}</h2>
              <ul className="mt-5 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="h3">{tp.lookFor}</h2>
              <ul className="mt-5 space-y-3 text-muted">
                {p.lookFor.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-lime" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <dl className="h-fit divide-y divide-line rounded-2xl border border-line bg-elevated px-6">
          {meta.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 py-4">
              <dt className="text-subtle">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="screens-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <h2 id="screens-title" className="h2">
            {tp.screens}
          </h2>
          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
            <figure>
              <BrowserFrame host={p.demoHost}>
                <div className="relative aspect-[16/10] bg-[#f3f3f1]">
                  <Image
                    src={p.screenshots.detail}
                    alt={fmt(tp.detailAlt, { name: p.name })}
                    fill
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </BrowserFrame>
              <figcaption className="mt-4 text-sm text-subtle">{tp.desktopShot}</figcaption>
            </figure>
            <figure className="mx-auto w-full max-w-[300px]">
              <PhoneFrame>
                <div className="relative aspect-[390/844] bg-[#f3f3f1]">
                  <Image
                    src={p.screenshots.mobile}
                    alt={fmt(tp.mobileAlt, { name: p.name })}
                    fill
                    sizes="300px"
                    className="object-cover object-top"
                  />
                </div>
              </PhoneFrame>
              <figcaption className="mt-4 text-center text-sm text-subtle">{tp.mobileShot}</figcaption>
            </figure>
          </div>
          {capturedAt && (
            <p className="mt-10 max-w-3xl text-sm text-subtle">
              {fmt(tp.captured, { date: formatDate(capturedAt.slice(0, 10), locale) })}
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="credits-title" className="border-t border-line py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="credits-title" className="h2">
            {tp.credits}
          </h2>
          <div className="rounded-2xl border border-line bg-elevated p-6 md:p-8">
            <dl className="grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-subtle">{tp.author}</dt>
                <dd className="mt-1">{p.author}</dd>
              </div>
              <div>
                <dt className="text-sm text-subtle">{tp.copyright}</dt>
                <dd className="mt-1">{p.copyright}</dd>
              </div>
              <div>
                <dt className="text-sm text-subtle">{tp.sourceRepo}</dt>
                <dd className="mt-1">
                  <TrackedLink
                    href={p.source}
                    event="open_github"
                    params={{ project: slug, location: "credits" }}
                    newTabLabel={t.common.newTab}
                    className="break-all text-lime underline underline-offset-4"
                  >
                    {p.source.replace("https://", "")}
                  </TrackedLink>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-subtle">{tp.license}</dt>
                <dd className="mt-1">
                  <a href={p.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-lime underline underline-offset-4">
                    {p.license} — {tp.licenseText}
                    <span className="sr-only"> ({t.common.newTab})</span>
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-line pt-6 font-semibold">{tp.notForClient}</p>
          </div>
        </div>
      </section>

      <CtaBand locale={locale} location={`project_${slug}`} title={tp.ctaTitle} body={tp.ctaBody} />

      <nav aria-label={tp.next} className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href={href(locale, "/work")} className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-text">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {tp.back}
          </Link>
          <Link
            href={href(locale, `/work/${next.slug}`)}
            className="group inline-flex min-h-11 items-center gap-3 font-display text-xl font-semibold"
          >
            <span className="text-sm font-normal text-subtle">{tp.next}:</span>
            {next.name}
            <ArrowRight className="size-5 text-lime transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </>
  );
}
