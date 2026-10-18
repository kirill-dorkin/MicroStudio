"use client";

import { useEffect, useState } from "react";
import type { LocalizedProject } from "@/lib/content";
import type { ProjectCategory } from "@/lib/schemas";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Filter = "all" | ProjectCategory;

type Props = {
  projects: (LocalizedProject & { href: string })[];
  initial: Filter;
  filters: Filter[];
  labels: {
    categories: Record<Filter, string>;
    filtersLabel: string;
    count: string;
    demo: string;
    author: string;
    cta: string;
  };
};

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function WorkGallery({ projects, initial, filters, labels }: Props) {
  const [filter, setFilter] = useState<Filter>(initial);

  // Keep state in sync with back/forward navigation.
  useEffect(() => {
    const onPop = () => {
      const type = new URLSearchParams(window.location.search).get("type") as Filter | null;
      setFilter(type && filters.includes(type) ? type : "all");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [filters]);

  const choose = (next: Filter) => {
    if (next === filter) return;
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", next);
    // Native history API: no navigation, no scroll jump.
    window.history.replaceState(window.history.state, "", url);
    track("filter_portfolio", { category: next });
  };

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="sticky top-[58px] z-20 -mx-5 mb-10 border-b border-line bg-bg/85 px-5 py-3 backdrop-blur-xl md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none lg:top-16">
        <div
          role="group"
          aria-label={labels.filtersLabel}
          className="no-scrollbar flex gap-2 overflow-x-auto md:flex-wrap"
        >
          {filters.map((f) => {
            const count = f === "all" ? projects.length : projects.filter((p) => p.category === f).length;
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => choose(f)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.9rem] font-medium transition-colors",
                  active
                    ? "border-lime bg-lime text-bg"
                    : "border-line text-muted hover:border-line-strong hover:text-text",
                )}
              >
                {labels.categories[f]}
                <span className={cn("text-xs tabular-nums", active ? "text-bg/70" : "text-subtle")}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {labels.count.replace("{count}", String(visible.length))}
      </p>

      <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
        {visible.map((project, i) => (
          <li key={project.slug} className={cn(spans[i % 4], visible.length === 1 && "lg:col-span-8")}>
            <ProjectCard
              project={project}
              href={project.href}
              categoryLabel={labels.categories[project.category]}
              demoLabel={labels.demo}
              authorLabel={labels.author}
              ctaLabel={labels.cta}
              headingLevel="h2"
              priority={i < 2}
              sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
