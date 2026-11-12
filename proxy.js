// proxy.js (Next.js 16 "proxy" convention — replaces the deprecated middleware.js file name; same behaviour) — runs on the Edge runtime (WebCrypto only: node:crypto
// is NOT available here, so this file must NOT import lib/auth.js — the
// small HMAC-SHA256 session check below is a WebCrypto copy of the same
// token format lib/auth.js creates with Node crypto).
//
// 1. Adds `X-Robots-Tag: noindex, nofollow` to responses for /admin* paths.
// 2. Protects /api/admin/* except /api/admin/setup, /api/admin/login and
//    /api/admin/status — unauthenticated requests get 401 JSON.
//    The /admin page itself is NOT redirected: it IS the login screen
//    when unauthenticated.
// NOTE: an earlier draft set an `x-pathname` header so the root layout
// could hide the public chrome on /admin. That is gone: the public chrome
// now lives in app/(public)/layout.js (route group), so the root layout
// stays static and no pathname header is needed.

import { NextResponse } from "next/server";

const COOKIE_NAME = "ikigai_admin";
const PUBLIC_API = new Set(["/api/admin/setup", "/api/admin/login", "/api/admin/status"]);

// --- base64url helpers (Edge-safe: atob/btoa exist in the Edge runtime) ---
function base64urlDecode(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// Verifies the HMAC-signed session token lib/auth.js issues.
// Returns the payload object on success, null otherwise.
async function verifySessionToken(token, secret) {
  if (!secret || secret.length < 32 || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      base64urlDecode(sig),
      new TextEncoder().encode(payload),
    );
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(base64urlDecode(payload)));
    if (!data || data.v !== 1 || typeof data.exp !== "number") return null;
    if (Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // (2) Protect /api/admin/* except setup / login / status.
  if (pathname.startsWith("/api/admin/") && !PUBLIC_API.has(pathname)) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const session = await verifySessionToken(token, process.env.ADMIN_SESSION_SECRET);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const res = NextResponse.next();

  // (1) Keep the admin area out of search engines.
  if (pathname.startsWith("/admin")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}
