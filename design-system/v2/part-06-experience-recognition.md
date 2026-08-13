# Part 06 — Experience + recognition

> **Status:** Checkpoints 06A–06D approved and committed; 06E not started
> **Branch:** `redesign/portfolio-v2`
> **Review artifact:** `/vi/v2?intro=0#career` and `/en/v2?intro=0#career`
> **Forced motion states:** `?intro=0&career=education#career`, `?intro=0&career=fpt#career`, `?intro=0&career=ai-program#career`, and `?intro=0&career=static#career`
> **Recognition review states:** `?intro=0&recognition=transition#recognition`, `?intro=0&recognition=ready#recognition`, `?intro=0&recognition=loading#recognition`, `?intro=0&recognition=error#recognition`, `?intro=0&recognition=static#recognition`, `?intro=0&recognition=ceremony#recognition`, `?intro=0&recognition=hackathon#recognition`, and `?intro=0&recognition=career-services#recognition`
> **Internal direction name:** **Career Trace → Recognition Stage** — not rendered as marketing copy

## Decision summary

Part 06 gives a recruiter one compact career record after the long-form project
evidence. It must connect the backend foundation to Tu's current AI direction,
then show externally recognised outcomes without repeating the VCareer case
study or turning seven event photographs into a long gallery.

```text
Part 05 system archive
        │
        └── 06 / career trace
              2019—2024  FPT University
              2024—2026  FPT Software — primary professional record
              2026       VinUniversity × Vingroup practical AI program
                           │
                           └── recognition stage
                                 VCareer — Track 4, 2nd Prize
                                 WonderLens — Track 1, 1st Prize (one line only)
                                 VCareer — featured at VinUniversity
```

- **FPT Software is the dominant career record.** The copy may describe API,
  asynchronous processing, local infrastructure, sub-team coordination, and
  code review. The previous `+20%` and `+30%` claims are removed everywhere;
  they are not de-emphasised or moved into fine print.
- **Education and AI training are compact endpoints.** They establish the
  2019–2026 direction without competing with professional work.
- **VCareer is the primary recognition.** The page may state Track 4 2nd Prize
  and `$5,000 in OpenAI API credits`.
- **WonderLens remains one recognition line.** It may state Track 1 1st Prize
  at Codex Community Hackathon Hanoi 2026, but it receives no project scope,
  repository action, screenshot, or case-study copy until the owner supplies
  the finished product and new media.
- **Photography is documentary evidence.** `vinuni-ceremony.jpg` is the future
  default stage image. `hackathon.jpg` includes organisers;
  `stakeholder-congrats-2.jpg` includes VinUniversity's career-services team.

## Reference evidence

References transfer information hierarchy and interaction behaviour only. Do
not copy branding, typography, imagery, proprietary copy, or exact composition.

