"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/badge";

type Slide = { slug: string; name: string; short: string; image: string; mobile: string; host: string; href: string };

type Props = {
  slides: Slide[];
  labels: { note: string; prev: string; next: string; position: string; open: string; demo: string; choose: string };
};

/**
 * Desktop and phone screenshots of one demo at a time. No autoplay: the
 * visitor switches examples with the arrows or the named tabs.
 */
export function HeroShowcase({ slides, labels }: Props) {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const go = (dir: 1 | -1) => setActive((i) => (i + dir + total) % total);
  const current = slides[active];

  return (
    <div className="relative">
      <div className="relative pb-[9%] pr-[11%]">
        {slides.map((slide, i) => (
          <div
            key={slide.slug}
            aria-hidden={i !== active}
            className={cn(
              "transition-opacity duration-500 ease-[var(--ease-out-soft)]",
              i === active ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
            )}
          >
            <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#1b1e21] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
              <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] px-3" aria-hidden="true">
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
                <span className="mx-auto truncate text-[0.7rem] text-muted">{slide.host}</span>
              </div>
              <div className="relative aspect-[16/10] bg-[#f3f3f1]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 44vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-[26%] min-w-[84px] overflow-hidden rounded-[18px] border-[4px] border-[#25292c] bg-[#25292c] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:rounded-[22px] sm:border-[5px]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[13px] bg-[#f3f3f1] sm:rounded-[16px]">
                <Image src={slide.mobile} alt="" fill sizes="(min-width: 1024px) 12vw, 24vw" className="object-cover object-top" />
              </div>
            </div>
            {i === active && (
              <Link
                href={slide.href}
                className="absolute inset-0 rounded-[14px] focus-visible:outline-offset-4"
                aria-label={`${labels.open}: ${slide.name}`}
              />
            )}
          </div>
        ))}
        <DemoBadge label={labels.demo} className="absolute bottom-[calc(9%+0.75rem)] left-3 z-10" />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm text-muted sm:hidden" aria-hidden="true">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-lime align-middle" />
          {current.short} · {active + 1}/{total}
        </p>
        <div role="group" aria-label={labels.choose} className="no-scrollbar -mx-1 hidden min-w-0 gap-1 overflow-x-auto px-1 sm:flex">
          {slides.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-[0.85rem] transition-colors",
                i === active ? "bg-white/[0.08] text-text" : "text-muted hover:text-text",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-1.5 rounded-full", i === active ? "bg-lime" : "bg-white/25")}
              />
              {slide.short}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={labels.prev}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-text"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={labels.next}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-text"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {labels.position.replace("{current}", String(active + 1)).replace("{total}", String(total))}: {current.name}
      </p>
    </div>
  );
}
