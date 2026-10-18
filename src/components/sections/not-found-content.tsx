"use client";

import { usePathname } from "next/navigation";
import { buttonClass } from "@/components/ui/button";
import Link from "next/link";
import type { Dictionary } from "@/content/locales";

export function NotFoundContent({ texts }: { texts: { ru: Dictionary["notFound"]; en: Dictionary["notFound"] } }) {
  const pathname = usePathname() ?? "";
  const locale = pathname.startsWith("/en") ? "en" : "ru";
  const t = texts[locale];
  return (
    <section className="container-page flex min-h-[78dvh] flex-col justify-center pb-20 pt-36">
      <p className="font-display text-[clamp(6rem,20vw,14rem)] font-extrabold leading-none tracking-[-0.06em] text-lime">
        404
      </p>
      <h1 className="h2 mt-6 max-w-2xl">{t.title}</h1>
      <p className="lead mt-5 max-w-xl">{t.body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={`/${locale}`} className={buttonClass("primary")}>
          {t.home}
        </Link>
        <Link href={`/${locale}/work`} className={buttonClass("secondary")}>
          {t.work}
        </Link>
      </div>
    </section>
  );
}
