// All copy is English. Numbers marked * are placeholders — Atul corrects later.
export const WHATSAPP_NUMBER = "910000000000"; // placeholder — replace with real number
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi ikigaicoding! I want to discuss a project.")}`;
export const EMAIL = "hello@ikigaicoding.com"; // placeholder

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const SERVICES = [
  {
    slug: "custom-software",
    title: "Custom Software Build",
    short: "Tools your team actually opens every morning — built around how your business really works.",
    desc: "Off-the-shelf software forces your business to bend. We build the opposite: internal dashboards, CRMs, booking systems and automations shaped around your exact workflow — so the tool fits the team, not the other way round.",
    points: ["Internal dashboards & admin panels", "Custom CRM / ERP-lite builds", "Workflow automation & integrations", "Built to scale with your team"],
    icon: "software",
  },
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    short: "Fast, beautiful websites engineered to turn visitors into enquiries.",
    desc: "A website is not a brochure — it is your hardest-working salesperson. We design and build sites that load fast, look premium and guide every visitor toward one action: contacting you.",
    points: ["Mobile-first responsive design", "Conversion-focused layouts", "Sub-second load targets", "Easy to update & extend"],
    icon: "web",
  },
  {
    slug: "ecommerce-website",
    title: "E-commerce Website",
    short: "Online stores with UPI, cards & COD — built to sell while you sleep.",
    desc: "From product catalog to checkout to order dashboard — a complete selling machine with Indian payment methods, COD support and an admin panel your staff can run without a developer.",
    points: ["UPI / cards / netbanking + COD", "Product & inventory management", "Order pipeline dashboard", "Abandoned-cart recovery ready"],
    icon: "cart",
  },
  {
    slug: "seo",
    title: "SEO",
    short: "Rank on Google for the searches your customers actually type.",
    desc: "Search Engine Optimization that compounds: technical fixes, content that answers real queries, and authority building — so your site climbs Google and stays there, bringing free enquiries month after month.",
    points: ["Technical & on-page SEO", "Keyword & competitor research", "Content that ranks", "Monthly transparent reporting"],
    note: { text: "Being found by AI matters too — see our", linkLabel: "GEO service", linkSlug: "geo" },
    icon: "seo",
  },
  {
    slug: "geo",
    title: "GEO — Generative Engine Optimization",
    short: "Get cited by ChatGPT, Perplexity & Google AI Overviews.",
    desc: "Customers now ask AI instead of Googling. GEO makes your brand the answer those engines quote — structured content, clear facts and entity signals that large language models can trust and cite.",
    points: ["AI-search visibility audit", "Cite-ready structured content", "Entity & brand signals", "Tracking across AI engines"],
    icon: "geo",
  },
  {
    slug: "aeo",
    title: "AEO — Answer Engine Optimization",
    short: "Own the direct answers in voice search & featured snippets.",
    desc: "When someone asks a question, one brand gets the answer box. AEO structures your content as crisp, quotable answers — winning featured snippets, People Also Ask and voice results.",
    points: ["Question-based content maps", "FAQ & HowTo schema", "Featured snippet targeting", "Voice-search readiness"],
    icon: "aeo",
  },
  {
    slug: "landing-page",
    title: "Landing Page",
    short: "One page, one offer, one action — built to convert ad clicks.",
    desc: "Every rupee of ad spend deserves a page built for it. High-converting landing pages with sharp messaging, proof blocks and a single irresistible call-to-action.",
    points: ["Ad-matched messaging", "A/B test ready", "Lead capture & tracking", "Launch in days, not months"],
    icon: "landing",
  },
  {
    slug: "maintenance-speed",
    title: "Website Maintenance / Speed Fix",
    short: "Slow site? We make it fast, secure and boringly reliable.",
    desc: "A slow website silently loses customers every day. We diagnose the bottlenecks, fix Core Web Vitals, harden security and keep everything updated — so your site just works.",
    points: ["Core Web Vitals optimization", "Security hardening & backups", "Uptime monitoring", "Monthly care plans"],
    icon: "wrench",
  },
];

