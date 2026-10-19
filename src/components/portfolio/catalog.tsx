"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { ProjectFormat, ProjectIndustry, WorkType } from "@/lib/schemas";
import { ProjectCard, type CardProject } from "./project-card";

export type CatalogItem = CardProject & {
  href: string;
  format: ProjectFormat;
  industry: ProjectIndustry;
  publishedAt: string;
  rank: number;
  /** "Open demo" for demos, "Open site" for live client/product sites. */
  openLabel: string;
  /** Lower-cased name, niche, summary and labels for search. */
  haystack: string;
};

type Labels = {
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  formatLabel: string;
  industryLabel: string;
  typeLabel: string;
  sortLabel: string;
  sort: { recommended: string; new: string; az: string };
  filters: string;
  showFilters: string;
  hideFilters: string;
  count: string;
  countLabel: string;
  reset: string;
  removeFilter: string;
  more: string;
  empty: string;
  emptyHint: string;
  open: string;
  details: string;
  newTab: string;
  formats: Record<"all" | ProjectFormat, string>;
  formatSingle: Record<ProjectFormat, string>;
  industries: Record<ProjectIndustry, string>;
  industryAll: string;
  types: Record<"all" | WorkType, string>;
  typeSingle: Record<WorkType, string>;
};

const PAGE = 12;
const SORTS = ["recommended", "new", "az"] as const;
type Sort = (typeof SORTS)[number];
type State = { q: string; format: ProjectFormat | ""; industry: ProjectIndustry | ""; type: WorkType | ""; sort: Sort; page: number };

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();

function readState(params: URLSearchParams, formats: string[], industries: string[], types: string[]): State {
  const pick = <T extends string>(key: string, allowed: string[]) => ((allowed.includes(params.get(key) ?? "") ? params.get(key) : "") as T | "");
  const sort = params.get("sort") as Sort;
  return {
    q: params.get("q") ?? "",
    format: pick<ProjectFormat>("format", formats),
    industry: pick<ProjectIndustry>("industry", industries),
    type: pick<WorkType>("type", types),
    sort: SORTS.includes(sort) ? sort : "recommended",
    page: Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1),
  };
}

