"use client";

import { useState } from "react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item${isOpen ? " open" : ""}`}>
            <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              {f.q}
              <span className="chev">▾</span>
            </button>
            <div className="faq-a" style={{ maxHeight: isOpen ? 300 : 0 }}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
