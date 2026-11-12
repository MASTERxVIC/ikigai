// lib/db.js — MongoDB client singleton for ikigaicoding.
// Worker A (Auth + API). The `mongodb` package is added by Worker C
// (package.json owner); this file only imports it, never installs it.
//
// Contract: getDb() returns the `ikigaicoding` Db object, or null when
// MONGODB_URI is missing or the server cannot be reached. It NEVER throws
// on import and never throws for a missing/unreachable DB — callers fall
// back (public pages read lib/content.js; admin routes answer 503).

import { MongoClient } from "mongodb";

const DB_NAME = "ikigaicoding";

// Cache the client promise on globalThis so Next dev hot-reloads and
// serverless warm invocations reuse one connection instead of opening
// a new socket per request.
const g = globalThis;
if (!g.__ikigaiMongo) g.__ikigaiMongo = { client: null, promise: null };

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!g.__ikigaiMongo.promise) {
    const client = new MongoClient(uri, {
      // Fail fast-ish instead of hanging a request for 30s on a dead DB.
      serverSelectionTimeoutMS: 5000,
    });
    g.__ikigaiMongo.client = client;
    g.__ikigaiMongo.promise = client.connect().catch((err) => {
      // Reset so a later request retries instead of caching a dead client.
      g.__ikigaiMongo.promise = null;
      g.__ikigaiMongo.client = null;
      throw err;
    });
  }
  return g.__ikigaiMongo.promise;
}

export async function getDb() {
  try {
    const promise = getClientPromise();
    if (!promise) return null;
    const client = await promise;
    return client.db(DB_NAME);
  } catch {
    return null;
  }
}

export async function getCollection(name) {
  const db = await getDb();
  return db ? db.collection(name) : null;
}

// Test/maintenance helper only — not used by any route.
export async function closeDb() {
  if (g.__ikigaiMongo.client) {
    await g.__ikigaiMongo.client.close().catch(() => {});
    g.__ikigaiMongo.client = null;
    g.__ikigaiMongo.promise = null;
  }
}
