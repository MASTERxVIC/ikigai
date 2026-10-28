"use client";

import { useEffect, useState } from "react";

// Testimonials: desktop keeps the 3-column grid (see .testi-track in
// globals.css); on tablet/mobile the same cards run as an auto-advancing
// single-row carousel, one slide every 3 seconds, looping, with centered
// prev/next arrows below. The timer restarts on every slide change, so a
// manual tap always buys a full 3 seconds before the next auto-slide.
export default function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 3000);
    return () => clearInterval(t);
  }, [items.length, index]);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <>
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
      <div className="testi-nav">
        <button type="button" onClick={prev} aria-label="Previous testimonial">←</button>
        <button type="button" onClick={next} aria-label="Next testimonial">→</button>
      </div>
    </>
  );
}
