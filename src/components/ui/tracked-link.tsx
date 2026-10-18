"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = {
  href: string;
  event: AnalyticsEvent;
  params?: Record<string, string>;
  className?: string;
  children: ReactNode;
  /** External links open in a new tab; pass the localized "opens in new tab" label. */
  newTabLabel?: string;
  "aria-label"?: string;
};

export function TrackedLink({ href, event, params, className, children, newTabLabel, ...rest }: Props) {
  const onClick = () => track(event, params);
  if (newTabLabel) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick} {...rest}>
        {children}
        <span className="sr-only"> ({newTabLabel})</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
