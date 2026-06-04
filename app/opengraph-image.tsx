import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MSRX — Future. Intelligence. Impact.";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #f0f4ff 0%, #f5f0ff 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow left */}
        <div style={{ position: "absolute", top: -60, left: -60, width: 400, height: 400, background: "radial-gradient(ellipse, rgba(0,196,223,0.25) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />
        {/* Ambient glow right */}
        <div style={{ position: "absolute", top: 0, right: -40, width: 320, height: 320, background: "radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)" }} />

        {/* Main content row */}
        <div style={{ display: "flex", alignItems: "center", gap: 80, position: "relative" }}>

          {/* M icon */}
          <div style={{
            width: 180, height: 180,
            background: "linear-gradient(135deg, #00c4df 0%, #8b5cf6 100%)",
            borderRadius: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(0,196,223,0.3), 0 20px 60px rgba(139,92,246,0.2)",
          }}>
            <svg width="110" height="126" viewBox="0 0 100 115" fill="none">
              <path d="M 5 110 L 5 12 L 22 12 L 22 110 Z" fill="white" opacity="0.95"/>
              <path d="M 22 12 L 50 58 L 50 78 L 22 46 Z" fill="white" opacity="0.8"/>
              <path d="M 78 12 L 50 58 L 50 78 L 78 46 Z" fill="white" opacity="0.8"/>
              <path d="M 78 12 L 95 12 L 95 110 L 78 110 Z" fill="white" opacity="0.95"/>
              <path d="M 5 12 L 22 12 L 50 58 L 78 12 L 95 12 L 95 20 L 78 20 L 50 68 L 22 20 L 5 20 Z" fill="rgba(255,255,255,0.25)"/>
            </svg>
          </div>

          {/* Vertical divider */}
          <div style={{ width: 2, height: 180, background: "linear-gradient(to bottom, transparent, rgba(0,196,223,0.5) 40%, rgba(139,92,246,0.5) 60%, transparent)" }} />

          {/* Text content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "0.35em",
              background: "linear-gradient(135deg, #00c4df 0%, #8b5cf6 100%)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1,
            }}>
              MSRX
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.25em", color: "#6e6e73", textTransform: "uppercase" }}>
              Future. Intelligence. Impact.
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              {["AI Apps", "Productivity", "Security", "Utilities"].map((cat) => (
                <div key={cat} style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: "#8b5cf6", background: "rgba(139,92,246,0.08)", padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(139,92,246,0.2)" }}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
