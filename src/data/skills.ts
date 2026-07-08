// Skills grouped by category. Category labels are translated via
// `skills.groups.<key>`; the tech names themselves are proper nouns.
//
// Each skill carries a monochrome SVG mark (under /public/icons/skills) that is
// tinted with `color` via CSS masking, so a single asset works in both themes.
// Use "currentColor" for near-black / near-white brand marks (Next.js, Vercel…)
// so they follow the foreground and stay legible on light and dark backgrounds.
export type Skill = {
  name: string;
  icon: string;
  color: string;
};

export type SkillGroup = {
  key: string;
  items: Skill[];
};

const ICONS = "/icons/skills";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "backend",
    items: [
      { name: "Java", icon: `${ICONS}/java.svg`, color: "#E76F00" },
      { name: "Spring Boot", icon: `${ICONS}/spring-boot.svg`, color: "#6DB33F" },
      { name: "REST APIs", icon: `${ICONS}/rest-apis.svg`, color: "#7c6cff" },
      { name: "PostgreSQL", icon: `${ICONS}/postgresql.svg`, color: "#4169E1" },
      { name: "SQL Server", icon: `${ICONS}/sql-server.svg`, color: "#CC2927" },
      { name: "Redis", icon: `${ICONS}/redis.svg`, color: "#FF4438" },
      { name: "AWS SQS", icon: `${ICONS}/aws-sqs.svg`, color: "#FF9900" },
      { name: "Batch Processing", icon: `${ICONS}/batch-processing.svg`, color: "#7c6cff" },
      { name: "Maven / Gradle", icon: `${ICONS}/gradle.svg`, color: "currentColor" },
    ],
  },
  {
    key: "ai",
    items: [
      { name: "RAG", icon: `${ICONS}/rag.svg`, color: "#7c6cff" },
      { name: "Semantic Search", icon: `${ICONS}/semantic-search.svg`, color: "#7c6cff" },
      { name: "OpenAI", icon: `${ICONS}/openai.svg`, color: "currentColor" },
      { name: "Qdrant", icon: `${ICONS}/qdrant.svg`, color: "#DC244C" },
      { name: "LangSmith", icon: `${ICONS}/langsmith.svg`, color: "currentColor" },
      { name: "LiveKit", icon: `${ICONS}/livekit.svg`, color: "currentColor" },
      { name: "Prompt Engineering", icon: `${ICONS}/prompt-engineering.svg`, color: "#7c6cff" },
      { name: "LLM", icon: `${ICONS}/llm.svg`, color: "#7c6cff" },
    ],
  },
  {
    key: "frontend",
    items: [
      { name: "TypeScript", icon: `${ICONS}/typescript.svg`, color: "#3178C6" },
      { name: "JavaScript", icon: `${ICONS}/javascript.svg`, color: "#F7DF1E" },
      { name: "React", icon: `${ICONS}/react.svg`, color: "#61DAFB" },
      { name: "Next.js", icon: `${ICONS}/next-js.svg`, color: "currentColor" },
      { name: "Tailwind CSS", icon: `${ICONS}/tailwind-css.svg`, color: "#06B6D4" },
      { name: "shadcn/ui", icon: `${ICONS}/shadcn-ui.svg`, color: "currentColor" },
    ],
  },
  {
    key: "tools",
    items: [
      { name: "Docker", icon: `${ICONS}/docker.svg`, color: "#2496ED" },
      { name: "LocalStack", icon: `${ICONS}/localstack.svg`, color: "#7c6cff" },
      { name: "Cloudflare R2", icon: `${ICONS}/cloudflare-r2.svg`, color: "#F38020" },
      { name: "FastAPI", icon: `${ICONS}/fastapi.svg`, color: "#009688" },
      { name: "Drizzle ORM", icon: `${ICONS}/drizzle-orm.svg`, color: "currentColor" },
      { name: "Git", icon: `${ICONS}/git.svg`, color: "#F05032" },
      { name: "Render", icon: `${ICONS}/render.svg`, color: "currentColor" },
      { name: "Vercel", icon: `${ICONS}/vercel.svg`, color: "currentColor" },
    ],
  },
];