function toQuery(s: State) {
  const p = new URLSearchParams();
  if (s.q.trim()) p.set("q", s.q.trim());
  if (s.format) p.set("format", s.format);
  if (s.industry) p.set("industry", s.industry);
  if (s.type) p.set("type", s.type);
  if (s.sort !== "recommended") p.set("sort", s.sort);
  if (s.page > 1) p.set("page", String(s.page));
  const qs = p.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Searchable, filterable project catalogue. All state lives in the URL, so
 * Back/Forward and returning from a case page restore the same view. Filtering
 * runs over the whole registry; only the visible page of cards is rendered.
 */
export function Catalog({ items, labels, locale }: { items: CatalogItem[]; labels: Labels; locale: string }) {
  const params = useSearchParams();
  const formats = Object.keys(labels.formatSingle);
  const industries = Object.keys(labels.industries).filter((i) => items.some((x) => x.industry === i));
  const types = Object.keys(labels.typeSingle).filter((t) => items.some((x) => x.workType === t));
  const [state, setState] = useState<State>(() => readState(new URLSearchParams(params.toString()), formats, industries, types));
  const [panelOpen, setPanelOpen] = useState(false);
  const typing = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstNew = useRef<HTMLLIElement | null>(null);
  const focusNewFrom = useRef<number | null>(null);

  // Back/Forward: Next updates useSearchParams after pushState/popstate.
  useEffect(() => {
    setState(readState(new URLSearchParams(params.toString()), formats, industries, types));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => () => {
    if (typing.current) clearTimeout(typing.current);
  }, []);

  const commit = useCallback((next: State, mode: "push" | "replace", event?: Record<string, string>) => {
    // A pending debounced search must not overwrite a later action (e.g. Reset).
    if (typing.current) clearTimeout(typing.current);
    typing.current = null;
    setState(next);
    const url = `${window.location.pathname}${toQuery(next)}`;
    if (mode === "push") window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
    if (event) track("filter_portfolio", event);
  }, []);

  const list = useMemo(() => {
    const words = norm(state.q).split(/\s+/).filter(Boolean);
    const filtered = items.filter(
      (p) =>
        (!state.format || p.format === state.format) &&
        (!state.industry || p.industry === state.industry) &&
        (!state.type || p.workType === state.type) &&
        words.every((w) => p.haystack.includes(w)),
    );
    const sorted = [...filtered];
    if (state.sort === "new") sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.rank - b.rank);
    else if (state.sort === "az") sorted.sort((a, b) => a.name.localeCompare(b.name, locale));
    else sorted.sort((a, b) => a.rank - b.rank);
    return sorted;
  }, [items, state, locale]);

  const visible = list.slice(0, state.page * PAGE);
  const active: { key: keyof State; label: string }[] = [
    ...(state.q.trim() ? [{ key: "q" as const, label: `«${state.q.trim()}»` }] : []),
    ...(state.format ? [{ key: "format" as const, label: labels.formatSingle[state.format] }] : []),
    ...(state.industry ? [{ key: "industry" as const, label: labels.industries[state.industry] }] : []),
    ...(state.type ? [{ key: "type" as const, label: labels.types[state.type] }] : []),
  ];
  const filterCount = active.filter((a) => a.key !== "q").length;

  useEffect(() => {
    if (focusNewFrom.current !== null && firstNew.current) {
      firstNew.current.querySelector<HTMLAnchorElement>("h3 a, h2 a")?.focus();
      focusNewFrom.current = null;
    }
  }, [visible.length]);

  const set = (patch: Partial<State>, key: string) => commit({ ...state, ...patch, page: 1 }, "push", { filter: key, value: String(Object.values(patch)[0] || "all") });
  const resetAll = () => commit({ q: "", format: "", industry: "", type: "", sort: state.sort, page: 1 }, "push", { filter: "reset", value: "all" });

  const selectClass =
    "min-h-11 w-full rounded-xl border border-line-strong bg-elevated px-3 text-[0.95rem] text-text transition-colors hover:border-white/30 focus:border-lime";

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="relative flex-1">
          <label htmlFor="catalog-q" className="label mb-2 block">
            {labels.searchLabel}
          </label>
          <input
            id="catalog-q"
            type="search"
            value={state.q}
            placeholder={labels.searchPlaceholder}
            autoComplete="off"
            onChange={(e) => {
              const next = { ...state, q: e.target.value, page: 1 };
              setState(next);
              if (typing.current) clearTimeout(typing.current);
              typing.current = setTimeout(() => {
                typing.current = null;
                commit(next, "replace", { filter: "search", value: next.q ? "query" : "empty" });
              }, 250);
            }}
            className="min-h-12 w-full rounded-xl border border-line-strong bg-elevated px-4 pr-12 text-[1rem] text-text placeholder:text-subtle focus:border-lime"
          />
          {state.q && (
            <button
              type="button"
              onClick={() => commit({ ...state, q: "", page: 1 }, "replace")}
              aria-label={labels.clearSearch}
              className="absolute bottom-0 right-0 inline-flex size-12 items-center justify-center text-muted hover:text-text"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <button
          type="button"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line-strong px-4 font-semibold lg:hidden"
          aria-expanded={panelOpen}
          aria-controls="catalog-filters"
          onClick={() => setPanelOpen((v) => !v)}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          {panelOpen ? labels.hideFilters : labels.showFilters}
          {filterCount > 0 && <span className="rounded-full bg-lime px-2 text-xs font-bold text-bg">{filterCount}</span>}
        </button>
        <div id="catalog-filters" className={cn("grid gap-3 sm:grid-cols-2 lg:flex lg:gap-3", panelOpen ? "grid" : "hidden lg:flex")}>
          <label className="block lg:w-52">
            <span className="label mb-2 block">{labels.formatLabel}</span>
            <select className={selectClass} value={state.format} onChange={(e) => set({ format: e.target.value as ProjectFormat | "" }, "format")}>
              <option value="">{labels.formats.all}</option>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {labels.formats[f as ProjectFormat]}
                </option>
              ))}
            </select>
          </label>
          <label className="block lg:w-52">
            <span className="label mb-2 block">{labels.industryLabel}</span>
            <select className={selectClass} value={state.industry} onChange={(e) => set({ industry: e.target.value as ProjectIndustry | "" }, "industry")}>
              <option value="">{labels.industryAll}</option>
              {industries.map((i) => (
                <option key={i} value={i}>
                  {labels.industries[i as ProjectIndustry]}
                </option>
              ))}
            </select>
          </label>
          <label className="block lg:w-48">
            <span className="label mb-2 block">{labels.typeLabel}</span>
            <select className={selectClass} value={state.type} onChange={(e) => set({ type: e.target.value as WorkType | "" }, "type")}>
              <option value="">{labels.types.all}</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {labels.types[t as WorkType]}
                </option>
              ))}
            </select>
          </label>
          <label className="block lg:w-44">
            <span className="label mb-2 block">{labels.sortLabel}</span>
            <select
              className={selectClass}
              value={state.sort}
              onChange={(e) => commit({ ...state, sort: e.target.value as Sort, page: 1 }, "push", { filter: "sort", value: e.target.value })}
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {labels.sort[s]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-line pb-5">
        <p className="mr-2 text-sm text-muted" role="status" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true">{fill(labels.count, { count: list.length, total: items.length })}</span>
          <span className="sr-only">{fill(labels.countLabel, { count: list.length, total: items.length })}</span>
        </p>
        {active.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={() => commit({ ...state, [a.key]: "", page: 1 }, "push", { filter: a.key, value: "removed" })}
            aria-label={fill(labels.removeFilter, { name: a.label })}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-strong bg-elevated pl-3 pr-2 text-sm hover:border-white/30"
          >
            {a.label}
            <X className="size-3.5 text-muted" aria-hidden="true" />
          </button>
        ))}
        {active.length > 0 && (
          <button type="button" onClick={resetAll} className="inline-flex min-h-9 items-center px-2 text-sm font-semibold text-lime underline-offset-4 hover:underline">
            {labels.reset}
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div className="mt-10 rounded-[20px] border border-dashed border-line-strong p-8 text-center">
          <p className="font-display text-xl font-semibold">{labels.empty}</p>
          <p className="mt-2 text-muted">{labels.emptyHint}</p>
          <button type="button" onClick={resetAll} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-lime px-5 font-semibold text-bg">
            {labels.reset}
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <li key={p.slug} ref={i === (focusNewFrom.current ?? -1) ? firstNew : undefined}>
              <ProjectCard
                project={p}
                href={p.href}
                priority={i < 3}
                headingLevel="h2"
                labels={{ type: labels.typeSingle[p.workType], format: labels.formatSingle[p.format], open: p.openLabel, details: labels.details, newTab: labels.newTab }}
              />
            </li>
          ))}
        </ul>
      )}

      {list.length > visible.length && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              focusNewFrom.current = visible.length;
              commit({ ...state, page: state.page + 1 }, "push", { filter: "page", value: String(state.page + 1) });
            }}
            className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 font-semibold hover:border-white/35"
          >
            {fill(labels.more, { count: Math.min(PAGE, list.length - visible.length) })}
          </button>
        </div>
      )}
    </div>
  );
}
