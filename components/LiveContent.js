"use client";

// useLiveContent — tab-return live refresh for the public pages.
//
// When an admin edits content in /admin, an already-open public page
// shows the new content WITHOUT a page refresh: the moment the visitor
// returns to the tab, this hook fetches /api/content once and swaps in
// the fresh data if it differs.
//
// Deliberately minimal: one `visibilitychange` listener, no timer, no
// polling, no version field — so an idle open tab costs nothing. Any
// failure is silent: the page keeps showing its server-rendered content
// and never breaks.
import { useEffect, useState } from "react";

export function useLiveContent(initial) {
  const [content, setContent] = useState(initial);

  useEffect(() => {
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (!res.ok) return;
        const fresh = await res.json();
        if (!fresh || typeof fresh !== "object") return;
        setContent((current) => {
          // Compare only the slices this island actually renders, so a
          // page that only shows services never re-renders because a
          // project changed elsewhere. State changes only when a
          // rendered slice differs (JSON comparison).
          const next = { ...current };
          let changed = false;
          for (const key of Object.keys(current)) {
            if (key in fresh && JSON.stringify(fresh[key]) !== JSON.stringify(current[key])) {
              next[key] = fresh[key];
              changed = true;
            }
          }
          return changed ? next : current;
        });
      } catch {
        // Silent: a failed refresh must never break the page.
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") refresh();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return content;
}
