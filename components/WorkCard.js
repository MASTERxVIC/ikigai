"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Selected Work card — Figma design (Wanderlust editable project card):
// blurred ghost monogram + gold flying birds in the header, faint bamboo
// grass along the body, and the scroll-roll hover: on hover the body
// content rolls up out of the top and the same content re-enters from
// below; on hover-out it stays as-is, and the next hover rolls again.
export default function WorkCard({ p }) {
  const cardRef = useRef(null);
  const rollRef = useRef(null);
  const trackRef = useRef(null);
  const firstRef = useRef(null);

  const sync = () => {
    if (rollRef.current && firstRef.current) {
      rollRef.current.style.height = firstRef.current.offsetHeight + "px";
    }
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const onEnter = () => {
    sync();
    const h = firstRef.current.offsetHeight;
    trackRef.current.style.transition = "transform .9s cubic-bezier(.45,0,.2,1)";
    trackRef.current.style.transform = `translateY(${-h}px)`;
  };

  const onLeave = () => {
    // Both copies are identical, so snapping back without animation is
    // invisible — hover-out leaves everything as-is, next hover rolls again.
    trackRef.current.style.transition = "none";
    trackRef.current.style.transform = "translateY(0)";
  };

  const body = (hidden) => (
    <>
      <p>{p.desc}</p>
      <div className="ref-chips">
        {p.chips.map((c) => (
          <span className="ref-chip" key={c}>{c}</span>
        ))}
      </div>
      {p.live ? (
        <a href={p.live} target="_blank" rel="noopener" className="ref-proj-link" tabIndex={hidden ? -1 : undefined}>Visit live site →</a>
      ) : null}
      <Link href={`/work#case-${p.slug}`} className="ref-proj-link" tabIndex={hidden ? -1 : undefined}>Read the case study →</Link>
    </>
  );

  return (
    <article className="ref-proj" ref={cardRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="ref-proj-top">
        {/* Ghost monogram — Figma inner shadow, NOT a blur: X -16, Y 5,
            blur 14.9, black 25% (scaled to the live font size). CSS cannot
            do a true inner shadow on text, so this is a real SVG filter. */}
        <svg className="ref-glyph-svg" aria-hidden="true">
          <defs>
            <filter id={`glyph-shadow-${p.monogram}`} x="-30%" y="-30%" width="160%" height="160%">
              <feOffset dx="-9" dy="3" />
              <feGaussianBlur stdDeviation="8.5" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="#000000" floodOpacity="0.25" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <text x="248" y="185" textAnchor="end" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="220" fill="#FEFFFF" opacity="0.69" filter={`url(#glyph-shadow-${p.monogram})}`}>{p.monogram}</text>
        </svg>
        <img className="ref-bird ref-bird-sm" src="/assets/flying-bird.svg" alt="" aria-hidden="true" />
        <img className="ref-bird ref-bird-lg" src="/assets/flying-bird.svg" alt="" aria-hidden="true" />
        <span className="ref-kind">{p.category}</span>
        <h3>{p.title}</h3>
        <p className="ref-tag">{p.subtitle}</p>
      </div>
      <div className="ref-proj-body">
        <img className="ref-bamboo" src="/assets/bamboo-grass.svg" alt="" aria-hidden="true" />
        <div className="ref-roll" ref={rollRef}>
          <div className="ref-roll-track" ref={trackRef}>
            <div className="ref-roll-copy" ref={firstRef}>{body(false)}</div>
            <div className="ref-roll-copy" aria-hidden="true">{body(true)}</div>
          </div>
        </div>
      </div>
      <div className="ref-plinth" aria-hidden="true"><i /><b /></div>
    </article>
  );
}
