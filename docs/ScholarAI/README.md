# ScholarAI — Literature Discovery Engine

Hệ thống tìm kiếm và đọc tài liệu nghiên cứu học thuật được hỗ trợ bởi AI. Kết hợp **hybrid semantic search** (dense + sparse), **Semantic Scholar** metadata, in-app **PDF reader với highlight + note**, **chat-with-paper** (RAG streaming), và **write-paper-with-project** (Markdown/Pandoc draft + AI outline). Auth qua password hoặc OAuth (Google/GitHub/Microsoft); user có **tier** (free/paid) với soft quotas, **role** (user/admin) cho admin panel. PDF của user được lưu trên Supabase Storage để giải quyết các paper không có open-access URL hoặc tài liệu cá nhân (`upload:<uuid>` synthetic IDs).

![ScholarAI landing page](./public/lading_page.png)

> *Landing page — hybrid semantic search, AI synthesis và integrated PDF reader trên nền production AI infrastructure (Semantic Scholar · Hybrid RAG · GPT-4o mini · OAuth 2.0).*

---

## Key Features

### Hybrid semantic search
Dense (OpenAI 1536d) + sparse (BM25) embeddings được kết hợp bằng **Qdrant RRF fusion** — bắt được cả ngữ nghĩa lẫn keyword khớp chính xác (acronyms, tên tác giả, năm).

![Discovery / semantic search page](./public/semantic_search_page.png)

> *Trang Discovery: keyword / semantic / AI-assisted research với filter (year · open-access · min citations), điểm retrieval/citation/recency/final per-result, và AI relevance analysis kèm summary + "why it matches".*

### OAuth sign-in (Google / GitHub / Microsoft)
- Authorization Code flow với CSRF defense: state là JWT-signed + nonce cookie binding (browser-bound replay protection).
- Auto-linking by email được cố tình refuse (returns `oauth_link_required`) — user phải sign-in account hiện tại trước rồi link provider mới từ Settings, đóng vector account-takeover.
- Lockout guard: unlink-last-provider bị refuse khi user chưa set password.

### Tier + role + soft quotas
- 2 tiers (`free`, `paid`) × multi-feature quota matrix in [`backend/app/services/quota.py`](./backend/app/services/quota.py). Daily counters cho `deep_search`, `outline`, `chat`. Cumulative caps cho `pdf_uploads`, `projects`. Distinct-paper-per-day cho `chat_papers`.
- 2 roles (`user`, `admin`). Admin gates qua `require_admin` dependency; auto-promoted từ `BOOTSTRAP_ADMIN_EMAILS` env.
- `/api/me/usage` trả về full snapshot (used/limit per feature) drives toàn bộ frontend badges + disabled-button states.
- Spec: [`docs/feature/user_type.md`](./docs/feature/user_type.md).

### In-app PDF reader với note
- Auth-gated proxy (`/api/pdf/{id}`) → blob → `pdfjs-dist` render inline
- Source resolution: **user upload → S2 OA URL** — proxy tự pick nguồn nào khả dụng
- 3 annotation types: **highlight · underline · strikeout**, 5 màu để phân loại
- Click vào highlight để edit/delete (popup), sidebar collapsible liệt kê toàn bộ notes của paper

![PDF reader với Notes & Highlights](./public/paper_notes.png)

> *In-app PDF reader với panel Notes & Highlights: highlight/underline nhiều màu, mỗi note gắn comment và nút delete, đồng bộ với vị trí trên trang PDF.*

### Cross-paper note search
Trang `/notes` cho phép semantic search trên **tất cả** notes của user (collection `user_highlights` trên Qdrant, filter `user_id` để multi-tenant isolation). Mỗi note được embed kết hợp `text + comment`.

### Hierarchical RAG (chat-with-paper)
- **Parent paragraphs** (~50–600 tokens, paragraph-boundary cuts) là context được gửi cho LLM
- **Child windows** (~100 tokens) là cái được embed cho retrieval; mỗi child carry `parent_index` để map back
- Schema-versioned chunk index (`schema_version=2`); v1 chunks bị clean-up tự động khi user chat lần đầu sau migration
- Search dedupe-by-parent: over-fetch `2*top_k` children, collapse về ≤ `top_k` distinct parents
- LLM response **streams qua SSE** (`text/event-stream`), citation chips clickable → scroll PDF tới đúng page
- RAG fan-out: paper chunks + same-paper notes + cross-paper notes ("what else in your reading is relevant?")
- Spec: [`docs/feature/hierarchical_rag.md`](./docs/feature/hierarchical_rag.md) + [`docs/feature/chat_with_paper.md`](./docs/feature/chat_with_paper.md).

![Chat with paper](./public/chat_with_paper.png)

> *Panel Chat with Paper nằm cạnh PDF: câu trả lời stream qua SSE với citation chips (`chunk_*`) clickable và danh sách sources trích từ paper.*

