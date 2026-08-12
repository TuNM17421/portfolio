# Part 02 — Header + Full-viewport Hero

> **Status:** Checkpoint 02B approved
> **Branch:** `redesign/portfolio-v2`
> **Dependency:** Part 01 approved at commit `a0687e2`
> **Implementation:** 02A static Header/Hero approved; 02B motion choreography implemented

## Recommendation

Build Part 02 as a **Living Systems Poster**: one full-viewport composition in
which the portrait is the dominant visual, the exact role is the
typographic architecture, and VCareer is the only project proof promoted in
the opening scene.

`Living Systems Poster` is an internal working name and is never rendered as
visitor-facing copy:

| Word | Meaning in this Hero |
| --- | --- |
| **Poster** | The portrait, role, positioning, and VCareer action form one full-screen composition instead of separate columns or cards. |
| **Living** | The composition enters as one choreographed sequence, responds subtly to pointer/scroll, and then settles; it is not a static poster image. |
| **Systems** | The focus line, aligned layers, and synchronized motion are derived from Tu's backend and realtime AI work. It does not mean showing a system diagram, terminal, HUD, or technical dashboard in the Hero. |

The Hero must replace the temporary Part 01 handoff copy and review card. It
must not become a grid of metrics, a two-column SaaS hero, or a generic
developer dashboard.

## Screen job and visitor decision

| Field | Contract |
| --- | --- |
| Primary visitor | Recruiter, engineering manager, or technical founder. |
| Decision supported | Understand Nguyen Manh Tu's role, see one credible proof, then open VCareer or make contact. |
| Primary action | Open the localized VCareer case study. |
| Secondary action | Open a real `mailto:` contact action. |
| Success in one viewport | Visitor can answer: who, role, specialty, strongest proof, and where to inspect it. |
| Evidence boundary | Only verified repository/user facts. No invented availability, client logos, performance outcomes, or decorative metrics. |

## Audit of the current handoff

Part 01 currently lands on an intentionally temporary frame. Part 02 replaces,
rather than extends, the following scaffolding:

- `PHẦN 01` / `PART 01` metadata;
- `Phần 01 · Chuyển cảnh mở đầu` / `Part 01 · Intro handoff target`;
- the review-ready status card;
- the temporary tilted portrait card composition.

The current portrait treatment is clear enough to judge layout, so it remains
the working asset during the first visual checkpoint. Final image processing
is isolated behind its own approval gate.

## Research evidence

Research was refreshed on 11 August 2026. References settle concrete hierarchy
and interaction decisions; they are not templates to copy.

