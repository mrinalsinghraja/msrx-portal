import type { Metadata } from "next";
import { breadcrumbJsonLd, JsonLd, CONTACT_EMAIL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  // Bare string → the layout's "%s — MSRX" template appends the brand once.
  title: "Privacy Policy",
  description:
    "How MSRX handles your data: most apps run entirely on your device, the web apps need no account, and nothing is ever sold.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — MSRX",
    description:
      "On-device by default, no accounts on the web apps, minimal collection, never sold.",
    url: "/privacy",
    type: "article",
  },
};

const trail = [
  { name: "MSRX", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

const SECTIONS = [
  {
    h: "Overview",
    p: [
      "MSRX apps are built so that privacy is the default rather than a setting. Only what a feature genuinely needs is collected, and nothing is ever sold.",
    ],
  },
  {
    h: "What is collected",
    p: [
      "Most MSRX apps run entirely on your device and send no personal data to MSRX servers. The web apps require no account, so there is no profile attached to your use of them.",
      "Where an app has a network feature — OrionPulseNet running a speed test, MSRX WeatherWatch fetching a forecast, MSRX Planner syncing your own work between your devices — only the data that feature requires is processed.",
    ],
  },
  {
    h: "What is not kept",
    p: [
      "IncognitoCV does not retain uploaded CVs or the job descriptions pasted alongside them. MSRX Meeting carries audio and video peer-to-peer and records only to your own machine; no recording is uploaded to MSRX. MSRX QR Studio and MSRX CanvasIQ generate entirely in your browser.",
    ],
  },
  {
    h: "This website",
    p: [
      "www.msrx.co.in is a static site with no accounts, no forms and no database. Fonts are served from this origin rather than a third-party CDN, so visiting a page here does not disclose that visit to another company.",
    ],
  },
  {
    h: "Analytics",
    p: [
      "MSRX may use Apple's App Store Connect analytics for aggregate, anonymised usage metrics on the macOS and iPhone apps. No personally identifiable information is collected through it.",
    ],
  },
  {
    h: "Third-party services",
    p: [
      "Some apps integrate with third-party services, and data handled by those services is governed by their own privacy policies. Where an app depends on one, its own page and in-app disclosures say so.",
    ],
  },
  {
    h: "Children",
    p: [
      "MSRX StoryQuest is aimed at school students and, like every MSRX web app, requires no account, collects no personal details and asks for no contact information.",
    ],
  },
  {
    h: "Changes",
    p: [
      "If this policy changes materially, the date below changes with it. Past versions are visible in the site's public source history.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-8 pb-12 sm:pb-14">
          <Breadcrumbs trail={trail} />
          <h1 className="display text-[clamp(30px,4.8vw,46px)] text-[var(--text-primary)] mb-3">
            Privacy Policy
          </h1>
          <p className="mono text-[12px] tracking-[0.1em] text-[var(--text-tertiary)]">
            Last updated: July 2026
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-14 sm:py-18">
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.h}>
              <h2 className="display-sm text-[19px] text-[var(--text-primary)] mb-3">
                {section.h}
              </h2>
              {section.p.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[15.5px] leading-relaxed text-[var(--text-secondary)] mb-3 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section>
            <h2 className="display-sm text-[19px] text-[var(--text-primary)] mb-3">
              Contact
            </h2>
            <p className="text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
              Questions about privacy, or a request about your data —{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Privacy%20question`}
                className="text-[var(--violet-deep)] underline underline-offset-4"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
