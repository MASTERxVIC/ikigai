"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "ikg-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value) => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* storage unavailable — just dismiss */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p>
        We use essential cookies to make this site work, and optional analytics cookies only with
        your permission. <Link href="/cookie-policy">Cookie Policy</Link>
      </p>
      <button type="button" className="cookie-btn accept" onClick={() => choose("accepted")}>
        Accept
      </button>
      <button type="button" className="cookie-btn decline" onClick={() => choose("declined")}>
        Decline
      </button>
    </div>
  );
}