| Evidence | Decision it resolves | Transfer | Explicit no-copy boundary |
| --- | --- | --- | --- |
| [Swaraj Portfolio '25](https://portfolio-25-phi.vercel.app/?ref=save.design) | Whether a portrait, role, navigation, and action can read as one cinematic scene. | Full-viewport image field, edge-aligned navigation, oversized role, staged loader-to-page continuity. | Do not copy its blue texture, split at 52%, condensed type pairing, wording, navigation set, exact timeline, or About composition. |
| [Dylan Brouwer — UIZZE](https://singapore.objective.company/design-media/e3/e384ab8122d78f72aee5b0119f87f916bafef2cffcd4e70eb2e63b5b608bd7a3.webp) | How much typography can carry the scene. | Treat the role as architecture; reserve one dominant visual anchor; keep utility copy peripheral. | Do not copy the phrase, grayscale fade, monitor object, italic treatment, or centered geometry. |
| [Zellerfeld — UIZZE](https://singapore.objective.company/design-media/5b/5b601f7677593817a37752922ba6f381043e3c21836e31f6a904d0fcb2941a65.webp) | How controls can sit over a full-bleed image without turning into a conventional header bar. | Edge rails, image-led composition, restrained controls, one product action attached to the image. | Do not copy its commerce pills, carousel, product-card overlay, crop, colors, or navigation icons. |
| [Modal — UIZZE](https://singapore.objective.company/design-media/17/17f44d04ba09f3ed4122e77e32e11bd3e128d6c0be40c4c5f96034f67fac85dd.webp) | Where to spend visual intensity. | Give one object almost all visual energy while copy and navigation remain quiet. | Do not copy the green cube, glow field, centered SaaS heading, logo wall, or pill CTA styling. |
| [Vercel — UIZZE](https://singapore.objective.company/design-media/42/4202e89300304207ac9eb08c9c45f93785fb5c9cfa9491e60d1a74096280bfbd.webp) | How to separate proposition, focal object, and technical specialty in one viewport. | Use distinct zones with strong whitespace and no explanatory card grid. | Do not copy the triangle, monochrome brand language, customer strip, CTA shapes, or exact ratios. |

The research supports a single dominant composition. It does not support three
metric cards in the first scene. The old proposal's `02+ YEARS / 150+ / TRACK
4` row would make the Hero read like a dashboard and weaken the portrait.

## Direction comparison

| Direction | Composition | Strength | Risk | Decision |
| --- | --- | --- | --- | --- |
| **A. Living Systems Poster** | Full-viewport portrait field; oversized role lower-left; compact VCareer proof/action at the lower boundary. | Best continuity with Part 01; distinctive; image and role tell one story. | Requires careful art direction and overlap testing. | **Recommended.** |
| B. Split Lens | Copy left, rectangular portrait right, conventional top header. | Safest responsive implementation and fastest to scan. | Too close to the current temporary handoff and generic agency/SaaS layouts. | Reject. |
| C. Evidence Aperture | Portrait surrounded by architecture fragments, metrics, and interactive CV/JD nodes. | Immediately signals technical depth. | Competes with the person, repeats the VCareer case study, and invents a dashboard language before evidence is opened. | Reserve for Part 04, not Hero. |

### Intentional aesthetic risk

The canonical role overlaps the portrait boundary instead of staying inside a
safe text column. Contrast is protected with a localized dark plane and line
break control, but the overlap makes the page feel authored rather than
templated. This is the one deliberate risk in Part 02.

## Content contract

The canonical title is exact and identical in both locales:

```text
Software Engineer · AI Engineer
```

Confirmed positioning copy:

- **VI:** `Xây dựng backend và sản phẩm AI realtime.`
- **EN:** `Building reliable backends and realtime AI experiences.`

Proposed actions and attached proof:

| Element | VI | EN | Destination |
| --- | --- | --- | --- |
| Primary action | `VCareer / Xem case study` | `VCareer / View case study` | `/[locale]/projects/vcareer` |
| Proof attached to action | `150+ học viên pilot` | `150+ pilot learners` | Same VCareer action region |
| Secondary action | `Liên hệ` | `Contact` | `mailto:tunm17421@gmail.com` |
| Quiet metadata | `Hà Nội, Việt Nam` | `Hanoi, Vietnam` | Non-interactive |

The `2+ years` and Track 4 recognition move below the first scene and reappear
where they have context. The Hero carries only the `150+` proof because it
qualifies the exact project being offered as the primary action.

## Project hierarchy beyond the Hero

Promoting VCareer in the Hero does not remove or demote the other projects from
the portfolio. It gives each project a different recruiting job instead of
rendering three interchangeable cards:

```text
Hero      VCareer teaser + 150+ pilot proof
  ↓
Part 04   VCareer flagship narrative
           LiveKit/WebRTC · CV analysis · CV–JD · JD Builder
  ↓
Part 05   Supporting work index
           ScholarAI          → RAG, semantic search, evaluation
           Financial Planning → Java/Spring, Redis, enterprise workflows
```

- **VCareer** receives the cinematic homepage teaser and the richest showcase
  because it has verified users, personal scope, public product and architecture
  links, and a complete case-study route.
- **ScholarAI** becomes the strongest supporting AI-engineering proof. Its scene
  should foreground retrieval, citations, guardrails, and benchmark evidence
  rather than repeat a generic screenshot gallery.
- **Financial Planning System** becomes the strongest enterprise-backend proof.
  Its scene should foreground Java/Spring, reporting workflows, caching, and
  system breadth rather than displaying all fourteen screenshots at once.

Part 05 will receive a separate research and approval contract. Before that
part is implemented, both supporting projects still need verified personal
role, outcome, link/repository state, and approved screenshot selection. The
current repository provides descriptions, technologies, and image galleries,
but not all of that evidence.

When Part 05 exists, the Header can graduate from the checkpoint-specific
`VCareer` link to a real `Work` destination covering all three projects. Until
then, it must not expose an inert project index.

## Header contract

### Part 02 destinations

Only destinations that work at this migration checkpoint are shown:

- full-name wordmark → localized `/v2` top;
- `VCareer` → localized VCareer case study;
- `Contact` → real `mailto:` action;
- `VI / EN` locale switcher.

Experience, Awards, Skills, and section-active navigation are added only when
their V2 sections exist. No inert anchors are rendered merely to imitate the
reference site. Resume remains absent until a real public PDF is approved.

### Desktop

- Transparent, edge-aligned, no rounded navigation container.
- Wordmark uses the Part 01 shared-element identity.
- Text actions stay quiet until hover/focus; active focus is unmistakable.
- Header condensation is deferred until the static Hero is approved.

### Mobile

- Wordmark and locale remain visible.
- A real 44×44px menu button opens a full-screen navigation layer containing
  only VCareer and Contact at this checkpoint.
- Menu open/close restores focus, locks background scroll, closes on Escape,
  and exposes no hidden duplicate links to assistive technology.

## Composition

### Desktop — 1440×900 target

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Nguyen Manh Tu                         VCAREER       CONTACT       VI / EN│
│                                                                          │
│                 corridor depth field          clear portrait focal plane │
│                                   eyes / glasses near optical intersection│
│                                                                          │
│ SOFTWARE ENGINEER                                                       │
│ · AI ENGINEER ───────────────── overlaps image boundary                  │
│                                                                          │
│ HANOI, VIETNAM      positioning copy        VCAREER / CASE STUDY →        │
│                                              150+ PILOT LEARNERS   SCROLL│
└──────────────────────────────────────────────────────────────────────────┘
```

- The desktop portrait panel occupies 40% of the viewport width, biased right;
  its diagonal edge leaves the dark field slightly wider at the top.
- Role occupies two or three controlled display lines; it is never typed,
  erased, or allowed to disappear.
- Summary and action sit on the lower boundary rather than in floating cards.
- The Part 01 focus signal becomes the baseline between the role and VCareer
  action, creating continuity without adding a fake HUD.

### Mobile — 375×812 target

```text
┌───────────────────────────────┐
│ Nguyen Manh Tu      VI   MENU │
│                               │
│       face / glasses           │
│       centered upper field     │
│                               │
│ SOFTWARE ENGINEER             │
│ · AI ENGINEER                 │
│                               │
│ Reliable backend + realtime AI│
│ VCAREER / CASE STUDY →        │
│ 150+ PILOT LEARNERS     SCROLL│
└───────────────────────────────┘
```

Mobile is separately composed rather than a stacked desktop layout:

- face and glasses remain unobstructed in the upper field;
- role uses no more than three lines at 375px;
- Contact moves into the menu to preserve the primary action hierarchy;
- metadata may be omitted before any content or action is truncated.

## Motion contract

Motion for React remains the primary engine. Official Motion documentation
supports [`layoutId` for shared elements](https://motion.dev/docs/react-layout-animations),
[scroll-linked values](https://motion.dev/docs/react-scroll-animations) for
parallax and storytelling, and
[`useReducedMotion`](https://motion.dev/docs/react-use-reduced-motion) for
replacing spatial movement.

### Intro → Hero handoff

1. Part 01 focus line completes its sweep and becomes the Hero baseline.
2. `Nguyen Manh Tu` moves to the header through a measured per-word handoff
   layer that stays above the Intro exit mask for the complete journey.
3. The Intro portrait yields to the accepted Hero portrait, which settles from
   approximately `scale(1.08)` without obscuring the face.
4. The two role groups reveal through masks; the actual text is already in the
   document and remains accessible.
5. Positioning copy, VCareer action, and proof arrive last.

Direct `?intro=0` entry lands on exactly the same final composition with a
short opacity/transform entrance and no missing shared element.

### Idle and interaction

- One slow, low-amplitude depth drift may separate background, portrait, and
  grain planes.
- Fine-pointer devices receive bounded portrait parallax; touch receives none.
- `Anybody` may perform one width-axis breath after entry. It never loops and
  never changes the title string.
- VCareer text rolls once on hover/focus; duplicate animation text is hidden
  from assistive technology.
- No cursor replacement, autoplay audio, fake terminal text, particle field,
  or continuously moving decorative ticker.

### First-scroll hold

- Prototype a `125–135svh` section with a `100svh` sticky scene.
- The short scroll range increases portrait scale slightly, moves the role by
  no more than a few viewport units, and carries the focus line toward the
  Part 03 boundary.
- Part 02 ends on a neutral boundary stub. Part 03 later replaces that stub
  with its approved About transition.
- The sticky treatment is kept only if the review shows a meaningful handoff;
  otherwise the accepted static Hero remains and normal document scroll wins.

### Reduced motion

- Intro handoff becomes a short crossfade.
- No sticky scrub, parallax, font-axis animation, or spatial menu transition.
- Final composition, reading order, links, focus behavior, and information are
  identical.

## Image art-direction gate

`public/avatar-graduation.jpg` remains the Intro source and `public/avatar.jpg`
remains the Hero source. Neither original is overwritten.

### Layout prototype

Checkpoint 02A uses the approved Part 01 v2 treatment so composition can be
judged without waiting for an AI edit.

### Proposed processed variants

After the layout is approved:

1. Preserve Tu's face, glasses, hair, skin texture, suit, and identity.
2. Treat the ceremony Intro and corridor Hero as separate masters rather than
   blending them into a synthetic scene.
3. Keep the real environments recognizable; do not invent a futuristic room
   or synthetic neon background.
4. Export desktop and mobile crops only after comparison inside the real Hero.
5. Preserve clear eyes and glasses; use depth blur only behind the subject.
6. Review original, desktop, and mobile variants side-by-side before wiring
   responsive AVIF/WebP derivatives.

If the AI edit changes identity or feels artificial, the implementation falls
back to a manual crop/grade of the original rather than accepting the edit.

## Required states

| State | Expected result |
| --- | --- |
| Full intro | Continuous loader → header/portrait/role handoff. |
| Direct entry | `?intro=0` renders the same final Hero without a blank intermediate frame. |
| Repeat visit | Fast handoff preserves context and does not replay a long loader. |
| Portrait pending | Reserved geometry prevents layout shift; readable backdrop remains. |
| Portrait error | Text hierarchy and both actions remain usable over a deliberate fallback field. |
| Mobile menu | Open, close, Escape, outside/background behavior, and focus return all work. |
| VI / EN | Exact title remains unchanged; supporting copy is natural in each locale. |
| Keyboard | Logical tab order, visible focus, no hover-only information. |
| Touch | 44px targets; no dependency on pointer parallax or hover text. |
| No JavaScript | Header, role, summary, proof, and links are visible; only theatrical motion is absent. |
| Reduced motion | Same composition and actions with crossfades instead of spatial movement. |

## Implementation plan and approval checkpoints

Each checkpoint stops for live user review. A checkpoint is committed only
after approval, so a rejected idea can be reverted without touching Part 01.

### 02A — Static composition and real content

**Build**

- Replace temporary Part 01 handoff labels/card with semantic Header and Hero.
- Implement desktop and mobile poster compositions using the current portrait.
- Add exact VI/EN content, localized VCareer route, real email action, reserved
  image geometry, and image-error fallback.
- Render final content visible by default; do not add entrance dependencies yet.

**Review artifact**

- Static screenshots at 1440×900 and 375×812 in VI and EN.
- Live `?intro=0` review at desktop and mobile widths.

**Approval question**

- Does the final still composition have the right portrait/role balance before
  motion is added?

### 02B — Intro-to-Hero choreography

**Build**

- Connect the existing wordmark and focus line to the final Header/Hero.
- Add portrait settle, masked role reveal, copy/action sequencing, direct-entry
  entrance, and interruption-safe cleanup.

**Review artifact**

- `?intro=1`, `?intro=0`, `?intro=slow`, and `?intro=image-error`.
- Screen recording of a full handoff at 1440×900 and 375×812.

**Approval question**

- Does the opening feel like one continuous scene, and is the final content
  readable soon enough?

### 02C — Header and mobile navigation

**Build**

- Add desktop interaction states and the real mobile menu.
- Add locale preservation, focus trap/return, Escape close, scroll lock, and
  44px touch targets.
- Prototype header condensation only after the static header is approved.

**Review artifact**

- Desktop hover/focus recording.
- Mobile open/close, locale switch, VCareer, Contact, keyboard, and touch review.

**Approval question**

- Does the header stay distinctive without distracting from the portrait?

### 02D — Depth and first-scroll hold

**Build**

- Add bounded fine-pointer parallax and the one-time variable-font breath.
- Prototype the `125–135svh` sticky phase against a neutral Part 03 boundary.
- Add the complete reduced-motion branch.

**Review artifact**

- Pointer-capable desktop, touch/mobile, `?intro=reduced`, and OS reduced-motion
  recordings.
- Side-by-side build with the sticky phase enabled and disabled.

**Approval question**

- Does the hold create anticipation for Part 03, or should normal scroll remain?

### 02E — Portrait post-processing

**Build**

- Generate/edit desktop and mobile masters from the original under the identity
  preservation brief.
- Present comparisons before replacing the current working treatment.
- Wire accepted art-directed sources and optimized derivatives.

**Review artifact**

- Original vs desktop vs mobile at 100% crop and inside the actual Hero.

**Approval question**

- Is the edit still recognizably and naturally Tu, and does it improve the
  composition enough to replace the original crop?

### 02F — Finish gate and Part 02 commit

**Verify**

- Production build and automated tests.
- Rendered screenshots at 375×812, 768×1024, 1024×768, and 1440×900 in both
  locales.
- Intro/full/direct/error/repeat/reduced/no-JS checks.
- Keyboard order, focus visibility, mobile menu semantics, 44px targets,
  contrast, overflow, CLS, console errors, and image fallback.
- Check VCareer and email destinations; confirm there are no inert controls.
- Measure the Part 02 JS/image cost and record the delta from Part 01.

Part 02 is complete only after final rendered review and explicit user approval.
Part 03 research does not start automatically.

## Planned code boundary

```text
src/components/v2/site-header-v2.tsx
src/components/v2/mobile-nav-v2.tsx
src/components/v2/hero/hero-v2.tsx
src/components/v2/hero/hero-v2.module.css
src/components/v2/hero/hero-motion.tsx
src/components/v2/portfolio-v2-shell.tsx
src/components/v2/portfolio-v2-shell.module.css
src/app/[locale]/v2/page.tsx
src/lib/v2/*                           # only state/control logic with tests
messages/en.json
messages/vi.json
public/v2/hero/*                       # only after 02E approval
```

The V1 homepage and existing VCareer case study remain unchanged throughout
Part 02.

## Approved decisions for 02A

1. **Confirmed:** Direction A — Living Systems Poster, using the internal
   working-name definition above.
2. **Confirmed:** exact VI/EN positioning copy recorded in the content contract.
3. **Confirmed:** show only `VCareer · 150+ pilot learners` in the Hero and move
   `2+ years` plus Track 4 recognition to later evidence sections.

Already confirmed: exact wordmark `Nguyen Manh Tu`, exact bilingual role,
`avatar-graduation.jpg`, single art-directed dark V2 palette, and no V2 theme
toggle.
