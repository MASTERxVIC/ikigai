"use client";

// Live islands for the public pages — thin client wrappers around the
// markup the server pages rendered before. Each island renders EXACTLY
// the same markup (same classes, same order, same ids/anchors) with the
// same initial props, but its data refreshes when the visitor returns
// to the tab after an admin edit (see useLiveContent in ./LiveContent).
import Link from "next/link";
import { useLiveContent } from "./LiveContent";
import WorkCard from "./WorkCard";
import TestimonialCarousel from "./TestimonialCarousel";
import { SERVICE_ICONS } from "./icons";

// Home — services grid (.ref-svc-grid), markup copied verbatim from
// app/(public)/page.js.
export function LiveHomeServices({ initialServices }) {
  const content = useLiveContent({ services: initialServices });
  const services = content.services;
  return (
    <div className="ref-svc-grid">
      {services.map((s, i) => (
        <article className="ref-svc" key={s.slug}>
          <img src="/assets/rope.svg" alt="" aria-hidden="true" className="ref-card-rope" />
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <div className="ref-ghost" aria-hidden="true">{i + 1}</div>
          <Link href={`/services#${s.slug}`} className="ref-pill">Learn more</Link>
        </article>
      ))}
    </div>
  );
}

// Home — selected work grid (.ref-proj-grid). The pinned selection uses
// the EXACT same logic the Home page used before: pinned projects only,
// max 4; when nothing is pinned yet, the first 4 in order.
export function LiveHomeWork({ initialProjects }) {
  const content = useLiveContent({ projects: initialProjects });
  const projects = content.projects;
  const pinned = projects.filter((p) => p.pinOrder != null);
  const homeProjects = (pinned.length > 0 ? pinned : projects).slice(0, 4);
  return (
    <div className="ref-proj-grid">
      {homeProjects.map((p) => (
        <WorkCard key={p.slug} p={p} />
      ))}
    </div>
  );
}

// Home — testimonials. The carousel itself is unchanged; only its items
// become live.
export function LiveHomeTestimonials({ initialTestimonials }) {
  const content = useLiveContent({ testimonials: initialTestimonials });
  return <TestimonialCarousel items={content.testimonials} />;
}

// Services page — service-cards grid, markup copied verbatim from
// app/(public)/services/page.js (same ids/anchors for #slug links).
export function LiveServicesGrid({ initialServices }) {
  const content = useLiveContent({ services: initialServices });
  const services = content.services;
  return (
    <div className="grid grid-2">
      {services.map((s, i) => {
        const Icon = SERVICE_ICONS[s.icon];
        const num = `${i + 1}`;
        return (
          <article className="svc-card glass-card" id={s.slug} key={s.slug} style={{ scrollMarginTop: 100 }}>
            <span className="svc-ghost" aria-hidden="true">{num}</span>
            <div className="svc-eyebrow"><span className="svc-ico"><Icon /></span> {s.title}</div>
            <p style={{ fontSize: 15.5 }}>{s.desc}</p>
            <ul className="svc-points">
              {s.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            {s.note ? (
              <p className="svc-note">
                {s.note.text} <Link href={`/services#${s.note.linkSlug}`}>{s.note.linkLabel}</Link>.
              </p>
            ) : null}
            <div className="mt-2">
              <Link href="/contact" className="svc-pill">
                {"Start a project →".split("").map((ch, i) => (
                  <span key={i} className="ch" style={{ "--d": `${i * 15}ms` }}>
                    <span>{ch === " " ? "\u00A0" : ch}</span>
                    <span aria-hidden="true">{ch === " " ? "\u00A0" : ch}</span>
                  </span>
                ))}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
