import { isWhatsappNumber, type Locale } from "@/config/site";

export function whatsappUrl(number: string, message?: string) {
  if (!isWhatsappNumber(number)) throw new Error("Invalid WhatsApp number");
  // Only the text is encoded; the number is used as is.
  return message
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${number}`;
}

export type BriefInput = {
  /** Selected project type label; optional — the brief never blocks contact. */
  projectType?: string;
  /** Name of a portfolio example the visitor liked. */
  project?: string;
  task: string;
  budget?: string;
};

export function buildBriefMessage(locale: Locale, input: BriefInput) {
  const ru = locale === "ru";
  const lines = [ru ? "Здравствуйте, MicroStudio!" : "Hello MicroStudio,"];
  if (input.projectType) {
    lines.push(
      ru ? `Хочу обсудить проект: ${input.projectType}.` : `I'd like to discuss a project: ${input.projectType}.`,
    );
  } else {
    lines.push(ru ? "Хочу обсудить сайт для своего бизнеса." : "I'd like to discuss a website for my business.");
  }
  if (input.project) {
    lines.push(
      ru ? `Понравился пример «${input.project}» на вашем сайте.` : `I liked the “${input.project}” example on your site.`,
    );
  }
  const task = input.task.trim();
  if (task) lines.push(ru ? `Задача: ${task}` : `What I need: ${task}`);
  if (input.budget) lines.push(ru ? `Ориентир по бюджету: ${input.budget}.` : `Approximate budget: ${input.budget}.`);
  lines.push(ru ? "Подскажите, с чего начнём?" : "What would be the next step?");
  return lines.join("\n");
}
