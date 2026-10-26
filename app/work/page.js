import Link from "next/link";

import PageHero from "../../components/PageHero";
import WorkAccordion from "../../components/WorkAccordion";

export const metadata = {
  title: "Work",
  description:
    "Selected work from ikigaicoding — a full-stack travel platform, a movie discovery app, a motion-driven agency website and a client admin system. Proof, not promises.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | ikigaicoding",
    description:
      "Selected work from ikigaicoding — a full-stack travel platform, a movie discovery app, a motion-driven agency website and a client admin system. Proof, not promises.",
    url: "/work",
  },
};

export default function Work() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Our Work — Proof, Not Promises"
        lead="Real builds from the studio floor: a full-stack travel listing platform, a movie discovery app, a motion-driven agency website and a client admin system. Each one started as a goal with one eye painted in — and each one shipped."
      />

      <section className="section" style={{ overflowX: "clip" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <WorkAccordion />

          <div className="band-emerald cta-sec" style={{ borderRadius: 20, padding: "44px 30px", textAlign: "center", marginTop: 34 }}>
            <span className="cta-kanji left" aria-hidden="true">生き甲斐</span>
            <span className="cta-kanji right" aria-hidden="true">達磨</span>
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "var(--gold-light)", textTransform: "uppercase" }}>Your project here</span>
              <h2 className="h2" style={{ color: "#fff", marginTop: 12, fontSize: 32 }}>The next case study could be yours.</h2>
              <p style={{ color: "#cfe0d4", margin: "0 auto 22px", maxWidth: 440, fontSize: 15.5 }}>
                Tell us the goal and we will reply within 24 hours with clear next steps.
              </p>
              <Link href="/contact" className="btn btn-gold">Start a project →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
