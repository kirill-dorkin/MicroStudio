import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import ru from "@/content/locales/ru";
import en from "@/content/locales/en";
import { getServices, serviceSlugs } from "@/content/services";
import { featuredProjects, getFaq, getPosts, localizeProject, ownProjects, projects, referenceProjects } from "@/lib/content";

const pub = (p: string) => path.join(process.cwd(), "public", p);

function keys(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) return [`${prefix}[${obj.length}]`, ...obj.flatMap((v, i) => keys(v, `${prefix}[${i}]`))];
  if (obj && typeof obj === "object")
    return Object.entries(obj).flatMap(([k, v]) => [`${prefix}.${k}`, ...keys(v, `${prefix}.${k}`)]);
  return [];
}

describe("portfolio", () => {
  it("leads with MicroStudio's own work", () => {
    expect(ownProjects.length).toBeGreaterThanOrEqual(6);
    expect(projects.slice(0, ownProjects.length).every((p) => p.kind !== "open-source-demo")).toBe(true);
    expect(featuredProjects.every((p) => p.kind !== "open-source-demo")).toBe(true);
    for (const p of ownProjects) {
      expect(p.demo).toMatch(/^https:\/\//);
      if (p.kind === "client-project") expect(p.permission).toBeTruthy();
    }
  });

  it("keeps all seven open-source references with credits", () => {
    expect(referenceProjects).toHaveLength(7);
    for (const p of referenceProjects) {
      expect(p.license).toBe("MIT");
      expect(p.source).toMatch(/^https:\/\/github\.com\//);
      expect(p.licenseUrl).toMatch(/LICENSE$/);
      expect(p.author?.length).toBeGreaterThan(2);
    }
  });

  it("ships real, distinct screenshots at least 900px wide", async () => {
    const hashes = new Set<string>();
    for (const p of projects) {
      const shots = localizeProject(p, "ru").screenshots;
      for (const file of [shots.desktop, shots.detail, shots.mobile, shots.og].filter((f): f is string => !!f)) {
        expect(existsSync(pub(file)), file).toBe(true);
      }
      const meta = await sharp(pub(shots.desktop)).metadata();
      expect(meta.width).toBeGreaterThanOrEqual(900);
      const stats = await sharp(pub(shots.desktop)).stats();
      // A flat placeholder would have near-zero deviation in every channel.
      expect(Math.max(...stats.channels.map((c) => c.stdev))).toBeGreaterThan(10);
      hashes.add(createHash("sha256").update(readFileSync(pub(shots.desktop))).digest("hex"));
    }
    expect(hashes.size).toBe(projects.length);
  });
});

describe("content completeness", () => {
  it("has matching RU/EN dictionaries", () => {
    expect(keys(en)).toEqual(keys(ru));
  });

  it("has no placeholder text", () => {
    const all = JSON.stringify([ru, en, getServices("ru"), getServices("en"), projects]);
    expect(all).not.toMatch(/lorem ipsum|coming soon|скоро здесь|TODO|placeholder number/i);
  });

  it("has four services per locale with 4–6 FAQ items", () => {
    for (const locale of ["ru", "en"] as const) {
      const services = getServices(locale);
      expect(services.map((s) => s.slug)).toEqual(serviceSlugs);
      for (const s of services) {
        expect(s.faq.length).toBeGreaterThanOrEqual(4);
        expect(s.faq.length).toBeLessThanOrEqual(6);
      }
    }
  });

  it("has 12 FAQ and 3+ articles in both locales", () => {
    expect(getFaq("ru")).toHaveLength(12);
    expect(getFaq("en")).toHaveLength(12);
    for (const locale of ["ru", "en"] as const) {
      const posts = getPosts(locale);
      expect(posts.length).toBeGreaterThanOrEqual(3);
      for (const p of posts) {
        expect(existsSync(path.join(process.cwd(), "src/content/blog", `${p.slug}.mdx`))).toBe(true);
      }
    }
  });

  it("does not contain banned marketing claims", () => {
    const all = JSON.stringify([ru, en, getServices("ru"), getServices("en")]);
    expect(all).not.toMatch(/лидер|100\+|за 24 час|гарантир(уем|ованн)[^.]*заяв|x3/i);
  });
});
