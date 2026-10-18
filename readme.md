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

## Фотографии

Фото на страницах проектов (`public/images/projects`) — с [Unsplash](https://unsplash.com), [лицензия Unsplash](https://unsplash.com/license) разрешает бесплатное коммерческое использование. Исходники:

- `coffee-hero.webp` — https://images.unsplash.com/photo-1521017432531-fbd92d768814
- `coffee-1.webp` — https://images.unsplash.com/photo-1534234757579-8ad69d218ad4
- `coffee-2.webp` — https://images.unsplash.com/photo-1502462041640-b3d7e50d0662
- `coffee-3.webp` — https://images.unsplash.com/photo-1555507036-ab1f4038808a
- `school-hero.webp` — https://images.unsplash.com/photo-1522202176988-66273c2fd55f
- `school-1.webp` — https://images.unsplash.com/photo-1543269865-cbf427effbad
- `school-2.webp` — https://images.unsplash.com/photo-1434030216411-0b793f4b4173
- `school-3.webp` — https://images.unsplash.com/photo-1577896851231-70ef18881754
- `flowers-hero.webp` — https://images.unsplash.com/photo-1487070183336-b863922373d4
- `flowers-1.webp` — https://images.unsplash.com/photo-1623406795110-99f1c4325084
- `flowers-2.webp` — https://images.unsplash.com/photo-1619962992057-be492a5816f6
- `flowers-3.webp` — https://images.unsplash.com/photo-1642751652611-bb9a7cad58a3
- `cleaning-hero.webp` — https://images.unsplash.com/photo-1758273238415-01ec03d9ef27
- `cleaning-1.webp` — https://images.unsplash.com/photo-1758273705627-937374bfa978
- `cleaning-2.webp` — https://images.unsplash.com/photo-1758272421751-963195322eaa
- `cleaning-3.webp` — https://images.unsplash.com/photo-1585421514284-efb74c2b69ba
- `fitness-hero.webp` — https://images.unsplash.com/photo-1518611012118-696072aa579a
- `fitness-1.webp` — https://images.unsplash.com/photo-1517130038641-a774d04afb3c
- `fitness-2.webp` — https://images.unsplash.com/photo-1518644961665-ed172691aaa1
- `fitness-3.webp` — https://images.unsplash.com/photo-1599901860904-17e6ed7083a0
