import type { MetadataRoute } from "next";

// Portal sitemap — lists same-origin routes only (msrx.co.in).
// The web apps live on their own subdomains and ship their own sitemaps.
const BASE = "https://msrx.co.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
