# Part 04 — VCareer flagship proof

> **Status:** Checkpoints 04A–04C approved; checkpoint 04D implemented for live review
> **Branch:** `redesign/portfolio-v2`
> **Planned review artifact:** `/vi/v2?intro=0#vcareer`, `/en/v2?intro=0#vcareer`, `?showcase=static`, `?showcase=loading`, and `?showcase=image-error`
> **Internal direction name:** **Evidence Relay** — not rendered as marketing copy

## Objective

Turn VCareer from a Hero link into the first substantial proof that Nguyen Manh
Tu builds real production-facing AI systems. A recruiter or engineering manager
should leave the section knowing:

1. what problem VCareer connects across CV preparation, job criteria, and live
   AI interview practice;
2. what Tu directly owned: the LiveKit/WebRTC baseline, deeper CV analysis and
   CV-to-JD matching, and JD Builder;
3. which outcomes are verified: 150+ real pilot learners, qualitative survey
   feedback about confidence, and expert review of CV scoring;
4. which screenshots describe the wider team product rather than Tu's direct
   ownership;
5. where to inspect the full case study, live product, and architecture report.

The visual experience may be cinematic and motion-heavy. It must not turn demo
data inside screenshots into portfolio metrics or imply ownership of the whole
system.

## Scope boundary

Part 04 adds one V2 homepage chapter immediately after About.

- It does **not** redesign `/[locale]/projects/vcareer`; Part 08 owns the visual
  migration of that route and the eventual homepage-to-case-study transition.
- The current Header and Hero VCareer links continue to open the real localized
  case-study route.
- V1 homepage and V1 case study remain unchanged.
- Supporting projects remain Part 05.
- The section may use the six approved screenshots, but the original files
  remain untouched and continue to be the evidence source.

This boundary means the Part 04 CTA will still enter the current V1-styled case
study until Part 08 is approved. That temporary visual mismatch is explicit,
not an accidental unfinished transition.

## Source-of-truth audit

