import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      hero: {
        title: 'Design With Intent, Engineering With Precision.',
        subtitle: 'Custom websites and web apps on modern stacks-fast delivery, strong reliability, real ROI.',
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
    },
  },
  ru: {
    translation: {
      hero: {
        title: 'Дизайн с намерением, инженерия с точностью.',
        subtitle: 'Пользовательские сайты и веб-приложения на современных стеках — быстрая доставка, высокая надёжность, реальная окупаемость.',
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
    },
  },
  es: {
    translation: {
      hero: {
        title: 'Diseño con intención, ingeniería con precisión.',
        subtitle: 'Sitios web y aplicaciones web personalizados con pilas modernas: entrega rápida, gran fiabilidad y verdadero retorno de inversión.',
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
