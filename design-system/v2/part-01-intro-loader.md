# Part 01 — Cinematic Intro Loader

> **Status:** Implemented, awaiting local visual approval
> **Implementation gate:** Do not begin Part 02 until the live Part 01 sequence is approved

## Design contract

| Field | Decision |
| --- | --- |
| Screen job | Turn the unavoidable preparation of the critical hero assets into a memorable introduction to Nguyen Manh Tu. |
| Primary user and action | A first-time visitor watches the identity assemble, or chooses `Skip intro` and reaches the Hero immediately. |
| Content hierarchy | 1. `Nguyen Manh Tu` identity. 2. Backend / Realtime / AI specialties. 3. Honest readiness progress. 4. Seamless reveal into the Hero. |
| Visual language | Full-viewport Night Glass field, variable-width full-name wordmark, one cyan focus line, layered focal planes and restrained metadata. No spinner, terminal window, viewfinder reticle or generic code rain. |
| Motion model | Motion `useAnimate` orchestrates the timeline; `AnimatePresence` owns exit; a shared `layoutId` hands the `Nguyen Manh Tu` wordmark to the header. |
| Required states | First visit, cached/fast assets, slow assets, portrait error, maximum-time fallback, forced replay, skip, no JavaScript and reduced motion. |
| Responsive behavior | Same narrative at all widths; typography, rail count and metadata placement change. Mobile uses fewer simultaneous layers and no pointer-driven effect. |
| Acceptance criteria | No hero flash before the intro; progress reaches completion only after critical readiness or fail-safe; exit lands exactly on the Hero; no stuck scroll/focus; all forced states are reviewable locally. |

## What the reference actually does

Source inspection and a fresh 1440×900 capture found this sequence:

1. `Namaste` enters and leaves.
2. Loading copy appears after roughly 4.5 seconds.
3. Seventeen page images begin loading and the counter follows completed image
   count.
4. At 100%, five full-height columns exit upward while the portrait scales down
   and hero characters/words reveal.
5. In the measured run, 100% appeared around the seventh second.

The staged introduction and synchronized reveal are useful. Loading every
below-fold image, the exact five-column curtain, the greeting, copy and timings
are not transferred.

## Technical boundary

This opening is not implemented as `app/[locale]/loading.tsx`.

Next.js `loading.tsx` is a Suspense fallback for route segments whose server
content is still resolving. The localized homepage is statically generated, so
that fallback would often disappear before a cinematic sequence could play.
The V2 intro is instead a client-orchestrated overlay around already
server-rendered Hero content.

Only critical first-scene resources gate the reveal:

- `Anybody` / `Be Vietnam Pro` font readiness;
- the art-directed Hero portrait decode or error result;
- two animation frames after hydration so layout measurement is stable.

Below-fold screenshots continue loading independently.

## State machine

```text
boot
  ├─ no JS ───────────────────────────────> hero visible
  ├─ reduced motion ─> short identity slate ─> done
  ├─ repeat session ─> short signal wipe ───> done
  └─ first visit
       identify ─> prepare ─> ready/fallback ─> reveal ─> done
                         └─ skip ────────────────────────> done
```

The root document receives a state attribute:

```text
data-intro="pending | running | exiting | complete | skipped"
```

An early inline bootstrap enables the overlay before first paint. The same
bootstrap starts an eight-second fail-safe that removes the visual block even
if React hydration or the animation runtime fails. With JavaScript disabled,
the overlay is never enabled and SSR Hero content stays visible.

## Proposed full timeline

The full first-session sequence has a minimum authored duration of about 4.2
seconds. Slow critical assets may extend the prepare stage, but the complete
visual block may never exceed 8 seconds.

