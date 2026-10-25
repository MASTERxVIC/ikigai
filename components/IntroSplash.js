"use client";

import { useEffect, useState } from "react";

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("ikg-entered")) return;
    } catch {}
    setShow(true);
    document.body.style.overflow = "hidden";
    // Everything is visible once the pill finishes (~6.4s) — enter immediately, no extra hold.
    const t1 = setTimeout(() => setLeaving(true), 6400);
    const t2 = setTimeout(() => {
      try {
        sessionStorage.setItem("ikg-entered", "1");
      } catch {}
      document.body.style.overflow = "";
      setShow(false);
    }, 7050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`loader-stage${leaving ? " leaving" : ""}`} role="status" aria-label="Loading ikigaicoding">
      <div className="loader-giant" aria-hidden="true">
        <img src="/assets/icon.svg" alt="" />
      </div>
      <div className="loader-vert-rail" aria-hidden="true">
        <div className="loader-vert"><b>ikigai</b><span>coding</span></div>
      </div>
      <div className="loader-center">
        <div className="loader-doll">
          <img src="/assets/icon.svg" alt="ikigaicoding Daruma logo" />
          <span className="loader-spark" aria-hidden="true">✦</span>
        </div>
        <div className="loader-floor" aria-hidden="true" />
        <div className="loader-word"><b>ikigai</b><span>coding</span></div>
        <div className="loader-tag">Great code. <b>Zero quit</b> in it.</div>
        <div className="loader-pill">FALL SEVEN TIMES · GET UP EIGHT</div>
      </div>
    </div>
  );
}
