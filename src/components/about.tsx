"use client";

import { Circle } from "lucide-react";
import { ScrollView } from "./scroll-view";
import Image from "next/image";
import { useLanguage } from "./language-provider";

export default function ContentSection() {
  const { t } = useLanguage();

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
          <Image
            className="rounded-(--radius) object-cover aspect-[16/9] w-full"
            src="/images/abstract-4.webp"
            alt={t.about.imageAlt}
            height={900}
            width={1600}
            sizes="(min-width: 1024px) 976px, 100vw"
          />
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
