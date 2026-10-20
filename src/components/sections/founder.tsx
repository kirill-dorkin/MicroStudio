import Image from "next/image";
import { site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/** Renders only when real founder data is filled in src/config/site.ts. */
export function Founder({ locale }: { locale: Locale }) {
  const f = site.founder;
  if (!f) return null;
  const t = getDictionary(locale);
  return (
    <section aria-labelledby="founder-title" className="section border-t border-line">
      <div className="container-page grid items-center gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-line bg-elevated">
          <Image src={f.photo} alt={f.name} fill sizes="280px" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow mb-4">{t.founder.eyebrow}</p>
          <h2 id="founder-title" className="h2">
            {f.name}
          </h2>
          <p className="mt-1 text-muted">{f.role[locale]}</p>
          <p className="lead mt-5">{f.bio[locale]}</p>
          <WhatsappCta locale={locale} intent={{ kind: "generic" }} location="founder" label={t.founder.cta} variant="secondary" className="mt-6" />
        </div>
      </div>
    </section>
  );
}
