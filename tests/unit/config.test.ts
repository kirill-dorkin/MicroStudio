import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("site config", () => {
  it("29. hides WhatsApp when disabled in config", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_E164", "off");
    const { site } = await import("@/config/site");
    expect(site.whatsappE164).toBeNull();
  });

  it("ignores malformed numbers instead of rendering a broken link", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_E164", "0700-12");
    const { site } = await import("@/config/site");
    expect(site.whatsappE164).toBeNull();
  });

  it("accepts a configured E.164 number", async () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_E164", "+996555123456");
    const { site } = await import("@/config/site");
    expect(site.whatsappE164).toBe("996555123456");
  });

  it("never invents an email", async () => {
    vi.stubEnv("NEXT_PUBLIC_BUSINESS_EMAIL", "");
    const { site } = await import("@/config/site");
    expect(site.email).toBeNull();
  });
});
