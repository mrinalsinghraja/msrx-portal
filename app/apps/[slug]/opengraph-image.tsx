import { ImageResponse } from "next/og";
import { apps, getApp, PLATFORM_LABEL } from "@/lib/apps";

export const alt = "MSRX app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// One static preview per app, generated at build time alongside the pages.
export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export default async function AppOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);

  // The route only resolves for known slugs, but ImageResponse must always
  // return something renderable.
  if (!app) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b0b12",
            color: "#f5f5f8",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          MSRX
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b12",
          padding: 72,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Accent bar — the app's own colour, so previews are distinguishable
            at a glance in a feed. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
            background: app.accent,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: app.accent,
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            {app.initials}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#85859a",
            }}
          >
            {PLATFORM_LABEL[app.platform]}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#f5f5f8",
              lineHeight: 1.05,
            }}
          >
            {app.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#a8a8b8",
              lineHeight: 1.3,
              maxWidth: 940,
            }}
          >
            {app.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#f5f5f8",
            }}
          >
            MSRX
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#85859a" }}>
            www.msrx.co.in
          </div>
        </div>
      </div>
    ),
    size
  );
}
