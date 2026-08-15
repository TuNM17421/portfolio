# Part 09 — Cross-page release finish gate

> **Status:** Research and contract proposed; implementation not started
>
> **Branch:** `redesign/portfolio-v2`
>
> **Accepted baseline:** Parts 01–08 through commit `24d5c8c`
>
> **Current review routes:** `/vi/v2`, `/en/v2`,
> `/vi/projects/vcareer`, and `/en/projects/vcareer`
>
> **Planned canonical routes:** `/vi`, `/en`,
> `/vi/projects/vcareer`, and `/en/projects/vcareer`

## Outcome

Part 09 releases the accepted V2 experience as one coherent bilingual
portfolio rather than adding another visual chapter. A recruiter should be able
to land on the canonical root, understand Nguyen Manh Tu's role and evidence,
inspect VCareer, return to the exact portfolio chapter, switch language, open
the CV, and make contact without encountering a V1/V2 seam or a review-only
state.

This is a release and integration part. It preserves the approved **Systems in
Focus** art direction, long-form Intro, scroll choreography, documentary
evidence, and VCareer case-file language. Performance work may change how an
effect is rendered, but not remove a signature effect merely to improve a
synthetic score.

## Scope boundary

Part 09 owns:

- the public route contract and V2 cutover at `/[locale]`;
- removal of review-only URL controls from the production experience;
- isolation of V2 from unused V1 layout, font, theme, and shell work;
- localized canonical, alternate-language, social, sitemap, and robots data;
- first-visit Intro stability, LCP discovery, CLS, bundle, and long-task work;
- cross-page responsive, interaction, accessibility, progressive-enhancement,
  content, link, and delivery verification;
- the final source-of-truth update and a reproducible release evidence pack.

Part 09 does **not**:

- add a new homepage section, case-study route, project, metric, or image;
- restyle an approved Part 01–08 composition for novelty;
- shorten or remove the Intro solely to game Lighthouse;
- make ScholarAI, Financial Planning, or WonderLens equal to the VCareer
  flagship hierarchy;
- claim a successful contact delivery without a real Resend response;
- delete V1 source files merely because V1 is no longer imported by the public
  routes;
- push the branch or deploy production without an explicit owner instruction.

## Evidence and repository audit — 15 August 2026

### Product and route state

| Surface | Current evidence | Release implication |
| --- | --- | --- |
| Localized root | `src/app/[locale]/page.tsx` still renders the V1 homepage. | V2 is not yet the actual portfolio entry point. |
| V2 homepage | The accepted experience lives at `src/app/[locale]/v2/page.tsx`. | Part 09 must cut over the root and retain a compatibility path for old `/v2` links. |
| Shared layout | `src/app/[locale]/layout.tsx` always imports Inter, V1 header/footer, theme sync, background FX, and reveal code. CSS hides that shell with `:has(...)` on V2 routes. | Hidden V1 UI still creates route coupling and avoidable preload/runtime work. |
| VCareer return | Case-study controls return to `/[locale]/v2?intro=0#vcareer`. | Return links and matched-route intent must move to the canonical root without replaying Intro. |
| Review controls | The V2 route accepts `hold`, `portrait`, `story`, `showcase`, `work`, `career`, `contact`, and broad recognition/Intro aliases. Locale switching propagates them. | Review fixtures must stop being a public URL API. Real runtime failures and test harnesses replace forced production states. |
| Legitimate URL state | `intro=0` prevents an Intro replay on return. The three recognition documentary choices are real progressively enhanced links. | These states remain supported and are separated from review-only controls. |
| Metadata | Localized title and description exist, but no `metadataBase`, canonical, `hreflang`, sitemap, robots, or dedicated social image contract exists. | Release metadata needs the owner's stable public origin. |
| Contact | Without Resend configuration, POST returns an honest `503` and the page retains direct email. | The unconfigured path can be released; real success remains credential-gated. |

### Rendered baseline

The production build at `24d5c8c` was inspected before defining this plan.

