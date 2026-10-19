import Link from "next/link";
import SectionHead from "../../components/SectionHead";
import { IconArrow } from "../../components/icons";
import { PROJECTS } from "../../lib/content";

export const metadata = {
  title: "Work",
  description:
    "Selected work from ikigaicoding — e-commerce, custom software, SEO and landing pages. Real case studies coming with real launches.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | ikigaicoding",
    description:
      "Selected work from ikigaicoding — e-commerce, custom software, SEO and landing pages. Real case studies coming with real launches.",
    url: "/work",
  },
};

export default function Work() {
  return (
    <>
      <section className="dark-band" style={{ padding: "150px 0 70px" }}>
        <div className="container">
          <span className="eyebrow on-dark">Work / Portfolio</span>
          <h1 className="h-display" style={{ color: "#fff", marginTop: 14 }}>Proof,<br />not promises.</h1>
          <p className="lead on-dark">Placeholder projects for now — every one will become a real case study with numbers.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {PROJECTS.map((p) => (
              <article className="work-card" key={p.title}>
                <div className="work-visual" style={{ background: p.color, height: 240, fontSize: 34 }}>{p.title}</div>
                <div className="work-body">
                  <span className="tag">{p.tag}</span>
                  <h2 className="h3 mt-2">{p.title}</h2>
                  <p>{p.desc}</p>
                  <p style={{ fontSize: 13 }}><strong>Stack*:</strong> React · Node · <strong>Result*:</strong> to be measured</p>
                </div>
              </article>
            ))}
          </div>
          <div className="placeholder-note">*All project names, stacks and results are placeholders. Atul will replace with real client work.</div>
          <div className="center mt-4">
            <h2 className="h2">Your project could headline this page.</h2>
            <Link href="/contact" className="btn btn-gold mt-2">Book Call <IconArrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
