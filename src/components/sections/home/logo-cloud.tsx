"use client";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { useLanguage } from "@/components/language-provider";
import { TECH_LOGOS } from "@/content/tech-logos";

export default function LogoCloud() {
  const { t } = useLanguage();
  return (
    <section className="overflow-hidden py-16" aria-labelledby="tech-title">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-0">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p
              id="tech-title"
              className="text-muted-foreground text-center text-sm md:text-end"
            >
              {t.tech.title}
            </p>
          </div>
          <div className="relative w-full py-6 md:w-[calc(100%-11rem)]">
            <ul className="sr-only">
              {TECH_LOGOS.map((logo) => (
                <li key={logo.name}>{logo.name}</li>
              ))}
            </ul>
            <InfiniteSlider speedOnHover={20} speed={40} gap={72}>
              {TECH_LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  aria-hidden
                  className="flex h-12 items-center gap-2.5 opacity-80"
                >
                  <span className="flex size-8 items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: `${logo.scale * 100}%`, height: `${logo.scale * 100}%` }}
                    >
                      <path fill="currentColor" d={logo.path} />
                    </svg>
                  </span>
                  <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </section>
  );
}
