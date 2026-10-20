import Link from "next/link";
import { formatPhone, site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getServices } from "@/content/services";
import { href } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/contact";
import { Logo } from "@/components/ui/logo";
import { TrackedLink } from "@/components/ui/tracked-link";

const linkClass = "inline-flex min-h-9 items-center text-muted transition-colors hover:text-text";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const services = getServices(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div className="max-w-sm">
          <Link href={href(locale)} aria-label={t.nav.homeLabel} className="inline-block rounded-lg">
            <Logo />
          </Link>
          <p className="mt-5 text-muted">{t.footer.tagline}</p>
          <Link
            href={href(locale, "/special")}
            className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-full border border-lime/30 px-4 text-sm text-lime transition-colors hover:bg-lime/10"
          >
            <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
            {t.special.title}
          </Link>
        </div>

        <nav aria-label={t.footer.siteTitle}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{t.footer.siteTitle}</h2>
          <ul className="space-y-1">
            {[
              ["/services", t.nav.services],
              ["/work", t.nav.work],
              ["/about", t.nav.about],
              ["/blog", t.nav.blog],
              ["/special", t.nav.special],
              ["/contact", t.nav.contact],
            ].map(([path, label]) => (
              <li key={path}>
                <Link href={href(locale, path)} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.servicesTitle}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{t.footer.servicesTitle}</h2>
          <ul className="space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={href(locale, `/services/${s.slug}`)} className={linkClass}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{t.footer.contactTitle}</h2>
          <ul className="space-y-1">
            {site.whatsappE164 && (
              <li>
                <TrackedLink
                  href={whatsappUrl(site.whatsappE164)}
                  event="contact_method"
                  params={{ method: "whatsapp", location: "footer" }}
                  newTabLabel={t.common.newTab}
                  className={linkClass}
                >
                  WhatsApp
                </TrackedLink>
              </li>
            )}
            <li>
              <TrackedLink
                href={site.instagram}
                event="contact_method"
                params={{ method: "instagram", location: "footer" }}
                newTabLabel={t.common.newTab}
                className={linkClass}
              >
                Instagram {site.instagramHandle}
              </TrackedLink>
            </li>
            {site.whatsappE164 && (
              <li>
                <a href={`tel:+${site.whatsappE164}`} className={linkClass}>
                  {formatPhone(site.whatsappE164)}
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  {site.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-line py-8 text-sm text-subtle md:flex-row md:items-start md:justify-between">
        <p className="max-w-2xl">{t.footer.disclaimer}</p>
        <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-2">
          <Link href={href(locale, "/privacy")} className="inline-flex min-h-9 items-center hover:text-text">
            {t.nav.privacy}
          </Link>
          <span>
            © {year} {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
