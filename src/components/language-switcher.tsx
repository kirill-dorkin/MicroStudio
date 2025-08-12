"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  align?: "left" | "right";
}

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "RU", label: "Русский" },
  { code: "ES", label: "Español" },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  align = "right",
}) => {
  const [open, setOpen] = React.useState(false);
  const [language, setLanguage] = React.useState("EN");
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
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        <span>{language}</span>
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
              className="block w-full rounded-md px-2 py-2 text-left text-base hover:bg-accent hover:text-accent-foreground sm:py-1 sm:text-sm"
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
