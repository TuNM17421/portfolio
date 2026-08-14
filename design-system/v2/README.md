# Portfolio V2 — Motion-forward redesign

> **Status:** Parts 01–07 and 08A–08B complete; Part 08C implemented for owner review
> **Branch:** `redesign/portfolio-v2`
> **Detailed scope in this checkpoint:** Part 08C VCareer semantic architecture trace and product-state boundary
> **Implementation status:** Part 08A is committed at `744da4f`; Part 08B is committed at `88312aa`; Part 08C awaits owner approval

## Objective

Turn the existing evidence-led engineering portfolio into a cinematic,
motion-forward experience that makes a strong first impression without losing
the facts a recruiter needs to verify Nguyen Manh Tu's work.

The redesign is not constrained to minimal motion. It may use long-form
choreography, full-viewport scenes, shared-element transitions, scroll-linked
motion, image treatment and rich typography. Motion must still render smoothly,
preserve content semantics and provide a reduced-motion path.

## Product job

The primary visitor is a recruiter, engineering manager or technical founder.
Within the first scene they must understand:

1. who Nguyen Manh Tu is;
2. the exact role: `Software Engineer · AI Engineer`;
3. that VCareer is the flagship proof of work;
4. where to inspect that proof or make contact.

The experience can be theatrical, but prominent claims remain tied to verified
repository content: 2+ years of experience, 150+ VCareer pilot learners,
direct ownership of LiveKit/WebRTC and CV–JD/JD Builder work, and the Track 4
runner-up result.

## Review protocol

The redesign is intentionally split into reviewable parts.

1. Write and approve the part-specific contract.
2. Implement only that part on this branch.
3. Run its automated and rendered finish gate.
4. Start a local preview with forced states for user review.
5. Refine the same part until the user explicitly approves it.
6. Commit the completed part and only then begin the next part.

No later part is implemented merely because an earlier plan exists. A visual
rejection affects one isolated part instead of requiring a whole-site rollback.

## Evidence audit

