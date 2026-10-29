"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [swooshLink, setSwooshLink] = useState(null);
  const [swooshTick, setSwooshTick] = useState(0);
  const pathname = usePathname();

  // Click swoosh, same mechanism as the /work titles: label slides + 3 gold
  // clones trail it. State-driven (not DOM classes) so client-side navigation
  // can't wipe it mid-animation, and the tick remount restarts it on re-click.
  const fireSwoosh = (to) => {
    setSwooshTick((t) => t + 1);
    setSwooshLink(to);
    setTimeout(() => setSwooshLink((cur) => (cur === to ? null : cur)), 700);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="ikigaicoding home">
          <img src="/assets/iconname.svg" alt="ikigaicoding" style={{ height: 42, width: "auto", display: "block" }} />
        </Link>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>
        <div className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map((l) => {
            const isSw = swooshLink === l.to;
            return (
              <Link key={l.to} href={l.to} className={(pathname === l.to ? "active" : "") + (isSw ? " swooshing" : "")} onClick={() => fireSwoosh(l.to)}>
                <span key={swooshTick} className={isSw ? "nav-label swoosh" : "nav-label"}>{l.label}</span>
                <span key={swooshTick + "-c1"} className="nav-clone c1" aria-hidden="true">{l.label}</span>
                <span key={swooshTick + "-c2"} className="nav-clone c2" aria-hidden="true">{l.label}</span>
                <span key={swooshTick + "-c3"} className="nav-clone c3" aria-hidden="true">{l.label}</span>
              </Link>
            );
          })}
          <Link className="nav-cta" href="/contact">Book Call →</Link>
        </div>
      </div>
    </nav>
  );
}