### User PDF uploads
2 luồng riêng nhưng share cùng quota:
- **S2-paper gap fill** (`POST /api/uploads/{paper_id}`): user upload PDF cho 1 paper Semantic Scholar không có open-access URL. Re-upload qua UPSERT.
- **Personal paper** (`POST /api/uploads/personal`): paper không tồn tại trên S2 (own preprint, lecture notes, internal whitepaper). Backend mint `upload:<uuid>` synthetic ID, gọi LLM extract metadata (title/authors/year/abstract), tự động add vào reading-list. Cascade delete: storage + uploads slot + reading_list + user_papers + Qdrant chunks.

Bytes lưu trên Supabase Storage (`paper-uploads/users/{user_id}/{paper_id}.pdf`); ownership row trong PG. Quota cumulative cap (free=3/paid=10). 25 MB ceiling, magic-bytes validation, content-type sniff, PDF text-extractability check trước storage write để tránh orphan blob.

Specs: [`docs/feature/upload_pdf.md`](./docs/feature/upload_pdf.md), [`docs/feature/self_pdf_upload.md`](./docs/feature/self_pdf_upload.md).

### Lazy paper detail caching
`/api/papers/{paper_id}` ưu tiên `papers_cache` trong PG; chỉ gọi S2 khi miss. TTL configurable (`PAPER_DETAIL_CACHE_TTL_DAYS`, default 30 ngày). Ingest pipeline cũng populate cache → giảm latency request đầu tiên. Personal IDs (`upload:*`) đi nhánh riêng vào `user_papers` table.

### Write paper with project (Phase 3)
Tạo Project → gắn 3-10 papers từ reading list → link highlights làm evidence → AI gen outline → viết draft trong markdown editor (autosave) → export `.tex` + `.bib` upload Overleaf để compile PDF.

- **Citation autocomplete**: gõ `@` trong editor → dropdown papers trong project → insert `[@citation_key]`
- **Citation keys** generate từ Author+Year+title-word (`vaswani2017attention`), dedupe trong project bằng suffix `a/b/c`
- **Outline generator** dùng `gpt-4o-mini`: project metadata + paper abstracts + linked highlights → markdown outline với `[@key]` references
- **Pandoc export**: `pandoc --citeproc` cho `.tex` / `.docx`; `.bib` build trực tiếp từ Python với LaTeX-escape; CSL files (apa/mla/ieee/chicago) drop vào `backend/app/csl/`
- **Định vị**: ScholarAI là research workflow tool, không cạnh tranh với Overleaf. Server-side PDF compile bị skip để tránh TeX Live (~5GB image)
- Soft per-user quota: project cap (free=3/paid=10) × 10 papers × 100 notes × 50K-char draft (configurable)

![Project workspace](./public/project_page.png)

> *Project workspace: research pipeline (Papers → Notes → Outline → Drafting), quick access papers/notes, activity timeline, team members và project metadata (architecture · tags · citation style).*

Spec: [`docs/feature/write_paper_with_project.md`](./docs/feature/write_paper_with_project.md).

### Admin panel
Trang `/admin` (chỉ render khi `/api/me/usage` trả `role='admin'`):
- **Users**: filter (email/role/tier/active), paginate, edit role/tier/`is_active` inline
- **Ingest**: trigger S2 search ingest hoặc upload danh sách paper IDs để pre-populate Qdrant
- **Analytics**: DAU, search volume, chat volume (daily + weekly)

Spec: [`docs/feature/admin_dashboard.md`](./docs/feature/admin_dashboard.md).

---

## Architecture

