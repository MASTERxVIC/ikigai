export default function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section className="dark-band" style={{ padding: "150px 0 70px" }}>
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="eyebrow on-dark">{eyebrow}</span>
        <h1 className="h-display" style={{ color: "#fff", marginTop: 14, maxWidth: 820 }}>{title}</h1>
        {lead ? <p className="lead on-dark" style={{ maxWidth: 720 }}>{lead}</p> : null}
        {children}
        <div className="rod" aria-hidden="true" />
      </div>
    </section>
  );
}
