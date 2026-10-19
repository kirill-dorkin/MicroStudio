import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

export function SpecialTeaser({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.special;
  return (
    <section aria-labelledby="special-title" className="section-tight">
      <div className="container-page">
        <div className="grid gap-6 rounded-[20px] border border-lime/30 bg-elevated p-6 md:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
          <div>
            <p className="label text-lime">{s.badge}</p>
            <h2 id="special-title" className="h2 mt-3 max-w-[18ch]">
              {s.title}
            </h2>
            <p className="mt-4 max-w-xl text-muted">{s.copy}</p>
            <p className="mt-2 text-sm text-subtle">{s.note}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <WhatsappCta locale={locale} intent={{ kind: "special" }} location="home_special" label={t.specialPage.cta} className="w-full" />
            <Link href={href(locale, "/special")} className={buttonClass("secondary", "w-full")}>
              {s.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
