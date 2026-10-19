import Link from "next/link";
import SectionHead from "../../components/SectionHead";
import Faq from "../../components/Faq";
import JsonLd from "../../components/JsonLd";
import HashScroll from "../../components/HashScroll";
import { SERVICE_ICONS } from "../../components/icons";
import { SERVICES, FAQS } from "../../lib/content";
import { faqSchema } from "../../lib/seo";

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

export default function Services() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
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

      <section className="dark-band" style={{ padding: "150px 0 70px" }}>
        <div className="container">
          <span className="eyebrow on-dark">Services</span>
          <h1 className="h-display" style={{ color: "#fff", marginTop: 14 }}>Everything digital,<br />under one roof.</h1>
          <p className="lead on-dark">Eight services. Zero hand-offs. You talk to the people who actually build it.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              const num = `0${i + 1}`;
              return (
                <article className="svc-card" id={s.slug} key={s.slug} style={{ scrollMarginTop: 100 }}>
                  <span className="svc-ghost" aria-hidden="true">{num}</span>
                  <div className="svc-eyebrow"><span className="svc-ico"><Icon /></span> {s.title}</div>
                  <p style={{ fontSize: 15.5 }}>{s.desc}</p>
                  <ul className="svc-points">
                    {s.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  <div className="mt-2">
                    <Link href="/contact" className="svc-pill">Get a quote →</Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="placeholder-note">Service descriptions are launch-ready drafts — Atul will refine with real offers and pricing later.</div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead center eyebrow="Service FAQ" title="Before you ask." />
          <Faq items={pageFaqs} />
        </div>
      </section>
    </>
  );
}
