"use client";

import { useEffect, useId, useState } from "react";
import { AlertCircle, Check, Copy, Loader2, X } from "lucide-react";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/content/locales";
import { buildBriefMessage, whatsappUrl } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";

type Channel = "whatsapp" | "instagram";
type Status = "idle" | "copying" | "copied" | "copied-plain" | "copy-failed" | "whatsapp";

type Props = {
  locale: Locale;
  t: Dictionary["contact"];
  newTabLabel: string;
  instagramUrl: string;
  whatsapp: string | null;
  initialType?: string;
  initialProject?: { slug: string; name: string } | null;
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

/** Keeps the selection in the URL so reloads and language switches preserve it. */
function syncUrl(type: string, project: string | null) {
  const url = new URL(window.location.href);
  if (type) url.searchParams.set("service", type);
  else url.searchParams.delete("service");
  if (project) url.searchParams.set("project", project);
  else url.searchParams.delete("project");
  window.history.replaceState(window.history.state, "", url);
}

const option =
  "relative flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-[0.95rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime";
const optionOn = "border-lime/70 bg-lime/[0.07] text-text";
const optionOff = "border-line text-muted hover:border-line-strong hover:text-text";

function Tick({ on }: { on: boolean }) {
  // Selected state is shown by shape (check mark), not only by colour.
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full border",
        on ? "border-lime bg-lime text-bg" : "border-line-strong",
      )}
    >
      {on && <Check className="size-3" strokeWidth={3} />}
    </span>
  );
}

