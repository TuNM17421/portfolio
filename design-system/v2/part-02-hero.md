# Part 02 — Header + Full-viewport Hero

> **Status:** Checkpoint 02D approved and committed; checkpoint 02E implemented and awaiting visual approval
> **Branch:** `redesign/portfolio-v2`
> **Dependency:** Part 01 approved at commit `a0687e2`
> **Implementation:** 02A static Header/Hero approved; 02B motion choreography approved; 02C Header/navigation approved

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

Research was refreshed on 12 August 2026. References settle concrete hierarchy
and interaction decisions; they are not templates to copy.

| Evidence | Decision it resolves | Transfer | Explicit no-copy boundary |
| --- | --- | --- | --- |
| [Swaraj Portfolio '25](https://portfolio-25-phi.vercel.app/?ref=save.design) | Whether a portrait, role, navigation, and action can read as one cinematic scene. | Full-viewport image field, edge-aligned navigation, oversized role, staged loader-to-page continuity. | Do not copy its blue texture, split at 52%, condensed type pairing, wording, navigation set, exact timeline, or About composition. |
| [Dylan Brouwer — UIZZE](https://singapore.objective.company/design-media/e3/e384ab8122d78f72aee5b0119f87f916bafef2cffcd4e70eb2e63b5b608bd7a3.webp) | How much typography can carry the scene. | Treat the role as architecture; reserve one dominant visual anchor; keep utility copy peripheral. | Do not copy the phrase, grayscale fade, monitor object, italic treatment, or centered geometry. |
| [Zellerfeld — UIZZE](https://singapore.objective.company/design-media/5b/5b601f7677593817a37752922ba6f381043e3c21836e31f6a904d0fcb2941a65.webp) | How controls can sit over a full-bleed image without turning into a conventional header bar. | Edge rails, image-led composition, restrained controls, one product action attached to the image. | Do not copy its commerce pills, carousel, product-card overlay, crop, colors, or navigation icons. |
| [Modal — UIZZE](https://singapore.objective.company/design-media/17/17f44d04ba09f3ed4122e77e32e11bd3e128d6c0be40c4c5f96034f67fac85dd.webp) | Where to spend visual intensity. | Give one object almost all visual energy while copy and navigation remain quiet. | Do not copy the green cube, glow field, centered SaaS heading, logo wall, or pill CTA styling. |
| [Vercel — UIZZE](https://singapore.objective.company/design-media/42/4202e89300304207ac9eb08c9c45f93785fb5c9cfa9491e60d1a74096280bfbd.webp) | How to separate proposition, focal object, and technical specialty in one viewport. | Use distinct zones with strong whitespace and no explanatory card grid. | Do not copy the triangle, monochrome brand language, customer strip, CTA shapes, or exact ratios. |
| [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | What a full-screen navigation layer must do when it claims modal behavior. | Move focus inside on open, contain Tab/Shift+Tab, close on Escape, provide a visible close control, make the background inert, and return focus to the trigger. | Do not add dialog semantics to a visual overlay unless every one of those behaviors is implemented. |
| [Motion `AnimatePresence`](https://motion.dev/docs/react-animate-presence) | How the navigation plane can finish its exit before removal. | Keep one keyed overlay as the direct child, use `initial={false}`, and define an explicit reduced-motion branch. | Do not turn each letter or utility control into an independently animated object. |
| [WHATWG HTML — inert subtrees](https://html.spec.whatwg.org/multipage/interaction.html#inert-subtrees) | How to prevent background Hero controls from remaining clickable or focusable. | Apply `inert` only to the Hero sibling while the menu dialog is open. | Do not make the dialog an inert descendant or hide active controls from the accessibility tree. |
| [Motion `useScroll`](https://motion.dev/docs/react-use-scroll) + [`useSpring`](https://motion.dev/docs/react-use-spring) | How to bind a short Hero hold to scroll while smoothing bounded fine-pointer input. | Track only the Part 02 wrapper, map one clamped progress value, and spring normalized pointer input back to zero. | Do not bind the whole page to a permanent camera effect or let the portrait chase the cursor. |
| [Motion accessibility guide](https://motion.dev/docs/react-accessibility) | Which effects must disappear for reduced motion. | Disable parallax and sticky scroll transforms; preserve content and opacity context. | Do not treat a shorter parallax as an adequate reduced-motion branch. |
| [Motion performance guide](https://motion.dev/docs/performance) | Which properties are safe to update continuously. | Keep pointer/scroll work on transform and opacity layers. | Do not animate layout dimensions, large shadows, filters, or font axes every pointer frame. |

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

### Checkpoint 02C interaction contract

The mobile menu is a **navigation plane**, not a dropdown, drawer, rounded
sheet, or generic stack of pill links:

- opening the 44×44px control replaces the visible Hero with a deep-navy
  full-viewport plane, a diagonal ceremony-blue field, and one focus-signal
  sweep derived from the Hero system;
- the top rail remains legible throughout: wordmark on the left, locale and a
  line-to-close control on the right;
- the only rows are `VCareer` with its verified `150+` proof and `Contact` with
  the real email address; no social placeholders, inert sections, or resume
  link are introduced;
- the two rows enter as a short sequence after the plane resolves. The close
  animation reverses the plane cleanly instead of dropping the layer from the
  DOM mid-transition;
- reduced-motion uses a short opacity transition and keeps exactly the same
  content and focus order.

Desktop interaction remains deliberately quieter than the portrait:

- `VCareer` performs one vertical text roll on hover/focus; its duplicate
  animation copy is `aria-hidden`;
- `Contact` keeps the focus-line underline rather than receiving a second
  signature effect;
- after real page scroll begins, the fixed rail condenses into a thin dark
  edge band with no rounded container or floating glass pill.

The accessibility/runtime gate for this checkpoint is exact:

- while open, the Header is the `role="dialog"` / `aria-modal="true"`
  container and every operable menu/header control remains its descendant;
- the Hero sibling is both visually obscured and `inert`; the dialog never
  sits inside the inert subtree;
- initial focus moves to VCareer, Tab and Shift+Tab wrap, Escape and background
  click close, and focus returns to the menu trigger;
- body scroll is locked for the complete open state, and viewport changes to
  desktop cannot leave an invisible menu lock behind;
- locale switching preserves the current V2 `intro` query so direct, slow,
  error, and reduced-motion review states survive a VI/EN switch.

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
- The role stays typographically static after its entrance; no idle font-axis
  motion competes with the pointer-depth and first-scroll signature.
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

### Checkpoint 02D depth contract

The approved 02C scene gains depth without changing its content hierarchy:

- the default wrapper is `132svh` on desktop and `128svh` on touch layouts;
  the Hero remains sticky for `100svh`, creating only `28–32svh` of authored
  scroll rather than pinning the visitor for a second full screen;
- during that short range, the portrait scales no further than `1.028`, the
  role rises no more than `24px`, the positioning/proof recede to `0.72`
  opacity, and the focus line travels toward the incoming lower boundary;
- a neutral navy boundary enters naturally from below because it occupies the
  final part of the wrapper. It contains no temporary heading, fake Part 03
  copy, or inert action; it passes behind role, focus, and interactive content
  so real links and their focus rings never become obscured;
- `?hold=0` disables only the sticky hold/boundary for a side-by-side review;
  the accepted Hero and pointer depth remain unchanged.

Fine-pointer depth is deliberately bounded:

- only `(pointer: fine) and (hover: hover)` devices at `900px+` attach pointer
  tracking;
- normalized pointer travel maps the portrait to at most `±8px` horizontally
  and `±5px` vertically; atmosphere and grid move less and in opposing planes;
- leaving the Hero springs all pointer layers back to their exact origin;
  touch/coarse-pointer input receives no pointer listener or substitute tilt.

Reduced motion keeps a normal `100svh` scene: no sticky extension, boundary
scrub, pointer parallax, or scroll transforms. The Header, Hero,
VCareer proof, locale behavior, and keyboard order remain identical.

### Checkpoint 02E portrait art-direction contract

The source remains `public/avatar.jpg`. It is a real square corridor portrait,
not raw material for generating a different person or a fictional scene. The
edit should make the existing architecture feel like layers of a system coming
into focus while keeping Tu immediately recognizable.

**Identity invariants**

- preserve the exact face, age, skin tone, hair, glasses, expression, gaze,
  body proportions, pose, hands, grey suit, white shirt, black tie, and corridor
  perspective;
- preserve natural skin and fabric texture; do not beautify, reshape, smooth,
  add accessories, replace clothing, or invent body/hand detail;
- no typography, UI graphics, logos, particles, fake light beams, synthetic
  circuitry, watermark, or additional objects;
- tonal recovery and color grading may change; identity and scene geometry may
  not.

**Desktop master — `2:3` portrait**

- keep Tu on the right half with the face in the upper third and enough lower
  torso for the `40vw × 100svh` clipped plane;
- retain the corridor repetition to the left as a real depth system, recovering
  the blown white areas into cool mineral detail rather than replacing them;
- move the environment toward Night Glass / Deep Lens Blue with restrained
  Focus Cyan in the window frames, while keeping skin neutral and the suit
  recognizably grey;
- reserve the left edge as a naturally darker seam into the Hero field, not a
  painted gradient or empty generated background.

**Mobile master — `4:5` portrait**

- preserve the same identity and moment, but use a tighter art-directed crop
  with the face in the upper-right quadrant;
- retain clean headroom behind the fixed Header and enough torso through the
  slanted lower image edge;
- let the bottom quarter become tonally quieter so the real role remains clear
  where the CSS composition overlaps it; do not bake text or a UI-shaped panel
  into the image.

The aesthetic risk is deliberately narrow: keep the recognizable green
corridor rhythm, but grade its shadow planes into the V2 navy/cyan system. This
uses something true in the original photograph instead of turning the portrait
into a generic cyberpunk render.

**Technical delivery and review**

- generated edits use identity-preserving edit mode and versioned filenames
  under `public/v2/hero/`; `avatar.jpg` is never overwritten. A second
  deterministic crop/grade candidate preserves every source pixel for direct
  identity comparison;
- desktop/mobile sources are switched at the existing `900px` composition
  breakpoint with a semantic `<picture>` built from Next.js `getImageProps`;
- the default and `?portrait=original` keep the accepted source unchanged;
  `?portrait=grade` opts into the source-preserving software treatment and
  `?portrait=ai` opts into the more cinematic generative treatment;
- review includes the original, both generated masters at 100%, and rendered
  Hero crops at 375×812, 899×800, 900×800, 1024×768, and 1440×900;
- accept only if face, glasses, hands, suit seams, and corridor lines survive
  close inspection and the new crop materially improves the actual Hero.

### Reduced motion

- Intro handoff becomes a short crossfade.
- No sticky scrub, parallax, or spatial menu transition.
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

- Add bounded fine-pointer parallax while keeping the accepted role static.
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

## Checkpoint 02C implementation record

Implemented on 12 August 2026, approved by the user, and committed as
`c5d57ac`:

- desktop VCareer text roll, Contact/focus states, fixed header, and the
  scroll-triggered thin edge-band condensation;
- VCareer roll viewport remains transparent and carries no text shadow, so it
  does not read as a selected tab or filled control beside Contact;
- mobile 44×44px line-to-close control and full-screen navigation plane with
  only the localized VCareer case study and real email destination;
- locale query preservation, modal semantics, initial focus, cyclic keyboard
  focus, Escape/background close, focus return, body scroll lock, resize
  cleanup, and an inert Hero background;
- explicit spatial and reduced-motion enter/exit paths through Motion
  `AnimatePresence`.

Checkpoint verification:

- `31/31` Vitest tests, TypeScript validation, diff check, and production build
  pass;
- the production route is `62 kB` with `173 kB` First Load JS, approximately
  `+1.5 kB` route code and `+1 kB` First Load JS over the approved 02B build;
- rendered 320×700, 375×812, and 1440×900 checks show no horizontal overflow;
  every interactive mobile Header/menu target is at least 44px tall and wide;
- VI→EN preserves `?intro=0`; full intro, direct entry, and the debug
  reduced-motion path all land on the same final Header/Hero;
- closed mobile, open mobile, and desktop axe runs report zero WCAG A/AA
  violations; console inspection reports zero warnings or errors;
- server-rendered HTML returns HTTP 200 with the canonical role, positioning,
  VCareer proof/link, and `mailto:` action present without relying on hydration.

## Checkpoint 02D implementation record

Implemented on 12 August 2026, approved after removing the optional role
width-axis breath, and committed as `9e0fc8a`:

- a `132svh` desktop / `128svh` compact wrapper holds the accepted Hero for a
  short first-scroll scene while its `100svh` stage remains sticky;
- the portrait scales from `1` to `1.028`, the role rises by `24px`, supporting
  copy rises by `14px` and recedes to `0.72`, while the focus signal moves
  toward a neutral lower boundary;
- the boundary is part of the Hero layer stack: it crosses the portrait and
  atmosphere but remains behind the role, signal, real links, and their focus
  rings;
- fine-pointer depth is active only at `900px+`: portrait travel is clamped to
  `±8px` / `±5px`, atmosphere and grid move less in the opposing direction,
  and every plane springs back to its origin on pointer exit;
- `?hold=0` removes only the hold/boundary for direct comparison, while
  `?intro=reduced` and OS reduced motion remove the sticky extension, pointer
  response, boundary, and scroll transforms;
- post-review refinement removes the role width-axis breath completely; the
  role remains static after its existing Intro/Hero entrance.

Checkpoint verification:

- `37/37` Vitest tests, TypeScript validation, diff check, and the production
  build pass;
- `/[locale]/v2` is `66.4 kB` with `178 kB` First Load JS, approximately
  `+4.4 kB` route code and `+5 kB` First Load JS over the approved 02C build;
- rendered checks at 375×812, 899×800, 900×800, 1024×768, and 1440×900 show no
  horizontal overflow or clipped role lines; the authored hold adds `227px`
  mobile and `288px` desktop scroll in the review viewports;
- mobile keeps pointer depth disabled, all visible Header targets at least
  44×44px, and the approved menu focus/lock/Escape behavior intact;
- full Intro and direct entry both settle into the active hold; the explicit
  and OS reduced-motion paths render a normal-height static Hero;
- fresh local navigation reports zero console warnings/errors, and axe reports
  zero automatic violations at desktop start/end and mobile start. Its
  contrast rule remains incomplete on gradient/image-backed text and stays a
  manual 02F finish-gate item;
- server-rendered HTML returns HTTP 200 with the role, positioning, VCareer,
  and email evidence present before hydration.

## Checkpoint 02E implementation record

Implemented on 12 August 2026 and intentionally left uncommitted for portrait
selection:

- `grade` is a deterministic Sharp crop/exposure/saturation treatment of the
  original pixels: desktop `960×1440` / `103,582 B`, mobile `1000×1250` /
  `90,090 B`; it cannot alter face, hands, clothing, or architecture;
- `ai` uses the built-in image edit workflow with the identity-preservation
  brief above: desktop `1024×1536` / `151,916 B`, mobile `1000×1250` /
  `163,940 B` after WebP delivery conversion;
- the generated prompt explicitly locks face, age, skin tone, hair, glasses,
  expression, gaze, body, pose, hands, suit, shirt, tie, seams, and corridor;
  only crop-safe framing, exposure, restrained navy/cyan grading, and fine
  grain are requested;
- a Next.js `getImageProps` `<picture>` selects one optimized mobile or desktop
  source at the existing `900px` composition boundary. It never downloads both
  masters for one viewport;
- the approved original remains the default. Review queries select `grade` or
  `ai`, invalid values fall back to `original`, and locale changes preserve
  `intro`, `hold`, and `portrait` together.

Checkpoint verification:

- `41/41` Vitest tests, TypeScript validation, diff check, and production build
  pass;
- `/[locale]/v2` is `66.9 kB` with `178 kB` First Load JS: approximately
  `+0.5 kB` route code and no rounded First Load JS increase over 02D;
- 375×812, 899×800, 900×800, 1024×768, and 1440×900 load exactly the intended
  source, show no horizontal overflow or clipped role, and keep the scroll hold
  unchanged;
- direct, full Intro, reduced-motion, cached-image hydration, and forced image
  failure all resolve from `pending` to a usable `ready` or `error` state;
- desktop start/end and mobile axe checks report zero automatic violations;
  fresh local navigation reports zero console warnings/errors;
- rendered self-review finds `grade` completely identity-faithful but tighter
  and brighter on desktop. `ai` uses the corridor depth and V2 tonal system more
  successfully, but it reconstructs small skin/hair details when inspected at
  100%. Neither candidate becomes the default without explicit user approval;
  desktop/mobile may also be mixed if the user prefers different candidates per
  breakpoint.

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
public/v2/hero/*                       # review candidates; commit only after 02E approval
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
