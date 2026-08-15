import { ImageResponse } from "next/og";
import { isSupportedLocale } from "@/i18n/routing";
import { absoluteSiteUrl } from "@/lib/site-metadata";

export const alt = "VCareer — AI Career Development Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function VCareerOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  const locale = isSupportedLocale(candidate) ? candidate : "vi";
  const copy =
    locale === "vi"
      ? {
          eyebrow: "CASE STUDY / BẰNG CHỨNG CHỦ LỰC",
          proposition:
            "CV, tiêu chí tuyển dụng và phỏng vấn AI realtime trong một luồng luyện tập.",
          scope: "LIVEKIT · WEBRTC · CV–JD · JD BUILDER",
          metric: "150+ HỌC VIÊN PILOT",
        }
      : {
          eyebrow: "CASE STUDY / FLAGSHIP PROOF",
          proposition:
            "CV preparation, job criteria, and realtime AI interviews in one practice workflow.",
          scope: "LIVEKIT · WEBRTC · CV–JD · JD BUILDER",
          metric: "150+ PILOT LEARNERS",
        };

  return new ImageResponse(
    <div
      style={{
        background: "#071219",
        color: "#edf4f5",
        display: "flex",
        height: "100%",
        overflow: "hidden",
        padding: "54px 60px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#071219",
          backgroundImage:
            "radial-gradient(circle at 82% 16%, rgba(29,116,255,.22), transparent 38%)",
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
          position: "relative",
          width: "52%",
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#6bd7d0",
            display: "flex",
            fontFamily: "monospace",
            fontSize: 17,
            letterSpacing: 3,
          }}
        >
          {copy.eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 126,
              fontWeight: 700,
              letterSpacing: -8,
              lineHeight: 0.82,
            }}
          >
            VCareer
          </div>
          <div
            style={{
              color: "#b6c4cb",
              display: "flex",
              fontSize: 28,
              lineHeight: 1.38,
              marginTop: 34,
              maxWidth: 560,
            }}
          >
            {copy.proposition}
          </div>
        </div>

        <div
          style={{
            borderTop: "2px solid #1d74ff",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            fontSize: 16,
            gap: 11,
            letterSpacing: 2,
            paddingTop: 17,
          }}
        >
          <span style={{ color: "#9cff15" }}>{copy.metric}</span>
          <span>{copy.scope}</span>
        </div>
      </div>

      <div
        style={{
          border: "1px solid rgba(107,215,208,.38)",
          display: "flex",
          height: 452,
          overflow: "hidden",
          position: "absolute",
          right: 58,
          top: 89,
          transform: "rotate(-2deg)",
          width: 500,
          zIndex: 1,
        }}
      >
        <img
          alt=""
          src={absoluteSiteUrl("/projects/vcareer/interview_demo.PNG")}
          style={{ height: "100%", objectFit: "cover", width: "100%" }}
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(7,18,25,.42), transparent 35%), linear-gradient(0deg, rgba(7,18,25,.65), transparent 45%)",
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
