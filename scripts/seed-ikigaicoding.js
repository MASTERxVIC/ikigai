// Seed script for the ikigaicoding public content collections.
// Usage: npm run seed  (requires MONGODB_URI in the environment, e.g. via
// .env.local — see .env.example)
//
// Seeds the current 8 services, 4 projects and 3 testimonials from
// lib/content.js into the `ikigaicoding` database. The copy is imported,
// never retyped, so the seed always matches the live static content.
//
// Idempotent: every row is upserted on a stable key, so re-running never
// duplicates — it only updates rows whose copy changed. No auth/admin
// data is seeded here.
//
// Written in CommonJS syntax with dynamic import() so it runs under plain
// `node` without a "type": "module" package, and so the MONGODB_URI check
// runs before the `mongodb` driver is even loaded.
"use strict";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "MONGODB_URI is missing — set it in .env.local (see .env.example) and re-run."
    );
    process.exit(1);
  }

  // Loaded only after the env check, so the missing-URI message works even
  // before `npm install` has been run.
  const { MongoClient } = await import("mongodb");
  const { SERVICES, PROJECTS, TESTIMONIALS } = await import("../lib/content.js");

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("ikigaicoding");

    // Upserts one doc and reports inserted (1) / updated (1) / unchanged (0).
    async function upsert(collection, filter, doc) {
      const res = await collection.updateOne(
        filter,
        {
          $set: { ...doc, updatedAt: new Date() },
          $setOnInsert: { createdAt: new Date() },
        },
        { upsert: true }
      );
      if (res.upsertedCount > 0) return "inserted";
      if (res.modifiedCount > 0) return "updated";
      return "unchanged";
    }

    async function seedCollection(name, items, filterFor, docFor) {
      const collection = db.collection(name);
      const counts = { inserted: 0, updated: 0, unchanged: 0 };
      for (let i = 0; i < items.length; i++) {
        counts[await upsert(collection, filterFor(items[i], i), docFor(items[i], i))] += 1;
      }
      console.log(
        `${name}: ${counts.inserted} inserted, ${counts.updated} updated, ${counts.unchanged} unchanged (${items.length} total)`
      );
      return counts;
    }

    // Idempotency keys:
    // - services / projects: `slug` (stable, unique per row in lib/content.js)
    // - testimonials: `quote` + `name` (testimonials have no slug)
    await seedCollection(
      "services",
      SERVICES,
      (s) => ({ slug: s.slug }),
      (s, i) => ({ ...s, order: i + 1, visible: true })
    );

    // All 4 projects are pinned, pinOrder 1-4 in the order they appear in
    // lib/content.js: Wanderlust, CineVerse, Studio D, Employee Panel.
    await seedCollection(
      "projects",
      PROJECTS,
      (p) => ({ slug: p.slug }),
      (p, i) => ({
        ...p,
        pinned: true,
        pinOrder: i + 1,
        order: i + 1,
        visible: true,
      })
    );

    await seedCollection(
      "testimonials",
      TESTIMONIALS,
      (t) => ({ quote: t.quote, name: t.name }),
      (t, i) => ({ ...t, order: i + 1, visible: true })
    );

    console.log("Seed complete.");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
