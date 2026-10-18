import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Neutral browser chrome around a website screenshot. */
export function BrowserFrame({
  host,
  children,
  className,
  compact = false,
}: {
  host?: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border border-white/10 bg-[#1b1e21] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3 border-b border-white/[0.06] px-3.5", compact ? "h-7" : "h-9")}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        {host && !compact && (
          <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.05] px-3 py-0.5 text-[0.7rem] text-subtle">
            {host}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Phone outline around a mobile screenshot. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[30px] border-[6px] border-[#25292c] bg-[#25292c] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[24px]">{children}</div>
    </div>
  );
}
