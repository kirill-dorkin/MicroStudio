"use client";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import type { Language } from "@/lib/i18n/config";

export function Providers({
  initialLanguage,
  children,
}: {
  initialLanguage: Language;
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </LanguageProvider>
  );
}
