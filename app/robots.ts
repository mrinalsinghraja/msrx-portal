import type { MetadataRoute } from "next";

const BASE = "https://msrx.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI/LLM + search crawlers (GEO). All are already covered by
      // "*"; listed to signal intent and confirm none are blocked.
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
          "Applebot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
