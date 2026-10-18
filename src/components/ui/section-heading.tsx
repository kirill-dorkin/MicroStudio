import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  className,
  action,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  className?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)} data-reveal>
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <Tag id={id} className={Tag === "h1" ? "h1" : "h2"}>
          {title}
        </Tag>
        {lead && <p className="lead mt-5 max-w-2xl">{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
