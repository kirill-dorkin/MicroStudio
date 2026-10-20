# QA report — MicroStudio site

Date: 2026-10-19 · Branch: `feat/microstudio-company-site` · PR: https://github.com/kirill-dorkin/MicroStudio/pull/29

Preview: https://micro-studio-git-feat-microstudio-company-site-bhvgfs-projects.vercel.app
(protected by Vercel Authentication — open it while signed in to Vercel).

## Status: DONE, with the limitations listed at the end

## Automated checks

| Check | Command | Result |
| --- | --- | --- |
| TypeScript strict | `pnpm typecheck` | ✅ 0 errors |
| ESLint (next/core-web-vitals) | `pnpm lint` | ✅ 0 errors, 0 warnings |
| Unit tests (Vitest) | `pnpm test` | ✅ 19/19 |
| Production build | `pnpm build` | ✅ 51 pages generated |
| E2E (Playwright, Google Chrome) | `pnpm test:e2e` | ✅ 103 passed, 3 skipped by design (desktop-only / mobile-only cases) — run on desktop 1440×900 and mobile 390×844 |
| Accessibility (axe-core, WCAG 2.1 A/AA) | part of e2e | ✅ 0 violations on 13 pages × 2 viewports |
| External links | `pnpm check:links` | ✅ 23/23 (7 demos, 7 repos, 7 licences, Instagram, WhatsApp) |
| Visual matrix | `pnpm qa:screens` | ✅ 13 views × 6 viewports, no horizontal overflow |
| Preview smoke test | `vercel curl` | ✅ 15 routes: pages 200, unknown path 404, robots `Disallow: /`, `noindex`, OG + screenshots served |

### Lighthouse (mobile, simulated slow 4G, local production build)

| Page | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| /ru | 93 | 100 | 100 | 100 | 3.2 s | 0 | 50 ms |
| /ru/work | 94 | 100 | 100 | 100 | 2.9 s | 0 | 100 ms |
| /ru/work/fashion-store | 94 | 100 | 100 | 100 | 3.0 s | 0 | 110 ms |
| /ru/services/websites | 95 | 100 | 100 | 100 | 2.8 s | 0 | 120 ms |
| /ru/contact | 94 | 100 | 100 | 100 | 2.8 s | 0 | 150 ms |
| /en/blog/which-website-for-your-business | 95 | 100 | 100 | 100 | 2.8 s | 0 | 120 ms |

Deviation: LCP is 2.8–3.2 s under Lighthouse's slow-4G simulation against a
local server (target < 2.5 s). The LCP phase is render delay (CSS + font
loading), not image download. All other budgets are met.

## Scenario matrix (ТЗ §8)

| # | Scenario | How verified | Result |
| --- | --- | --- | --- |
| 1 | Home RU loads, CTA above the fold | e2e `navigation` #1 (390 & 1440) | ✅ |
| 2 | Home EN loads | e2e #2 | ✅ |
| 3 | `/` → `/ru` | e2e #3, preview curl | ✅ |
| 4 | Language switch keeps equivalent route (incl. blog slugs) | e2e #4, unit `translatePath` | ✅ |
| 5 | Header navigation | e2e #5 | ✅ |
| 6 | Mobile menu opens at 390 | e2e #6–8 | ✅ |
| 7 | Mobile menu closes with Esc | e2e #6–8 | ✅ |
| 8 | Focus restored to menu button, scroll unlocked | e2e #6–8 | ✅ |
| 9 | Home shows 4 selected demos with badges | e2e #9 | ✅ |
| 10 | Work page shows all 7 demos + disclaimer | e2e #10 | ✅ |
| 11–16 | Filters: each category, URL `?type=`, reload keeps it, “All” resets, no scroll jump | e2e #11–16, preview curl | ✅ |
| 17 | Every card opens its detail page | e2e #17 | ✅ |
| 18 | All 7 detail pages load with 3 real screenshots | e2e #18–21 ×7 | ✅ |
| 19 | Live demo link: new tab, `noopener noreferrer` | e2e #18–21, `check:links` | ✅ |
| 20 | Source links correct | e2e, `check:links` | ✅ |
| 21 | Licence credit present | e2e, unit | ✅ |
| 22 | `/special` shows 1 500 сом | e2e #22–23 | ✅ |
| 23 | Special exclusions listed; CTA preselects offer in brief | e2e #22–23 | ✅ |
| 24 | Four service detail pages (FAQ 4–6, examples) | e2e #24, unit | ✅ |
| 25 | Blog list has 3+ articles (RU and EN) | e2e #25–26 | ✅ |
| 26 | Each article loads | e2e #25–26 | ✅ |
| 27 | “Text copied” only after a real copy; failure shows manual fallback | e2e #27–28, #27b | ✅ |
| 28 | Instagram link correct | e2e #27–28, #47–48 | ✅ |
| 29 | WhatsApp hidden when config disables it / number invalid | unit `config` | ✅ |
| 30 | WhatsApp opens wa.me with encoded message | e2e #30, unit | ✅ |
| 31 | Localized 404 with status 404 | e2e #31, preview | ✅ |
| 32 | Sitemap (44 URLs with hreflang) | e2e #32 | ✅ |
| 33 | Preview/local robots `noindex` | e2e #33, preview curl | ✅ |
| 34 | Canonical, hreflang, x-default, OG image | e2e #34 | ✅ |
| 35 | Dark theme contrast ≥ 4.5:1 | axe (13 pages) | ✅ (3 issues found and fixed) |
| 36 | Reduced motion disables animations | e2e #36 | ✅ |
| 37 | All images load | e2e #37–38, #18–21 | ✅ |
| 38 | No horizontal overflow 360–1440 | e2e #37–38, `qa:screens` | ✅ |
| 39 | No broken internal links | e2e #39 (all internal links on 10 pages → 200) | ✅ |
| 40 | CTAs visible and localized | e2e #1, #2, #49 | ✅ |
| 41 | No hydration warnings | e2e #41–42 (10 pages) | ✅ |
| 42 | No console errors | e2e #41–42 | ✅ |
| 43 | No fabricated testimonials or metrics | e2e #43, unit banned-claims test | ✅ |
| 44 | Screenshots: no text overlap or clipping | manual review of `docs/qa/screenshots` | ✅ (fixed 4 issues, see below) |
| 45 | Privacy text matches behaviour | e2e #45, manual | ✅ |
| 46 | Brief fully usable from keyboard, errors focus first field | e2e #46 | ✅ |
| 47 | Social link | e2e #47–48 | ✅ |
| 48 | Contact brief on mobile | e2e (mobile project), screenshots | ✅ |
| 49 | No missing translations / Russian text on EN pages | e2e #49 (11 pages), unit dictionary key parity | ✅ |
| 50 | CLS and LCP captured | Lighthouse table above | ✅ CLS 0 · LCP see deviation |

