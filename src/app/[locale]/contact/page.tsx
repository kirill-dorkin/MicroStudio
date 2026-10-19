import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { formatPhone, site, type Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getProject, getSeo, localizeProject } from "@/lib/content";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { intentWhatsapp, intentParams, type ContactIntent } from "@/lib/intent";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ContactBrief } from "@/components/forms/contact-brief";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ service?: string; project?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/contact", og: "contact", ...getSeo("contact", locale)! });
}

/** Turns ?service= / ?project= into the intent used for the direct WhatsApp link. */
function intentFrom(service?: string, project?: string): ContactIntent {
  if (project && getProject(project)) return { kind: "project", slug: project };
  if (service === "special") return { kind: "special" };
  if (service === "company" || service === "store" || service === "custom") return { kind: "format", id: service };
  if (service === "strategy" || service === "design" || service === "automation" || service === "marketing" || service === "support")
    return { kind: "service", slug: service };
  return { kind: "generic" };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { service, project } = await searchParams;
  const t = getDictionary(locale);
  const c = t.contact;
  const validType = c.types.some((x) => x.id === service) ? service : undefined;
  const raw = project ? getProject(project) : undefined;
  const initialProject = raw ? { slug: raw.slug, name: localizeProject(raw, locale).name } : null;
  const intent = intentFrom(validType, raw?.slug);
  const wa = intentWhatsapp(locale, intent);

  return (
    <>
      <section className="container-page page-top pb-10">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.contact, href: href(locale, "/contact") },
          ]}
        />
        <p className="eyebrow mb-4">{c.eyebrow}</p>
        <h1 className="h1">{c.title}</h1>
        <p className="lead mt-4">{c.lead}</p>

        <h2 className="sr-only">{c.directTitle}</h2>
        {/* Tablet: WhatsApp on its own row, so the handle and phone never truncate. */}
        <ul className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {wa && site.whatsappE164 && (
            <li className="md:col-span-2 lg:col-span-1">
              <TrackedLink
                href={wa}
                event="contact_method"
                params={{ ...intentParams(intent), method: "whatsapp", location: "contact_direct" }}
                newTabLabel={t.common.newTab}
                className="group flex h-full min-h-24 items-center gap-4 rounded-[20px] bg-lime p-5 text-bg transition-colors hover:bg-[#d4fa86]"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-bg text-lime">
                  <WhatsappIcon className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-lg font-bold leading-tight">{c.whatsappCard}</span>
                  <span className="mt-1 block text-sm text-bg/75">{formatPhone(site.whatsappE164)}</span>
                </span>
              </TrackedLink>
            </li>
          )}
          <li>
            <TrackedLink
              href={site.instagram}
              event="contact_method"
              params={{ method: "instagram", location: "contact_direct" }}
              newTabLabel={t.common.newTab}
              className="flex h-full min-h-24 items-center gap-4 rounded-[20px] border border-line bg-elevated p-5 transition-colors hover:border-line-strong"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07]">
                <InstagramIcon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-subtle">{c.instagram}</span>
                <span className="block truncate font-semibold">{site.instagramHandle}</span>
              </span>
            </TrackedLink>
          </li>
          {site.whatsappE164 && (
            <li>
              <TrackedLink
                href={`tel:+${site.whatsappE164}`}
                event="contact_method"
                params={{ method: "phone", location: "contact_direct" }}
                className="flex h-full min-h-24 items-center gap-4 rounded-[20px] border border-line bg-elevated p-5 transition-colors hover:border-line-strong"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.07]">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-subtle">{c.phone}</span>
                  <span className="block truncate font-semibold">{formatPhone(site.whatsappE164)}</span>
                </span>
              </TrackedLink>
            </li>
          )}
          {site.email && (
            <li>
              <a href={`mailto:${site.email}`} className="flex h-full min-h-24 items-center gap-4 rounded-[20px] border border-line bg-elevated p-5">
                <span className="min-w-0">
                  <span className="block text-sm text-subtle">{c.email}</span>
                  <span className="block truncate font-semibold">{site.email}</span>
                </span>
              </a>
            </li>
          )}
        </ul>
        <p className="mt-4 text-sm text-subtle">{c.responseNote}</p>
      </section>

      <section id="brief" aria-labelledby="brief-title" className="container-page pb-16 lg:pb-24">
        <div className="card p-5 sm:p-8 lg:p-10">
          <h2 id="brief-title" className="h2 max-w-[24ch]">
            {c.briefTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{c.briefLead}</p>
          <div className="mt-8">
            <ContactBrief
              locale={locale}
              t={c}
              newTabLabel={t.common.newTab}
              instagramUrl={site.instagram}
              whatsapp={site.whatsappE164}
              initialType={validType}
              initialProject={initialProject}
            />
          </div>
        </div>
      </section>
    </>
  );
}
