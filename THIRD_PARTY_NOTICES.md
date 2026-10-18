# Third-party notices

The MicroStudio website does **not** include or redistribute the source code
of the demo projects below. It shows screenshots of their public live demos
as illustrations, links to the original repositories and credits the authors.
None of these projects was made by or for a MicroStudio client.

Screenshots were captured by `scripts/capture-portfolio.ts` from the live
demos; capture time, URL and SHA-256 of every file are recorded in
`src/data/capture-manifest.json`. Licences were checked via the GitHub API on
2026-10-19.

| Project | Repository | Live demo | Licence | Copyright notice (from LICENSE) |
| --- | --- | --- | --- | --- |
| Storefront — fashion e-commerce | https://github.com/MarcosCamara01/ecommerce-template | https://ecommerce-template-mpc.vercel.app/ | MIT | Copyright (c) 2024 Marcos Penelas Cámara |
| Table & Fork — restaurant | https://github.com/haider484991/tablefork-nextjs-restaurant-template | https://pixelandoak-tablefork.pages.dev/ | MIT | Copyright (c) 2026 Pixel & Oak |
| Lumen — photographer | https://github.com/haider484991/lumen-nextjs-photography-template | https://pixelandoak-lumen.pages.dev/ | MIT | Copyright (c) 2026 Pixel & Oak |
| LaunchPad — SaaS | https://github.com/haider484991/launchpad-nextjs-saas-template | https://pixelandoak-launchpad.pages.dev/ | MIT | Copyright (c) 2026 Pixel & Oak |
| Pulse — analytics dashboard | https://github.com/haider484991/pulse-nextjs-dashboard-template | https://pixelandoak-pulse.pages.dev/ | MIT | Copyright (c) 2026 Pixel & Oak |
| Ignite — startup | https://github.com/haider484991/ignite-nextjs-startup-template | https://pixelandoak-ignite.pages.dev/ | MIT | Copyright (c) 2026 Pixel & Oak |
| Nova — blog | https://github.com/haider484991/nova-nextjs-blog-template | https://pixelandoak-nova.pages.dev/ | MIT | Copyright (c) 2026 Pixel & Oak |

**Note on images inside the demos.** The MIT licence covers the code. Photos,
product images and brand names visible in the screenshots belong to their
respective owners and are shown only as part of the referenced demo, with
attribution and a link to the source. If an author asks for a screenshot to
be removed, delete the entry from `src/data/portfolio.json` and its files in
`public/portfolio/`, or replace it with another verified demo.

## Fonts

- **Manrope** — SIL Open Font License 1.1 (Google Fonts, served via `next/font`).
- **Inter** — SIL Open Font License 1.1 (Google Fonts, served via `next/font`).

## Icons and marks

- **Lucide** icons (`lucide-react`) — ISC License.
- **WhatsApp and Instagram glyphs** — from Simple Icons v13.21.0, CC0 1.0
  (`src/components/ui/brand-paths.ts`). Trademarks belong to Meta Platforms;
  they are used only to label the corresponding contact links.
- **MicroStudio mark** — the logo already used on the previous MicroStudio
  site (introduced with the original site template in the repository's first
  commit). Replace `src/components/ui/logo.tsx` and `src/app/icon.svg` when an
  official logo file is available.

## Software

Next.js, React (MIT), Tailwind CSS (MIT), Zod (MIT), @next/mdx (MIT),
Playwright (Apache-2.0), Vitest (MIT), sharp (Apache-2.0), axe-core (MPL-2.0,
test-only). See `pnpm-lock.yaml` for the full dependency list.
