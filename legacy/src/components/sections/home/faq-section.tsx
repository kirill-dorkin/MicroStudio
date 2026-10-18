"use client";

import { Plus } from "lucide-react";
import { ScrollView } from "@/components/scroll-view";
import { useLanguage } from "@/components/language-provider";

export default function FaqSection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-24" id="faq" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-5 md:gap-12">
        <div className="md:col-span-2">
          <ScrollView>
            <h2 id="faq-title" className="text-balance text-4xl font-medium">
              {t.faq.title}
            </h2>
          </ScrollView>
          <ScrollView delay={0.1}>
            <p className="text-muted-foreground mt-4 text-pretty">
              {t.faq.subtitle}
            </p>
          </ScrollView>
        </div>
        <div className="md:col-span-3">
          <ScrollView delay={0.15}>
            <div className="divide-y border-y">
              {t.faq.items.map((item, index) => (
                <details key={item.q} className="group py-2" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-3 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      aria-hidden
                      className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="text-muted-foreground pb-4 pr-10">{item.a}</p>
                </details>
              ))}
            </div>
          </ScrollView>
        </div>
      </div>
    </section>
  );
}
