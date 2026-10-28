import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/config/site";
import { getDictionary } from "@/content/locales";
import { href } from "@/lib/i18n";
import type { ContactIntent } from "@/lib/intent";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsappCta } from "@/components/ui/whatsapp-cta";

/**
 * Four formats from simple to complex. Only the entry offer has a fixed
 * price, so it is the one highlighted card with a filled button; the rest
 * use outlined buttons and stay honest about pricing after a conversation.
 */
export function Formats({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const t = d.home.formats;
  return (
    <section id="formats" aria-labelledby="formats-title" className="section border-t border-line bg-[#f2f1ec] text-[#14171a]">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#4b524f]">{t.eyebrow}</p>
          <SectionHeading id="formats-title" title={t.title} className="[&_h2]:text-[#14171a]" />
          <p className="mt-4 text-[1.05rem] leading-relaxed text-[#4b524f]">{t.lead}</p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12 xl:grid-cols-4">
          {d.formats.items.map((f) => {
            const featured = f.id === "special";
            const intent: ContactIntent = featured ? { kind: "special" } : { kind: "format", id: f.id as "company" | "store" | "custom" };
            return (
              <li
                key={f.id}
                className={cn(
                  "relative flex flex-col rounded-[22px] border p-6 md:p-7",
                  featured ? "border-[#14171a] bg-[#0b0d0f] text-text shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]" : "border-[#dcdbd3] bg-white",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-lime px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-bg">{t.popular}</span>
                )}
                <h3 className="h3">{f.title}</h3>
                <p className={cn("mt-3", featured ? "font-display text-[1.6rem] font-bold leading-tight tracking-[-0.03em]" : "text-[0.95rem] font-semibold leading-snug text-[#3d6b00] sm:min-h-[2.4rem] sm:pt-2")}>
                  {featured ? f.price.split(" — ")[0] : t.from}
                </p>
                <p className={cn("mt-4 text-[0.95rem]", featured ? "text-muted" : "text-[#4b524f]")}>{f.fit}</p>
                <ul className="mt-5 grid gap-2.5">
                  {f.gets.map((g) => (
                    <li key={g} className="flex gap-2.5 text-[0.93rem]">
                      <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-lime" : "text-[#3d6b00]")} strokeWidth={3} aria-hidden="true" />
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto grid gap-2 pt-7">
                  <WhatsappCta
                    locale={locale}
                    intent={intent}
                    location={`home_format_${f.id}`}
                    label={d.formats.discuss}
                    variant={featured ? "primary" : "onLight"}
                    className="w-full"
                  />
                  <Link
                    href={href(locale, f.href)}
                    className={cn("inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline", featured ? "text-muted hover:text-text" : "text-[#4b524f] hover:text-[#14171a]")}
                  >
                    {d.formats.details}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
