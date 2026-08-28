import { apps, platformsOf, type App } from "./apps";

export const SITE_URL = "https://www.msrx.co.in";
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

export const CONTACT_EMAIL = "mrinalsinghraja@gmail.com";

/** Absolute URL for a site-relative path. Schema requires absolute URLs. */
export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Trim a description to something a search result will actually show. Google
 * truncates around 155–160 characters; anything past that is wasted. Cuts on a
 * word boundary so the snippet never ends mid-word.
 *
 * Only meta descriptions are clamped — schema and on-page copy keep the full text.
 */
export function metaDescription(text: string, limit = 155): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[.,;:—-]$/, "")}…`;
}

// ── Organization + WebSite ────────────────────────────────────────────────────
// Emitted once, in the root layout. Gives Google a single brand entity for every
// page to reference by @id.
//
// No SearchAction is declared: the site has no search endpoint, and claiming one
// that does not exist produces a broken sitelinks searchbox.
export const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "MSRX",
      url: SITE_URL,
      logo: abs("/icon.svg"),
      image: abs("/opengraph-image"),
      description:
        `MSRX builds ${apps.length} apps across web, macOS and iOS — study tools, file and image utilities, data visualisation, design, weather and more. All of them free, everywhere, with no paid tier.`,
      slogan: "Future. Intelligence. Impact.",
      email: CONTACT_EMAIL,
      founder: {
        "@type": "Person",
        name: "Mrinal Singh Raja",
        url: "https://www.linkedin.com/in/mrinalsinghraja/",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
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
      "@id": SITE_ID,
      url: SITE_URL,
      name: "MSRX",
      description: `${apps.length} apps for web, Mac and iPhone. All free, nothing stored, most with no sign-up.`,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ],
};

// ── SoftwareApplication ───────────────────────────────────────────────────────
const SCHEMA_CATEGORY: Record<App["platform"], string> = {
  web: "WebApplication",
  macos: "UtilitiesApplication",
  ios: "MobileApplication",
};

const SCHEMA_OS: Record<App["platform"], string> = {
  web: "Any (web browser)",
  macos: "macOS",
  ios: "iOS",
};

export function softwareAppJsonLd(app: App) {
  return {
    "@type": "SoftwareApplication",
    name: app.name,
    url: abs(`/apps/${app.slug}`),
    description: app.description,
    applicationCategory: SCHEMA_CATEGORY[app.platform],
    // Every OS the app runs on. An app shipping on both web and Mac lists both,
    // or the Mac build is invisible to anything reading the structured data.
    operatingSystem: platformsOf(app)
      .map((p) => SCHEMA_OS[p])
      .join(", "),
    featureList: app.features,
    installUrl: app.href,
    publisher: { "@id": ORG_ID },
    // Every app is free, and that is checkable rather than claimed: all ten
    // App Store listings report "price":0, and no web app has a payment step.
    //
    // This previously asserted a price only for the web apps, on the reasoning
    // that App Store pricing lives in App Store Connect and could not be
    // verified from here. It can be — the public listing states it — so the
    // caution was understating the catalog rather than protecting it. If a paid
    // app ever ships, this has to become per-app again.
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

/** Every app as an ItemList — used on the homepage and /apps. */
export function appListJsonLd(list: App[] = apps) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MSRX apps",
    description: "Apps built by MSRX for web, macOS and iOS.",
    numberOfItems: list.length,
    itemListElement: list.map((app, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: softwareAppJsonLd(app),
    })),
  };
}

// ── Breadcrumbs ───────────────────────────────────────────────────────────────
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
export function faqJsonLd(entries: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Renders a JSON-LD block. Keeps dangerouslySetInnerHTML in one place. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
