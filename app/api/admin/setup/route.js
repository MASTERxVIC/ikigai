// GET/POST /api/admin/setup — one-time owner setup. Public (it is the
// only way to create the first credential), guarded by ADMIN_SETUP_CODE
// + rate limiting instead of a session.
//
// Flow:
//   1. POST { setupCode } (no `code` yet) -> verifies the setup code,
//      generates a TOTP secret + 10 backup codes server-side, stores them
//      as PENDING (temp doc _id 'pending-setup' in `admin_auth` — setup is
//      NOT done yet), returns { secret, otpauthUrl, backupCodes }.
//      The plain backup codes are shown ONCE, here. Only their SHA-256
//      hashes are stored.
//   2. Owner scans the secret into an authenticator app, then
//      POST { setupCode, code } with the 6-digit code from the app.
//      On a correct code the pending secret + backup-code hashes are
//      persisted as the single owner doc (_id 'owner'), the pending doc
//      is deleted, and setup is done. Wrong code -> 400.
//   3. Any further POST once setup is done -> 403.
//
// GET returns { setupDone }.

import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.js";
import {
  ADMIN_AUTH_COLLECTION,
  OWNER_ID,
  PENDING_SETUP_ID,
  buildOtpauthUrl,
  generateBackupCodes,
  generateTotpSecret,
  getSetupState,
  hashBackupCode,
  rateLimitResponse,
  resetRateLimit,
  verifyTotp,
} from "../../../../lib/auth.js";

export const dynamic = "force-dynamic";

const json = (data, status = 200) => NextResponse.json(data, { status });

export async function GET() {
  const { setupDone, dbAvailable } = await getSetupState();
  if (!dbAvailable) return json({ setupDone: false, error: "Database unavailable" }, 503);
  return json({ setupDone });
}

export async function POST(request) {
  const limited = rateLimitResponse(request, "setup");
  if (limited) return limited;

  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);

  const { setupDone } = await getSetupState();
  if (setupDone) return json({ error: "Setup already completed" }, 403);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const setupCode = process.env.ADMIN_SETUP_CODE || "";
  if (!setupCode || body.setupCode !== setupCode) {
    return json({ error: "Invalid setup code" }, 403);
  }

  const col = db.collection(ADMIN_AUTH_COLLECTION);

  // Step 1 — no TOTP code yet: generate + store pending, return once.
  if (!body.code) {
    const secret = generateTotpSecret();
    const backupCodes = generateBackupCodes(10);
    await col.updateOne(
      { _id: PENDING_SETUP_ID },
      {
        $set: {
          totpSecret: secret,
          backupCodeHashes: backupCodes.map(hashBackupCode),
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );
    return json({
      secret,
      otpauthUrl: buildOtpauthUrl(secret),
      backupCodes,
    });
  }

  // Step 2 — verify the code against the pending secret, then persist.
  const pending = await col.findOne({ _id: PENDING_SETUP_ID });
  if (!pending || !pending.totpSecret) {
    return json({ error: "No pending setup. Call setup again without a code first." }, 400);
  }
  if (!verifyTotp(body.code, pending.totpSecret)) {
    return json({ error: "Invalid authenticator code" }, 400);
  }

  await col.updateOne(
    { _id: OWNER_ID },
    {
      $set: {
        totpSecret: pending.totpSecret,
        backupCodeHashes: pending.backupCodeHashes || [],
        createdAt: new Date(),
      },
    },
    { upsert: true },
  );
  await col.deleteOne({ _id: PENDING_SETUP_ID });
  resetRateLimit(request, "setup");
  return json({ ok: true, setupDone: true });
}
