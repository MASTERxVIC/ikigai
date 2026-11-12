// Activity log for the admin Dashboard "Latest changes" feed.
// One entry per admin change: { action, kind, title, at }.
// action: added | updated | deleted | pinned | unpinned | hidden | shown
// kind: service | project | testimonial
// logActivity never throws — a logging failure must never break the
// admin write that triggered it.
export async function logActivity(db, { action, kind, title }) {
  try {
    if (!db) return;
    await db.collection("activity").insertOne({
      action: String(action || ""),
      kind: String(kind || ""),
      title: String(title || ""),
      at: new Date(),
    });
  } catch {
    /* activity logging is best-effort only */
  }
}
