import { ImageResponse } from "next/og";

export const alt = "MSRX — 20 apps for web, Mac and iPhone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
            background: "linear-gradient(115deg, #00c4df 0%, #8b5cf6 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#85859a",
          }}
        >
          Future. Intelligence. Impact.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#f5f5f8",
              lineHeight: 1.04,
            }}
          >
            Twenty apps.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              background: "linear-gradient(115deg, #38d9f0 0%, #a78bfa 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Open one and start.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a8a8b8",
              maxWidth: 900,
              marginTop: 6,
            }}
          >
            Web, Mac and iPhone. Every one free, everywhere.
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
