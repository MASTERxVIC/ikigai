import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "This page does not exist — but like the Daruma, let's get back up.",
};

export default function NotFound() {
  return (
    <section className="dark-band section center" style={{ padding: "170px 0 110px" }}>
      <div className="container">
        <h1 className="h-display" style={{ color: "#fff" }}>Lost? <span style={{ color: "#e6cd96" }}>Rise again.</span></h1>
        <p className="lead on-dark" style={{ margin: "0 auto 28px" }}>This page took a fall. Let&apos;s get you back on the path.</p>
        <Link href="/" className="btn btn-gold">Back Home</Link>
      </div>
    </section>
  );
}
