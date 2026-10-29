/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Security headers. These are render-safe (they cannot break layout or
  // hydration). No strict script CSP here on purpose: Next's static pages
  // ship their own inline hydration scripts, and a script-src without a
  // nonce would break every interactive piece (Daruma, accordion, nav).
  // When a real server route is ever added, add a nonce-based CSP then.
  // NOTE: headers() applies when served by a Next server (e.g. Vercel).
  // If the site is ever served as pure static files, the host must set
  // these same headers (e.g. a _headers file on Netlify).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
