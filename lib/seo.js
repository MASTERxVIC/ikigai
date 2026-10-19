export const SITE_URL = "https://ikigaicoding.com"; // placeholder domain
export const SITE_NAME = "ikigaicoding";

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Custom software, websites and search visibility (SEO, GEO, AEO) for businesses that refuse to give up.",
  slogan: "Fall seven times, get up eight.",
  areaServed: "IN",
  priceRange: "₹₹",
};

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
