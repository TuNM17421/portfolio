// Structural project data. Titles/descriptions live in messages/*.json
// under `projects.items.<key>` so they can be translated.
export type Project = {
  key: string;
  // First entry is the card cover; the rest populate the lightbox gallery.
  // Empty array renders the gradient placeholder.
  images: string[];
  tech: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    key: "vcareer",
    images: ["/projects/vcareer/cover.jpg"],
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
    images: [
      "/projects/scholarai/landing.png",
      "/projects/scholarai/project.png",
      "/projects/scholarai/semantic-search.png",
      "/projects/scholarai/chat.png",
      "/projects/scholarai/notes.png",
      "/projects/scholarai/benchmark-1.png",
      "/projects/scholarai/benchmark-2.png",
    ],
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
    images: [],
    tech: ["Java", "Spring Boot", "React", "SQL Server", "Redis"],
  },
];
