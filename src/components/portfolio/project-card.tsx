import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LocalizedProject } from "@/lib/content";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { DemoBadge } from "@/components/ui/badge";

type Props = {
  project: LocalizedProject;
  href: string;
  categoryLabel: string;
  demoLabel: string;
  authorLabel: string;
  ctaLabel: string;
  size?: "lg" | "md";
  sizes?: string;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** Whole card is clickable through the heading link stretched over it. */
export function ProjectCard({
  project,
  href,
  categoryLabel,
  demoLabel,
  authorLabel,
  ctaLabel,
  size = "md",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  headingLevel: Heading = "h3",
  className,
}: Props) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <BrowserFrame host={project.demoHost} className="transition-[border-color,transform] duration-500 ease-[var(--ease-out-soft)] group-hover:border-white/20">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f3f3f1]">
          <Image
            src={project.screenshots.desktop}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.025]"
          />
        </div>
        <DemoBadge label={demoLabel} className="absolute left-3 top-3" />
      </BrowserFrame>

      <div className="mt-4 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="mb-1.5 text-[0.78rem] font-medium uppercase tracking-[0.1em] text-subtle">
            {categoryLabel} · {project.sector}
          </p>
          <Heading className={cn("font-display font-bold tracking-[-0.02em]", size === "lg" ? "text-[1.35rem] md:text-[1.6rem]" : "text-[1.25rem] md:text-[1.4rem]")}>
            <Link href={href} className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-lime">
              {project.name}
              <span className="sr-only">. {ctaLabel}</span>
            </Link>
          </Heading>
          <p className="mt-2 line-clamp-2 max-w-xl text-[0.95rem] text-muted">{project.description}</p>
          <p className="mt-2 text-[0.82rem] text-subtle">
            {authorLabel}: {project.author} · {project.license}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-bg"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </article>
  );
}
