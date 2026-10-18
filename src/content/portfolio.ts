export type PortfolioKey =
  | "bestelectronics"
  | "coffee"
  | "school"
  | "flowers"
  | "cleaning"
  | "fitness";

export type PortfolioItem = {
  key: PortfolioKey;
  /** Preview per language; external sites keep their own language. */
  img: string | { ru: string; en: string };
  href: string;
};

const project = (key: Exclude<PortfolioKey, "bestelectronics">): PortfolioItem => ({
  key,
  img: {
    ru: `/images/portfolio/${key}-ru.webp`,
    en: `/images/portfolio/${key}-en.webp`,
  },
  href: `/demo/${key}`,
});

export const PORTFOLIO_CONTENT: PortfolioItem[] = [
  {
    key: "bestelectronics",
    img: "/images/portfolio/bestelectronics.webp",
    href: "https://be-lending.vercel.app/",
  },
  project("coffee"),
  project("school"),
  project("flowers"),
  project("cleaning"),
  project("fitness"),
];
