# Part 08 — VCareer case file and route continuity

> **Status:** 08A–08B approved; 08C authorized; 08D–08F remain planned
>
> **Branch:** `redesign/portfolio-v2`
>
> **Implementation status:** 08A committed at `744da4f`; 08B completed and
> approved on 14 August 2026
>
> **Planned review routes:** `/vi/projects/vcareer`,
> `/en/projects/vcareer`, `/vi/v2?intro=0#vcareer`, and reduced-motion / no-JS
> variants
>
> **Internal direction name:** **Case File / Product Trace** — not rendered as
> marketing copy

## Outcome

Part 08 turns the existing factual VCareer page into the detailed destination
promised by the V2 homepage. A recruiter or engineering manager should be able
to move from the homepage proof chapter into the case study without feeling
that they entered a different portfolio, then answer five questions quickly:

1. what product problem VCareer addresses;
2. what Nguyen Manh Tu directly owned;
3. which outcomes are verified and which are qualitative;
4. how the direct work sits inside the wider team architecture;
5. where to inspect the live product, public architecture report, and six real
   product screens.

The page is not a second VCareer marketing landing page. It is an evidence-led
engineering case file that uses the visual and motion language already accepted
for the V2 homepage.

## Scope boundary

Part 08 owns:

- the visual migration of `/[locale]/projects/vcareer` from V1 to V2;
- a dedicated V2 case-study header, chapter orientation, and compact footer;
- the expanded VCareer narrative, architecture trace, shipped/roadmap boundary,
  and six-screen evidence archive;
- a full-resolution, keyboard-operable screenshot viewer;
- the homepage-to-case-study handoff and the return path to
  `/[locale]/v2?intro=0#vcareer`;
- page-level responsive, accessibility, motion, and performance verification.

Part 08 does **not**:

- redesign ScholarAI or Financial Planning into standalone case-study routes;
- change VCareer facts, screenshots, URLs, or project ownership claims;
- add unverified architecture nodes, metrics, testimonials, or placement claims;
- change the V1 homepage or globally replace the V1 layout;
- ship a generic portfolio-wide route-transition framework;
- perform the whole-site finish gate reserved for Part 09.

## Repository audit and baseline

The route already contains useful content. The migration should preserve that
truth layer and replace its presentation rather than rewrite the project from
memory.

| Existing source | Reusable truth | Current limitation |
| --- | --- | --- |
| `src/app/[locale]/projects/vcareer/page.tsx` | One `h1`, six ordered `h2` sections, direct scope, six-week timeline, architecture context, six figures, shipped/roadmap states, and external links. | It renders as a V1 Tailwind/Inter page with rounded cards, gradient accents, the V1 global header/theme behavior, and the generic `Built with Next.js & Tailwind CSS` footer. |
| `design-system/pages/vcareer.md` | Active public-claims contract and explicit forbidden claims. | It is a content contract, not the V2 visual or motion contract. |
| `src/data/projects.ts` | Canonical six screenshot paths, live product URL, architecture URL, private-repository state, and current technology list. | The page must keep reading this source instead of duplicating URLs or filenames. |
| `messages/vi.json` and `messages/en.json` | Existing localized case-study narrative and image descriptions. | Part 08 may refine hierarchy labels, but cannot silently replace verified meaning. |
| `src/components/v2/vcareer/*` | Accepted VCareer palette, screenshot order, workflow model, ownership labels, and homepage evidence language. | The homepage relay is intentionally compressed and should not be copied as another long pinned sequence. |
| `src/app/[locale]/layout.tsx` | Locale, messages, V1 shell, and global progressive enhancement. | The parent layout always renders V1 chrome; the case route needs a scoped V2 root marker, as `/v2` already does, rather than a global layout rewrite. |

### Rendered baseline — 14 August 2026

The current production build was inspected at 1440×900 and 375×812.

| Check | Desktop | Mobile |
| --- | ---: | ---: |
| Document height | 5,213px | 7,876px |
| Horizontal overflow | none | none |
| Semantic structure | 1 `h1`, 6 `h2`, 6 figures | 1 `h1`, 6 `h2`, 6 figures |
| axe violations | none in sampled desktop state | 30 contrast nodes in the sampled mobile state |
| JavaScript disabled | full narrative and all six figures remain readable | full narrative and all six figures remain readable |

