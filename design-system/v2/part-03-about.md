# Part 03 — Hero-to-About transition + identity story

> **Status:** Checkpoint 03A implemented for live review; 03B–03D are not started
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

1. `0–20%`: mineral sheet and Header palette settle;
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

### 03C — Responsive, Header, and fallback

- Add the light Header rail interpolation, compact normal flow, `?story=static`,
  reduced-motion, and no-JS paths.
- Commit after responsive/fallback approval.

### 03D — Finish gate

- Run responsive, accessibility, performance, CLS, scroll-direction, resize,
  locale, menu, reduced-motion, and no-JS verification.
- Record the route-size delta and update the V2 roadmap.

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
