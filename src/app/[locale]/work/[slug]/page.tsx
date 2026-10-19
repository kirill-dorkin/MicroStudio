import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github, Info } from "lucide-react";
import type { Locale } from "@/config/site";
import { fmt, getDictionary } from "@/content/locales";
import manifest from "@/data/capture-manifest.json";
import { getProject, localizeProject, ownProjects, projects, referenceProjects } from "@/lib/content";
import { formatDate, href, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { briefHref } from "@/lib/intent";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";
import { BrowserFrame, PhoneFrame } from "@/components/ui/browser-frame";
import { DemoBadge, WorkBadge } from "@/components/ui/badge";
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
  const ru = locale === "ru";
  const description = p.own
    ? `${ru ? "Проект MicroStudio" : "MicroStudio project"}: ${p.description}`
    : `${ru ? "Open-source шаблон" : "Open-source template"}: ${p.description} ${ru ? "Автор" : "Author"}: ${p.author}, ${p.license}.`;
  return pageMetadata({ locale, path: `/work/${slug}`, og: `work-${slug}`, title: `${p.name} | MicroStudio`, description });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const raw = getProject(slug);
  if (!raw) notFound();
  const p = localizeProject(raw, locale);
  const t = getDictionary(locale);
  const tp = t.project;
  const capturedAt = (manifest as Record<string, { capturedAt?: string }>)[slug]?.capturedAt;
  // "Next" stays inside the same group: own work, or references.
  const group = p.own ? ownProjects : referenceProjects;
  const index = group.findIndex((x) => x.slug === slug);
  const next = localizeProject(group[(index + 1) % group.length], locale);

  const meta: [string, string][] = [
    ...(raw.client ? [[tp.client, raw.client] as [string, string]] : []),
    [tp.sector, p.sector],
    [tp.category, t.work.categories[p.category]],
    [tp.stack, p.tech.join(", ")],
    ...(!p.own ? ([[tp.license, p.license ?? ""], [tp.author, p.author ?? ""]] as [string, string][]) : []),
  ];

  const openLabel = p.own ? tp.openSite : t.common.openDemo;
  const detail = p.screenshots.detail;

  return (
    <>
      <TrackView event="view_project" params={{ project: slug }} />
      <section className="container-page page-top">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.work.title, href: href(locale, "/work") },
            { name: p.name, href: href(locale, `/work/${slug}`) },
          ]}
        />
        <div className="flex flex-wrap items-center gap-3">
          {p.own ? (
            <WorkBadge label={raw.kind === "client-project" ? t.selected.clientBadge : t.selected.ownBadge} />
          ) : (
            <DemoBadge label={t.common.demoBadgeLong} />
          )}
          <span className="text-sm text-subtle">
            {t.work.categories[p.category]} · {p.sector}
          </span>
        </div>
        <h1 className="h1 mt-5 max-w-4xl">{p.name}</h1>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-10">
          <p className="lead">{p.description}</p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:justify-end">
            <WhatsappCta locale={locale} intent={{ kind: "project", slug }} location="project_hero" label={tp.similar} />
            <TrackedLink
              href={p.demo}
              event="open_demo"
              params={{ project: slug }}
              newTabLabel={t.common.newTab}
              className={buttonClass("secondary")}
            >
              {openLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            {p.source && (
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
            )}
          </div>
        </div>

        {!p.own && (
          <div className="mt-6 flex gap-3 rounded-xl border border-line bg-elevated px-4 py-3" role="note">
            <Info className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
            <p className="text-sm text-muted">{tp.disclosure}</p>
          </div>
        )}

        {p.mobileFirst ? (
          <div className="mt-8 flex justify-center rounded-[20px] border border-line bg-[linear-gradient(160deg,#1d2326,#121517)] px-6 py-10 lg:mt-10">
            <PhoneFrame className="w-full max-w-[300px]">
              <div className="relative aspect-[390/844] bg-white">
                <Image src={p.screenshots.mobile} alt={fmt(tp.mobileAlt, { name: p.name })} fill priority sizes="300px" className="object-cover object-top" />
              </div>
            </PhoneFrame>
          </div>
        ) : (
          <BrowserFrame host={p.demoHost} className="mt-8 lg:mt-10">
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
        )}
      </section>

      <section className="container-page section grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <h2 className="h3 text-subtle">{tp.overview}</h2>
          <p className="mt-4 max-w-[60ch] text-[1.1rem] leading-relaxed text-text/90 md:text-[1.2rem]">{p.overview}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="h3">{p.own ? tp.featuresOwn : tp.features}</h2>
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
        <div className="h-fit space-y-4">
          <dl className="divide-y divide-line rounded-[20px] border border-line bg-elevated px-6">
            {meta.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4">
                <dt className="text-subtle">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          <Link href={briefHref(locale, { kind: "project", slug })} className={buttonClass("quiet", "w-full", "sm")}>
            {tp.similarBrief}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="screens-title" className="section border-t border-line">
        <div className="container-page">
          <h2 id="screens-title" className="h2">
            {tp.screens}
          </h2>
          {p.mobileFirst ? (
            <figure className="mt-8 lg:max-w-3xl">
              <BrowserFrame host={p.demoHost}>
                <div className="relative aspect-[16/10] bg-[#f3f3f1]">
                  <Image src={p.screenshots.desktop} alt={fmt(tp.heroAlt, { name: p.name })} fill sizes="(min-width: 1024px) 760px, 100vw" className="object-cover object-top" />
                </div>
              </BrowserFrame>
              <figcaption className="mt-4 text-sm text-subtle">{tp.desktopFirst}</figcaption>
            </figure>
          ) : (
            <div className={detail ? "mt-8 grid items-start gap-8 lg:grid-cols-[1fr_280px] lg:gap-12" : "mt-8"}>
              {detail && (
                <figure>
                  <BrowserFrame host={p.demoHost}>
                    <div className="relative aspect-[16/10] bg-[#f3f3f1]">
                      <Image src={detail} alt={fmt(tp.detailAlt, { name: p.name })} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover object-top" />
                    </div>
                  </BrowserFrame>
                  <figcaption className="mt-4 text-sm text-subtle">{tp.desktopShot}</figcaption>
                </figure>
              )}
              <figure className={detail ? "mx-auto w-full max-w-[280px]" : "w-full max-w-[280px]"}>
                <PhoneFrame>
                  <div className="relative aspect-[390/844] bg-[#f3f3f1]">
                    <Image src={p.screenshots.mobile} alt={fmt(tp.mobileAlt, { name: p.name })} fill sizes="280px" className="object-cover object-top" />
                  </div>
                </PhoneFrame>
                <figcaption className="mt-4 text-center text-sm text-subtle">{tp.mobileShot}</figcaption>
              </figure>
            </div>
          )}
          {capturedAt && (
            <p className="mt-8 max-w-3xl text-sm text-subtle">
              {fmt(p.own ? tp.capturedOwn : tp.captured, { date: formatDate(capturedAt.slice(0, 10), locale) })}
            </p>
          )}
        </div>
      </section>

      {!p.own && p.source && (
        <section aria-labelledby="credits-title" className="section border-t border-line">
          <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <h2 id="credits-title" className="h2">
              {tp.credits}
            </h2>
            <div className="card p-6 md:p-8">
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
      )}

      <CtaBand locale={locale} location={`project_${slug}`} title={tp.ctaTitle} body={tp.ctaBody} intent={{ kind: "project", slug }} />

      <nav aria-label={tp.next} className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href={href(locale, "/work")} className="inline-flex min-h-11 items-center gap-2 text-muted hover:text-text">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {tp.back}
          </Link>
          <Link href={href(locale, `/work/${next.slug}`)} className="group inline-flex min-h-11 items-center gap-3 font-display text-xl font-semibold">
            <span className="text-sm font-normal text-subtle">{tp.next}:</span>
            {next.name}
            <ArrowRight className="size-5 text-lime transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </>
  );
}
