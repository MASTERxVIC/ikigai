// GET /api/content — public, NO auth. Returns the live public content
// (services, projects, testimonials) for the tab-return refresh on the
// public pages. Same data layer as the server pages (lib/content-db.js),
// so the shape matches the server-rendered props exactly.
import { NextResponse } from "next/server";
import { getServices, getProjects, getTestimonials } from "../../../lib/content-db.js";
import { SERVICES, PROJECTS, TESTIMONIALS } from "../../../lib/content.js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [services, projects, testimonials] = await Promise.all([
      getServices(),
      getProjects(),
      getTestimonials(),
    ]);
    return NextResponse.json({ services, projects, testimonials });
  } catch {
    // Never throw: fall back to the static copy, exactly like the pages.
    return NextResponse.json({ services: SERVICES, projects: PROJECTS, testimonials: TESTIMONIALS });
  }
}
