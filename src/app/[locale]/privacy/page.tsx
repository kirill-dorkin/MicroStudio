import type { Metadata } from "next";
import { formatPhone, site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { formatDate, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { whatsappUrl } from "@/lib/contact";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

type Props = { params: Promise<{ locale: Locale }> };

const UPDATED = "2026-10-19";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/privacy",
    og: "privacy",
    title: `${t.privacy.title} — MicroStudio`,
    description:
      locale === "ru"
        ? "Как сайт MicroStudio работает с данными: бриф остаётся в вашем браузере, сообщения вы отправляете сами, сторонняя аналитика не подключена."
        : "How MicroStudio’s website handles information: your brief stays in your browser, you send messages yourself and no third-party analytics are enabled.",
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const p = t.privacy;

  return (
    <section className="container-page pb-24 pt-[calc(62px+3rem)] lg:pt-[calc(74px+4.5rem)]">
      <Breadcrumbs
        label={t.common.breadcrumbs}
        items={[
          { name: t.common.home, href: href(locale) },
          { name: t.nav.privacy, href: href(locale, "/privacy") },
        ]}
      />
      <h1 className="h1 max-w-4xl">{p.title}</h1>
      <p className="mt-6 text-sm text-subtle">
        {p.updated}: <time dateTime={UPDATED}>{formatDate(UPDATED, locale)}</time>
      </p>
      <div className="mt-14 max-w-3xl divide-y divide-line border-y border-line">
        {p.sections.map((s) => (
          <section key={s.title} className="py-8">
            <h2 className="h3">{s.title}</h2>
            <p className="mt-3 text-muted">{s.body}</p>
          </section>
        ))}
        <section className="py-8">
          <h2 className="h3">{t.footer.contactTitle}</h2>
          <ul className="mt-3 space-y-2 text-muted">
            <li>
              Instagram:{" "}
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-lime underline underline-offset-4">
                {site.instagramHandle}
                <span className="sr-only"> ({t.common.newTab})</span>
              </a>
            </li>
            {site.whatsappE164 && (
              <li>
                WhatsApp:{" "}
                <a href={whatsappUrl(site.whatsappE164)} target="_blank" rel="noopener noreferrer" className="text-lime underline underline-offset-4">
                  {formatPhone(site.whatsappE164)}
                  <span className="sr-only"> ({t.common.newTab})</span>
                </a>
              </li>
            )}
            {site.email && (
              <li>
                Email:{" "}
                <a href={`mailto:${site.email}`} className="text-lime underline underline-offset-4">
                  {site.email}
                </a>
              </li>
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}
