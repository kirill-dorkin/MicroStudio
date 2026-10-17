"use client";
import Link from "next/link";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Logo } from "./logo";
import { NAV_LINKS } from "@/content/nav";

export const HeroHeader = () => {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const media = window.matchMedia("(min-width: 960px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header ref={header} className="studio-header">
      <div className="studio-nav shell">
        <Link
          href="/"
          className="studio-brand"
          aria-label="MicroStudio — главная"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span>
            micro<span>studio</span>
          </span>
        </Link>
        <nav
          id="studio-navigation"
          className={`studio-navigation ${open ? "is-open" : ""}`}
          aria-label="Основная навигация"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          <Link
            className="mobile-menu-cta"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Обсудим проект <ArrowUpRight size={18} />
          </Link>
        </nav>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label="Переключить светлую и тёмную тему"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Moon className="theme-moon" size={17} />
            <Sun className="theme-sun" size={17} />
          </button>
          <Link className="nav-cta" href="/#contact">
            Обсудим проект <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="studio-menu-toggle"
            aria-expanded={open}
            aria-controls="studio-navigation"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
    </header>
  );
};
