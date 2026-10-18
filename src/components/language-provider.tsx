"use client";
import React from "react";
import {
  isLanguage,
  LANGUAGE_COOKIE,
  LANGUAGE_STORAGE_KEY,
  type Language,
} from "@/lib/i18n/config";
import { dictionaries, type Dictionary } from "@/lib/i18n/dictionaries";

type LanguageContextValue = {
  lang: Language;
  t: Dictionary;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

/**
 * The language comes from a cookie that the server also reads, so the HTML
 * is rendered in the visitor's language and hydrates without a mismatch.
 */
export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: Language;
  children: React.ReactNode;
}) {
  const [lang, setLang] = React.useState<Language>(initialLanguage);

  const setLanguage = React.useCallback((next: Language) => {
    setLang(next);
    document.cookie = `${LANGUAGE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {}
  }, []);

  // Safety net for pages rendered without the cookie (e.g. the static 404).
  React.useEffect(() => {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${LANGUAGE_COOKIE}=([^;]*)`)
    );
    let saved: string | null | undefined = match?.[1];
    if (!saved) {
      // Cookie cleared but the choice is still in localStorage: restore it.
      try {
        saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      } catch {}
      if (isLanguage(saved)) setLanguage(saved);
      return;
    }
    if (isLanguage(saved) && saved !== initialLanguage) setLang(saved);
  }, [initialLanguage, setLanguage]);

  React.useEffect(() => {
    const t = dictionaries[lang];
    document.documentElement.lang = lang;
    // Keep the tab title and description in sync after a client-side switch.
    const isDemo = window.location.pathname.startsWith("/demo/");
    if (!isDemo) document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
  }, [lang]);

  const value = React.useMemo(
    () => ({ lang, t: dictionaries[lang], setLanguage }),
    [lang, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
