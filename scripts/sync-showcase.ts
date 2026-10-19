/**
 * Pulls the published projects from the showcase registry into the site:
 *   src/data/portfolio.json            public project data (validated at build)
 *   public/portfolio/<slug>/*.<hash>.webp  live screenshots of each deployment
 *                                      (content hash in the name, so a new
 *                                      screenshot never reuses a cached URL)
 *   public/og/work-<slug>.jpg          1200×630 share image cut from the cover
 *
 *   SHOWCASE_DIR=../microstudio-showcase pnpm sync:showcase
 *
 * The showcase repo must have run `capture.mjs --live` and `export.mjs` first,
 * so every image here is a real screenshot of the current deployment.
 */
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { projectSchema } from "../src/lib/schemas";

const root = process.cwd();
const showcase = path.resolve(root, process.env.SHOWCASE_DIR ?? "../microstudio-showcase");

type Shot = { name: string; file: string; width: number; height: number; viewport: "desktop" | "mobile"; alt: { ru: string; en: string } | null };
type PublicEntry = Record<string, unknown> & { slug: string; shots: Shot[]; cover: string; title: { ru: string; en: string } };

async function main() {
  const registry: PublicEntry[] = JSON.parse(await readFile(path.join(showcase, "registry/public.json"), "utf8"));
  const outDir = path.join(root, "public/portfolio");
  await rm(outDir, { recursive: true, force: true });
  await mkdir(path.join(root, "public/og"), { recursive: true });

  const projects = [];
  for (const entry of registry) {
    const { shots, cover, ...rest } = entry;
    const src = path.join(showcase, "qa-output/captures", entry.slug);
    const dest = path.join(outDir, entry.slug);
    await mkdir(dest, { recursive: true });
    const names = new Map<string, string>();
    for (const shot of shots) {
      if (!existsSync(path.join(src, shot.file))) throw new Error(`missing screenshot ${entry.slug}/${shot.file}`);
      const hash = createHash("sha1").update(await readFile(path.join(src, shot.file))).digest("hex").slice(0, 8);
      const name = shot.file.replace(/\.webp$/, `.${hash}.webp`);
      names.set(shot.file, name);
      await copyFile(path.join(src, shot.file), path.join(dest, name));
    }
    const image = (s: Shot) => ({ src: `/portfolio/${entry.slug}/${names.get(s.file)}`, width: s.width, height: s.height });
    // The cover can be a gallery shot (e.g. the CRM board instead of its login screen).
    const desktop = shots.find((s) => s.name === cover && s.viewport === "desktop") ?? shots.find((s) => s.name === "desktop")!;
    const mobile = shots.find((s) => s.name === "mobile")!;
    await sharp(path.join(src, desktop.file))
      .resize(1200, 630, { fit: "cover", position: "top" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(root, "public/og", `work-${entry.slug}.jpg`));
    projects.push(
      projectSchema.parse({
        ...rest,
        images: {
          desktop: image(desktop),
          mobile: image(mobile),
          gallery: shots
            .filter((s) => s !== desktop && s.name !== "mobile")
            .map((s) => ({ ...image(s), viewport: s.viewport, alt: s.alt ?? { ru: entry.title.ru, en: entry.title.en } })),
        },
      }),
    );
  }
  projects.sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999) || a.slug.localeCompare(b.slug));
  await writeFile(path.join(root, "src/data/portfolio.json"), JSON.stringify(projects, null, 2) + "\n");
  console.log(`synced ${projects.length} published projects from ${showcase}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