| Check | Result |
| --- | --- |
| Responsive | VI and EN at 320, 375, 768, 1024, and 1440px have no horizontal overflow or broken images. |
| Mobile document length | About 26,800px at 375px in both locales. This is accepted long-form structure, but repeated evidence and accidental dwell remain release-audit targets. |
| Semantics | One `h1`, seven `h2`, thirteen `h3`, and fifteen `h4` on the V2 homepage; locale message files have 592 matching leaf keys. |
| Accessibility | axe reports zero violations after full scroll at 375 and 1440px in VI and EN. |
| No JavaScript | Full VI/EN content, links, form fallback, and hidden V1 chrome remain readable at 375px with no overflow. |
| Mobile navigation | 44px trigger, contained focus, Escape close, focus return, scroll lock, and background inertness pass. |
| External evidence | VCareer live product, architecture report, ScholarAI, three Financial Planning repositories, GitHub profile, and the local CV resolve. LinkedIn returned automated-client protection and needs a normal-browser owner check. |

### Performance baseline

| Scenario | Performance | A11y / BP / SEO | FCP | LCP | TBT | CLS | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile, first visit with full Intro | 74 | 100 / 100 / 100 | 2.3s | 5.7s | 120ms | 0.092 | 734 KiB |
| Mobile, repeat visit with `intro=0` | 79 | 100 / 100 / 100 | 2.6s | 4.7s | 80ms | 0.003 | 717 KiB |
| Desktop, repeat visit | 99 | 100 / 100 / 100 | 0.7s | 0.9s | 0ms | 0.003 | 881 KiB |

The main first-visit CLS source is the Intro wordmark animating the `Anybody`
`wdth` axis and therefore changing layout geometry. The Hero portrait is the
mobile LCP but is lazy and low-priority when the full Intro runs. The shared V1
layout also preloads Inter even though V2 uses its own three-family type system.
These are implementation problems, not reasons to remove the accepted Intro.

## Reference evidence and finish-gate method

Part 09 does not select a new visual reference. It reuses the approved evidence
in the V2 overview and Part 08, then applies UIZZE's evidence-first finish-gate
method: define the product job, compare against real interfaces, enforce a hard
quality gate, and retain only decisions that serve this portfolio.

