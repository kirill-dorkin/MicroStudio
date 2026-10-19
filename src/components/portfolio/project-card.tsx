import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LocalizedProject } from "@/lib/content";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { DemoBadge, WorkBadge } from "@/components/ui/badge";

type Props = {
  project: LocalizedProject;
  href: string;
  categoryLabel: string;
  /** Label for third-party demos ("Open-source demo"). */
  demoLabel: string;
  /** Label for MicroStudio's own work. */
  ownLabel?: string;
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
  ownLabel,
  authorLabel,
  ctaLabel,
  size = "md",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  headingLevel: Heading = "h3",
  className,
}: Props) {
  const badge = project.own ? <WorkBadge label={ownLabel ?? ""} /> : <DemoBadge label={demoLabel} />;

  return (
    <article className={cn("group relative flex flex-col", className)}>
      {project.mobileFirst ? (
        // Phone-first sites: the phone screen on a calm surface instead of a narrow desktop column.
        <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-white/10 bg-[linear-gradient(160deg,#1d2326,#121517)] transition-colors duration-500 group-hover:border-white/20">
          <div className="absolute left-1/2 top-[9%] w-[32%] -translate-x-1/2 overflow-hidden rounded-[20px] border-[5px] border-[#2b3033] bg-[#2b3033] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5">
            <div className="relative aspect-[390/844] overflow-hidden rounded-[15px] bg-white">
              <Image src={project.screenshots.mobile} alt="" fill sizes="(min-width: 1024px) 18vw, 32vw" priority={priority} className="object-cover object-top" />
            </div>
          </div>
          <div className="absolute left-3 top-3">{badge}</div>
        </div>
      ) : (
        <BrowserFrame host={project.demoHost} className="transition-[border-color] duration-500 group-hover:border-white/20">
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
          <div className="absolute left-3 top-3">{badge}</div>
        </BrowserFrame>
      )}

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
          {!project.own && project.author && (
            <p className="mt-2 text-[0.82rem] text-subtle">
              {authorLabel}: {project.author} · {project.license}
            </p>
          )}
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
