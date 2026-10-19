import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getSeo, localizeProject, ownProjects, referenceProjects } from "@/lib/content";
import { ProjectCard } from "@/components/portfolio/project-card";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { projectCategories, type ProjectCategory } from "@/lib/schemas";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { WorkGallery } from "@/components/portfolio/work-gallery";
import { CtaBand } from "@/components/sections/cta-band";
import { Info } from "lucide-react";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ type?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/work", og: "work", ...getSeo("work", locale)! });
}

const filters = ["all", ...projectCategories] as const;

export default async function WorkPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { type } = await searchParams;
  const t = getDictionary(locale);
  const initial = ownProjects.some((p) => p.category === type) ? (type as ProjectCategory) : "all";

  return (
    <>
      <section className="container-page page-top pb-10">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.work.title, href: href(locale, "/work") },
          ]}
        />
        <p className="eyebrow mb-4">{t.work.eyebrow}</p>
        <h1 className="h1 max-w-4xl">{t.work.title}</h1>
        <p className="lead mt-4">{t.work.lead}</p>
      </section>
      <section aria-label={t.work.title} className="container-page pb-16 lg:pb-20">
        <WorkGallery
          initial={initial}
          filters={[...filters]}
          projects={ownProjects.map((p) => ({ ...localizeProject(p, locale), href: href(locale, `/work/${p.slug}`) }))}
          labels={{
            categories: t.work.categories,
            filtersLabel: t.work.filtersLabel,
            count: t.work.count,
            demo: t.common.demoBadge,
            own: t.selected.ownBadge,
            client: t.selected.clientBadge,
            author: t.selected.author,
            cta: t.work.cardCta,
          }}
        />
      </section>
      <section id="references" aria-labelledby="refs-title" className="section border-t border-line">
        <div className="container-page">
          <h2 id="refs-title" className="h2">
            {t.work.refsTitle}
          </h2>
          <div className="mt-4 flex max-w-3xl gap-3 rounded-xl border border-line bg-elevated px-4 py-3">
            <Info className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
            <p className="text-sm text-muted">{t.work.intro}</p>
          </div>
          <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {referenceProjects.map((raw) => {
              const p = localizeProject(raw, locale);
              return (
                <li key={p.slug}>
                  <ProjectCard
                    project={p}
                    href={href(locale, `/work/${p.slug}`)}
                    categoryLabel={t.work.categories[p.category]}
                    demoLabel={t.common.demoBadge}
                    authorLabel={t.selected.author}
                    ctaLabel={t.work.cardCta}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand locale={locale} location="work" title={t.work.ctaTitle} body={t.work.ctaBody} />
    </>
  );
}
