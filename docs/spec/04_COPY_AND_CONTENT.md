# 04. CONTENT / WORDING / NO EMPTY SECTIONS

## Main hero RU (exact preferred copy)
Kicker: «MICROSTUDIO · ВЕБ-РАЗРАБОТКА И ДИЗАЙН».
H1: «Создаём сайты, которые работают на ваш бизнес».
Body: «От небольшой страницы до интернет-магазина и индивидуального проекта. Продумываем дизайн, удобство и путь клиента к обращению».
Buttons: «Обсудить проект» / «Смотреть примеры».
Small note over demo previews: «Открытые примеры дизайна и интерфейсов».

## Main hero EN
Kicker: `MICROSTUDIO · WEB DEVELOPMENT & DESIGN`.
H1: `Websites built around your business.`
Body: `From a focused landing page to an online store or a custom product, we design clear experiences that help people find what they need and get in touch.`
Buttons: `Discuss a project` / `Explore examples`.
Small note: `Open-source interface demos`.

## Services preview
Title: «Чем можем помочь»; subtitle: «Берёмся за задачи разного масштаба — от аккуратной страницы до функционального веб-проекта».
Web: «Сайты и веб-приложения» — «Лендинги, сайты компаний, каталоги, магазины и индивидуальные решения».
Design: «Продуманный дизайн» — «Структура и интерфейс, в которых посетитель быстро находит главное».
Ads: «Реклама и аналитика» — «Поможем связать рекламное объявление, сайт и обращение клиента».
Support: «Развитие и поддержка» — «Доработки, новые функции, языковые версии и помощь после запуска».

## Selected work
Title: «Посмотрите, как это может выглядеть».
Subtitle: «Здесь собраны открытые демонстрационные проекты. По ним можно оценить варианты интерфейсов; это не наши клиентские кейсы».
CTA: «Все примеры».

## Process
Title: «Без лишней сложности».
Step1 title: «Разберём задачу»; body: «Обсудим, чем занимается ваш бизнес, что посетителю важно узнать и какое действие он должен совершить».
Step2: «Продумаем решение» / «Определим структуру, дизайн и необходимый функционал».
Step3: «Соберём и проверим» / «Разработаем сайт, проверим на разных экранах и доведём основные сценарии».
Step4: «Поможем запустить» / «Подготовим к публикации и, если потребуется, продолжим развитие проекта».

## Special section
Badge: «Специальное предложение».
H2: «Одностраничный сайт за 1 500 сом».
Copy: «Для небольшого бизнеса, которому нужна понятная страница с услугами, информацией и способом связи. Дополнительные функции и сторонние расходы — отдельно».
CTA: «Условия предложения».

## About
Title: «Не просто красиво. Удобно для ваших клиентов».
Copy: «Хороший сайт помогает человеку быстро разобраться в предложении и связаться с компанией. Поэтому мы обращаем внимание на содержание, скорость, адаптивность и понятный путь к действию».

## Contact
Title: «Расскажите о своей задаче».
Copy: «Можно начать с пары предложений. Подберём подходящий формат и обсудим следующий шаг».
Form labels: «Какой проект нужен?», «Что хотите сделать?», «Примерный бюджет (необязательно)», «Куда удобнее написать?».

## Footer
«MicroStudio — сайты, дизайн и digital-решения для бизнеса.»
Footer disclaimer when project previews visible: «Демонстрационные проекты принадлежат соответствующим авторам; ссылки и лицензии указаны в разделах проектов».

## Quality of copy
No text like «ЛИДИРУЮЩЕЕ АГЕНТСТВО», «100+ довольных клиентов», «рост продаж x3», «гарантированные лиды», «создано с любовью ✨», «мы делаем всё под ключ за 1500». No unverifiable marketing claims or fake team photos. Use concise, human Russian sentences with verbs and concrete objects. No machine-translation of RU into EN.

## Additional prepared content
- Service texts: `data/services.seed.json`.
- FAQs: `data/faq.ru.json` — all 12 completed.
- Portfolio summaries: `data/portfolio.seed.json` — 7 completed with RU+EN descriptions.
- Blog: 3 complete starter articles in `content/blog/`. Convert to MDX, translate to EN with the same substance, avoid claiming these articles are expert studies or client case studies.

- EN service copy: `data/services.en.json`; EN FAQ: `data/faq.en.json`; per-route SEO copy: `data/seo.seed.json`; English complete blog articles in `content/blog/` with English filenames.

- Blog language pairs / metadata: `data/blog.seed.json`. Do not invent extra case-study articles, author bio or SEO dates.
- Privacy copy for both locales: `docs/07_PRIVACY_RU_EN.md`; update if implementation introduces additional data processing.
