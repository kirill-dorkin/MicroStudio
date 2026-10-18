import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
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
      ]}
      cta={{ href: href(locale, "/contact"), label: t.nav.cta }}
      labels={t.nav}
      footerNote={t.footer.tagline}
    />
  );
}