| Evidence                    | Public use in Part 04                                                                                                      | Boundary                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `150+` real VinUni learners | Verified pilot proof                                                                                                       | Do not combine with production placeholder counts.                                  |
| Survey feedback             | `Higher confidence reported` / `phản hồi tự tin hơn`                                                                       | Qualitative only; no placement uplift or percentage.                                |
| Product Owner review        | CV evaluation/scoring was reviewed by VinUni Career Services' Product Owner                                                | No quantified accuracy or formal validation claim.                                  |
| Direct scope                | LiveKit/WebRTC baseline; CV analysis and CV-to-JD matching; JD Builder                                                     | Do not imply ownership of every screenshot or architecture component.               |
| Delivery                    | Four-person team; six weeks from discovery in 05/2026 to pilot-ready product                                               | VCareer was not built during the 24-hour event.                                     |
| Recognition                 | Track 4, 2nd Prize, `$5,000` OpenAI API credits                                                                            | Not `$10,000`; WonderLens Track 1 remains separate.                                 |
| Current status              | Product live; further development pending university funding                                                               | Mentor booking, progress tracking, and Career Services job matching remain roadmap. |
| Repository                  | Private under the university source-ownership contract                                                                     | Text state only; never a disabled or fake repo button.                              |
| Public links                | [Live product](https://topportfolio-sage.vercel.app/) and [architecture report](https://vcareea-architecture.lovable.app/) | Architecture report is team-wide context, not proof of Tu owning every node.        |

The public production landing page currently displays marketing/demo numbers
such as `2,000+`, `1,080+`, and `4.9★`. Those values, along with numeric values
visible inside product screenshots, are interface/demo data—not portfolio
outcomes. Part 04 uses only the verified ledger above as evidence.

The architecture report is useful for understanding the direct browser-to-
LiveKit realtime path, ephemeral access, wider application layer, and current
Vercel/AWS context. Where it differs from the user's verified shipped-versus-
roadmap boundary, the verified portfolio contract remains authoritative.

## Research evidence

UIZZE's Web catalogue was inspected on 12 August 2026. References were selected
for hierarchy, media choreography, and product behavior—not their palettes.

| Source                                                                                                                                                                                       | Decision worth transferring                                                                | Why it fits                                                                                                            | Do not copy                                                                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Wispr Flow — UIZZE capture](https://singapore.objective.company/design-media/40/40f315ba87e1cca57c609048f685af89d6e6a15290934e750d3ef02c2b25dd4b.webp) · [live site](https://wisprflow.ai/) | A real voice signal becomes the visual connector between proposition and product behavior. | VCareer has an actual realtime voice/WebRTC path; the signal can encode that system rather than decorate it.           | Cream/serif identity, exact waveform, circular copy, or macOS CTA.                          |
| [Framer — UIZZE capture](https://singapore.objective.company/design-media/01/01c6ebf7ad11cc67fe7165ef78cdac04b2153412de52c9ea2d95df602509cdd3.webp)                                          | Shipped work appears immediately after the proposition with a strong chapter break.        | Part 04 follows the About philosophy and answers it with shipped evidence.                                             | Black-void minimalism, exact headline treatment, or its site grid.                          |
| [Cosmos — UIZZE capture](https://singapore.objective.company/design-media/1b/1b37b6af6a39e3065efe24bedde456f810a714f7c2a340dacdd643ab37924259.webp)                                          | Media can occupy depth around one stable thesis instead of sitting in equal cards.         | Six VCareer screens deserve a spatial stage with one active proof plane.                                               | Random floating thumbnails, soft lifestyle identity, or unordered orbit motion.             |
| [Dylan Brouwer — UIZZE capture](https://singapore.objective.company/design-media/e3/e384ab8122d78f72aee5b0119f87f916bafef2cffcd4e70eb2e63b5b608bd7a3.webp)                                   | One dominant object and type composition carry the viewport.                               | The current screen, ownership label, and workflow step should stay legible instead of competing with a thumbnail wall. | Monitor object, grayscale palette, wording, or centered composition.                        |
| [Swaraj Portfolio '25](https://portfolio-25-phi.vercel.app/?ref=save.design)                                                                                                                 | A project can open as a full-screen state rather than another page card.                   | The user selected this as the overall ambition reference; Part 04 should feel like a chapter change.                   | Its mini-thumbnail rail, exact overlay, background footage, typography, or project content. |

Technical transfer:

- [Motion scroll animations](https://motion.dev/docs/react-scroll-animations):
  track the section itself with `useScroll`, map progress with `useTransform`,
  and keep the story reversible. Motion's documented sticky horizontal example
  confirms the tall-section + sticky-stage structure, but Part 04 uses a
  vertical evidence relay rather than generic horizontal scrolling.
- [Motion reduced motion](https://motion.dev/docs/react-use-reduced-motion):
  remove parallax, spatial transforms, and pinning; retain the complete story
  in normal flow and use opacity only when useful.
- [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image):
  provide accurate `sizes`, explicit aspect ratios, lazy loading, and a stable
  placeholder so the six large product screenshots do not introduce CLS or
  download viewport-sized sources unnecessarily.

## Rejected generic directions

The initial obvious solutions were rejected during the research pass:

- a three-stat row followed by a screenshot card grid;
- a laptop/browser mockup carousel;
- six screenshots floating randomly in 3D;
- a neon architecture dashboard with invented packets and metrics;
- one long technology-chip wall;
- a generic `Problem / Solution / Result` card trio.

Each could be reused for an unrelated SaaS portfolio. None makes Tu's ownership
boundary or VCareer's connected workflow easier to understand.

## Visual direction — Evidence Relay

### Signature

The signal spine from About reaches its terminal, changes from focus cyan to
VCareer's sampled signal lime, and bends into a product path. A deep product
field rises from below the mineral About sheet. Inside a sticky viewport, one
real VCareer screen is in focus while the previous screen recedes into system
depth and the next one approaches along the trace.

The order is the product story:

```text
Landing → CV Builder → CV / JD Match → Live Interview → Review → Dashboard
             └──────── Tu: CV/JD intelligence ────────┘
                                       └─ Tu: LiveKit/WebRTC baseline

JD Builder — direct-scope system node; no screenshot is fabricated
```

`JD Builder` appears as a precise ownership node in the rail because there is
no approved screenshot for it. The design must not attach a different screen
to that claim merely to fill the stage.

The sequence is not an autoplay carousel. Scroll position controls it in both
directions, and every screenshot remains a semantic figure in source order.

### Palette

The VCareer accents are sampled from the approved product screens and combined
with the accepted V2 system:

| Token            | Hex       | Use                                                      |
| ---------------- | --------- | -------------------------------------------------------- |
| Night field      | `#071219` | Product chapter background and Header state              |
| Mineral text     | `#EDF4F5` | Primary text over the night field                        |
| VCareer blue     | `#0060F0` | Active workflow label and verified external links        |
| Signal lime      | `#A8F03C` | Trace, active node, and non-text motion signal           |
| Product sky      | `#C0D8F0` | Screenshot loading/error plane and quiet product context |
| Deep product ink | `#0B2738` | Text on lime/sky and static compact surfaces             |

Measured critical pairs are `4.80:1` for VCareer blue on mineral, `13.69:1`
for night ink on signal lime, `12.91:1` for night ink on product sky, and
`17:1` for mineral on night.

Signal lime never becomes small text on a light screenshot. It is a structural
trace or carries night ink.

### Typography

- `Anybody` renders `VCareer`, the transition statement, and the final case-
  study action.
- `Be Vietnam Pro` renders problem, ownership, and outcome copy.
- `IBM Plex Mono` renders step identity, `DIRECT SCOPE` / `PRODUCT CONTEXT`,
  their Vietnamese equivalents `PHẠM VI TRỰC TIẾP` / `BỐI CẢNH SẢN PHẨM`,
  dates, link state, and screenshot disclaimer.
- No new font is introduced in Part 04.

### Desktop composition

The hierarchy sketch below uses the English locale only to keep the spatial
diagram compact. It is not shared copy; every label is localized through the
canonical VI/EN content contract below.

```text
04 / FLAGSHIP PROOF                         LIVE · DEVELOPMENT PENDING FUNDING
─────────────────────────────────────────────────────────────────────────────

VCareer                         [PRODUCT WORKFLOW 02 / 06]
AI career development platform

┌───────────────┐               ┌───────────────────────────────────────────┐
│ 01  LANDING   │               │                                           │
│ 02  CV        │━━ signal ━━━▶ │        ACTIVE PRODUCT SCREEN              │
│ 03  MATCH     │               │                                           │
│ 04  INTERVIEW │               └───────────────────────────────────────────┘
│ 05  REVIEW    │                       DIRECT SCOPE / PRODUCT CONTEXT
│ 06  DASHBOARD │                       precise caption + ownership note
└───────────────┘

TU DIRECTLY OWNED
LiveKit/WebRTC baseline · CV analysis + CV/JD matching · JD Builder

PILOT / 150+ REAL LEARNERS
Survey: higher confidence reported · CV scoring reviewed by Career Services PO

                                 [VIEW THE FULL CASE STUDY ↗]
                         LIVE PRODUCT · ARCHITECTURE · PRIVATE SOURCE STATUS
```

The screenshot is not placed inside a fake laptop. Its own interface is the
object. A thin product-sky edge and stage number provide orientation without
turning it into a dashboard card.

### Compact composition

This hierarchy sketch likewise shows the English locale. Vietnamese never
falls back to these strings.

```text
04 / FLAGSHIP PROOF
VCareer
short product statement

PILOT / 150+ REAL LEARNERS

TU DIRECTLY OWNED
01 LiveKit/WebRTC baseline
02 CV analysis + CV/JD matching
03 JD Builder

01 / 06  PRODUCT CONTEXT
[landing screenshot]
caption

02 / 06  DIRECT SCOPE
[CV screenshot]
caption
...

[verified outcome ledger]
[VIEW THE FULL CASE STUDY]
```

Mobile keeps all six figures but gives the four central workflow screens more
space. Landing and Dashboard act as smaller bookends. It does not replace the
story with a swipe-only carousel.

## Canonical visible content

The existing VCareer case-study translations remain the factual source. Part
04 adds an edited homepage-length namespace rather than copying long sections.

### Vietnamese

- Eyebrow: `04 / BẰNG CHỨNG CHỦ LỰC`
- Title: `VCareer`
- Subtitle: `Nền tảng phát triển sự nghiệp ứng dụng AI`
- Proposition: `Kết nối CV, tiêu chí tuyển dụng và phỏng vấn AI theo thời gian thực trong
một luồng luyện tập có thể hành động.`
- Pilot line: `150+ học viên thật đã trải nghiệm trong đợt thử nghiệm tại VinUni.`
- Scope label: `Phần mình trực tiếp phụ trách`
- Scope items:
  - `Hạ tầng LiveKit + WebRTC cơ bản`
  - `Phân tích CV và khớp CV–JD`
  - `JD Builder`
- Outcome label: `Bằng chứng đã xác minh`
- Outcome items:
  - `Khảo sát ghi nhận phản hồi tự tin hơn`
  - `Hệ thống chấm điểm CV được Product Owner phòng Hướng nghiệp VinUni thẩm định`
  - `Á quân Track 4 · 5.000 USD tín dụng API OpenAI`
- Screenshot disclaimer: `Ảnh giao diện sản phẩm · số liệu hiển thị bên trong
không được dùng làm bằng chứng định lượng.`
- Status: `Sản phẩm đang hoạt động · phát triển tiếp đang chờ kinh phí từ nhà trường`
- Primary action: `Xem chi tiết dự án`
- Utilities: `Mở sản phẩm` · `Đọc báo cáo kiến trúc`
- Repository state: `Mã nguồn riêng tư · thuộc sở hữu theo hợp đồng với nhà trường`

### English

- Eyebrow: `04 / FLAGSHIP PROOF`
- Title: `VCareer`
- Subtitle: `AI Career Development Platform`
- Proposition: `Connecting CV preparation, job criteria, and realtime AI
interviews in one actionable practice workflow.`
- Pilot line: `Tested by 150+ real learners in the VinUni pilot.`
- Scope label: `What Tu directly owned`
- Scope items:
  - `LiveKit + WebRTC baseline`
  - `CV analysis and CV-to-JD matching`
  - `JD Builder`
- Outcome label: `Verified evidence`
- Outcome items:
  - `Survey feedback reported higher confidence`
  - `CV scoring reviewed by VinUni Career Services' Product Owner`
  - `Track 4 2nd Prize · $5,000 in OpenAI API credits`
- Screenshot disclaimer: `Product interface snapshot · values shown inside
are not used as portfolio metrics.`
- Status: `Product live · further development pending university funding`
- Primary action: `View the full case study`
- Utilities: `Open live product` · `Read architecture report`
- Repository state: `Private source · university-owned under contract`

## Evidence classification

The implementation localizes the classification itself, not only its caption:

| Meaning                  | Vietnamese          | English           |
| ------------------------ | ------------------- | ----------------- |
| Direct ownership         | `PHẠM VI TRỰC TIẾP` | `DIRECT SCOPE`    |
| Wider team product       | `BỐI CẢNH SẢN PHẨM` | `PRODUCT CONTEXT` |
| Analysis-layer qualifier | `LỚP PHÂN TÍCH`     | `ANALYSIS LAYER`  |
| Baseline qualifier       | `HẠ TẦNG CƠ BẢN`    | `BASELINE`        |

Screen names are localized as a second independent namespace:

| Stage | Vietnamese             | English             |
| ----- | ---------------------- | ------------------- |
| 01    | `Trang giới thiệu`     | `Landing`           |
| 02    | `Trình tạo CV`         | `CV Builder`        |
| 03    | `Khớp CV với việc làm` | `CV / job matching` |
| 04    | `Phỏng vấn trực tiếp`  | `Live interview`    |
| 05    | `Đánh giá phỏng vấn`   | `Interview review`  |
| 06    | `Bảng điều khiển`      | `Dashboard`         |

| Stage | Screen            | Visible classification            | Claim it supports                                                                               |
| ----- | ----------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| 01    | Landing           | Wider team product                | VCareer proposition and entry point only; no displayed number becomes evidence.                 |
| 02    | CV Builder        | Direct ownership · analysis layer | The CV analysis/scoring layer shown inside the builder; not ownership of the entire builder UI. |
| 03    | CV / job matching | Direct ownership                  | CV-to-JD matching and actionable gap analysis.                                                  |
| 04    | Live interview    | Direct ownership · baseline       | LiveKit/WebRTC foundation; the wider interview experience is team context.                      |
| 05    | Interview review  | Wider team product                | Learner feedback loop; no ownership of all scoring components is implied.                       |
| 06    | Dashboard         | Wider team product                | Wider learner journey and pilot-ready system.                                                   |

## Motion choreography

Desktop `>=1024px` uses a `560svh` wrapper with a sticky `100svh` scene.
One local `scrollYProgress` drives the complete reversible journey:

| Progress              | State                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Before local progress | About terminal changes cyan → lime, turns 90 degrees above the section eyebrow, and the angled mineral veil reveals the night product field. Header returns to its dark treatment. |
| `0–14.5%`             | VCareer title, proposition, pilot line, and direct scope establish the chapter.                                                                          |
| `14.5–29.5%`          | Landing enters, remains completely settled from `19–25.5%`, then exits.                                                                                  |
| `26.5–41.5%`          | CV Builder enters, remains completely settled from `31–37.5%`, then exits.                                                                               |
| `38.5–53.5%`          | CV/JD match enters, remains completely settled from `43–49.5%`, then exits.                                                                              |
| `50.5–65.5%`          | Live interview enters, remains completely settled from `55–61.5%`, and carries the stable `Browser ⇄ LiveKit/WebRTC` slice.                              |
| `62.5–77.5%`          | Interview review enters, remains completely settled from `67–73.5%`, then exits.                                                                         |
| `74.5–89.5%`          | Dashboard enters, remains completely settled from `79–85.5%`, then exits.                                                                                |
| `86.5–100%`           | Screens recede; verified outcomes, status, and primary case-study action land and hold.                                                                  |

Screen motion uses `clip-path`, `z`, `scale`, and controlled perspective. It
does not rotate freely, orbit, autoplay, or continue moving after scroll stops.
The previous and next screens remain spatially related to the stage rail. Each
named point has a real plateau where opacity, position, scale, depth, clip, and
rail state all stop changing. Reverse scroll traverses the same plateaus and
reconstructs the exact prior state.

The VCareer title reveal expands its final clip beyond the title line box.
This preserves the authored bottom-up reveal while leaving room for the
rounded `C` optical overshoot; the accepted font size, `4px` tracking offset,
and intro grid geometry do not change.

### Header choreography

Part 04 generalizes the current About-specific Header tone into a chapter tone
owned by the V2 shell:

1. Hero: dark rail, mineral text, cyan accent;
2. About: mineral glass, night text, teal accent;
3. VCareer: dark product rail, mineral text, signal-lime accent;
4. reverse scroll restores VCareer → About → Hero without a stale palette.

The Header `VCareer` item may gain a thin lime trace while the section is
active. It does **not** regain the background pill the user explicitly removed.
Opening mobile navigation always uses the existing dark modal state.

## Responsive and fallback contract

| Environment               | Required behavior                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `>=1024px`, normal motion | `560svh` scroll-linked sticky Evidence Relay with a short reading plateau at all six named points.                                |
| `768–1023px`              | Static editorial board: direct scope first, then paired evidence figures, then verified ledger. No compressed pseudo-desktop pin. |
| `<768px`                  | Normal-flow vertical story with all six figures; central workflow screens full width and context bookends smaller.                |
| Touch / hover-none        | No information or action depends on hover; screenshots do not tilt with pointer.                                                  |
| Reduced motion            | No pinning, perspective, parallax, `x`/`y`, or clip scrub. Static story; short opacity is optional.                               |
| No JavaScript             | Same heading, scope, six figures, outcome ledger, status, and real links in source order.                                         |
| `?showcase=static`        | Force the static desktop comparison state and preserve the flag across VI/EN switching.                                           |
| `?showcase=loading`       | Force the static evidence board with all six localized product-loading surfaces visible.                                          |
| `?showcase=image-error`   | Force the static evidence board with all six semantic unavailable-image fallbacks visible.                                        |
| Live resize               | Active → static → active resets every inline Motion value and never hides evidence.                                               |

### Checkpoint 04D compact and fallback behavior

- Tablet keeps a two-column editorial board. Context bookends occupy a smaller
  image plane; direct-scope screens receive the longer lime evidence trace.
- Mobile returns to normal document flow. Direct-scope evidence uses the full
  content width, while wider-product context bookends remain narrower and
  alternate alignment so classification is visible before reading the label.
- Static mode writes explicit baseline values for every Motion-controlled
  opacity, transform, depth, scale, color, and clip. Crossing `1024px` therefore
  cannot leave a compact figure carrying a stale desktop inline transform.
- Loading and failure are different states. Loading uses a temporary
  blue-to-lime signal trace and localized progress copy; failure uses the
  reserved aspect ratio, screen number, localized name, and semantic
  unavailable-image label.
- The loading trace stops under `prefers-reduced-motion`. Pointer-only hover
  fills are scoped to fine pointers, while keyboard focus retains the same
  visible action treatment on every layout.
- VI/EN status, captions, and primary-action text may wrap without changing the
  evidence order or causing horizontal overflow at `320px`.

## Image integrity and loading contract

- Generative AI must not alter text, scores, controls, people, or product state
  inside evidence screenshots. That would turn evidence into a mockup.
- Permitted derived assets are deterministic crops, resizes, compression, and
  non-destructive framing. Originals remain available in the full case study.
- Each figure reserves the source aspect ratio before load.
- The product-sky loading/error surface includes step number and localized
  screen name. Loading and unavailable-image messages are distinct; neither
  state becomes an empty grey rectangle.
- All Part 04 images are below the opening scenes and remain lazy-loaded. The
  implementation does not preload all six screenshots.
- `sizes` reflects the actual sticky stage, tablet pair, and mobile full-width
  layouts. Only the first image likely to enter the Part 04 viewport may receive
  higher fetch priority after measurement proves it useful.
- The screenshot disclaimer remains visible in static and animated paths.

## Navigation and controls

- Primary action: localized internal link to `/projects/vcareer`.
- Secondary utilities: external live product and architecture report links,
  each with an external-destination cue and `rel="noopener noreferrer"`.
- Repository state is non-interactive explanatory text.
- Screenshots are semantic figures, not oversized hidden links. Part 08 owns a
  richer full-resolution case-study viewer.
- Minimum interactive target is 44×44px with visible focus treatment.

## Design contract

| Field                   | Decision                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Screen job              | Convert About's engineering philosophy into verifiable flagship product proof.                                                                         |
| Primary user and action | Recruiter, engineering manager, or technical founder reviews Tu's scope and opens the full VCareer case study.                                         |
| Content hierarchy       | Product job → verified pilot → direct scope → ordered product workflow → verified outcomes/status → case-study action.                                 |
| Navigation              | One primary internal action; live/architecture as secondary external utilities; private repo as text.                                                  |
| Visual language         | Product-specific blue/lime signal on the accepted night/mineral system; one dominant real screen at a time; no mock device.                            |
| Required states         | Animated, static, loading, image error, reduced motion, no-JS, compact, menu open, live resize, VI, and EN.                                            |
| Responsive behavior     | Sticky only at `>=1024px`; tablet editorial board; mobile normal flow with evidence hierarchy preserved.                                               |
| Evidence                | Six approved screenshots, verified VCareer contract, live product, public architecture report, UIZZE captures, Motion and Next Image docs.             |
| Forbidden defaults      | Stat cards, generic SaaS grid, autoplay carousel, random 3D collage, fake architecture metrics, disabled repo button, hover-gated evidence.            |
| Acceptance              | Ownership boundary is unmistakable; every link is real; all evidence survives no-JS/reduced motion; reverse and resize are stable; finish gate passes. |

## Approval checkpoints

Every checkpoint is reviewed and committed separately. Later checkpoints do
not start before explicit approval of the current one.

### 04A — Static evidence hierarchy

- Add localized Part 04 content and the semantic section after About.
- Implement the final static desktop/tablet/mobile composition with title,
  direct scope, six figures, verified ledger, status, and real destinations.
- Apply product palette and image fallback/loading surfaces.
- Do not add scroll-linked motion or change Header tone yet.
- Review VI/EN at 1440×900, 1024×768, 768×1024, 375×812, and 320×568.
- Commit after content hierarchy, screenshot order, and visual crop approval.

### 04B — About-to-VCareer chapter handoff

- Continue the About terminal into the lime Evidence Relay.
- Add the mineral-to-night product-field transition.
- Generalize Header chapter tone and implement About light → VCareer dark,
  including exact reverse behavior and mobile-menu priority.
- Keep the static content layout from 04A.
- Commit after the boundary and Header rhythm are approved.

### 04C — Desktop Evidence Relay

- Add the `560svh` / sticky `100svh` desktop story and a stable reading
  plateau for every named product screen.
- Map all six screens, ownership labels, architecture slice, and final evidence
  ledger to one reversible section progress.
- Add `?showcase=static` and preserve it across locales.
- Review every forward/reverse stage at 1440×900, 1280×720, 1024×768, and the
  `1024px` threshold.
- Commit after motion timing, depth, and screen legibility are approved.

### 04D — Compact, fallback, and loading states

- Finalize tablet and mobile hierarchy without pinning.
- Implement reduced-motion, no-JS, image loading/error, live-resize, keyboard,
  touch, menu-open, and long-locale behavior.
- Verify that Motion inline values reset when crossing the `1024px` boundary.
- Commit after compact and fallback approval.

### 04E — Finish gate

- Run responsive VI/EN renders at 1440×900, 1280×720, 1024×768, 1023×768,
  768×1024, 430×932, 375×812, and 320×568.
- Audit forward/reverse scroll, Header tones, resize, locale flags, menu, links,
  loading/error, reduced motion, and no-JS.
- Run axe WCAG A/AA plus manual contrast and focus review.
- Measure production bundle delta, actual responsive image transfer, Lighthouse,
  LCP, CLS, TBT, console/page errors, and failed requests.
- Keep motion if it improves the product story; remove any effect that merely
  repeats Hero or About behavior without adding evidence.
- Update the V2 roadmap and commit only after final approval.

## Planned code boundary

```text
design-system/v2/part-04-vcareer.md
design-system/v2/README.md
messages/{vi,en}.json
src/app/[locale]/v2/page.tsx
src/components/v2/portfolio-v2-shell.tsx
src/components/v2/site-header-v2.tsx
src/components/v2/site-header-v2.module.css
src/components/v2/vcareer/*
src/lib/v2/vcareer-showcase.ts
src/data/projects.ts                 # reuse evidence; avoid duplicating URLs
public/projects/vcareer/*            # source evidence remains unchanged
public/v2/vcareer/*                  # optional deterministic derivatives only
```

Part 04 does not add supporting project cards, rewrite the V1 case study, claim
roadmap work as shipped, or create a fake public repository destination.
