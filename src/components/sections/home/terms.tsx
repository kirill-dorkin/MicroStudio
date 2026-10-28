import { ClipboardCheck, Eye, LifeBuoy, Rocket } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [ClipboardCheck, Eye, Rocket, LifeBuoy];

/** Risk reversal: what is fixed before, during and after the work. */
export function Terms({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.terms;
  return (
    <section aria-labelledby="terms-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="terms-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {d.about.process.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={item.title} className="card p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-lime/10 text-lime">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="h3 mt-5">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
