// lib/auth.js — all auth logic for the ikigaicoding admin panel.
// Node `crypto` ONLY. No new dependencies.
// Blog-style login: 6-digit TOTP (RFC 6238) + 10 single-use backup codes.
// Owner-only: one admin, stored as a single doc (_id 'owner') in the
// `admin_auth` collection. Sessions are HMAC-signed tokens in an httpOnly
// cookie — no server-side session store, so verification works in both
// route handlers (Node crypto, here) and proxy.js (WebCrypto; the
// token format is deliberately HMAC-SHA256 over base64url(payload) so
// both runtimes can verify the same token — proxy.js carries its
// own small WebCrypto copy and must NOT import this file, because
// middleware runs on the Edge runtime where node:crypto is unavailable).

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getDb } from "./db.js";

export const COOKIE_NAME = "ikigai_admin";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days
export const ADMIN_AUTH_COLLECTION = "admin_auth";
export const OWNER_ID = "owner";
export const PENDING_SETUP_ID = "pending-setup";
export const TOTP_ISSUER = "ikigaicoding";
export const TOTP_ACCOUNT = "owner";
export const TOTP_STEP_SECONDS = 30;
export const TOTP_DIGITS = 6;

// ---------------------------------------------------------------------------
// Base32 (RFC 4648, no padding) — TOTP secrets are base32 by convention.
// ---------------------------------------------------------------------------
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Encode(buffer) {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of buffer) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  return out;
}

export function base32Decode(str) {
  const clean = String(str).replace(/=+$/g, "").replace(/\s+/g, "").toUpperCase();
  let bits = 0;
  let value = 0;
  const bytes = [];
  for (const char of clean) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) throw new Error("Invalid base32 character");
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}

// ---------------------------------------------------------------------------
// TOTP (RFC 6238, SHA-1, 30s step, 6 digits)
// ---------------------------------------------------------------------------
export function generateTotpSecret() {
  // 20 random bytes -> 32 base32 chars (160-bit secret, RFC 4226 default).
  return base32Encode(crypto.randomBytes(20));
}

