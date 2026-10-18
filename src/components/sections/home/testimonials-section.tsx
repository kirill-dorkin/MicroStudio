"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollView } from "@/components/scroll-view";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

// The original testimonials bento: one tall card, one wide, two small.
const LAYOUT = [
  "sm:col-span-2 sm:p-6 lg:row-span-2",
  "md:col-span-2",
  "",
  "",
];

export default function TestimonialsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-32" id="testimonials" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <ScrollView>
            <h2 id="testimonials-title" className="text-balance text-4xl font-medium lg:text-5xl">
              {t.testimonials.title}
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="text-pretty">{t.testimonials.subtitle}</p>
          </ScrollView>
        </div>

        <ScrollView delay={0.3}>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
            {t.testimonials.items.map((item, index) => (
              <Card key={item.name} className={cn("h-full", LAYOUT[index])}>
                <CardContent className="h-full">
                  <figure className="grid h-full grid-rows-[1fr_auto] gap-6">
                    <blockquote
                      className={cn(
                        index === 0 ? "text-2xl font-medium" : index === 1 ? "text-xl font-medium" : ""
                      )}
                    >
                      <p>{item.quote}</p>
                    </blockquote>
                    <figcaption className="grid grid-cols-[auto_1fr] items-center gap-3">
                      <span
                        aria-hidden
                        className="bg-muted flex size-12 items-center justify-center rounded-full text-sm font-medium"
                      >
                        {item.name.slice(0, 1)}
                      </span>
                      <span>
                        <cite className="block text-sm font-medium not-italic">{item.name}</cite>
                        <span className="text-muted-foreground block text-sm">{item.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollView>
      </div>
    </section>
  );
}
