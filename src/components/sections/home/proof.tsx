import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getProject, localizeProject } from "@/lib/content";
import { href } from "@/lib/i18n";
import { buttonClass } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/** Shows the WhatsApp-first idea on a real project instead of a mock-up. */
export function Proof({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pr = t.proof;
  const p = localizeProject(getProject("best-electronics-link")!, locale);

  return (
    <section aria-labelledby="proof-title" className="section border-t border-line bg-[#0d1012]">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-4">{pr.eyebrow}</p>
          <h2 id="proof-title" className="h2 max-w-[18ch]">
            {pr.title}
          </h2>
          <p className="lead mt-4">{pr.body}</p>
          <ol className="mt-8 space-y-5">
            {pr.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-lime font-display text-sm font-bold text-bg">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="mt-0.5 text-[0.95rem] text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsappCta locale={locale} intent={{ kind: "project", slug: p.slug }} location="home_proof" label={pr.cta} />
            <Link href={href(locale, `/work/${p.slug}`)} className={buttonClass("secondary")}>
              {pr.details}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <figure className="order-1 lg:order-2">
          <div className="relative mx-auto flex max-w-[520px] items-end justify-center gap-4">
            <div className="w-[48%] overflow-hidden rounded-[28px] border-[6px] border-[#2b3033] bg-[#2b3033] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[22px] bg-white">
                <Image src={p.screenshots.mobile} alt={p.name} fill sizes="(min-width: 1024px) 250px, 46vw" className="object-cover object-top" />
              </div>
            </div>
            <div className="mb-[12%] w-[44%] overflow-hidden rounded-[26px] border-[6px] border-[#2b3033] bg-[#2b3033] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[20px] bg-white">
                <Image src={p.screenshots.detail ?? p.screenshots.mobile} alt="" fill sizes="(min-width: 1024px) 230px, 42vw" className="object-cover object-[center_top]" />
              </div>
            </div>
          </div>
          <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-muted">
            {pr.caption}
            <TrackedLink
              href={p.demo}
              event="open_demo"
              params={{ project: p.slug, location: "home_proof" }}
              newTabLabel={t.common.newTab}
              className="inline-flex min-h-11 items-center gap-1 text-text underline decoration-lime underline-offset-4 hover:text-lime"
            >
              {pr.open}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </TrackedLink>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
