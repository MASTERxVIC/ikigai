import Link from "next/link";
import LegalShell from "../../components/LegalShell";
import { EMAIL } from "../../lib/content";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Which cookies ikigaicoding uses, which it refuses to use, and how to control all of them from your browser.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicy() {
  return (
    <LegalShell
      title="Cookie Policy"
      summary="Which cookies this site uses, which it refuses to use, and how to control all of them from your browser."
    >
      <h3>1. What cookies are</h3>
      <p>
        Cookies are small text files a website stores in your browser so it can remember things
        between visits — like a preference you set. Closely related browser storage (such as
        localStorage) does the same job and is covered by this policy wherever we mention cookies.
      </p>

      <h3>2. What this site uses</h3>
      <p>
        Our honest position is simple: this site uses only essential storage — for example,
        remembering your cookie-consent choice so the banner does not nag you on every visit — and
        no advertising trackers at all. Optional analytics, if ever enabled, runs only with your
        permission.
      </p>
      <table className="cookie-table">
        <thead>
          <tr><th>Category</th><th>What it does</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Essential</strong></td>
            <td>Keeps the site working and remembers choices you make here, such as your cookie consent.</td>
            <td>Always on</td>
          </tr>
          <tr>
            <td><strong>Analytics</strong></td>
            <td>Would help us understand which pages are useful. Only ever loaded with your consent.</td>
            <td>Only with consent, if enabled</td>
          </tr>
          <tr>
            <td><strong>Marketing</strong></td>
            <td>Advertising and cross-site tracking cookies.</td>
            <td>None — we do not use them</td>
          </tr>
        </tbody>
      </table>

      <h3>3. The consent banner</h3>
      <p>
        On your first visit, a banner at the bottom of the page asks whether optional analytics
        cookies may be used. Choosing Accept or Decline stores that single choice in your browser;
        Decline keeps analytics off. You can change your mind at any time by clearing this site’s
        cookies and storage in your browser — the banner will simply ask again.
      </p>

      <h3>4. How to control cookies</h3>
      <p>
        Every modern browser lets you view, block and delete cookies: look under Settings → Privacy
        (or Site Settings) in Chrome, Firefox, Safari or Edge. You can also browse in a private
        window, where storage is discarded when the window closes. Blocking essential storage may
        reset preferences such as the consent choice.
      </p>

      <h3>5. Changes to this policy</h3>
      <p>
        If the cookies this site uses ever change, this page will be updated first, with a new
        “last updated” date — before any new cookie is set.
      </p>

      <h3>6. Contact</h3>
      <p>
        Questions about cookies or storage? Email {EMAIL}. See also our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalShell>
  );
}
