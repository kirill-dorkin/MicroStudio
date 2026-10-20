import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { SectionHeading } from "@/components/ui/section-heading";

/** Four stages, each with the artefact the client sees at the end of it. */
export function Process({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).process;
  return (
    <section aria-labelledby="process-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={t.eyebrow} title={t.title} lead={t.subtitle} />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-0">
          {t.steps.map((step, i) => (
            <li key={step.title} className="relative lg:pr-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-lime font-display text-sm font-bold text-bg">{i + 1}</span>
                {i < t.steps.length - 1 && <span className="hidden h-px flex-1 bg-line-strong lg:block" aria-hidden="true" />}
              </div>
              <h3 className="h3 mt-5">{step.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{step.body}</p>
              <p className="mt-4 inline-flex rounded-lg border border-line bg-elevated px-3 py-1.5 text-[0.82rem] text-text/85">{step.artifact}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
