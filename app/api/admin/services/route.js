// GET/POST /api/admin/services — authed. Collection: `services`.
// GET lists all services sorted by `order` (the locked 8-service order
// from lib/content.js is preserved by the seed's `order` values).
// POST creates one. Slug is auto-derived from the title when missing
// (lowercase kebab-case) and must be unique. Writes revalidate '/'
// (layout) so public pages pick the change up.
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "../../../../lib/db.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { logActivity } from "../../../../lib/activity.js";

export const dynamic = "force-dynamic";

const json = (data, status = 200) => NextResponse.json(data, { status });
const SHOW_ON = ["home+services", "services"];

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function clean(doc) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

function validateService(body) {
  const title = String(body.title || "").trim();
  const short = String(body.short || "").trim();
  if (!title) return { error: "title is required" };
  if (!short) return { error: "short is required" };
  if (body.points !== undefined && !Array.isArray(body.points)) {
    return { error: "points must be an array" };
  }
  if (body.showOn !== undefined && !SHOW_ON.includes(body.showOn)) {
    return { error: "showOn must be 'home+services' or 'services'" };
  }
  if (body.order !== undefined && !Number.isFinite(Number(body.order))) {
    return { error: "order must be a number" };
  }
  return {
    value: {
      title,
      short,
      desc: String(body.desc || ""),
      points: Array.isArray(body.points) ? body.points.map(String) : [],
      icon: String(body.icon || ""),
      order: body.order !== undefined ? Number(body.order) : undefined,
      visible: body.visible === undefined ? true : Boolean(body.visible),
      showOn: body.showOn || "home+services",
    },
  };
}

export async function GET(request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);
  const docs = await db.collection("services").find({}).sort({ order: 1 }).toArray();
  return json(docs.map(clean));
}

export async function POST(request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const { error, value } = validateService(body);
  if (error) return json({ error }, 400);

  const col = db.collection("services");
  const slug = slugify(body.slug || value.title);
  if (!slug) return json({ error: "Could not derive a slug from the title" }, 400);
  if (await col.findOne({ slug })) return json({ error: `slug '${slug}' already exists` }, 400);

  if (value.order === undefined) {
    const top = await col.find({}).sort({ order: -1 }).limit(1).toArray();
    value.order = (top[0]?.order ?? -1) + 1;
  }
  const now = new Date();
  await col.insertOne({ slug, ...value, createdAt: now, updatedAt: now });
  await logActivity(db, { action: "added", kind: "service", title: value.title });
  revalidatePath("/", "layout");
  return json(clean(await col.findOne({ slug })), 201);
}
