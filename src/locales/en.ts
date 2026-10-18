import type ru from "./ru";

const en: typeof ru = {
  meta: {
    title: "MicroStudio — websites and ad campaigns for business",
    description:
      "We build websites for businesses, improve existing ones and help launch ads. One-page website from 1500 KGS.",
    ogAlt: "MicroStudio — websites for your business",
    demoTitle: "MicroStudio portfolio",
  },
  common: {
    skipToContent: "Skip to content",
    newTab: "opens in a new tab",
  },
  header: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      portfolio: "Work",
      contact: "Contact",
    },
    cta: "Discuss a project",
    homeLabel: "MicroStudio — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Site language",
  },
  hero: {
    title: "Websites for your business.",
    subtitle:
      "We build new websites, improve existing ones and help launch ads — with a solution that fits your task.",
    cta: {
      contact: "Discuss a project",
      work: "See our work",
    },
  },
  tech: {
    title: "Technologies we work with",
  },
  about: {
    title: "About the studio",
    description:
      "MicroStudio makes websites for businesses: we build new ones, fix up existing ones and help launch ads. We start with the task — who your customers are and what they need to see — and pick the format, from a single page to a site with several sections.",
    imageAlt: "Website screens from the MicroStudio portfolio",
    principles: [
      {
        title: "Clear from the first screen",
        description: "Visitors instantly see what you do and how to reach you.",
      },
      {
        title: "Built for phones",
        description: "Many people open a site on their phone, so we check every screen.",
      },
      {
        title: "One tap to contact",
        description: "WhatsApp, a call or a form — no extra steps.",
      },
      {
        title: "Support after launch",
        description: "If needed, we keep improving the site. Terms are agreed upfront.",
      },
    ],
  },
  services: {
    title: "How we can help",
    subtitle:
      "A new website, improvements to your current one, ads or ongoing support — tell us about the task and we’ll suggest the right option.",
    cursor: "Discuss",
    discuss: "Discuss your task",
    audienceLabel: "Who it’s for",
    discussLabel: "What we can discuss",
    items: [
      {
        id: "new",
        name: "New website",
        audience: "When you don’t have a website yet, or the old one no longer fits your business.",
        description:
          "Structure, copy, design, contact forms and domain setup — from a single page to a site with a catalogue and several sections.",
        tags: ["Landing page", "Business card site", "Multi-page site", "Responsive layout", "Contact forms"],
        img: "/images/abstract-1.webp",
        imgAlt: "Abstract artwork: green and brown waves",
      },
      {
        id: "improve",
        name: "Improving an existing site",
        audience: "When you have a site, but it’s outdated, awkward on phones, slow or partly broken.",
        description:
          "Bug fixes, mobile version, loading speed, refreshed blocks and copy, new sections.",
        tags: ["Bug fixes", "Mobile version", "Loading speed", "New sections", "Design refresh"],
        img: "/images/abstract-2.webp",
        imgAlt: "Abstract artwork: light blue waves",
      },
      {
        id: "ads",
        name: "Ad campaigns",
        audience: "When you need to bring people to your website, WhatsApp or Instagram.",
        description:
          "Platforms and audience, ad creatives, preparing the site for traffic and tracking enquiries. The ad budget is paid separately.",
        tags: ["Targeted ads", "Ad creatives", "Landing page", "Lead tracking"],
        img: "/images/abstract-3.webp",
        imgAlt: "Abstract artwork: blue and gold waves",
      },
      {
        id: "support",
        name: "Support and growth",
        audience: "When you need edits, updates and new sections after launch.",
        description:
          "Price and content updates, technical fixes, new blocks and pages. Support is optional — the format and terms are agreed upfront.",
        tags: ["Content updates", "Technical fixes", "New sections", "Advice"],
        img: "/images/abstract-5.webp",
        imgAlt: "Abstract artwork: red waves",
      },
    ],
  },
  offer: {
    eyebrow: "Quick start",
    title: "One-page website",
    price: "1500 KGS",
    description:
      "A basic format built on a ready-made base — for when you need to present your business online quickly and neatly.",
    includesTitle: "What’s included",
    includes: [
      "A ready-made base adapted to your business",
      "About your business, services and contacts",
      "A mobile-friendly version",
      "A contact button — WhatsApp or a call",
      "Page contents agreed before we start",
    ],
    note:
      "Extra features, the domain, ad setup and the ad budget are priced separately. Support after launch is optional, and its terms are agreed upfront.",
    cta: "Discuss the 1500 KGS website",
  },
  portfolio: {
    title: "Work",
    subtitle:
      "Websites for cafés, services, schools and shops. Open any of them and see it live.",
    action: {
      site: "Open website",
    },
    cursor: {
      site: "Open",
    },
    cta: "Discuss your project",
    items: {
      bestelectronics: {
        name: "BestElectronics",
        sector: "Repair centre · site in Russian",
        description:
          "A website for a repair centre: visitors pick what’s broken and call or message on WhatsApp right away. Address, map and reviews on one page.",
        alt: "Home screen of the BestElectronics repair centre website",
      },
      coffee: {
        name: "Zerno coffee shop",
        sector: "Cafés and restaurants",
        description:
          "A coffee shop website: menu with prices, opening hours and table booking in a couple of taps.",
        alt: "Home screen of the Zerno coffee shop website",
      },
      school: {
        name: "Shag learning centre",
        sector: "Education",
        description:
          "A language school website: courses, lesson formats and sign-up for a free trial lesson.",
        alt: "Home screen of the Shag learning centre website",
      },
      flowers: {
        name: "Flora flower studio",
        sector: "Flowers and gifts",
        description:
          "A bouquet showcase with prices and same-day delivery orders — no calls or long chats.",
        alt: "Home screen of the Flora flower studio website",
      },
      cleaning: {
        name: "Clean Home cleaning",
        sector: "Home services",
        description:
          "A cleaning service website: clear services and prices, and a quote based on photos of the space.",
        alt: "Home screen of the Clean Home cleaning service website",
      },
      fitness: {
        name: "Puls studio",
        sector: "Sport and wellbeing",
        description:
          "A fitness studio website: group class schedule and sign-up for a free first session.",
        alt: "Home screen of the Puls fitness studio website",
      },
    },
  },
  process: {
    title: "How we work",
    subtitle: "First we understand the task, then we build — no unnecessary stages.",
    steps: [
      {
        number: "01",
        title: "Discuss",
        text: "You tell us about your business and task. We suggest a solution and agree on the scope.",
      },
      {
        number: "02",
        title: "Build",
        text: "We build the website or prepare the ads, show you the result and make edits.",
      },
      {
        number: "03",
        title: "Launch",
        text: "We publish and check everything on phone and desktop. Support afterwards is optional.",
      },
    ],
  },
  stats: {
    title: "The studio in numbers",
    subtitle:
      "A small team that takes projects all the way to launch and stays in touch afterwards.",
    items: [
      { value: "48+", label: "websites launched" },
      { value: "7 days", label: "average time for a one-page site" },
      { value: "4.9", label: "average client rating" },
    ],
  },
  testimonials: {
    title: "What clients say",
    subtitle: "Business owners on how the work went and what changed after launch.",
    items: [
      {
        quote:
          "Guests used to ask for our menu and opening hours in DMs ten times a day. Now we just send a link to the site, and people book tables themselves. Done quickly and explained in plain words.",
        name: "Aigerim",
        role: "Owner, Zerno coffee shop",
      },
      {
        quote:
          "The site turned out simple and clear: parents find the schedule right away and book a trial lesson.",
        name: "Timur",
        role: "Director, Shag learning centre",
      },
      {
        quote: "Delivery orders now come straight through the website. Convenient for us and for customers.",
        name: "Madina",
        role: "Florist, Flora flower studio",
      },
      {
        quote: "They fixed up our old website and launched ads. Straight to the point, no fluff.",
        name: "Ruslan",
        role: "Clean Home cleaning",
      },
    ],
  },
  faq: {
    title: "FAQ",
    subtitle: "Briefly about pricing, preparation and how we work.",
    items: [
      {
        q: "How much does a website cost?",
        a: "A one-page website on a ready-made base is 1500 KGS. Other projects depend on the task: we discuss what you need first and only then name a price. Anything extra is agreed before work starts.",
      },
      {
        q: "What do I need to prepare?",
        a: "Tell us about your business, services and how customers can reach you. Send photos and a logo if you have them. If something is missing, we’ll tell you what to prepare.",
      },
      {
        q: "Can you improve my current website?",
        a: "Yes. Send us the link — we’ll see what is worth fixing or improving and suggest options.",
      },
      {
        q: "Do you guarantee leads from ads?",
        a: "No. We help prepare and launch ads, but results depend on many factors. The ad budget is paid separately.",
      },
    ],
  },
  contact: {
    title: "Let’s discuss your project",
    subtitle:
      "Tell us briefly about your business and task — we’ll reply on WhatsApp. You can also message or call us directly.",
    channels: {
      whatsapp: "WhatsApp",
      phone: "Phone",
      instagram: "Instagram",
    },
    form: {
      title: "Quick request",
      description:
        "Fill in the form and WhatsApp will open with a ready message. Check the text and send it yourself.",
      service: "What are you interested in",
      servicePlaceholder: "Choose a service",
      business: "What your business does",
      businessPlaceholder: "For example: a coffee shop in the city centre",
      task: "Task or link to your website",
      taskPlaceholder: "What needs to be done? If you already have a site, paste the link",
      optional: "optional",
      submit: "Continue in WhatsApp",
      errors: {
        service: "Choose what you’re interested in",
        task: "Describe the task in a few words",
      },
      opened: "WhatsApp opened in a new tab. Check the message and send it.",
      notOpened: "Didn’t open?",
      openManually: "Open WhatsApp with the message",
      fallback: "If the form doesn’t work, message us directly:",
    },
    services: {
      new: "New website",
      onepage: "One-page website for 1500 KGS",
      improve: "Improving an existing site",
      ads: "Ad campaigns",
      support: "Support and growth",
      consult: "Not sure yet — I need advice",
    },
    message: {
      greeting: "Hello! I’m writing from the MicroStudio website.",
      service: "Service",
      business: "Business",
      task: "Task",
    },
  },
  notFound: {
    text: "This page doesn’t exist. The link may be outdated.",
    home: "Back to home",
  },
  footer: {
    rights: "MicroStudio",
    social: "MicroStudio on social media and messengers",
    disclaimer:
      "Demo website. Projects (except BestElectronics), reviews, numbers and clients are fictional and shown as an example. The contact details are real.",
  },
  demo: {
    banner: "A project from the MicroStudio portfolio",
    bannerShort: "MicroStudio portfolio",
    back: "Back to work",
    ctaTitle: "Want a website like this for your business?",
    ctaText:
      "We’ll make a similar site with your services, prices and contacts. Message us to discuss the task and timing.",
    ctaButton: "Discuss a similar website",
    ctaMessage: "Hello! I liked the “{name}” website in the MicroStudio portfolio. I’d like to discuss a similar one.",
    madeBy: "Website by MicroStudio",
    disclaimer: "Demo project: the business, prices and contacts are fictional.",
    items: {
      coffee: {
        name: "Zerno",
        kind: "Coffee shop",
        title: "Coffee you’ll want every day",
        text: "Freshly roasted beans, breakfast until noon and cosy tables by the window. Book a seat or take your order to go.",
        primary: "Book a table",
        secondary: "See the menu",
        chips: ["Daily 8:00–22:00", "Takeaway", "Breakfast until 12:00"],
        menuTitle: "Menu",
        menu: [
          { title: "Cappuccino", text: "Double espresso and milk", meta: "180 KGS" },
          { title: "Flat white", text: "Rich and smooth", meta: "200 KGS" },
          { title: "Croissant", text: "Fresh pastry every morning", meta: "150 KGS" },
        ],
        widget: {
          title: "Book a table",
          rows: [
            { label: "Date", value: "Today" },
            { label: "Guests", value: "2" },
          ],
          optionsLabel: "Time",
          options: ["18:00", "19:00", "20:00"],
          button: "Book now",
        },
        stepsTitle: "How to order",
        steps: ["Pick items from the menu", "Tap “Book a table” or “Takeaway”", "Confirm the order on WhatsApp"],
      },
      school: {
        name: "Shag",
        kind: "Learning centre",
        title: "English for work, study and travel",
        text: "Small groups and one-to-one lessons. Start with a free trial lesson — we’ll find your level and format.",
        primary: "Book a trial lesson",
        secondary: "Courses",
        chips: ["Groups of up to 8", "Online and in person", "Free trial lesson"],
        menuTitle: "Courses",
        menu: [
          { title: "Conversational English", text: "Speaking practice from day one", meta: "Twice a week" },
          { title: "IELTS preparation", text: "Strategies and practice tests", meta: "3 months" },
          { title: "English for kids", text: "Playful format, ages 7–12", meta: "Groups" },
        ],
        widget: {
          title: "Trial lesson",
          rows: [
            { label: "Course", value: "Conversational" },
            { label: "Format", value: "Online" },
          ],
          optionsLabel: "Time",
          options: ["Mon 18:30", "Wed 19:00", "Sat 11:00"],
          button: "Sign up for free",
        },
        stepsTitle: "How to start",
        steps: ["Request a trial lesson", "Take a short placement test", "Choose a group and a convenient time"],
      },
      flowers: {
        name: "Flora",
        kind: "Flower studio",
        title: "Bouquets that speak for you",
        text: "Fresh bouquets for any occasion. Choose a ready one or describe your own — same-day delivery.",
        primary: "Order a bouquet",
        secondary: "Showcase",
        chips: ["Same-day delivery", "Free greeting card", "Photo before dispatch"],
        menuTitle: "Showcase",
        menu: [
          { title: "Tenderness", text: "Garden roses and eucalyptus", meta: "2,900 KGS" },
          { title: "Sunny", text: "Tulips and stock flowers", meta: "2,400 KGS" },
          { title: "Signature", text: "Made to your description", meta: "from 3,000 KGS" },
        ],
        widget: {
          title: "“Tenderness” bouquet",
          rows: [
            { label: "Delivery", value: "Today" },
            { label: "Card", value: "Free" },
          ],
          optionsLabel: "Size",
          options: ["S", "M", "L"],
          button: "Order · 2,900 KGS",
        },
        stepsTitle: "How to order",
        steps: ["Choose a bouquet from the showcase", "Add the delivery address and time", "Get a photo of the bouquet before dispatch"],
      },
      cleaning: {
        name: "Clean Home",
        kind: "Cleaning service",
        title: "Apartment and office cleaning, hassle-free",
        text: "We bring our own equipment and supplies. Send photos of the space and we’ll quote the price in advance.",
        primary: "Get a quote",
        secondary: "Services",
        chips: ["Own equipment", "Quote by photo", "Weekend cleaning"],
        menuTitle: "Services",
        menu: [
          { title: "Regular cleaning", text: "Dust, floors, kitchen and bathroom", meta: "from 2,500 KGS" },
          { title: "Deep cleaning", text: "All surfaces, windows inside", meta: "from 6,000 KGS" },
          { title: "After renovation", text: "Removing construction dust", meta: "by photo" },
        ],
        widget: {
          title: "Cleaning quote",
          rows: [
            { label: "Area", value: "60 m²" },
            { label: "Type", value: "Deep clean" },
          ],
          optionsLabel: "Day",
          options: ["Fri", "Sat", "Sun"],
          button: "Quote by photo",
        },
        stepsTitle: "How cleaning works",
        steps: ["Send photos and the address", "Agree on the price and time", "We clean, you check the result"],
      },
      fitness: {
        name: "Puls",
        kind: "Fitness studio",
        title: "Workouts you’ll want to come back to",
        text: "Small groups, attentive coaches and a convenient schedule. Your first session is free.",
        primary: "Book a session",
        secondary: "Schedule",
        chips: ["Groups of up to 10", "First session free", "Morning and evening"],
        menuTitle: "Schedule",
        menu: [
          { title: "Functional training", text: "Strength and endurance", meta: "Mon, Wed, Fri · 19:00" },
          { title: "Yoga", text: "Flexibility and recovery", meta: "Tue, Thu · 08:00" },
          { title: "Pilates", text: "Core and posture", meta: "Sat · 11:00" },
        ],
        widget: {
          title: "Book a class",
          rows: [
            { label: "Class", value: "Yoga" },
            { label: "Coach", value: "Alina" },
          ],
          optionsLabel: "Time",
          options: ["Tue 08:00", "Thu 08:00", "Sat 10:00"],
          button: "Book",
        },
        stepsTitle: "How to start",
        steps: ["Pick a class from the schedule", "Book your free session", "Come in — mats and towels provided"],
      },
    },
  },
};

export default en;
