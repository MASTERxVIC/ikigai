"use client";

import { useEffect, useState } from "react";

const MARQUEE_A = "SOFTWARE · WEBSITES · SEO · GEO · AEO · DARUMA · ";
const MARQUEE_B = "IKIGAI · CODE · PURPOSE · RISE · ";

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("ikg-entered")) setShow(true);
    } catch {
      setShow(true);
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const enter = () => {
    try {
      sessionStorage.setItem("ikg-entered", "1");
    } catch {}
    setLeaving(true);
    document.body.style.overflow = "";
    setTimeout(() => setShow(false), 650);
  };

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show ]);

  if (!show) return null;

  return (
    <div className={`intro-overlay${leaving ? " leaving" : ""}`} role="dialog" aria-label="Welcome to ikigaicoding">
      <div className="intro-marquee top" aria-hidden="true">
        <span>{MARQUEE_A.repeat(3)}</span>
        <span>{MARQUEE_A.repeat(3)}</span>
      </div>
      <div className="intro-marquee bottom" aria-hidden="true">
        <span>{MARQUEE_B.repeat(4)}</span>
        <span>{MARQUEE_B.repeat(4)}</span>
      </div>
      <div className="intro-glow" aria-hidden="true" />

      <div className="intro-content">
        <div className="intro-mark">
          <img src="/assets/ricon.svg" alt="ikigaicoding Daruma logo" style={{ height: 66, width: "auto", display: "block" }} />
        </div>
        <div className="intro-pill">
          <span className="dot" />
          FALL SEVEN TIMES, GET UP EIGHT
        </div>
        <div className="intro-word">
          ikigai<span className="gold">coding</span>
        </div>
        <div className="intro-rule" />
        <div className="intro-tag">
          Great code. <span className="gold">Zero quit</span> in it.
        </div>
        <button className="intro-enter" onClick={enter}>
          ▶&nbsp;&nbsp;ENTER IKIGAICODING
        </button>
        <button className="intro-skip" onClick={enter}>
          SKIP →
        </button>
      </div>

      <div className="intro-corner left">IKIGAI · CODE WITH PURPOSE</div>
      <div className="intro-corner right">NO TEMPLATES. PROBABLY NO SLEEP.</div>
    </div>
  );
}
