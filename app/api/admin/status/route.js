// GET /api/admin/status — public. Tells the /admin login screen whether
// one-time setup has been done and whether this browser already has a
// valid session. No auth required.
import { NextResponse } from "next/server";
import { getSetupState, isAuthed } from "../../../../lib/auth.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { setupDone, dbAvailable } = await getSetupState();
  return NextResponse.json({
    setupDone,
    authed: isAuthed(request),
    dbAvailable,
  });
}
