# ikigaicoding — Next.js site

Emerald "Daruma Hall" theme. **Next.js 16 (App Router) — fully static-prerendered (SSG), so every page ships real HTML for SEO/GEO/AEO.** No SPA caveat anymore.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static export-ready)
npm start        # serve the production build
```

## What's inside

- **Pages:** Home, Services, Work, About, Contact (+ 404) — all prerendered as static HTML
- **Intro splash:** full-screen Daruma intro (ghost marquee, ENTER button) — shows once per session, skippable
- **Hero:** emerald hall artwork bg, left-aligned 2-line headline, Book Call + Explore, stats row
- **8 services** (locked order): ghost-number cards (Nunito 900), gold-caps name eyebrow, pill button
- **Daruma story band**, work grid, testimonials, FAQ accordion, CTA band
- **Contact:** form opens WhatsApp with pre-filled enquiry; WhatsApp float button site-wide
- **Footer:** emerald, page-tear edge, "ikigai" link column

## SEO / GEO / AEO

- Per-page `metadata`: title, description, canonical, Open Graph, Twitter card
- JSON-LD: ProfessionalService + WebSite + FAQPage (home), ItemList + FAQPage (services), AboutPage (about)
- `app/sitemap.js` → `/sitemap.xml` (auto), `public/robots.txt`

## Content status

ALL contact details, stats, testimonials, projects and pricing are **placeholders** — replace before launch:
- `lib/content.js` → `WHATSAPP_NUMBER`, `EMAIL`, `STATS`, `TESTIMONIALS`, `PROJECTS`
- `lib/seo.js` + `app/layout.js` → `SITE_URL` (currently `https://ikigaicoding.com` placeholder)

## Deploy

Vercel: import this folder, done (no config needed). Netlify: build command `npm run build`, publish `.next` — or `next start` on any Node host.

## Admin panel

Owner-only panel at `/admin` (no public links point to it; it sends
`X-Robots-Tag: noindex, nofollow`). Login is a 6-digit authenticator-app
code (TOTP, RFC 6238) or a single-use backup code — no Google sign-in,
no email/password. The `/admin` page itself is the login screen when
logged out. Admin data lives in MongoDB collections `services`,
`projects`, `testimonials` (+ `admin_auth` for the owner credential);
when the DB is unreachable the public site keeps serving the static
copy in `lib/content.js`.

Env vars (see `.env.example` — placeholders only, never real values):

- `MONGODB_URI` — Atlas connection string, database `ikigaicoding`
- `ADMIN_SESSION_SECRET` — at least 32 random characters; signs the
  `ikigai_admin` session cookie (httpOnly, 7 days)
- `ADMIN_SETUP_CODE` — long random code, used once for setup

Setup flow (one time):

1. Set the three env vars (locally in `.env.local`, on Vercel in the
   project settings) and redeploy/restart.
2. Open `/admin/setup`, enter the `ADMIN_SETUP_CODE`. The page shows a
   TOTP secret (QR / `otpauth://` URL) and 10 backup codes — save the
   backup codes somewhere safe, they are shown only once.
3. Scan the secret into an authenticator app (Google/Microsoft Authenticator,
   1Password, …), enter the 6-digit code to confirm. Setup is done.
4. Log in at `/admin` with the authenticator code. A backup code also
   works, once each. Log out from the panel (or `POST /api/admin/logout`).

API (all under `/api/admin/*`, JSON; write routes revalidate `/`):

- `GET /api/admin/status` — `{ setupDone, authed }` (public)
- `POST /api/admin/setup` — `{ setupCode }` then `{ setupCode, code }`
- `POST /api/admin/login` — `{ code }`, sets the session cookie
- `POST /api/admin/logout` — clears the session cookie
- `GET/POST /api/admin/services`, `PUT/PATCH/DELETE /api/admin/services/[slug]`
- `GET/POST /api/admin/projects`, `PUT/PATCH/DELETE /api/admin/projects/[slug]`
  — max **4** pinned on Home; pinning a 5th returns 400
  `Only 4 projects can be pinned on Home. Unpin one first.`
  Monograms are auto-derived from the title; no image field is accepted.
- `GET/POST /api/admin/testimonials`, `PUT/PATCH/DELETE /api/admin/testimonials/[id]`

Login/setup are rate-limited (5 attempts per IP per 5 min, then 429).
If a backup code is ever used, generate a fresh set by re-running setup
after deleting the `admin_auth` owner doc — there is no self-serve reset.

## Backlink ideas (to grow external links)

1. Listings: Google Business Profile, GoodFirms, Clutch, DesignRush, JustDial, IndiaMART
2. Portfolios: Behance, Dribbble project posts linking back
3. Content: dev.to / Hashnode articles (author bio link), guest posts on startup blogs
4. GitHub: publish a small open-source tool with the site linked in README
5. Expert quotes: HARO / Featured / Terkel (journalist backlinks)
6. Tool testimonials: leave testimonials for tools you use (many link back)
7. Communities: Indie Hackers, Reddit (genuinely helpful answers, link in profile/context)
8. Partners: link-swap with complementary freelancers/agencies
