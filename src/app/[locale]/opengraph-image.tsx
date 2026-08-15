import { ImageResponse } from "next/og";
import { isSupportedLocale } from "@/i18n/routing";
import { absoluteSiteUrl } from "@/lib/site-metadata";

export const alt = "Nguyen Manh Tu — Software Engineer · AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PortfolioOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : "vi";
  const copy =
    locale === "vi"
      ? {
          location: "HÀ NỘI, VIỆT NAM",
          positioning: "Xây dựng backend và sản phẩm AI realtime.",
          proof: "VCareer · 150+ HỌC VIÊN PILOT",
        }
      : {
          location: "HANOI, VIETNAM",
          positioning: "Building reliable backends and realtime AI experiences.",
          proof: "VCareer · 150+ PILOT LEARNERS",
        };

  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#071219",
        color: "#edf4f5",
        display: "flex",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(107,215,208,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(107,215,208,.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          display: "flex",
          inset: 0,
          position: "absolute",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 38px 52px 64px",
          position: "relative",
          width: "66%",
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#6bd7d0",
            display: "flex",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: 4,
          }}
        >
          {copy.location} / PORTFOLIO 2026
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 0.94,
            }}
          >
            Nguyen Manh Tu
          </div>
          <div
            style={{
              color: "#b6c4cb",
              display: "flex",
              fontSize: 31,
              lineHeight: 1.35,
              marginTop: 28,
              maxWidth: 650,
            }}
          >
            {copy.positioning}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            borderTop: "2px solid #6bd7d0",
            display: "flex",
            fontFamily: "monospace",
            fontSize: 17,
            justifyContent: "space-between",
            letterSpacing: 2,
            paddingTop: 18,
          }}
        >
          <span>{copy.proof}</span>
          <span style={{ color: "#6bd7d0" }}>SYSTEMS IN FOCUS</span>
        </div>
      </div>

      <div
        style={{
          background: "#0b2738",
          borderLeft: "1px solid rgba(107,215,208,.45)",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "34%",
        }}
      >
        <img
          alt=""
          src={absoluteSiteUrl("/avatar-graduation.jpg")}
          style={{
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 34%",
            opacity: 0.86,
            width: "100%",
          }}
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(7,18,25,.78), transparent 52%), linear-gradient(0deg, rgba(7,18,25,.74), transparent 42%)",
            display: "flex",
            inset: 0,
            position: "absolute",
          }}
        />
      </div>
    </div>,
    size,
  );
}
