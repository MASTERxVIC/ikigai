// GET/POST /api/admin/projects — authed. Collection: `projects`.
// GET lists pinned projects first (by pinOrder), then the rest by order.
// POST creates one. The monogram is ALWAYS derived server-side as the
// uppercase first letter of the title — an `image` field is never
// accepted or stored (projects have no images, only monograms).
//
// PIN RULE (enforced server-side, on create and on update):
// max 4 projects may be pinned on Home. Pinning a 5th returns
// 400 { error: 'Only 4 projects can be pinned on Home. Unpin one first.' }
// Pinning assigns pinOrder = max existing pinOrder + 1; unpinning clears
// pinOrder (null). Writes revalidate '/' (layout).
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "../../../../lib/db.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { logActivity } from "../../../../lib/activity.js";

export const dynamic = "force-dynamic";

const PIN_LIMIT = 4;
const PIN_LIMIT_ERROR = "Only 4 projects can be pinned on Home. Unpin one first.";

const json = (data, status = 200) => NextResponse.json(data, { status });

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

// Pinned first by pinOrder, then the rest by order.
function sortProjects(docs) {
  return docs.sort((a, b) => {
    const ap = a.pinned ? a.pinOrder ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
    const bp = b.pinned ? b.pinOrder ?? Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
    if (ap !== bp) return ap - bp;
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

async function nextPinOrder(col) {
  const top = await col.find({ pinned: true }).sort({ pinOrder: -1 }).limit(1).toArray();
  return (top[0]?.pinOrder ?? 0) + 1;
}

// Returns the PIN_LIMIT_ERROR string when the pin would exceed the limit,
// otherwise null. `excludeSlug` skips the project being updated.
async function pinViolation(col, excludeSlug) {
  const query = { pinned: true };
  if (excludeSlug) query.slug = { $ne: excludeSlug };
  const count = await col.countDocuments(query);
  return count >= PIN_LIMIT ? PIN_LIMIT_ERROR : null;
}

function validateProject(body) {
  const title = String(body.title || "").trim();
  if (!title) return { error: "title is required" };
  if (body.chips !== undefined && !Array.isArray(body.chips)) {
    return { error: "chips must be an array" };
  }
  if (body.order !== undefined && !Number.isFinite(Number(body.order))) {
    return { error: "order must be a number" };
  }
  return {
    value: {
      title,
      subtitle: String(body.subtitle || ""),
      category: String(body.category || ""),
      desc: String(body.desc || ""),
      built: String(body.built || ""),
      chips: Array.isArray(body.chips) ? body.chips.map(String) : [],
      live: String(body.live || ""),
      order: body.order !== undefined ? Number(body.order) : undefined,
      pinned: Boolean(body.pinned),
      visible: body.visible === undefined ? true : Boolean(body.visible),
    },
  };
}

export async function GET(request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);
  const docs = await db.collection("projects").find({}).toArray();
  return json(sortProjects(docs).map(clean));
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
  const { error, value } = validateProject(body);
  if (error) return json({ error }, 400);

  const col = db.collection("projects");
  const slug = slugify(body.slug || value.title);
  if (!slug) return json({ error: "Could not derive a slug from the title" }, 400);
  if (await col.findOne({ slug })) return json({ error: `slug '${slug}' already exists` }, 400);

  let pinOrder = null;
  if (value.pinned) {
    const violation = await pinViolation(col);
    if (violation) return json({ error: violation }, 400);
    pinOrder = await nextPinOrder(col);
  }
  if (value.order === undefined) {
    const top = await col.find({}).sort({ order: -1 }).limit(1).toArray();
    value.order = (top[0]?.order ?? -1) + 1;
  }

  const now = new Date();
  await col.insertOne({
    slug,
    ...value,
    monogram: value.title.charAt(0).toUpperCase(),
    pinOrder,
    createdAt: now,
    updatedAt: now,
  });
  await logActivity(db, { action: "added", kind: "project", title: value.title });
  revalidatePath("/", "layout");
  return json(clean(await col.findOne({ slug })), 201);
}
