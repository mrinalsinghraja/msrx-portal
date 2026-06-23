import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MSRX — Future. Intelligence. Impact.",
    short_name: "MSRX",
    description:
      "Premium AI-powered apps for web, iOS, and macOS — built with care, launched with purpose.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9ff",
    theme_color: "#7C3AED",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
