// Structural project data. Titles/descriptions live in messages/*.json
// under `projects.items.<key>` so they can be translated.
export type Project = {
  key: string;
  image: string | null;
  tech: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    key: "vcareer",
    image: "/projects/vcareer.jpg",
    featured: true,
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Drizzle ORM",
      "Neon PostgreSQL",
      "Better Auth",
      "LiveKit",
      "OpenAI Realtime",
      "Gemini Live",
      "Cloudflare R2",
      "Zod",
    ],
  },
  {
    key: "scholarai",
    image: "/projects/scholarai.png",
    tech: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Qdrant",
      "OpenAI",
      "Supabase",
      "LangSmith",
      "RAG",
    ],
  },
  {
    key: "finplanning",
    image: null,
    tech: ["Java", "Spring Boot", "React", "SQL Server", "Redis"],
  },
];
