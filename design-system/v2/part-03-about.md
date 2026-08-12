# Part 03 — Hero-to-About transition + identity story

> **Status:** 03A committed (`70a63d1`); 03B committed (`b6fcbae`); 03C committed (`f9114b6`); 03D implemented for live review
> **Branch:** `redesign/portfolio-v2`
> **Review artifact:** `/vi/v2?intro=0` and `/en/v2?intro=0`

## Objective

Turn the first scroll after the accepted Hero into a concise explanation of
how Nguyen Manh Tu works. The section must make two points clear to a recruiter,
engineering manager, or technical founder:

1. AI is an extension of a production-backend foundation, not a rejection of
   software engineering;
2. technical decisions start with a real user problem and grow only after the
   simplest useful version produces evidence.

The internal direction name is **Bridge, not Pivot**. It is not rendered in
the interface.

## Confirmed inputs

- The Vietnamese voice uses `mình`.
- The content is edited for reading speed while preserving the user's complete
  reasoning.
- The About chapter uses typography and system motion only. No new portrait,
  lifestyle photo, illustration, skill card, metric, or decorative technology
  logo is introduced.
- The chapter changes from the Hero's night field to mineral light
  `#EDF4F5`.
- The eventual desktop story uses a `180svh` scroll-linked sticky scene;
  mobile and reduced-motion use normal document flow.
- When choreography is implemented, the Header changes to a mineral glass rail
  with night text rather than remaining a dark bar over the light chapter.

## Research transfer

