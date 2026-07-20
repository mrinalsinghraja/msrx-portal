import { apps, webApps, macApps, iosApps, type App } from "@/lib/apps";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/seo";

// llms.txt is generated from the same catalog that renders the site, so it can
// never drift out of date the way a hand-written copy did. Previously it was
// missing three apps and understated JEE HyperLab's simulation count.

export const dynamic = "force-static";

function section(heading: string, note: string, list: App[]): string {
  const lines = list.map((app) => {
    const page = `${SITE_URL}/apps/${app.slug}`;
    const deepLinks = app.tools?.length
      ? ` Direct links: ${app.tools
          .map((t) => `[${t.label}](${t.href})`)
          .join(", ")}.`
      : "";
    return `- [${app.name}](${app.href}) — ${app.description} Details: ${page}.${deepLinks}`;
  });
  return `## ${heading}\n\n${note}\n\n${lines.join("\n")}`;
}

export function GET() {
  const body = `# MSRX

> MSRX builds ${apps.length} apps across web, macOS and iOS — study tools, data visualisation, design, weather, networking and everyday utilities. Tagline: "Future. Intelligence. Impact." All ${apps.length} are free, everywhere, with no paid tier or subscription — the web apps and the App Store downloads alike. Ten of the eleven web apps need no account at all. Most apps process entirely on your device and store nothing on MSRX servers.

Built by Mrinal Singh Raja. Catalog: ${SITE_URL}/apps

${section(
  "Web apps",
  "All free, run in any modern browser. Only MSRX Planner asks for an account, to sync across devices.",
  webApps
)}

${section(
  "macOS apps",
  "Native Mac apps, distributed on the Mac App Store. An app that ships on both the web and the Mac is listed in both sections, so these counts overlap.",
  macApps
)}

${section("iPhone and iPad apps", "Native iOS apps, distributed on the App Store.", iosApps)}

## Site pages

- [All apps](${SITE_URL}/apps): The full catalog, grouped by platform.
- [Why MSRX](${SITE_URL}/why-msrx): How and why these apps are built — no accounts, on-device processing, one job per app.
- [Security](${SITE_URL}/security): Response headers, site architecture, and vulnerability reporting.
- [Contact](${SITE_URL}/contact): Bug reports, feature requests, app ideas, security disclosures.
- [Privacy policy](${SITE_URL}/privacy): What is collected, what is not kept, and what is never sold.

## Contact

- Email: ${CONTACT_EMAIL}
- GitHub: https://github.com/mrinalsinghraja
- LinkedIn: https://www.linkedin.com/in/mrinalsinghraja/
- X: https://x.com/mrinalsinghraja
- Apple App Store developer: https://apps.apple.com/us/developer/mrinal-singh-raja/id1879524280
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
