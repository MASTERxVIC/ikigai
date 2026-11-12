// PUT/PATCH/DELETE /api/admin/projects/[slug] — authed.
// Same pin rule as the collection route: max 4 pinned; pinning a 5th
// returns 400 with the exact message. Pinning assigns pinOrder =
// max + 1; unpinning clears pinOrder. The monogram is re-derived from
// the title on every update; any `image` field in the body is dropped.
// The path slug is the identity and never changes. Writes revalidate
// '/' (layout).
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "../../../../../lib/db.js";
import { requireAdmin } from "../../../../../lib/auth.js";

export const dynamic = "force-dynamic";

const PIN_LIMIT = 4;
const PIN_LIMIT_ERROR = "Only 4 projects can be pinned on Home. Unpin one first.";
const json = (data, status = 200) => NextResponse.json(data, { status });

function clean(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

async function nextPinOrder(col) {
  const top = await col.find({ pinned: true }).sort({ pinOrder: -1 }).limit(1).toArray();
  return (top[0]?.pinOrder ?? 0) + 1;
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
  const { slug } = await params;
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const col = db.collection("projects");
  const existing = await col.findOne({ slug });
  if (!existing) return json({ error: "Project not found" }, 404);

  const patch = {};
  if (body.title !== undefined) patch.title = String(body.title).trim();
  if (body.subtitle !== undefined) patch.subtitle = String(body.subtitle);
  if (body.category !== undefined) patch.category = String(body.category);
  if (body.desc !== undefined) patch.desc = String(body.desc);
  if (body.built !== undefined) patch.built = String(body.built);
  if (body.chips !== undefined) {
    if (!Array.isArray(body.chips)) return json({ error: "chips must be an array" }, 400);
    patch.chips = body.chips.map(String);
  }
  if (body.live !== undefined) patch.live = String(body.live);
  if (body.order !== undefined) {
    if (!Number.isFinite(Number(body.order))) return json({ error: "order must be a number" }, 400);
    patch.order = Number(body.order);
  }
  if (body.pinned !== undefined) patch.pinned = Boolean(body.pinned);
  if (body.visible !== undefined) patch.visible = Boolean(body.visible);
  // Never accept an image field (or a client-supplied monogram).
  delete body.image;
  delete body.img;
  delete body.photo;

  const merged = { ...existing, ...patch };
  if (!merged.title) return json({ error: "title is required" }, 400);

  // Pin rule on the merged state.
  let pinOrder = existing.pinOrder ?? null;
  if (merged.pinned && !existing.pinned) {
    const count = await col.countDocuments({ pinned: true, slug: { $ne: slug } });
    if (count >= PIN_LIMIT) return json({ error: PIN_LIMIT_ERROR }, 400);
    pinOrder = await nextPinOrder(col);
  } else if (merged.pinned && (existing.pinOrder === null || existing.pinOrder === undefined)) {
    pinOrder = await nextPinOrder(col);
  } else if (!merged.pinned) {
    pinOrder = null;
  }

  // Monogram always follows the (possibly new) title.
  const monogram = merged.title.charAt(0).toUpperCase();

  if (replace) {
    const full = {
      title: merged.title,
      subtitle: merged.subtitle ?? "",
      category: merged.category ?? "",
      desc: merged.desc ?? "",
      built: merged.built ?? "",
      chips: merged.chips ?? [],
      live: merged.live ?? "",
      order: merged.order ?? 0,
      pinned: Boolean(merged.pinned),
      visible: merged.visible ?? true,
      pinOrder,
      monogram,
    };
    await col.updateOne({ slug }, { $set: { ...full, updatedAt: new Date() } });
  } else {
    const set = { ...patch, pinOrder, monogram, updatedAt: new Date() };
    await col.updateOne({ slug }, { $set: set });
  }
  revalidatePath("/", "layout");
  return json(clean(await col.findOne({ slug })));
}

export async function DELETE(request, { params }) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const { slug } = await params;
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);
  const result = await db.collection("projects").deleteOne({ slug });
  if (result.deletedCount === 0) return json({ error: "Project not found" }, 404);
  revalidatePath("/", "layout");
  return json({ ok: true, slug });
}
