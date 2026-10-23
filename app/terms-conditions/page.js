import Link from "next/link";
import LegalShell from "../../components/LegalShell";
import { EMAIL } from "../../lib/content";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "The working agreement between ikigaicoding and the people who hire us — quotes, timelines, payments, ownership and the rest, without the fine-print fog.",
  alternates: { canonical: "/terms-conditions" },
};

export default function Terms() {
  return (
    <LegalShell
      title="Terms & Conditions"
      summary="The working agreement between Ikigai Coding and the people who hire us — quotes, timelines, payments, ownership and the rest, without the fine-print fog."
    >
      <h3>1. Our services</h3>
      <p>
        Ikigai Coding (“ikigaicoding”, “we”, “us”) provides custom software development, website
        design and development, e-commerce websites, SEO, GEO and AEO services, landing pages, and
        website maintenance, as described on our <Link href="/services">Services page</Link>. Using
        this website, or engaging us for a project, means you accept these terms.
      </p>

      <h3>2. Enquiries and quotes</h3>
      <p>
        Anything we say in an initial reply — including prices and timelines — is an estimate based
        on what we know at that moment. A quote becomes firm only when a written scope of work is
        agreed by both sides. Until then, neither side is committed.
      </p>

      <h3>3. Project timelines</h3>
      <p>
        Agreed timelines assume timely feedback, content and approvals from you (see section 5). If
        inputs arrive late, dates move by a matching amount, and we will tell you promptly and in
        writing. We do not silently miss dates.
      </p>

      <h3>4. Payments</h3>
      <p>
        Fees, milestones and payment schedule are set out in the agreed proposal or invoice for your
        project. Work may pause if a milestone payment is overdue, and final deliverables are handed
        over on full payment (see section 6).
      </p>

      <h3>5. Client responsibilities</h3>
      <ul>
        <li>Provide the content, assets, logins and information the project needs, in good time.</li>
        <li>Give consolidated feedback and approvals at each agreed checkpoint.</li>
        <li>Ensure you hold the rights to any content, images or materials you supply to us.</li>
      </ul>

      <h3>6. Intellectual property</h3>
      <p>
        On full payment, you own the final deliverables created for your project — the website,
        designs and content produced for you. Until full payment, those deliverables remain our
        property. We may show the finished work in our portfolio and case studies unless you ask us
        in writing not to. Pre-existing tools, libraries and know-how we bring to the work remain
        ours, licensed to you as part of the deliverable.
      </p>

      <h3>7. Revisions</h3>
      <p>
        Each project’s agreed scope includes the revision rounds stated in its proposal. Requests
        beyond the agreed scope or revision rounds are quoted separately before we start on them —
        never billed as a surprise.
      </p>

      <h3>8. Third-party services</h3>
      <p>
        Projects may rely on third-party services (hosting, domains, payment gateways, APIs and
        similar). Those services run under their own terms and pricing, which are outside our
        control; accounts for them are held in your name wherever possible.
      </p>

      <h3>9. Limitation of liability</h3>
      <p>
        We build carefully and test thoroughly, but software is never perfectly bug-free. Our
        liability for any project is limited to the fees you paid us for that project. We are not
        liable for indirect losses — including lost profits, lost data held outside our
        deliverables, or downtime of third-party services.
      </p>

      <h3>10. Termination</h3>
      <p>
        Either side may end a project in writing. Work completed up to the termination date is
        payable, and completed deliverables are handed over once that payment clears. Deposits for
        un-started milestones are returned.
      </p>

      <h3>11. Governing law</h3>
      <p>
        These terms are governed by the laws of India. Any dispute will first be discussed in good
        faith — the Daruma way is to get back up and talk — and, failing that, resolved in the
        courts of India.
      </p>

      <h3>12. Changes to these terms</h3>
      <p>
        We may update these terms; the version published on this page, with its “last updated” date,
        is the one that applies. Terms already agreed in a signed proposal for an ongoing project
        do not change mid-project.
      </p>

      <h3>13. Contact</h3>
      <p>
        Questions about these terms? Email {EMAIL}. See also our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
    </LegalShell>
  );
}
