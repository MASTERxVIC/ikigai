// GET/POST /api/admin/testimonials — authed. Collection: `testimonials`.
// GET lists all testimonials sorted by `order`.
// POST creates one (quote, name, role, order, visible).
// Writes revalidate '/' (layout).
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "../../../../lib/db.js";
import { requireAdmin } from "../../../../lib/auth.js";
import { logActivity } from "../../../../lib/activity.js";

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

function validateTestimonial(body) {
  const quote = String(body.quote || "").trim();
  const name = String(body.name || "").trim();
  const role = String(body.role || "").trim();
  if (!quote) return { error: "quote is required" };
  if (!name) return { error: "name is required" };
  if (!role) return { error: "role is required" };
  if (body.order !== undefined && !Number.isFinite(Number(body.order))) {
    return { error: "order must be a number" };
  }
  return {
    value: {
      quote,
      name,
      role,
      order: body.order !== undefined ? Number(body.order) : undefined,
      visible: body.visible === undefined ? true : Boolean(body.visible),
    },
  };
}

export async function GET(request) {
  const guard = requireAdmin(request);
  if (guard) return guard;
  const db = await getDb();
  if (!db) return json({ error: "Database unavailable" }, 503);
  const docs = await db.collection("testimonials").find({}).sort({ order: 1 }).toArray();
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
  const { error, value } = validateTestimonial(body);
  if (error) return json({ error }, 400);

  const col = db.collection("testimonials");
  if (value.order === undefined) {
    const top = await col.find({}).sort({ order: -1 }).limit(1).toArray();
    value.order = (top[0]?.order ?? -1) + 1;
  }
  const now = new Date();
  const result = await col.insertOne({ ...value, createdAt: now, updatedAt: now });
  await logActivity(db, { action: "added", kind: "testimonial", title: shortQuote(value.quote) });
  revalidatePath("/", "layout");
  return json(clean(await col.findOne({ _id: result.insertedId })), 201);
}
