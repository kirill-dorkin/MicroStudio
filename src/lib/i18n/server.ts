import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, isLanguage, type Language } from "./config";
import { dictionaries } from "./dictionaries";

export async function getLanguage(): Promise<Language> {
  const value = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  return isLanguage(value) ? value : DEFAULT_LANGUAGE;
}

export async function getDictionary() {
  const lang = await getLanguage();
  return { lang, dict: dictionaries[lang] };
}