Manual checks in the in-app browser (Chrome): RU home at 1440 and 375,
customer-journey demo (select service → message → demo send), contact page
preselection from `?service=design`.

## Visual regression matrix

`docs/qa/screenshots/` — first screen of home, home selected work, home EN,
work, work filtered, work detail, service, special, contact, blog article,
about, 404 and open mobile menu at 360×780, 390×844, 430×932, 768×1024,
1024×768, 1440×900, plus contact sheets (`sheet-*.jpg`) and full-page
captures for 390 and 1440 (`full-*.webp`). Full-page captures use
reduced motion so scroll-triggered reveals are shown in their final state.

## Defects found and fixed during QA

1. Header CTA and menu button overflowed at 360 px (conflicting display utilities) — fixed.
2. Hero column wider than the viewport on phones (grid min-content) — fixed globally with `min-width: 0` on grid items.
3. `/special` price card and contact action buttons overflowed at 390/1024 — fixed (wrapping buttons, fluid price size).
4. Price “1 500” broke across lines — non-breaking spaces in all prices.
5. Contrast: URL label in browser frames, decorative step numbers, channel hints — raised to AA.
6. Language switch accessible name did not contain its visible “EN/RU” label — fixed.
7. Hero fade-in delayed LCP — removed for the first screen.
8. “Learn more” link text flagged by Lighthouse SEO — replaced with descriptive text.
9. “Open-source demo” badge wrapped under the hero gallery on phones; oversized phone mock-up on mobile — fixed.
10. Nova demo description mentioned tags that are not on its home page — verified against the live demo (topic filter + RSS on the articles page) and reworded.

## Portfolio

| # | Project | Source | Live demo | Licence | Screenshot source |
| --- | --- | --- | --- | --- | --- |
| 1 | Storefront — fashion store | MarcosCamara01/ecommerce-template | ecommerce-template-mpc.vercel.app | MIT | live demo, captured 2026-10-19 |
| 2 | Table & Fork — restaurant | haider484991/tablefork-nextjs-restaurant-template | pixelandoak-tablefork.pages.dev | MIT | live demo, captured 2026-10-19 |
| 3 | Lumen — photographer | haider484991/lumen-nextjs-photography-template | pixelandoak-lumen.pages.dev | MIT | live demo, captured 2026-10-19 |
| 4 | LaunchPad — SaaS | haider484991/launchpad-nextjs-saas-template | pixelandoak-launchpad.pages.dev | MIT | live demo, captured 2026-10-19 |
| 5 | Pulse — dashboard | haider484991/pulse-nextjs-dashboard-template | pixelandoak-pulse.pages.dev | MIT | live demo, captured 2026-10-19 |
| 6 | Ignite — startup | haider484991/ignite-nextjs-startup-template | pixelandoak-ignite.pages.dev | MIT | live demo, captured 2026-10-19 |
| 7 | Nova — blog | haider484991/nova-nextjs-blog-template | pixelandoak-nova.pages.dev | MIT | live demo, captured 2026-10-19 |

No demo was replaced. Capture details and SHA-256: `src/data/capture-manifest.json`.

## Not provided / not invented

- **Domain:** not provided. Canonical URLs use the Vercel production domain
  `micro-studio.vercel.app` until `NEXT_PUBLIC_SITE_URL` is set.
- **WhatsApp / phone:** +996 700 779 919 — supplied by the owner earlier; active.
  Instagram `@microstudio_official` — active.
- **Business email, address, legal entity, founding year, team, clients:**
  not provided and not shown anywhere.
- **Analytics:** none enabled (no IDs provided); the privacy page states this.
- **Privacy page:** an honest description of how the site works, not a
  jurisdiction-specific legal review.
- **Logo:** the existing mark from the repository (originally from the site
  template) is kept with a text wordmark; replace when an official logo file
  exists.
