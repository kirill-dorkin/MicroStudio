"use client";

import { Circle } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";
import { useLanguage } from "./language-provider";
import { PORTFOLIO_CONTENT } from "@/content/portfolio";

const byKey = (key: string) => PORTFOLIO_CONTENT.find((p) => p.key === key)!;

// A loose stack of real screens from the portfolio over the studio artwork.
const COLLAGE = [
  { key: "school", img: byKey("school").img, className: "left-[5%] top-[12%] w-[42%] -rotate-3" },
  { key: "flowers", img: byKey("flowers").img, className: "right-[5%] top-[9%] w-[40%] rotate-3" },
  { key: "bestelectronics", img: byKey("bestelectronics").img, className: "left-[24%] top-[34%] z-10 w-[52%]" },
];

export default function ContentSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-16 md:py-32" id="about">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              {t.about.title}
            </h2>
          </ScrollView>
          <ScrollView>
            <p className="text-pretty">{t.about.description}</p>
          </ScrollView>
        </div>
        <ScrollView>
          <div
            role="img"
            aria-label={t.about.imageAlt}
            className="@container relative aspect-[16/9] w-full overflow-hidden rounded-(--radius)"
          >
            <Image
              src="/images/abstract-4.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 976px, 100vw"
              className="object-cover"
            />
            {COLLAGE.map((item) => (
              <div
                key={item.key}
                className={`absolute overflow-hidden rounded-[1.4cqw] shadow-2xl shadow-black/30 ring-1 ring-black/10 ${item.className}`}
              >
                <Image
                  src={typeof item.img === "string" ? item.img : item.img[lang]}
                  alt=""
                  width={1440}
                  height={900}
                  sizes="(min-width: 1024px) 480px, 50vw"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </ScrollView>
        <ScrollView>
          <div className="relative mx-auto grid grid-cols-1 gap-x-3 gap-y-6 min-[400px]:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {t.about.principles.map((principle) => (
              <div className="space-y-3" key={principle.title}>
                <div className="flex items-center gap-2">
                  <Circle className="size-4 shrink-0" aria-hidden />
                  <h3 className="text-sm font-medium">{principle.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