```
┌──────────────────────┐          ┌─────────────────────────────────────────────────────────┐
│  Next.js 16 frontend │ ───JWT──▶│                  FastAPI backend (v0.2.0)               │
│  React 19 · App      │          │                                                         │
│  Router · Tailwind 3 │          │  /api/auth          Register · login · OAuth (3 prov)   │
│  • Discovery (search)│          │  /api/me            Usage · OAuth identities · password │
│  • Reading list      │          │  /api/papers        Search · detail · refs · citations  │
│  • PDF reader + notes│          │  /api/authors       Author search & papers              │
│  • Chat with paper   │          │  /api/semantic      Hybrid search · ingest · research   │
│  • Cross-paper notes │          │  /api/reading-list  Saved papers · notes · citations    │
│  • Write paper (proj)│          │  /api/research-history  Past LLM research sessions      │
│  • Admin panel       │          │  /api/highlights    Notes CRUD · semantic search        │
│  • Settings          │          │  /api/pdf/{id}      Auth-gated PDF proxy (streaming)    │
└──────────┬───────────┘          │  /api/chat/{id}     RAG chat with paper · SSE stream    │
           │                      │  /api/projects      Write-paper workspace (Phase 3)     │
           │                      │  /api/uploads       User PDF uploads · personal papers  │
           │                      │  /api/admin         User mgmt · ingest · analytics      │
           │                      └────┬──────────────┬────────────────┬───────────────────┘
           │                           │              │                │
           │              ┌────────────┘              │                └───────────┐
           │              ▼                           ▼                            ▼
           │  ┌────────────────────┐    ┌──────────────────────┐     ┌─────────────────────┐
           │  │ Semantic Scholar   │    │   PostgreSQL          │     │  Qdrant Cloud        │
           │  │ Graph API          │    │  (asyncpg pool)       │     │  3 collections:      │
           │  │  (paper metadata)  │    │  • users + oauth_     │     │  • papers (hybrid)   │
           │  └────────────────────┘    │    identities         │     │    dense + BM25 RRF  │
           │                            │  • papers_cache       │     │  • user_highlights   │
           │                            │  • reading_list       │     │    (per-user notes)  │
           │  ┌────────────────────┐    │  • research_history   │     │  • paper_chunks      │
           ├─▶│ OAuth providers    │    │  • paper_highlights   │     │    (hierarchical RAG │
           │  │  Google · GitHub · │    │  • chat_messages      │     │     parent + child)  │
           │  │  Microsoft         │    │  • projects + papers  │     └─────────────────────┘
           │  └────────────────────┘    │    + notes + drafts   │                ▲
           │                            │  • user_usage_daily   │                │
           │                            │  • user_chat_papers_  │     ┌──────────┴──────────┐
           │                            │    daily              │     │  OpenAI              │
           │                            │  • user_paper_uploads │     │  • text-embedding-   │
           │                            │  • user_papers        │     │    3-small (1536d)   │
           │                            │    (personal-upload)  │     │  • gpt-4o-mini       │
           │                            │  • rate_limit · cache │     │    (research/chat/   │
           │                            └──────────────────────┘      │     metadata extract)│
           │                                                          └──────────────────────┘
           │                            ┌──────────────────────┐
           └────────────PDF blob──────▶ │  Supabase Storage     │
                                        │  paper-uploads bucket │
                                        │  users/{id}/*.pdf     │
                                        └──────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, RSC) · React 19 · TypeScript · Tailwind v3 · shadcn/ui · `react-pdf-highlighter-extended` · `pdfjs-dist` |
| Backend API | FastAPI 0.115 · Uvicorn · Pydantic v2 |
| Database | PostgreSQL (via `asyncpg`) — users, OAuth identities, cache, reading-list, history, highlights, chat, projects, drafts, quotas, uploads |
| Vector DB | Qdrant Cloud — `papers` (hybrid), `user_highlights` (per-user), `paper_chunks` (hierarchical RAG) |
| Object storage | Supabase Storage — `paper-uploads` bucket cho user-uploaded PDFs |
| Dense embeddings | OpenAI `text-embedding-3-small` (1536 dims) |
| Sparse embeddings | `fastembed` BM25 (in-process) |
| Ranking | Qdrant native RRF fusion (dense + sparse) |
| LLM | OpenAI `gpt-4o-mini` (paper analysis · research synthesis · chat · personal-paper metadata extract · outline) |
| Auth | JWT HS256 + bcrypt; OAuth 2.0 Authorization Code (Google · GitHub · Microsoft) |
| Paper data | Semantic Scholar Graph API |
| PDF | `pdfjs-dist` (client) + `httpx` streaming proxy (server) + `pdfplumber` (text extraction for chunks/metadata) |
| Export | Pandoc (`.tex` / `.docx` via `--citeproc`, custom `.bib` builder, CSL files) |

---

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py                         # FastAPI app · CORS · lifespan
│   │   ├── config.py                       # Settings (env via pydantic-settings)
│   │   ├── models.py                       # Pydantic request/response models
│   │   ├── dependencies/
│   │   │   ├── auth.py                     # get_current_user · require_admin
│   │   │   └── rate_limit.py               # Per-user daily rate limit
│   │   ├── routers/
│   │   │   ├── auth.py                     # Register · login · OAuth authorize/callback/link
│   │   │   ├── me.py                       # /api/me — usage · OAuth identities · set password
│   │   │   ├── papers.py                   # Search · detail (cached) · recs · citations · refs
│   │   │   ├── authors.py                  # Author search & papers
│   │   │   ├── semantic_search.py          # Hybrid search · ingest · research synthesis
│   │   │   ├── reading_list.py             # Save · note · list · citation export
│   │   │   ├── research_history.py         # Past LLM research sessions
│   │   │   ├── paper_highlights.py         # Notes CRUD + semantic search
│   │   │   ├── pdf_proxy.py                # Auth-gated streaming proxy (user upload → OA URL)
│   │   │   ├── chat.py                     # RAG chat with paper (SSE stream)
│   │   │   ├── projects.py                 # Write-paper workspace · papers · notes · draft · outline · export
│   │   │   ├── uploads.py                  # User PDF uploads · personal papers
│   │   │   └── admin.py                    # Admin: users · ingest · analytics
│   │   ├── services/
│   │   │   ├── db.py                       # PG pool · init/close
│   │   │   ├── users.py                    # users table · bcrypt · tier/role
│   │   │   ├── oauth.py                    # Provider configs (Google/GitHub/MS)
│   │   │   ├── oauth_identities.py         # (user_id, provider, provider_id) link table
│   │   │   ├── security.py                 # JWT encode/decode + OAuth state JWT
│   │   │   ├── semantic_scholar.py         # S2 Graph API client + parse_paper
│   │   │   ├── papers_cache.py             # PG cache for /papers/{id} detail
│   │   │   ├── embedding.py                # OpenAI dense embeddings
│   │   │   ├── sparse_embedding.py         # fastembed BM25
│   │   │   ├── qdrant.py                   # Qdrant client · papers collection
│   │   │   ├── user_highlights_index.py    # Qdrant user_highlights (per-user notes)
│   │   │   ├── paper_chunks_index.py       # Qdrant paper_chunks (hierarchical RAG, schema v2)
│   │   │   ├── chunking.py                 # Hierarchical: parent paragraphs + child windows
│   │   │   ├── ingestion.py                # S2 search → embed (dense+sparse) → Qdrant + PG
│   │   │   ├── pdf_extract.py              # pdfplumber wrapper (bytes / Supabase storage key)
│   │   │   ├── chat_engine.py              # RAG fan-out + LLM streaming
│   │   │   ├── chat_messages.py            # PG persistence
│   │   │   ├── paper_highlights.py         # PG CRUD for notes
│   │   │   ├── reading_list.py             # PG reading list
│   │   │   ├── research_history.py         # PG research history
│   │   │   ├── rate_limit.py               # Per-user counters (legacy, used for /research)
│   │   │   ├── quota.py                    # Tier-based soft quotas + daily/cumulative tracking
│   │   │   ├── llm.py                      # OpenAI chat (analysis · research synthesis)
│   │   │   ├── llm_metadata.py             # LLM metadata extraction for personal uploads
│   │   │   ├── citation_formatter.py       # APA / MLA / IEEE / BibTeX
│   │   │   ├── citation_keys.py            # Deterministic Author+Year+title-word keys
│   │   │   ├── projects.py                 # PG projects + papers + notes
│   │   │   ├── project_drafts.py           # PG markdown drafts (autosaved)
│   │   │   ├── outline_generator.py        # LLM outline from project metadata + highlights
│   │   │   ├── export.py                   # Pandoc-based .tex/.docx export + .bib builder
│   │   │   ├── storage.py                  # Supabase Storage REST client (httpx)
│   │   │   ├── uploads.py                  # user_paper_uploads — owns the upload slot table
│   │   │   ├── user_papers.py              # Personal-paper metadata (upload:<uuid>)
│   │   │   ├── admin.py                    # Admin user management
│   │   │   ├── admin_analytics.py          # Daily/weekly usage analytics
│   │   │   ├── admin_ingest.py             # Bulk ingest (search query / direct paper IDs)
│   │   │   └── cache.py                    # Generic JSON cache
│   │   └── csl/                            # Bundled CSL files (apa, mla, ieee, chicago)
│   │   └── evals/                          # Chat-with-papers benchmark harness
│   │       ├── schema.py                   # Pydantic v1.1 dataset models
│   │       ├── config.py                   # Dataset names, BENCHMARK_USER_ID, judge model
│   │       ├── target.py                   # Adapter → generate_chat_response
│   │       └── evaluators.py               # 7 scorers (pure-code + LLM-judge + refusal)
│   ├── benchmarks/                         # Hand-curated QA datasets (source of truth)
│   │   ├── SCHEMA.md                       # v1.1 schema spec
│   │   ├── qa.json                         # Paper-chat QA pairs
│   │   └── refusal.json                    # Off-topic guardrail test set
│   ├── scripts/
│   │   ├── backfill_highlight_index.py     # One-shot: re-embed all highlights → Qdrant
│   │   ├── upload_benchmark_dataset.py     # JSON → LangSmith dataset (in-place replace)
│   │   ├── upload_refusal_dataset.py       # Off-topic dataset uploader
│   │   ├── run_qa_eval.py                  # Trigger QA eval run (6 evaluators)
│   │   ├── run_refusal_eval.py             # Trigger refusal eval run
│   │   └── cleanup_benchmark_user.py       # Truncate benchmark user's chat_messages
│   ├── tests/                              # Unit tests (chunking, citation keys, etc.)
│   ├── Dockerfile · .dockerignore · requirements.txt
├── frontend/
│   ├── app/
│   │   ├── login/ · register/              # Public auth pages (with OAuth buttons)
│   │   ├── oauth/callback/                 # OAuth post-callback redirect handler
│   │   └── (protected)/                    # JWT-guarded layout
│   │       ├── page.tsx                    # Discovery (keyword + semantic search)
│   │       ├── papers/[id]/                # Detail · /pdf reader · /chat
│   │       ├── reading-list/               # Saved papers + per-card actions
│   │       ├── notes/                      # Cross-paper semantic note search
│   │       ├── history/                    # Past research sessions
│   │       ├── projects/                   # Workspace list · /new · /[id]/...
│   │       ├── settings/security/          # Password · connected OAuth providers
│   │       └── admin/                      # Admin panel (users · ingest)
│   ├── components/
│   │   ├── pdf-viewer.tsx · highlight-sidebar.tsx · ...
│   │   ├── upload-pdf-dialog.tsx           # S2-paper PDF gap-fill upload
│   │   ├── upload-personal-pdf-dialog.tsx  # Personal-paper upload (mints upload:<uuid>)
│   │   ├── app-sidebar.tsx                 # Collapsible sidebar w/ recents
│   │   └── ui/*                            # shadcn/ui primitives
│   └── lib/                                # api client · types · auth-context · usage-context · utils
├── docs/
│   └── feature/
│       ├── chat_with_paper.md              # Phase 2 — RAG chat
│       ├── hierarchical_rag.md             # Parent + child chunk pipeline
│       ├── upload_pdf.md                   # User PDF upload (S2 gap-fill)
│       ├── self_pdf_upload.md              # Personal-paper upload
│       ├── user_type.md                    # Tier/role + quota matrix
│       ├── multiple_login_problem.md       # OAuth + account linking design
│       ├── admin_dashboard.md              # Admin panel surface
│       ├── write_paper_with_project.md     # Phase 3 — projects/draft/export
│       ├── paper_note.md                   # PDF annotation (Phase 1)
│       └── chunk_note.md                   # Highlight indexing (Phase 1)
├── scripts/                                # Git pre-push hook · AI prompt logging
├── docker-compose.yml                      # Local Qdrant + Postgres
├── render.yaml                             # Render deploy config
├── AGENTS.md · JOURNAL.md · WORKLOG.md     # Team docs
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python 3.12+** (backend)
- **Node.js 18+** (frontend)
- **Docker & Docker Compose** (local Qdrant + Postgres) — hoặc Qdrant Cloud + managed PG
- **Supabase project** với `paper-uploads` bucket (cho user uploads — xem [`docs/feature/upload_pdf.md`](./docs/feature/upload_pdf.md) §3)
- API keys: Semantic Scholar (free), OpenAI
- (Optional) OAuth client credentials cho Google / GitHub / Microsoft nếu muốn enable sign-in qua provider

### 1. Clone & install git hooks

```bash
git clone <repo-url>
cd A20-App-071

