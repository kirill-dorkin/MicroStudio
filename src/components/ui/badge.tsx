import { cn } from "@/lib/utils";

export function DemoBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-lime/35 bg-bg/80 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-lime backdrop-blur",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
      {label}
    </span>
  );
}
