import type { Metadata } from "next";
import "./globals.css";
import "./studio.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroHeader } from "@/components/header";

export const metadata: Metadata = {
  title: {
    default: "MicroStudio — сайты и реклама для бизнеса",
    template: "%s | MicroStudio",
  },
  description:
    "Создаём сайты, дорабатываем существующие и настраиваем рекламу. Базовый одностраничный сайт за 1500 сом. MicroStudio, Кыргызстан.",
  openGraph: {
    title: "MicroStudio — ваш бизнес в лучшем виде",
    description:
      "Сайты, доработка и реклама под задачи вашего бизнеса. Начните с разговора.",
    siteName: "MicroStudio",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MicroStudio — сайты и реклама",
    description: "Сайты, доработка и реклама для бизнеса в Кыргызстане.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">
            К содержанию
          </a>
          <HeroHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