| Time | Stage | Visual and behavior |
| ---: | --- | --- |
| 0.00–0.45s | Boot | Night field appears; small `PORTFOLIO / 2026` and locale metadata resolve at opposing edges. |
| 0.45–1.55s | Identify | Large `Nguyen Manh Tu` enters from a clipped baseline in three coordinated word groups. `Anybody` width moves from compressed to expanded without changing the text value. |
| 1.20–2.40s | Specialize | `BACKEND`, `REALTIME`, `AI` lock onto the wordmark baseline one by one. The extended baseline is also the readiness/focus line. |
| 1.55s–ready | Prepare | Progress advances from measured font/image readiness. It may hold below completion while waiting. A `Skip intro` control becomes available. |
| ready–ready+0.30s | Commit | Progress reaches 100; the rail flashes once and aligns with the Hero horizon. |
| +0.30–1.25s | Reveal | The focus line sweeps the processed portrait from soft to sharp, then expands into a directional mask. The full `Nguyen Manh Tu` wordmark travels to the header using shared layout. |
| +0.65–1.70s | Hero handoff | Portrait depth settles; canonical role, supporting copy and actions enter in the Hero's own timeline. Intro unmounts after the shared transition completes. |

The intro and Hero timelines overlap at the handoff. There is no blank frame
between the two parts.

## Progress behavior

The percentage represents critical first-scene readiness rather than all page
downloads:

| Readiness input | Weight |
| --- | ---: |
| Intro hydrated and measured | 15% |
| Display/body fonts ready or failed safely | 30% |
| Hero portrait decoded or failed safely | 55% |

Motion may interpolate between actual checkpoints for visual continuity, but it
does not display 100% before all checkpoints have resolved or the maximum-time
fallback is invoked.

## Wireframes

Desktop:

```text
┌────────────────────────────────────────────────────────────────────┐
│ PORTFOLIO / 2026                                      VI · EN      │
│                                                                    │
│                       Nguyen Manh Tu                               │
│                                                                    │
│              BACKEND ───── REALTIME ───── AI                       │
│              ████████████████████──────────  74                    │
│                                                                    │
│ BACKEND · REALTIME · AI                          SKIP INTRO          │
└────────────────────────────────────────────────────────────────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ PORTFOLIO / 26       VI  │
│                          │
│     Nguyen Manh Tu       │
│                          │
│ BACKEND                  │
│ REALTIME ─────────── AI  │
│ ███████████──────  74    │
│                          │
│ SKIP INTRO               │
└──────────────────────────┘
```

## Interaction and accessibility

- The intro is an opening scene, not an opaque fake loading spinner.
- `Skip intro` is a real button, at least 44×44 CSS pixels, available to
  pointer and keyboard users after the identity has appeared.
- Escape also skips once the sequence is running.
- Progress text uses a polite status announcement without reading every frame
  or every percentage change.
- The Hero remains in server HTML. While the visual intro is active, its
  pointer/focus interaction is suppressed to prevent invisible focus movement.
- Scroll is locked only while the full-screen intro is active and always
  restored in cleanup, skip, error and fail-safe paths.
- `prefers-reduced-motion` replaces width changes, travel and mask expansion
  with a static wordmark slate and short opacity transition of at most 500ms.

## Session and QA controls

Recommended behavior:

- Full sequence once per browser tab/session.
- Later client navigations use no intro.
- A hard refresh in the same session uses a short 600–800ms signal wipe.
- `?intro=1` forces the full sequence for review.
- `?intro=0` bypasses the sequence for content/performance QA.
- Development-only query states expose slow, image-error and reduced-motion
  behavior without changing production data.

## Implemented boundary

```text
src/app/[locale]/v2/page.tsx
src/components/v2/portfolio-v2-shell.tsx
src/components/v2/portfolio-v2-shell.module.css
src/components/v2/intro/intro-sequence.tsx
src/components/v2/intro/intro-sequence.module.css
src/lib/v2/intro-readiness.ts
src/lib/v2/intro-readiness.test.ts
messages/en.json
messages/vi.json
```

The `motion` package is added once and used as the primary animation runtime for
both Part 01 and Part 02.

## Part 01 finish gate

- Full sequence reviewed at 375×812, 768×1024 and 1440×900.
- No horizontal overflow or exposed page edge during masks/transforms.
- Cache-disabled and cached runs both complete.
- Fast 3G/slow-image simulation holds progress and exits by the fail-safe.
- Broken portrait still reveals a usable gradient Hero.
- Skip button, Escape, scroll cleanup and focus behavior pass.
- No-JS shows Hero immediately.
- Reduced-motion path contains no spatial/width/parallax animation.
- The loader can be forced repeatedly without stale session state.
- User approves the live sequence before Part 02 implementation starts.
