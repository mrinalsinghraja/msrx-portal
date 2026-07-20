import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { breadcrumbJsonLd, JsonLd, CONTACT_EMAIL, ORG_ID, abs } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach MSRX directly by email for bug reports, feature requests, app ideas, security disclosures and press. Written and answered by Mrinal Singh Raja.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact MSRX",
    description: "Bug reports, feature requests, app ideas and security disclosures.",
    url: "/contact",
    type: "website",
  },
};

const trail = [
  { name: "MSRX", path: "/" },
  { name: "Contact", path: "/contact" },
];

// Prefilled subject lines. They route nothing automatically — they just save you
// writing one, and make the inbox sortable.
const REASONS = [
  {
    heading: "Something is broken",
    body: "Tell us which app, what you did, and what happened instead. A screenshot helps more than anything else.",
    subject: "Bug report",
  },
  {
    heading: "An app should do this",
    body: "Feature requests are read and often built. Describe the thing you were trying to get done, not just the button you wanted.",
    subject: "Feature request",
  },
  {
    heading: "This app does not exist yet",
    body: "Most of the catalog started as a gap someone hit. If you keep wanting a tool and cannot find it, describe it.",
    subject: "App idea for MSRX",
  },
  {
    heading: "A security issue",
    body: "Send what you found, how to reproduce it and the impact. It goes straight to the person who wrote the code.",
    subject: "Security report",
  },
];

const ELSEWHERE = [
  { label: "GitHub", href: "https://github.com/mrinalsinghraja", detail: "Source and projects" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mrinalsinghraja/",
    detail: "Professional background",
  },
  { label: "X", href: "https://x.com/mrinalsinghraja", detail: "Release notes and updates" },
  {
    label: "App Store",
    href: "https://apps.apple.com/us/developer/mrinal-singh-raja/id1879524280",
    detail: "Every native app",
  },
];

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: abs("/contact"),
          name: "Contact MSRX",
          about: { "@id": ORG_ID },
        }}
      />

      <div className="border-b border-[var(--border)] bg-[var(--paper-tint)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-8 pb-14 sm:pb-16">
          <Breadcrumbs trail={trail} />
          <h1 className="display text-[clamp(32px,5.2vw,52px)] text-[var(--text-primary)] mb-5">
            Contact
          </h1>
          <p className="text-[17px] leading-relaxed text-[var(--text-secondary)] mb-8 max-w-xl">
            One inbox, read by the person who builds these apps. There is no contact form
            and no ticket system — email is faster for both of us.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="msrx-gradient inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <h2 className="eyebrow text-[var(--text-tertiary)] mb-6">What are you writing about</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {REASONS.map((reason) => (
            <a
              key={reason.subject}
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(reason.subject)}`}
              className="card-hover group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="display-sm text-[17px] text-[var(--text-primary)] mb-2">
                {reason.heading}
              </h3>
              <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-4">
                {reason.body}
              </p>
              <span className="mono inline-flex items-center gap-1.5 text-[12px] text-[var(--violet-deep)]">
                {reason.subject}
                <ArrowUpRight
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          ))}
        </div>

        <h2 className="eyebrow text-[var(--text-tertiary)] mb-6">Elsewhere</h2>
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {ELSEWHERE.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--text-primary)]"
              >
                <span>
                  <span className="block text-[15.5px] font-medium text-[var(--text-primary)]">
                    {item.label}
                  </span>
                  <span className="block text-[13.5px] text-[var(--text-secondary)]">
                    {item.detail}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
