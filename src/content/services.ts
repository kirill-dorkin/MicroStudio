export type Service = {
  name: string;
  tags: string[];
  img: string;
  url: string;
  description: string;
};

export const SERVICES_LIST: Record<'en' | 'ru' | 'es', Service[]> = {
  en: [
    {
      name: 'UI/UX & Web Design',
      tags: ['Figma', 'Wireframing', 'Prototyping', 'Responsive Design', 'User Testing'],
      img: '/images/abstract-1.png',
      url: '#',
      description:
        'End-to-end digital design from wireframes to polished interfaces. We create intuitive, visually appealing experiences for websites and apps, backed by user research and iterative testing.',
    },
    {
      name: 'Brand Identity Design',
      tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Typography', 'Color Theory'],
      img: '/images/abstract-2.png',
      url: '#',
      description:
        'Comprehensive branding packages including logos, style guides, and asset kits. We craft cohesive visual identities that communicate your brand\u2019s essence across all touchpoints.',
    },
    {
      name: 'SEO & Website Audits',
      tags: ['Technical SEO', 'Keyword Strategy', 'On-Page Optimization', 'Analytics', 'Performance Tuning'],
      img: '/images/abstract-3.png',
      url: '#',
      description:
        'Data-driven SEO audits and optimizations to improve rankings. We analyze technical health, content gaps, and backlink profiles to drive organic growth.',
    },
    {
      name: 'Social Media Marketing',
      tags: ['Meta Ads', 'Instagram Reels', 'Content Strategy', 'Community Management', 'Performance Tracking'],
      img: '/images/abstract-5.png',
      url: '#',
      description:
        'Full-service social media management\u2014from organic content creation to paid campaigns. We build engaging narratives and measurable strategies tailored to each platform.',
    },
  ],
  ru: [
    {
      name: 'UI/UX и веб\u2011дизайн',
      tags: ['Figma', '\u0412\u0430\u0439\u0440\u0444\u0440\u0435\u0439\u043c\u0438\u043d\u0433', '\u041f\u0440\u043e\u0442\u043e\u0442\u0438\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435', '\u0410\u0434\u0430\u043f\u0442\u0438\u0432\u043d\u044b\u0439 \u0434\u0438\u0437\u0430\u0439\u043d', '\u042e\u0437\u0430\u0431\u0438\u043b\u0438\u0442\u0438\u2011\u0442\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435'],
      img: '/images/abstract-1.png',
      url: '#',
      description:
        '\u041f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b \u0446\u0438\u0444\u0440\u043e\u0432\u043e\u0433\u043e \u0434\u0438\u0437\u0430\u0439\u043d\u0430 \u2014 \u043e\u0442 \u0432\u0430\u0439\u0440\u0444\u0440\u0435\u0439\u043c\u043e\u0432 \u0434\u043e \u0433\u043e\u0442\u043e\u0432\u044b\u0445 \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u043e\u0432. \u041c\u044b \u0441\u043e\u0437\u0434\u0430\u0451\u043c \u0438\u043d\u0442\u0443\u0438\u0442\u0438\u0432\u043d\u044b\u0435 \u0438 \u0432\u044b\u0440\u0430\u0437\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0432\u0435\u0431\u2011\u0441\u0430\u0439\u0442\u044b \u0438 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f, \u043e\u043f\u0438\u0440\u0430\u044f\u0441\u044c \u043d\u0430 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u043d\u0438\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0438\u0442\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u0442\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435.',
    },
    {
      name: '\u0414\u0438\u0437\u0430\u0439\u043d \u0444\u0438\u0440\u043c\u0435\u043d\u043d\u043e\u0433\u043e \u0441\u0442\u0438\u043b\u044f',
      tags: ['\u0420\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u0430', '\u0413\u0430\u0439\u0434\u043b\u0430\u0439\u043d\u044b \u0431\u0440\u0435\u043d\u0434\u0430', '\u0412\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u0430\u0439\u0434\u0435\u043d\u0442\u0438\u043a\u0430', '\u0422\u0438\u043f\u043e\u0433\u0440\u0430\u0444\u0438\u043a\u0430', '\u0426\u0432\u0435\u0442\u043e\u0432\u0430\u044f \u0442\u0435\u043e\u0440\u0438\u044f'],
      img: '/images/abstract-2.png',
      url: '#',
      description:
        '\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043d\u044b\u0435 \u043f\u0430\u043a\u0435\u0442\u044b \u0444\u0438\u0440\u043c\u0435\u043d\u043d\u043e\u0433\u043e \u0441\u0442\u0438\u043b\u044f: \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u044b, \u0433\u0430\u0439\u0434\u043b\u0430\u0439\u043d\u044b \u0438 \u043d\u0430\u0431\u043e\u0440\u044b \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432. \u041c\u044b \u0441\u043e\u0437\u0434\u0430\u0451\u043c \u0446\u0435\u043b\u044c\u043d\u044b\u0435 \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u044b\u0435 \u0441\u0438\u0441\u0442\u0435\u043c\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u044e\u0442 \u0441\u0443\u0442\u044c \u0432\u0430\u0448\u0435\u0433\u043e \u0431\u0440\u0435\u043d\u0434\u0430 \u043d\u0430 \u0432\u0441\u0435\u0445 \u0442\u043e\u0447\u043a\u0430\u0445 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0430.',
    },
    {
      name: 'SEO \u0438 \u0430\u0443\u0434\u0438\u0442 \u0441\u0430\u0439\u0442\u0430',
      tags: ['\u0422\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u043e\u0435 SEO', '\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0445 \u0441\u043b\u043e\u0432', '\u041e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044f \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435', '\u0410\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430', '\u041e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044f \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438'],
      img: '/images/abstract-3.png',
      url: '#',
      description:
        'SEO\u2011\u0430\u0443\u0434\u0438\u0442\u044b \u0438 \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u044f \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0434\u0430\u043d\u043d\u044b\u0445 \u0434\u043b\u044f \u043f\u043e\u0432\u044b\u0448\u0435\u043d\u0438\u044f \u043f\u043e\u0437\u0438\u0446\u0438\u0439. \u041c\u044b \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0443\u0435\u043c \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435, \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u043d\u044b\u0435 \u043f\u0440\u043e\u0431\u0435\u043b\u044b \u0438 \u0441\u0441\u044b\u043b\u043e\u0447\u043d\u044b\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c, \u0447\u0442\u043e\u0431\u044b \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0442\u044c \u043e\u0440\u0433\u0430\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0440\u043e\u0441\u0442.',
    },
    {
      name: '\u041c\u0430\u0440\u043a\u0435\u0442\u0438\u043d\u0433 \u0432 \u0441\u043e\u0446\u0441\u0435\u0442\u044f\u0445',
      tags: ['\u0420\u0435\u043a\u043b\u0430\u043c\u0430 \u0432 Meta', 'Instagram Reels', '\u041a\u043e\u043d\u0442\u0435\u043d\u0442\u2011\u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f', '\u0423\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e\u043c', '\u041e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u043d\u0438\u0435 \u044d\u0444\u0444\u0435\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u0438'],
      img: '/images/abstract-5.png',
      url: '#',
      description:
        '\u041f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b \u043f\u0440\u043e\u0434\u0432\u0438\u0436\u0435\u043d\u0438\u044f \u0432 \u0441\u043e\u0446\u0441\u0435\u0442\u044f\u0445 \u2014 \u043e\u0442 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430 \u0434\u043e \u043f\u043b\u0430\u0442\u043d\u044b\u0445 \u043a\u0430\u043c\u043f\u0430\u043d\u0438\u0439. \u041c\u044b \u0441\u0442\u0440\u043e\u0438\u043c \u0432\u043e\u0432\u043b\u0435\u043a\u0430\u044e\u0449\u0438\u0435 \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u0438 \u0438\u0437\u043c\u0435\u0440\u0438\u043c\u044b\u0435 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u043f\u043e\u0434 \u043a\u0430\u0436\u0434\u0443\u044e \u043f\u043b\u043e\u0449\u0430\u0434\u043a\u0443.',
    },
  ],
  es: [
    {
      name: 'Diseño UI/UX y Web',
      tags: ['Figma', 'Wireframing', 'Prototipado', 'Diseño adaptable', 'Pruebas con usuarios'],
      img: '/images/abstract-1.png',
      url: '#',
      description:
        'Proceso completo de diseño digital, desde wireframes hasta interfaces pulidas. Creamos experiencias intuitivas y visualmente atractivas para sitios web y aplicaciones, respaldadas por investigación de usuarios y pruebas iterativas.',
    },
    {
      name: 'Diseño de identidad de marca',
      tags: ['Diseño de logotipo', 'Guías de marca', 'Identidad visual', 'Tipografía', 'Teoría del color'],
      img: '/images/abstract-2.png',
      url: '#',
      description:
        'Paquetes integrales de branding que incluyen logotipos, guías de estilo y kits de recursos. Creamos identidades visuales cohesionadas que comunican la esencia de tu marca en todos los puntos de contacto.',
    },
    {
      name: 'SEO y auditorías de sitios web',
      tags: ['SEO técnico', 'Estrategia de palabras clave', 'Optimización on-page', 'Analítica', 'Ajuste de rendimiento'],
      img: '/images/abstract-3.png',
      url: '#',
      description:
        'Auditorías y optimizaciones SEO basadas en datos para mejorar el posicionamiento. Analizamos la salud técnica, los vacíos de contenido y los perfiles de enlaces para impulsar el crecimiento orgánico.',
    },
    {
      name: 'Marketing en redes sociales',
      tags: ['Anuncios en Meta', 'Reels de Instagram', 'Estrategia de contenido', 'Gestión de comunidad', 'Seguimiento del rendimiento'],
      img: '/images/abstract-5.png',
      url: '#',
      description:
        'Gestión integral de redes sociales: desde contenido orgánico hasta campañas pagadas. Construimos narrativas atractivas y estrategias medibles para cada plataforma.',
    },
  ],
};