| Source | Transfer | Do not copy |
| --- | --- | --- |
| [Motion scroll animations](https://motion.dev/docs/react-scroll-animations) | Track the About element itself with `useScroll`; use scroll-linked values for an interactive story that reverses naturally. | Generic one-shot fade-up reveals on every paragraph. |
| [Motion reduced motion](https://motion.dev/docs/react-use-reduced-motion) | Replace spatial movement and pinning with normal flow and, at most, short opacity changes. | Hiding or shortening the actual identity story. |
| [Shirley Xu portfolio case study](https://www.shirleyxu.dev/projects/portfolio) | Treat transitions as information design and preserve spatial context across color changes. | Its floating name, WebGL glass engine, project-card state machine, or visual identity. |
| [Swaraj Portfolio '25](https://portfolio-25-phi.vercel.app/?ref=save.design) | Let one strong typographic composition carry the About scene after a cinematic Hero. | Its exact About copy, white-page ratios, font treatment, or animation timing. |

The section avoids the generic portfolio pattern of biography cards, skill
percentages, and a three-stat row. The real narrative itself supplies the
structure.

## Visual system

### Palette

| Token | Hex | Use |
| --- | --- | --- |
| Mineral sheet | `#EDF4F5` | About background |
| Night ink | `#071219` | Primary display text |
| Deep ink | `#0B2738` | Body text and structural rules |
| Focus ink | `#176F6B` | Accessible active/accent text on mineral (`5.35:1`) |
| Focus signal | `#6BD7D0` | Non-text signal lines and nodes |
| Ceremony trace | `#4B7188` | Quiet metadata and secondary rules |

### Typography

- `Anybody` carries both identity claims and the closing statement.
- `Be Vietnam Pro` carries the explanatory paragraphs.
- `IBM Plex Mono` carries labels and the four-step decision sequence.
- Display type is left aligned. No centered manifesto, outlined marquee, or
  continuously moving text is used.

### Static composition

```text
ABOUT / CÁCH MÌNH XÂY                         BACKEND → AI
──────────────────────────────────────────────────────────
│
│  Không rời Backend.
│  AI là bước phát triển tiếp theo.
│                                   foundation explanation
│
│  Bắt đầu từ bài toán.              philosophy explanation
│  Không bắt đầu từ công nghệ.
│
└─ Hiểu vấn đề → Kiểm chứng → Quan sát → Mở rộng

Kỹ thuật tốt không phải là hệ thống dùng nhiều công nghệ nhất…
```

The signal spine and numbered process encode a real sequence. They are not
decorative dashboard chrome.

## Canonical content

### Vietnamese

- Eyebrow: `ABOUT / CÁCH MÌNH XÂY`
- Claim: `Không rời Backend.`
- Extension: `AI là bước phát triển tiếp theo.`
- Foundation: `Hơn hai năm làm Backend cho mình nền tảng về API, dữ liệu,
  business logic và cách hệ thống production vận hành. Mình mang nền tảng đó
  vào LLM, RAG, recommendation và AI Agent để xây những hệ thống AI thực tế —
  không chỉ dừng ở việc gọi model API.`
- Principle: `Bắt đầu từ bài toán. Không bắt đầu từ công nghệ.`
- Principle body: `Mình làm rõ vấn đề của người dùng và tiêu chí thành công
  trước, sau đó xây giải pháp đơn giản nhất để kiểm chứng. Chỉ khi có dữ liệu
  sử dụng thực tế, mình mới mở rộng architecture, performance hoặc mức độ phức
  tạp của AI.`
- Process: `Hiểu vấn đề → Kiểm chứng đơn giản nhất → Quan sát cách dùng thật →
  Mở rộng khi có bằng chứng`
- Closing: `Kỹ thuật tốt không phải là hệ thống dùng nhiều công nghệ nhất. Nó
  đủ đơn giản để bảo trì, nhưng đủ tốt để giải quyết đúng vấn đề.`

### English

- Eyebrow: `ABOUT / HOW I BUILD`
- Claim: `I'm not leaving Backend behind.`
- Extension: `AI is the next step forward.`
- Foundation: `More than two years in Backend gave me a foundation in APIs,
  data, business logic, and how production systems behave. I bring that
  foundation into LLMs, RAG, recommendation systems, and AI Agents to build AI
  systems that work in practice — not just wrappers around a model API.`
- Principle: `Start with the problem. Not the technology.`
- Principle body: `I first clarify the user's problem and what success looks
  like, then build the simplest solution that can test the idea. Architecture,
  performance, and AI complexity evolve only after real usage provides
  evidence.`
- Process: `Understand the problem → Prove the simplest version → Observe real
  usage → Scale with evidence`
- Closing: `Good engineering is not the system with the most technology. It is
  simple enough to maintain and strong enough to solve the right problem.`

## Interaction contract for later checkpoints

Checkpoint 03A renders the complete semantic story in normal flow and contains
no entrance dependency. Later checkpoints must preserve that source order.

For 03B, the existing Hero boundary becomes the incoming mineral sheet. The
Hero focus line continues as the About story spine. Desktop maps the About
section's own scroll progress to these states:

1. `0–20%`: mineral sheet settles; Header palette joins in 03C;
2. `18–45%`: Backend foundation claim appears;
3. `38–62%`: `Backend` stays as the bridge while the AI extension joins it;
4. `58–82%`: the operating principle replaces the foundation emphasis;
5. `78–100%`: the process rail resolves and the closing statement lands.

All scroll-linked states reverse when the visitor scrolls up. Semantic content
must never be duplicated in the accessibility tree; visual duplicate spans are
`aria-hidden`.

## Responsive and fallback contract

- Desktop `>=900px`: final wrapper `180svh`, inner scene sticky `100svh`.
- Mobile `<900px`: normal flow with two readable editorial frames and a
  vertical process sequence. No substitute horizontal scroll.
- Reduced motion: normal flow, no pinning, parallax, scrub, or `x`/`y`
  animation; short opacity is optional.
- No JavaScript: all headings, paragraphs, and ordered steps remain visible.
- The About heading is `h2`; the operating principle is `h3`.
- The section has no CTA. Part 04 owns the next project action and transition.

## Approval checkpoints

### 03A — Contract and static composition

- Implement localized semantic content and responsive static layout.
- Review VI/EN at 1440×900, 768×1024, and 375×812.
- Commit only after explicit approval.

### 03B — Hero-to-About choreography

- Replace the temporary boundary with the mineral-sheet transition.
- Add reversible scroll-linked type assembly and shared signal continuity.
- Commit after desktop choreography approval.

#### Live implementation record

- `PortfolioV2Shell` owns one About story controller so the Hero boundary,
  story frames, and later Header palette can share the same section state.
- Desktop uses the agreed `180svh` section with a sticky `100svh` mineral
  sheet. The existing Hero boundary changes into that sheet before the About
  section reaches the viewport.
- One reversible scroll progress drives the foundation reveal, AI extension,
  operating principle, four-step decision rail, closing statement, and the
  travelling signal cursor.
- The semantic story is rendered once and remains in source order. The motion
  layer only changes presentation properties on those existing elements.
- Mobile and reduced-motion remain on the approved 03A document-flow layout.
- The Header intentionally keeps its accepted dark treatment during this
  checkpoint. Mineral Header interpolation and static-story controls belong to
  03C.

### 03C — Responsive, Header, and fallback

- Add the light Header rail interpolation, compact normal flow, `?story=static`,
  reduced-motion, and no-JS paths.
- Commit after responsive/fallback approval.

#### Live implementation record

- The Header now shares the About controller instead of creating a second
  scroll listener. As the mineral sheet reaches the Header rail, its glass,
  text, accent, rule, and shadow switch through one palette relay; scrolling
  upward restores the dark treatment. The relay deliberately avoids a
  low-contrast grey-on-grey interpolation frame.
- `?story=static` explicitly disables the pinned type choreography while
  keeping the Hero-to-mineral handoff and Header chapter change available for
  visual comparison. The flag survives VI/EN switching alongside the existing
  Intro, hold, and portrait controls.
- Desktop static, mobile, reduced-motion, and no-JavaScript paths use normal
  document flow with tighter editorial spacing. They keep the same headings,
  paragraphs, ordered process, and closing statement rather than shortening
  the identity story.
- Opening mobile navigation from the light chapter temporarily restores its
  night palette, then returns focus and the chapter palette when closed.
- No-JavaScript keeps a stable dark Header rail because scroll-aware palette
  changes are unavailable, while the complete About content remains visible.

### 03D — Finish gate

- Run responsive, accessibility, performance, CLS, scroll-direction, resize,
  locale, menu, reduced-motion, and no-JS verification.
- Record the route-size delta and update the V2 roadmap.

#### Live finish-gate record

Completed on 12 August 2026 and left for user review before the checkpoint is
committed. The gate found one runtime fallback defect: after a visitor scrolled
the desktop story and resized below `900px`, Motion retained the last inline
opacity and transform values even though the layout had changed to normal
flow. The static mode selector now authoritatively restores every story frame,
clip, transform, and signal node. Desktop → compact → desktop resize therefore
keeps all content visible without forcing a remount or resetting scroll.

Final verification:

- `56/56` Vitest tests, TypeScript, lint, diff checks, and the production build
  pass. `/[locale]/v2` is `69.1 kB` with `180 kB` First Load JS. Against the
  approved 02F build (`67.1 kB` / `178 kB`), the complete About chapter adds
  approximately `2.0 kB` route code and `2 kB` First Load JS;
- VI and EN were rendered at 1440×900, 1280×720, 1024×768, 900×700,
  899×900, 768×1024, 430×932, 375×812, and 320×568. Desktop choreography fits
  the shortest 900×700 viewport; compact layouts retain the complete story in
  normal flow; no tested state has horizontal overflow;
- forward scroll resolves foundation → principle → process/closing, and reverse
  scroll restores those exact frames and the dark Hero Header palette. Live
  resize switches between absolute/sticky and static layout with all four
  frames visible in static mode;
- VI/EN switching preserves `intro`, `hold`, `portrait`, and `story` controls.
  The mobile navigation traps Tab and Shift+Tab, closes on Escape, locks body
  scroll, makes Hero/About inert, and returns focus to its trigger;
- reduced motion and no-JavaScript both render the same `h1 → h2 → h3`
  hierarchy, four ordered process steps, and closing statement. They use static
  positions, full opacity, no spatial transforms, and no horizontal overflow;
- axe reports zero automatic WCAG A/AA violations across active VI/EN story
  frames, desktop static, compact static, and the open mobile dialog. Its
  contrast indeterminate cases come from gradients and pseudo-elements; the
  About chapter's manual text pairs are `4.87:1` (quiet deep ink), `5.35:1`
  (focus ink), `7.14:1` (body ink), and `17:1` (night ink) against the mineral
  sheet. Lighthouse Accessibility, Best Practices, and SEO are `100` on both
  mobile and desktop;
- Lighthouse desktop is `99 / 100 / 100 / 100` with LCP `1.0s`, TBT `11ms`,
  and CLS `0`. Three mobile runs have a median `79 / 100 / 100 / 100`, LCP
  `4.47s`, TBT `215ms`, and CLS `0`. This is a measured decrease from 02F's
  single mobile run (`86`, LCP `4.2s`) and is retained as an explicit cost for
  the motion-forward branch rather than hidden by one favorable run;
- scripted Web Vitals collection records max-session CLS `0` for compact
  document flow, `0.0011` for desktop scroll plus live resize, and `0.0187` for
  the complete Intro, handoff, and About journey. Console errors, page errors,
  failed requests, and Lighthouse binary audit failures are all zero.

The mobile performance cost does not block this checkpoint under the approved
motion direction, but it remains a cross-page optimization target for Part 09
after the remaining sections establish the final route payload.

## Planned code boundary

```text
design-system/v2/part-03-about.md
messages/{vi,en}.json
src/app/[locale]/v2/page.tsx
src/components/v2/about/*
src/components/v2/portfolio-v2-shell.tsx
```

Part 03 does not alter the accepted Intro assets, Hero portrait composition,
pointer parallax, VCareer destinations, or global V1 portfolio.
