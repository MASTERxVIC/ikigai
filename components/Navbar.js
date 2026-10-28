"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          {NAV_LINKS.map((l) => (
            <Link key={l.to} href={l.to} className={pathname === l.to ? "active" : ""}>
              {l.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/contact">Book Call →</Link>
        </div>
      </div>
    </nav>
  );
}
