"use client";

import { Card } from "@/components/ui/card";
import { ScrollView } from "@/components/scroll-view";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Same bento rhythm as the original testimonials grid:
// one tall card, one wide card and two small ones.
const LAYOUT = [
  "sm:col-span-2 lg:row-span-2 sm:p-6",
  "md:col-span-2",
  "",
  "",
];

export default function FaqSection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-32" id="faq" aria-labelledby="faq-title">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 id="faq-title" className="text-4xl font-medium lg:text-5xl">
              {t.faq.title}
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="text-pretty">{t.faq.subtitle}</p>
          </ScrollView>
        </div>

        <ScrollView delay={0.3}>
          <dl className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
            {t.faq.items.map((item, index) => (
              <Card key={item.q} className={cn("h-full gap-4 px-6", LAYOUT[index])}>
                  <dt
                    className={cn(
                      "font-medium",
                      index === 0 ? "text-2xl lg:text-3xl" : index === 1 ? "text-xl" : "text-lg"
                    )}
                  >
                    {item.q}
                  </dt>
                  <dd
                    className={cn(
                      "text-muted-foreground",
                      index === 0 && "flex flex-1 flex-col text-lg lg:text-xl"
                    )}
                  >
                    {item.a}
                    {index === 0 && (
                      <span className="mt-8 block lg:mt-auto" aria-hidden>
                        <span className="text-muted-foreground block text-sm">
                          {t.offer.title}
                        </span>
                        <span className="text-foreground block text-5xl font-semibold tracking-tight">
                          {t.offer.price}
                        </span>
                      </span>
                    )}
                    {index === 0 && (
                      <Link
                        href="#offer"
                        className="text-foreground mt-6 flex w-fit items-center gap-2 rounded-sm text-base font-medium underline-offset-4 hover:underline"
                      >
                        {t.faq.offerLink}
                        <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    )}
                  </dd>
              </Card>
            ))}
          </dl>
        </ScrollView>
      </div>
    </section>
  );
}
