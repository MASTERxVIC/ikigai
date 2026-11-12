// POST /api/admin/logout — clears the `ikigai_admin` session cookie.
// No auth required (clearing a cookie is always safe).
import { NextResponse } from "next/server";
import { clearSessionCookieHeader } from "../../../../lib/auth.js";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    { ok: true },
    { headers: { "Set-Cookie": clearSessionCookieHeader() } },
  );
}