The six approved PNG files are approximately 1,900×910px each and total about
3.5MB. The V2 implementation must preserve their original evidence value while
loading only the cover image eagerly; the archive and viewer remain lazy.

## Truth boundary

The existing `design-system/pages/vcareer.md` contract remains authoritative.
Part 08 may publicly state:

- development began in 05/2026;
- a four-person team spent six weeks from ideation and Career Services Product
  Owner interviews to a pilot-ready product;
- Tu directly built the baseline LiveKit/WebRTC path and deeper CV analysis,
  CV-to-JD matching, and JD Builder workflows;
- Three.js TalkingHead remains in use;
- Cloudflare R2 and Amazon S3 coexist;
- production runs on Vercel; the AWS Singapore target has been built and
  verified, while real-user cutover is pending;
- 150+ real VinUni learners tested the system;
- survey feedback indicated higher confidence qualitatively, with no verified
  placement uplift;
- CV evaluation/scoring was reviewed by the Product Owner from VinUni Career
  Services, without a quantified accuracy claim;
- VCareer entered Track 4 as an already-live product and won 2nd Prize:
  `$5,000` in OpenAI API credits;
- the source repository is private under the university ownership contract;
- mentor booking, progress tracking, and Career Services job matching are
  roadmap items pending university funding.

Production/demo numbers visible inside the live site or screenshots are not
portfolio outcomes. WonderLens and its Track 1 first-prize result remain a
separate project.

## Reference evidence

UIZZE's public Web catalogue was inspected on 14 August 2026. The references
below transfer hierarchy and interaction principles only; VCareer's accepted
palette, typography, copy, imagery, and identity remain original.

