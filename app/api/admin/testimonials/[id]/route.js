// PUT/PATCH/DELETE /api/admin/testimonials/[id] — authed.
// `id` is the Mongo _id string. Invalid ObjectId -> 400, missing doc -> 404.
// Writes revalidate '/' (layout).
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { getDb } from "../../../../../lib/db.js";
import { requireAdmin } from "../../../../../lib/auth.js";
import { logActivity } from "../../../../../lib/activity.js";

export const dynamic = "force-dynamic";

const json = (data, status = 200) => NextResponse.json(data, { status });

function clean(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

// Activity feed title: the quote truncated to 60 chars ("…" only if cut).
function shortQuote(quote) {
  const q = String(quote || "");
  return q.length > 60 ? q.slice(0, 60) + "…" : q;
}

function toObjectId(id) {
  if (!ObjectId.isValid(id)) return null;
  return new ObjectId(id);
}

export async function PUT(request, { params }) {
  return upsert(request, params, true);
}

export async function PATCH(request, { params }) {
  return upsert(request, params, false);
}

async function upsert(request, params, replace) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const { id } = await params;
  const _id = toObjectId(id);
  if (!_id) return json({ error: "Invalid testimonial id" }, 400);
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const col = db.collection("testimonials");
  const existing = await col.findOne({ _id });
  if (!existing) return json({ error: "Testimonial not found" }, 404);

  const patch = {};
  if (body.quote !== undefined) patch.quote = String(body.quote).trim();
  if (body.name !== undefined) patch.name = String(body.name).trim();
  if (body.role !== undefined) patch.role = String(body.role).trim();
  if (body.order !== undefined) {
    if (!Number.isFinite(Number(body.order))) return json({ error: "order must be a number" }, 400);
    patch.order = Number(body.order);
  }
  if (body.visible !== undefined) patch.visible = Boolean(body.visible);

  const merged = { ...existing, ...patch };
  if (!merged.quote) return json({ error: "quote is required" }, 400);
  if (!merged.name) return json({ error: "name is required" }, 400);
  if (!merged.role) return json({ error: "role is required" }, 400);

  if (replace) {
    const full = {
      quote: merged.quote,
      name: merged.name,
      role: merged.role,
      order: merged.order ?? 0,
      visible: merged.visible ?? true,
    };
    await col.updateOne({ _id }, { $set: { ...full, updatedAt: new Date() } });
  } else {
    if (Object.keys(patch).length === 0) return json(clean(existing));
    await col.updateOne({ _id }, { $set: { ...patch, updatedAt: new Date() } });
  }
  await logActivity(db, { action: "updated", kind: "testimonial", title: shortQuote(merged.quote) });
  revalidatePath("/", "layout");
  return json(clean(await col.findOne({ _id })));
}

export async function DELETE(request, { params }) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const { id } = await params;
  const _id = toObjectId(id);
  if (!_id) return json({ error: "Invalid testimonial id" }, 400);
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);
  const col = db.collection("testimonials");
  const existing = await col.findOne({ _id });
  const result = await col.deleteOne({ _id });
  if (result.deletedCount === 0) return json({ error: "Testimonial not found" }, 404);
  await logActivity(db, { action: "deleted", kind: "testimonial", title: shortQuote(existing?.quote || "") });
  revalidatePath("/", "layout");
  return json({ ok: true, id });
}
