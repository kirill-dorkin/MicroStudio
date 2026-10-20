# 02. IMPLEMENTATION / INFRASTRUCTURE / QUALITY

## 1. Базовый стек и структура
Next.js App Router + TypeScript `strict` + TailwindCSS + next/font + MDX content + Zod schema for content/config + Playwright. Использовать существующий lockfile и package manager repo, иначе pnpm. Сначала изучить пакет/ветки; не делать принудительную переустановку без необходимости. Server Components по умолчанию, client boundary только для интерактива. Нет БД/авторизации/админки на первом релизе: контент в repo, данные меняются через файлы. Не добавлять ненужных платных интеграций, CMS и отдельный API.

Пример структуры: `src/app/[locale]/(site)/page.tsx`, `.../work/[slug]/page.tsx`, `.../blog/[slug]/page.tsx`, `src/components/{layout,sections,ui,forms,portfolio}`, `src/content/{locales,services,blog}`, `src/data/{portfolio,faq}`, `src/lib/{site-config,locale,metadata,contact,analytics,schemas}`, `public/portfolio/*.webp`, `tests/e2e`.

## 2. Конфигурация без fake defaults
`src/config/site.ts`:
```
export const site = {
  name: 'MicroStudio',
  instagram: 'https://www.instagram.com/microstudio_official/',
  whatsappE164: process.env.NEXT_PUBLIC_WHATSAPP_E164 || null,
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || null,
  canonicalSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
  localeDefault: 'ru', supportedLocales: ['ru', 'en'] as const,
};
```
Проверять WhatsApp-номер как строку цифр международного формата (без `+` и пробелов): регулярное выражение `^[1-9][0-9]{7,14}$`. В ссылке `https://wa.me/{digits}?text={encodeURIComponent(message)}` кодировать только текст, номер не кодировать. Никогда не показывать placeholder-номер, fake email или несуществующий адрес. Если WhatsApp нет — использовать Instagram во всех CTA, причём видимый текст совпадает с действием. Если соцсеть недоступна, показать пользователю скопированный текст и видимую ссылку для самостоятельного открытия.

## 3. Подготовка скриншотов для портфолио — blocking gate
Скрипт `scripts/capture-portfolio.ts`, читает `data/portfolio.seed.json`, снимает реальные скриншоты browser page на `demo + captureRoute`, desktop viewport 1440x900 (желательно DPR 2) и mobile 390x844, ждёт fonts-ready, отключает animations for capture, scroll top, сохраняет `public/portfolio/{slug}.webp` и `{slug}-mobile.webp`; OG thumbnails `1200x630` создаются из этих же снимков с аккуратным кадрированием. Сохранить `capture-manifest.json` (источник, URL, capturedAt, status, SHA/checksum). Возможны cookie banners/технические ошибки — не вырезать/подделывать данные. Не скриншотить чужую персональную информацию.

Если живое демо не грузится, запустить OSS репозиторий локально с safe .env; не подключать платные API, платежи, личные ключи. Если проект требует приватных зависимостей, не обходить: снять скриншот официального README screenshot с проверенным правом использования или заменить запись на другой проверенный MIT demo, сохранив общее число **не менее семи**. НЕ генерировать пустую карточку и не делать 404. Если юридический режим изображения неясен, лучше рендерить собственную демонстрационную адаптацию с открытым исходным кодом и только своими/лицензированными ассетами — честно указать происхождение и изменение.

Не инлайнить 7 iframe на главной (тяжело и нестабильно). Хранить локальные скриншоты, при нажатии link на живое демо. Скриншоты как иллюстрации содержания источника, подпись источника и attribution. Проверь лицензии кода и отдельных изображений/шрифтов/брендов перед использованием и зафиксируй источник каждого; MIT-код не означает автоматически CC0 фотографий или лого. Не переносить чужие логотипы как часть фирстиля MicroStudio.

## 4. Контент / локализация / SEO
Для каждого route уникальные title (~45-65 characters), description (140-165 где уместно), canonical production URL, `alternates.languages` RU/EN + x-default, OpenGraph image 1200×630 с собственным текстом MicroStudio, Twitter cards. Не hardcode несуществующий домен. Производственный URL берётся из `NEXT_PUBLIC_SITE_URL`, preview URL корректно обрабатывается; robots noindex for PR preview. На production без настоящего домена canonical может быть Vercel production домен — запиши в отчёт как временное решение. `sitemap.xml` включает все индексируемые маршруты и статьи, 404 noindex. JSON-LD Organization + WebSite + Service + BreadcrumbList + BlogPosting; не добавлять LocalBusiness с несуществующим адресом. FAQPage только где FAQ реально виден и соответствует поисковым требованиям; не обещать расширенных сниппетов.

