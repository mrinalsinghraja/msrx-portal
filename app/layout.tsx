import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL, orgJsonLd } from "@/lib/seo";

// Body. Inter reads cleanly at the 13–16px the cards and prose sit at.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display. A grotesque with enough character to carry headlines without a
// second decorative face, kept to headings only.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["600", "700"],
});

// Utility. Holds the catalog index columns in alignment and tags platforms.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MSRX — 20 free apps for web, Mac and iPhone",
    template: "%s — MSRX",
  },
  description:
    "20 apps across web, macOS and iOS — study tools, data visualisation, design, weather, network and everyday utilities. Web apps are free, no sign-up.",
  applicationName: "MSRX",
  authors: [
    { name: "Mrinal Singh Raja", url: "https://www.linkedin.com/in/mrinalsinghraja/" },
  ],
  creator: "Mrinal Singh Raja",
  publisher: "Mrinal Singh Raja",
  category: "technology",
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "MSRX — 20 free apps for web, Mac and iPhone",
    description:
      "Study tools, data visualisation, design, weather, network and everyday utilities. Free, no sign-up, nothing stored.",
    url: SITE_URL,
    siteName: "MSRX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MSRX — Future. Intelligence. Impact.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSRX — 20 free apps for web, Mac and iPhone",
    description:
      "Study tools, data visualisation, design, weather, network and everyday utilities. Free, no sign-up, nothing stored.",
    images: [{ url: "/opengraph-image", alt: "MSRX — Future. Intelligence. Impact." }],
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

// Next 16 takes theme-color / color-scheme from the viewport export, not metadata.
// The site is light-only, so declaring colorScheme stops browsers auto-darkening it.
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
