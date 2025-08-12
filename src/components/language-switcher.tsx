"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  className?: string;
  align?: "left" | "right";
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "es", label: "Español" },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  align = "right",
}) => {
  const [open, setOpen] = React.useState(false);
  const { i18n } = useTranslation();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const selectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{i18n.language.slice(0, 2).toUpperCase()}</span>
      </Button>
      {open && (
        <div
          className={cn(
            "bg-background absolute top-full z-10 mt-1 rounded-2xl border p-3 shadow-2xl shadow-zinc-300/20 w-40 sm:w-32",
            align === "left" ? "left-0" : "right-0"
          )}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className="block w-full rounded-md px-2 py-2 text-left text-base hover:bg-accent hover:text-accent-foreground sm:py-1 sm:text-sm cursor-pointer"
              onClick={() => selectLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
