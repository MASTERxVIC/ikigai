import Link from "next/link";
import { SERVICES, WHATSAPP_LINK, EMAIL } from "../lib/content";
import { IconWhatsApp, IconMail, IconPin } from "./icons";

export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      {/* page-tear edge — torn paper into the emerald footer */}
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true" style={{ display: "block", width: "100%", height: 56, marginBottom: -1 }}>
        <path d="M0,70 L0,40 L45,32 L90,44 L140,34 L190,46 L240,34 L290,44 L340,32 L390,44 L440,34 L490,46 L540,34 L590,44 L640,32 L690,44 L740,34 L790,46 L840,34 L890,44 L940,32 L990,44 L1040,34 L1090,46 L1140,34 L1190,44 L1240,32 L1290,44 L1340,34 L1390,42 L1440,34 L1440,70 Z" fill="#0b2e21" opacity="0.55" />
        <path d="M0,70 L0,48 L60,40 L120,50 L180,42 L250,52 L310,42 L380,52 L440,42 L510,52 L570,42 L640,52 L700,42 L770,52 L830,42 L900,52 L960,42 L1030,52 L1090,42 L1160,52 L1220,42 L1290,52 L1350,42 L1440,50 L1440,70 Z" fill="#071f15" />
      </svg>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="/assets/iconname.svg" alt="ikigaicoding logo" style={{ height: 54, width: "auto", display: "block", marginBottom: 10 }} />
              <div style={{ fontSize: 12, color: "#c9a86a", letterSpacing: 2 }}>FALL SEVEN TIMES, GET UP EIGHT</div>
            </div>
            <p style={{ fontSize: 14.5, color: "#b9cec0", maxWidth: 300 }}>
              Custom software, websites and search visibility for businesses that refuse to give up.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener" aria-label="WhatsApp"
                 style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(201,168,106,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e6cd96" }}>
                <IconWhatsApp />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email"
                 style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(201,168,106,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#e6cd96" }}>
                <IconMail />
              </a>
            </div>
          </div>
          <nav aria-label="Services">
            <h4>Services</h4>
            {SERVICES.slice(0, 5).map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`}>{s.title}</Link>
            ))}
          </nav>
          <nav aria-label="Pages">
            <h4>ikigai</h4>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div>
            <h4>Start a project</h4>
            <p style={{ fontSize: 14.5, color: "#b9cec0" }}>Tell us what you want to build. We reply within 24 hours.*</p>
            <p style={{ fontSize: 13.5, color: "#8fa79a", display: "flex", gap: 8, alignItems: "center" }}><IconPin /> India · working worldwide</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener" className="btn btn-gold" style={{ marginTop: 12, fontSize: 14, padding: "12px 22px" }}>
              <IconWhatsApp /> WhatsApp Us
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ikigaicoding. All rights reserved.</span>
          <span>*Placeholder contact details — real ones coming soon.</span>
        </div>
      </div>
    </footer>
  );
}
