# Part 05 — ScholarAI evidence + backend archive

> **Status:** Checkpoints 05A–05D approved; 05E is in review
> **Branch:** `redesign/portfolio-v2`
> **Planned review artifact:** `/vi/v2?intro=0#work`, `/en/v2?intro=0#work`, and deterministic `?work=` states listed below
> **Internal direction name:** **Evidence Relay** — not rendered as marketing copy

## Decision summary

Part 05 will not repeat the V1 two-card grid and will not give the two remaining
projects equal visual weight. Owner evidence establishes a clear hierarchy:
ScholarAI is a current solo AI-engineering proof; Financial Planning is a
historic capstone and backend-lead archive. The page should express that truth
instead of forcing both projects into one symmetric selector:

```text
VCareer flagship proof
        │
        └── evidence relay enters Part 05
              │
              ├── ScholarAI — dominant supporting case
              │     retrieval → grounding → evaluation
              │
              └── relay compresses into an archive topology
                    API → Web → Worker
                    Financial Planning — backend foundation
```

- **VCareer remains the flagship.** It keeps the long-form narrative, live
  product, architecture report, pilot proof, and case-study action from Part 04.
- **ScholarAI is the primary Part 05 proof.** Tu confirms it is a solo project
  and that he designed and implemented the product end to end. The section
  should make hybrid retrieval, grounded answers, and the evaluation harness
  legible before listing technologies.
- **Financial Planning is a low-priority archive record.** Tu led its backend
  as a capstone built before AI-assisted coding. It receives a compact system
  topology and source archive, not an equal sticky plateau or enlarged gallery.
- **WonderLens is not duplicated here.** Its Track 1 win and hackathon story
  remain evidence for Part 06 Experience + Awards unless the owner explicitly
  changes that hierarchy.

The result should feel like one evidence relay: current AI work first, then the
earlier backend foundation that made it possible. It is not a project-ranking
carousel and not two unrelated landing pages.

## Repository evidence audit

### What is already usable

| Project            | Repository evidence                                                                                                                                                                                                                                                                                            | Media available                                                                                                                                                                                                   | Current public destination                                                                                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ScholarAI          | Tu confirms this is a solo project and that he built the current product end to end. Public source independently exposes FastAPI, Next.js, Qdrant dense + BM25 RRF, hierarchical RAG, clickable citations, authentication/quotas, PDF workflows, and a LangSmith evaluation harness.                           | Seven screenshots, 1,903,192 source bytes. Images are 1332–1844px wide and include discovery, grounded chat, workspace/notes, and separate QA/refusal benchmark runs.                                             | `https://github.com/TuNM17421/ScholarAI` resolves publicly and lists no homepage. The product was shown to other learners for hands-on testing, but no user-test count or survey dataset was retained.                                  |
| Financial Planning | Source audit confirms a Java 17/Spring Boot API, React 18/Vite client, SQL Server driver, Redis-backed token/OTP/user-authority state, Excel import/export, and a separate Spring worker for annual-report and term schedules. Tu confirms it was a capstone and he led the backend before AI-assisted coding. | Fourteen screenshots, 590,542 source bytes. Images are only 582–752px wide. The dashboard/report frames are usable as small archive thumbnails; list views expose demo names and must not become oversized proof. | Three public repositories now resolve: `fin-planning-backend`, `fin-planning-frontend`, and `fin-planning-worker`. There is no live demo or preserved runtime dataset, so they are labeled source archive rather than runnable product. |

### Truth boundary before implementation

The owner confirms the repository's `WORKLOG.md` is fabricated/stale and is not
a valid authorship source. A full reachable-history audit supports the solo
claim more directly:

- all 5 reachable commits use Tu's `tunm17421@gmail.com` identity;
- all 4 non-merge commits and the GitHub merge commit resolve to that identity;
- blame across 42,542 current `.py`, `.ts`, `.tsx`, `.js`, `.jsx`, and `.css`
  lines resolves to that identity;
- no other human author or co-author appears in reachable history. One docs-only
  commit contains a `Co-Authored-By` trailer for Claude Opus.

