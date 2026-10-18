import ru from "@/locales/ru";
import en from "@/locales/en";
import type { Language } from "./config";

export type Dictionary = typeof ru;

export const dictionaries: Record<Language, Dictionary> = { ru, en };
