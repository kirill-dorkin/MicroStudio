import type { Metadata } from "next";
import type { Locale } from "@/config/site";
import { getSeo } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/sections/home/hero";
import { SelectedWork } from "@/components/sections/home/selected-work";
import { Formats } from "@/components/sections/home/formats";
import { Process } from "@/components/sections/home/process";
import { SpecialTeaser } from "@/components/sections/home/special-teaser";
import { FaqSection } from "@/components/sections/home/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = getSeo("home", locale)!;
  return pageMetadata({ locale, path: "", og: "home", ...seo });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <SelectedWork locale={locale} />
      <Formats locale={locale} />
      <Process locale={locale} />
      <SpecialTeaser locale={locale} />
      <FaqSection locale={locale} />
      <CtaBand locale={locale} location="home" />
    </>
  );
}
