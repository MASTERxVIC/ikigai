// GET /api/admin/activity — authed. Collection: `activity`.
// Lists the latest 10 admin changes, newest first, as a plain JSON
// array (same style as GET /api/admin/services).
import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db.js";
import { requireAdmin } from "../../../../lib/auth.js";

export const dynamic = "force-dynamic";

const json = (data, status = 200) => NextResponse.json(data, { status });

function clean(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

export async function GET(request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);
  const docs = await db.collection("activity").find({}).sort({ at: -1 }).limit(10).toArray();
  return json(docs.map(clean));
}