Русский — смысловой оригинал, английский — естественный, не машинно-буквальный. Переводятся кнопки, меню, aria-label, метаданные, FAQ, услуги, страницы проектов, блог, ошибки и privacy. Date/number via Intl, правильный canonical/hreflang, /en не содержит русских CTA (кроме неизбежных названий брендов). Никакого пустого раздела, «lorem ipsum», «coming soon».

## 5. Аналитика
Встроить провайдер аналитики через необязательную конфигурацию, без выдуманного ID. До появления измерительного ID сайт работает без ошибок. События: `view_service`, `view_project`, `filter_portfolio`, `cta_contact`, `contact_method`, `copy_brief`, `open_demo`, `open_github`, `special_offer_view`, `special_offer_cta`. Не называть CTA клик «lead submitted». Без включённой аналитики никаких console errors. Meta Pixel только после реального ID и применимого согласия, не собирать PII в названиях событий/URL. При подключении сторонних сервисов описать cookie/consent policy.

## 6. Контакты / data protection
Не хранить заполненный бриф на сервере без отдельной цели и правового оформления. На начальном релизе только client-side сбор текста, copy и переход в мессенджер. Согласие с формулировкой «Вы самостоятельно отправляете сообщение через выбранный сервис». Privacy page — честно описать поведение, не копировать юридическую политику чужой компании. До запуска реальных tracking/email/API уточнить оператора данных и корректность текста; если это блокирует полноценное юридическое заявление, оставить честное информационное описание действий сайта и отметить необходимость проверки, но не пустой lorem ipsum.

## 7. Performance / accessibility / SEO acceptance
Оптимизация next/image, фиксированные aspect ratio для всех превью и OG, lazy-load below fold, fonts swap, no layout shifts. Performance budget: на типичных страницах mobile Lighthouse Performance >=85, Accessibility >=95, SEO >=95 как ориентир (отклонения фиксировать), LCP <2.5s on typical 4G simulation, CLS <0.1, INP <200ms при репрезентативном тесте. Не гнаться за метрикой ценой пустой страницы. `prefers-reduced-motion`, visible focus, dialog focus trap, aria labels, semantic headings, contrast >=4.5:1 для обычного текста.

## 8. Функциональное QA, минимум 30 сценариев
1. Home RU loads desktop; 2. Home EN loads; 3. `/` goes to RU; 4. language switch preserves equivalent route; 5. header anchor navigation; 6. mobile nav opens at 390; 7. mobile nav closes Esc; 8. mobile nav focus restore; 9. home selected 4 works visible; 10. all 7 works visible; 11–16. filters category function + URL + reset; 17. all cards go details; 18. all seven details load; 19. project demo link opens; 20. source links correct; 21. code license credit present; 22. `/special` price 1 500; 23. special exclusions; 24. all four services detail; 25. blog list 3+; 26. each article loads; 27. contact copy returns success only on actual copy; 28. Instagram contact link correct; 29. WhatsApp hidden if config empty; 30. WhatsApp enabled uses encoded message when real number provided; 31. 404; 32. sitemap; 33. robots preview noindex; 34. meta canonical/hreflang; 35. dark-mode contrast; 36. reduced-motion; 37. image load verified; 38. no horizontal overflow 360–1440; 39. no broken links/buttons; 40. all CTA visible with locale; 41. no hydration warnings; 42. no console errors; 43. no fabricated testimonial or metrics; 44. screenshot similarity and text overlap across pages; 45. privacy accurate; 46. keyboard form; 47. social link; 48. contact brief mobile copy; 49. no missing translations; 50. main CLS and LCP captured.

## 9. Visual regression matrix
Viewport 360×780, 390×844, 430×932, 768×1024, 1024×768, 1440×900. Each: Home above fold, Home selected work, Work gallery, Work detail, service detail, special, contact, menu open mobile, blog article. Store screenshots `artifacts/screenshots/` and make contact sheet. Test manual both dark-on-light featured site covers and long RU strings. Screenshot should not be only blank layout. Also inspect clickable arrows/cards for clipping.

## 10. Security and build
`pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm test:e2e`, `pnpm build`; runnable commands in package.json and README. `npm audit` report warning not blindly update all deps. Add sensible security headers (CSP compatible with Next); target blank secure; Zod validate content; no production secret in `NEXT_PUBLIC_*` except inherently public options. `.env.example` without secrets. No unnecessary auth or database.

## 11. Deployment
Vercel preview, production only after verification. Keep original project untouched until review; work in feature branch `feat/microstudio-company-site`. Ensure Vercel rootDir/build configured and no accidental old rewrites. Report env vars, migration notes (if any), and smoke tests on preview. No permission to delete or overwrite private project data.
