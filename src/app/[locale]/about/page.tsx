import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getSeo, localizeProject, projects } from "@/lib/content";
import { href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/sections/cta-band";
import Image from "next/image";
import Link from "next/link";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "/about", og: "about", ...getSeo("about", locale)! });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const a = t.about;
  const strip = projects.slice(0, 6).map((p) => localizeProject(p, locale));

  return (
    <>
      <section className="container-page pb-16 pt-[calc(62px+3rem)] lg:pb-24 lg:pt-[calc(74px+4.5rem)]">
        <Breadcrumbs
          label={t.common.breadcrumbs}
          items={[
            { name: t.common.home, href: href(locale) },
            { name: t.nav.about, href: href(locale, "/about") },
          ]}
        />
        <p className="eyebrow mb-5">{a.eyebrow}</p>
        <h1 className="h1 max-w-5xl">{a.title}</h1>
        <p className="mt-10 max-w-4xl font-display text-[clamp(1.35rem,1.1rem+1vw,2rem)] font-medium leading-[1.4] tracking-[-0.015em] text-text/90">
          {a.lead}
        </p>
      </section>

      <section aria-labelledby="about-what" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <h2 id="about-what" className="h2">
            {a.whatTitle}
          </h2>
          <ul className="divide-y divide-line border-y border-line">
            {a.what.map((item, i) => (
              <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 py-6 text-[1.1rem]" data-reveal>
                <span className="font-display text-sm font-semibold text-lime">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-approach" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <h2 id="about-approach" className="h2">
            {a.approachTitle}
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {a.approach.map((item) => (
              <li key={item.title} className="bg-bg p-7 md:p-10" data-reveal>
                <h3 className="h3">{item.title}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-stack" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <h2 id="about-stack" className="h2">
              {a.stackTitle}
            </h2>
            <p className="mt-6 text-muted">{a.stackLead}</p>
          </div>
          <ul className="flex flex-wrap content-start gap-3">
            {a.stack.map((item) => (
              <li key={item} className="rounded-full border border-line-strong px-5 py-3 font-display font-semibold">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-examples" className="border-t border-line py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-20">
          <div>
            <h2 id="about-examples" className="h2">
              {a.examplesTitle}
            </h2>
            <p className="mt-6 text-muted">{a.examplesBody}</p>
            <ButtonLink href={href(locale, "/work")} variant="secondary" className="mt-8">
              {a.examplesCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {strip.map((p) => (
              <li key={p.slug}>
                <Link
                  href={href(locale, `/work/${p.slug}`)}
                  className="group block overflow-hidden rounded-xl border border-line bg-[#f3f3f1]"
                >
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
