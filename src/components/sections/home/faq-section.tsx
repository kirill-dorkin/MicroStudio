import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getFaq } from "@/lib/content";
import { FaqList } from "@/components/ui/faq-list";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/** Questions that usually stop people from writing: price, offer, timing, materials, start. */
const blockingQuestions = [0, 1, 3, 9, 10];

export function FaqSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const all = getFaq(locale);
  const items = blockingQuestions.map((i) => all[i]);
  return (
    <section aria-labelledby="faq-title" className="section border-t border-line">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">{t.faq.eyebrow}</p>
          <h2 id="faq-title" className="h2">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-muted">{t.faq.more}</p>
          <WhatsappCta locale={locale} intent={{ kind: "generic" }} location="home_faq" variant="secondary" className="mt-6" />
        </div>
        <FaqList items={items} />
      </div>
    </section>
  );
}
