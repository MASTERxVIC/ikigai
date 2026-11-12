// PUT/PATCH/DELETE /api/admin/services/[slug] — authed.
// The path slug is the identity: it never changes on update (a `slug`
// in the body is ignored). Writes revalidate '/' (layout).
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "../../../../../lib/db.js";
import { requireAdmin } from "../../../../../lib/auth.js";
import { logActivity } from "../../../../../lib/activity.js";

export const dynamic = "force-dynamic";

const json = (data, status = 200) => NextResponse.json(data, { status });
const SHOW_ON = ["home+services", "services"];

function clean(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
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

  const col = db.collection("services");
  const existing = await col.findOne({ slug });
  if (!existing) return json({ error: "Service not found" }, 404);

  const patch = {};
  if (body.title !== undefined) patch.title = String(body.title).trim();
  if (body.short !== undefined) patch.short = String(body.short).trim();
  if (body.desc !== undefined) patch.desc = String(body.desc);
  if (body.points !== undefined) {
    if (!Array.isArray(body.points)) return json({ error: "points must be an array" }, 400);
    patch.points = body.points.map(String);
  }
  if (body.icon !== undefined) patch.icon = String(body.icon);
  if (body.order !== undefined) {
    if (!Number.isFinite(Number(body.order))) return json({ error: "order must be a number" }, 400);
    patch.order = Number(body.order);
  }
  if (body.visible !== undefined) patch.visible = Boolean(body.visible);
  if (body.showOn !== undefined) {
    if (!SHOW_ON.includes(body.showOn)) {
      return json({ error: "showOn must be 'home+services' or 'services'" }, 400);
    }
    patch.showOn = body.showOn;
  }

  const merged = { ...existing, ...patch };
  if (!merged.title) return json({ error: "title is required" }, 400);
  if (!merged.short) return json({ error: "short is required" }, 400);

  // PUT replaces the editable fields; PATCH merges. Either way the slug
  // and createdAt survive, and unset fields keep their old values.
  if (replace) {
    const full = {
      title: merged.title,
      short: merged.short,
      desc: merged.desc ?? "",
      points: merged.points ?? [],
      icon: merged.icon ?? "",
      order: merged.order ?? 0,
      visible: merged.visible ?? true,
      showOn: merged.showOn ?? "home+services",
    };
    await col.updateOne({ slug }, { $set: { ...full, updatedAt: new Date() } });
  } else {
    if (Object.keys(patch).length === 0) return json(clean(existing));
    await col.updateOne({ slug }, { $set: { ...patch, updatedAt: new Date() } });
  }
  // Log the change for the Dashboard "Latest changes" feed: a visibility
  // flip logs hidden/shown, anything else logs updated. (The empty-PATCH
  // early return above performs no write, so nothing is logged for it.)
  const beforeVisible = existing.visible ?? true;
  if (patch.visible !== undefined && Boolean(patch.visible) !== Boolean(beforeVisible)) {
    await logActivity(db, { action: patch.visible ? "shown" : "hidden", kind: "service", title: merged.title });
  } else {
    await logActivity(db, { action: "updated", kind: "service", title: merged.title });
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
  const col = db.collection("services");
  const existing = await col.findOne({ slug });
  if (!existing) return json({ error: "Service not found" }, 404);
  const result = await col.deleteOne({ slug });
  if (result.deletedCount === 0) return json({ error: "Service not found" }, 404);
  await logActivity(db, { action: "deleted", kind: "service", title: existing.title });
  revalidatePath("/", "layout");
  return json({ ok: true, slug });
}
