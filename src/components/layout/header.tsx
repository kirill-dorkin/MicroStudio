import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
import { intentWhatsapp } from "@/lib/intent";
import { HeaderClient } from "./header-client";

export function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <HeaderClient
      locale={locale}
      homeHref={href(locale)}
      items={[
        { href: href(locale, "/services"), label: t.nav.services },
        { href: href(locale, "/work"), label: t.nav.work },
        { href: href(locale, "/about"), label: t.nav.about },
        { href: href(locale, "/blog"), label: t.nav.blog },
        { href: href(locale, "/contact"), label: t.nav.contact },
      ]}
      cta={{ href: href(locale, "/contact"), label: t.nav.cta }}
      whatsapp={(() => {
        const wa = intentWhatsapp(locale, { kind: "generic" });
        return wa ? { href: wa, label: t.wa.cta, short: t.wa.short, newTab: t.common.newTab } : null;
      })()}
      labels={t.nav}
      footerNote={t.footer.tagline}
    />
  );
}
