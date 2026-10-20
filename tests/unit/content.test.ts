import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import ru from "@/content/locales/ru";
import en from "@/content/locales/en";
import { getServices, serviceSlugs } from "@/content/services";
import { featuredProjects, getFaq, getPosts, localizeProject, projects } from "@/lib/content";

const pub = (p: string) => path.join(process.cwd(), "public", p);

function keys(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) return [`${prefix}[${obj.length}]`, ...obj.flatMap((v, i) => keys(v, `${prefix}[${i}]`))];
  if (obj && typeof obj === "object")
    return Object.entries(obj).flatMap(([k, v]) => [`${prefix}.${k}`, ...keys(v, `${prefix}.${k}`)]);
  return [];
}

describe("portfolio", () => {
  it("contains only verified, labelled work with own deployments", () => {
    expect(projects.length).toBeGreaterThanOrEqual(5);
    const slugs = new Set(projects.map((p) => p.slug));
    expect(slugs.size).toBe(projects.length);
    for (const p of projects) {
      expect(p.demoUrl).toMatch(/^https:\/\//);
      if (p.workType === "client") expect(p.client?.permission).toBeTruthy();
      // New demos must run on MicroStudio's own deployments, never an upstream author's demo.
      if (p.hosting === "showcase") expect(new URL(p.demoUrl).host).toMatch(/^ms-[a-z0-9-]+\.vercel\.app$/);
      if (p.provenance.type === "derived") expect(p.provenance.upstream?.license).toBeTruthy();
    }
  });

  it("features ranked projects only, in editorial order", () => {
    const featured = featuredProjects(8);
    expect(featured.length).toBeGreaterThanOrEqual(4);
    const ranks = featured.map((p) => p.featuredRank!);
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
  });

  it("ships real, distinct screenshots for every project", async () => {
    const hashes = new Set<string>();
    for (const p of projects) {
      const img = localizeProject(p, "ru").images;
      for (const file of [img.desktop.src, img.mobile.src, ...img.gallery.map((g) => g.src), `/og/work-${p.slug}.jpg`]) {
        expect(existsSync(pub(file)), file).toBe(true);
      }
      const meta = await sharp(pub(img.desktop.src)).metadata();
      expect(meta.width).toBe(img.desktop.width);
      expect(meta.width).toBeGreaterThanOrEqual(900);
      const stats = await sharp(pub(img.desktop.src)).stats();
      // A flat placeholder would have near-zero deviation in every channel.
      expect(Math.max(...stats.channels.map((c) => c.stdev))).toBeGreaterThan(10);
      hashes.add(createHash("sha256").update(readFileSync(pub(img.desktop.src))).digest("hex"));
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

  it("has six full-cycle services per locale with 4–6 FAQ items", () => {
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
