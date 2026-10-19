# Checkpoint — портфолио 50 и полный цикл

Обновлено: 2026-10-19.

## Где что лежит
- Сайт студии: ветка `feat/portfolio-50-full-cycle` (база — `feat/real-work-repositioning`, PR #31).
- Демо: репозиторий `kirill-dorkin/microstudio-showcase` (приватный), `demos/<slug>` — код, `external/<slug>` — метаданные проектов владельца.
- Реестр: `microstudio-showcase/registry/projects.json` (внутренний), `registry/public.json` (для сайта).

## Готово: 12 из 50 опубликованы и проверены
Демо (ms-<slug>.vercel.app): svezho-cleaning, tash-stroy, oreh-len, arna-crm, toolor-jazz, kaichy-barber, garage-312, ak-tish-dental, volt-electronics, ritm-projects. Клиент: best-electronics-link. Собственный продукт: tikitaki.
Заблокированы: best-electronics-store, jarjar, nova-ielts, anna-art — причины в registry/projects.json.

## Цикл одного демо
```bash
cd ~/microstudio-showcase
node scripts/qa.mjs <slug>                 # локально: ошибки, переполнение, axe, сценарий
node scripts/deploy.mjs <slug>             # Vercel-проект ms-<slug>
node scripts/qa.mjs <slug> --live
node scripts/capture.mjs <slug> --live
node scripts/perf.mjs <slug>               # CHROME_PATH на Google Chrome
node scripts/export.mjs
cd ~/MicroStudio && pnpm sync:showcase && pnpm check && pnpm test:e2e
```

## Дальше
Партии по 5 демо по плану в PLAN.md, затем документация, финальная проверка, PR.
