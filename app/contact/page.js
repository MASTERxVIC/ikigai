import Link from "next/link";
import ContactForm from "../../components/ContactForm";
import FaqMandala from "../../components/FaqMandala";
import PageHero from "../../components/PageHero";
import { IconMail, IconPin } from "../../components/icons";
import { EMAIL } from "../../lib/content";

export const metadata = {
  title: "Contact",
  description:
    "Tell ikigaicoding what you want to build — custom software, a website that converts, an online store, or search visibility. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | ikigaicoding",
    description:
      "Tell ikigaicoding what you want to build — custom software, a website that converts, an online store, or search visibility. We reply within 24 hours.",
    url: "/contact",
  },
};

const NEXT_STEPS = [
  { t: "You send the enquiry", d: "Two minutes, in your own words — rough is fine." },
  { t: "We reply within 24 hours", d: "With questions where we need clarity, or a quote where we don't." },
  { t: "We agree, then we build", d: "Scope, timeline and price in writing first — then the first eye gets painted." },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Paint the First Eye"
        lead="Tell us what you want to build — custom software, a website that converts, an online store, or search visibility that compounds. Two minutes now, a clear reply within 24 hours."
      />

      <section className="section faq-sec">
                <div className="faq-mandala left" aria-hidden="true">
                              <FaqMandala />
          </div>
                          <div className="faq-mandala right" aria-hidden="true">
                              <FaqMandala />
          </div>
        <div className="container contact-grid">
          <div className="form-card">
            <ContactForm />
          </div>
          <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
            <div className="card">
              <h2 className="h3">Talk to us directly</h2>
              <p style={{ marginTop: 10 }}>
                Email is the fastest way to reach the studio:
              </p>
              <p style={{ display: "flex", gap: 10, alignItems: "center", margin: "0 0 12px" }}>
                <IconMail /> <a href={`mailto:${EMAIL}`} style={{ fontWeight: 700, color: "var(--emerald-700)" }}>{EMAIL}</a>
              </p>
              <p>Prefer to talk first? Use any Book Call button and we&apos;ll set up a time.</p>
              <p style={{ display: "flex", gap: 10, alignItems: "center", margin: 0 }}>
                <IconPin /> <span><strong style={{ color: "var(--ink)" }}>India</strong> · working worldwide</span>
              </p>
            </div>

            <div className="card">
              <h2 className="h3">What happens next</h2>
              <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
                {NEXT_STEPS.map((s, i) => (
                  <p key={s.t} style={{ margin: 0 }}>
                    <strong style={{ color: "var(--ink)" }}>{i + 1}. {s.t}</strong>
                    <br />{s.d}
                  </p>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="h3">Not sure what you need?</h2>
              <p style={{ marginTop: 10, marginBottom: 0 }}>
                Start with the <Link href="/services" style={{ fontWeight: 700, color: "var(--emerald-700)" }}>services overview</Link> —
                eight crafts, one studio — or look at <Link href="/work" style={{ fontWeight: 700, color: "var(--emerald-700)" }}>work we have already shipped</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