- [UIZZE Web reference catalogue](https://uizze.com/web-ui-references)
- [UIZZE anti-slop workflow](https://uizze.com/ai-ui-slop)
- [UIZZE workflow documentation](https://uizze.com/docs)
- [Motion accessibility guidance](https://motion.dev/docs/react-accessibility)
- [Next.js metadata files](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

The accepted Swaraj, Dylan Brouwer, Modal, Vercel, Zellerfeld, Slite, GitHub,
and OpenAI evidence remains a consistency reference only. Part 09 may not use a
new inspiration screen to reopen approved layout or branding decisions.

## Release design contract

| Field | Decision |
| --- | --- |
| Screen job | Turn a first visit into evidence inspection or contact through one canonical bilingual portfolio journey. |
| Primary user | Recruiter, engineering manager, technical founder, or interviewer evaluating Tu's backend and realtime-AI work. |
| Primary action | Open the VCareer case study from the flagship proof. |
| Secondary actions | Inspect supporting evidence, download the CV, contact Tu, switch locale, and return from the case study without replaying Intro. |
| Hierarchy | Intro/identity → role and positioning → About method → VCareer proof → supporting work → career/recognition → capabilities → contact. The case study remains the detailed proof branch. |
| Canonical navigation | `/vi` and `/en` are the homepage; `/[locale]/projects/vcareer` is the flagship detail. `/[locale]/v2` is compatibility-only after cutover. |
| Visual language | Preserve V2 typography, night/mineral planes, cyan/lime/blue signals, literal evidence imagery, documentary photography, and compact metadata rails. |
| Motion language | Preserve approved scene motion. Use transform, opacity, clip, and stable reserved geometry; avoid layout-changing animation when a compositor-safe equivalent keeps the same visual result. |
| Responsive contract | 320, 375, 768, 1024, and 1440px plus 667×375 and 812×375 landscape; no overflow, clipped text, unreachable control, or pointer-only information. |
| Required states | First/repeat Intro, direct load, return, Back/Forward, locale switch, no-JS, reduced motion, portrait/evidence loading and failure, menu open/close, recognition selection, contact configured/unconfigured/validation/sending/success/error/rate/offline, VCareer viewer, and not-found. |
| Accessibility | One clear page `h1`, sequential section hierarchy, 44px targets, visible focus, landmarks, contained dialogs, correct inertness and focus return, AA contrast, 200% zoom/reflow, and status announcements that exist only while relevant. |
| Performance | Prioritize critical evidence, reserve geometry, avoid unused V1 runtime, and measure real motion tasks. Do not replace the art direction with a generic static page. |
| Forbidden defaults | New cards/pills/bento grids, a generic loading spinner, hidden evidence for a shorter page, placeholder claims, review query parameters, duplicate shells, fake contact success, SEO text that differs from visible positioning, or a Lighthouse-driven removal of approved motion. |

## Public URL-state contract

| State | Decision |
| --- | --- |
| `?intro=0` | Keep as an internal continuity contract for case-study return and repeat-entry links. Do not expose it as a review label. |
| Recognition documentary selection | Keep the three real VI/EN-safe values used by the progressive-enhancement links; rename review-oriented identifiers in source where useful. |
| `?intro=1`, `full`, `slow`, `image-error`, `reduced` | Remove from the production route contract. If Intro replay becomes a product feature later, expose a visible control rather than an undocumented URL. |
| `hold`, `portrait`, `story`, `showcase`, `work`, `career`, `contact` | Remove from page props, locale propagation, and runtime branches. Verify the same states through unit/component tests, request interception, native media preferences, and real API responses. |
| Recognition transition/loading/error/static aliases | Remove while retaining the three documentary destinations. Test loading/error with real image request behavior. |
| Unknown query parameters | Ignore and never copy them into locale navigation or internal links. |

## Checkpoint plan

Each checkpoint is implemented, verified, and left **uncommitted** for owner
preview. It is committed only after explicit approval, then the next checkpoint
begins.

### 09A — Production state and route-source cleanup

**Implementation**

- reduce the homepage server props and V2 shell contract to real product state;
- remove review-only URL parsers, aliases, data attributes, fixture branches,
  locale propagation, and stale tests;
- retain `intro=0` and the three real recognition documentary destinations;
- move failure verification to actual request interception, unit logic, browser
  media emulation, and API responses;
- add focused regression tests for allowed URL state and ordinary direct loads.

**Owner review artifact**

- current `/vi/v2` and `/en/v2` preview with ordinary scroll, locale switch,
  recognition selector, VCareer navigation/return, and contact fallback;
- a short before/after list of removed query states. There should be no intended
  visual change.

**Acceptance gate**

- ordinary first/repeat Intro and every accepted scene remain visually equal;
- locale switching preserves only legitimate public state;
- recognition links still work with JavaScript disabled;
- image/API failures remain testable without a production debug URL;
- tests, TypeScript, scoped lint, and production build pass.

### 09B — Canonical root cutover, shell isolation, and discovery metadata

**Implementation**

- make the accepted V2 page the implementation behind `/vi` and `/en`;
- convert `/[locale]/v2` into a compatibility redirect to the localized root;
- update VCareer forward/return links, locale links, hashes, and handoff intent;
- remove V1 header/footer, reveal observer, theme sync, background FX, theme
  bootstrap, and Inter preload from the shared public route runtime;
- keep V1 source recoverable but unreachable unless the owner later requests a
  separate archive route;
- add localized canonical and alternate URLs, metadata base, robots, sitemap,
  Open Graph/Twitter data, and a truthful share image based on approved assets.

**Owner review artifact**

- canonical `/vi` and `/en` preview, direct refresh, locale switch, VCareer
  forward/return, browser Back/Forward, and old `/v2` compatibility link;
- HTML metadata and social-preview evidence for both locales.

**Acceptance gate**

- root and case routes share one V2 shell with no flash or hidden V1 chrome;
- internal links contain no accidental `/v2` path;
- old `/v2` bookmarks reach the matching locale root;
- one canonical and two alternate-language URLs are correct per page;
- no unused V1 font or shell request appears on a clean navigation;
- no indexable duplicate homepage remains.

**Required owner input before 09B:** the stable public portfolio origin used for
canonical, sitemap, and social URLs.

### 09C — Intro, LCP, CLS, and runtime stabilization

**Implementation**

- make the real Hero/Intro portrait discoverable and high-priority from the
  initial response without downloading below-fold galleries eagerly;
- reproduce the approved Intro wordmark expansion with reserved geometry and
  compositor-safe transform/clip behavior instead of layout-changing width-axis
  interpolation;
- remeasure font, CSS, client-component, and motion costs after V1 isolation;
- split or delay work only where measurements show a benefit and the accepted
  reverse scroll, masks, signals, focus states, and documentary interactions
  remain intact;
- prevent body lock, scrollbar, route interruption, or image readiness from
  shifting the composition.

**Owner review artifact**

- side-by-side full Intro and repeat Intro at desktop/mobile widths;
- Hero settle, wordmark-to-header, mask close, route Back/Forward, and the first
  scroll into About;
- measured before/after report for LCP, CLS, long tasks, transfer, and route JS.

**Acceptance gate**

- first and repeat navigation CLS are at most `0.05`;
- the Hero LCP image is not lazy and carries high fetch priority;
- desktop Lighthouse Performance is at least 95 and repeat mobile is at least
  85 on the production build;
- first-visit mobile targets 80; if the intentional full Intro remains the
  limiting factor, raw metrics and the exact owner exception are recorded;
- no post-hydration main-thread task over 200ms remains unexplained;
- no signature motion, readable content, or reduced-motion path regresses.

### 09D — Cross-page interaction and progressive-enhancement matrix

**Implementation**

- exercise the complete recruiter path across both locales and every supported
  viewport with keyboard, touch, pointer, zoom, direct load, and history;
- verify Intro interruption, menu focus/lock, chapter indicator, recognition
  selector, CV download, contact fallback/form, VCareer handoff, archive viewer,
  external links, and return focus/scroll;
- verify no-JS and reduced-motion routes with all evidence still present;
- test real image delay/failure and real contact response classes rather than
  public forced states;
- add a coherent localized not-found path and fix only issues discovered by the
  matrix.

**Owner review artifact**

- mobile and desktop canonical previews in VI/EN;
- a concise state checklist naming exactly how every interaction should look
  and what to click, press, or scroll to inspect it.

**Acceptance gate**

- zero serious/critical axe findings and Lighthouse Accessibility 100;
- no horizontal overflow or clipped essential text at every target viewport
  and 200% reflow;
- all visible controls have truthful names, destinations, focus, and >=44px
  targets;
- no-JS and reduced motion preserve all decisions and evidence;
- image errors keep captions/actions, viewer focus is contained/restored, and
  route/menu body locks always release;
- configured contact success is accepted only after a real Resend `202`.
  Without owner credentials, this single sub-gate is explicitly credential-
  gated while the honest `503` and direct-email path must pass.

### 09E — Release evidence, source of truth, and owner gate

**Implementation**

- reconcile `MASTER.md`, homepage/VCareer contracts, V2 overview, messages,
  route structure, and actual implementation;
- run the full production build, unit tests, TypeScript, scoped lint, locale
  parity, link/assets audit, browser matrix, axe, Lighthouse, CLS, console,
  request, and long-task checks;
- capture final screenshots and raw audit artifacts with commit/date/route
  provenance;
- perform the final anti-slop critique: product job, evidence hierarchy,
  specificity, interaction purpose, and forbidden-pattern audit;
- remove temporary audit artifacts from the shipped tree and leave the complete
  release candidate uncommitted for owner inspection.

**Owner review artifact**

- one canonical local preview with no forced review query;
- a release report separating passed checks, intentional owner-approved
  exceptions, credential-gated checks, and remaining risks.

**Acceptance gate**

- all automated and rendered gates above pass together from a clean production
  build;
- VI/EN canonical and alternate metadata, sitemap, robots, 404, CV, contact,
  and every public destination are truthful;
- production routes expose no V1 shell, debug query contract, placeholder
  claim, broken asset, console/page error, or orphaned motion state;
- the owner approves the final preview before the checkpoint is committed;
- push/deployment occurs only after a separate explicit instruction.

## Planned commit boundaries

| Checkpoint | Commit only after owner approval | Expected visible change |
| --- | --- | --- |
| 09A | `refactor: remove portfolio review states` | None; production behavior is cleaned behind the scenes. |
| 09B | `feat: make portfolio v2 canonical` | V2 moves from `/v2` to `/vi` and `/en`; discovery metadata becomes complete. |
| 09C | `perf: stabilize portfolio intro and hero` | Same choreography with a steadier wordmark/Hero settle and faster critical image. |
| 09D | `fix: pass cross-page interaction gate` | Only evidence-backed fixes found by the full interaction matrix. |
| 09E | `chore: complete portfolio v2 release gate` | No new scene; source of truth and final release evidence agree. |

## Owner decisions and external gates

1. The plan assumes the V2 homepage replaces V1 at `/vi` and `/en` during
   09B, while `/[locale]/v2` becomes compatibility-only.
2. The stable public origin is still unknown and is required before canonical,
   sitemap, and social metadata can be finalized in 09B.
3. A real Resend success test in 09D requires the owner-provided API key in a
   local environment file. No credential belongs in chat or Git.
4. LinkedIn should be opened once by the owner in a normal browser because its
   automated-client response cannot establish that the public profile is
   broken.
