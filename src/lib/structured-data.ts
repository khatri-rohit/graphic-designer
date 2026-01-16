import { siteConfig } from "@/config/seo";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    jobTitle: siteConfig.creator.jobTitle,
    description: siteConfig.creator.description,
    sameAs: siteConfig.creator.sameAs,
    knowsAbout: siteConfig.keywords,
    email: siteConfig.author.email,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.author.name,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/img/favicon-96x96.png`,
    description: siteConfig.description,
    founder: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.author.email,
      contactType: "Customer Service",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function generateProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} - Creative Design Services`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: "",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "India",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6139,
      longitude: 77.209,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: siteConfig.creator.sameAs,
  };
}

export function generateCreativeWorkSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    creator: {
      "@type": "Person",
      name: siteConfig.author.name,
      jobTitle: siteConfig.creator.jobTitle,
    },
    keywords: siteConfig.keywords.join(", "),
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function generateOfferCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Creative Design Services",
    description:
      "Professional VFX, Graphic Design, and Motion Graphics Services",
    itemListElement: siteConfig.services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "Person",
          name: siteConfig.author.name,
        },
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getAllStructuredData() {
  return [
    generatePersonSchema(),
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateProfessionalServiceSchema(),
    generateCreativeWorkSchema(),
    generateOfferCatalogSchema(),
    generateBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "About", url: `${siteConfig.url}/#about` },
      { name: "Services", url: `${siteConfig.url}/#services` },
      { name: "Experience", url: `${siteConfig.url}/#experience` },
      { name: "Contact", url: `${siteConfig.url}/#contact` },
    ]),
  ];
}
