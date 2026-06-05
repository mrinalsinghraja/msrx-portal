import type { NextConfig } from "next";

// ── HTTP Security Headers ──────────────────────────────────────────────────────
// Applied to all routes. Portal is a static marketing site (no API, no auth, no DB),
// so headers focus on XSS, clickjacking, MIME sniffing, and protocol security.
const securityHeaders = [
  // ── Content Security Policy ─────────────────────────────────────────────────
  // Google Fonts self-hosted via next/font → no external font CDN needed.
  // Next.js App Router requires 'unsafe-inline' for hydration scripts.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",      // Next.js hydration
      "style-src 'self' 'unsafe-inline'",        // Next.js CSS
      "font-src 'self'",                         // next/font self-hosts Google Fonts
      "img-src 'self' data: blob:",              // SVG data URIs
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",                      // no forms on site
      "frame-ancestors 'none'",                  // belt-and-suspenders with X-Frame-Options
      "upgrade-insecure-requests",               // force HTTPS for sub-resources
    ].join("; "),
  },

  // ── Clickjacking ─────────────────────────────────────────────────────────────
  { key: "X-Frame-Options", value: "DENY" },

  // ── MIME sniffing ─────────────────────────────────────────────────────────────
  { key: "X-Content-Type-Options", value: "nosniff" },

  // ── HTTPS enforcement (HSTS) ─────────────────────────────────────────────────
  // 2 years, include subdomains, preload list eligible.
  // WARNING: Only enable once the site is confirmed HTTPS-only (Vercel = always HTTPS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // ── Referrer leakage ─────────────────────────────────────────────────────────
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // ── Browser API restrictions ─────────────────────────────────────────────────
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",   // block FLoC
    ].join(", "),
  },

  // ── Legacy XSS filter (older browsers) ──────────────────────────────────────
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",   // apply to all routes
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
