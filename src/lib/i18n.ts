import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        title: 'Design With Intent, Engineering With Precision.',
        subtitle: 'Custom websites and web apps on modern stacks-fast delivery, strong reliability, real ROI.',
        cta: {
          contact: 'Talk to us',
          work: 'See our work',
        },
      },
      header: {
        nav: {
          home: 'Home',
          about: 'About',
          services: 'Services',
          portfolio: 'Portfolio',
        },
        cta: 'Partner with us',
      },
      about: {
        title: 'About Us',
        description:
          'What began as a love for clean design became a studio where design and code work together to deliver outcomes. We craft custom sites and web apps, from animated marketing pages to complex product UIs, with measurable gains in speed, conversion, and reliability. Fully remote, bilingual (RU/EN), global.',
        imageAlt: 'team image',
        principles: [
          {
            title: 'Design × Engineering',
            description: 'Clean design and robust code working together to deliver outcomes.',
          },
          {
            title: 'Custom Web Experiences',
            description: 'From animated marketing pages to complex product UIs.',
          },
          {
            title: 'Measurable Impact',
            description: 'Faster load times, higher conversion, and reliable performance.',
          },
          {
            title: 'Distributed & Bilingual',
            description: 'Fully remote team, RU/EN, operating worldwide.',
          },
        ],
      },
    },
  },
  ru: {
    translation: {
      hero: {
        title: 'Дизайн с намерением, инженерия с точностью.',
        subtitle: 'Пользовательские сайты и веб-приложения на современных стеках — быстрая доставка, высокая надёжность, реальная окупаемость.',
        cta: {
          contact: 'Написать нам',
          work: 'Посмотреть работы',
        },
      },
      header: {
        nav: {
          home: 'Главная',
          about: 'О нас',
          services: 'Услуги',
          portfolio: 'Портфолио',
        },
        cta: 'Сотрудничать с нами',
      },
      about: {
        title: 'О нас',
        description:
          'Страсть к чистому дизайну превратилась в студию, где дизайн и код работают вместе ради результата. Мы создаём сайты и веб‑приложения: от анимированных промостраниц до сложных интерфейсов с ощутимым ростом скорости, конверсии и надёжности. Работаем полностью удалённо, говорим на RU/EN и сотрудничаем по всему миру.',
        imageAlt: 'команда',
        principles: [
          {
            title: 'Дизайн × Инженерия',
            description: 'Чистый дизайн и надёжный код, работающие ради общего результата.',
          },
          {
            title: 'Индивидуальные веб‑решения',
            description: 'От анимированных промостраниц до сложных интерфейсов.',
          },
          {
            title: 'Измеримый эффект',
            description: 'Быстрая загрузка, выше конверсия и стабильная работа.',
          },
          {
            title: 'Удалённая двуязычная команда',
            description: 'Работаем из разных точек мира, говорим на RU/EN.',
          },
        ],
      },
    },
  },
  es: {
    translation: {
      hero: {
        title: 'Diseño con intención, ingeniería con precisión.',
        subtitle: 'Sitios web y aplicaciones web personalizados con pilas modernas: entrega rápida, gran fiabilidad y verdadero retorno de inversión.',
        cta: {
          contact: 'Escríbenos',
          work: 'Ver nuestro trabajo',
        },
      },
      header: {
        nav: {
          home: 'Inicio',
          about: 'Nosotros',
          services: 'Servicios',
          portfolio: 'Portafolio',
        },
        cta: 'Colabora con nosotros',
      },
      about: {
        title: 'Sobre nosotros',
        description:
          'Lo que comenzó como un amor por el diseño limpio se convirtió en un estudio donde el diseño y el código trabajan juntos para ofrecer resultados. Creamos sitios y aplicaciones web a medida, desde páginas de marketing animadas hasta interfaces de producto complejas, con mejoras medibles en velocidad, conversión y fiabilidad. Totalmente remotos, bilingües (RU/EN) y globales.',
        imageAlt: 'equipo',
        principles: [
          {
            title: 'Diseño × Ingeniería',
            description: 'Diseño limpio y código sólido trabajando juntos para entregar resultados.',
          },
          {
            title: 'Experiencias web a medida',
            description: 'Desde páginas de marketing animadas hasta UIs de producto complejas.',
          },
          {
            title: 'Impacto medible',
            description: 'Cargas más rápidas, mayor conversión y rendimiento fiable.',
          },
          {
            title: 'Distribuido y bilingüe',
            description: 'Equipo totalmente remoto, RU/EN, operando en todo el mundo.',
          },
        ],
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
