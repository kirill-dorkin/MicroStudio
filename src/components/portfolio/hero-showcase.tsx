"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/badge";

type Slide = { slug: string; name: string; short: string; image: string; host: string; href: string };

type Props = {
  slides: Slide[];
  labels: { note: string; prev: string; next: string; position: string; open: string; demo: string };
};

/** Three layered screenshots; the front one links to its project page. */
export function HeroShowcase({ slides, labels }: Props) {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const go = (dir: 1 | -1) => setActive((i) => (i + dir + total) % total);

  return (
    <div className="relative">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="eyebrow">{labels.note}</p>
        <div className="flex items-center gap-2">
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

      <div className="relative aspect-[16/11] [perspective:1600px]">
        {slides.map((slide, i) => {
          const offset = (i - active + total) % total; // 0 = front
          const isFront = offset === 0;
          return (
            <div
              key={slide.slug}
              aria-hidden={!isFront}
              className={cn(
                "absolute inset-x-0 top-0 transition-[transform,opacity,filter] duration-500 ease-[var(--ease-out-soft)] will-change-transform",
                offset === 0 && "z-30 translate-x-0 translate-y-[10%] opacity-100",
                offset === 1 && "z-20 translate-x-[8%] translate-y-[1%] scale-[0.88] opacity-80 brightness-[0.5]",
                offset === 2 && "z-10 translate-x-[15%] -translate-y-[7%] scale-[0.76] opacity-60 brightness-[0.35]",
              )}
            >
              <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#1b1e21] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
                <div className="flex h-8 items-center gap-1.5 border-b border-white/[0.06] px-3" aria-hidden="true">
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="size-2 rounded-full bg-white/15" />
                  <span className="mx-auto truncate text-[0.65rem] text-subtle">{slide.host}</span>
                </div>
                <div className="relative aspect-[16/10] bg-[#f3f3f1]">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              {isFront && (
                <Link
                  href={slide.href}
                  className="absolute inset-0 rounded-[14px] focus-visible:outline-offset-4"
                  aria-label={`${labels.open}: ${slide.name}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-[7%] flex items-center justify-between gap-4 pt-4 text-sm">
        <div className="flex min-w-0 items-center gap-3">
          <DemoBadge label={labels.demo} />
          <span className="truncate text-muted">{slides[active].short}</span>
        </div>
        <p className="shrink-0 tabular-nums text-subtle" aria-live="polite">
          {labels.position.replace("{current}", String(active + 1)).replace("{total}", String(total))}
        </p>
      </div>
    </div>
  );
}
