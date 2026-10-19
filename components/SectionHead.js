export default function SectionHead({ eyebrow, title, lead, dark = false, center = false }) {
  return (
    <div className={center ? "center" : ""} style={{ marginBottom: 44, maxWidth: center ? 720 : "none", marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }}>
      <span className={`eyebrow${dark ? " on-dark" : ""}`}>{eyebrow}</span>
      <h2 className="h2" style={{ marginTop: 14, color: dark ? "#fff" : "inherit" }}>{title}</h2>
      {lead && <p className={`lead${dark ? " on-dark" : ""}`}>{lead}</p>}
    </div>
  );
}
