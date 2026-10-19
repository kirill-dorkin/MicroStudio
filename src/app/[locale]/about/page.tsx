import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getSeo, localizeProject, ownProjects } from "@/lib/content";
import { Founder } from "@/components/sections/founder";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/about", og: "about", ...getSeo("about", locale)! });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const a = t.about;
  const strip = ownProjects.slice(0, 6).map((p) => localizeProject(p, locale));

  return (
    <>
      <section className="container-page page-top pb-12">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.about, href: href(locale, "/about") },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{a.eyebrow}</p>
            <h1 className="h1 max-w-[16ch]">{a.title}</h1>
            <p className="lead mt-5">{a.lead}</p>
          </div>
          <div className="card self-end p-6">
            <h2 className="label">{a.whatTitle}</h2>
            <ul className="mt-4 space-y-3">
              {a.what.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-lime" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Founder locale={locale} />

      <section aria-labelledby="about-process" className="section border-t border-line">
        <div className="container-page">
          <h2 id="about-process" className="h2 max-w-[22ch]">
            {a.processTitle}
          </h2>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {a.process.map((step, i) => (
              <li key={step.title} className="bg-bg p-6">
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-strong font-display text-sm font-semibold text-lime">
                  {i + 1}
                </span>
                <h3 className="h3 mt-4">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
            <div className="card p-6">
              <h3 className="h3">{a.youTitle}</h3>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-muted">
                {a.you.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-lime" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] border border-line p-6">
              <h3 className="h3">{a.approachTitle}</h3>
              <ul className="mt-4 grid gap-5 sm:grid-cols-3">
                {a.approach.map((item) => (
                  <li key={item.title}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1.5 text-[0.92rem] text-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-sm text-subtle">{a.stackLead}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-examples" className="section border-t border-line">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-16">
          <div>
            <h2 id="about-examples" className="h2">
              {a.examplesTitle}
            </h2>
            <p className="mt-4 text-muted">{a.examplesBody}</p>
            <ButtonLink href={href(locale, "/work")} variant="secondary" className="mt-6">
              {a.examplesCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {strip.map((p) => (
              <li key={p.slug}>
                <Link href={href(locale, `/work/${p.slug}`)} className="group block overflow-hidden rounded-xl border border-line bg-[#f3f3f1]">
                  <span className="relative block aspect-[16/10]">
                    <Image
                      src={p.screenshots.desktop}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 240px, 45vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} location="about" />
    </>
  );
}