| Reference                                                                    | Transfer                                                                                                      | Do not copy                                                                     |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Dylan Brouwer — About](https://www.dylanbrouwer.design/about)               | A recognition ledger with stable columns, terse metadata, and rows that can be scanned without opening cards. | The black-and-white identity, exact columns, award count, or twelve-row length. |
| [Cosmos](https://www.cosmos.so/)                                             | Treat each photograph as a sourced record with a caption rather than anonymous decoration.                    | Its masonry density, social-product controls, or collection mechanics.          |
| [Tech Barcelona](https://www.techbarcelona.com/en/)                          | One documentary image field beside structured facts, separated by explicit rules.                             | Its brand palette, promotional language, or editorial page structure.           |
| [Swaraj Portfolio '25](https://portfolio-25-phi.vercel.app/?ref=save.design) | Concentrate recognition into one composed scene after the work narrative.                                     | The portrait collage, tiny proof cards, exact dark composition, or typography.  |

## Design contract

| Field                   | Decision                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Screen job              | Let a recruiter understand Tu's 2019–2026 progression and verify the three recognition records without rereading project sections.                                                                                                                                                                                                                     |
| Primary user and action | A recruiter or engineering manager scans the professional record first, then continues to a concise recognition stage. No action is required in 06A.                                                                                                                                                                                                   |
| Content hierarchy       | 1. Part 06 rail and 2019–2026 axis. 2. FPT Software role and responsibilities. 3. FPT University and practical AI training. 4. VCareer Track 4 result. 5. One-line WonderLens result. 6. VinUniversity featured-project recognition.                                                                                                                   |
| Navigation and controls | Real `#career` and `#recognition` anchors. Header navigation is added only in 06E. The future image selector is explicit and user-controlled; 06A exposes no inert controls.                                                                                                                                                                           |
| Visual language         | Continue the Part 05 mineral sheet using `#edf4f5`, deep ink `#071219`, cyan `#176f6b`, signal blue `#0060f0`, Anybody display, Be Vietnam Pro body, and IBM Plex Mono record labels. Square rules and time codes replace generic cards.                                                                                                               |
| Signature               | A single data trace connects the Part 05 archive to ordered career records and later drops into the dark recognition stage. In 06B the handoff, year axis, and vertical trace draw as one reversible scroll-linked signal.                                                                                                                             |
| Required states         | Full VI/EN content, 320px through wide desktop, no JavaScript, and reduced motion. Recognition image loading/error and selector states begin in 06C–06D.                                                                                                                                                                                               |
| Responsive behaviour    | Desktop uses a wide ledger with a stable period column and a dominant FPT row. Mobile becomes a compact vertical record, preserves dates and all responsibility copy, and does not rely on hover or sticky positioning.                                                                                                                                |
| Evidence used           | Existing Experience/Awards copy, owner corrections in this thread, seven local award images, event documentation, and the four interface references above.                                                                                                                                                                                             |
| Forbidden defaults      | Rounded timeline cards, equal award stat cards, count-up numbers, a standalone fullscreen opener, long sticky scrollytelling, autoplay gallery, masonry of all seven photos, technology chips, invented impact metrics, or repeated VCareer case-study copy.                                                                                           |
| Acceptance criteria     | The FPT record is visually dominant; no `20%` or `30%` claim remains; WonderLens is one line only; all VI/EN facts are equivalent; `#career` and `#recognition` work; no content is hidden without JavaScript; 06B activates Education → FPT → AI Program in both scroll directions; and compact/reduced-motion modes keep the complete static ledger. |

## Content contract

### Career ledger

| Record                   | Public content                                                                                                                                                                                                                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FPT University           | Bachelor of Information Technology · 2019–2024 · Hoa Lac, Hanoi.                                                                                                                                                                                                                                          |
| FPT Software             | Software Engineer · May 2024–March 2026. Backend APIs and business logic with Java/Spring Boot/PostgreSQL; batch/asynchronous processing with AWS SQS; Docker/LocalStack for local development and testing; coordination and code review for a 4–5 person backend sub-team when the team lead was absent. |
| VinUniversity × Vingroup | Practical AI Talent Program — Foundation · April–July 2026 · 12 weeks · SFIA-based practical AI training.                                                                                                                                                                                                 |

### Recognition index

| Record                   | Public content                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| VCareer                  | 2nd Prize · Track 4: Transform with Codex · `$5,000 in OpenAI API credits` · Codex Community Hackathon Hanoi · June 27, 2026. |
| WonderLens               | 1st Prize · Track 1: Market Scale · Codex Community Hackathon Hanoi 2026. No project detail in this part.                     |
| VCareer at VinUniversity | Featured project at the VinUniversity closing ceremony in 2026.                                                               |

## Checkpoints

### 06A — Foundation and static ledger

- Add typed career/recognition record keys and content tests.
- Add equivalent VI/EN copy and remove the two stale FPT percentages.
- Render the Part 05 handoff, compact chapter rail, static Career ledger, and
  static Recognition index.
- Add real `#career` and `#recognition` anchors.
- Do not add scroll motion, image fields, gallery controls, or header changes.

### 06B — Career Trace motion

- Draw the 2019–2026 trace with reversible scroll progress.
- Activate records in chronological order while keeping FPT dominant.
- Preserve the static ledger for compact and reduced-motion modes.

Implementation contract:

- The Part 05 handoff first draws down, makes one square contact, then extends
  horizontally into the Career sheet.
- The year axis sweeps from 2019 to 2026 while a single cursor descends through
  the real record boundaries. A node briefly expands when contacted; the
  corresponding record gains contrast without translating its text.
- Education owns the opening interval, FPT owns the longest reading interval,
  and the practical AI program owns the closing interval. Scrolling upward
  rewinds the exact same sequence rather than playing a separate exit motion.
- Desktop at 1024px and above receives the scroll-linked sequence. Compact,
  reduced-motion, and `career=static` modes render the full trace and all copy
  immediately, with no cursor or arbitrary active-record highlight.
- 06B adds no sticky wrapper, synthetic scroll distance, or per-line reveal.

### 06C — Recognition Stage

- Transition the light ledger into one short dark documentary stage.
- Introduce the ceremony image, loading/error treatment, and responsive crop.
- Keep VCareer primary and WonderLens to one line.

Implementation contract:

- **Screen job:** let a recruiter verify that VCareer was publicly recognised,
  then scan the two related 2026 outcomes without opening a gallery.
- **Hierarchy:** the real VinUniversity ceremony photograph is the documentary
  anchor; VCareer Track 4 and the `$5,000` credit result form the primary proof;
  WonderLens and the VinUniversity feature remain two terse ledger rows.
- **Layout:** the light Career sheet ends at a diagonal threshold. A full-width
  night stage contains one 4:3 evidence field and a stable proof column—never a
  card carousel. The two secondary records sit beneath as ruled rows.
- **Signature motion:** the Career Trace resolves into the threshold line; the
  dark plane rises once, then a single horizontal scan reveals the ceremony
  photograph. Reverse scroll rewinds the same geometry. There is no sticky
  wrapper, added dwell, per-line text reveal, or autoplay.
- **Visual language:** keep the established night, mineral, signal blue, and
  focus cyan tokens. A restrained cobalt/violet ambient field is sampled from
  the real stage lighting so the dark scene belongs to this photograph rather
  than to a generic neon portfolio.
- **Required states:** `ready`, `loading`, and `error` image states; complete
  no-JS content; compact/reduced-motion static rendering; VI/EN-equivalent alt
  text and caption. Error state keeps every recognition fact readable.
- **Responsive behaviour:** wide screens pair image and primary proof; compact
  screens place the complete image before the proof and keep both supporting
  rows concise. No important stage-screen content may be cropped out.
- **Reference transfer:** Tech Barcelona's stable fact/image separation,
  Dylan Brouwer's terse recognition ledger, and the approved Swaraj scene
  concentration. Do not copy their branding, exact composition, or card
  treatment.
- **Review states:** `?intro=0&recognition=transition#recognition`,
  `?intro=0&recognition=ready#recognition`,
  `?intro=0&recognition=loading#recognition`,
  `?intro=0&recognition=error#recognition`, and
  `?intro=0&recognition=static#recognition`.
- **Acceptance:** `vinuni-ceremony.jpg` is the only 06C photograph; VCareer is
  visibly primary; WonderLens remains one line; loading/error states have
  useful labels; mobile and no-JS expose all three records; and the checkpoint
  adds no photo selector or inert controls reserved for 06D.

### 06D — Documentary image selector

- Add labelled, keyboard-operable photo selection with short directional masks.
- Provide captions for organisers, VinUniversity career services, and the
  ceremony context; never autoplay.

Implementation contract:

- **Screen job:** let a recruiter inspect the three documentary contexts behind
  the recognition record without changing the VCareer-first proof hierarchy.
- **Evidence set:** use only `vinuni-ceremony.jpg`, `hackathon.jpg`, and
  `stakeholder-congrats-2.jpg`. They represent the ceremony recognition, the
  Codex Community Hackathon context with event organisers, and the
  VinUniversity career-services stakeholder context respectively. The other
  local award photographs remain outside this checkpoint.
- **Layout:** keep the 06C 4:3 evidence field and proof column stable. A ruled
  three-entry document register sits beneath the image; selection never changes
  the frame dimensions or pushes the recognition facts around.
- **Signature interaction:** moving forward in the register reveals the next
  image with a short left-to-right mask; moving backward reverses that mask.
  Reduced motion uses a brief opacity handoff. There is no timer, autoplay,
  drag surface, pagination dot, or generic previous/next carousel control.
- **Controls:** every entry carries an index and visible label, remains at least
  44px high, and is reachable as a real link without JavaScript. With JavaScript
  active, click/Enter selects in place; Arrow Left/Up, Arrow Right/Down, Home,
  and End move through the ordered register and return focus to the selected
  entry.
- **Image treatment:** both 4:3 landscape documents use the complete frame. The
  portrait career-services photograph uses `contain` inside the same fixed
  evidence field so no stakeholder is cropped out.
- **Copy and semantics:** captions and localized alt text identify only the
  confirmed context; no person is named from visual inference. The current
  selection is exposed with `aria-current`, loading/error states remain useful,
  and the updated caption is announced politely.
- **Progressive enhancement:** the selector links resolve to forced review URLs,
  so all three documents are reachable without JavaScript. Enhanced selection
  stays in place and never starts an automatic sequence.
- **Reference transfer:** Cosmos' media-first browsing makes the source choice
  explicit; Dylan Brouwer's ledger treatment keeps active state terse; Tech
  Barcelona's fixed evidence field keeps facts and photography separate. Do
  not copy their social controls, branding, masonry, or page composition.
- **Review states:** `?intro=0&recognition=ceremony#recognition`,
  `?intro=0&recognition=hackathon#recognition`, and
  `?intro=0&recognition=career-services#recognition`, alongside all 06C image
  and stage states.
- **Acceptance:** all three labels and captions are equivalent in VI/EN; the
  selector has no interval/timer; direction reverses with selection order;
  the portrait document is uncropped; keyboard and no-JS paths work; and
  VCareer remains the only primary proof.

### 06E — Header and finish gate

- Add Career navigation, active chapter trace, and light/dark header tone.
- Verify reverse scroll, live reduced-motion changes, no-JS, keyboard, 44px
  targets, contrast, CLS, image requests, bundle size, and all supported widths.
