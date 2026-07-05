// Structural project data. Titles/descriptions live in messages/*.json
// under `projects.items.<key>` so they can be translated.
export type Project = {
  key: string;
  image: string | null;
  github: string;
  tech: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    key: "vcareer",
    image: "/projects/vcareer.jpg",
    github: "https://github.com/TuNM17421/VCareer",
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
    github: "https://github.com/TuNM17421/ScholarAI",
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
    github: "https://github.com/tuannqhe151337/fn-planning-backend",
    tech: ["Java", "Spring Boot", "React", "SQL Server", "Redis"],
  },
];
