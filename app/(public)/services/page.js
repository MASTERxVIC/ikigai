import SectionHead from "../../../components/SectionHead";
import PageHero from "../../../components/PageHero";
import Faq from "../../../components/Faq";
import FaqMandala from "../../../components/FaqMandala";
import JsonLd from "../../../components/JsonLd";
import HashScroll from "../../../components/HashScroll";
import { LiveServicesGrid } from "../../../components/LiveSections";
import { FAQS } from "../../../lib/content";
import { getServices } from "../../../lib/content-db";
import { faqSchema } from "../../../lib/seo";

export const metadata = {
  title: "Services",
  description:
    "Custom software, websites, e-commerce, SEO, GEO, AEO, landing pages and maintenance — eight services from one studio obsessed with results.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | ikigaicoding",
    description:
      "Custom software, websites, e-commerce, SEO, GEO, AEO, landing pages and maintenance — eight services from one studio obsessed with results.",
    url: "/services",
  },
};

const pageFaqs = [
  { q: "Which service should I start with?", a: "If you sell online, start with a website or landing page. If search traffic matters, add SEO/GEO/AEO. If your team drowns in manual work, start with custom software. Not sure? Message us — we will tell you honestly, even if the answer is 'you don't need us yet'." },
  { q: "Do you work with startups or only established businesses?", a: "Both. Startups get lean, launch-fast builds; established businesses get systems that scale. The common thread: owners who want results, not just deliverables." },
  ...FAQS.slice(0, 4),
];

export default async function Services() {
  // Data comes from MongoDB via lib/content-db.js, falling back to the
  // static copy in lib/content.js when the DB is missing/empty.
  const services = await getServices();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title,
      description: s.short,
      provider: { "@type": "ProfessionalService", name: "ikigaicoding" },
    })),
  };

  return (
    <>
      <HashScroll />
      <JsonLd data={itemList} />
      <JsonLd data={faqSchema(pageFaqs)} />

      <PageHero
        eyebrow="Services"
        title="Website Design, Software & Search Services"
        lead="One studio for custom software development, website design & development, e-commerce, and search visibility — SEO services, GEO and AEO — so the thing we build for you is also the thing your customers find. Pick one craft, or let the studio carry the whole wall."
      />

      <section className="section">
        <div className="container">
          <LiveServicesGrid initialServices={services} />
          <div className="placeholder-note">Service descriptions are launch-ready drafts — Atul will refine with real offers and pricing later.</div>
        </div>
      </section>

      <section className="section-sm faq-sec" style={{ background: "#fff" }}>
        <div className="faq-mandala left" aria-hidden="true">
          <FaqMandala />
        </div>
        <div className="faq-mandala right" aria-hidden="true">
          <FaqMandala />
        </div>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead center eyebrow="Service FAQ" title="Before you ask." />
          <Faq items={pageFaqs} />
        </div>
      </section>
    </>
  );
}
