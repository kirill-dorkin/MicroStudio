import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { getServices } from "@/content/services";
import { href } from "@/lib/i18n";
import type { ContactIntent } from "@/lib/intent";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/**
 * Format chooser: every card answers "is this for me?" and opens WhatsApp
 * with a message naming that format — a real enquiry, not a demo.
 */
export function Formats({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const f = t.formats;
  const extra = getServices(locale).filter((s) => s.slug !== "websites");

  return (
    <section id="formats" aria-labelledby="formats-title" className="section border-t border-line">
      <div className="container-page">
        <SectionHeading id="formats-title" eyebrow={f.eyebrow} title={f.title} lead={f.subtitle} />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 xl:grid-cols-4">
          {f.items.map((item) => {
            const intent: ContactIntent =
              item.id === "special" ? { kind: "special" } : { kind: "format", id: item.id as "company" | "store" | "custom" };
            const featured = item.id === "special";
            return (
              <li
                key={item.id}
                className={cn(
                  "flex flex-col rounded-[20px] border p-6",
                  featured ? "border-lime/40 bg-[linear-gradient(180deg,rgba(199,246,108,0.07),transparent_60%)]" : "border-line bg-elevated",
                )}
              >
                <h3 className="h3">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">
                  <span className="sr-only">{f.fitLabel}: </span>
                  {item.fit}
                </p>
                <ul className="mt-5 space-y-2 text-[0.92rem]">
                  {item.gets.map((g) => (
                    <li key={g} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
                      {g}
                    </li>
                  ))}
                </ul>
                <p className={cn("mt-5 text-sm", featured ? "font-semibold text-lime" : "text-subtle")}>
                  {item.price || f.priceCustom}
                </p>
                <div className="mt-auto flex flex-col gap-2 pt-6">
                  <WhatsappCta
                    locale={locale}
                    intent={intent}
                    location="home_formats"
                    label={f.discuss}
                    variant={featured ? "primary" : "quiet"}
                    size="sm"
                    className="w-full"
                  />
                  <Link
                    href={href(locale, item.href)}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
                  >
                    {f.details}
                    <span className="sr-only">: {item.title}</span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="label">{f.alsoTitle}</span>
          <ul className="flex flex-wrap gap-2">
            {extra.map((s) => (
              <li key={s.slug}>
                <Link
                  href={href(locale, `/services/${s.slug}`)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-text transition-colors hover:border-line-strong hover:bg-white/[0.04]"
                >
                  {s.title}
                  <ArrowRight className="size-3.5 text-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
