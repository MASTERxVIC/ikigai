"use client";

import { useEffect, useState } from "react";

// Testimonials: desktop keeps the 3-column grid (see .testi-track in
// globals.css); on tablet/mobile the same cards run as an auto-advancing
// single-row carousel, one slide every 3 seconds, looping.
export default function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 3000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <div className="testi-viewport">
      <div className="testi-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((t, i) => (
          <blockquote className="testimonial" key={i} style={{ margin: 0 }}>
            <p>&quot;{t.quote}&quot;</p>
            <cite>— {t.name}, {t.role}</cite>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
