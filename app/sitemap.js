import { SITE_URL } from "../lib/seo";

export default function sitemap() {
  const routes = ["", "/services", "/work", "/about", "/contact", "/privacy-policy", "/cookie-policy", "/terms-conditions"];
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));
}