| Evidence                                                                                                                                                    | Transfer                                                                                                                                                | Do not copy                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [Swaraj Portfolio '25](https://portfolio-25-phi.vercel.app/?ref=save.design)                                                                                | Full-viewport portrait, edge-aligned navigation, oversized role typography, staged loader, synchronized loader-to-hero reveal and a pinned first scene. | Namaste copy, five equal curtain panels, exact typography, colors, project structure, imagery or seven-second timing. |
| [Swaraj deployed animation bundle](https://portfolio-25-phi.vercel.app/assets/index-BuG9GojC.js)                                                            | The loader waits for image readiness, then reveals the portrait while hero characters and words enter together.                                         | Loading every below-fold image before showing the hero, fake product claims or its exact GSAP timeline.               |
| [Dylan Brouwer — UIZZE evidence](https://singapore.objective.company/design-media/e3/e384ab8122d78f72aee5b0119f87f916bafef2cffcd4e70eb2e63b5b608bd7a3.webp) | Typography acts as architecture; one visual anchor carries the scene.                                                                                   | The wording, grayscale identity, monitor object or exact centered composition.                                        |
| [Modal — UIZZE evidence](https://singapore.objective.company/design-media/17/17f44d04ba09f3ed4122e77e32e11bd3e128d6c0be40c4c5f96034f67fac85dd.webp)         | A single luminous object gets the visual spend while navigation and copy remain disciplined.                                                            | The green cube, customer logo wall or Modal's brand language.                                                         |
| [Vercel — UIZZE evidence](https://singapore.objective.company/design-media/42/4202e89300304207ac9eb08c9c45f93785fb5c9cfa9491e60d1a74096280bfbd.webp)        | Proposition, focal object and technical specialty occupy distinct zones in one viewport.                                                                | Triangle branding, blank-space ratios, product copy or logo strip.                                                    |

Fresh catalogue browsing at `uizze.com` timed out during this checkpoint, so
the three repository-recorded UIZZE captures above were re-opened and visually
inspected instead.

## Visual direction — “Systems in Focus”

The opening uses two approved portraits: the cool ceremony portrait in
`avatar-graduation.jpg` for the Intro and the corridor portrait in `avatar.jpg`
for the static Hero. Together with Nguyen Manh Tu's work on backend/realtime
systems, the page should feel like layers of a system coming into focus:
planes, masks and signals align before revealing the portrait and product
evidence.

This is deliberately different from a generic terminal/cyberpunk portfolio.
There are no decorative command prompts or invented system diagnostics. The
structural language comes from the portrait's real focal planes and real
engineering specialties in the content. It avoids camera-viewfinder clichés:
one focus line is enough; there are no decorative reticles or fake diagnostics.

### Signature

The exact `Nguyen Manh Tu` wordmark is assembled during the intro. Its baseline
extends into a horizontal focus signal that moves the portrait from soft to
sharp and then expands into the reveal mask. The same full-name wordmark moves
into its compact header position. This is the one transition the opening should
be remembered by.

### Palette proposal

| Token          | Hex       | Use                                                   |
| -------------- | --------- | ----------------------------------------------------- |
| Night glass    | `#071219` | Loader and deepest backdrop                           |
| Deep lens blue | `#0B2738` | Full-viewport image grade and panels                  |
| Ceremony blue  | `#4B7188` | Secondary planes sampled from the portrait background |
| Focus cyan     | `#6BD7D0` | Active signal, focus and primary detail               |
| Mineral white  | `#EDF4F5` | Primary text over dark imagery                        |
| Warm portrait  | `#D3A58F` | Photo highlight reference; not a UI fill color        |

The palette is art-directed and dark because it is built around a cinematic
portrait. It is not the old dark-theme token set and it is not a simple
violet-to-cyan replacement.

### Typography proposal

| Role               | Family             | Reason                                                                                                   |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------------------------- |
| Display / wordmark | `Anybody` variable | Supports Vietnamese and exposes width/weight axes, allowing the type itself to participate in the intro. |
| Body / navigation  | `Be Vietnam Pro`   | Strong Vietnamese glyph design and compact readability over imagery.                                     |
| Technical metadata | `IBM Plex Mono`    | Precise utility labels without turning the whole page into a terminal aesthetic.                         |

All three families are available through the installed Next.js font metadata
with Vietnamese subsets where essential. `Anybody` width animation is confined
to the opening and fixed-size display containers to avoid layout movement.

### Image language

- One hero portrait is the first scene's dominant object.
- Soft/sharp separation, grain, vignette and color separation support depth;
  they do not obscure the face, eyes, glasses or text.
- Product screenshots remain literal evidence in later parts and are not
  transformed into abstract decoration.
- Desktop and mobile use art-directed crops rather than one compromise crop.

### Motion language

- Heavy motion is allowed; scattered, unrelated motion is not.
- The opening is one continuous sequence: identify → prepare → reveal → settle.
- Later scroll scenes may pin, scrub, mask, layer and use depth.
- Pointer motion supplements the composition and never gates information.
- Motion is authored primarily with Motion for React so loader, shared layout,
  exit and later scroll-linked effects use one orchestration model.
- A second animation engine is added only if a later approved scene has a
  concrete interaction Motion cannot express cleanly.

Relevant implementation references:

- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)
- [Motion shared layout animation](https://motion.dev/docs/react-layout-animations)
- [Motion scoped timelines with useAnimate](https://motion.dev/docs/react-use-animate)
- [Motion scroll-linked animation](https://motion.dev/docs/react-scroll-animations)
- [Motion reduced-motion adaptation](https://motion.dev/docs/react-use-reduced-motion)
- [Next.js loading UI and streaming](https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming)

## Part roadmap

| Part | Scope                                           | User review artifact                                      | Status                                                       |
| ---- | ----------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| 00   | Evidence, direction and contracts               | These documents                                           | Approved                                                     |
| 01   | Cinematic Intro Loader                          | Forced full/fast/error/reduced-motion local URLs          | Approved · `a0687e2`                                         |
| 02   | Header + full-viewport Hero                     | Desktop/mobile screenshots and live pointer/scroll review | Complete; `ai-tidy` is the default and 02F passed            |
| 03   | Hero-to-About transition + identity story       | Full first two-scene scroll capture                       | Complete · `37de357`                                         |
| 04   | VCareer flagship showcase                       | Project transition and evidence hierarchy                 | Complete · `050f023`                                         |
| 05   | ScholarAI evidence + backend archive            | Desktop/mobile evidence browsing and source topology      | Complete · `274358b`                                         |
| 06   | Experience + Awards                             | Timeline and event-gallery sequence                       | Complete · `8940bf7`                                         |
| 07   | Skills + Contact + Footer                       | Final conversion flow                                     | Complete · `a084836`                                         |
| 08   | Case-study visual migration + route transitions | Homepage-to-case-study continuity                         | 08A · `744da4f`; 08B · `88312aa`; 08C awaiting review        |
| 09   | Cross-page finish gate                          | Full responsive, accessibility and motion audit           | Not planned in detail                                        |

Detailed contracts for Parts 01–08 live beside this file. Later parts receive
the same research/contract treatment only after the preceding part is accepted.

## Confirmed user inputs

- The visible wordmark is exactly `Nguyen Manh Tu`.
- The Intro source is `public/avatar-graduation.jpg`; the accepted static Hero
  source is `public/avatar.jpg` with a 60/40 dark-field-to-image composition.

## Confirmed design decisions

1. Use one art-directed dark V2 palette and remove the theme toggle from V2.
2. Play the full intro once per browser tab/session; use a short transition on
   repeat navigation, with `?intro=1` available to force the full sequence.
