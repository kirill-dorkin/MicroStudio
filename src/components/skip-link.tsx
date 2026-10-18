"use client";
import { useLanguage } from "./language-provider";

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="bg-foreground text-background fixed left-4 top-4 z-50 -translate-y-24 rounded-md px-4 py-2 text-sm font-medium transition-transform focus:translate-y-0"
    >
      {t.common.skipToContent}
    </a>
  );
}
