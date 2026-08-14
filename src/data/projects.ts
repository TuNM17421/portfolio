// Structural project data. Titles/descriptions live in messages/*.json
// under `projects.items.<key>`; per-image captions under `…<key>.shots.<shot>`.
export type ProjectImage = {
  src: string;
  // Caption key resolved via `projects.items.<project>.shots.<shot>`.
  shot: string;
  // Optional intrinsic dimensions let evidence-heavy routes reserve the exact
  // source aspect ratio before Next Image finishes loading.
  width?: number;
  height?: number;
};

export type Project = {
  key: string;
  // First entry is the card cover; the rest populate the lightbox gallery.
  // Empty array renders the gradient placeholder.
  images: ProjectImage[];
  tech: string[];
  featured?: boolean;
  caseStudyPath?: "/projects/vcareer";
  liveUrl?: string;
  architectureUrl?: string;
  repoVisibility?: "private";
};

export const VCAREER_PROJECT = {
  key: "vcareer",
  images: [
    {
      src: "/projects/vcareer/landing_page.PNG",
      shot: "landing",
      width: 1902,
      height: 914,
    },
    {
      src: "/projects/vcareer/cv_builder.PNG",
      shot: "cvBuilder",
      width: 1920,
      height: 914,
    },
    {
      src: "/projects/vcareer/match_cv_with_job.PNG",
      shot: "match",
      width: 1920,
      height: 911,
    },
    {
      src: "/projects/vcareer/interview_demo.PNG",
      shot: "interviewDemo",
      width: 1920,
      height: 908,
    },
    {
      src: "/projects/vcareer/interview_review.PNG",
      shot: "interviewReview",
      width: 1920,
      height: 913,
    },
    {
      src: "/projects/vcareer/user_dashboard.PNG",
      shot: "dashboard",
      width: 1903,
      height: 915,
    },
  ],
  featured: true,
  caseStudyPath: "/projects/vcareer",
  liveUrl: "https://topportfolio-sage.vercel.app/",
  architectureUrl: "https://vcareea-architecture.lovable.app/",
  repoVisibility: "private",
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
    "Three.js TalkingHead",
    "Cloudflare R2",
    "Amazon S3",
    "Zod",
  ],
} satisfies Project;

export const PROJECTS: Project[] = [
  VCAREER_PROJECT,
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
