import Link from "next/link";
import SectionHead from "../../components/SectionHead";
import PageHero from "../../components/PageHero";
import JsonLd from "../../components/JsonLd";
import { IconArrow } from "../../components/icons";

export const metadata = {
  title: "About",
  description:
    "A studio that refuses to stay down — the Daruma way of working, the four ikigai questions behind every project, and a simple three-step process.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | ikigaicoding",
    description:
      "A studio that refuses to stay down — the Daruma way of working, the four ikigai questions behind every project, and a simple three-step process.",
    url: "/about",
  },
};

const PILLARS = [
  { kanji: "愛", title: "What you love", text: "Work we are proud to sign. If a project does not excite the people building it, it shows in the result — so we choose work we can care about." },
  { kanji: "技", title: "What you are good at", text: "Craft, practised daily: modern web stacks, clean architecture, honest engineering. Skill is the pillar that turns intention into something that ships." },
  { kanji: "世", title: "What the world needs", text: "Real problems for real businesses — a shop that needs to sell online, a team drowning in spreadsheets, a service nobody can find on Google." },
  { kanji: "価", title: "What you can be paid for", text: "Value that earns its price: more enquiries, faster operations, a store that sells while you sleep. If it does not pay for itself, we say so." },
];

const STEPS = [
  { title: "You send the enquiry", text: <>Two minutes on the <Link href="/contact" style={{ color: "var(--emerald-700)", fontWeight: 700 }}>contact page</Link> — what you want to build, in your own words. Rough is fine.</> },
  { title: "We reply within 24 hours", text: "With questions where we need clarity, or a quote where we do not. Either way, you get clear next steps — never a sales script." },
  { title: "We agree, then we build", text: "Scope, timeline and price agreed in writing first. Then we build — and we keep rising until the second eye can be painted in." },
];

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: { "@type": "ProfessionalService", name: "ikigaicoding", slogan: "Fall seven times, get up eight." },
  };

  return (
    <>
      <JsonLd data={schema} />

      <PageHero
        eyebrow="About the studio"
        title="A Studio That Refuses to Stay Down"
        lead="Ikigai Coding is a software and website studio built on a Japanese idea: find the work worth rising for, then keep rising until it works. We build custom software, websites and search visibility for businesses that refuse to give up."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <article className="glass-card doc-card">
            <h2 className="h3" style={{ fontSize: 26, color: "var(--ink)", marginTop: 0 }}>The Daruma way of working</h2>
            <p>
              In Japan, a Daruma doll is how a goal begins. You paint in <strong>one eye</strong> when you set
              the goal — a promise to yourself, kept in plain sight. The second eye stays blank while the work
              is unfinished, a daily reminder that the goal is still waiting for its other half. You paint it
              in only when the goal is achieved.
            </p>
            <p>
              That ritual is our project process. Every engagement starts by writing the goal down together —
              that is eye one. Then we design, build, rank and refine, and we do not call a project finished
              until the goal on the wall is met — that is eye two. Between the two eyes there is only the
              work, done properly.
            </p>
            <p>
              Our Daruma wears its craft openly: <strong>{"{ }"} code brackets for eyes</strong>, because code is how we
              keep promises now, and a <strong>hachimaki headband</strong> — the knot tied for hard work and focus.
              And like every real Daruma, it has a weighted base: knock it down and it rolls upright, every
              single time. Fall seven times, get up eight — that is not our slogan, it is our operating system.
            </p>
            <p>
              See what that persistence produces in <Link href="/work">our work</Link>, or browse{" "}
              <Link href="/services">the eight services</Link> it powers.
            </p>
            <div style={{ textAlign: "center", marginTop: 26 }}>
              <img src="/assets/icon.svg" alt="ikigaicoding Daruma — the official mark" style={{ height: 120, width: "auto", margin: "0 auto" }} />
                <div className="daruma-ground-shadow" aria-hidden="true" />
              <p style={{ color: "var(--gold-dark)", letterSpacing: 2, fontSize: 11.5, fontWeight: 700, marginTop: 12 }}>THE OFFICIAL MARK · DARUMA 達磨</p>
            </div>
          </article>

          <div style={{ marginTop: 70 }}>
            <SectionHead
              center
              eyebrow="Ikigai"
              title="Four questions behind every project"
              lead="Ikigai — a reason for being — sits where four circles overlap. We ask all four before we write a line of code, because a website that answers only one of them never lasts."
            />
            <div className="grid grid-4">
              {PILLARS.map((p) => (
                <div className="card" key={p.title}>
                  <span className="pillar-kanji" aria-hidden="true">{p.kanji}</span>
                  <h3 className="mt-2">{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 70 }}>
            <SectionHead
              center
              eyebrow="Process"
              title="How we work"
              lead="No forms disappearing into a void, no jargon walls. Three steps, and you always know which one you are on."
            />
            <div className="grid grid-3">
              {STEPS.map((s, i) => (
                <div className="card" key={s.title}>
                  <span className="step-num" aria-hidden="true">{i + 1}</span>
                  <h3 className="mt-2">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band-emerald section" aria-label="Call to action">
        <div className="container center">
          <span className="eyebrow on-dark">Begin</span>
          <h2 className="h2" style={{ color: "#fff", marginTop: 14 }}>Have a goal? Let&apos;s paint the first eye.</h2>
          <p className="lead on-dark" style={{ margin: "0 auto 28px" }}>Tell us what you want to build. Within 24 hours you&apos;ll have clear next steps — in plain words, zero pressure.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-gold">Book Call <IconArrow /></Link>
            <Link href="/contact" className="btn btn-outline">Start a Project</Link>
          </div>
        </div>
      </section>
    </>
  );
}
