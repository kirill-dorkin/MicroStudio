import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-2 text-center text-[0.95rem] font-semibold leading-tight transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-bg hover:bg-[#d6fb8c]",
  secondary: "border border-line-strong text-text hover:border-text/60 hover:bg-white/[0.04]",
  ghost: "px-0 text-text underline-offset-4 hover:text-lime",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: LinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/** External link that always opens in a new tab and says so to screen readers. */
export function ExternalLink({
  href,
  children,
  className,
  newTabLabel,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTabLabel: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
