import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold leading-tight transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-out-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const variants: Record<ButtonVariant, string> = {
  // Main action: the only filled lime element in a block.
  primary: "bg-lime text-bg shadow-[0_8px_24px_-12px_rgba(199,246,108,0.55)] hover:bg-[#d4fa86] active:bg-lime-dim",
  // Secondary: outlined, never competes with the primary.
  secondary: "border border-line-strong bg-white/[0.02] text-text hover:border-white/35 hover:bg-white/[0.06]",
  // Quiet: filled neutral surface for tertiary actions inside cards.
  quiet: "bg-white/[0.06] text-text hover:bg-white/[0.11]",
  ghost: "text-text underline-offset-4 hover:text-lime hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-[0.875rem]",
  md: "min-h-12 px-5 text-[0.95rem]",
  lg: "min-h-14 px-7 text-[1rem]",
};

export function buttonClass(variant: ButtonVariant = "primary", className?: string, size: ButtonSize = "md") {
  return cn(base, variants[variant], variant === "ghost" ? "min-h-11 px-0" : sizes[size], className);
}

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", size, className }: LinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, className, size)}>
      {children}
    </Link>
  );
}
