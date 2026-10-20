"use client";
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LANGUAGES, LANGUAGE_LABELS } from "@/lib/i18n/config";
import { useLanguage } from "./language-provider";

interface LanguageSwitcherProps {
  className?: string;
  align?: "left" | "right";
}

const LanguageSwitcherComponent: React.FC<LanguageSwitcherProps> = ({
  className,
  align = "right",
}) => {
  const [open, setOpen] = React.useState(false);
  const { lang, t, setLanguage } = useLanguage();
  const ref = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t.header.language}: ${LANGUAGE_LABELS[lang]}`}
      >
        <span aria-hidden>{lang.toUpperCase()}</span>
      </Button>
      {open && (
        <ul
          id={menuId}
          aria-label={t.header.language}
          className={cn(
            "bg-background absolute top-full z-30 mt-1 w-40 rounded-2xl border p-2 shadow-2xl shadow-zinc-300/20 dark:shadow-none sm:w-36",
            align === "left" ? "left-0" : "right-0"
          )}
        >
          {LANGUAGES.map((code) => (
            <li key={code}>
              <button
                type="button"
                lang={code}
                aria-current={code === lang ? "true" : undefined}
                className="hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-left text-base outline-none sm:py-1.5 sm:text-sm"
                onClick={() => {
                  setLanguage(code);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                {LANGUAGE_LABELS[code]}
                {code === lang && <Check className="size-4" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const LanguageSwitcher = React.memo(LanguageSwitcherComponent);
LanguageSwitcher.displayName = "LanguageSwitcher";
