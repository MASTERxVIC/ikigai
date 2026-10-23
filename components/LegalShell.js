import PageHero from "./PageHero";

export default function LegalShell({ title, summary, children }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={summary}>
        <p style={{ color: "var(--gold-light)", fontSize: 13, fontWeight: 700, letterSpacing: 1, marginTop: 16, textTransform: "uppercase" }}>
          Last updated: October 2026
        </p>
      </PageHero>
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <article className="glass-card doc-card">{children}</article>
        </div>
      </section>
    </>
  );
}
