"use client";

import { useId, useMemo, useState } from "react";
import { Check } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/components/ui/icons";
import type { Dictionary } from "@/content/locales";

type Texts = Dictionary["home"]["check"];

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));
}

/**
 * Six-point self-check. Ticking items is a small commitment that makes the
 * next step (asking for the free review) feel natural, and the missing items
 * go straight into the WhatsApp message so the visitor never retypes them.
 * Nothing leaves the browser until the visitor sends the message themselves.
 */
export function SiteCheckClient({ t, whatsapp, newTabLabel }: { t: Texts; whatsapp: string | null; newTabLabel: string }) {
  const [done, setDone] = useState<boolean[]>(() => t.items.map(() => false));
  const [noSite, setNoSite] = useState(false);
  const [url, setUrl] = useState("");
  const inputId = useId();

  const total = t.items.length;
  const count = done.filter(Boolean).length;
  const missing = t.items.filter((_, i) => !done[i]);
  const touched = count > 0;

  const result = noSite
    ? t.results.noSite
    : !touched
      ? t.results.none
      : count === total
        ? t.results.high
        : count <= 2
          ? t.results.low
          : fill(t.results.mid, { missing: missing.length === 1 ? t.missingOne : fill(t.missingMany, { count: missing.length }) });

  const message = useMemo(() => {
    const site = url.trim();
    if (noSite) return [t.message.noSite, site && fill(t.message.noSiteLink, { url: site })].filter(Boolean).join("\n");
    const lines = [t.message.intro];
    if (site) lines.push(fill(t.message.site, { url: site }));
    if (touched) {
      if (missing.length) lines.push("", t.message.missing, ...missing.map((m) => `— ${m}`));
      else lines.push("", t.message.allDone);
    }
    return lines.join("\n");
  }, [noSite, url, touched, missing, t.message]);

  const waHref = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}` : null;
  const progress = noSite ? 0 : count / total;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
      <div className="card p-3 md:p-4">
        <ul className={cn("grid gap-1.5 transition-opacity", noSite && "pointer-events-none opacity-35")}>
          {t.items.map((label, i) => (
            <li key={label}>
              <label className="flex min-h-14 cursor-pointer items-center gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-white/[0.04] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime md:px-4">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={done[i]}
                  disabled={noSite}
                  onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                />
                <span
                  aria-hidden="true"
                  className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-line-strong text-transparent transition-all peer-checked:border-lime peer-checked:bg-lime peer-checked:text-bg"
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-[0.98rem] leading-snug text-text/90 peer-checked:text-text">{label}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-2 border-t border-line px-3 pt-3 md:px-4">
          <label className="flex min-h-12 cursor-pointer items-center gap-3 text-[0.95rem] text-muted">
            <input type="checkbox" className="peer sr-only" checked={noSite} onChange={() => setNoSite((v) => !v)} />
            <span aria-hidden="true" className="relative h-6 w-10 shrink-0 rounded-full bg-line-strong transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-text after:transition-transform peer-checked:bg-lime peer-checked:after:translate-x-4 peer-checked:after:bg-bg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime" />
            <span className="peer-checked:text-text">{t.noSite}</span>
          </label>
        </div>
      </div>

      <div className="card flex flex-col p-6 md:p-8 lg:sticky lg:top-28 lg:self-start">
        {!noSite && (
          <div aria-hidden="true">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.04em] tabular-nums">{fill(t.score, { done: count, total })}</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-lime transition-[width] duration-500 ease-[var(--ease-out-soft)]" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        )}
        <p className={cn("text-[1.02rem] leading-relaxed text-text", !noSite && "mt-5")} aria-live="polite">
          {result}
        </p>

        <label htmlFor={inputId} className="mt-6 block text-sm font-semibold text-text">
          {t.urlLabel} <span className="font-normal text-subtle">· {t.urlOptional}</span>
        </label>
        <input
          id={inputId}
          type="text"
          inputMode="url"
          autoComplete="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t.urlPlaceholder}
          className="mt-2 min-h-12 w-full rounded-xl border border-line-strong bg-bg/60 px-4 text-[0.98rem] text-text placeholder:text-subtle focus:border-lime focus:outline-none"
        />

        {waHref && (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_method", { method: "whatsapp", location: "home_check", intent: "audit", score: noSite ? "no_site" : String(count) })}
            className="cta-glow mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 text-center font-semibold text-bg transition-colors hover:bg-[#d4fa86] active:bg-lime-dim"
          >
            <WhatsappIcon className="size-[1.1em] shrink-0" />
            {noSite ? t.ctaNoSite : t.cta}
            <span className="sr-only"> ({newTabLabel})</span>
          </a>
        )}
        <p className="mt-3 text-center text-[0.8rem] text-subtle">{t.hint}</p>
      </div>
    </div>
  );
}
