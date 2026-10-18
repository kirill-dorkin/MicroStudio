import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
import { SectionHeading } from "@/components/ui/section-heading";
import { JourneyDemo } from "./journey-demo";

export function Journey({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).journey;
  return (
    <section aria-labelledby="journey-title" className="border-t border-line bg-[#0d1012] py-20 lg:py-32">
      <div className="container-page">
        <SectionHeading id="journey-title" eyebrow={t.eyebrow} title={t.title} lead={t.subtitle} />
        <div className="mt-14 lg:mt-20">
          <JourneyDemo t={t} contactHref={href(locale, "/contact")} />
        </div>
      </div>
    </section>
  );
}
