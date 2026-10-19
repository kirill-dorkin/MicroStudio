import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { featuredProjects, localizeProject } from "@/lib/content";
import { cardLabels } from "@/lib/cards";
import { href } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";

// One large work, then pairs of different widths — not a uniform template grid.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];

export function SelectedWork({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const list = featuredProjects(8);
  // Even count keeps the two-column rhythm intact.
  const shown = list.slice(0, list.length - (list.length % 2));
  return (
    <section id="work" aria-labelledby="work-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading
          id="work-title"
          eyebrow={t.selected.eyebrow}
          title={t.selected.title}
          lead={t.selected.subtitle}
          action={
            <ButtonLink href={href(locale, "/work")} variant="secondary">
              {t.selected.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          }
        />
        <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-12 lg:grid-cols-12 lg:gap-y-14">
          {shown.map((raw, i) => {
            const p = localizeProject(raw, locale);
            return (
              <li key={p.slug} className={cn(spans[i])}>
                <ProjectCard
                  project={p}
                  href={href(locale, `/work/${p.slug}`)}
                  labels={cardLabels(p, locale)}
                  size={i < 2 ? "lg" : "md"}
                  sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
