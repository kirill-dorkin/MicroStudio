import Link from "next/link";
import { ArrowDown, Check, X } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { buttonClass } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Names the visitor's pain in their own words ("site exists, no leads"),
 * then pairs each leak with how we close it. Ends with a nudge to the
 * self-check right below, not a sales button.
 */
export function Leaks({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).home.leaks;
  return (
    <section aria-labelledby="leaks-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="leaks-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 lg:gap-5">
          {t.items.map((item, i) => (
            <li key={item.title} className="card flex flex-col p-6 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm font-bold tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{item.title}</h3>
              </div>
              <div className="mt-6 grid gap-4 border-t border-line pt-5">
                <p className="flex gap-3 text-[0.95rem] text-muted">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ff8a7a]/15 text-[#ff9b8c]">
                    <X className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="sr-only">{t.problem}: </span>
                    {item.problem}
                  </span>
                </p>
                <p className="flex gap-3 text-[0.95rem] text-text">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="sr-only">{t.fix}: </span>
                    {item.fix}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex justify-center">
          <Link href="#check" className={buttonClass("secondary")}>
            {t.cta}
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
