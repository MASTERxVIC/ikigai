// POST /api/admin/login — owner login with a 6-digit authenticator code
// (TOTP) or a single-use backup code. On success sets the httpOnly
// `ikigai_admin` session cookie (7 days) and returns { ok: true }.
// Wrong code -> 401. Not set up yet -> 400 { error: 'setup required' }.
// Rate-limited: max 5 attempts per IP per 5 min, then 429.
import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.js";
import {
  ADMIN_AUTH_COLLECTION,
  OWNER_ID,
  createSessionToken,
  findBackupCodeIndex,
  getSetupState,
  rateLimitResponse,
  resetRateLimit,
  sessionCookieHeader,
  verifyTotp,
} from "../../../../lib/auth.js";

export const dynamic = "force-dynamic";

const json = (data, status = 200) => NextResponse.json(data, { status });

export async function POST(request) {
  const limited = rateLimitResponse(request, "login");
  if (limited) return limited;

  const { setupDone, dbAvailable, doc } = await getSetupState();
  if (!dbAvailable) return json({ error: "Database unavailable" }, 503);
  if (!setupDone) return json({ error: "setup required" }, 400);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const code = String(body.code || "").trim();
  if (!code) return json({ error: "Code is required" }, 400);

  let ok = false;

  // 1) TOTP code from the authenticator app.
  if (verifyTotp(code, doc.totpSecret)) {
    ok = true;
  } else {
    // 2) Single-use backup code — consumed (removed) on success.
    const idx = findBackupCodeIndex(code, doc.backupCodeHashes || []);
    if (idx !== -1) {
      const hashes = [...(doc.backupCodeHashes || [])];
      hashes.splice(idx, 1);
      const db = await getDb();
      await db
        .collection(ADMIN_AUTH_COLLECTION)
        .updateOne({ _id: OWNER_ID }, { $set: { backupCodeHashes: hashes } });
      ok = true;
    }
  }

  if (!ok) return json({ error: "Invalid code" }, 401);

  const token = createSessionToken();
  if (!token) {
    // ADMIN_SESSION_SECRET missing or shorter than 32 chars.
    return json({ error: "Server session secret is not configured" }, 500);
  }
  resetRateLimit(request, "login");
  return NextResponse.json(
    { ok: true },
    { headers: { "Set-Cookie": sessionCookieHeader(token) } },
  );
}
