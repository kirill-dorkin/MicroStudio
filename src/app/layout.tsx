import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroHeader } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://microstudio.com"),
  title: {
    default: "MicroStudio – Next.js Template",
    template: "%s | MicroStudio",
  },
  description:
    "MicroStudio is a modern Next.js and TypeScript template featuring Tailwind CSS and motion animations for building high-performance websites.",
  keywords: [
    "MicroStudio",
    "Next.js template",
    "TypeScript",
    "Tailwind CSS",
    "Motion animations",
  ],
  openGraph: {
    title: "MicroStudio – Next.js Template",
    description:
      "Build stunning, high-performance websites with MicroStudio, a modern Next.js and TypeScript template.",
    url: "https://microstudio.com",
    siteName: "MicroStudio",
    images: [
      {
        url: "/images/abstract-1.png",
        width: 1200,
        height: 630,
        alt: "MicroStudio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MicroStudio – Next.js Template",
    description:
      "Build stunning, high-performance websites with MicroStudio, a modern Next.js and TypeScript template.",
    images: ["/images/abstract-1.png"],
    creator: "@microstudio",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeroHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
