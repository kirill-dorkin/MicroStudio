import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getServices } from "@/content/services";
import { href } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

export function ServicesPreview({ locale, headingAs = "h2" }: { locale: Locale; headingAs?: "h2" | "h3" }) {
  const t = getDictionary(locale);
  const services = getServices(locale);
  const Heading = headingAs;
  return (
    <section aria-labelledby="services-title" className="border-t border-line py-20 lg:py-32">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow={t.servicesPreview.eyebrow}
          title={t.servicesPreview.title}
          lead={t.servicesPreview.subtitle}
          action={
            <ButtonLink href={href(locale, "/services")} variant="secondary">
              {t.servicesPreview.all}
            </ButtonLink>
          }
        />
        <ol className="mt-14 border-t border-line lg:mt-20">
          {services.map((s, i) => (
            <li key={s.slug} className="group relative border-b border-line" data-reveal>
              <div className="grid gap-5 py-9 transition-colors md:grid-cols-[4rem_1fr_auto] md:gap-8 lg:grid-cols-[5rem_1.1fr_1fr_auto] lg:items-center lg:py-12">
                <span className="font-display text-sm font-semibold tabular-nums text-subtle transition-colors group-hover:text-lime">
                  0{i + 1}
                </span>
                <div>
                  <Heading className="font-display text-[1.75rem] font-bold leading-tight tracking-[-0.025em] md:text-[2.25rem]">
                    <Link
                      href={href(locale, `/services/${s.slug}`)}
                      className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-lime"
                    >
                      {s.preview.title}
                    </Link>
                  </Heading>
                  <p className="mt-3 max-w-md text-muted">{s.preview.thought}</p>
                </div>
                <ul className="flex flex-wrap gap-2 md:col-start-2 lg:col-start-auto">
                  {s.preview.points.map((point) => (
                    <li key={point} className="rounded-full border border-line px-3 py-1.5 text-sm text-muted">
                      {point}
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden="true"
                  className="hidden size-14 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-bg md:row-start-1 md:col-start-3 md:inline-flex lg:col-start-4"
                >
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
