import { useEffect } from "react";
import { site } from "@/data/site";

export const siteUrl = "https://moryaplushospital.com";

const defaultKeywords = [
  site.keywords,
  "best multispeciality hospital in Kunjirwadi",
  "hospital near Pune Solapur Highway",
  "24x7 emergency hospital in Kunjirwadi",
  "ICU hospital in Kunjirwadi Pune",
  "cashless hospital in Kunjirwadi",
].join(", ");

export function getAbsoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}

function ensureMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`;
  const element = document.querySelector(selector) || document.head.appendChild(document.createElement("meta"));

  element.setAttribute(attribute, key);
  element.setAttribute("content", content);
  return element;
}

function ensureCanonical(url) {
  const element =
    document.querySelector('link[rel="canonical"]') ||
    document.head.appendChild(document.createElement("link"));

  element.setAttribute("rel", "canonical");
  element.setAttribute("href", url);
  return element;
}

export function hospitalSchema() {
  return {
    "@type": "Hospital",
    "@id": `${siteUrl}/#hospital`,
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    description: site.description,
    telephone: [site.phones.receptionTel, site.phones.emergencyTel],
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: "Kunjirwadi",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.score,
      reviewCount: site.rating.count,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    medicalSpecialty: [
      "Emergency",
      "CriticalCare",
      "Surgical",
      "Orthopedic",
      "Gynecologic",
      "Pediatric",
      "Diagnostic",
    ],
    sameAs: [site.instagram, site.maps.profile].filter(Boolean),
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#hospital`,
    },
  };
}

export function faqSchema(items = []) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function usePageMeta(title, description, options = {}) {
  const canonicalUrl = getAbsoluteUrl(options.path || window.location.pathname || "/");
  const keywords = options.keywords || defaultKeywords;
  const pageDescription = description || site.description;
  const pageType = options.type || "website";
  const imageUrl = options.image ? getAbsoluteUrl(options.image) : `${siteUrl}/favicon.svg`;
  const robots = options.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large";
  const schemaItems = Array.isArray(options.schema)
    ? options.schema
    : options.schema
      ? [options.schema]
      : [];
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [hospitalSchema(), websiteSchema(), ...schemaItems],
  });

  useEffect(() => {
    const previousTitle = document.title;

    document.title = title;
    ensureMeta("name", "description", pageDescription);
    ensureMeta("name", "keywords", keywords);
    ensureMeta("name", "robots", robots);
    ensureMeta("name", "author", site.name);
    ensureCanonical(canonicalUrl);

    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", pageDescription);
    ensureMeta("property", "og:type", pageType);
    ensureMeta("property", "og:url", canonicalUrl);
    ensureMeta("property", "og:site_name", site.name);
    ensureMeta("property", "og:image", imageUrl);

    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", title);
    ensureMeta("name", "twitter:description", pageDescription);
    ensureMeta("name", "twitter:image", imageUrl);

    const structuredDataScript =
      document.getElementById("morya-structured-data") ||
      document.head.appendChild(document.createElement("script"));
    structuredDataScript.id = "morya-structured-data";
    structuredDataScript.type = "application/ld+json";
    structuredDataScript.textContent = structuredData;

    return () => {
      document.title = previousTitle;
    };
  }, [canonicalUrl, imageUrl, keywords, pageDescription, pageType, robots, structuredData, title]);
}
