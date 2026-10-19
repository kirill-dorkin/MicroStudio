import { Check } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { SectionHeading } from "@/components/ui/section-heading";

/** Four steps plus the three things every project gets — one compact block. */
export function Process({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).process;
  return (
    <section aria-labelledby="process-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={t.eyebrow} title={t.title} lead={t.subtitle} />
        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-[1.6fr_1fr]">
          <ol className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2">
            {t.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 bg-bg p-6">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-display text-sm font-semibold tabular-nums text-lime">
                  {i + 1}
                </span>
                <div>
                  <h3 className="h3">{step.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="card p-6">
            <p className="label">{t.promisesTitle}</p>
            <ul className="mt-5 space-y-5">
              {t.promises.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="mt-1 text-[0.92rem] text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
