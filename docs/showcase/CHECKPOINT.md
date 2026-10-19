# Checkpoint — портфолио MicroStudio

Обновлено: 2026-10-19.

## ⚠️ Смена подхода (решение владельца)

**Самостоятельно созданные демо-проекты (25 штук, `ms-*.vercel.app`) владельца не устроили по визуальному уровню.**
Новые собственные сайты ради количества больше не делаем.

Дальше портфолио наполняется **качественными готовыми проектами с GitHub** с минимальной визуальной адаптацией:

1. **Поиск.** Законченные сайты и приложения с открытым кодом и лицензией, разрешающей адаптацию и публикацию (MIT, Apache-2.0, BSD, CC-BY и т. п.): корпоративные сайты, магазины с хорошими каталогами, рестораны, отели, недвижимость, услуги, брендовые сайты, кабинеты и веб-приложения.
2. **Отбор.** Перед выбором обязательно открыть исходное демо или запустить проект локально: первый экран, следующие секции, внутренние страницы, мобильная версия. Исходник должен **уже** выглядеть на уровне профессиональной студии: сильная типографика, композиция, изображения, полноценные страницы, хороший мобильный вид. Звёзды не критерий. Посредственный исходник, которому нужен полный редизайн, отклоняем.
3. **Что сохранить по каждому выбранному:** ссылка на исходный GitHub, исходное демо (если есть), скриншоты исходного интерфейса, лицензия, короткое объяснение, почему подходит.
4. **Адаптация — минимальная.** Сохраняем композицию, сетку, типографику, компоненты и анимации исходника. Можно: название и брендинг демо, акцентные цвета, отдельные тексты и изображения, локальные правки отступов и адаптива, исправление ошибок. Нельзя: переписывать с нуля, менять стек без необходимости, натягивать свой шаблон.
5. **Публикация.** Адаптированная версия — в GitHub владельца (`kirill-dorkin`), своё рабочее демо. В карточке портфолио: скриншот нашей версии, кнопка «Открыть демо», категория, краткое описание, указание исходной основы и нашего вклада. Сохранять лицензии и авторские уведомления. Производные демо **не** помечать клиентскими заказами. Проверить основные действия и мобильный вид: без пустых каталогов, битых картинок, мёртвых кнопок.
6. **Старые демо.** Исходники и deployments не удалять без необходимости, но слабые работы **убрать из публичной подборки** по мере замены найденными проектами.
7. **Порядок.** Сначала найти, адаптировать и опубликовать **5 сильных и разных** проектов, затем продолжать тем же способом до 50. Если подходящих исходников мало — продолжать поиск, а не делать свои.
8. **Отчёт по каждому проекту:** исходник → наша версия на GitHub → наше рабочее демо + короткий список изменений.

Главный критерий: посетитель открывает проект и сразу видит качественный законченный сайт.

> Требования из исходного ТЗ, которые противоречат этому (собственные демо, план из 50 слотов в `PLAN.md`, партии по 5 своих демо), **больше не действуют**. `PLAN.md` сохранён как история, но для новой работы не используется.

## Прогресс по новому подходу (2026-10-19)

Первая пятёрка найдена, адаптирована, опубликована и выведена на сайт. Подробности отбора и отклонённые кандидаты — `SOURCES.md`, скриншоты исходников — `sources/`.

| Проект | Исходник | Наша версия на GitHub | Наше демо |
|---|---|---|---|
| Marby — недвижимость | https://github.com/agnilem/marby-astro | https://github.com/kirill-dorkin/ms-marby-realty | https://ms-marby-realty.vercel.app |
| Очок — ресторан | https://github.com/xocothemes/ombra | https://github.com/kirill-dorkin/ms-ochok-restaurant | https://ms-ochok-restaurant.vercel.app |
| Saima — отель | https://github.com/Sv3nskie/astro-theme-solenne | https://github.com/kirill-dorkin/ms-saima-hotel | https://ms-saima-hotel.vercel.app |
| Maison — магазин | https://github.com/njbSaab/astro-njx-maison | https://github.com/kirill-dorkin/ms-maison-archive | https://ms-maison-archive.vercel.app |
| Kerege Admin — веб-приложение | https://github.com/satnaing/shadcn-admin | https://github.com/kirill-dorkin/ms-kerege-admin | https://ms-kerege-admin.vercel.app |

