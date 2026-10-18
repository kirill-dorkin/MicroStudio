# 05. DEFINITION OF DONE / REPORT TEMPLATE

An item is NOT done if only the code exists, if the screenshot is a placeholder, or if the link is nonfunctional.

## Release gates
- [ ] All main pages exist in RU+EN, complete copy, no Lorem ipsum.
- [ ] Exactly 7+ open-source demos render as unique real screenshots from source or own licensed runnable demo adaptation; index + details; attribution labels.
- [ ] Full services/FAQ/blog, 3+ blog posts, pricing offer separate and honest.
- [ ] Main CTA and brief reach a real available contact channel even when WhatsApp is missing (Instagram URL provided). No disabled pseudo-CTA.
- [ ] All contact details/claims verified, no fabricated team/clients/reviews/statistics.
- [ ] All 50 QA scenarios documented with pass/fail and links to screenshots.
- [ ] All required viewport screenshots captured, no overflow.
- [ ] Build, typecheck, lint, e2e run, errors fixed.
- [ ] Sitemap, metadata, RU/EN alternate links, robots preview handling and OG images tested.
- [ ] All external assets checked for licensing, repo credits preserved; THIRD_PARTY_NOTICES.md generated.
- [ ] README explains how to edit projects, services, blogs, logo, contacts, locale and website URL.
- [ ] Vercel preview available when hosting access permits; no destructive deploy to main without review.

## Mandatory final report
**Build:** commit/branch and link; whether existing repo was accessible; build commands and outcomes.
**Pages:** route list and screenshots.
**Portfolio:** seven rows with source/demo/license/screenshot source, flag if any demo was replaced.
**QA:** test counts, mobile viewport screenshots, fixes and remaining defects.
**Unknown config (if any):** real domain / verified WhatsApp / real business email / legal entity fields, state that these are not invented and that working Instagram fallback is active.
**Status:** DONE only if every release gate passed; otherwise PARTIAL, exact blocker, evidence and next action.
