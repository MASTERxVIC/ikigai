import Link from "next/link";
import SectionHead from "../../components/SectionHead";
import PageHero from "../../components/PageHero";
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

      <PageHero
        eyebrow="Services"
        title="Website Design, Software & Search Services"
        lead="One studio for custom software development, website design & development, e-commerce, and search visibility — SEO services, GEO and AEO — so the thing we build for you is also the thing your customers find. Pick one craft, or let the studio carry the whole wall."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              const num = `0${i + 1}`;
              return (
                <article className="svc-card glass-card" id={s.slug} key={s.slug} style={{ scrollMarginTop: 100 }}>
                  <span className="svc-ghost" aria-hidden="true">{num}</span>
                  <div className="svc-eyebrow"><span className="svc-ico"><Icon /></span> {s.title}</div>
                  <p style={{ fontSize: 15.5 }}>{s.desc}</p>
                  <ul className="svc-points">
                    {s.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  {s.note ? (
                    <p className="svc-note">
                      {s.note.text} <Link href={`/services#${s.note.linkSlug}`}>{s.note.linkLabel}</Link>.
                    </p>
                  ) : null}
                  <div className="mt-2">
                    <Link href="/contact" className="svc-pill">Start a project →</Link>
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
