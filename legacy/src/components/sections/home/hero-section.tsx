"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import useReducedMotion from "@/hooks/useReducedMotion";

import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import dynamic from "next/dynamic";

const LogoCloud = dynamic(
  () => import("@/components/sections/home/logo-cloud"),
  { ssr: true }
);

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.2,
      },
    },
  },
};

/**
 * Decorative background video. The poster is rendered on the server; the
 * video itself is attached only after mount and skipped entirely when the
 * visitor prefers reduced motion, saves data or is on a weak device.
 */
function HeroVideo() {
  const reduce = useReducedMotion();
  const [canPlay, setCanPlay] = React.useState(false);

  React.useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const weakDevice =
      (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2);
    setCanPlay(!weakDevice);
  }, []);

  const className =
    "size-full -scale-x-100 object-cover opacity-50 invert-0 dark:opacity-35 dark:invert";

  if (reduce || !canPlay) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/hero-poster.webp" alt="" aria-hidden className={className} />
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster="/hero-poster.webp"
      aria-hidden
      tabIndex={-1}
      className={className}
    >
      <source src="/hero-light.mp4" type="video/mp4" />
    </video>
  );
}

export default function HeroSection() {
  const { t, lang } = useLanguage();
  return (
    <>
      <div className="overflow-hidden min-h-screen">
        <section id="home">
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 0.3,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            >
              <div className="h-screen xl:h-auto absolute inset-2 -z-10 overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5">
                <HeroVideo />
              </div>
            </AnimatedGroup>

            <div className="absolute inset-0 -z-10 size-full "></div>
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <TextEffect
                  key={`title-${lang}`}
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mx-auto mt-8 max-w-5xl text-balance text-[2.75rem] leading-[1.1] sm:text-5xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-semibold"
                >
                  {t.hero.title}
                </TextEffect>
                <TextEffect
                  key={`subtitle-${lang}`}
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.3}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                >
                  {t.hero.subtitle}
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.4,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
                    >
                      <Link href="#contact">
                        <span className="text-nowrap">{t.hero.cta.contact}</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5"
                  >
                    <Link href="#portfolio">
                      <span className="text-nowrap">{t.hero.cta.work}</span>
                    </Link>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>
          </div>
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.6,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20">
              <LogoCloud />
            </div>
          </AnimatedGroup>
        </section>
      </div>
    </>
  );
}