# Install git pre-push hook (one time, để auto-log AI prompts)
bash scripts/setup_hooks.sh
```

### 2. Start infra (Qdrant + Postgres)

```bash
docker compose up -d
```

Qdrant chạy tại `http://localhost:6333`. Nếu dùng **Qdrant Cloud**, set `QDRANT_URL` + `QDRANT_API_KEY` trong `.env` thay vì host/port.

### 3. Configure backend

```bash
cd backend
cp .env.example .env
```

Điền `.env`:

```env
# Semantic Scholar
SEMANTIC_SCHOLAR_API_KEY=...

# OpenAI (embeddings + LLM)
OPENAI_API_KEY=...
LLM_MODEL=gpt-4o-mini
CHAT_MODEL=gpt-4o-mini

# PostgreSQL
POSTGRES_DSN=postgresql://scholar:scholar_secret@localhost:5432/scholar_ai

# Qdrant — Cloud (priority) hoặc local
QDRANT_URL=                    # https://xxx.cloud.qdrant.io:6333 (để rỗng nếu dùng local)
QDRANT_API_KEY=
QDRANT_HOST=localhost
QDRANT_PORT=6333

# Auth
JWT_SECRET=<generate via `openssl rand -hex 32`>
JWT_ACCESS_TTL_DAYS=7

# CORS (frontend origins, comma-separated)
CORS_ALLOWED_ORIGINS=http://localhost:3000

# OAuth providers (optional — bỏ trống thì sign-in qua provider đó bị ẩn)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
OAUTH_REDIRECT_BASE=http://localhost:8000     # API host (callback URL prefix)
FRONTEND_BASE_URL=http://localhost:3000       # Frontend host (post-OAuth redirect)

# Supabase Storage (user PDF uploads)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service role key — bypass RLS, server-only>
SUPABASE_UPLOADS_BUCKET=paper-uploads

# Admin bootstrap (comma-separated emails — auto-promote role='admin' on startup)
BOOTSTRAP_ADMIN_EMAILS=admin@example.com

# Quotas (override defaults nếu cần — xem docs/feature/user_type.md)
RESEARCH_RATE_LIMIT_PER_DAY=10
CHAT_RATE_LIMIT_PER_DAY=100
```

