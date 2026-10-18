import { describe, expect, it } from "vitest";
import { buildBriefMessage, whatsappUrl } from "@/lib/contact";
import { formatPhone, isWhatsappNumber } from "@/config/site";
import { translatePath } from "@/lib/i18n";

describe("whatsapp", () => {
  it("validates E.164 digits", () => {
    expect(isWhatsappNumber("996700779919")).toBe(true);
    expect(isWhatsappNumber("+996700779919")).toBe(false);
    expect(isWhatsappNumber("0700")).toBe(false);
    expect(isWhatsappNumber("996 700 779 919")).toBe(false);
  });

  it("encodes only the message", () => {
    const url = whatsappUrl("996700779919", "Привет & hi\nновая строка");
    expect(url.startsWith("https://wa.me/996700779919?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1])).toBe("Привет & hi\nновая строка");
  });

  it("rejects invalid numbers", () => {
    expect(() => whatsappUrl("abc")).toThrow();
  });

  it("formats Kyrgyz numbers", () => {
    expect(formatPhone("996700779919")).toBe("+996 700 779 919");
  });
});

describe("brief message", () => {
  it("includes only provided fields", () => {
    const msg = buildBriefMessage("ru", { projectType: "Сайт компании", task: "  " });
    expect(msg).toContain("Сайт компании");
    expect(msg).not.toContain("Задача");
    expect(msg).not.toContain("бюджет");
  });

  it("builds an English message", () => {
    const msg = buildBriefMessage("en", { projectType: "Online store", task: "Shoes", budget: "not sure yet" });
    expect(msg).toMatch(/Online store/);
    expect(msg).toMatch(/What I need: Shoes/);
    expect(msg).toMatch(/Approximate budget: not sure yet/);
  });
});

describe("locale switch", () => {
  it("keeps the equivalent route", () => {
    expect(translatePath("/ru/work/photo-lumen", "en")).toBe("/en/work/photo-lumen");
    expect(translatePath("/en", "ru")).toBe("/ru");
    expect(translatePath("/ru/blog/kakoy-sayt-nuzhen-biznesu", "en")).toBe("/en/blog/which-website-for-your-business");
    expect(translatePath("/en/blog/getting-ready-for-a-website", "ru")).toBe("/ru/blog/kak-podgotovitsya-k-razrabotke");
  });
});
