// Skills grouped by category. Category labels are translated via
// `skills.groups.<key>`; the tech names themselves are proper nouns.
export type SkillGroup = {
  key: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "backend",
    items: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "PostgreSQL",
      "SQL Server",
      "Redis",
      "AWS SQS",
      "Batch Processing",
      "Maven / Gradle",
    ],
  },
  {
    key: "ai",
    items: [
      "RAG",
      "Semantic Search",
      "OpenAI",
      "Qdrant",
      "LangSmith",
      "LiveKit",
      "Prompt Engineering",
      "LLM",
    ],
  },
  {
    key: "frontend",
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    key: "tools",
    items: [
      "Docker",
      "LocalStack",
      "Cloudflare R2",
      "FastAPI",
      "Drizzle ORM",
      "Git",
      "Render",
      "Vercel",
    ],
  },
];