Список изменений по каждому — в `ADAPTATION.md` в корне форка и в карточке на сайте («Что сделала MicroStudio»).

Публично на сайте сейчас 7 работ: эти 5 + best-electronics-link (клиент) + tikitaki (свой продукт). 25 собственных демо скрыты (`status: retired` в их `showcase.json`), код и деплои сохранены, их адреса кейсов перенаправляются в каталог.

Как устроено:
- Форки лежат локально в `~/ms-adapted/<repo>`, remote `origin` — форк в kirill-dorkin, `upstream` — исходник.
- Деплой: `~/ms-adapted/deploy.sh <папка-сборки> <vercel-проект>` (копирует сборку в `~/ms-adapted/_deploy/<проект>`, где хранится привязка к Vercel).
- Метаданные карточек: `microstudio-showcase/adapted/<slug>/showcase.json` (`provenance.type: "derived"`, `upstream` с `sha`, `license`, `demo`, `fork`). Пайплайн QA/скриншотов/Lighthouse/экспорта тот же, проверка — только живого демо.
- Lighthouse (мобильный): Ochok 100, Marby 91, Maison 77, Saima 73, Kerege 69 — ниже 90 из-за тяжёлых исходных изображений/бандла; доступность 96–100.

Следующий шаг: ещё партии по 5 из резерва в `SOURCES.md` и новый поиск (магазины одежды/техники, корпоративные B2B, клиники, образование, кабинеты), тот же порядок: просмотр исходника на двух ширинах → форк → минимальная адаптация → деплой → QA → карточка.

## Репозитории и ветки

### Сайт студии — `~/MicroStudio` (github.com/kirill-dorkin/MicroStudio)
- Ветка: `feat/portfolio-50-full-cycle`, запушена, рабочее дерево чистое (последний коммит до этого файла — `93fe9f1`).
- Draft PR: https://github.com/kirill-dorkin/MicroStudio/pull/32 (база `feat/real-work-repositioning`, это ветка PR #31; цепочка #29 → #30 → #31 → #32). В main ничего не сливалось.
- Что сделано на сайте: каталог `/ru/work` (поиск, фильтры, сортировка, URL-состояние, 12 на страницу + «Показать ещё», мобильная панель фильтров), новая страница кейса, новая главная, 6 направлений услуг с редиректами со старых адресов, контекстные сообщения WhatsApp, убраны smooth scroll и анимации при прокрутке.

### Демо — `~/microstudio-showcase` (github.com/kirill-dorkin/microstudio-showcase, **приватный**)
- Ветка: `main`, запушена до `d3c9649`.
- **Незакоммичено:** `demos/koch-tours/` — начатый собственный демо туроператора. Работа остановлена по решению владельца, не деплоился, не публикуется. Можно удалить или оставить как есть.
- Публичный репозиторий создать не удалось (автоматическая политика отклонила); если нужен публичный — владелец меняет видимость сам.

## Где лежат данные портфолио
- `microstudio-showcase/demos/<slug>/` — код собственных демо и `showcase.json` (метаданные карточки).
- `microstudio-showcase/external/<slug>/showcase.json` — проекты, размещённые не у нас (клиентские, собственные продукты).
- `microstudio-showcase/registry/projects.json` — внутренний реестр (все, включая заблокированные, поле `blocker`).
- `microstudio-showcase/registry/public.json` — то, что попадает на сайт (только с деплоем, live QA и скриншотами).
- `MicroStudio/src/data/portfolio.json`, `public/portfolio/<slug>/*.webp`, `public/og/work-<slug>.jpg` — копия на сайте, создаётся `pnpm sync:showcase`.
- Схема карточки: `MicroStudio/src/lib/schemas.ts` (`projectSchema`; `workType`: client | product | demo; `provenance.type` сейчас `original`, для найденных проектов понадобится тип вроде `adapted` с полями исходника и лицензии).
- Скрыть работу из публичной подборки: исключить её из `registry/public.json` (например, статусом в `showcase.json`, который `scripts/export.mjs` не пропускает), затем `pnpm sync:showcase`. Старые адреса кейсов редиректятся в каталог автоматически (`next.config.ts`, hiddenWork).

## Созданные проекты и URL (сейчас публично 27)

Собственные демо, которые **владельца не устроили** и подлежат замене (код и деплои сохранены):

