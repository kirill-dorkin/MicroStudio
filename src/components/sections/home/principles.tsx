import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
import { ButtonLink } from "@/components/ui/button";

export function Principles({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).principles;
  return (
    <section aria-labelledby="principles-title" className="border-t border-line py-20 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div data-reveal>
          <p className="eyebrow mb-5">{t.eyebrow}</p>
          <h2 id="principles-title" className="h2">
            {t.title}
          </h2>
          <p className="lead mt-6 max-w-xl">{t.copy}</p>
          <ButtonLink href={href(locale, "/about")} variant="secondary" className="mt-9">
            {t.cta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {t.items.map((item, i) => (
            <li key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 py-8" data-reveal>
              <span className="pt-1 font-display text-sm font-semibold text-lime">0{i + 1}</span>
              <div>
                <h3 className="h3">{item.title}</h3>
                <p className="mt-2 text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
