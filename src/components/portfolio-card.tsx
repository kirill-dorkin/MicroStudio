"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CustomCursorElement } from "./custom-cursor-element";
import { ScrollView } from "./scroll-view";
import { useLanguage } from "./language-provider";
import type { PortfolioItem } from "@/content/portfolio";

export default function PortfolioCard({ card }: { card: PortfolioItem }) {
  const { t, lang } = useLanguage();
  const img = typeof card.img === "string" ? card.img : card.img[lang];
  const copy = t.portfolio.items[card.key];
  const external = card.href.startsWith("http");
  const action = t.portfolio.action.site;

  return (
    <div>
      <CustomCursorElement
        cursor={
          <div className="text-zinc-950 text-lg font-medium">
            {t.portfolio.cursor.site}
          </div>
        }
      >
        <ScrollView>
          <article className="group transition-all duration-500 hover:scale-[1.03] motion-reduce:hover:scale-100">
            <Link
              href={card.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="block rounded-md"
              aria-label={`${copy.name} — ${action}${external ? ` (${t.common.newTab})` : ""}`}
            >
              <div className="overflow-hidden rounded-md border border-black/5 dark:border-white/10">
                <Image
                  className="aspect-[16/10] w-full object-cover object-top grayscale-25 transition-all duration-500 group-hover:grayscale-0"
                  height={900}
                  width={1440}
                  sizes="(min-width: 768px) 440px, 100vw"
                  src={img}
                  alt={copy.alt}
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground text-sm">{copy.sector}</p>
                <h3 className="text-title text-2xl font-medium">{copy.name}</h3>
                <p className="text-muted-foreground">{copy.description}</p>
                <span className="text-foreground inline-flex items-center gap-1.5 pt-2 text-sm font-medium underline-offset-4 group-hover:underline">
                  {action}
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          </article>
        </ScrollView>
      </CustomCursorElement>
    </div>
  );
}