export const PROJECTS = [
  {
    slug: "wanderlust",
    title: "Wanderlust",
    subtitle: "Full-Stack Travel Listing Platform",
    category: "Full-Stack Platform",
    monogram: "W",
    desc: "Airbnb-style listings with authentication, image uploads, interactive maps and guest reviews — a complete booking-platform experience, live on the web.",
    built: "Property listings with photo galleries, Passport.js authentication, Cloudinary image uploads, Mapbox interactive maps, star-rating reviews, and search with filters — a complete booking-platform experience with server-rendered pages and a MongoDB data layer.",
    chips: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js", "Cloudinary", "Mapbox", "Bootstrap"],
    live: "https://wanderlust-5fdm.onrender.com/listings",
  },
  {
    slug: "cineverse",
    title: "CineVerse",
    subtitle: "Movie Discovery App",
    category: "Web App",
    monogram: "C",
    desc: "A cinema explorer powered by the TMDB API — instant search, trending rails and personal watchlists, with state managed cleanly end to end.",
    built: "Trending rails, instant search across the TMDB catalogue and personal watchlists, with global state managed cleanly in Redux Toolkit and a responsive Tailwind interface that stays fast on any screen.",
    chips: ["React", "Redux Toolkit", "Tailwind CSS", "TMDB API"],
  },
  {
    slug: "studio-d",
    title: "Studio D",
    subtitle: "Motion-Driven Agency Website",
    category: "Motion Website",
    monogram: "S",
    desc: "An award-style animated site built around GSAP scroll experiences — proof that performance and spectacle can live on the same page.",
    built: "GSAP scroll-driven experiences and Framer Motion page transitions layered over a React build, tuned carefully so the motion feels buttery without ever costing load time or jank.",
    chips: ["React", "GSAP", "Framer Motion", "Tailwind CSS"],
  },
  {
    slug: "employee-panel",
    title: "Employee Panel",
    subtitle: "Client Admin System",
    category: "Client System · MERN",
    monogram: "E",
    desc: "An employee management dashboard built for a client — records, roles and day-to-day admin handled from one dependable panel.",
    built: "Employee records, role-based access and day-to-day admin workflows brought into one dependable panel — the same craft we bring to every custom software build.",
    chips: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export const FAQS = [
  {
    q: "How long does it take to build a website?",
    a: "A typical business website takes 2–4 weeks from kickoff to launch; e-commerce and custom software take longer depending on scope. You get a clear timeline before we start — and we hit it.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on scope — a landing page and a full e-commerce store are different projects. Tell us what you need and you will get an honest, itemized quote. No hidden charges, ever.",
  },
  {
    q: "What is GEO and why does it matter for my business?",
    a: "GEO (Generative Engine Optimization) makes your brand the answer that AI engines like ChatGPT, Perplexity and Google AI Overviews quote. As more customers ask AI instead of Googling, being cited by AI becomes as valuable as ranking on Google.",
  },
  {
    q: "Do you redesign existing websites?",
    a: "Yes. We audit what is hurting your current site — speed, messaging, SEO, conversions — and rebuild it into something that performs.",
  },
  {
    q: "Will my website rank on Google?",
    a: "Every site we ship includes SEO foundations: fast loading, clean structure, meta tags and sitemaps. For competitive keywords we recommend an ongoing SEO plan.",
  },
  {
    q: "Do you provide maintenance after launch?",
    a: "Yes — care plans cover updates, backups, security monitoring and speed checks.",
  },
];

export const TESTIMONIALS = [
  { quote: "Placeholder testimonial — real client words will go here once projects ship.", name: "Placeholder Name", role: "Founder, Placeholder Co." },
  { quote: "Placeholder testimonial — this space is reserved for your first success story.", name: "Placeholder Name", role: "Owner, Placeholder Store" },
  { quote: "Placeholder testimonial — results and reviews will be added here.", name: "Placeholder Name", role: "Director, Placeholder Ltd." },
];

export const STATS = [
  { value: "8", label: "Services, one studio" },
  { value: "5", label: "Pages of pure purpose" },
  { value: "24h*", label: "Response promise" },
  { value: "100%", label: "Commitment to ship" },
];

export const MANIFESTO_STATS = [
  { value: "8", label: "Services, one studio" },
  { value: "24h", label: "Response promise" },
  { value: "100%", label: "Commitment to ship" },
];
