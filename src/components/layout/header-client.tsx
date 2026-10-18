"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import type { Locale } from "@/config/site";
import { translatePath } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { buttonClass } from "@/components/ui/button";

type NavItem = { href: string; label: string };

type Props = {
  locale: Locale;
  homeHref: string;
  items: NavItem[];
  cta: NavItem;
  labels: {
    main: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    switchTo: string;
    homeLabel: string;
  };
  footerNote: string;
};

export function HeaderClient({ locale, homeHref, items, cta, labels, footerNote }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButton.current?.focus());
  }, []);

  // Close the drawer after navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        drawer.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Close the drawer if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const otherLocale: Locale = locale === "ru" ? "en" : "ru";
  const switchHref = translatePath(pathname, otherLocale);

  const languageSwitch = (className?: string) => (
    <Link
      href={switchHref}
      hrefLang={otherLocale}
      lang={otherLocale}
      aria-label={`${otherLocale.toUpperCase()} — ${labels.switchTo}`}
      className={cn(
        "inline-flex h-10 min-w-11 items-center justify-center rounded-full border border-line px-3 text-[0.8rem] font-semibold uppercase tracking-wider text-muted transition-colors hover:border-line-strong hover:text-text",
        className,
      )}
    >
      {otherLocale}
    </Link>
  );

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line/80 bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-6 transition-[height] duration-300",
          scrolled || open ? "h-[58px] lg:h-16" : "h-[62px] lg:h-[74px]",
        )}
      >
        <Link href={homeHref} aria-label={labels.homeLabel} className="-m-1 rounded-lg p-1">
          <Logo />
        </Link>

        <nav aria-label={labels.main} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex h-10 items-center rounded-full px-4 text-[0.92rem] font-medium transition-colors",
                    isActive(item.href) ? "text-text" : "text-muted hover:text-text",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && <span className="ml-2 size-1.5 rounded-full bg-lime" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div role="group" aria-label={labels.language}>
            {languageSwitch()}
          </div>
          <span className="hidden lg:block">
            <Link
              href={cta.href}
              onClick={() => track("cta_contact", { location: "header" })}
              className={buttonClass("primary", "min-h-10 px-5 text-[0.88rem]")}
            >
              {cta.label}
            </Link>
          </span>
          <button
            ref={menuButton}
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-line text-text lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>

      {/* Outside <header>: its backdrop-filter would trap a fixed child. */}
      {open && (
        <div
          id="mobile-menu"
          ref={drawer}
          role="dialog"
          aria-modal="true"
          aria-label={labels.main}
          className="animate-fade-up fixed inset-x-0 bottom-0 top-[58px] z-40 overflow-y-auto border-t border-line bg-bg px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 lg:hidden"
        >
          <nav aria-label={labels.main}>
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => close(false)}
                    className="flex min-h-16 items-center justify-between font-display text-[1.75rem] font-bold tracking-[-0.02em]"
                  >
                    {item.label}
                    <ArrowRight aria-hidden="true" className="size-5 text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={cta.href}
              onClick={() => {
                track("cta_contact", { location: "mobile_menu" });
                close(false);
              }}
              className={buttonClass("primary", "w-full")}
            >
              {cta.label}
            </Link>
            <div className="flex items-center justify-between gap-4 pt-4">
              <p className="text-sm text-subtle">{footerNote}</p>
              {languageSwitch("shrink-0")}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
