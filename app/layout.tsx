import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.msrx.co.in"),
  title: {
    default: "MSRX — AI-Powered Web, iOS & macOS Apps",
    template: "%s — MSRX",
  },
  description:
    "MSRX: AI-powered apps including MSRX GraphIQ (charts & 3D dashboards), MSRX CanvasIQ (AI design studio), QR Studio, Gantt Maker, JEE HyperLab, and iOS/macOS utilities.",
  applicationName: "MSRX",
  authors: [{ name: "Mrinal Singh Raja", url: "https://www.linkedin.com/in/mrinalsinghraja/" }],
  creator: "Mrinal Singh Raja",
  publisher: "Mrinal Singh Raja",
  category: "technology",
  keywords: [
    "MSRX",
    "MSRX GraphIQ",
    "GraphIQ",
    "MSRX CanvasIQ",
    "CanvasIQ",
    "MSRX QR Studio",
    "QR Studio",
    "MSRX Meeting",
    "JEE HyperLab",
    "Easy-Peasy Gantt",
    "IncognitoCV",
    "OrionPulseNet",
    "PulseNet",
    "UIGen",
    "AI graph maker",
    "AI chart maker",
    "3D chart maker",
    "CSV to chart",
    "AI design studio",
    "AI canvas tool",
    "AI QR code generator",
    "AI Gantt chart maker",
    "online Gantt chart",
    "AI resume optimizer",
    "JEE preparation AI",
    "IIT-JEE STEM lab",
    "AI video meetings",
    "network monitoring tool",
    "AI React component generator",
    "AI apps",
    "premium web apps",
    "macOS apps",
    "iOS apps",
    "AI productivity tools",
    "Mrinal Singh Raja",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "MSRX — AI-Powered Web, iOS & macOS Apps",
    description:
      "MSRX GraphIQ, MSRX CanvasIQ, QR Studio, Gantt Maker, JEE HyperLab and more — premium AI web apps plus iOS & macOS utilities by Mrinal Singh Raja.",
    url: "https://www.msrx.co.in",
    siteName: "MSRX",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.msrx.co.in/opengraph-image", width: 1200, height: 630, alt: "MSRX — Future. Intelligence. Impact." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSRX — AI-Powered Web, iOS & macOS Apps",
    description:
      "MSRX GraphIQ, MSRX CanvasIQ, QR Studio, Gantt Maker, JEE HyperLab — premium AI apps by @mrinalsinghraja.",
    images: ["https://www.msrx.co.in/opengraph-image"],
    creator: "@mrinalsinghraja",
    site: "@mrinalsinghraja",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Next 16 places theme-color / color-scheme in the viewport export (not metadata).
// Site is light-only (no dark mode) → declare colorScheme to stop browser auto-darkening.
export const viewport: Viewport = {
  themeColor: "#f8f9ff",
  colorScheme: "light",
};

// ── Organization + WebSite structured data (JSON-LD) ────────────────────────────
// Helps Google build a Knowledge Panel and understand the brand entity.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.msrx.co.in/#organization",
      name: "MSRX",
      url: "https://www.msrx.co.in",
      logo: "https://www.msrx.co.in/icon.svg",
      image: "https://www.msrx.co.in/opengraph-image",
      description:
        "MSRX builds premium AI-powered apps for web, iOS, and macOS — data visualization, video meetings, resume tools, JEE prep, network monitoring, and utilities.",
      slogan: "Future. Intelligence. Impact.",
      email: "mrinalsinghraja@gmail.com",
      contactPoint: {
        "@type": "ContactPoint",
        email: "mrinalsinghraja@gmail.com",
        contactType: "customer support",
        availableLanguage: ["English"],
      },
      sameAs: [
        "https://github.com/mrinalsinghraja",
        "https://www.linkedin.com/in/mrinalsinghraja/",
        "https://x.com/mrinalsinghraja",
        "https://apps.apple.com/us/developer/mrinal-singh-raja/id1879524280",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.msrx.co.in/#website",
      url: "https://www.msrx.co.in",
      name: "MSRX",
      description: "Premium AI-powered apps for web, iOS, and macOS.",
      publisher: { "@id": "https://www.msrx.co.in/#organization" },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
