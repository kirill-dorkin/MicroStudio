import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getSeo, localizeProject, projects } from "@/lib/content";
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
  const initial = (projectCategories as readonly string[]).includes(type ?? "")
    ? (type as ProjectCategory)
    : "all";

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
        <p className="eyebrow mb-5">{t.work.eyebrow}</p>
        <h1 className="h1 max-w-4xl">{t.work.title}</h1>
        <div className="mt-5 flex max-w-3xl gap-3 rounded-xl border border-line bg-elevated px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden="true" />
          <p className="text-sm text-muted">{t.work.intro}</p>
        </div>
      </section>
      <section aria-label={t.work.title} className="container-page pb-16 lg:pb-20">
        <WorkGallery
          initial={initial}
          filters={[...filters]}
          projects={projects.map((p) => ({ ...localizeProject(p, locale), href: href(locale, `/work/${p.slug}`) }))}
          labels={{
            categories: t.work.categories,
            filtersLabel: t.work.filtersLabel,
            count: t.work.count,
            demo: t.common.demoBadge,
            author: t.selected.author,
            cta: t.work.cardCta,
          }}
        />
      </section>
      <CtaBand locale={locale} location="work" title={t.work.ctaTitle} body={t.work.ctaBody} />
    </>
  );
}
