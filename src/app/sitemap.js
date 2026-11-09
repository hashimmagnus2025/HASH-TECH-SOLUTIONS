import { env } from "@/lib/env";
import { services } from "@/data/services";

// Legal pages are intentionally excluded — they're marked `noindex` in
// their metadata (see lib/seo.ts buildMetadata noIndex), and listing a
// noindex page in the sitemap just wastes crawl budget / sends a mixed
// signal to search engines.
const staticRoutes = ["", "/about", "/services", "/products", "/amc-services", "/industries", "/projects", "/contact"];
export default function sitemap() {
  const base = env.siteUrl.replace(/\/$/, "");
  const staticEntries = staticRoutes.map(route => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
  const serviceEntries = services.map(service => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6
  }));
  return [...staticEntries, ...serviceEntries];
}
