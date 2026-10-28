"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../lib/content";

export default function WorkAccordion() {
  const [open, setOpen] = useState([0]);
  const [swooshRow, setSwooshRow] = useState(null);
  const [swooshTick, setSwooshTick] = useState(0);
  const listRef = useRef(null);

  const handleClick = (i) => {
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    setSwooshRow(i);
    setSwooshTick((t) => t + 1);
  };

  useEffect(() => {
    if (swooshRow === null) return;
    const list = listRef.current;
    if (!list) return;
    const acc = list.children[swooshRow];
    if (!acc) return;
    const title = acc.querySelector(".wk-title");
    if (title) {
      title.classList.remove("swoosh");
      title.getBoundingClientRect();
      title.classList.add("swoosh");
      title.addEventListener("animationend", () => title.classList.remove("swoosh"), { once: true });
    }
    const clones = acc.querySelectorAll(".wk-clone");
    if (clones.length) {
      acc.classList.remove("swooshing");
      acc.getBoundingClientRect();
      acc.classList.add("swooshing");
      const last = clones[clones.length - 1];
      last.addEventListener("animationend", () => acc.classList.remove("swooshing"), { once: true });
    }
  }, [swooshTick, swooshRow]);

  return (
    <div ref={listRef}>
      {PROJECTS.map((p, i) => {
        const isOpen = open.includes(i);
        const num = String(i + 1).padStart(2, "0");
        const accClass = "wk-acc" + (isOpen ? " open" : "") + ((i + 1) % 2 === 0 ? " wk-even" : "");
        return (
          <div className={accClass} key={p.slug} id={`case-${p.slug}`} style={{ scrollMarginTop: 100 }}>
            <button className="wk-sum" type="button" aria-expanded={isOpen} onClick={() => handleClick(i)}>
              <span className="wk-wm" aria-hidden="true">{num}</span>
              <span className="wk-title">{p.title}</span>
              <span className="wk-clone c1" aria-hidden="true">{p.title}</span>
              <span className="wk-clone c2" aria-hidden="true">{p.title}</span>
              <span className="wk-clone c3" aria-hidden="true">{p.title}</span>
              <span className="wk-cat">{p.category}</span>
              <span className="wk-chev" aria-hidden="true">▾</span>
            </button>
            <div className="wk-body">
              <div className="wk-body-inner">
                <p className="wk-sub">{p.subtitle}</p>
                <p className="wk-desc">{p.desc}</p>
                <h3 className="wk-built-h">What was built</h3>
                <p className="wk-built">{p.built}</p>
                <div className="wk-chips">
                  {p.chips.map((c) => (
                    <span className="wk-chip" key={c}>{c}</span>
                  ))}
                </div>
                {p.live ? (
                  <a className="wk-live" href={p.live} target="_blank" rel="noopener noreferrer">Visit live site →</a>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
