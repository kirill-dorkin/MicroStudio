import { describe, expect, it } from "vitest";
import { briefHref, intentMessage, intentParams, intentWhatsapp } from "@/lib/intent";

const text = (url: string | null) => new URL(url!).searchParams.get("text");

describe("contact intents", () => {
  it("special offer message names the offer and price in both languages", () => {
    expect(intentMessage("ru", { kind: "special" })).toBe(
      "Здравствуйте! Интересует одностраничный сайт за 1 500 сом. Хочу обсудить сайт для своего бизнеса.",
    );
    expect(intentMessage("en", { kind: "special" })).toContain("1,500 KGS");
  });

  it("project message names the example", () => {
    expect(intentMessage("ru", { kind: "project", slug: "ochok-restaurant" })).toBe("Здравствуйте! Интересует решение, похожее на «Очок — ресторан у огня».");
    expect(intentMessage("en", { kind: "project", slug: "ochok-restaurant" })).toContain("“Ochok — fire-led tasting counter”");
  });

  it("service and format messages name the choice", () => {
    expect(intentMessage("ru", { kind: "service", slug: "marketing" })).toBe("Здравствуйте! Хочу обсудить услугу «Запуск и продвижение».");
    expect(intentMessage("ru", { kind: "generic" })).toBe("Здравствуйте! Хочу обсудить проект для моего бизнеса.");
    expect(intentMessage("ru", { kind: "format", id: "store" })).toContain("интернет-магазин или каталог");
  });

  it("builds an encoded wa.me link with the configured number", () => {
    const url = intentWhatsapp("ru", { kind: "special" });
    expect(url).toMatch(/^https:\/\/wa\.me\/996700779919\?text=/);
    expect(text(url)).toContain("1 500");
  });

  it("brief links keep the context", () => {
    expect(briefHref("ru", { kind: "special" })).toBe("/ru/contact?service=special#brief");
    expect(briefHref("en", { kind: "service", slug: "websites" })).toBe("/en/contact?service=company#brief");
    expect(briefHref("ru", { kind: "project", slug: "marby-realty" })).toBe("/ru/contact?project=marby-realty#brief");
  });

  it("analytics params contain ids only", () => {
    expect(intentParams({ kind: "project", slug: "marby-realty" })).toEqual({ intent: "project", project: "marby-realty" });
  });
});
