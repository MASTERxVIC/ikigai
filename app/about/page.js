import Link from "next/link";
import SectionHead from "../../components/SectionHead";
import JsonLd from "../../components/JsonLd";
import { IconArrow, IconCheck } from "../../components/icons";

export const metadata = {
  title: "About",
  description:
    "The story of ikigaicoding — a studio named after purpose, marked by the Daruma: fall seven times, get up eight.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | ikigaicoding",
    description:
      "The story of ikigaicoding — a studio named after purpose, marked by the Daruma: fall seven times, get up eight.",
    url: "/about",
  },
};

const VALUES = [
  { t: "Perseverance over talent", d: "Talent starts projects. Perseverance ships them. We are the studio that stays until it works." },
  { t: "Honesty over hype", d: "If you don't need us, we will say so. If a cheaper path exists, we will point at it." },
  { t: "Proof over promises", d: "We measure, report and show numbers. Beautiful words never replaced a working checkout." },
  { t: "Craft over shortcuts", d: "Fast is good. Fast and right is better. We don't ship what we wouldn't sign." },
];

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: { "@type": "ProfessionalService", name: "ikigaicoding", slogan: "Fall seven times, get up eight." },
  };

  return (
    <>
      <JsonLd data={schema} />

      <section className="dark-band" style={{ padding: "150px 0 70px" }}>
        <div className="container">
          <span className="eyebrow on-dark">About</span>
          <h1 className="h-display" style={{ color: "#fff", marginTop: 14 }}>Named after purpose.<br />Marked by perseverance.</h1>
          <p className="lead on-dark"><strong style={{ color: "#fff" }}>Ikigai</strong> — the Japanese idea of a reason for being. <strong style={{ color: "#fff" }}>Coding</strong> — our craft. Together: building with purpose, and never giving up.</p>
        </div>
      </section>

      <section className="section">
        <div className="container story-grid">
          <div className="pillar-frame">
            <img src="/assets/riconname.svg" alt="ikigaicoding Daruma logo — Daruma doll with code-bracket eyes and hachimaki headband" style={{ maxWidth: 440, width: "100%", margin: "0 auto", display: "block" }} />
            <p style={{ color: "#e6cd96", letterSpacing: 2, fontSize: 12, fontWeight: 700, marginTop: 18 }}>THE OFFICIAL MARK</p>
          </div>
          <div>
            <SectionHead eyebrow="The Daruma story" title="Fall seven times, get up eight." />
            <p className="lead">The Daruma is a traditional Japanese doll — a symbol of perseverance and never giving up. In Japan, the idea is simple: <strong>fall, and rise again.</strong></p>
            <p className="lead">That is why it fits ikigai perfectly — ikigai is also about purpose, and about keeping at it. Our logo&apos;s twist: <strong>{"{}"} code brackets for eyes</strong>, and a <strong>hachimaki headband</strong> — the Japanese symbol of hard work and focus.</p>
            <p className="lead">Every project gets the Daruma treatment: one eye painted at kickoff, the second when your goal is achieved. We don&apos;t stop in between.</p>
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: "#fff" }}>
        <div className="container">
          <SectionHead center eyebrow="What we stand for" title="Four values. Zero compromise." />
          <div className="grid grid-4">
            {VALUES.map((v, i) => (
              <div className="card" key={v.t}>
                <span className="num">0{i + 1}</span>
                <h3 className="mt-2">{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-emerald section">
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 30, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div className="daruma-sway"><img src="/assets/ricon.svg" alt="ikigaicoding Daruma logo" style={{ height: 92, width: "auto", display: "block" }} /></div>
            <div>
              <h2 className="h2" style={{ color: "#fff", marginBottom: 6 }}>Like the studio? Work with the studio.</h2>
              <p style={{ color: "#d7e4da", margin: 0, display: "flex", alignItems: "center", gap: 8 }}><IconCheck /> Reply within 24 hours. Honest quote. No jargon.</p>
            </div>
          </div>
          <Link href="/contact" className="btn btn-gold">Book Call <IconArrow /></Link>
        </div>
      </section>
    </>
  );
}
