export const STUDIO = {
  name: "MicroStudio",
  phone: "+996 700 779 919",
  phoneHref: "tel:+996700779919",
  whatsapp: "https://wa.me/996700779919",
  instagram: "https://www.instagram.com/microstudio_official/",
  instagramHandle: "@microstudio_official",
} as const;

export const PROJECT_TYPES = [
  {
    id: "website",
    label: "Новый сайт",
    message: "Хочу обсудить новый сайт для бизнеса.",
  },
  {
    id: "improve",
    label: "Доработка",
    message: "У меня уже есть сайт. Хочу обсудить его доработку.",
  },
  {
    id: "advertising",
    label: "Реклама",
    message: "Хочу обсудить настройку рекламы.",
  },
  {
    id: "basic",
    label: "Сайт за 1500 сом",
    message:
      "Интересует одностраничный сайт за 1500 сом. Давайте обсудим состав.",
  },
] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number]["id"];

export function whatsappLink(
  type: ProjectType = "website",
  business = "",
  details = "",
) {
  const project =
    PROJECT_TYPES.find((item) => item.id === type) ?? PROJECT_TYPES[0];
  const message = [
    `Здравствуйте, MicroStudio! ${project.message}`,
    business.trim() ? `Мой бизнес: ${business.trim()}` : "",
    details.trim() ? `Подробнее: ${details.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `${STUDIO.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const SERVICES = [
  {
    id: "website",
    number: "01",
    title: "Новый сайт",
    tag: "Чтобы вас выбрали",
    description:
      "Соберём услуги, преимущества и контакты в понятный сайт. От простой страницы до индивидуального проекта.",
    features: ["Лендинги", "Сайты компаний", "Мобильная версия"],
  },
  {
    id: "improve",
    number: "02",
    title: "Доработка сайта",
    tag: "Если пора двигаться дальше",
    description:
      "Посмотрим, что мешает посетителю: непонятное предложение, сложная заявка или неудобная версия для телефона. Предложим изменения.",
    features: ["Дизайн", "Новые функции", "Удобство"],
  },
  {
    id: "advertising",
    number: "03",
    title: "Запуск рекламы",
    tag: "Чтобы о вас узнали",
    description:
      "Подготовим предложение и настроим рекламу на ваш сайт. Согласуем работу и рекламный бюджет отдельно.",
    features: ["Аудитория", "Предложение", "Настройка"],
  },
] as const;
