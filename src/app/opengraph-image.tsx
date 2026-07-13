import { ImageResponse } from "next/og";

export const alt = "KPI Plus Tech — Clear software for smoother operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#071722",
          background: "#f6fbfe",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            right: -120,
            top: -180,
            background: "#67d4ff",
            opacity: 0.45,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 17,
              background: "#071722",
              color: "#67d4ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            K+
          </div>
          <span style={{ fontSize: 28, fontWeight: 700 }}>KPI Plus Tech</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 880 }}>
          <span style={{ fontSize: 18, letterSpacing: 3, fontWeight: 700, color: "#075f8f" }}>
            SAAS PRODUCTS + CUSTOM SOFTWARE
          </span>
          <div style={{ fontSize: 68, lineHeight: 1.08, letterSpacing: -2.5, fontWeight: 800 }}>
            Run your business with less manual work.
          </div>
          <span style={{ fontSize: 25, color: "#405566" }}>
            Clear software for smoother operations and better customer experiences.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