The first commit imports most of the repository in one snapshot, so Git cannot
independently reconstruct effort before that import. The portfolio therefore
uses the factual label `Solo project · End-to-end engineering`, not a numeric
“99% contribution” claim. The stale worklog should be corrected or removed in
the ScholarAI repository before final public release, but it no longer blocks
05A implementation.

The project period is also intentionally omitted from 05A copy until the owner
chooses the public timeline. Git timestamps are not treated as product dates.

The following current screenshot content is also not portfolio proof unless
separately verified:

- marketing numbers on the ScholarAI landing screen;
- quota values, paper counts, or citation counts shown inside a captured demo
  state;
- QA/refusal values may appear inside the approved benchmark screenshots as
  test artifacts, but they are not converted into a headline improvement claim
  without an authoritative aggregate and dataset description;
- expense totals, departments, users, names, or approval counts shown inside
  Financial Planning;
- any improvement percentage, production adoption, or business impact not
  explicitly supplied by the owner. ScholarAI may say learners tried the
  product, but it must not invent a test count, retention, or outcome.

## Reference evidence

References transfer structure and behavior only. Do not copy branding, product
imagery, proprietary text, palette, typography, or exact layout.

| Reference                                                                                                                                                                                             | Structural decision worth transferring                                                                                                                                                        | Why it fits Part 05                                                                                                                     | Do not copy                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [UIZZE · Zellerfeld capture](https://singapore.objective.company/design-media/5b/5b601f7677593817a37752922ba6f381043e3c21836e31f6a904d0fcb2941a65.webp) · [live site](https://www.zellerfeld.com/)    | One dominant media field, a compact ranked rail, and contextual information that changes without duplicating the whole composition.                                                           | ScholarAI needs one dominant evidence viewport with a legible active-system state.                                                      | E-commerce chrome, lifestyle photography, product claims, rounded buy card, or Zellerfeld's palette.                                 |
| [UIZZE · Bécane capture](https://singapore.objective.company/design-media/b1/b1a0e59213caa0615c87b25c7871f19d3e11aa22112eac1ea5d9a2204fe6e89e.webp) · [live collection](https://www.becaneparis.com/) | Sparse catalogue plane with a visible collection count and objects treated as an index rather than decorated cards.                                                                           | Financial Planning can read as a compact source archive without pretending to be a current live product.                                | Fashion silhouettes, extreme emptiness, commerce controls, or tiny illegible objects.                                                |
| [UIZZE · 099 SUPPLY capture](https://singapore.objective.company/design-media/c4/c455441505aa7c6a32d953222c0703a9068bb3688bb3eb527b6502931b95cbca.webp) · [live catalogue](https://099.supply/)       | Stable item IDs, terse metadata, and consistent preview affordances make a dense catalogue scannable.                                                                                         | ScholarAI evidence labels and Financial's three repository nodes need stable names and concise metadata.                                | The marketplace grid, mockup imagery, monochrome branding, or its number of tiles.                                                   |
| [Swaraj Portfolio '25](https://portfolio-25-phi.vercel.app/?ref=save.design)                                                                                                                          | A persistent project scene changes from a compact project selector and hands off to a deeper project view. Desktop uses a large shared visual field; compact mode keeps a direct linear path. | This is the accepted overall migration reference and confirms that supporting work can share one scene instead of becoming equal cards. | Portrait imagery, condensed font, exact thumbnail rail, tiny mobile previews, inaccessible empty alt text, or its content hierarchy. |

Motion implementation should follow the current official Motion APIs already
used by V2:

- `useScroll` and `useTransform` for reversible scroll-linked progress;
- keyed `AnimatePresence` with deliberate sequencing for preview changes;
- transform-based layout motion only where it does not stretch screenshot text;
- `useReducedMotion` or the existing live preference hook to replace spatial
  movement with static content or a short opacity change.

## Design contract

| Field                   | Decision                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Screen job              | Prove that Tu can build and evaluate an end-to-end AI research product, then connect that work to an earlier backend foundation without diluting the flagship VCareer story.                                                                                                                                                                                   |
| Primary user and action | A recruiter or engineering manager inspects ScholarAI's retrieval, grounding, and evaluation evidence, opens its source, then optionally traces Financial Planning across API, Web, and Worker archives.                                                                                                                                                       |
| Content hierarchy       | 1. Compact Part 05 rail. 2. ScholarAI problem and end-to-end solo scope. 3. ScholarAI product/evaluation evidence and source. 4. Financial Planning backend-lead archive. 5. Three repository nodes and one compact interface record. ScholarAI receives roughly 75–85% of the visual/time budget.                                                             |
| Navigation and controls | Desktop scroll moves through three ScholarAI evidence plateaus. The evaluation plateau exposes explicit QA/Refusal controls. Financial Planning uses a non-sticky, reversible archive topology with three real repository links; it has no project switcher, gallery carousel, or fake live action.                                                            |
| Visual language         | Mineral-light chapter after the dark VCareer flagship. Anybody display type, Be Vietnam Pro body, IBM Plex Mono evidence labels, square media framing, hairline rails, deep ink, and existing cyan/warm signals. Product screenshots keep their real colors and are not filtered into brand art.                                                               |
| Signature motion        | The VCareer lime relay crosses the chapter boundary as one line and expands into the ScholarAI retrieval/grounding/evaluation rail. Financial Planning begins from one cyan shared-domain hub: its ledger opens from the center, then three synchronized drops contact API, Web, and Worker. It never becomes two equal project lanes.                         |
| Required states         | ScholarAI Retrieve, Ground, Evaluate-QA, Evaluate-Refusal, image loading/error, Financial archive, public-source link, static, compact, no-JavaScript, and live reduced-motion preference changes.                                                                                                                                                             |
| Responsive behavior     | At 1024px and above, only ScholarAI receives a sticky evidence stage. Financial Planning follows as a compact non-sticky archive. At 320–1023px both become deliberate linear chapters; all evidence names and repository actions remain visible without hover.                                                                                                |
| Evidence used           | The four references above; current Part 01–04 motion language; `src/data/projects.ts`; 21 local screenshots; full reachable Git history/blame for ScholarAI; the three public Financial Planning repositories; and owner-confirmed scope/context.                                                                                                              |
| Forbidden defaults      | Equal project cards or equal dwell time, horizontal-scroll hijacking, generic bento grids, autoplay carousels, a 14-image Financial gallery, tiny thumbnail-only mobile UI, tech-chip walls, hover-only copy, invented user metrics, a live-demo CTA for an archived system, stretched screenshots, or a second VCareer-length case study.                     |
| Acceptance criteria     | ScholarAI is unmistakably the dominant Part 05 proof; its three evidence jobs are understood without opening source; Financial Planning reads as backend provenance rather than a current product claim; all controls and links are real; VI/EN and reverse scroll work; no-JS/reduced-motion preserve content; and Part 05 does not affect Hero LCP requests. |

## Proposed content architecture

### Chapter rail

| Element | VI                               | EN                                |
| ------- | -------------------------------- | --------------------------------- |
| Eyebrow | `05 / HỆ THỐNG & BẰNG CHỨNG`     | `05 / SYSTEMS & EVIDENCE`         |
| Axis    | `AI HIỆN TẠI → NỀN TẢNG BACKEND` | `CURRENT AI → BACKEND FOUNDATION` |

The approved revision removes the large standalone chapter opener and its
framing paragraph. The compact rail now hands off directly to ScholarAI,
reducing scroll length without presenting Financial Planning as an equal
project choice.

### Project 01 — ScholarAI

Owner-verified positioning:

- `Solo product · End-to-end engineering`;
- Tu designed and implemented the current frontend, backend, retrieval/RAG,
  citations, product workflows, authentication/quotas, and evaluation harness;
- other learners tried the product, but no retained user-test count or outcome
  dataset exists, so the page uses qualitative testing context only.

Provisional evidence job:

```text
RETRIEVE  → semantic-search.png
GROUND    → chat.png
EVALUATE  → benchmark-1.png (QA) / benchmark-2.png (refusal)
```

- The initial frame is semantic search because it exposes the dense/BM25/RRF
  product surface rather than generic landing-page marketing.
- The second frame shows the PDF, citations, and chat together, making grounding
  visible without a paragraph of RAG terminology.
- The third plateau shows the real LangSmith evaluation surface. `QA` and
  `Refusal` are explicit user-controlled views; their screenshot values remain
  test artifacts rather than a marketing improvement claim.
- The verified action is `View source` / `Xem source` to the public repository.
- `landing.png` is excluded from the first implementation because it contains
  unverified marketing numbers and is weaker proof than the product screens.

### Archive record — Financial Planning

Owner-verified positioning:

- `Capstone archive · Backend lead · Built before AI-assisted coding`;
- the product is not presented as currently deployed or reproducible;
- its value is the backend/system boundary: API, authentication/state, finance
  workflows, reporting, and scheduled processing.

The archive topology is the main visual evidence:

```text
API                         WEB                    WORKER
Spring Boot · SQL Server    React · Vite           Spring scheduled jobs
Redis auth/state            Workflow interface     Term + annual reports
       ↘________________ shared financial domain ________________↙
```

- Link `API source` to `https://github.com/TuNM17421/fin-planning-backend`.
- Link `Web source` to `https://github.com/TuNM17421/fin-planning-frontend`.
- Link `Worker source` to `https://github.com/TuNM17421/fin-planning-worker`.
- Use `dashboard.png` and `financial_report.png` only as a compact contact
  sheet at or near native size. Do not use `list_expenses.png` in the homepage
  because it exposes demo user/supplier names and adds little architectural
  proof.
- Public status copy is `Source archive · No live demo`, not “broken,” “private,”
  or “coming soon.” No dependency setup is attempted for the portfolio.

### Technology context

ScholarAI gets one terse monospace line of at most five decision-relevant
technologies. Financial Planning's stack is encoded by the three topology nodes
rather than duplicated as a chip list:

- ScholarAI: `FastAPI · Qdrant RRF · PostgreSQL · OpenAI · LangSmith`;
- Financial archive: `Java 17 / Spring Boot`, `React / Vite`, `SQL Server / Redis`,
  and `scheduled worker` attached to the relevant node.

Technology never replaces personal scope or outcome evidence.

## Interaction and motion sequence

### Entry from VCareer

1. The final VCareer outcome/action block remains readable on the existing dark
   canvas; Part 05 must not begin rising behind it early.
2. When the Part 05 boundary reaches the header rail, the VCareer signal exits
   the dark field as one continuous evidence relay. It does not fork into equal
   project lanes.
3. The mineral Part 05 plane then replaces the dark canvas as a solid chapter
   cut. Header foreground, glass surface, border, and accent switch together so
   no low-contrast interpolated state is possible.
4. Reverse scrolling plays the same geometry backward and restores the exact
   VCareer tone without stale inline styles.

This handoff is isolated in checkpoint 05B because the previous transitions
showed that seam height and line placement need live visual approval.

05B implements that contract with one shared signal axis aligned to the V2
system rail. The relay begins only after the sticky VCareer scene has released,
inside a `240–320px` dark transfer bay with no copy. It travels vertically to
the mineral boundary, lands on one blue node, then splits into two visible
signal packets. Each packet stays on the leading edge of its blue branch while
travelling left or right across the seam. This keeps the outgoing CTA and
incoming chapter title completely clear while making the 90-degree fork
legible. The header remains on the VCareer token set until the mineral surface
itself reaches the header rail, then foreground, accent, border, shadow, glass
layer, and the VCareer trace switch as one discrete Work state. The same
scroll-derived values play backward without direction flags.

### Desktop ScholarAI evidence stage

- The chapter uses native vertical scroll; it does not capture the wheel or turn
  the page into a horizontal scroll experience.
- A sticky 100svh ScholarAI stage is driven by approximately 260–300svh of
  section height. Exact height is tuned against real VI/EN copy rather than
  hard-coded before rendering.
- Retrieve, Ground, and Evaluate each receive a broad stable plateau where copy
  and media remain still while the user continues a short scroll. Transitions
  occupy a minority of the progress range.
- The left evidence rail shows the three jobs and current progress. The right
  stage shows one dominant screenshot with a stable caption and source action.
- The Evaluate plateau contains explicit `QA` and `Refusal` controls. Hover and
  focus may preview; click/tap locks the selected benchmark. Continued page
  scroll does not silently overwrite that local selection.
- Preview changes use directional clip and opacity. Screenshot text is never
  scaled, skewed, or rotated while a user is expected to read it.

### Financial archive handoff

- After ScholarAI releases its pin, Financial Planning introduces one cyan hub
  directly below the shared-domain label. Its ledger opens from the center to
  both sides; three vertical signals then fall within the same progress window
  and contact `API`, `Web`, and `Worker` together. The branch represents actual
  repository boundaries, so its geometry carries meaning.
- Financial Planning does not pin. The topology, backend-lead context, two small
  interface records, and three source links are visible in normal document flow.
- The branch draws only while its archive block enters view and reverses on
  upward scroll. There is no looping ambient motion or auto-cycling screenshot.

### Tablet and mobile

- No sticky stage below 1024px. ScholarAI's three evidence jobs render in order;
  Financial Planning follows as a compact source archive.
- At 768–1023px, the ScholarAI label and media may remain two columns when the
  localized copy fits. The Financial topology becomes a two-row grid without
  changing its API/Web/Worker reading order.
- At 320–767px, the ScholarAI title, solo scope, evidence names, one selected
  image, and source action stay visible. Controls are at least 44×44px and show
  text labels, not dots. Financial's nodes become a vertical connected list.
- Images may swipe only if native horizontal movement does not compete with page
  scroll; buttons remain the canonical navigation. No hidden horizontal
  scrollbar is required to discover content.

### Reduced motion and progressive enhancement

- Reduced motion removes the sticky spatial choreography, signal travel, clip
  wipes, and topology draw. ScholarAI evidence and the Financial archive render
  sequentially with either no transition or a short opacity change.
- The blue seam remains visible in reduced-motion mode, but the travelling
  cursor and split packets are hidden.
- A live preference change fully clears active transforms and restores the
  correct layout in both directions.
- With JavaScript disabled, the server-rendered section shows ScholarAI's
  summary, all evidence captions, one QA and one refusal benchmark image, the
  complete Financial archive, and all real source links. No content starts at
  `opacity: 0`.

## Deterministic review controls

The Part 05 parser should preserve the existing V2 query contract and add one
independent `work` control:

| Query                                 | Expected result                                                    |
| ------------------------------------- | ------------------------------------------------------------------ |
| `?intro=0&work=static#work`           | Disable Part 05 pinning and render all evidence sequentially.      |
| `?intro=0&work=retrieve#work`         | Force the desktop ScholarAI Retrieve plateau.                      |
| `?intro=0&work=ground#work`           | Force the desktop ScholarAI Ground plateau.                        |
| `?intro=0&work=evaluate-qa#work`      | Force ScholarAI Evaluate with the QA benchmark.                    |
| `?intro=0&work=evaluate-refusal#work` | Force ScholarAI Evaluate with the refusal benchmark.               |
| `?intro=0&work=finplanning#work`      | Scroll directly to the non-sticky Financial archive.               |
| `?intro=0&work=loading#work`          | Reserve every media surface and expose localized loading feedback. |
| `?intro=0&work=image-error#work`      | Replace media with localized semantic fallbacks.                   |

Locale switching must preserve `intro`, `hold`, `portrait`, `story`,
`showcase`, and `work`.

## Implementation checkpoints

Every checkpoint remains uncommitted until live review is approved. After
approval, it receives one focused commit before the next checkpoint begins.

### 05A — Evidence contract and static foundation

- Add a V2-only supporting-project data contract; do not overload the V1 card
  model with scroll-scene behavior.
- Add localized, owner-verified problem, personal scope, outcome/link state,
  evidence captions, and technology context.
- Render the static mineral chapter with dominant ScholarAI evidence and the
  compact Financial archive topology. No sticky or chapter motion yet.
- Wire the four public source actions and the selected local screenshots, but
  do not add a live-demo action.
- Establish image aspect-ratio reservation, loading/error fallbacks, sequential
  heading order, and `work=static|loading|image-error` review states.

**What to review:** ScholarAI is clearly dominant; the solo/end-to-end wording
is accurate; benchmark screenshots read as test evidence; Financial feels like
useful provenance rather than a weak second case; VI/EN line breaks and archive
media remain sharp enough before motion is added.

### 05B — VCareer → Part 05 handoff and chapter tone

- Add the single VCareer evidence relay and solid dark-to-mineral chapter cut.
- Extend the chapter-tone resolver to Hero → About → VCareer → Work with atomic
  contrast-safe tokens.
- Verify forward/reverse scroll, scrollbar stability, header tone, seam height,
  and exact signal placement at 1024, 1280, and 1440px.
- Keep the Part 05 body static so the transition can be judged in isolation.

**What to review:** the dark VCareer ending remains long enough; the relay does
not cover copy; the mineral surface does not rise early; reverse scrolling has
no flash or jump.

### 05C — Desktop ScholarAI evidence browsing

- Add the sticky three-plateau controller and explicit dwell windows.
- Animate the active Retrieve/Ground/Evaluate rail, copy handoff, and evidence
  viewport using reversible scroll and keyed preview transitions.
- Add the user-controlled QA/Refusal switch inside Evaluate; pointer, focus,
  click/tap, and keyboard behavior must not fight scroll state.
- Add `work=retrieve|ground|evaluate-qa|evaluate-refusal` deterministic states.

The 05C implementation uses one `285svh` native-scroll stage at desktop widths,
with a `100svh` sticky evidence canvas. Retrieve, Ground, and Evaluate retain
separate dwell plateaus; their rail buttons scroll to the center of the chosen
plateau instead of mutating the active state independently from page position.
Evaluate keeps a locally locked QA/Refusal selection across continued scrolling,
while hover/focus can preview and arrow/Home/End keys move between the two real
benchmark views. Below `1024px`, with reduced motion, or in static/image-review
states, the same evidence DOM returns to sequential document flow and clears all
desktop opacity, clip, and transform values.

**What to review:** a short continued scroll does not immediately erase an
evidence job; active state is unmistakable; screenshots remain readable during
motion; benchmark switching is understandable; reverse scroll is equally
deliberate.

### 05D — Financial archive, compact input model, and fallbacks

- Add the API → Web → Worker archive topology and its reversible center-out draw;
  keep the archive itself non-sticky at every width.
- Replace the ScholarAI desktop pin below 1024px with the approved linear
  composition.
- Tune 320, 375, 430, 768, and 1023px without tiny thumbnail rails or a long
  duplicate gallery.
- Graduate the Header `VCareer` item to a real localized `Work` destination now
  that the homepage work index exists; mobile menu copy and numbering update in
  the same checkpoint.
- Complete touch, keyboard, no-JS, image-error, live-resize, and live
  reduced-motion cleanup.

**What to review:** Financial never looks like a broken/current live product;
all four source actions are understandable; every mobile label is readable; no
action depends on hover; Header Work lands at the start of the complete work
story; resize does not retain desktop transforms.

### 05E — Finish gate

- Unit-test parsing, progress segmentation, active-evidence resolution,
  evaluation selection, chapter tone, locale-query preservation, and image/link
  states.
- Run lint, TypeScript, tests, production build, diff checks, and route-size
  comparison against commit `050f023`.
- Test VI/EN at 320×568, 375×812, 430×932, 768×1024, 1023×768, 1024×768,
  1280×720, and 1440×900.
- Audit axe, heading order, contrast, focus order/visibility, 44px targets,
  keyboard behavior, no-JS, reduced motion, live resize, and reverse scroll.
- Measure Lighthouse, CLS, main-thread work, image transfer, console/page
  errors, and external link responses. Part 05 images must remain lazy and must
  not change Hero LCP requests.
- Keep only motion that improves evidence comprehension or makes the
  current-work → backend-foundation relationship clearer.

**What to review:** final whole-page rhythm and any remaining effect that feels
decorative, repetitive, or tiring after the longer VCareer chapter.

### 05E audit record

- The 05D checkpoint is committed at `9fbf3e0`. The 05E fixes remain
  uncommitted for live review.
- `106/106` unit tests, lint, TypeScript, production build, and diff checks
  pass. The V2 route moved from `73.4 kB / 184 kB` at `050f023` to
  `79.4 kB / 191 kB` after Part 05.
- VI and EN pass at `320×568`, `375×812`, `430×932`, `768×1024`,
  `1023×768`, `1024×768`, `1280×720`, and `1440×900` with no horizontal
  document overflow or sub-44px Part 05 controls.
- The finish gate fixed two blockers: low-contrast inactive evidence metadata,
  and intrinsic benchmark width that clipped the Refusal control and evidence
  frame below `430px`. The benchmark tabpanel is now programmatically labelled
  by its active tab.
- Axe reports no Part 05 violations after the layered background is isolated;
  Lighthouse Accessibility, Best Practices, and SEO each score `100`. Heading
  order, roving-tab keyboard behavior, visible focus, deterministic anchors,
  image-error fallbacks, and locale-query preservation pass.
- No-JavaScript mode exposes six evidence images/captions and all four source
  links. Live reduced-motion changes, `768↔1440` resize, and reverse scroll
  restore the same static or scroll-linked state without stale transforms.
- Fresh-load observation records `CLS 0`, the Hero portrait as LCP, one `50ms`
  long task, and zero initial ScholarAI/Financial image requests. Reviewing all
  six Part 05 images transfers about `155 kB`; all remain lazy.
- Lighthouse mobile runs score `79–80 / 100 / 100 / 100` with throttled LCP at
  `4.8–5.0s`, while desktop scores `99 / 100 / 100 / 100` with LCP `1.0s`.
  The LCP request remains eager, high priority, and discoverable; Part 05 does
  not change the approved Hero source or request.
- Full-page interaction sweeps produce no console errors, page errors, failed
  requests, or `4xx/5xx` responses. ScholarAI and all three Financial Planning
  repository links resolve with HTTP `200`.

## Planned code boundary

```text
messages/vi.json
messages/en.json
src/app/[locale]/v2/page.tsx
src/components/v2/portfolio-v2-shell.tsx
src/components/v2/site-header-v2.tsx
src/components/v2/site-header-v2.module.css
src/components/v2/chapter-tone.tsx
src/components/v2/work/*
src/lib/v2/chapter-tone.ts
src/lib/v2/supporting-work.ts
src/lib/v2/*.test.ts
design-system/v2/README.md
design-system/v2/part-05-supporting-projects.md
```

Part 05 should not modify the V1 homepage project grid or the VCareer case-study
route. A future Part 08 may align the case-study page with V2.

## Owner evidence resolution

### Resolved and safe for 05A drafting

- ScholarAI's current implementation scope is owner-confirmed as end-to-end and
  solo.
- The product was demonstrated to and tried by other learners. No test count or
  retained feedback dataset exists, so the portfolio will not publish an
  adoption or user-outcome metric.
- The two existing LangSmith screenshots are real benchmark artifacts. They may
  label QA/refusal evaluation, but their per-run values will not become an
  aggregate marketing statistic.
- Financial Planning is a capstone where Tu led backend engineering before
  AI-assisted coding.
- Direct source audit confirms the API/Web/Worker repository boundaries, stack,
  Redis auth/state use, reporting workflows, and scheduled worker.
- All three Financial repositories are public and return HTTP 200. They may be
  linked as source archives; no live deployment or reproducible dataset is
  claimed.
- Financial Planning is intentionally low priority. The homepage uses two small
  generic interface records, not its low-resolution data tables or a full case
  study.

### Git authorship audit resolved

The public reachable history contains five commits, all under Tu's email. The
current source-line blame audit also attributes all 42,542 inspected code lines
to the same identity. This is sufficient, together with owner confirmation, to
use `Solo project · End-to-end engineering` in 05A.

Do not publish “99% of code” as a portfolio metric. The repository's initial
79,053-line import makes that percentage impossible to independently derive as
an effort measure, while the exact scope and source evidence are stronger and
less likely to invite an unhelpful methodology debate.

The fake/stale `WORKLOG.md` remains an external repository-cleanup item. It is
excluded from Part 05 evidence and should be corrected or removed before the
portfolio's final public release.

Dates are optional in Part 05. ScholarAI and Financial Planning can ship without
a displayed period rather than infer one from commits. A live URL is also not
required; public source is a complete, honest action state.
