import Link from "next/link";
import SectionHead from "../components/SectionHead";
import WhatWeDoArt from "../components/WhatWeDoArt";
import Faq from "../components/Faq";
import JsonLd from "../components/JsonLd";
import { IconArrow, IconWhatsApp } from "../components/icons";
import WorkCard from "../components/WorkCard";
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

      {/* SERVICES — reference design */}
      <section className="section section-art ref-services" aria-label="Services">
        <WhatWeDoArt />
        <span className="ref-vert left" aria-hidden="true">生き甲斐</span>
        <span className="ref-vert right" aria-hidden="true">達磨</span>
        <div className="container">
          <div className="ref-shead">
            <img src="/assets/rope.svg" alt="" aria-hidden="true" className="ref-rope" />
            <span className="ref-eyebrow">What we do</span>
            <h2>Eight crafts. One obsession: results.</h2>
            <p>Every engagement hangs in the same hall — pick one craft, or let the studio carry the whole wall.</p>
          </div>
          <div className="ref-svc-grid">
            {SERVICES.map((s, i) => (
              <article className="ref-svc" key={s.slug}>
                <img src="/assets/rope.svg" alt="" aria-hidden="true" className="ref-card-rope" />
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <div className="ref-ghost" aria-hidden="true">{i + 1}</div>
                <Link href={`/services#${s.slug}`} className="ref-pill">Learn more</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DARUMA STORY BAND */}
      <section className="dark-band section" aria-label="The Daruma story">
        <div className="container">
          <div className="story-grid">
          <div className="pillar-frame">
            <div className="daruma-sway" style={{ display: "inline-block" }}>
              <img src="/assets/icon.svg" alt="ikigaicoding Daruma logo" style={{ height: 190, width: "auto", display: "block", margin: "0 auto" }} />
            </div>
            <p style={{ color: "#e6cd96", letterSpacing: 3, fontSize: 12, fontWeight: 700, marginTop: 18 }}>DARUMA · 達磨</p>
          </div>
          <div>
            <span className="eyebrow on-dark">Why a Daruma?</span>
            <h2 className="h2" style={{ color: "#fff", marginTop: 14 }}>Perseverance,<br />painted in green and gold.</h2>
            <p className="lead on-dark">
              In Japan, a Daruma is how a goal begins. You paint in <strong style={{ color: "#fff" }}>one eye
              when you set the goal</strong> — a promise to yourself, kept in plain sight. The second eye stays
              blank until the work is done, a daily reminder that the goal is still waiting for its other half.
            </p>
            <p className="lead on-dark">
              Our Daruma wears its craft openly: <strong style={{ color: "#fff" }}>{"{}"} code brackets for eyes</strong>,
              because code is how we keep promises now, and a <strong style={{ color: "#fff" }}>hachimaki headband</strong> —
              the knot tied for hard work and focus. Knock it down and its weighted base rolls it upright, every
              single time. That is the whole philosophy of this studio.
            </p>
            <Link href="/about" className="btn btn-gold mt-2">Read Our Story <IconArrow /></Link>
          </div>
          </div>
          <div className="eye-row">
            <div className="eye">
              <b>Eye one</b>
              <p>Painted at kickoff — your goal, written down and agreed.</p>
            </div>
            <div className="eye">
              <b>The work</b>
              <p>Design, build, rank, refine — we keep rising until it works.</p>
            </div>
            <div className="eye">
              <b>Eye two</b>
              <p>Painted at launch — the goal achieved, the pair complete.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORK — reference design */}
      <section className="section ref-work" aria-label="Selected work">
        <div className="container">
          <div className="ref-shead">
            <img src="/assets/rope.svg" alt="" aria-hidden="true" className="ref-rope" />
            <span className="ref-eyebrow">Selected work</span>
            <h2>Proof, not promises.</h2>
            <p>Real builds from the studio floor — each one a Daruma that got back up.</p>
          </div>
          <div className="ref-proj-grid">
            {PROJECTS.map((p) => (
              <WorkCard key={p.slug} p={p} />
            ))}
          </div>
          <div className="center mt-4">
            <Link href="/work" className="btn btn-dark">View All Work <IconArrow /></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="dark-band section testimonials" aria-label="Testimonials">
        <img className="bonsai-wm" src="/assets/bonsai-watermark.png" alt="" aria-hidden="true" />
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
      <section className="section" id="faq" aria-label="Frequently asked questions">
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead center eyebrow="Questions" title="Before you ask." lead="Straight answers, no sales-speak. These are also structured for Google and AI search (AEO)." />
          <Faq items={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="band-emerald section" aria-label="Call to action">
        <div className="container center">
          <span className="eyebrow on-dark">Begin</span>
          <h2 className="h2" style={{ color: "#fff", marginTop: 14 }}>Have a goal? Let&apos;s paint the first eye.</h2>
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
