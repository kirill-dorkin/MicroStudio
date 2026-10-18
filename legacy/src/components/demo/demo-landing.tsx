"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Coffee,
  Dumbbell,
  Sparkles,
  Flower2,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SocialIcon } from "@/components/social-icon";
import { useLanguage } from "@/components/language-provider";
import { DEMO_THEMES, type DemoSlug } from "@/content/demos";
import { whatsappLink } from "@/lib/contacts";

const ICONS: Record<DemoSlug, LucideIcon> = {
  coffee: Coffee,
  school: GraduationCap,
  flowers: Flower2,
  cleaning: Sparkles,
  fitness: Dumbbell,
};

export function DemoLanding({ slug }: { slug: DemoSlug }) {
  const { t } = useLanguage();
  const demo = t.demo.items[slug];
  const theme = DEMO_THEMES[slug];
  const Icon = ICONS[slug];
  const widget = demo.widget;
  const contactUrl = whatsappLink(t.demo.ctaMessage.replace("{name}", demo.name));

  React.useEffect(() => {
    document.title = `${demo.kind} «${demo.name}» — ${t.meta.demoTitle}`;
  }, [demo.kind, demo.name, t.meta.demoTitle]);

  const style = {
    "--demo-bg": theme.bg,
    "--demo-ink": theme.ink,
    "--demo-accent": theme.accent,
    "--demo-accent-2": theme.accent2,
    "--demo-soft": theme.soft,
    colorScheme: "light",
  } as React.CSSProperties;

  return (
    <div style={style} className="min-h-screen bg-(--demo-bg) text-(--demo-ink)">
      {/* MicroStudio demo notice */}
      <div data-demo-bar className="bg-zinc-950 text-zinc-100">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-2.5 text-sm">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 rounded-sm font-medium hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t.demo.back}
          </Link>
          <p className="text-zinc-300">
            <span className="sm:hidden">{t.demo.bannerShort}</span>
            <span className="hidden sm:inline">{t.demo.banner}</span>
          </p>
          <LanguageSwitcher className="text-zinc-950" />
        </div>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-(--demo-accent) text-white">
            <Icon className="size-5" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-semibold">{demo.name}</span>
            <span className="block text-xs opacity-70">{demo.kind}</span>
          </span>
        </div>
        <nav aria-label={demo.name} className="hidden items-center gap-8 text-sm sm:flex">
          <a href="#menu" className="rounded-sm hover:underline">
            {demo.menuTitle}
          </a>
          <a href="#steps" className="rounded-sm hover:underline">
            {demo.stepsTitle}
          </a>
          <a
            href="#order"
            className="rounded-full bg-(--demo-accent) px-4 py-2 font-medium text-white hover:opacity-90"
          >
            {demo.primary}
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-8 md:grid-cols-2 md:gap-16 md:pt-12">
          <div>
            <ul className="flex flex-wrap gap-2">
              {demo.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full bg-(--demo-soft) px-3 py-1 text-xs font-medium"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {demo.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg opacity-80">{demo.text}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#order"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-(--demo-accent) px-6 font-medium text-white hover:opacity-90"
              >
                {demo.primary}
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="#menu"
                className="inline-flex h-12 items-center justify-center rounded-full border border-current/20 px-6 font-medium hover:bg-(--demo-soft)"
              >
                {demo.secondary}
              </a>
            </div>
          </div>

          <div aria-hidden className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-(--demo-soft) shadow-2xl shadow-black/10 sm:aspect-[5/6]">
              <Image
                src={`/images/projects/${slug}-hero.webp`}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 512px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/35 to-transparent" />
            </div>
            <div className="absolute inset-x-4 -bottom-8 rounded-3xl bg-white p-5 shadow-2xl shadow-black/15 sm:inset-x-auto sm:-left-10 sm:w-80">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">{widget.title}</span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--demo-soft)">
                  <Icon className="size-4 text-(--demo-accent)" />
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {widget.rows.map((row) => (
                  <div key={row.label} className="rounded-xl bg-(--demo-soft)/70 px-3 py-2">
                    <span className="block text-xs opacity-60">{row.label}</span>
                    <span className="block truncate font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              <span className="mt-4 block text-xs opacity-60">{widget.optionsLabel}</span>
              <div className="mt-2 flex gap-2">
                {widget.options.map((option, index) => (
                  <span
                    key={option}
                    className={
                      index === 1
                        ? "flex-1 rounded-full bg-(--demo-accent) py-1.5 text-center text-xs font-medium text-white"
                        : "flex-1 rounded-full border border-black/10 py-1.5 text-center text-xs font-medium"
                    }
                  >
                    {option}
                  </span>
                ))}
              </div>
              <span className="mt-4 block rounded-full bg-zinc-950 py-3 text-center text-sm font-medium text-white">
                {widget.button}
              </span>
            </div>
            <div className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur sm:-right-4 sm:top-8">
              {demo.chips[0]}
            </div>
          </div>
        </section>

        <section id="menu" className="scroll-mt-6 bg-white/60 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">{demo.menuTitle}</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {demo.menu.map((item, index) => (
                <li
                  key={item.title}
                  className="flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={`/images/projects/${slug}-${index + 1}.webp`}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-lg font-semibold">{item.title}</span>
                    <span className="mt-2 opacity-70">{item.text}</span>
                    <span className="mt-6 inline-flex w-fit rounded-full bg-(--demo-soft) px-3 py-1 text-sm font-semibold text-(--demo-accent)">
                      {item.meta}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="steps" className="mx-auto max-w-6xl scroll-mt-6 px-6 py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl">{demo.stepsTitle}</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {demo.steps.map((step, index) => (
              <li key={step} className="border-t border-current/15 pt-6">
                <span className="text-4xl font-bold text-(--demo-accent)">
                  0{index + 1}
                </span>
                <p className="mt-4 text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="order" className="scroll-mt-6 px-6 pb-20">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-zinc-950 px-8 py-12 text-zinc-50 sm:px-12 sm:py-16">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Logo className="size-5 text-zinc-50" />
              {t.demo.madeBy}
            </div>
            <h2 className="mt-6 max-w-2xl text-balance text-3xl font-semibold sm:text-4xl">
              {t.demo.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-zinc-300">{t.demo.ctaText}</p>
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-medium text-zinc-950 hover:bg-zinc-200"
            >
              <SocialIcon name="whatsapp" className="size-4" />
              {t.demo.ctaButton}
              <span className="sr-only">({t.common.newTab})</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-current/10 px-6 py-8 text-sm opacity-80">
        <span>
          © {demo.name} · {t.demo.disclaimer}
        </span>
        <Link href="/" className="inline-flex items-center gap-2 rounded-sm hover:underline">
          <Logo className="size-4" />
          MicroStudio
        </Link>
      </footer>
    </div>
  );
}
