import Link from "next/link";
import SectionHead from "../components/SectionHead";
import Faq from "../components/Faq";
import Daruma from "../components/Daruma";
import JsonLd from "../components/JsonLd";
import { IconArrow, IconWhatsApp, SERVICE_ICONS } from "../components/icons";
import { SERVICES, PROJECTS, FAQS, TESTIMONIALS, STATS, WHATSAPP_LINK } from "../lib/content";
import { orgSchema, faqSchema, SITE_URL } from "../lib/seo";

export const metadata = {
  title: "ikigaicoding — Custom Software, Websites & Search (SEO · GEO · AEO)",
  description:
    "ikigaicoding builds custom software, high-converting websites and search visibility (SEO, GEO, AEO). Fall seven times, get up eight — we ship until it works.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ikigaicoding — Custom Software, Websites & Search (SEO · GEO · AEO)",
    description:
      "ikigaicoding builds custom software, high-converting websites and search visibility (SEO, GEO, AEO). Fall seven times, get up eight — we ship until it works.",
    url: "/",
  },
};

export default function Home() {
  const schema = [
    orgSchema,
    { "@context": "https://schema.org", "@type": "WebSite", name: "ikigaicoding", url: SITE_URL },
    faqSchema(FAQS),
  ];

  return (
    <>
      {schema.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}

      {/* HERO — the emerald hall */}
      <header className="hero">
        <div className="container hero-content">
          <span className="hero-eyebrow">Custom Software · Websites · Search</span>
          <h1 className="h-display">Fall seven times.<br /><em>Get up eight.</em></h1>
          <p className="sub">
            We build custom software, websites that convert, and search visibility
            (SEO, GEO, AEO) for businesses that refuse to give up — like the Daruma,
            we keep rising until it works.
          </p>
          <div className="hero-ctas">
            <Link href="/contact" className="btn btn-gold">Book Call <IconArrow /></Link>
            <Link href="/work" className="btn btn-outline">Explore</Link>
          </div>
          <div className="hero-stats" aria-label="Highlights">
            {STATS.map((s) => (
              <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>Scroll</span><i /></div>
      </header>

      {/* TRUST STRIP */}
      <div className="band-emerald section-sm" style={{ borderTop: "3px solid #c9a86a" }}>
        <div className="container" style={{ display: "flex", gap: 26, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 17, maxWidth: 520 }}>
            One studio for everything digital — <span style={{ color: "#e6cd96" }}>software, websites, and being found.</span>
          </p>
          <Link href="/services" className="btn btn-gold">Explore 8 Services <IconArrow /></Link>
        </div>
      </div>

      {/* SERVICES */}
      <section className="section" aria-label="Services">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Eight crafts. One obsession: results."
            lead="From the first line of code to the first page of Google — every service exists for one reason: your business growing."
          />
          <div className="grid grid-4">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              const num = `0${i + 1}`;
              return (
                <article className="svc-card svc-compact" key={s.slug}>
                  <span className="svc-ghost" aria-hidden="true">{num}</span>
                  <div className="svc-eyebrow"><span className="svc-ico"><Icon /></span> {s.title}</div>
                  <p>{s.short}</p>
                  <Link href={`/services#${s.slug}`} className="svc-pill">Learn more →</Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DARUMA STORY BAND */}
      <section className="dark-band section" aria-label="The Daruma story">
        <div className="container story-grid">
          <div className="pillar-frame">
            <div className="daruma-sway" style={{ display: "inline-block" }}>
              <Daruma size={170} body="#f7f2e5" line="#f7f2e5" band="#c9a86a" />
            </div>
            <p style={{ color: "#e6cd96", letterSpacing: 3, fontSize: 12, fontWeight: 700, marginTop: 18 }}>DARUMA · 達磨</p>
          </div>
          <div>
            <span className="eyebrow on-dark">Why a Daruma?</span>
            <h2 className="h2" style={{ color: "#fff", marginTop: 14 }}>Perseverance,<br />painted in green and gold.</h2>
            <p className="lead on-dark">
              The Daruma is a traditional Japanese doll and a symbol of perseverance —
              <strong style={{ color: "#fff" }}> fall seven times, get up eight.</strong> In
              Japan, you paint one eye when you set a goal, and the other when you achieve it.
            </p>
            <p className="lead on-dark">
              That is exactly how we build: we set the goal with you, and we don&apos;t stop
              until both eyes are painted. Our twist — <strong style={{ color: "#fff" }}>{"{}"} code brackets for eyes</strong> and
              a <strong style={{ color: "#fff" }}>hachimaki headband</strong> for hard work and focus.
            </p>
            <Link href="/about" className="btn btn-gold mt-2">Read Our Story <IconArrow /></Link>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="section" aria-label="Selected work">
        <div className="container">
          <SectionHead
            eyebrow="Selected work"
            title="Proof, not promises."
            lead="Every project below started as a conversation like yours. (Placeholders for now — real case studies ship with real launches.)"
          />
          <div className="grid grid-4">
            {PROJECTS.map((p) => (
              <article className="work-card" key={p.title}>
                <div className="work-visual" style={{ background: p.color }}>{p.title.split(" ")[0]}</div>
                <div className="work-body">
                  <span className="tag">{p.tag}</span>
                  <h3 className="mt-2">{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="center mt-4">
            <Link href="/work" className="btn btn-dark">View All Work <IconArrow /></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="dark-band section" aria-label="Testimonials">
        <div className="container">
          <SectionHead dark eyebrow="Kind words*" title="Clients on the record." lead="*Placeholder testimonials — your words could headline this section next." />
          <div className="grid grid-3">
            {TESTIMONIALS.map((t, i) => (
              <blockquote className="testimonial" key={i} style={{ margin: 0 }}>
                <p>&quot;{t.quote}&quot;</p>
                <cite>— {t.name}, {t.role}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-label="Frequently asked questions">
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead center eyebrow="FAQ" title="Questions? Answered." lead="Straight answers, no sales-speak. These are also structured for Google and AI search (AEO)." />
          <Faq items={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="band-emerald section" aria-label="Call to action">
        <div className="container center">
          <h2 className="h2" style={{ color: "#fff" }}>Have a goal? Let&apos;s paint the first eye.</h2>
          <p className="lead on-dark" style={{ margin: "0 auto 28px" }}>Tell us what you want to build. Within 24 hours you&apos;ll have clear next steps — in plain words, zero pressure.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-gold">Book Call <IconArrow /></Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="wa-btn"><IconWhatsApp /> WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