### 4. Run backend

```bash
cd backend
python -m venv venv
source venv/bin/activate          # Linux/Mac
# venv\Scripts\activate           # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs: `http://localhost:8000/docs`. Lifespan tự tạo PG tables + Qdrant collections. Nếu `BOOTSTRAP_ADMIN_EMAILS` được set, các email đó được promote `role='admin'` ngay lúc startup.

### 5. Run frontend

```bash
cd frontend
npm install

# Set API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

npm run dev
```

App: `http://localhost:3000`.

### 6. (Optional) Backfill highlight index

Sau lần deploy đầu hoặc khi đổi schema embedding:

```bash
cd backend
python -m scripts.backfill_highlight_index
```

### 7. (Optional) Enable LangSmith tracing

`backend/app/services/llm.py` chạy qua LangChain `ChatOpenAI`. Khi
`LANGSMITH_TRACING=true` + `LANGSMITH_API_KEY=...` được set, mọi LLM
call sẽ tự động xuất hiện trong dashboard
[smith.langchain.com](https://smith.langchain.com) (project default
`scholarai`, override qua `LANGSMITH_PROJECT`).

```env
LANGSMITH_TRACING=true
LANGSMITH_API_KEY=lsv2_pt_...
LANGSMITH_PROJECT=scholarai
```

