"use client";
import { ScrollView } from "@/components/scroll-view";
import { useLanguage } from "@/components/language-provider";
import { motion } from "motion/react";

export default function StatsSection() {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-20" id="stats" aria-labelledby="stats-title">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <ScrollView>
            <h2 id="stats-title" className="text-balance text-4xl font-medium lg:text-5xl">
              {t.stats.title}
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="text-pretty">{t.stats.subtitle}</p>
          </ScrollView>
        </div>
        <ScrollView stagger delay={0.04}>
          <dl className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
            {t.stats.items.map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
                }}
                className="flex flex-col-reverse gap-4 pb-12 last:pb-0 md:px-6 md:pb-0"
              >
                <dt className="text-muted-foreground mx-auto max-w-48">{item.label}</dt>
                <dd className="text-5xl font-bold">{item.value}</dd>
              </motion.div>
            ))}
          </dl>
        </ScrollView>
      </div>
    </section>
  );
}
