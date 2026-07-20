import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, JsonLd, CONTACT_EMAIL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How msrx.co.in is served and hardened: strict Content Security Policy, HSTS, frame denial, restricted browser permissions, and where to report a vulnerability.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security at MSRX",
    description:
      "Content Security Policy, HSTS, clickjacking protection and vulnerability reporting.",
    url: "/security",
    type: "website",
  },
};

const trail = [
  { name: "MSRX", path: "/" },
  { name: "Security", path: "/security" },
];

// These mirror the headers configured in next.config.ts. If that file changes,
// change this table with it — a security page that describes headers the site
// does not actually send is worse than no page at all.
const HEADERS = [
  {
    name: "Content-Security-Policy",
    what: "Scripts, styles, fonts and images may only load from this origin. Framing, plugins and outbound connections are blocked outright.",
  },
  {
    name: "Strict-Transport-Security",
    what: "Two years, including subdomains, preload-eligible. Browsers refuse to reach this site over plain HTTP.",
  },
  {
    name: "X-Frame-Options / frame-ancestors",
    what: "Denied. The site cannot be embedded in a frame anywhere, which rules out clickjacking.",
  },
  {
    name: "X-Content-Type-Options",
    what: "nosniff. Browsers honour the declared content type instead of guessing at it.",
  },
  {
    name: "Referrer-Policy",
    what: "strict-origin-when-cross-origin. Outbound links carry the origin, never the full path.",
  },
  {
    name: "Permissions-Policy",
    what: "Camera, microphone, geolocation, payment and USB are all denied, as is FLoC cohort calculation.",
  },
];

export default function Security() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} />
          <h1 className="display text-[clamp(32px,5.2vw,52px)] text-[var(--text-primary)] mb-5">
            Security
          </h1>
          <p className="text-[17px] leading-relaxed text-[var(--text-secondary)]">
            What this site does to stay safe to visit, and how to tell us if it does not.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <section className="mb-14">
          <h2 className="display-sm text-[24px] text-[var(--text-primary)] mb-4">
            This site holds nothing
          </h2>
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] mb-4">
            www.msrx.co.in is a static site. It has no database, no accounts, no forms and
            no API. There is no session to hijack and no stored record of your visit to
            leak, because none is created.
          </p>
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Fonts are self-hosted rather than pulled from a font CDN, so loading a page
            here does not tell a third party that you did.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="display-sm text-[24px] text-[var(--text-primary)] mb-6">
            Response headers
          </h2>
          <dl className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {HEADERS.map((header) => (
              <div key={header.name} className="py-5">
                <dt className="mono text-[13px] text-[var(--text-primary)] mb-1.5">
                  {header.name}
                </dt>
                <dd className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  {header.what}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-14">
          <h2 className="display-sm text-[24px] text-[var(--text-primary)] mb-4">
            The apps themselves
          </h2>
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] mb-4">
            Each MSRX app runs on its own subdomain or ships through the App Store, and
            each states its own data handling. As a rule, the web apps process in your
            browser and the native apps process on your device.
          </p>
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)]">
            See the{" "}
            <Link
              href="/privacy"
              className="text-[var(--violet-deep)] underline underline-offset-4"
            >
              privacy policy
            </Link>{" "}
            for what is and is not collected, and each app&apos;s own page for its
            specifics.
          </p>
        </section>

        <section>
          <h2 className="display-sm text-[24px] text-[var(--text-primary)] mb-4">
            Reporting a vulnerability
          </h2>
          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] mb-6">
            If you find a security issue in this site or in any MSRX app, email it
            directly. Include what you found, how to reproduce it, and what you think the
            impact is. Reports are read by the person who wrote the code, and there is no
            triage queue in between.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Security%20report`}
            className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] px-6 py-3 text-[15px] font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--text-tertiary)]"
          >
            {CONTACT_EMAIL}
          </a>
        </section>
      </div>
    </>
  );
}