Default OFF — bỏ trống các biến trên thì service hoạt động bình thường,
không tốn round-trip lên LangSmith.

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Tạo tài khoản (email + password) |
| `POST` | `/api/auth/login` | Login → JWT access token |
| `GET`  | `/api/auth/me` | Trả về user hiện tại (JWT-validated) |
| `GET`  | `/api/auth/oauth/{provider}/authorize` | Bắt đầu OAuth sign-in (top-level redirect → provider consent) |
| `POST` | `/api/auth/oauth/{provider}/link` | Link provider cho user đã đăng nhập (auth required, returns `{authorize_url}`) |
| `GET`  | `/api/auth/oauth/{provider}/callback` | Provider callback — sign-in branch hoặc link branch tùy `intent` trong state JWT |

OAuth providers: `google`, `github`, `microsoft`. Auto-linking by email là cố tình bị refuse (`oauth_link_required`) — user phải sign in vào account hiện tại rồi link từ Settings để tránh account-takeover. Xem [`docs/feature/multiple_login_problem.md`](./docs/feature/multiple_login_problem.md).

### Me (`/api/me`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/api/me/usage` | Tier · role · today's quota usage cho mọi feature (drives badges/disabled-states ở frontend) |
| `GET`    | `/api/me/oauth-identities` | Linked providers · available providers · `has_password` flag |
| `DELETE` | `/api/me/oauth-identities/{provider}` | Unlink provider (refuse nếu sẽ lock user khỏi account) |
| `POST`   | `/api/me/password` | Set hoặc rotate password (rotate cần `current_password`; first-time set cho OAuth-only user thì không cần) |

### Papers (`/api/papers`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/papers/search?q=...` | Keyword search via Semantic Scholar |
| `GET` | `/api/papers/{paper_id}` | Detail (PG cache → S2 fallback; `upload:<uuid>` → user_papers) |
| `GET` | `/api/papers/{paper_id}/recommendations` | Gợi ý paper tương tự (200+empty cho personal IDs) |
| `GET` | `/api/papers/{paper_id}/citations` | Papers trích dẫn paper này (200+empty cho personal IDs) |
| `GET` | `/api/papers/{paper_id}/references` | References của paper (200+empty cho personal IDs) |

### Authors (`/api/authors`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/authors/search?q=...` | Tìm tác giả |
| `GET` | `/api/authors/{author_id}` | Detail |
| `GET` | `/api/authors/{author_id}/papers` | Papers của tác giả |

### Semantic search (`/api/semantic`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`  | `/api/semantic/search?q=&top_k=` | **Hybrid** dense + BM25 (RRF fusion) trên collection `papers` |
| `POST` | `/api/semantic/ingest?q=` | S2 search → embed dense + sparse → Qdrant + PG cache |
| `POST` | `/api/semantic/research` | LLM research synthesis (rate-limited per user qua `quota.deep_search`) |

