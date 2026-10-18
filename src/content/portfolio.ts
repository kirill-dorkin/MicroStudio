export type PortfolioKey =
  | "bestelectronics"
  | "coffee"
  | "school"
  | "flowers";

export type PortfolioItem = {
  key: PortfolioKey;
  status: "real" | "demo";
  /** Preview per language; real projects keep their own site language. */
  img: string | { ru: string; en: string };
  href: string;
};

export const PORTFOLIO_CONTENT: PortfolioItem[] = [
  {
    key: "bestelectronics",
    status: "real",
    img: "/images/portfolio/bestelectronics.webp",
    href: "https://be-lending.vercel.app/",
  },
  {
    key: "coffee",
    status: "demo",
    img: { ru: "/images/portfolio/coffee-ru.webp", en: "/images/portfolio/coffee-en.webp" },
    href: "/demo/coffee",
  },
  {
    key: "school",
    status: "demo",
    img: { ru: "/images/portfolio/school-ru.webp", en: "/images/portfolio/school-en.webp" },
    href: "/demo/school",
  },
  {
    key: "flowers",
    status: "demo",
    img: { ru: "/images/portfolio/flowers-ru.webp", en: "/images/portfolio/flowers-en.webp" },
    href: "/demo/flowers",
  },

];
