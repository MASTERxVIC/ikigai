import Link from "next/link";
import { SERVICES, WHATSAPP_LINK, EMAIL } from "../lib/content";
import { IconWhatsApp, IconMail } from "./icons";

export default function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <div className="push-110">
            <div style={{ marginBottom: 16 }}>
              <img src="/assets/iconname.svg" alt="ikigaicoding logo" style={{ height: 54, width: "auto", display: "block", marginBottom: 10 }} />
              <div style={{ fontSize: 12, color: "#c9a86a", letterSpacing: 2 }}>FALL SEVEN TIMES, GET UP EIGHT</div>
            </div>
            <p style={{ fontSize: 14.5, color: "#b9cec0", maxWidth: 300 }}>
              Custom software, websites and search visibility — built with a Daruma&apos;s stubbornness: knocked down, back up, every time.
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
          <nav aria-label="Pages" className="push-105">
            <h4>Pages</h4>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/work">Work</Link>
            <Link href="/about" style={{ marginTop: 100 }}>About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
          <nav aria-label="Services" className="push-130 shift-right-more">
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services#${s.slug}`}>{s.title}</Link>
            ))}
          </nav>
          <nav aria-label="Legal" className="push-130 shift-right">
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
          </nav>
          <div className="push-130 shift-right">
            <h4>Contact</h4>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p style={{ fontSize: 14.5, color: "#b9cec0" }}>Tell us the goal — we reply within 24 hours with clear next steps.</p>
            <p style={{ fontSize: 13.5, color: "#8fa79a" }}>Prefer to talk first? Use the Book Call button and we&apos;ll set up a time.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ikigaicoding</span>
          <span style={{ color: "#e6cd96" }}>Fall seven times, get up eight.</span>
        </div>
      </div>
    </footer>
  );
}
