import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoLanding } from "@/components/demo/demo-landing";
import { isDemoSlug } from "@/content/demos";
import { getLanguage } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionaries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isDemoSlug(slug)) return {};
  const t = dictionaries[await getLanguage()];
  const demo = t.demo.items[slug];
  return {
    title: { absolute: `${demo.kind} «${demo.name}» — ${t.meta.demoTitle}` },
    description: t.portfolio.items[slug].description,
    alternates: { canonical: `/demo/${slug}` },
    // Demo concepts are examples, not real businesses.
    robots: { index: false, follow: true },
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  if (!isDemoSlug(slug)) notFound();
  return <DemoLanding slug={slug} />;
}
