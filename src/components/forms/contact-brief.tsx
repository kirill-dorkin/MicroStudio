"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/content/locales";
import { buildBriefMessage, whatsappUrl } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";

type Channel = "whatsapp" | "instagram";
type Status =
  | { kind: "idle" }
  | { kind: "copied"; plain?: boolean }
  | { kind: "copy-failed" }
  | { kind: "whatsapp" };

type Props = {
  locale: Locale;
  t: Dictionary["contact"];
  newTabLabel: string;
  instagramUrl: string;
  whatsapp: string | null;
  initialType?: string;
};

async function copyText(text: string) {
  try {
    if (!navigator.clipboard || !window.isSecureContext) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

const pill =
  "inline-flex min-h-12 cursor-pointer items-center rounded-xl border px-4 py-2.5 text-[0.95rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime";

export function ContactBrief({ locale, t, newTabLabel, instagramUrl, whatsapp, initialType }: Props) {
  const id = useId();
  const types = initialType && !t.types.includes(initialType) ? [initialType, ...t.types] : t.types;
  const [type, setType] = useState(initialType ?? "");
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");
  const [channel, setChannel] = useState<Channel>(whatsapp ? "whatsapp" : "instagram");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ type?: boolean; consent?: boolean }>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const typeGroup = useRef<HTMLFieldSetElement>(null);
  const consentBox = useRef<HTMLInputElement>(null);

  const message = type ? buildBriefMessage(locale, { projectType: type, task, budget: budget || undefined }) : "";
  const waLink = whatsapp && message ? whatsappUrl(whatsapp, message) : null;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = { type: !type, consent: !consent };
    setErrors(nextErrors);
    if (nextErrors.type) {
      typeGroup.current?.querySelector("input")?.focus();
      return;
    }
    if (nextErrors.consent) {
      consentBox.current?.focus();
      return;
    }

    track("contact_method", { method: channel, location: "brief" });
    if (channel === "whatsapp" && waLink) {
      setStatus({ kind: "whatsapp" });
      window.open(waLink, "_blank", "noopener,noreferrer");
      return;
    }
    // Copy first: opening a tab moves focus away and the clipboard call would fail.
    const copied = await copyText(message);
    track("copy_brief", { success: copied });
    setStatus(copied ? { kind: "copied" } : { kind: "copy-failed" });
    window.open(instagramUrl, "_blank", "noopener,noreferrer");
  };

  const onCopyOnly = async () => {
    if (!message) {
      setErrors((e) => ({ ...e, type: true }));
      typeGroup.current?.querySelector("input")?.focus();
      return;
    }
    const copied = await copyText(message);
    track("copy_brief", { success: copied });
    setStatus(copied ? { kind: "copied", plain: true } : { kind: "copy-failed" });
  };

  const showManualLink =
    status.kind === "whatsapp" || status.kind === "copy-failed" || (status.kind === "copied" && !status.plain);

  const channels: Channel[] = whatsapp ? ["whatsapp", "instagram"] : ["instagram"];

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
      <div className="space-y-10">
        <fieldset ref={typeGroup} aria-describedby={errors.type ? `${id}-type-error` : undefined}>
          <legend className="mb-4 font-display text-lg font-semibold">
            {t.typeLabel} <span className="text-lime" aria-hidden="true">*</span>
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {types.map((option) => (
              <label
                key={option}
                className={cn(pill, type === option ? "border-lime bg-lime/[0.08] text-text" : "border-line text-muted hover:border-line-strong hover:text-text")}
              >
                <input
                  type="radio"
                  name="type"
                  value={option}
                  checked={type === option}
                  required
                  onChange={() => {
                    setType(option);
                    setErrors((e) => ({ ...e, type: false }));
                    setStatus({ kind: "idle" });
                  }}
                  className="sr-only"
                />
                <span className={cn("mr-3 inline-flex size-4 shrink-0 items-center justify-center rounded-full border", type === option ? "border-lime bg-lime" : "border-line-strong")} aria-hidden="true">
                  {type === option && <span className="size-1.5 rounded-full bg-bg" />}
                </span>
                {option}
              </label>
            ))}
          </div>
          {errors.type && (
            <p id={`${id}-type-error`} className="mt-3 flex items-center gap-2 text-sm text-[#ffb4a8]" role="alert">
              <AlertCircle className="size-4" aria-hidden="true" />
              {t.typeRequired}
            </p>
          )}
        </fieldset>

        <div>
          <label htmlFor={`${id}-task`} className="mb-2 block font-display text-lg font-semibold">
            {t.taskLabel}
          </label>
          <p id={`${id}-task-hint`} className="mb-4 text-sm text-subtle">
            {t.taskHint}
          </p>
          <textarea
            id={`${id}-task`}
            value={task}
            maxLength={1000}
            rows={4}
            aria-describedby={`${id}-task-hint`}
            placeholder={t.taskPlaceholder}
            onChange={(e) => {
              setTask(e.target.value);
              setStatus({ kind: "idle" });
            }}
            className="block w-full resize-y rounded-xl border border-line bg-elevated px-4 py-3.5 text-base text-text placeholder:text-subtle focus:border-lime focus:outline-none focus-visible:outline-none"
          />
        </div>

        <fieldset>
          <legend className="mb-4 font-display text-lg font-semibold">{t.budgetLabel}</legend>
          <div className="flex flex-wrap gap-2.5">
            {["", ...t.budgets].map((option) => (
              <label
                key={option || "none"}
                className={cn(pill, "rounded-full", budget === option ? "border-lime bg-lime/[0.08] text-text" : "border-line text-muted hover:border-line-strong hover:text-text")}
              >
                <input
                  type="radio"
                  name="budget"
                  value={option}
                  checked={budget === option}
                  onChange={() => {
                    setBudget(option);
                    setStatus({ kind: "idle" });
                  }}
                  className="sr-only"
                />
                {option || t.budgetNone}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-4 font-display text-lg font-semibold">{t.channelLabel}</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {channels.map((c) => (
              <label
                key={c}
                className={cn(pill, "flex-col items-start gap-1 py-3.5", channel === c ? "border-lime bg-lime/[0.08] text-text" : "border-line text-muted hover:border-line-strong hover:text-text")}
              >
                <input
                  type="radio"
                  name="channel"
                  value={c}
                  checked={channel === c}
                  onChange={() => {
                    setChannel(c);
                    setStatus({ kind: "idle" });
                  }}
                  className="sr-only"
                />
                <span className="flex items-center gap-2.5 font-semibold text-text">
                  {c === "whatsapp" ? <WhatsappIcon className="size-4" /> : <InstagramIcon className="size-4" />}
                  {c === "whatsapp" ? t.whatsapp : t.instagram}
                </span>
                <span className="text-sm text-subtle">{t.channelHint[c]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[24px] border border-line bg-elevated p-6 md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-subtle" id={`${id}-preview-label`}>
            {t.previewTitle}
          </p>
          <output
            aria-labelledby={`${id}-preview-label`}
            aria-live="polite"
            className={cn(
              "mt-4 block min-h-40 whitespace-pre-wrap break-words rounded-xl border border-dashed p-4 text-[0.95rem] leading-relaxed",
              message ? "border-line-strong text-text" : "border-line text-subtle",
            )}
          >
            {message || t.previewEmpty}
          </output>

          <div className="mt-6">
            <label className="flex cursor-pointer gap-3 text-sm text-muted">
              <input
                ref={consentBox}
                type="checkbox"
                checked={consent}
                required
                aria-invalid={errors.consent || undefined}
                aria-describedby={`${id}-consent-text${errors.consent ? ` ${id}-consent-error` : ""}`}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((er) => ({ ...er, consent: false }));
                }}
                className="mt-0.5 size-5 shrink-0 accent-[#c7f66c]"
              />
              <span>
                <span className="font-semibold text-text">{t.consentLabel}</span>
                <span id={`${id}-consent-text`} className="mt-1 block">
                  {t.consent}
                </span>
              </span>
            </label>
            {errors.consent && (
              <p id={`${id}-consent-error`} className="mt-3 flex items-center gap-2 text-sm text-[#ffb4a8]" role="alert">
                <AlertCircle className="size-4" aria-hidden="true" />
                {t.consentRequired}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button type="submit" className={buttonClass("primary", "w-full py-3")}>
              {channel === "whatsapp" ? <WhatsappIcon className="size-4 shrink-0" /> : <InstagramIcon className="size-4 shrink-0" />}
              {channel === "whatsapp" ? t.whatsappCta : t.instagramCta}
            </button>
            <button type="button" onClick={onCopyOnly} className={buttonClass("secondary", "w-full")}>
              <Copy className="size-4" aria-hidden="true" />
              {t.copyOnly}
            </button>
          </div>

          <div aria-live="polite" className="mt-5 text-sm">
            {status.kind === "copied" && (
              <p className="flex gap-2 text-lime">
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {status.plain ? t.copiedPlain : t.copied}
              </p>
            )}
            {status.kind === "copy-failed" && (
              <p className="flex gap-2 text-[#ffb4a8]">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {t.copyFailed}
              </p>
            )}
            {status.kind === "whatsapp" && <p className="text-muted">{t.openedWhatsapp}</p>}
            {showManualLink && (
              <p className="mt-2 text-muted">
                {t.manualLink}{" "}
                <a
                  href={status.kind === "whatsapp" && waLink ? waLink : instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-lime underline underline-offset-4"
                >
                  {status.kind === "whatsapp" ? "wa.me" : instagramUrl.replace("https://www.", "")}
                  <span className="sr-only"> ({newTabLabel})</span>
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
