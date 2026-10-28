import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteCheckClient } from "./site-check-client";

export function SiteCheck({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.check;
  return (
    <section id="check" aria-labelledby="check-title" className="section relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-lime/[0.06] blur-[120px]" />
      <div className="container-page">
        <SectionHeading id="check-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="mt-10 lg:mt-12">
          <SiteCheckClient t={t} whatsapp={site.whatsappE164} newTabLabel={d.common.newTab} />
        </div>
      </div>
    </section>
  );
}
