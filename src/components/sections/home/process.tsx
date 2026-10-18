import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).process;
  return (
    <section aria-labelledby="process-title" className="border-t border-line py-20 lg:py-32">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={t.eyebrow} title={t.title} lead={t.subtitle} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <li key={step.title} className="relative flex min-h-64 flex-col bg-bg p-7 lg:min-h-80 lg:p-8" data-reveal>
              <span className="font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.05em] text-elevated [-webkit-text-stroke:1px_var(--color-line-strong)]">
                0{i + 1}
              </span>
              <h3 className="h3 mt-auto pt-10">{step.title}</h3>
              <p className="mt-3 text-muted">{step.body}</p>
              {i < t.steps.length - 1 && (
                <span aria-hidden="true" className="absolute right-7 top-9 h-px w-10 bg-lime/60 lg:w-14" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
