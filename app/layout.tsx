import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MSRX — Future. Intelligence. Impact.",
  description:
    "Premium apps for iOS and macOS. Built with care, launched with purpose. Connect, access, and work anywhere.",
  keywords: ["MSRX", "apps", "macOS", "iOS", "productivity", "security", "utilities"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "MSRX — Future. Intelligence. Impact.",
    description: "Premium apps for iOS and macOS. Built with care, launched with purpose.",
    url: "https://msrx.co.in",
    siteName: "MSRX",
    type: "website",
    images: [{ url: "https://msrx.co.in/opengraph-image", width: 1200, height: 630, alt: "MSRX — Future. Intelligence. Impact." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSRX — Future. Intelligence. Impact.",
    description: "Premium apps for iOS and macOS. Built with care, launched with purpose.",
    images: ["https://msrx.co.in/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