export function buildOtpauthUrl(secret, account = TOTP_ACCOUNT, issuer = TOTP_ISSUER) {
  const params = new URLSearchParams({ secret, issuer });
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?${params.toString()}`;
}

function totpCodeForCounter(secret, counter) {
  const key = base32Decode(secret);
  const msg = Buffer.alloc(8);
  msg.writeBigUInt64BE(BigInt(counter));
  const hmac = crypto.createHmac("sha1", key).update(msg).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(binary % 10 ** TOTP_DIGITS).padStart(TOTP_DIGITS, "0");
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

// window = number of 30s steps allowed either side of "now" (±1 by default,
// i.e. up to 30s of clock skew between server and the authenticator app).
export function verifyTotp(code, secret, window = 1) {
  const clean = String(code || "").replace(/\s+/g, "");
  if (!/^\d{6}$/.test(clean) || !secret) return false;
  const now = Math.floor(Date.now() / 1000 / TOTP_STEP_SECONDS);
  for (let i = -window; i <= window; i++) {
    if (safeEqual(clean, totpCodeForCounter(secret, now + i))) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Backup codes — 10 single-use codes, stored only as SHA-256 hashes.
// Plain codes are shown to the owner ONCE, at setup. They are never
// stored or logged in plain form anywhere.
// ---------------------------------------------------------------------------
const BACKUP_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

export function generateBackupCodes(count = 10) {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const chars = Array.from({ length: 8 }, () =>
      BACKUP_CHARSET[crypto.randomInt(BACKUP_CHARSET.length)],
    );
    codes.push(`${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`);
  }
  return codes;
}

export function normalizeBackupCode(code) {
  return String(code || "").replace(/[\s-]/g, "").toUpperCase();
}

export function hashBackupCode(code) {
  return crypto.createHash("sha256").update(normalizeBackupCode(code)).digest("hex");
}

// Returns the index of the matching hash, or -1. Caller removes that hash
// from storage (single-use) on success.
export function findBackupCodeIndex(code, hashes) {
  const clean = normalizeBackupCode(code);
  if (clean.length !== 8 || !Array.isArray(hashes)) return -1;
  const hash = hashBackupCode(clean);
  for (let i = 0; i < hashes.length; i++) {
    if (safeEqual(hash, hashes[i])) return i;
  }
  return -1;
}

// ---------------------------------------------------------------------------
// Sessions — HMAC-signed token, no server-side store.
// Token format: base64url(JSON payload) + "." + base64url(HMAC-SHA256).
// Payload: { v: 1, exp: <ms epoch>, rnd: <random> }.
// ---------------------------------------------------------------------------
function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  // Refuse weak/missing secrets: a short secret makes the HMAC forgeable.
  return secret.length >= 32 ? secret : null;
}

function b64urlEncode(buffer) {
  return Buffer.from(buffer).toString("base64url");
}

export function createSessionToken() {
  const secret = getSessionSecret();
  if (!secret) return null;
  const payload = b64urlEncode(
    JSON.stringify({
      v: 1,
      exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
      rnd: crypto.randomBytes(12).toString("hex"),
    }),
  );
  const sig = b64urlEncode(crypto.createHmac("sha256", secret).update(payload).digest());
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  const secret = getSessionSecret();
  if (!secret || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = b64urlEncode(crypto.createHmac("sha256", secret).update(payload).digest());
  if (!safeEqual(sig, expected)) return null;
  let data;
  try {
    data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!data || data.v !== 1 || typeof data.exp !== "number") return null;
  if (Date.now() > data.exp) return null;
  return data;
}

export function sessionCookieHeader(token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`;
}

export function clearSessionCookieHeader() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`;
}

export function getSessionFromRequest(request) {
  const token = request?.cookies?.get?.(COOKIE_NAME)?.value;
  return token ? verifySessionToken(token) : null;
}

export function isAuthed(request) {
  return getSessionFromRequest(request) !== null;
}

// Route-handler guard. Usage:
//   const guard = requireAdmin(request);
//   if (guard) return guard;   // 401 JSON response
export function requireAdmin(request) {
  if (isAuthed(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

// ---------------------------------------------------------------------------
// Setup state — single doc (_id 'owner') in `admin_auth`.
// ---------------------------------------------------------------------------
export async function getSetupState() {
  const db = await getDb();
  if (!db) return { dbAvailable: false, setupDone: false, doc: null };
  const doc = await db.collection(ADMIN_AUTH_COLLECTION).findOne({ _id: OWNER_ID });
  return { dbAvailable: true, setupDone: Boolean(doc && doc.totpSecret), doc: doc || null };
}

// ---------------------------------------------------------------------------
// In-memory rate limiting for login/setup.
// Max 5 attempts per IP + path per 5 minutes, then 429. Successful login
// or setup clears the counter (resetRateLimit). Best-effort only: counters
// live in process memory and do not survive a restart or span instances.
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 5 * 60 * 1000;
const RATE_MAX = 5;
const attempts = new Map(); // key -> { count, resetAt }

function clientIp(request) {
  const forwarded = request?.headers?.get?.("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

export function checkRateLimit(request, scope) {
  const key = `${scope}:${clientIp(request)}`;
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_MAX - 1 };
  }
  if (entry.count >= RATE_MAX) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }
  entry.count += 1;
  return { allowed: true, remaining: RATE_MAX - entry.count };
}

export function resetRateLimit(request, scope) {
  attempts.delete(`${scope}:${clientIp(request)}`);
}

// Returns a 429 JSON Response when blocked, otherwise null.
export function rateLimitResponse(request, scope) {
  const result = checkRateLimit(request, scope);
  if (result.allowed) return null;
  return NextResponse.json(
    { error: "Too many attempts. Try again later." },
    { status: 429, headers: { "Retry-After": String(result.retryAfterSeconds || 60) } },
  );
}
