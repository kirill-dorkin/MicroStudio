export const LANGUAGES = ["ru", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "ru";
export const LANGUAGE_COOKIE = "lang";
export const LANGUAGE_STORAGE_KEY = "microstudio-lang";

export const LANGUAGE_LABELS: Record<Language, string> = {
  ru: "Русский",
  en: "English",
};

export const OG_LOCALES: Record<Language, string> = {
  ru: "ru_RU",
  en: "en_US",
};

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}
