import type { MetadataRoute } from "next";
import { apps } from "@/lib/apps";
import { SITE_URL } from "@/lib/seo";

// Portal sitemap — same-origin routes only. The apps live on their own
// subdomains and ship their own sitemaps; listing their URLs here would claim
// authority over hosts this sitemap does not cover.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/apps`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/why-msrx`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/security`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const appRoutes: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${SITE_URL}/apps/${app.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...appRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
