export const CAPABILITY_DEFINITIONS = [
  {
    key: "backend",
    technologies: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "SQL Server",
      "Redis",
      "AWS SQS",
      "Docker",
      "LocalStack",
    ],
    proofs: [
      { key: "career", href: "#career" },
      { key: "financial", href: "#financial-archive" },
    ],
  },
  {
    key: "realtime",
    technologies: ["LiveKit", "WebRTC"],
    proofs: [{ key: "vcareer", href: "#vcareer" }],
  },
  {
    key: "retrieval",
    technologies: [
      "FastAPI",
      "Qdrant",
      "BM25 / RRF",
      "RAG",
      "LangSmith",
      "PostgreSQL",
    ],
    proofs: [{ key: "scholar", href: "#scholarai" }],
  },
  {
    key: "delivery",
    technologies: ["TypeScript", "React", "Next.js", "FastAPI"],
    proofs: [
      { key: "scholarDelivery", href: "#scholarai" },
      { key: "vcareerDelivery", href: "#vcareer" },
    ],
  },
] as const;

export type CapabilityKey = (typeof CAPABILITY_DEFINITIONS)[number]["key"];

export type CapabilityProofKey =
  (typeof CAPABILITY_DEFINITIONS)[number]["proofs"][number]["key"];

export type CapabilityRouteRect = {
  key: CapabilityKey;
  top: number;
  bottom: number;
};

export function resolveCapabilityAtFocusLine(
  routes: readonly CapabilityRouteRect[],
  focusLine: number,
): CapabilityKey | null {
  return (
    routes.find(
      (route) => route.top <= focusLine && route.bottom >= focusLine,
    )?.key ?? null
  );
}
