import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrackedLink } from "@/components/ui/tracked-link";
import type { WorkType } from "@/lib/schemas";

export type CardProject = {
  slug: string;
  name: string;
  niche: string;
  summary: string;
  workType: WorkType;
  demoUrl: string;
  mobileFirst: boolean;
  images: { desktop: { src: string; width: number; height: number }; mobile: { src: string; width: number; height: number } };
};

export type CardLabels = {
  type: string;
  format: string;
  open: string;
  details: string;
  newTab: string;
};

type Props = {
  project: CardProject;
  href: string;
  labels: CardLabels;
  size?: "lg" | "md";
  sizes?: string;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  /** Show the one-line summary under the title. */
  showSummary?: boolean;
  className?: string;
};

export const typeStyle: Record<WorkType, string> = {
  client: "bg-lime text-bg",
  product: "bg-[#e8e3ff] text-[#2a1f5c]",
  demo: "border border-white/15 bg-bg/85 text-text",
};

/**
 * Screenshot first, then name, type and niche, then two separate actions:
 * the demo (new tab) and the case page. No nested interactive elements.
 */
export function ProjectCard({
  project,
  href,
  labels,
  size = "md",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
  headingLevel: Heading = "h3",
  showSummary = true,
  className,
}: Props) {
  const { desktop, mobile } = project.images;
  return (
    <article className={cn("group flex h-full flex-col", className)}>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block overflow-hidden rounded-[16px] border border-white/10 bg-[#15181a] transition-colors duration-300 group-hover:border-white/25"
      >
        {project.mobileFirst ? (
          <span className="relative block aspect-[16/10] bg-[linear-gradient(160deg,#1d2326,#121517)]">
            <span className="absolute left-1/2 top-[8%] block w-[30%] -translate-x-1/2 overflow-hidden rounded-[18px] border-[4px] border-[#2b3033] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]">
              <Image src={mobile.src} width={mobile.width} height={mobile.height} alt="" sizes="(min-width: 1024px) 12vw, 30vw" priority={priority} className="block h-auto w-full" />
            </span>
          </span>
        ) : (
          <span className="relative block aspect-[16/10]">
            <Image
              src={desktop.src}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover object-top transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
            />
          </span>
        )}
        <span className={cn("absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 text-[0.72rem] font-semibold tracking-wide backdrop-blur", typeStyle[project.workType])}>
          {labels.type}
        </span>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[0.78rem] font-medium uppercase tracking-[0.1em] text-subtle">
          {labels.format} · {project.niche}
        </p>
        <Heading className={cn("mt-1.5 font-display font-bold tracking-[-0.02em]", size === "lg" ? "text-[1.35rem] md:text-[1.6rem]" : "text-[1.2rem] md:text-[1.3rem]")}>
          <Link href={href} className="rounded-md hover:text-lime">
            {project.name}
          </Link>
        </Heading>
        {showSummary && <p className="mt-2 line-clamp-2 max-w-xl text-[0.95rem] text-muted">{project.summary}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
          <TrackedLink
            href={project.demoUrl}
            event="open_demo"
            params={{ project: project.slug, location: "card" }}
            newTabLabel={labels.newTab}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-[0.9rem] font-semibold transition-colors hover:border-lime hover:text-lime"
          >
            {labels.open}
            <span className="sr-only">: {project.name}</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </TrackedLink>
          <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 text-[0.9rem] font-semibold text-muted transition-colors hover:text-text">
            {labels.details}
            <span className="sr-only">: {project.name}</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
