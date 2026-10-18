import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { formatPhone, site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getSeo } from "@/lib/content";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { whatsappUrl } from "@/lib/contact";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ContactBrief } from "@/components/forms/contact-brief";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ service?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/contact", og: "contact", ...getSeo("contact", locale)! });
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { service } = await searchParams;
  const t = getDictionary(locale);
  const c = t.contact;
  // Preselect the project type when coming from a service or the offer page.
  const preset: Record<string, string> = {
    websites: c.types[1],
    design: c.types[4],
    advertising: c.types[5],
    support: c.types[6],
    special: c.specialType,
  };

  const direct = [
    site.whatsappE164 && {
      label: c.whatsapp,
      value: formatPhone(site.whatsappE164),
      href: whatsappUrl(site.whatsappE164),
      icon: <WhatsappIcon className="size-5" />,
      method: "whatsapp",
      external: true,
    },
    {
      label: c.instagram,
      value: site.instagramHandle,
      href: site.instagram,
      icon: <InstagramIcon className="size-5" />,
      method: "instagram",
      external: true,
    },
    site.whatsappE164 && {
      label: c.phone,
      value: formatPhone(site.whatsappE164),
      href: `tel:+${site.whatsappE164}`,
      icon: <Phone className="size-5" aria-hidden="true" />,
      method: "phone",
      external: false,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    icon: React.ReactNode;
    method: string;
    external: boolean;
  }[];

  return (
    <>
      <section className="container-page pb-12 pt-[calc(62px+3rem)] lg:pt-[calc(74px+4.5rem)]">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.contact, href: href(locale, "/contact") },
          ]}
        />
        <p className="eyebrow mb-5">{c.eyebrow}</p>
        <h1 className="h1 max-w-4xl">{c.title}</h1>
        <p className="lead mt-6 max-w-2xl">{c.lead}</p>
      </section>

      <section aria-labelledby="brief-title" className="container-page pb-20 lg:pb-28">
        <div className="sm:rounded-[28px] sm:border sm:border-line sm:p-8 lg:p-12">
          <h2 id="brief-title" className="h3">
            {c.formTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{c.formLead}</p>
          <div className="mt-10">
            <ContactBrief
              locale={locale}
              t={c}
              newTabLabel={t.common.newTab}
              instagramUrl={site.instagram}
              whatsapp={site.whatsappE164}
              initialType={service ? preset[service] : undefined}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="direct-title" className="border-t border-line py-20 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <h2 id="direct-title" className="h2">
              {c.directTitle}
            </h2>
            <p className="mt-5 text-muted">{c.responseNote}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {direct.map((d) => (
              <li key={d.method}>
                <TrackedLink
                  href={d.href}
                  event="contact_method"
                  params={{ method: d.method, location: "contact_direct" }}
                  newTabLabel={d.external ? t.common.newTab : undefined}
                  className="group flex min-h-24 items-center gap-4 rounded-2xl border border-line bg-elevated p-5 transition-colors hover:border-lime/50"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-lime text-bg">{d.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-sm text-subtle">{d.label}</span>
                    <span className="block truncate font-display text-lg font-semibold">{d.value}</span>
                  </span>
                </TrackedLink>
              </li>
            ))}
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-24 items-center gap-4 rounded-2xl border border-line bg-elevated p-5"
                >
                  <span className="min-w-0">
                    <span className="block text-sm text-subtle">{c.email}</span>
                    <span className="block truncate font-display text-lg font-semibold">{site.email}</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
