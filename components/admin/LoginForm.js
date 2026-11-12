"use client";

import { useRef, useState } from "react";

/** Six single-char boxes: auto-advance, backspace goes back, paste fills all. */
function CodeBoxes({ value, onChange, disabled }) {
  const inputs = useRef([]);

  function setDigit(i, d) {
    const next = value.split("");
    while (next.length < 6) next.push("");
    next[i] = d;
    onChange(next.join("").slice(0, 6));
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    onChange(text);
    const idx = Math.min(text.length, 5);
    inputs.current[idx]?.focus();
  }

  return (
    <div className="adm-codeboxes" onPaste={handlePaste}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[i] || ""}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, "").slice(-1);
            setDigit(i, d);
            if (d && i < 5) inputs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i] && i > 0) {
              e.preventDefault();
              setDigit(i - 1, "");
              inputs.current[i - 1]?.focus();
            }
          }}
        />
      ))}
    </div>
  );
}

/**
 * Admin login. One code covers both TOTP and backup codes: the 6 boxes are
 * for the authenticator code; "Use a backup code instead" reveals a plain
 * text input (backup codes are longer than 6 chars).
 * POST /api/admin/login { code } — sets the httpOnly `ikigai_admin` cookie.
 * On success the page reloads into the authed admin app.
 */
export default function LoginForm() {
  const [code, setCode] = useState("");
  const [backupMode, setBackupMode] = useState(false);
  const [backupCode, setBackupCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const activeCode = backupMode ? backupCode.trim() : code;

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (activeCode.length < 6) {
      setError(backupMode ? "Enter your full backup code." : "Enter the 6-digit code from your authenticator app.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: activeCode }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || data.message || "Login failed. Try the code again.");
        return;
      }
      window.location.reload();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-card">
      <div className="adm-loginbox">
        <div className="adm-eyebrow">ikigaicoding • Staff only</div>
        <h2 style={{ marginTop: 8 }}>Welcome back</h2>
        <p className="adm-sub">
          Same login as the Blog — the 6-digit code from your authenticator app. No email + password here.
        </p>
        <form onSubmit={submit}>
          {backupMode ? (
            <div className="adm-field" style={{ marginTop: 18, textAlign: "left" }}>
              <label>Backup code</label>
              <input
                type="text"
                value={backupCode}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                disabled={busy}
                placeholder="Paste one of your saved backup codes"
                onChange={(e) => setBackupCode(e.target.value)}
              />
            </div>
          ) : (
            <CodeBoxes value={code} onChange={setCode} disabled={busy} />
          )}
          {error ? (
            <div className="adm-msg err" role="alert">
              {error}
              {error === "setup required" ? (
                <span> — <a href="/admin/setup">finish the one-time setup first →</a></span>
              ) : null}
            </div>
          ) : null}
          <button type="submit" className="adm-btn adm-btn-gold adm-btn-block" disabled={busy} style={{ marginTop: 16 }}>
            {busy ? "Checking…" : "Verify & sign in →"}
          </button>
        </form>
        <p style={{ marginTop: 14 }}>
          <button
            type="button"
            className="adm-linklike"
            onClick={() => {
              setBackupMode((m) => !m);
              setError("");
            }}
          >
            {backupMode ? "← Back to authenticator code" : "Use a backup code instead"}
          </button>
        </p>
        <p className="adm-hidden-note">
          Session expired? Sign in again with a fresh code. Backup codes are the ones saved during setup — each works once.
        </p>
      </div>
    </div>
  );
}
