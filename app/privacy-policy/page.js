import Link from "next/link";
import LegalShell from "../../components/LegalShell";
import { EMAIL } from "../../lib/content";

export const metadata = {
  title: "Privacy Policy",
  description:
    "What ikigaicoding collects, why we collect it, and the rights you keep over your own details — in plain words.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <LegalShell
      title="Privacy Policy"
      summary="What we collect, why we collect it, and the rights you keep over your own details — in plain words."
    >
      <h3>1. Who we are</h3>
      <p>
        Ikigai Coding (“ikigaicoding”, “we”, “us”) is a software and website studio based in India,
        working with clients worldwide. If you have any question about this policy or your data,
        contact us at {EMAIL}.
      </p>

      <h3>2. What we collect</h3>
      <p>We collect only what an enquiry or a project actually needs:</p>
      <ul>
        <li><strong>Details you send us</strong> — your name, email address and project details when you write through the enquiry form, by email, or through the Daruma assistant on this site.</li>
        <li><strong>Basic technical data</strong> — device and browser type, and which pages you visited, in the ordinary course of the site being served to you.</li>
      </ul>
      <p>We do not ask for, and do not need, passwords, payment card numbers or government IDs through this website.</p>

      <h3>3. How we use it</h3>
      <ul>
        <li>To reply to your enquiry and prepare a quote.</li>
        <li>To deliver the services you engage us for, and to communicate about the project.</li>
        <li>To improve this website’s content and performance.</li>
      </ul>

      <h3>4. What we never do</h3>
      <p>
        We never sell your personal data. We do not trade it, rent it, or hand it to advertisers.
        Your details are used for your enquiry and your project — nothing else.
      </p>

      <h3>5. When we share it</h3>
      <p>
        We share personal data only with the service providers needed to run this website and our
        work (for example, hosting and email providers), and only to the extent their service
        requires — or when the law requires us to. Nothing beyond that.
      </p>

      <h3>6. How long we keep it</h3>
      <p>
        Enquiry details are kept while we are in conversation and for a reasonable period afterwards
        for our records. Project records are kept for the life of the engagement and as long as
        accounting and legal obligations require. You can ask us to delete your details sooner —
        see your rights below.
      </p>

      <h3>7. Your rights</h3>
      <p>
        Your data stays yours. You may ask us at any time to show you what we hold about you, to
        correct it, or to delete it. Email {EMAIL} and we will act on your request promptly.
      </p>

      <h3>8. Cookies</h3>
      <p>
        This site uses a small number of cookies and similar storage, described fully in our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h3>9. Changes to this policy</h3>
      <p>
        If this policy changes, the updated version will be published on this page with a new
        “last updated” date. Material changes will be easy to spot — we will not quietly rewrite
        the rules.
      </p>

      <h3>10. Contact</h3>
      <p>Questions about privacy? Write to {EMAIL} — a human reads every message.</p>
    </LegalShell>
  );
}
