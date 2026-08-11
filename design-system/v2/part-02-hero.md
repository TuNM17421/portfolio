# Part 02 — Header + Full-viewport Hero

> **Status:** Planned, awaiting approval
> **Dependency:** Part 01 handoff and an approved temporary/final Hero image crop

## Design contract

| Field | Decision |
| --- | --- |
| Screen job | Establish Nguyen Manh Tu's identity and exact role, then move a hiring visitor directly to the flagship VCareer proof. |
| Primary action | Open the localized VCareer case study. Contact is the secondary action. |
| Content hierarchy | 1. Portrait and name. 2. Exact canonical role. 3. Concise specialization. 4. VCareer/contact actions. 5. Compact verified evidence. |
| Navigation | Edge-aligned `Nguyen Manh Tu / 2026` wordmark, Work, Experience, Awards and Contact; locale remains available. No Resume action unless a real PDF exists. |
| Visual language | Art-directed close portrait fills the scene; oversized variable display type anchors the lower-left; summary/actions occupy a quieter lower-right zone; one focus line and layered sharpness follow the portrait's optical character. |
| Motion model | Intro shared-element handoff, portrait depth settle, masked role reveal, staggered supporting copy, pointer depth on capable devices and a sticky first-scene scroll phase. |
| Required states | Intro handoff, direct load without intro, portrait loading/error, mobile menu open/closed, VI/EN, keyboard, touch, no-JS and reduced motion. |
| Acceptance criteria | Name/role are continuously available; VCareer CTA is real; image and text stay legible at all target widths; direct and intro-assisted loads land in the same final composition. |

## Content proposal

The exact canonical title remains unchanged in both locales:

```text
Backend Software Engineer · AI Engineer
```

Proposed concise positioning:

- **VI:** `Xây backend tin cậy và trải nghiệm AI thời gian thực — từ hệ thống Java/Spring đến WebRTC và matching CV–JD.`
- **EN:** `Building reliable backends and realtime AI experiences — from Java/Spring systems to WebRTC and CV-to-JD matching.`

Proposed actions:

- **VI:** `Xem case study VCareer` · `Liên hệ`
- **EN:** `View VCareer case study` · `Contact`

Verified evidence appears as structural metadata, not dashboard cards:

```text
02+ YEARS        150+ PILOT LEARNERS        TRACK 4 · RUNNER-UP
```

