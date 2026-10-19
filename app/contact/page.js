import ContactForm from "../../components/ContactForm";
import { IconWhatsApp, IconMail, IconPin } from "../../components/icons";
import { WHATSAPP_LINK, EMAIL } from "../../lib/content";

export const metadata = {
  title: "Contact",
  description:
    "Start your project with ikigaicoding — custom software, websites, SEO, GEO, AEO. We reply within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | ikigaicoding",
    description:
      "Start your project with ikigaicoding — custom software, websites, SEO, GEO, AEO. We reply within 24 hours.",
    url: "/contact",
  },
};

export default function Contact() {
  return (
    <>
      <section className="dark-band" style={{ padding: "150px 0 70px" }}>
        <div className="container">
          <span className="eyebrow on-dark">Contact</span>
          <h1 className="h-display" style={{ color: "#fff", marginTop: 14 }}>Let&apos;s paint<br />the first eye.</h1>
          <p className="lead on-dark">Tell us about your project. We reply within 24 hours with honest next steps.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="form-card">
            <ContactForm />
          </div>
          <div>
            <h2 className="h3">Prefer direct?</h2>
            <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="wa-btn"><IconWhatsApp /> Chat on WhatsApp</a>
              <div className="card" style={{ padding: 22 }}>
                <p style={{ display: "flex", gap: 10, alignItems: "center", margin: "0 0 10px" }}><IconMail /> {EMAIL}*</p>
                <p style={{ display: "flex", gap: 10, alignItems: "center", margin: 0 }}><IconPin /> India · working worldwide</p>
              </div>
              <div className="card" style={{ padding: 22, background: "linear-gradient(135deg,#0b2e21,#155a3e)", border: "none" }}>
                <h3 style={{ color: "#fff", marginBottom: 8 }}>What happens next?</h3>
                <ol style={{ color: "#d7e4da", fontSize: 14.5, margin: 0, paddingLeft: 20 }}>
                  <li>You send the enquiry (2 minutes).</li>
                  <li>We reply within 24 hours with questions or a quote.</li>
                  <li>We agree on scope, timeline and price — then we build.</li>
                </ol>
              </div>
            </div>
            <div className="placeholder-note">*Placeholder email & number — Atul will replace with real contact details.</div>
          </div>
        </div>
      </section>
    </>
  );
}
