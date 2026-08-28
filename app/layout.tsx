import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL, orgJsonLd } from "@/lib/seo";
import { apps, webApps, noAccountWebApps } from "@/lib/apps";

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
    default: `MSRX — ${apps.length} free apps for web, Mac and iPhone`,
    template: "%s — MSRX",
  },
  description:
    `${apps.length} apps across web, macOS and iOS — study tools, file and image utilities, data visualisation, design, weather and more. Every one free, everywhere, with no paid tier.`,
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
    title: `MSRX — ${apps.length} free apps for web, Mac and iPhone`,
    description:
      "Study tools, data visualisation, design, weather, network and everyday utilities. All free, nothing stored, most with no sign-up.",
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
    title: `MSRX — ${apps.length} free apps for web, Mac and iPhone`,
    description:
      "Study tools, data visualisation, design, weather, network and everyday utilities. All free, nothing stored, most with no sign-up.",
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
// color-scheme itself is set per theme in globals.css.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#101017" },
  ],
};

// Runs before first paint: a saved choice wins; otherwise prefers-color-scheme
// decides, but only until the visitor picks. Inlined so there is no flash of
// the wrong theme while React loads. Any failure falls back to light.
const themeInit = `(function(){try{var t=localStorage.getItem("msrx-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jetbrains.variable} h-full antialiased`}
      // The theme script mutates data-theme before hydration; that mismatch is
      // deliberate and only on this element.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
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
