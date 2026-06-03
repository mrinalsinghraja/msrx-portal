import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — MSRX",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center">
          <Link
            href="/"
            className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← MSRX
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-[32px] font-bold tracking-tight text-[var(--text-primary)] mb-2">
          Privacy Policy
        </h1>
        <p className="text-[14px] text-[var(--text-tertiary)] mb-10">
          Last updated: June 2026
        </p>

        <div className="space-y-8 text-[15px] text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="text-[17px] font-semibold text-[var(--text-primary)] mb-3">
              Overview
            </h2>
            <p>
              MSRX apps are built with your privacy as a core principle. We collect only what
              is necessary to provide functionality, and we never sell your data.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-[var(--text-primary)] mb-3">
              Data Collection
            </h2>
            <p>
              Most MSRX apps operate entirely on-device and do not transmit personal data to
              our servers. Where network features exist (e.g. OrionPulseNet, Orion Drive),
              only the minimum data required for the feature is processed.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-[var(--text-primary)] mb-3">
              Analytics
            </h2>
            <p>
              We may use Apple&apos;s App Store Connect analytics for aggregate, anonymised
              usage metrics. No personally identifiable information is collected.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-[var(--text-primary)] mb-3">
              Third-Party Services
            </h2>
            <p>
              Some apps integrate with third-party services (e.g. cloud storage providers).
              Their respective privacy policies govern data handled by those services.
            </p>
          </section>

          <section>
            <h2 className="text-[17px] font-semibold text-[var(--text-primary)] mb-3">
              Contact
            </h2>
            <p>
              Questions about privacy?{" "}
              <a
                href="mailto:mrinalsinghraja@gmail.com"
                className="text-[var(--text-primary)] underline underline-offset-2"
              >
                mrinalsinghraja@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
