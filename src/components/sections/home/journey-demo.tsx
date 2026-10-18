"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, CheckCheck, RotateCcw, SendHorizontal } from "lucide-react";
import type { Dictionary } from "@/content/locales";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";

type Props = { t: Dictionary["journey"]; contactHref: string; demoTitle?: string };

export function JourneyDemo({ t, contactHref, demoTitle = t.phoneContact }: Props) {
  const [choice, setChoice] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const option = t.options.find((o) => o.id === choice);
  const stage = sent ? 3 : option ? 2 : 1;

  const reset = () => {
    setChoice(null);
    setSent(false);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-20">
      <div>
        <ol aria-label={t.stepsLabel} className="grid gap-2 sm:grid-cols-2">
          {t.steps.map((step, i) => (
            <li
              key={step}
              aria-current={i === stage ? "step" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-[0.95rem] transition-colors duration-300",
                i < stage && "border-line text-muted",
                i === stage && "border-lime/60 bg-lime/[0.06] text-text",
                i > stage && "border-line/60 text-subtle",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  i < stage ? "bg-lime text-bg" : i === stage ? "border border-lime text-lime" : "border border-line",
                )}
              >
                {i < stage ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <fieldset className="mt-10">
          <legend className="mb-4 font-display text-lg font-semibold">{t.chooseLabel}</legend>
          <div className="flex flex-wrap gap-2.5">
            {t.options.map((o) => (
              <label
                key={o.id}
                className={cn(
                  "inline-flex min-h-12 cursor-pointer items-center rounded-full border px-5 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime",
                  choice === o.id ? "border-lime bg-lime text-bg" : "border-line-strong text-text hover:border-text/50",
                )}
              >
                <input
                  type="radio"
                  name="journey-service"
                  value={o.id}
                  checked={choice === o.id}
                  onChange={() => {
                    setChoice(o.id);
                    setSent(false);
                  }}
                  className="sr-only"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <p className="mt-8 max-w-md text-sm text-subtle">{t.demoNote}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={contactHref} className={buttonClass("primary")}>
            {t.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          {(choice || sent) && (
            <button type="button" onClick={reset} className={buttonClass("secondary")}>
              <RotateCcw className="size-4" aria-hidden="true" />
              {t.restart}
            </button>
          )}
        </div>
      </div>

      {/* Phone mock-up */}
      <div className="mx-auto w-full max-w-[360px]" aria-label={demoTitle} role="region">
        <div className="rounded-[2.4rem] border border-line-strong bg-elevated p-2.5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
          <div className="flex h-[440px] flex-col overflow-hidden rounded-[1.9rem] bg-[#101315]">
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 pb-3 pt-5">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-lime font-display text-sm font-bold text-bg" aria-hidden="true">
                {demoTitle.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{demoTitle}</p>
                <p className="text-xs text-subtle">{t.phoneTitle}</p>
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-3 p-4" aria-live="polite">
              {!option && (
                <p className="mx-auto max-w-[15rem] text-center text-sm text-subtle">{t.chooseLabel}</p>
              )}
              {option && (
                <div
                  key={option.id + String(sent)}
                  className={cn(
                    "animate-fade-up ml-auto max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-[0.92rem] leading-snug",
                    sent ? "bg-lime text-bg" : "border border-dashed border-line-strong text-muted",
                  )}
                >
                  {option.message}
                  {sent && (
                    <span className="mt-1.5 flex justify-end">
                      <CheckCheck className="size-4" aria-hidden="true" />
                    </span>
                  )}
                </div>
              )}
              {sent && <p className="text-center text-xs text-subtle">{t.demoNote}</p>}
            </div>
            <div className="flex items-center gap-2 border-t border-white/[0.06] p-3">
              <div className="min-h-11 flex-1 truncate rounded-full bg-white/[0.05] px-4 py-3 text-xs text-subtle">
                {option && !sent ? option.message : "…"}
              </div>
              <button
                type="button"
                disabled={!option || sent}
                onClick={() => setSent(true)}
                aria-label={t.phoneSend}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-lime text-bg transition-opacity disabled:opacity-30"
              >
                <SendHorizontal className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
