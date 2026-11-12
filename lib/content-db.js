// Server-only data layer for the public pages.
//
// Reads services / projects / testimonials from MongoDB (via lib/db.js)
// and falls back to the static copy in lib/content.js whenever the DB is
// missing, unreachable, or has no visible rows.
//
// Nothing here ever throws: a public page must never break because of the
// database. getDb() is assumed to exist (Worker A) with signature
// getDb() -> the `ikigaicoding` db, or null when MONGODB_URI is
// missing/unreachable. `await` is used so it works whether getDb is
// sync or async.
import { getDb } from "./db.js";
import { SERVICES, PROJECTS, TESTIMONIALS } from "./content.js";

const isVisible = (row) => row && row.visible !== false;

// Mongo docs are not plain-serialisable (_id is an ObjectId, dates are Date
// objects) and the public components that receive this data (WorkCard,
// TestimonialCarousel) are client components — so strip _id and convert
// dates to ISO strings before returning anything.
function toPlain(row) {
  const { _id, ...rest } = row;
  for (const key of ["createdAt", "updatedAt"]) {
    if (rest[key] instanceof Date) rest[key] = rest[key].toISOString();
  }
  return rest;
}

// Returns the raw rows of a collection, or null when the DB is missing,
// unreachable, or the read fails for any reason. Never throws.
async function readCollection(name) {
  try {
    const db = await getDb();
    if (!db) return null;
    return await db.collection(name).find({}).toArray();
  } catch {
    return null;
  }
}

// Services: `order` asc. Rows without `order` keep their relative order
// (stable sort), so the static fallback keeps its locked order.
function sortServices(rows) {
  return [...rows].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

// Projects: pinned first by `pinOrder` asc, then the rest by `order` asc,
// or newest first (createdAt desc) when no `order` is set.
function sortProjects(rows) {
  return [...rows].sort((a, b) => {
    const aPin = a.pinOrder ?? null;
    const bPin = b.pinOrder ?? null;
    if (aPin !== null && bPin !== null) return aPin - bPin;
    if (aPin !== null) return -1;
    if (bPin !== null) return 1;
    if (a.order != null && b.order != null) return a.order - b.order;
    const aT = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bT = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bT - aT;
  });
}

// Testimonials: `order` asc.
function sortTestimonials(rows) {
  return [...rows].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
}

// Public getters: only visible rows (visible !== false). Falls back to the
// static arrays from lib/content.js when the DB is null/unreachable, the
// collection is empty, or it has zero visible rows.
async function getVisible(name, fallback, sortFn) {
  const rows = await readCollection(name);
  if (!rows || rows.length === 0) return [...fallback];
  const visible = rows.filter(isVisible).map(toPlain);
  if (visible.length === 0) return [...fallback];
  return sortFn(visible);
}

export async function getServices() {
  return getVisible("services", SERVICES, sortServices);
}

export async function getProjects() {
  return getVisible("projects", PROJECTS, sortProjects);
}

export async function getTestimonials() {
  return getVisible("testimonials", TESTIMONIALS, sortTestimonials);
}

// Admin getters: all rows, visible and hidden. Same fallback when the DB
// is null/unreachable or the collection is empty. No API routes are built
// here — these are for Worker A's admin API to use.
async function getAll(name, fallback, sortFn) {
  const rows = await readCollection(name);
  if (!rows || rows.length === 0) return [...fallback];
  return sortFn(rows.map(toPlain));
}

export async function getAllServices() {
  return getAll("services", SERVICES, sortServices);
}

export async function getAllProjects() {
  return getAll("projects", PROJECTS, sortProjects);
}

export async function getAllTestimonials() {
  return getAll("testimonials", TESTIMONIALS, sortTestimonials);
}
