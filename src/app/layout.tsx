import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SkipLink } from "@/components/skip-link";
import { getLanguage } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { LANGUAGES, OG_LOCALES } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/contacts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  // Geist has no Cyrillic glyphs: without this the browser would render
  // Russian text with the Arial-based fallback instead of Inter below.
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cyrillic companion for Geist, closest in proportions and rhythm.
const interCyrillic = Inter({
  variable: "--font-cyrillic",
  subsets: ["cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguage();
  const t = dictionaries[lang].meta;
  const ogImage = `/og-${lang}.jpg`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.title,
      template: "%s | MicroStudio",
    },
    description: t.description,
    applicationName: "MicroStudio",
    alternates: { canonical: "/" },
    openGraph: {
      title: t.title,
      description: t.description,
      url: "/",
      siteName: "MicroStudio",
      images: [{ url: ogImage, width: 1200, height: 630, alt: t.ogAlt }],
      locale: OG_LOCALES[lang],
      alternateLocale: LANGUAGES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLanguage();

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <noscript>
          {/* Reveal animations need JS; without it show the content as is. */}
          <style>{`[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interCyrillic.variable} antialiased`}
      >
        <Providers initialLanguage={lang}>
          <SkipLink />
          {children}
        </Providers>
      </body>
    </html>
  );
}
