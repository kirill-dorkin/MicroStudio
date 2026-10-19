import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleDashed, FlaskConical } from "lucide-react";
import type { Locale } from "@/config/site";
import { fmt, getDictionary } from "@/content/locales";
import { getProject, localizeProject, projects, relatedProjects } from "@/lib/content";
import { cardLabels } from "@/lib/cards";
import { formatDate, href, locales } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { briefHref } from "@/lib/intent";
import { cn } from "@/lib/utils";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";
import { BrowserFrame, PhoneFrame } from "@/components/ui/browser-frame";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonClass } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { TrackView } from "@/components/ui/track-view";
import { ProjectCard, typeStyle } from "@/components/portfolio/project-card";
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
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    og: `work-${slug}`,
    ogImage: p.og,
    title: `${p.name} · ${t.labels.workType[p.workType]} | MicroStudio`,
    description: `${p.summary} ${p.problem.split(". ")[0]}.`.slice(0, 300),
  });
}

const featureIcon = { "production-ready": Check, "demo-logic": FlaskConical, "missing-integration": CircleDashed } as const;

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const raw = getProject(slug);
  if (!raw) notFound();
  const p = localizeProject(raw, locale);
  const t = getDictionary(locale);
  const tp = t.project;
  const index = projects.findIndex((x) => x.slug === slug);
  const next = localizeProject(projects[(index + 1) % projects.length], locale);
  const related = relatedProjects(raw, 3).map((x) => localizeProject(x, locale));
  const openLabel = p.workType === "demo" ? tp.openDemo : tp.openSite;

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
          <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-[0.78rem] font-semibold", typeStyle[p.workType])}>{t.labels.workType[p.workType]}</span>
          <span className="text-sm text-subtle">
            {t.labels.format[p.format]} · {p.niche}
          </span>
        </div>
        <h1 className="h1 mt-5 max-w-4xl">{p.name}</h1>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-10">
          <p className="lead">{p.summary}</p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:justify-end">
            <TrackedLink href={p.demoUrl} event="open_demo" params={{ project: slug, location: "case_hero" }} newTabLabel={t.common.newTab} className={buttonClass("primary")}>
              {openLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </TrackedLink>
            <WhatsappCta locale={locale} intent={{ kind: "project", slug }} location="project_hero" label={tp.similar} variant="secondary" />
          </div>
        </div>

        {p.mobileFirst ? (
          <div className="mt-8 flex justify-center rounded-[20px] border border-line bg-[linear-gradient(160deg,#1d2326,#121517)] px-6 py-10 lg:mt-10">
            <PhoneFrame className="w-full max-w-[300px]">
              <Image src={p.images.mobile.src} width={p.images.mobile.width} height={p.images.mobile.height} alt={fmt(tp.mobileAlt, { name: p.name })} priority sizes="300px" className="block h-auto w-full" />
            </PhoneFrame>
          </div>
        ) : (
          <BrowserFrame host={p.demoHost} className="mt-8 lg:mt-10">
            <Image
              src={p.images.desktop.src}
              width={p.images.desktop.width}
              height={p.images.desktop.height}
              alt={fmt(tp.heroAlt, { name: p.name })}
              priority
              sizes="(min-width: 1408px) 1280px, 100vw"
              className="block h-auto w-full"
            />
          </BrowserFrame>
        )}
      </section>

      <section className="container-page section grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 className="h2">{tp.solves}</h2>
          <p className="mt-4 max-w-[60ch] text-[1.1rem] leading-relaxed text-text/90">{p.problem}</p>
          <h3 className="label mt-8">{tp.scenario}</h3>
          <p className="mt-2 max-w-[60ch] text-muted">{p.scenario}</p>
        </div>
        <div>
          <h2 className="h2">{tp.did}</h2>
          <ul className="mt-5 space-y-3">
            {p.studio.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="screens-title" className="section border-t border-line">
        <div className="container-page">
          <h2 id="screens-title" className="h2">
            {tp.gallery}
          </h2>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
            <div className="grid gap-8">
              {p.images.gallery
                .filter((g) => g.viewport === "desktop")
                .map((g) => (
                  <figure key={g.src}>
                    <BrowserFrame host={p.demoHost}>
                      <Image src={g.src} width={g.width} height={g.height} alt={g.alt} sizes="(min-width: 1024px) 860px, 100vw" className="block h-auto w-full" />
                    </BrowserFrame>
                    <figcaption className="mt-3 text-sm text-subtle">{g.alt}</figcaption>
                  </figure>
                ))}
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {[{ src: p.images.mobile.src, width: p.images.mobile.width, height: p.images.mobile.height, alt: fmt(tp.mobileAlt, { name: p.name }) }, ...p.images.gallery.filter((g) => g.viewport === "mobile")].map((g) => (
                <figure key={g.src} className="mx-auto w-full max-w-[300px]">
                  <PhoneFrame>
                    <Image src={g.src} width={g.width} height={g.height} alt={g.alt} sizes="300px" className="block h-auto w-full" />
                  </PhoneFrame>
                  <figcaption className="mt-3 text-center text-sm text-subtle">{g.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="caps-title" className="section border-t border-line">
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <h2 id="caps-title" className="h2">
              {tp.capabilities}
            </h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {p.features.map((f) => {
                const Icon = featureIcon[f.kind];
                return (
                  <li key={f.text} className="flex gap-4 py-4">
                    <Icon className={cn("mt-0.5 size-5 shrink-0", f.kind === "production-ready" ? "text-lime" : "text-muted")} aria-hidden="true" />
                    <div>
                      <p>{f.text}</p>
                      <p className="mt-0.5 text-sm text-subtle">{t.labels.feature[f.kind]}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-muted">
              <span className="font-semibold text-text">{tp.limits}: </span>
              {p.limits}
            </p>
          </div>
          <aside aria-labelledby="origin-title" className="h-fit rounded-[20px] border border-line bg-elevated p-6">
            <h2 id="origin-title" className="h3">
              {tp.provenance}
            </h2>
            <p className="mt-3 text-[0.95rem] text-muted">{p.provenance.text}</p>
            {p.provenance.upstream && (
              <p className="mt-3 text-[0.95rem]">
                {tp.upstream}:{" "}
                <a href={p.provenance.upstream.url} target="_blank" rel="noopener noreferrer" className="text-lime underline underline-offset-4">
                  {p.provenance.upstream.name}
                  <span className="sr-only"> ({t.common.newTab})</span>
                </a>{" "}
                · {p.provenance.upstream.authors} ·{" "}
                <a href={p.provenance.upstream.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {p.provenance.upstream.license}
                  <span className="sr-only"> ({t.common.newTab})</span>
                </a>
              </p>
            )}
            {p.provenance.assets.length > 0 && (
              <>
                <h3 className="label mt-5">{tp.assets}</h3>
                <ul className="mt-2 space-y-1 text-[0.92rem]">
                  {p.provenance.assets.map((a) => (
                    <li key={a.name}>
                      <a href={a.source} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:text-lime">
                        {a.name}
                        <span className="sr-only"> ({t.common.newTab})</span>
                      </a>{" "}
                      <span className="text-subtle">· {a.license}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t border-line pt-4 text-sm">
              {p.client && (
                <>
                  <dt className="text-subtle">{tp.client}</dt>
                  <dd>{p.client.name}</dd>
                </>
              )}
              <dt className="text-subtle">{tp.published}</dt>
              <dd>{formatDate(p.publishedAt, locale)}</dd>
              <dt className="text-subtle">{tp.verified}</dt>
              <dd>{formatDate(p.verifiedAt, locale)}</dd>
            </dl>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section border-t border-line">
          <div className="container-page">
            <div className="flex items-end justify-between gap-6">
              <h2 id="related-title" className="h2">
                {tp.related}
              </h2>
              <Link href={href(locale, "/work")} className="hidden min-h-11 items-center gap-2 text-muted hover:text-text sm:inline-flex">
                {tp.back}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProjectCard project={r} href={href(locale, `/work/${r.slug}`)} labels={cardLabels(r, locale)} showSummary={false} />
                </li>
              ))}
            </ul>
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
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={briefHref(locale, { kind: "project", slug })} className="inline-flex min-h-11 items-center text-sm text-muted underline-offset-4 hover:text-text hover:underline">
              {tp.similarBrief}
            </Link>
            <Link href={href(locale, `/work/${next.slug}`)} className="group inline-flex min-h-11 items-center gap-3 font-display text-xl font-semibold">
              <span className="text-sm font-normal text-subtle">{tp.next}:</span>
              {next.name}
              <ArrowRight className="size-5 text-lime transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
