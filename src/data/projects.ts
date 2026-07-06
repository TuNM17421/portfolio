// Structural project data. Titles/descriptions live in messages/*.json
// under `projects.items.<key>`; per-image captions under `…<key>.shots.<shot>`.
export type ProjectImage = {
  src: string;
  // Caption key resolved via `projects.items.<project>.shots.<shot>`.
  shot: string;
};

export type Project = {
  key: string;
  // First entry is the card cover; the rest populate the lightbox gallery.
  // Empty array renders the gradient placeholder.
  images: ProjectImage[];
  tech: string[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    key: "vcareer",
    images: [
      { src: "/projects/vcareer/landing_page.PNG", shot: "landing" },
      { src: "/projects/vcareer/cv_builder.PNG", shot: "cvBuilder" },
      { src: "/projects/vcareer/match_cv_with_job.PNG", shot: "match" },
      { src: "/projects/vcareer/interview_demo.PNG", shot: "interviewDemo" },
      { src: "/projects/vcareer/interview_review.PNG", shot: "interviewReview" },
      { src: "/projects/vcareer/user_dashboard.PNG", shot: "dashboard" },
    ],
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
      { src: "/projects/scholarai/landing.png", shot: "landing" },
      { src: "/projects/scholarai/project.png", shot: "project" },
      { src: "/projects/scholarai/semantic-search.png", shot: "semanticSearch" },
      { src: "/projects/scholarai/chat.png", shot: "chat" },
      { src: "/projects/scholarai/notes.png", shot: "notes" },
      { src: "/projects/scholarai/benchmark-1.png", shot: "benchmark1" },
      { src: "/projects/scholarai/benchmark-2.png", shot: "benchmark2" },
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
    images: [
      { src: "/projects/finplanning/dashboard.png", shot: "dashboard" },
      { src: "/projects/finplanning/login.png", shot: "login" },
      { src: "/projects/finplanning/project_management.png", shot: "projectMgmt" },
      { src: "/projects/finplanning/term_management.png", shot: "termMgmt" },
      { src: "/projects/finplanning/create_term.png", shot: "createTerm" },
      { src: "/projects/finplanning/list_expenses.png", shot: "expenses" },
      { src: "/projects/finplanning/upload_exel.png", shot: "importExcel" },
      { src: "/projects/finplanning/financial_report.png", shot: "financialReport" },
      { src: "/projects/finplanning/annual_report.png", shot: "annualReport" },
      { src: "/projects/finplanning/department_management.png", shot: "departmentMgmt" },
      { src: "/projects/finplanning/currency_management.png", shot: "currencyMgmt" },
      { src: "/projects/finplanning/exchange_rate_management.png", shot: "exchangeRate" },
      { src: "/projects/finplanning/user_management.png", shot: "userMgmt" },
      { src: "/projects/finplanning/user_profile.png", shot: "userProfile" },
    ],
    tech: ["Java", "Spring Boot", "React", "SQL Server", "Redis"],
  },
];
