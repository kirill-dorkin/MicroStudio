import { formatPhone, site, type Locale } from "@/config/site";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inline; "<" is escaped so content can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const abs = (path: string) => `${site.siteUrl}${path}`;

export function organizationLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": abs("/#organization"),
        name: site.name,
        url: abs(`/${locale}`),
        logo: abs("/icon.svg"),
        description,
        sameAs: [site.instagram],
        ...(site.whatsappE164
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                telephone: formatPhone(site.whatsappE164).replace(/\s/g, ""),
                contactType: "customer service",
                availableLanguage: ["Russian", "English"],
              },
            }
          : {}),
      },
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        name: site.name,
        url: abs(`/${locale}`),
        inLanguage: locale,
        publisher: { "@id": abs("/#organization") },
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function serviceLd(name: string, description: string, path: string, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: abs(path),
    inLanguage: locale,
    provider: { "@id": abs("/#organization") },
  };
}

export function faqLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export function blogPostingLd(p: {
  title: string;
  description: string;
  path: string;
  date: string;
  locale: Locale;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: abs(p.path),
    mainEntityOfPage: abs(p.path),
    datePublished: p.date,
    inLanguage: p.locale,
    image: abs(p.image),
    author: { "@id": abs("/#organization") },
    publisher: { "@id": abs("/#organization") },
  };
}
