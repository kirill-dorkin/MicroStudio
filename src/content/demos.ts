export const DEMO_SLUGS = ["coffee", "school", "flowers", "cleaning", "fitness"] as const;
export type DemoSlug = (typeof DEMO_SLUGS)[number];

export function isDemoSlug(value: string): value is DemoSlug {
  return DEMO_SLUGS.includes(value as DemoSlug);
}

/** Per-demo palette; demo pages always render in their own light palette. */
export const DEMO_THEMES: Record<
  DemoSlug,
  { bg: string; ink: string; accent: string; accent2: string; soft: string }
> = {
  coffee: { bg: "#faf6f1", ink: "#2b1d14", accent: "#6b4226", accent2: "#c08a5b", soft: "#efe4d6" },
  school: { bg: "#f5f7fb", ink: "#111a33", accent: "#1f3a8a", accent2: "#f2b705", soft: "#e2e8f6" },
  flowers: { bg: "#fdf6f7", ink: "#33141f", accent: "#b83d64", accent2: "#6c9a6b", soft: "#f6e1e7" },
  cleaning: { bg: "#f2f9f8", ink: "#0d2725", accent: "#0f766e", accent2: "#38bdb0", soft: "#d9efec" },
  fitness: { bg: "#f6f6f2", ink: "#1a1a14", accent: "#e4572e", accent2: "#f3a712", soft: "#fbe3d9" },
};