### Reading list (`/api/reading-list`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/api/reading-list/` | Danh sách paper đã save (kèm `has_user_upload` join) |
| `POST`   | `/api/reading-list/` | Save paper (idempotent — re-save updates note) |
| `GET`    | `/api/reading-list/{paper_id}` | Detail của 1 saved item |
| `DELETE` | `/api/reading-list/{paper_id}` | Remove |
| `PATCH`  | `/api/reading-list/{paper_id}/note` | Update note |
| `GET`    | `/api/reading-list/{paper_id}/saved` | `{saved: bool}` — for save-state badge |
| `POST`   | `/api/reading-list/export/citations` | Export citations (APA / MLA / IEEE / BibTeX) |

### Research history (`/api/research-history`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/api/research-history/` | Sessions của user |
| `GET`    | `/api/research-history/{id}` | Detail (query + papers + LLM analysis) |
| `DELETE` | `/api/research-history/{id}` | Remove |

### Highlights / Notes (`/api/highlights`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/api/highlights/{paper_id}` | List notes của paper |
| `POST`   | `/api/highlights` | Tạo note (background: embed → Qdrant `user_highlights`) |
| `PATCH`  | `/api/highlights/{id}` | Update text/comment/style/color (re-embed) |
| `DELETE` | `/api/highlights/{id}` | Delete (cả PG + Qdrant) |
| `GET`    | `/api/highlights/search?q=&paper_id=&limit=` | **Semantic search** trên notes của user (dense + payload filter `user_id`) |

### PDF proxy

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/pdf/{paper_id}` | Auth-gated streaming proxy (https-only, 25 MB cap, `inline` Content-Disposition). Resolution order: **user upload → S2 OA URL** |

### Chat with papers (`/api/chat`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/api/chat/{paper_id}/history` | Lịch sử chat của user với paper |
| `POST`   | `/api/chat/{paper_id}/messages` | Gửi câu hỏi → **SSE stream** câu trả lời (rate-limited theo `quota.chat` + `quota.chat_papers`) |
| `DELETE` | `/api/chat/{paper_id}` | Xóa toàn bộ history của user với paper này |

### Projects — write paper with project (`/api/projects`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/api/projects` | List projects của user (kèm paper/note count + draft size) |
| `POST`   | `/api/projects` | Tạo project (title, research question, citation style) |
| `GET`    | `/api/projects/{id}` | Project detail + counts |
| `PATCH`  | `/api/projects/{id}` | Update metadata |
| `DELETE` | `/api/projects/{id}` | Xóa project (highlights bản thân không bị xóa) |
| `GET` / `POST` / `DELETE` | `/api/projects/{id}/papers[/{paper_id}]` | List · add (auto-generate citation key) · remove |
| `GET` / `POST` / `DELETE` | `/api/projects/{id}/notes[/{highlight_id}]` | List · link existing highlight · unlink |
| `GET` / `PATCH` | `/api/projects/{id}/draft` | Markdown draft (autosaved client-side) |
| `POST`   | `/api/projects/{id}/outline` | Generate outline với LLM (rate-limited qua `quota.outline`) |
| `GET`    | `/api/projects/{id}/export?format=md\|bib\|tex\|docx` | Pandoc export |

### User uploads & personal papers (`/api/uploads`)

| Method | Endpoint | Description |
|---|---|---|
| `GET`    | `/api/uploads` | List user's uploads + tier cap |
| `POST`   | `/api/uploads/{paper_id}` | Upload PDF cho 1 S2 paper (gap-fill khi paper không có OA URL). Re-upload qua UPSERT, không tốn slot |
| `DELETE` | `/api/uploads/{paper_id}` | Xóa user's PDF copy (paper vẫn còn trong reading-list) |
| `POST`   | `/api/uploads/personal` | Upload personal paper — mints `upload:<uuid>`, LLM extract metadata, auto-add vào reading-list |
| `DELETE` | `/api/uploads/personal/{paper_id}` | Cascade-delete personal paper (storage + uploads slot + reading_list + user_papers + Qdrant chunks) |

Quota: cumulative cap, free=3 / paid=10. Routes `/personal*` phải declare TRƯỚC `/{paper_id}` (FastAPI matching order). Xem [`docs/feature/upload_pdf.md`](./docs/feature/upload_pdf.md) + [`docs/feature/self_pdf_upload.md`](./docs/feature/self_pdf_upload.md).

### Admin (`/api/admin`) — gated by `require_admin`

| Method | Endpoint | Description |
|---|---|---|
| `GET`   | `/api/admin/users` | List + filter (email/role/tier/active) + paginate |
| `PATCH` | `/api/admin/users/{user_id}` | Update role/tier/`is_active`/tier_expires_at |
| `POST`  | `/api/admin/ingest/search` | Trigger S2 search ingest (manual seeding của papers collection) |
| `POST`  | `/api/admin/ingest/upload` | Upload danh sách paper IDs (CSV/JSON) để ingest direct |
| `GET`   | `/api/admin/analytics` | Daily/weekly usage analytics (DAU, search volume, chat volume) |

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status |
| `GET` | `/health` | Health check |

