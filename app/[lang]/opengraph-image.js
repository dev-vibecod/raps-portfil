import { ImageResponse } from "next/og";
import { getDict, isLocale } from "@/lib/i18n";
import { profile } from "@/data/content";

export const alt = "Rafif Ayyassar Wicaksono — Backend & AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage({ params }) {
  const lang = isLocale(params.lang) ? params.lang : "id";
  const dict = getDict(lang);
  const tagline = lang === "id" ? "Jasa pembuatan website, aplikasi & AI" : "Web, app & AI development";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #080a12 0%, #11151f 60%, #171c2b 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#a9b0ff", fontSize: 28, letterSpacing: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: "#8b93ff" }} />
          {profile.role.toUpperCase()}
        </div>
        <div style={{ marginTop: 24, fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>{profile.name}</div>
        <div style={{ marginTop: 28, fontSize: 38, color: "#c7cbe6", maxWidth: 900 }}>{tagline}</div>
        <div style={{ marginTop: 40, display: "flex", gap: 12, fontSize: 24, color: "#8b8fa3" }}>
          <span>RAG · FastAPI · Cloud · IoT</span>
          <span>·</span>
          <span>{dict.services.areaServed.split("·")[0].trim()}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
