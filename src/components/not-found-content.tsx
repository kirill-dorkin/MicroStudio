"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useLanguage } from "./language-provider";

export function NotFoundContent() {
  const { t } = useLanguage();
  return (
    <main id="main" className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo className="size-10" />
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="text-muted-foreground max-w-sm">{t.notFound.text}</p>
      <Button asChild size="lg" className="rounded-xl">
        <Link href="/">{t.notFound.home}</Link>
      </Button>
    </main>
  );
}