| slug | формат | демо |
|---|---|---|
| svezho-cleaning | landing | https://ms-svezho-cleaning.vercel.app |
| kaichy-barber | landing | https://ms-kaichy-barber.vercel.app |
| kochevnik-moving | landing | https://ms-kochevnik-moving.vercel.app |
| bugu-coffee | landing | https://ms-bugu-coffee.vercel.app |
| soz-language | landing | https://ms-soz-language.vercel.app |
| kolos-bakery | landing | https://ms-kolos-bakery.vercel.app |
| tash-stroy | corporate | https://ms-tash-stroy.vercel.app |
| ak-tish-dental | corporate | https://ms-ak-tish-dental.vercel.app |
| garage-312 | corporate | https://ms-garage-312.vercel.app |
| kazan-ogon | corporate | https://ms-kazan-ogon.vercel.app |
| ordo-legal | corporate | https://ms-ordo-legal.vercel.app |
| archa-hotel | corporate | https://ms-archa-hotel.vercel.app |
| oreh-len | shop | https://ms-oreh-len.vercel.app |
| volt-electronics | shop | https://ms-volt-electronics.vercel.app |
| aruu-cosmetics | shop | https://ms-aruu-cosmetics.vercel.app |
| kumush-jewelry | shop | https://ms-kumush-jewelry.vercel.app |
| kiyim-store | shop | https://ms-kiyim-store.vercel.app |
| arna-crm | app | https://ms-arna-crm.vercel.app |
| ritm-projects | app | https://ms-ritm-projects.vercel.app |
| saldo-finance | app | https://ms-saldo-finance.vercel.app |
| kampa-warehouse | app | https://ms-kampa-warehouse.vercel.app |
| gulzar-salon | app | https://ms-gulzar-salon.vercel.app |
| toolor-jazz | special | https://ms-toolor-jazz.vercel.app |
| svet24-studio | special | https://ms-svet24-studio.vercel.app |
| jailoo-camp | special | https://ms-jailoo-camp.vercel.app |

Реальные работы владельца (остаются):
- best-electronics-link — клиент — https://be-lending.vercel.app
- tikitaki — собственный продукт — https://tiki-taki.vercel.app

Заблокированы (не публикуются до исправлений в их репозиториях): best-electronics-store (пустой каталог), jarjar (выдуманные рейтинги, нет демо-метки), nova-ielts (контакты-заглушки, ссылки «#»), anna-art (пустой каталог).

## Команды

```bash
# Сайт студии
cd ~/MicroStudio
pnpm install
pnpm dev                    # локально
pnpm sync:showcase          # реестр и скриншоты из ~/microstudio-showcase
pnpm test                   # unit (26)
pnpm build && pnpm test:e2e # e2e на системном Chrome, порт 3311

# Демо-репозиторий
cd ~/microstudio-showcase
node scripts/qa.mjs <slug> [--live]       # ошибки, переполнение 360–1440, axe, сценарий
node scripts/capture.mjs <slug> [--live]  # скриншоты desktop/mobile/галерея
node scripts/deploy.mjs <slug>            # Vercel-проект ms-<slug> (scope bhvgfs-projects)
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node scripts/perf.mjs <slug>
node scripts/export.mjs                   # registry/projects.json + public.json
```

Скрипты QA, скриншотов, деплоя и экспорта подходят и для адаптированных GitHub-проектов, если проект собирается в статику или деплоится на Vercel. Для проектов с другим стеком понадобится отдельная настройка сборки в `deploy.mjs`.

## Нерешённые вопросы
- Нужен новый тип происхождения в схеме карточки (исходник, лицензия, авторы, наш вклад) и вывод его на странице кейса.
- Где хранить адаптированные проекты: отдельный репозиторий-форк на каждый проект в `kirill-dorkin` (удобно сохранять историю и лицензию исходника) или общий репозиторий. Предложение: отдельный форк на проект.
- Публичность репозиториев: форки публичных проектов будут публичными, демо-репозиторий сейчас приватный.
- e2e: при полной параллельной нагрузке иногда падают 1–2 теста кейсов по таймауту загрузки картинок; при повторном запуске проходят.
- Lighthouse для самого сайта студии и финальный отчёт по §18 ещё не сделаны.
- PR #32 описывает старый подход; описание нужно обновить, когда появятся первые адаптированные проекты.
