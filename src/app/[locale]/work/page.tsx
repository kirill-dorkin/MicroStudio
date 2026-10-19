import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getSeo, localizeProject, projects } from "@/lib/content";
import { cardLabels } from "@/lib/cards";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Catalog, type CatalogItem } from "@/components/portfolio/catalog";
import { ProjectCard } from "@/components/portfolio/project-card";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/work", og: "work", ...getSeo("work", locale)! });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const tw = t.work;
  const lp = projects.map((p) => localizeProject(p, locale));
  const items: CatalogItem[] = lp.map((p, i) => ({
    slug: p.slug,
    name: p.name,
    niche: p.niche,
    summary: p.summary,
    workType: p.workType,
    demoUrl: p.demoUrl,
    mobileFirst: p.mobileFirst,
    images: { desktop: p.images.desktop, mobile: p.images.mobile },
    href: href(locale, `/work/${p.slug}`),
    format: p.format,
    industry: p.industry,
    publishedAt: p.publishedAt,
    rank: i,
    openLabel: p.workType === "demo" ? t.common.openDemo : t.common.openSite,
    haystack: [p.name, p.niche, p.summary, p.problem, t.labels.industry[p.industry], t.labels.format[p.format], t.labels.workType[p.workType]]
      .join(" ")
      .toLowerCase()
      .replace(/ё/g, "е"),
  }));

  // Without JavaScript (and before hydration) the first page renders as plain cards.
  const fallback = (
    <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {lp.slice(0, 12).map((p, i) => (
        <li key={p.slug}>
          <ProjectCard project={p} href={href(locale, `/work/${p.slug}`)} labels={cardLabels(p, locale)} priority={i < 3} />
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <section className="container-page page-top pb-8">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: tw.title, href: href(locale, "/work") },
          ]}
        />
        <h1 className="h1 max-w-4xl">{tw.title}</h1>
        <p className="lead mt-4">{tw.lead}</p>
      </section>
      <section aria-label={tw.title} className="container-page pb-16 lg:pb-20">
        <Suspense fallback={fallback}>
          <Catalog
            items={items}
            locale={locale}
            labels={{
              searchLabel: tw.searchLabel,
              searchPlaceholder: tw.searchPlaceholder,
              clearSearch: tw.clearSearch,
              formatLabel: tw.formatLabel,
              industryLabel: tw.industryLabel,
              typeLabel: tw.typeLabel,
              sortLabel: tw.sortLabel,
              sort: tw.sort,
              filters: tw.filters,
              showFilters: tw.showFilters,
              hideFilters: tw.hideFilters,
              count: tw.count,
              countLabel: tw.countLabel,
              reset: tw.reset,
              removeFilter: tw.removeFilter,
              more: tw.more,
              empty: tw.empty,
              emptyHint: tw.emptyHint,
              open: t.common.openDemo,
              details: t.selected.details,
              newTab: t.common.newTab,
              formats: t.labels.formatFilter,
              formatSingle: t.labels.format,
              industries: t.labels.industry,
              industryAll: t.labels.industryAll,
              types: t.labels.workTypeFilter,
              typeSingle: t.labels.workType,
            }}
          />
        </Suspense>
        <noscript>
          <h2 className="h3 mt-12">{tw.allList}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {lp.map((p) => (
              <li key={p.slug}>
                <Link href={href(locale, `/work/${p.slug}`)} className="text-lime underline underline-offset-4">
                  {p.name}
                </Link>{" "}
                <span className="text-muted">— {p.niche}</span>
              </li>
            ))}
          </ul>
        </noscript>
      </section>
      <CtaBand locale={locale} location="work" title={tw.ctaTitle} body={tw.ctaBody} />
    </>
  );
}
