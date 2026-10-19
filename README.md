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

## Backlink ideas (to grow external links)

1. Listings: Google Business Profile, GoodFirms, Clutch, DesignRush, JustDial, IndiaMART
2. Portfolios: Behance, Dribbble project posts linking back
3. Content: dev.to / Hashnode articles (author bio link), guest posts on startup blogs
4. GitHub: publish a small open-source tool with the site linked in README
5. Expert quotes: HARO / Featured / Terkel (journalist backlinks)
6. Tool testimonials: leave testimonials for tools you use (many link back)
7. Communities: Indie Hackers, Reddit (genuinely helpful answers, link in profile/context)
8. Partners: link-swap with complementary freelancers/agencies
