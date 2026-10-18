import Link from "next/link";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getFaq } from "@/lib/content";
import { href } from "@/lib/i18n";
import { FaqList } from "@/components/ui/faq-list";

export function FaqSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items = getFaq(locale).slice(0, 5);
  return (
    <section aria-labelledby="faq-title" className="border-t border-line py-20 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div data-reveal>
          <p className="eyebrow mb-5">{t.faq.eyebrow}</p>
          <h2 id="faq-title" className="h2">
            {t.faq.title}
          </h2>
          <p className="mt-6 text-muted">
            <Link href={href(locale, "/contact")} className="text-text underline decoration-lime underline-offset-4 hover:text-lime">
              {t.faq.more}
            </Link>
            {" · "}
            <Link href={href(locale, "/services")} className="text-text underline decoration-line-strong underline-offset-4 hover:text-lime">
              {t.nav.services}
            </Link>
          </p>
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
