import type { Metadata } from "next";
import ru from "@/content/locales/ru";
import en from "@/content/locales/en";
import { NotFoundContent } from "@/components/sections/not-found-content";

export const metadata: Metadata = {
  title: { absolute: "404 — MicroStudio" },
  robots: { index: false, follow: false },
};

// not-found receives no params, so the client part picks the locale from the URL.
export default function NotFound() {
  return <NotFoundContent texts={{ ru: ru.notFound, en: en.notFound }} />;
}
