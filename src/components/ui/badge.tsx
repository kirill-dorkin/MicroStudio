import { cn } from "@/lib/utils";

/** Calm, always-readable label for third-party open-source demos. */
export function DemoBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-bg/85 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-muted backdrop-blur",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-lime/80" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Marks MicroStudio's own work. */
export function WorkBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-lime px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-bg shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {label}
    </span>
  );
}