## Desktop composition

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Nguyen Manh Tu / 2026     WORK   EXPERIENCE   AWARDS   CONTACT VI/EN│
│                                                                      │
│                  processed full-bleed portrait                       │
│              cool ceremony blue / focal planes / grain               │
│                                                                      │
│ BACKEND SOFTWARE                 Building reliable backends and       │
│ ENGINEER · AI ENGINEER           realtime AI experiences…             │
│                                  [VIEW VCAREER] [CONTACT]              │
│ 02+ YEARS   150+ LEARNERS        TRACK 4 · RUNNER-UP       SCROLL ↓  │
└──────────────────────────────────────────────────────────────────────┘
```

The portrait subject sits right of center after the secondary person is removed
and the ceremony background is extended. The softer left background creates
negative space for the role, while the sharper glasses/eyes remain the focal
anchor. The composition should feel like one poster, not a two-column SaaS hero.

## Mobile composition

```text
┌──────────────────────────────┐
│ Nguyen Manh Tu   VI/EN  MENU │
│                              │
│      portrait / face         │
│      centered upper 55%      │
│                              │
│ BACKEND SOFTWARE             │
│ ENGINEER · AI ENGINEER       │
│                              │
│ Reliable backend + realtime  │
│ AI positioning               │
│ [VIEW VCAREER]  [CONTACT]    │
│ 150+ LEARNERS       SCROLL ↓ │
└──────────────────────────────┘
```

Mobile does not merely stack the desktop regions. The crop recenters the face,
the role occupies at most three display lines, only the strongest evidence is
shown in-scene, and remaining proof appears immediately in the next section.

## Header behavior

- Transparent and integrated into the image at scroll position zero.
- The compact `Nguyen Manh Tu` wordmark is the destination of the loader's
  shared-element transition.
- Navigation text uses the body face; the mark uses `Anybody`.
- On downward scroll, the desktop header condenses into a narrow edge rail; on
  upward scroll it expands. This behavior is not implemented until the Hero
  composition is approved.
- Mobile exposes a real menu button. Locale remains visible without opening the
  menu.
- Recommended V2 direction is a single art-directed dark palette, so the old
  theme toggle is omitted from this header. This requires explicit approval.

## Hero motion choreography

### Loader handoff

1. The loader's focus line sweeps across the portrait, changing the image from
   soft to sharp before the signal mask uncovers the final grade.
2. The large `Nguyen Manh Tu` wordmark moves to the header position using
   `layoutId`.
3. Portrait begins at scale `1.10–1.14` with controlled blur/grain separation
   and settles to its resting frame.
4. Role lines reveal through independent clipping masks.
5. Summary and actions enter last, after the focal portrait and role are clear.

### Idle scene

- A very slow depth drift may separate portrait, ceremony background and grain
  layers.
- Pointer-capable devices receive subtle perspective/parallax tied to cursor
  position. The face never swings or rotates unnaturally.
- Headline width may breathe once after entry through `Anybody`'s `wdth` axis;
  it does not loop continuously.
- CTA text can roll vertically on hover/focus, with both text copies hidden
  correctly from assistive technology.

### First scroll phase

The section uses approximately `120–140svh` with a `100svh` sticky scene.
During the short hold:

- portrait scale increases slightly;
- role lines separate laterally by a small amount;
- signal line becomes the visual boundary leading into Part 03;
- scroll cue resolves into the next section label.

Part 02 implements and reviews this self-contained scroll phase against a plain
next-section boundary. Part 03 later replaces that boundary with the approved
About transition.

### Reduced motion

- Loader handoff becomes a crossfade.
- No pointer parallax, font-width animation or sticky scrub.
- Final Hero composition and every action remain identical.

## Hero image post-processing brief

### Current asset assessment

- The user has selected the current working copy of
  `public/avatar-graduation.jpg` as the Hero source.
- The selected file is 1280×1159 and provides a strong face, glasses, suit and
  upper-body crop, but very little clean negative space.
- A second person occupies the right side and must be removed during processing;
  the surrounding blue-white ceremony background then needs reconstruction and
  outpainting for the final desktop/mobile compositions.

### Required processing

1. Preserve Tu's face, glasses, hair, skin texture and clothing identity. AI
   may extend the scene but must not beautify or reconstruct facial features.
2. Remove the secondary person on the right without changing Tu's shoulder,
   jawline or glasses; rebuild the existing ceremony background rather than
   inventing an unrelated futuristic environment.
3. Produce separate desktop and mobile compositions:
   - desktop master around 2400×1600, subject in the right-middle third;
   - mobile master around 1400×1900, face centered in the upper-middle region.
4. Grade the environment toward Deep Lens Blue / Ceremony Blue while keeping
   skin highlights natural and warmer than the background.
5. Add controlled depth: background blur, subject separation, vignette and
   fine grain. Do not blur glasses/eyes or create an artificial halo.
6. Export AVIF and WebP derivatives plus a tiny blur placeholder; keep the
   approved master outside destructive optimization.

### Asset approval gate

The processed desktop and mobile images are reviewed side-by-side with their
original before replacing any current asset. Hero visual approval remains
provisional while it uses the unprocessed 1280×1159 source.

## Planned implementation boundary

```text
src/components/v2/site-header-v2.tsx
src/components/v2/mobile-nav-v2.tsx
src/components/v2/hero/hero-v2.tsx
src/components/v2/hero/hero-v2.module.css
src/components/v2/hero/hero-motion.tsx
src/app/[locale]/v2/page.tsx        # isolated preview route during migration
messages/en.json
messages/vi.json
```

The existing V1 homepage and VCareer route remain intact while `/[locale]/v2`
is under review.

## Part 02 finish gate

- Final screenshots at 375×812, 768×1024, 1024×768 and 1440×900.
- Live review of intro handoff, direct load, pointer depth and first scroll.
- VI and EN preserve the exact canonical role without overflow.
- Portrait crop keeps the face visible and text contrast remains readable over
  every image region.
- VCareer and Contact actions work; no Resume or other inert action is shown.
- Header and mobile menu are keyboard/touch usable with 44px targets.
- Image-error fallback keeps the full content hierarchy usable.
- No-JS renders the final Hero without entrance dependencies.
- Reduced-motion renders the same final composition without spatial motion.
- User approves Header/Hero before Part 03 research or implementation begins.

## Decisions required before implementation

1. Approve the single dark art-directed V2 palette and removal of the V2 theme
   toggle.
2. Approve the proposed positioning copy, or provide the exact replacement.

Confirmed inputs: the wordmark is exactly `Nguyen Manh Tu`, and the Hero source
is `public/avatar-graduation.jpg`.
