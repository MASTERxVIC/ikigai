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
 * One-time admin setup (run once, before first login).
 * Step 1 — enter ADMIN_SETUP_CODE → POST /api/admin/setup { setupCode }
 *   returns { secret, otpauthUrl, backupCodes[] }. The secret is shown as a
 *   copyable code block and the otpauth URL as a clickable link (no QR lib);
 *   the 10 backup codes must be saved before step 2 unlocks.
 * Step 2 — enter the 6-digit code from the authenticator app →
 *   POST /api/admin/setup { setupCode, code } → success → link to /admin.
 */
export default function SetupForm() {
  const [setupCode, setSetupCode] = useState("");
  const [step, setStep] = useState(1);
  const [secret, setSecret] = useState("");
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const [backupCodes, setBackupCodes] = useState([]);
  const [saved, setSaved] = useState(false);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function copy(text, what) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      setTimeout(() => setCopied(""), 2000);
    } catch {
      setError("Copy failed — select the text and copy it manually.");
    }
  }

  async function startSetup(e) {
    e.preventDefault();
    setError("");
    if (!setupCode.trim()) {
      setError("Enter the setup code.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setupCode: setupCode.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || data.message || "Setup code not accepted.");
        return;
      }
      setSecret(data.secret || data.totpSecret || "");
      setOtpauthUrl(data.otpauthUrl || data.otpauth_url || "");
      setBackupCodes(data.backupCodes || data.backup_codes || []);
      setStep(2);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(e) {
    e.preventDefault();
    setError("");
    if (code.length !== 6) {
      setError("Enter the 6-digit code from your authenticator app.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setupCode: setupCode.trim(), code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || data.message || "That code did not verify. Try a fresh code.");
        return;
      }
      setDone(true);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="adm-card">
        <div className="adm-loginbox">
          <div className="adm-eyebrow">ikigaicoding • Staff only</div>
          <h2 style={{ marginTop: 8 }}>Setup complete ✓</h2>
          <p className="adm-sub">
            Your authenticator is linked. From now on, sign in at /admin with the 6-digit code from your authenticator app.
          </p>
          <a href="/admin" className="adm-btn adm-btn-gold adm-btn-block" style={{ marginTop: 18 }}>
            Go to the admin panel →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-card">
      <div className="adm-loginbox" style={{ maxWidth: 520 }}>
        <div className="adm-eyebrow">ikigaicoding • Staff only</div>
        <h2 style={{ marginTop: 8 }}>Admin setup</h2>
        <p className="adm-sub">One-time setup. Link your authenticator app, save the backup codes, then verify once.</p>

        <div className="adm-steps">
          <div className={`adm-step${step === 1 ? " on" : " done"}`}>1 • Setup code</div>
          <div className={`adm-step${step === 2 ? " on" : ""}`}>2 • Verify code</div>
        </div>

        {step === 1 ? (
          <form onSubmit={startSetup} style={{ marginTop: 14 }}>
            <div className="adm-field" style={{ textAlign: "left" }}>
              <label>Admin setup code</label>
              <input
                type="password"
                value={setupCode}
                autoComplete="off"
                disabled={busy}
                placeholder="ADMIN_SETUP_CODE from the server env"
                onChange={(e) => setSetupCode(e.target.value)}
              />
            </div>
            {error ? <div className="adm-msg err" role="alert">{error}</div> : null}
            <button type="submit" className="adm-btn adm-btn-gold adm-btn-block" disabled={busy} style={{ marginTop: 16 }}>
              {busy ? "Checking…" : "Continue →"}
            </button>
            <p className="adm-hidden-note" style={{ marginTop: 14 }}>
              The setup code lives only in the server environment — it is never stored in the browser.
            </p>
          </form>
        ) : (
          <>
            <div style={{ textAlign: "left", marginTop: 14 }}>
              <div className="adm-field">
                <label>Add to your authenticator app</label>
                <p className="adm-sub" style={{ margin: 0 }}>
                  Open your authenticator app and add this account manually with the secret below, or open the setup link:
                </p>
              </div>
              {secret ? (
                <div className="adm-secret">
                  <code>{secret}</code>
                  <button type="button" className="adm-btn adm-btn-ghost" onClick={() => copy(secret, "secret")}>
                    {copied === "secret" ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              ) : null}
              {otpauthUrl ? (
                <p style={{ marginTop: 10, wordBreak: "break-all", fontSize: 13 }}>
                  <a href={otpauthUrl} target="_blank" rel="noreferrer">Open authenticator setup link ↗</a>
                </p>
              ) : null}

              {backupCodes.length > 0 ? (
                <>
                  <div className="adm-field" style={{ marginTop: 18 }}>
                    <label>Backup codes — save these somewhere safe</label>
                    <p className="adm-sub" style={{ margin: 0 }}>
                      Each code works once, if you lose access to your authenticator app. They are shown only this once.
                    </p>
                  </div>
                  <div className="adm-codes">
                    {backupCodes.map((c) => (
                      <code key={c}>{c}</code>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="adm-btn adm-btn-ghost"
                    style={{ marginTop: 10 }}
                    onClick={() => copy(backupCodes.join("\n"), "codes")}
                  >
                    {copied === "codes" ? "Copied ✓" : "Copy all backup codes"}
                  </button>
                </>
              ) : null}

              <label className="adm-check">
                <input type="checkbox" checked={saved} onChange={(e) => setSaved(e.target.checked)} />
                <span>I have saved the secret and the backup codes somewhere safe.</span>
              </label>
            </div>

            <form onSubmit={verify} style={{ marginTop: 18 }}>
              <div className="adm-field">
                <label>Verify — 6-digit code from your authenticator app</label>
              </div>
              <CodeBoxes value={code} onChange={setCode} disabled={busy || !saved} />
              {error ? <div className="adm-msg err" role="alert">{error}</div> : null}
              <button type="submit" className="adm-btn adm-btn-gold adm-btn-block" disabled={busy || !saved} style={{ marginTop: 8 }}>
                {busy ? "Verifying…" : "Verify & finish setup →"}
              </button>
              {!saved ? (
                <p className="adm-hidden-note" style={{ marginTop: 10 }}>
                  Tick “I have saved these” above to enable verification.
                </p>
              ) : null}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