| Reference | Transfer | Why it fits Part 08 | Do not copy |
| --- | --- | --- | --- |
| [Dylan Brouwer — UIZZE capture](https://singapore.objective.company/design-media/e3/e384ab8122d78f72aee5b0119f87f916bafef2cffcd4e70eb2e63b5b608bd7a3.webp) · [official site](https://www.dylanbrouwer.design/) | Typography acts as page architecture; one media object carries each major scene; project media is proof rather than decoration. | The case-study cover can make `VCareer` and one literal product screen the dominant objects without a generic card shell. | Monitor mockup, orange accent, exact monochrome treatment, wording, or type composition. |
| [Zellerfeld — UIZZE capture](https://singapore.objective.company/design-media/5b/5b601f7677593817a37752922ba6f381043e3c21836e31f6a904d0fcb2941a65.webp) · [official site](https://www.zellerfeld.com/) | The real product remains the primary object while metadata stays tightly anchored to it. | Screenshot number, ownership state, and caption can behave as one evidence unit. | Ecommerce cards, shoe catalogue, ranking numerals, cobalt branding, or commerce interactions. |
| [Slite — UIZZE capture](https://singapore.objective.company/design-media/dc/dc74ad9f3d1f54e892260e5956332e0e16c8f766b795f6840a28ff5ff36a6e36.webp) · [official site](https://slite.com/) | Long-form product content reads as one continuous document; working-state screenshots support the argument directly. | VCareer needs a coherent engineering narrative rather than six detached gallery cards. | Cream/serif identity, scribbles, rounded marketing cards, or exact product copy. |
| [GitHub — UIZZE capture](https://singapore.objective.company/design-media/dc/dc2fa8b45abe046ab3ddae3c270bad25128e65bac9d223f8ee32663e7d1a5575.webp) · [official site](https://github.com/) | A mono metadata layer can structure dense technical evidence while one action remains primary. | Direct scope, product context, architecture state, and source visibility need precise labels. | Mascot, space gradients, glass-card grid, green brand color, or signup hierarchy. |
| [OpenAI — UIZZE capture](https://singapore.objective.company/design-media/cc/cc8e81273d389cea7258c567f028c9cd9960e10f41801783cc4243a74c358c83.webp) · [official site](https://openai.com/) | Editorial hierarchy and whitespace can create chapter anchors without colored containers around every paragraph. | The case study should feel like a considered technical document inside the cinematic V2 system. | Monochrome brand, pill navigation, exact article grid, or corporate footer. |

### Technical evidence

- [Motion layout animation](https://motion.dev/docs/react-layout-animations)
  supports transform-based layout animation and same-tree `layoutId` sharing.
  It also documents scrollbar-induced layout shifts. Part 08 reserves scrollbar
  space and does not claim that `layoutId` can bridge two separately mounted
  Next.js routes.
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)
  keeps local UI, such as viewer content, mounted until its exit finishes.
- [Motion useScroll](https://motion.dev/docs/react-use-scroll) supports a
  section-scoped progress rail without React re-rendering on every scroll frame.
- [Motion accessibility guidance](https://motion.dev/docs/react-accessibility)
  supports disabling transform and layout animation while retaining useful
  opacity/color feedback for reduced-motion users.
- [Next.js Link](https://nextjs.org/docs/app/api-reference/components/link)
  provides client navigation, prefetching, hash navigation, and scroll control.
  Normal links remain the navigation fallback if transition JavaScript does not
  run.
- [WAI-ARIA modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
  requires contained focus, Escape close, a visible close control, and focus
  return to the invoker. Part 08 uses those behaviors for the image viewer.

## Directions considered

| Direction | Strength | Failure mode | Decision |
| --- | --- | --- | --- |
| SaaS launch page | Fast to compose with a hero, stat cards, feature grid, and CTA. | Repeats VCareer's own marketing site, obscures Tu's ownership boundary, and reads as a reusable template. | Reject. |
| Pinned six-screen sequel | Creates a cinematic continuation of the homepage relay. | Repeats the exact Part 04 interaction, makes mobile unnecessarily long, and adds motion without adding evidence. | Reject. |
| Architecture dashboard | Can make the engineering work feel technical. | Encourages invented packets, live metrics, equal technology cards, and visual ownership of the whole product. | Reject. |
| Case File / Product Trace | Uses an editorial case file, chapter orientation, literal product evidence, and one verified system trace. | Can become too dense or museum-like if the rail and metadata overpower the screenshots. | Select, with the safeguards below. |

### Self-critique of the selected direction

- The chapter rail is useful only if it shortens orientation. It must remain
  slim, text-based, and secondary to the current section; mobile receives one
  current-label/progress control rather than a miniature desktop rail.
- Architecture motion is retained only where it distinguishes Tu's direct
  nodes from team/product context. Decorative packets or fake live telemetry
  are forbidden.
- The case-study cover must not replay the homepage Intro. It uses one matched
  VCareer handoff, then gives control back to normal scrolling immediately.
- Six product screenshots already contain dense UI. They stay flat and literal,
  without laptop frames, 3D tilts, blur, AI retouching, or low-contrast overlays.
- The full-resolution viewer is enhancement, not the only way to understand the
  evidence. Every inline figure keeps a caption and a direct-image fallback.

## Design contract

| Field | Decision |
| --- | --- |
| Screen job | Prove Tu's direct contribution to VCareer within the wider shipped product, then expose the original evidence and public destinations. |
| Primary user | Recruiter, engineering manager, technical founder, or interviewer who opened the flagship proof from the homepage. |
| Primary action | Inspect the six real product screens and understand their relationship to Tu's direct scope. |
| Secondary actions | Open the live product, read the architecture report, return to the V2 VCareer chapter, or contact Tu through the homepage. |
| Hierarchy | Case cover → verified evidence ledger → problem/direct scope → six-week delivery → architecture trace → screenshot archive/viewer → shipped versus pending → public links/return. |
| Visual direction | A technical case file inside the accepted `Systems in Focus` identity: night cover, mineral reading sheets, VCareer blue/lime state signals, edge-aligned media, and hairline metadata. |
| Type system | Shared V2 `Anybody`, `Be Vietnam Pro`, and `IBM Plex Mono`; no additional family. |
| Palette | Existing V2 night/mineral/focus tokens plus the accepted VCareer blue, lime, sky, and deep product ink from Part 04. |
| Signature | The homepage VCareer trace becomes a full-viewport case-file cover, then resolves into a persistent product trace that marks real chapters and evidence states. |
| Aesthetic risk | Let one large product screenshot partially cross the dark-cover/mineral-document boundary. It remains readable and literal, with no fake device frame. |
| Motion | One route handoff, one chapter progress trace, one architecture draw, and one viewer transition. Text content does not all reveal at once and nothing auto-loops. |
| Progressive enhancement | Server-render every section, figure, caption, and link. Without JavaScript, skip the route choreography and open screenshots as ordinary image links. |
| Accessibility | Sequential headings, skip link, 44px targets, visible focus, landmark/section labels, truthful alt/captions, reduced motion, contrast gate, and complete modal focus behavior. |
| Forbidden defaults | Equal stat cards, bento grid, rounded browser/device frames, technology chip wall, autoplay carousel, fake terminal, decorative telemetry, all-caps body copy, or a generic `Next project` card. |

## Information architecture

The case study uses six stable chapter IDs so the page remains addressable even
when all animation is removed:

```text
CASE COVER
  └─ 01 / SIGNAL       verified evidence ledger
     02 / PROBLEM      product problem + direct ownership
     03 / DELIVERY     six-week sequence + Track 4 boundary
     04 / SYSTEM       direct-scope architecture trace
     05 / EVIDENCE     six approved product screens
     06 / STATE        shipped / pending funding / private source
```

Suggested localized rail labels:

| ID | Vietnamese | English |
| --- | --- | --- |
| `signal` | `Bằng chứng` | `Evidence` |
| `problem` | `Bài toán` | `Problem` |
| `delivery` | `Triển khai` | `Delivery` |
| `system` | `Hệ thống` | `System` |
| `evidence` | `Màn hình` | `Screens` |
| `state` | `Trạng thái` | `State` |

The labels orient the reader; they do not replace descriptive `h2` copy.

## Visual and interaction direction

### 1. Route shell and cover

- Hide V1 chrome only when a `.portfolio-v2-case-route` root is present.
- Reuse the V2 fonts, night field, edge gutters, focus outline, and hidden
  scrollbar treatment without modifying other routes.
- Add a dedicated case header: compact `Nguyen Manh Tu` wordmark, `Case 01 / 01`,
  locale switch, and a visible return action to
  `/[locale]/v2?intro=0#vcareer`.
- Do not copy the full homepage navigation into the case study. Its job is
  orientation and return, not chapter duplication.
- The cover uses `VCareer` as the dominant type object, the live/pending state,
  the one-line product thesis, and the approved `interviewDemo` screen crossing
  into the first mineral sheet.
- The external live-product and architecture-report links stay visible but
  subordinate to the evidence narrative.

### 2. Evidence ledger

The three verified outcomes form one horizontal ledger on wide screens and one
vertical log on compact screens:

```text
150+ REAL LEARNERS
QUALITATIVE / HIGHER CONFIDENCE REPORTED
EXPERT REVIEW / CV SCORING REVIEWED BY CAREER SERVICES PO
```

This is not three equal cards. `150+` is the only large numeric value. The two
remaining items remain explicit qualitative evidence, including the absence of
a placement-uplift claim.

### 3. Problem, ownership, and delivery

- The problem statement opens the readable mineral document.
- Tu's three direct-scope items sit on the main trace:
  `LiveKit/WebRTC baseline`, `CV analysis + CV/JD matching`, and `JD Builder`.
- Wider product context is offset and labeled `PRODUCT CONTEXT` /
  `BỐI CẢNH SẢN PHẨM`; it never shares the direct-scope color.
- The six-week sequence starts with discovery/Product Owner interviews and ends
  at the pilot-ready product.
- The Track 4 event is a later recognition marker on the line, not the origin of
  development and never a `built in 24 hours` claim.

### 4. Architecture trace

The architecture section is a semantic ordered path, not four generic cards.
It may connect the verified layers already described in the current copy:

```text
BROWSER / TALKINGHEAD
        ↓
LIVEKIT + WEBRTC BASELINE        [TU / DIRECT]
        ↓
APPLICATION WORKFLOWS
   ├─ CV ANALYSIS + CV/JD        [TU / DIRECT]
   └─ JD BUILDER                 [TU / DIRECT]
        ↓
PRODUCT DATA + MEDIA             [PRODUCT CONTEXT]
        ↓
VERCEL CURRENT / AWS TARGET      [CURRENT / CUTOVER PENDING]
```

The public architecture report remains the source for broader context. R2 and
S3 are shown as coexisting, and the AWS target is never labeled as completed
production migration.

On entry, one line draws from browser to deployment while direct-scope nodes
activate in lime and context nodes remain sky/neutral. On reverse scroll the
trace reverses naturally. Reduced motion renders the complete path instantly.

### 5. Evidence archive and viewer

- Show all six approved screenshots in source order as an editorial contact
  sheet, not a carousel and not another pinned relay.
- Each evidence unit includes index, localized caption, and either
  `DIRECT-SCOPE RELATED` or `PRODUCT CONTEXT`; no screenshot is used to claim
  ownership of an unrelated subsystem.
- Wide layout may alternate one dominant frame with smaller paired frames;
  compact layout becomes one clear column with full-width images.
- Images retain their source aspect ratio and are not cropped for aesthetics.
- Only the cover is eager. Archive images are lazy and have explicit intrinsic
  dimensions / `sizes` to protect CLS.
- Activating an image opens the original-resolution viewer. The enhanced viewer
  provides close, previous, next, `01 / 06`, caption, Escape, Left/Right keys,
  focus containment, background inertness, scroll lock, and focus return.
- A direct image link remains the no-JS fallback. Touch users have visible
  controls; swipe may be supplemental but never required.
- The viewer uses a short product-plane enter/exit, not a fake device expansion.

### 6. Shipped, pending, and close

- `SHIPPED / CURRENT` uses solid topology and names live interview, CV analysis,
  CV/JD matching, JD Builder, interview review, and learner dashboard.
- `PENDING FUNDING` uses a visibly incomplete/dashed branch for mentor booking,
  learner progress, and Career Services job matching.
- The repository explanation is plain, non-interactive text.
- The close contains one primary live-product action, one architecture-report
  action, and one return-to-portfolio action. It does not repeat the full
  homepage contact section or add a generic footer sitemap.

## Homepage-to-case-study motion contract

The transition is a **matched visual cut**, not a cross-route shared-element
claim. The homepage and destination do not remain mounted inside one shared
`LayoutGroup`, so Motion `layoutId` is reserved for same-page viewer behavior.

### Forward navigation

1. The VCareer case-study link remains a real localized `Link` with native
   modified-click/new-tab behavior.
2. On ordinary primary activation, the clicked CTA and current VCareer stage
   report their geometry to a fixed handoff layer.
3. The lime trace reaches the CTA; a VCareer blue/night plane expands from that
   location to the viewport while the title and stage index settle into the
   destination cover geometry.
4. The prefetched Next.js route navigates after the cover becomes visually
   complete. A short hard timeout prevents the animation from blocking
   navigation indefinitely.
5. The destination renders the same terminal cover pixels first, then resolves
   into the real server-rendered case cover and releases page scroll.

The one-time arrival intent may use session storage and is consumed immediately
on the destination. Direct loads and refreshes render the stable cover without
waiting for a nonexistent source animation.

### Return navigation

- The explicit return destination is `/[locale]/v2?intro=0#vcareer`, so the full
  Intro does not replay.
- Browser Back keeps native history and scroll restoration behavior.
- The explicit return uses a shorter reverse plane, then resolves at the
  homepage VCareer chapter. If JavaScript is unavailable it is an ordinary
  localized link.

### Reduced motion and interruption

- Reduced-motion users receive an immediate navigation or a short opacity-only
  cover, with no expanding plane, scale, parallax, or scrubbed trace.
- Modified clicks, new tabs, direct loads, refreshes, hash navigation, and locale
  switches do not wait for the transition.
- A second activation, navigation interruption, or slow route cannot leave
  `overflow: hidden`, an inert page, or an orphaned fixed layer.

## Implementation architecture

The exact module split may adjust during implementation, but ownership remains
deliberate:

| Area | Planned module responsibility |
| --- | --- |
| Server route | `src/app/[locale]/projects/vcareer/page.tsx` resolves locale, canonical data, translations, metadata, and fully rendered content. |
| Shared V2 fonts | Extract or share the current V2 font declarations so homepage and case study use identical generated font variables without a second visual definition. |
| Case shell | `src/components/v2/vcareer-case/vcareer-case-study.tsx` owns semantic chapter composition and server-rendered content. |
| Case styles | One scoped CSS module owns cover, reading sheets, rail, archive, state ledger, and responsive behavior; no V1 utility-card inheritance. |
| Chapter controller | A small client module observes stable section IDs and maps page progress to the rail without hiding content before hydration. |
| Architecture motion | A focused client module maps section progress to SVG/CSS trace values; the semantic path remains visible without it. |
| Evidence viewer | A client-enhanced dialog owns selected image, navigation, focus lifecycle, and viewer enter/exit. Canonical image data stays in `src/data/projects.ts`. |
| Route handoff | One V2-only link/overlay controller is shared by the Hero and Part 04 case-study entry points. It does not wrap unrelated V1 navigation. |
| Copy | Reuse `vcareerCaseStudy` messages; add only V2 shell/rail/viewer/status labels that do not duplicate factual prose. |

Client boundaries stay narrow. The case-study narrative remains a Server
Component and must not become one route-sized `"use client"` component merely
to support four motion surfaces.

## Checkpoint implementation plan

Every checkpoint is implemented, verified, previewed, approved, and committed
before the next begins.

### 08A — V2 route shell, cover, and evidence ledger

**Implementation**

- add the V2 case-route marker and isolate the page from V1 chrome;
- share the accepted V2 fonts/tokens;
- add the dedicated case header, return path, locale behavior, and compact
  footer shell;
- migrate all existing sections into a complete server-rendered V2 structural
  skeleton so no content disappears while later sections are art-directed;
- build the final cover and verified evidence ledger;
- preserve metadata, external links, figure semantics, and no-JS content.

**Owner review**

- desktop and mobile cover composition;
- continuity with the Part 04 VCareer chapter;
- `VCareer` typography, screen overlap, evidence hierarchy, and header density;
- both VI and EN direct-load routes.

**Acceptance gate**

- V1 header/theme/footer are absent only on the V2 case route;
- one `h1`, sequential headings, and all factual sections remain in the DOM;
- 375, 768, 1024, and 1440px have no horizontal overflow;
- no-JS exposes the complete article and normal navigation;
- only the cover image is eager and its dimensions reserve stable space.

### 08B — Problem, direct scope, and six-week delivery

**Implementation**

- art-direct the Problem and Direct Scope reading sheet;
- make direct scope visually primary and wider team context explicitly
  secondary;
- build the six-week delivery trace with the Track 4 marker placed after the
  product was already live;
- add restrained reversible entry sequencing without a pinned dwell.

**Owner review**

- whether the transition from evidence ledger into readable detail feels
  natural;
- whether Tu's three direct responsibilities are unmistakable;
- whether the timeline communicates six weeks versus one-day event correctly.

**Acceptance gate**

- all three direct-scope items remain exact;
- no architecture-wide ownership implication;
- reverse scroll and reduced motion preserve reading order;
- mobile does not require precise scroll stopping or horizontal gestures.

**Implemented review behavior**

- the product problem is encoded as the ordered path `CV → JD criteria →
  live AI interview` rather than another row of cards;
- the three direct responsibilities sit on one lime-activated vertical trace,
  while the wider team/product statement is separated by a dashed context
  boundary;
- discovery, the six-week build, and the learner pilot form the primary
  delivery line; Track 4 branches only after the product-live marker;
- each local reading cluster enters when it reaches the viewport and re-enters
  on reverse scroll. There is no pinned dwell, no horizontal gesture, and the
  server/no-JS/reduced-motion render stays fully visible.

### 08C — Architecture trace and product-state boundary

**Implementation**

- replace the four generic architecture blocks with the verified semantic path;
- distinguish direct scope, product context, current deployment, and pending
  cutover states;
- draw one reversible architecture trace;
- build the shipped/current versus pending-funding branch and private-source
  explanation.

**Owner review**

- accuracy of each node and state;
- direct-versus-context color/label clarity;
- architecture motion timing in both scroll directions;
- shipped/pending differentiation without reading the fine print.

**Acceptance gate**

- R2 and S3 coexist; AWS user cutover remains pending;
- roadmap branches never appear shipped;
- the architecture report remains clearly team/product context;
- the static and reduced-motion path communicates the same meaning without
  color alone.

### 08D — Six-screen evidence archive and full-resolution viewer

**Implementation**

- build the editorial contact sheet for all six approved screenshots;
- add localized index, caption, and ownership-context labels;
- implement the enhanced full-resolution viewer and its local enter/exit;
- add forced image-error and loading review states without changing originals.

**Owner review**

- archive rhythm on desktop and mobile;
- image scale and legibility;
- viewer motion, previous/next behavior, caption hierarchy, and close behavior;
- whether every screenshot feels like evidence rather than decoration.

**Acceptance gate**

- all six original files and localized captions are present in source order;
- Escape, close button, Left/Right, focus containment, and focus return pass;
- visible touch controls are at least 44×44px;
- page background is inert and scroll-locked only while the viewer is open;
- viewer close cannot leave stale focus or body state;
- non-cover images stay lazy and image errors retain useful captions/actions.

### 08E — Homepage/case-study matched route handoff

**Implementation**

- introduce one V2-only handoff link for the Hero and Part 04 case-study CTAs;
- build the outgoing cover, matching destination arrival, and one-time intent;
- add explicit return-to-VCareer behavior without replaying the Intro;
- handle direct load, refresh, locale, modified clicks, slow navigation,
  interrupted navigation, and reduced motion.

**Owner review**

- full scroll from Part 04 CTA into the case cover;
- Hero CTA entry as a shorter alternative source;
- browser Back versus explicit return;
- perceived continuity at normal and throttled network speed.

**Acceptance gate**

- native `href` and new-tab behavior always remain valid;
- no blank frame, double Intro, scroll lock leak, layout jump, or stale overlay;
- direct route loads do not wait for a handoff;
- reduced motion is immediate or opacity-only;
- return lands at `#vcareer` with the homepage Intro skipped.

### 08F — Page finish gate

**Implementation**

- remove temporary review states and dead styling;
- run content, responsive, keyboard, touch, no-JS, image, route, and motion
  verification;
- measure bundle, requested images, Lighthouse, axe, CLS, and console/network
  errors;
- keep only motion that improves continuity, orientation, evidence inspection,
  or state comprehension.

**Acceptance gate**

- VI and EN pass at 375, 768, 1024, and 1440px with no overflow;
- axe has zero serious/critical violations and Lighthouse Accessibility is 100;
- CLS is at most 0.05 in the recorded desktop and mobile runs;
- Lighthouse Performance target is at least 90 desktop and 85 mobile on the
  production build, or any miss is documented with the measured bottleneck and
  owner decision before approval;
- initial navigation does not eagerly request all six full screenshots;
- default, reduced-motion, no-JS, image-error, direct-load, forward, back,
  locale-switch, and viewer flows pass;
- production build and relevant unit/component tests pass;
- Part 09 remains responsible for the final whole-portfolio cross-page audit.

## Verification matrix

| Area | Required checks |
| --- | --- |
| Content | Verified claims only; all six images/captions; direct scope before architecture context; current/roadmap/private-source boundary. |
| Semantics | One `h1`; sequential `h2`/`h3`; article/header/nav/main/footer landmarks; figures and captions; external-link context. |
| Responsive | VI/EN at 375, 768, 1024, 1440; portrait and landscape mobile; no crop or horizontal overflow. |
| Motion | Forward/reverse scroll, direct load, route forward/back, interrupted transition, reduced motion, no orphaned overlay or style. |
| Viewer | Mouse, keyboard, touch, Escape, arrows, focus containment/return, background inertness, scroll lock, loading/error, 1/6 and 6/6 boundaries. |
| Progressive enhancement | Full article and ordinary links with JavaScript disabled; direct image destinations remain usable. |
| Performance | Production build; JS/chunk delta; image request timing; Next image `sizes`; CLS; Lighthouse desktop/mobile; long-task inspection during route and viewer transitions. |
| Accessibility | axe, Lighthouse, contrast for both surfaces, visible focus, 44px targets, reduced motion, zoom/reflow, captions and status announcements. |

## Owner decision required before implementation

No new factual input or image asset is required for 08A. The current verified
content, six approved screenshots, live URL, architecture URL, and accepted V2
design system are sufficient.

The owner approved checkpoints **08A–08B** and authorized implementation of
**08C**. Later checkpoints remain behind their own preview and approval gates.