export function ContactBrief({ locale, t, newTabLabel, instagramUrl, whatsapp, initialType = "", initialProject = null }: Props) {
  const id = useId();
  const [type, setType] = useState(initialType);
  const [project, setProject] = useState(initialProject);
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("");
  const [channel, setChannel] = useState<Channel>(whatsapp ? "whatsapp" : "instagram");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => syncUrl(type, project?.slug ?? null), [type, project]);

  const typeLabel = t.types.find((x) => x.id === type)?.label;
  const isSpecial = type === "special";
  const message = buildBriefMessage(locale, {
    projectType: typeLabel,
    project: project?.name,
    task,
    // The special offer has a fixed price, so the budget question is hidden.
    budget: isSpecial ? undefined : budget || undefined,
  });
  const waLink = whatsapp ? whatsappUrl(whatsapp, message) : null;
  const params = { location: "brief", ...(type ? { service: type } : {}), ...(project ? { project: project.slug } : {}) };

  const reset = () => setStatus("idle");

  const onInstagram = async () => {
    setStatus("copying");
    track("contact_method", { method: "instagram", ...params });
    // Copy first: opening a tab moves focus away and the clipboard call would fail.
    const copied = await copyText(message);
    track("copy_brief", { success: copied, ...params });
    setStatus(copied ? "copied" : "copy-failed");
    window.open(instagramUrl, "_blank", "noopener,noreferrer");
  };

  const onCopyOnly = async () => {
    setStatus("copying");
    const copied = await copyText(message);
    track("copy_brief", { success: copied, ...params });
    setStatus(copied ? "copied-plain" : "copy-failed");
  };

  const channels: Channel[] = whatsapp ? ["whatsapp", "instagram"] : ["instagram"];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
      <div className="space-y-8">
        <fieldset>
          <legend className="mb-3 font-semibold">{t.typeLabel}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {t.types.map((o) => (
              <label key={o.id} className={cn(option, type === o.id ? optionOn : optionOff)}>
                <input
                  type="radio"
                  name="type"
                  value={o.id}
                  checked={type === o.id}
                  onChange={() => {
                    setType(o.id);
                    track("select_service", { service: o.id, location: "brief" });
                    reset();
                  }}
                  className="sr-only"
                />
                <Tick on={type === o.id} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        {project && (
          <div>
            <p className="mb-3 font-semibold" id={`${id}-project`}>
              {t.projectLabel}
            </p>
            <div className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] pl-4 pr-1 text-[0.95rem]" aria-labelledby={`${id}-project`} role="group">
              {project.name}
              <button
                type="button"
                onClick={() => {
                  setProject(null);
                  reset();
                }}
                aria-label={`${t.removeProject}: ${project.name}`}
                className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:bg-white/[0.08] hover:text-text"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div>
          <label htmlFor={`${id}-task`} className="mb-1 block font-semibold">
            {t.taskLabel}
          </label>
          <p id={`${id}-task-hint`} className="mb-3 text-sm text-subtle">
            {t.taskHint}
          </p>
          <textarea
            id={`${id}-task`}
            value={task}
            maxLength={1000}
            rows={3}
            aria-describedby={`${id}-task-hint`}
            placeholder={t.taskPlaceholder}
            onChange={(e) => {
              setTask(e.target.value);
              reset();
            }}
            className="block w-full resize-y scroll-mb-40 rounded-xl border border-line bg-bg px-4 py-3 text-base text-text placeholder:text-subtle transition-colors focus:border-lime/70 focus:outline-none focus-visible:outline-none"
          />
        </div>

        {!isSpecial && (
          <fieldset>
            <legend className="mb-3 font-semibold">
              {t.budgetLabel} <span className="font-normal text-subtle">({t.budgetOptional})</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {["", ...t.budgets].map((b) => (
                <label key={b || "none"} className={cn(option, "min-h-11 rounded-full px-3.5 py-2 text-sm", budget === b ? optionOn : optionOff)}>
                  <input
                    type="radio"
                    name="budget"
                    value={b}
                    checked={budget === b}
                    onChange={() => {
                      setBudget(b);
                      reset();
                    }}
                    className="sr-only"
                  />
                  {budget === b && <Check className="size-3.5 text-lime" strokeWidth={3} aria-hidden="true" />}
                  {b || t.budgetNone}
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[20px] border border-line bg-bg p-5 md:p-6">
          <p className="label" id={`${id}-preview-label`}>
            {t.previewTitle}
          </p>
          <output
            aria-labelledby={`${id}-preview-label`}
            aria-live="polite"
            className="mt-3 block whitespace-pre-wrap break-words rounded-xl bg-white/[0.04] p-4 text-[0.95rem] leading-relaxed text-text"
          >
            {message}
          </output>

          {channels.length > 1 && (
            <fieldset className="mt-5">
              <legend className="mb-2 text-sm font-semibold">{t.channelLabel}</legend>
              <div className="grid grid-cols-2 gap-2">
                {channels.map((c) => (
                  <label key={c} className={cn(option, "min-h-11 justify-center px-3 text-sm", channel === c ? optionOn : optionOff)}>
                    <input
                      type="radio"
                      name="channel"
                      value={c}
                      checked={channel === c}
                      onChange={() => {
                        setChannel(c);
                        reset();
                      }}
                      className="sr-only"
                    />
                    {c === "whatsapp" ? <WhatsappIcon className="size-4" /> : <InstagramIcon className="size-4" />}
                    {c === "whatsapp" ? t.whatsapp : t.instagram}
                    {channel === c && <Check className="size-3.5 text-lime" strokeWidth={3} aria-hidden="true" />}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-5 flex flex-col gap-2.5">
            {channel === "whatsapp" && waLink ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("contact_method", { method: "whatsapp", ...params });
                  setStatus("whatsapp");
                }}
                className={buttonClass("primary", "w-full", "lg")}
              >
                <WhatsappIcon className="size-4 shrink-0" />
                {t.whatsappCta}
                <span className="sr-only"> ({newTabLabel})</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onInstagram}
                disabled={status === "copying"}
                aria-busy={status === "copying"}
                className={buttonClass("primary", "w-full", "lg")}
              >
                {status === "copying" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <InstagramIcon className="size-4 shrink-0" />
                )}
                {status === "copying" ? t.copying : t.instagramCta}
              </button>
            )}
            <p className="text-center text-sm text-subtle">
              {channel === "whatsapp" && waLink ? t.sendHintWhatsapp : t.sendHintInstagram}
            </p>
            <button
              type="button"
              onClick={onCopyOnly}
              disabled={status === "copying"}
              aria-busy={status === "copying"}
              className={buttonClass("quiet", "w-full", "sm")}
            >
              {status === "copying" ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              {status === "copying" ? t.copying : t.copyOnly}
            </button>
          </div>

          <div aria-live="polite" className="text-sm empty:hidden [&:not(:empty)]:mt-4">
            {(status === "copied" || status === "copied-plain") && (
              <p className="flex gap-2 rounded-xl bg-lime/[0.08] p-3 text-text">
                <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
                {status === "copied" ? t.copied : t.copiedPlain}
              </p>
            )}
            {status === "copy-failed" && (
              <p className="flex gap-2 rounded-xl bg-[#ffb4a8]/[0.08] p-3 text-[#ffc9c0]">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {t.copyFailed}
              </p>
            )}
            {status === "whatsapp" && (
              <p className="flex gap-2 rounded-xl bg-white/[0.05] p-3 text-muted">
                <WhatsappIcon className="mt-0.5 size-4 shrink-0 text-lime" />
                {t.openedWhatsapp}
              </p>
            )}
            {(status === "copied" || status === "copy-failed") && (
              <p className="mt-2 text-muted">
                {t.manualLink}{" "}
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="break-all text-lime underline underline-offset-4">
                  {instagramUrl.replace("https://www.", "")}
                  <span className="sr-only"> ({newTabLabel})</span>
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
