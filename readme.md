# MicroStudio

Сайт студии MicroStudio: разработка и доработка сайтов, запуск рекламы и поддержка проектов.

Стек: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion.

## Запуск

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Проверки перед публикацией:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

## Где что лежит

- `src/locales/ru.ts`, `src/locales/en.ts` — все тексты сайта. Английский словарь типизирован по русскому, поэтому пропущенный ключ не даст собрать проект.
- `src/lib/contacts.ts` — телефон, WhatsApp, Instagram и адрес сайта.
- `src/content/portfolio.ts` — карточки работ (реальные проекты и демо-концепты).
- `src/content/demos.ts`, `src/components/demo/demo-landing.tsx` — демо-концепты по адресу `/demo/<slug>`.
- `src/content/tech-logos.ts` — знаки технологий из [Simple Icons](https://simpleicons.org) (CC0).

## Язык

Язык по умолчанию — русский. Выбор сохраняется в cookie `lang` (и в localStorage), сервер читает cookie и сразу отдаёт страницу на нужном языке — без скачка и ошибок гидратации.

## Адрес сайта

Метаданные, `robots.txt` и `sitemap.xml` используют `NEXT_PUBLIC_SITE_URL`, а без неё — production-домен Vercel (`VERCEL_PROJECT_PRODUCTION_URL`). После подключения собственного домена задайте `NEXT_PUBLIC_SITE_URL` в настройках проекта Vercel.