---

## Evaluation (chat-with-papers benchmarks)

Hand-curated QA benchmarks chạy qua **LangSmith Evaluations** để đo accuracy/faithfulness của RAG chat pipeline trên mỗi commit. Hai dataset độc lập:

- **QA** ([`backend/benchmarks/qa.json`](./backend/benchmarks/qa.json)) — 3 papers × 40 Q với evidence (section + page + exact_quote). Schema v1.1, validated bởi Pydantic. Stratify được theo `difficulty_level` (easy/medium/hard), `reasoning_type` (single_hop/multi_hop/comparison/...), `answer_type`.
- **Refusal** ([`backend/benchmarks/refusal.json`](./backend/benchmarks/refusal.json)) — 14 off-topic Q × 6 categories (coding_request, general_knowledge, weather_news, personal_advice, prompt_injection, unrelated_paper) — verify off-topic guardrail (cosine floor + system prompt) refuse đúng các Q ngoài scope, kể cả EN + VI.

**Evaluators** ([`backend/app/evals/evaluators.py`](./backend/app/evals/evaluators.py)):

| Metric | Type | Logic |
|---|---|---|
| `retrieval_hit_rate` | pure-code | ANY evidence page in citations |
| `retrieval_hit_rate_strict` | pure-code | ALL evidence pages in citations (multi-hop) |
| `citation_accuracy` | pure-code | `evidence.exact_quote[:80]` substring in citation snippet |
| `answer_present` | pure-code | non-trivial response, not refusal text |
| `correctness` | LLM-judge | gpt-4o-mini grader vs `ground_truth` + `acceptable_variants` (exact-phrase fast path) |
| `faithfulness` | LLM-judge | every claim supported by citation snippets |
| `refusal_correctness` | pure-code | refusal pattern match vs `expected_behavior` |

**Run workflow:**

```powershell
$env:LANGSMITH_API_KEY = "lsv2_pt_..."
cd backend

# 1. Upload datasets to LangSmith (re-run sau khi edit JSON, in-place replace)
python -m scripts.upload_benchmark_dataset
python -m scripts.upload_refusal_dataset

# 2. Run evals (per commit / per change)
python -m scripts.run_qa_eval --concurrency 4
python -m scripts.run_refusal_eval --concurrency 4

# 3. Periodic cleanup (benchmark user's chat history accumulates across runs)
python -m scripts.cleanup_benchmark_user --dry-run    # check first
python -m scripts.cleanup_benchmark_user              # delete
```

Mỗi run upload experiment với prefix `chat-qa-<git-sha>` / `chat-refusal-<git-sha>` → dashboard ở [smith.langchain.com](https://smith.langchain.com), so điểm side-by-side giữa các commit. Cost ~$0.10 / 40-Q QA run với gpt-4o-mini judge. Schema spec: [`backend/benchmarks/SCHEMA.md`](./backend/benchmarks/SCHEMA.md).

![QA benchmark dashboard](./public/benmark_result_1.png)

> *QA dataset (`scholarai-chat-qa`) trên LangSmith: feedback per metric (answer_present · citation_accuracy · correctness · faithfulness · retrieval_hit_rate), latency P50/P99, token usage và bảng so sánh giữa các experiment run.*

![Refusal benchmark dashboard](./public/benmark_result_2.png)

> *Refusal dataset (`scholarai-chat-refusal`): `refusal_correctness` cho off-topic guardrail (≈1.0 ⇒ refuse đúng), kèm latency và error-rate qua các run.*

**Prereq**: 1 dedicated `BENCHMARK_USER_ID` (default 1) phải tồn tại trong PG (override qua env). Eval calls hit real `generate_chat_response` để measure production pipeline — message turns được persist vào `chat_messages` table dưới user này; cleanup script truncate khi cần.

---

## Team

- **Nguyen Manh Tu** — Backend, Web development
- **Lai Duc Anh** — Data Science, RAG
- **Nguyen Thi Thu Hien** — AI, Data processing

---

## Documentation

- [JOURNAL.md](./JOURNAL.md) — Weekly journal, cập nhật mỗi cuối tuần trước khi tạo PR
- [WORKLOG.md](./WORKLOG.md) — Technical decisions, task assignments, brainstorming
- [AGENTS.md](./AGENTS.md) — Rules for AI coding agents
- [`docs/feature/`](./docs/feature/) — Per-feature design specs (chat, RAG, uploads, projects, admin, OAuth, quotas)

---

## AI Logging

Prompts và tool calls được **tự động log** khi sử dụng AI tool (Claude Code, Cursor, Codex, Gemini, Copilot). Chỉ cần chạy `bash scripts/setup_hooks.sh` một lần. Xem [AGENTS.md](./AGENTS.md) để biết thêm chi tiết.
