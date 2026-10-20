# 03. REAL OPEN-SOURCE PORTFOLIO — VERIFIED CANDIDATES

These are **not MicroStudio client projects**. They are public open-source demonstrations sourced from real repositories. Public GitHub repository and license fields verified on 2026-10-19. Live demo text pages were checked where possible. Demo availability can change — Claude Code must recheck in execution and capture static screenshots locally.

| Category | Demo title | Repository | Live demo | License | Attribution |
| --- | --- | --- | --- | --- | --- |
| Ecommerce | Storefront — fashion e-commerce | https://github.com/MarcosCamara01/ecommerce-template | https://ecommerce-template-mpc.vercel.app/ | MIT | MarcosCamara01 |
| Business | Table & Fork — restaurant | https://github.com/haider484991/tablefork-nextjs-restaurant-template | https://pixelandoak-tablefork.pages.dev/ | MIT | Pixel & Oak |
| Portfolio | Lumen — photographer | https://github.com/haider484991/lumen-nextjs-photography-template | https://pixelandoak-lumen.pages.dev/ | MIT | Pixel & Oak |
| Landing | LaunchPad — SaaS | https://github.com/haider484991/launchpad-nextjs-saas-template | https://pixelandoak-launchpad.pages.dev/ | MIT | Pixel & Oak |
| App | Pulse — analytics dashboard | https://github.com/haider484991/pulse-nextjs-dashboard-template | https://pixelandoak-pulse.pages.dev/ | MIT | Pixel & Oak |
| Landing | Ignite — startup | https://github.com/haider484991/ignite-nextjs-startup-template | https://pixelandoak-ignite.pages.dev/ | MIT | Pixel & Oak |
| Content | Nova — blog | https://github.com/haider484991/nova-nextjs-blog-template | https://pixelandoak-nova.pages.dev/ | MIT | Pixel & Oak |

**Required disclosure** in work index AND each detail page: «Это демонстрационный проект на основе открытого исходного кода, не работа для клиента MicroStudio. Автор и исходный код указаны ниже».

**License duties:** MIT requires keeping original copyright/license notice when using/substantially incorporating code. Keep third-party notices under `THIRD_PARTY_NOTICES.md` and within cloned/adapted demo if shipped. Website screenshot and assets may have separate licenses: check each image and font. If only displaying preview thumbnail as referential illustration, label source and link attribution; do not claim authorship. If unsure about screenshot redistribution rights, build own demo adaptation under license with replaceable licensed visual assets.

**Live demo checks:** URLs were retrieved as pages by web research on 2026-10-19, but this is **not** a guarantee each user action works. Recheck navigation and accessibility before shipping. The ecommerce source may require backend to reproduce all actions; on MicroStudio website only describe verifiably visible functions and do not claim checkout/payments tested unless verified.

**Seed data:** `data/portfolio.seed.json` is the canonical source for slug, type, description, links, credit, image output path and captureRoute. No hand-coded duplicate project arrays in components. `kind='open-source-demo'` must render a visible tag. To replace with real MicroStudio work later, change kind to `'client-project'` only with evidence/permission, update source/credits and content.

**Capture quality gate:** Each project requires **a real screenshot** of the real demo (or own running licensed adaptation), not a generated dashboard/carousel graphic, random Unsplash photo, flat gradient or fake website. Use `scripts/capture-portfolio.ts` and test that all 7 `public/portfolio/{slug}.webp` load, are >= 900px wide and show distinct content. Capture mobile too. Preview links must remain clickable even if external demo later changes, with graceful external-site unavailable copy.
