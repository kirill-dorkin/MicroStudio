# MicroStudio

Официальный сайт студии MicroStudio: разработка сайтов, дизайн, реклама и
поддержка. Русский — основной язык, английский — второй.

Стек: Next.js 15 (App Router), React 19, TypeScript strict, Tailwind CSS 4,
MDX, Zod, Playwright, Vitest. Пакетный менеджер — pnpm.

## Запуск

```bash
pnpm install --frozen-lockfile
pnpm dev            # http://localhost:3000 → /ru
```

## Проверки

```bash
pnpm typecheck      # TypeScript
pnpm lint           # ESLint
pnpm test           # unit-тесты (Vitest): контент, лицензии, скриншоты, бриф
pnpm build          # production-сборка
pnpm test:e2e       # Playwright e2e + axe, запускает `pnpm start` сам (нужна сборка)
pnpm check:links    # внешние ссылки: демо, GitHub, лицензии, Instagram, WhatsApp
BASE_URL=http://localhost:3000 pnpm qa:screens --full   # матрица скриншотов → artifacts/screenshots
```

Playwright использует установленный Google Chrome (`channel: "chrome"`):
встроенный Chromium Playwright не поддерживает старые версии macOS.

## Маршруты

`/ru` и `/en`: главная, `/services` и 4 услуги (`websites`, `design`,
`advertising`, `support`), `/work` и 7 проектов, `/about`, `/blog` и статьи,
`/special`, `/contact`, `/privacy`, локализованная 404. `/` и пути без языка
перенаправляются на `/ru`. `sitemap.xml`, `robots.txt`, OG-картинки — для
всех страниц.

## Как редактировать

| Что | Где |
| --- | --- |
| Контакты: WhatsApp/телефон, Instagram, почта | `src/config/site.ts`, переменные окружения (см. `.env.example`) |
| Адрес сайта (canonical, sitemap) | `NEXT_PUBLIC_SITE_URL` в настройках Vercel |
| Тексты интерфейса RU/EN | `src/content/locales/ru.ts`, `en.ts` (EN типизирован по RU — пропуск ключа не соберётся) |
| Услуги (тексты, FAQ услуг) | `src/content/services/ru.ts`, `en.ts` |
| Общий FAQ, SEO-заголовки | `src/data/faq.ru.json`, `faq.en.json`, `seo.seed.json` |
| Проекты портфолио | `src/data/portfolio.json` + скриншоты в `public/portfolio/` |
| Статьи блога | `src/content/blog/<slug>.mdx` + запись в `src/data/blog.seed.json` |
| Политика конфиденциальности | `privacy` в словарях локалей |
| Логотип | `src/components/ui/logo.tsx`, `src/app/icon.svg`, `src/app/apple-icon.png` |
| Цвета, шрифты, сетка | `src/app/globals.css` (`@theme`), шрифты — `src/app/[locale]/layout.tsx` |

### Проекты

Каждый проект — один объект в `src/data/portfolio.json`; схема проверяется
Zod при сборке (`src/lib/schemas.ts`). Сейчас там 7 open-source демо
(`kind: "open-source-demo"`) — на сайте они везде помечены как демо, с
автором, репозиторием и лицензией.

Чтобы добавить **собственный проект**, укажите `kind: "client-project"` и
заполните только подтверждённые поля `client`, `year`, `goal`,
`contribution`, `permission` (разрешение клиента обязательно), `result`.
Скриншоты: добавьте сайт в JSON и выполните

```bash
pnpm capture:portfolio <slug>   # desktop, следующий экран, mobile, OG-кадр + manifest
pnpm og                          # OG-картинки страниц (public/og)
```

### Контакты и WhatsApp

Номер WhatsApp/телефона, подтверждённый владельцем, задан в
`src/config/site.ts`. `NEXT_PUBLIC_WHATSAPP_E164` переопределяет его
(только цифры в международном формате), `off` — скрывает WhatsApp, и все
кнопки переключаются на Instagram. Почта показывается только если задана
`NEXT_PUBLIC_BUSINESS_EMAIL`.

Бриф на `/contact` ничего не отправляет на сервер: он собирает текст,
открывает WhatsApp с подставленным сообщением или копирует текст и
открывает Instagram. «Текст скопирован» показывается только после
реального копирования.

### Аналитика

Без `NEXT_PUBLIC_GA_ID` никакие скрипты не загружаются; события
(`view_service`, `view_project`, `filter_portfolio`, `cta_contact`,
`contact_method`, `copy_brief`, `open_demo`, `open_github`,
`special_offer_view`, `special_offer_cta`) уходят в `gtag`, только если он
подключён. Перед включением аналитики обновите политику конфиденциальности
и добавьте управление согласием.

## Индексация

Поисковые системы индексируют только production-деплой
(`VERCEL_ENV=production`). Preview-деплои и локальные сборки без
`NEXT_PUBLIC_SITE_URL` отдают `noindex` и `Disallow: /`. Без собственного
домена canonical указывает на production-домен Vercel — временное решение
до подключения домена.

## Прочее

- `legacy/` — код предыдущей версии сайта (шаблон), сохранён для справки и в
  сборку не входит.
- `docs/spec/` — техническое задание, по которому сделан сайт.
- `docs/QA_REPORT.md` — отчёт о проверках.
- `THIRD_PARTY_NOTICES.md` — авторство и лицензии.
