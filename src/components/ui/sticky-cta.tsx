"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "./icons";

type Props = {
  href: string;
  label: string;
  newTabLabel: string;
  location: string;
  params?: Record<string, string>;
  /** Ids of in-page CTAs; the bar hides while any of them (or the footer) is visible. */
  watch: string[];
};

/**
 * Compact contact bar for phones. Appears only after the main CTA has left
 * the screen and hides again near the final CTA and footer, so it never
 * duplicates a visible button or covers the end of the page.
 */
export function StickyCta({ href, label, newTabLabel, location, params, watch }: Props) {
  const [visible, setVisible] = useState(false);
  const watchKey = watch.join(",");

  useEffect(() => {
    const targets = [...watchKey.split(",").map((id) => document.getElementById(id)), document.querySelector("footer")].filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const inView = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) inView.set(e.target, e.isIntersecting);
      const anyVisible = [...inView.values()].some(Boolean);
      // Show once the page has been scrolled past the first CTA.
      setVisible(!anyVisible && window.scrollY > 200);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [watchKey]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 px-4 pt-3 backdrop-blur-xl transition-transform duration-300 md:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        onClick={() => track("contact_method", { method: "whatsapp", location, ...params })}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-5 text-[0.95rem] font-semibold text-bg active:bg-lime-dim"
      >
        <WhatsappIcon className="size-[1.1rem]" />
        {label}
        <span className="sr-only"> ({newTabLabel})</span>
      </a>
    </div>
  );
}
