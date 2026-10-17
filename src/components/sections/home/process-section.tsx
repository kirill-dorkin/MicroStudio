"use client";
import { ScrollView } from "@/components/scroll-view";
import { useLanguage } from "@/components/language-provider";
import { motion } from "motion/react";

export default function ProcessSection() {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-20" id="process" aria-labelledby="process-title">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <ScrollView>
            <h2 id="process-title" className="text-balance text-4xl font-medium lg:text-5xl">
              {t.process.title}
            </h2>
          </ScrollView>
          <ScrollView delay={0.2}>
            <p className="text-pretty">{t.process.subtitle}</p>
          </ScrollView>
        </div>
        <ScrollView stagger delay={0.04}>
          <ol className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
            {t.process.steps.map((step) => (
              <motion.li
                key={step.number}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  },
                }}
                className="space-y-4 pb-12 last:pb-0 md:px-6 md:pb-0"
              >
                <div className="text-5xl font-bold" aria-hidden>
                  {step.number}
                </div>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="text-muted-foreground mx-auto max-w-xs text-sm">
                  {step.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </ScrollView>
      </div>
    </section>
  );
}
