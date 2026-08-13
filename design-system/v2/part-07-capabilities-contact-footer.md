# Part 07 — Evidence routing, contact, and footer

> **Status:** 07A–07B approved and committed; 07C implemented for owner review
>
> **Branch:** `redesign/portfolio-v2`
>
> **Implementation status:** 07A committed at `48577f1`; 07B committed at
> `7f04705`; 07C is implemented and intentionally uncommitted; 07D–07E have
> not started
>
> **Scope:** Final homepage chapter only. Part 08 case-study migration remains
> separate.

## Outcome

Part 07 turns the end of the portfolio into one clear hiring decision:

1. understand which capabilities are strongest;
2. see which shipped project or professional record supports each capability;
3. open a real contact channel without searching through a generic footer.

The screen is not a second project recap and not a catalogue of every tool ever
used. The visual idea is **Evidence Routing → Open Channel**: the system signal
leaving Recognition becomes a routing board for four evidence-backed
capabilities, then those routes reconverge into the email action.

```text
RECOGNITION / verified record
                │
                ▼
      EVIDENCE ROUTING BOARD
  ┌──────────┬──────────┬──────────┬──────────┐
  │ Backend  │ Realtime │ Retrieval│ Delivery │
  │ evidence │ evidence │ evidence │ evidence │
  └──────────┴──────────┴──────────┴──────────┘
             \       |       /
              \      |      /
                 OPEN CHANNEL
             tunm17421@gmail.com
              form · GitHub · LinkedIn
                       │
                    FOOTER
```

## Why V1 cannot be migrated directly

### Repository audit

| Existing asset                                                  | What is real and reusable                                                                                                                            | Why it cannot define V2                                                                                                                                                   |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/data/skills.ts`                                            | 31 named technologies in four categories; all current icon assets exist.                                                                             | Four equal logo cards flatten primary expertise and incidental tooling into the same rank. A logo wall also repeats technologies already visible beside project evidence. |
| `src/components/sections/skills-section.tsx`                    | Skill names are visible on touch and keyboard paths.                                                                                                 | The card grid, category icons, hover lift, and brand-colour marks are a generic toolbox treatment and do not explain where a capability was demonstrated.                 |
| `src/components/sections/contact-section.tsx`                   | Real validation, explicit delivery states, direct email/GitHub/LinkedIn, and an API-backed message form.                                             | The centered rounded card weakens the final action and makes the form look more important than the reliable direct-email path.                                            |
| `src/app/api/contact/route.ts` and `src/lib/contact-handler.ts` | A real Resend flow returns `202` only after delivery is accepted and distinguishes validation, unavailable, rate-limit, and delivery failure states. | V2 needs to preserve this behavior and expose all states; it must not replace the endpoint with a decorative success animation.                                           |
| `src/components/site-footer.tsx`                                | Name, year, and localized footer strings exist.                                                                                                      | `Built with Next.js & Tailwind CSS` is implementation trivia, not a reason to hire or contact Tu.                                                                         |
| `src/data/socials.ts`                                           | Verified email, GitHub, and LinkedIn destinations.                                                                                                   | No issue; these remain the canonical destinations.                                                                                                                        |
| `public/Nguyen Manh Tu_CV.pdf`                                  | Owner-supplied current CV; validated as a one-page, unencrypted A4 PDF with an extractable text layer and the correct name marker.                   | Use the real same-origin PDF action. Do not duplicate its content into a second invented resume or infer new claims from it without a separate content review.            |

The V1 list remains valid source data. Part 07 selects the decision-relevant
subset and couples it to proof instead of deleting or rewriting the V1 page.

## Truth boundary

- Do not use self-rated bars, percentages, `expert` labels, years-per-skill, or
  animated counters.
- Do not imply that Tu owned every VCareer component. VCareer retains the
  direct-scope boundary from Part 04.
- ScholarAI may support `solo · end-to-end` because that boundary was audited
  in Part 05.
- Financial Planning remains a source archive and backend-lead record, not a
  live system.
- Do not show `available for work`, a response-time promise, freelance status,
  or preferred employment type until the owner confirms it.
- The CV action must resolve to the owner-supplied
  `/Nguyen%20Manh%20Tu_CV.pdf`. The download filename may be normalized to
  `Nguyen-Manh-Tu-CV.pdf`, but the source PDF remains unchanged.
- The contact form may report only the state returned by the real endpoint. A
  `202` means accepted for delivery; it is not proof that the recipient read the
  message.

## Reference evidence

The references below transfer information architecture and motion discipline,
not palette, typography, copy, or brand identity.

| Reference                                                                                                                                                                                                      | Transfer                                                                                                      | Why it fits Part 07                                                                                     | Do not copy                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Dylan Brouwer — UIZZE capture](https://singapore.objective.company/design-media/e3/e384ab8122d78f72aee5b0119f87f916bafef2cffcd4e70eb2e63b5b608bd7a3.webp) · [official site](https://www.dylanbrouwer.design/) | Large typography can carry the closing scene while `Contact` remains a direct, plain-language action.         | Part 07 needs one unmistakable final action, not another dense dashboard.                               | Monochrome identity, gradient wording, monitor mockup, exact navigation, or its closing copy.         |
| [Workable — UIZZE capture](https://singapore.objective.company/design-media/96/960717840968496d1355543971654cc1df7cd341b39d1b761ba300c4135fd023.webp)                                                          | A capability statement is immediately paired with contextual evidence rather than shown as an isolated score. | It supports the decision to route every capability back to a project or professional record.            | Recruiting-agent UI, candidate cards, fit percentages, purple palette, or SaaS chrome.                |
| [GitHub — UIZZE capture](https://singapore.objective.company/design-media/dc/dc2fa8b45abe046ab3ddae3c270bad25128e65bac9d223f8ee32663e7d1a5575.webp) · [official homepage](https://github.com/home/)            | One primary conversion action sits beside a clearly secondary route.                                          | Direct email can dominate while GitHub, LinkedIn, and the form remain useful without competing equally. | Mascots, galaxy treatment, signup copy, green CTA, product navigation, or exact centered composition. |
| [Active Theory — UIZZE capture](https://singapore.objective.company/design-media/41/4153da6aee4fd22caf121a96c9b8fbdf232e32e81b972fd8eb8264b344386ea5.webp)                                                     | One central system event receives the motion budget while Work and Contact navigation stay restrained.        | The routing-to-email convergence can be the memorable event without adding unrelated ambient loops.     | WebGL object, particles, black palette, pill navigation, or its interaction model.                    |

Motion follows the existing Motion for React stack. The official `useScroll`
contract supports an element-targeted, reversible progress range; `useTransform`
maps the progress into GPU-friendly transforms and opacity. Reduced-motion
users receive the already-complete static route map rather than a slower
version of the same choreography.

## Approaches considered

| Direction                       | Strength                                                                                                                            | Failure mode                                                                                                                                        | Decision                           |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Technology constellation        | Can create an immediate cinematic impression with 31 moving marks.                                                                  | It is still a logo wall in disguise, gives every tool equal rank, adds hover dependence, and has no direct proof relationship.                      | Reject.                            |
| Full system topology            | Can connect backend, AI, frontend, deployment, and data as one large architecture diagram.                                          | Parts 04 and 05 already spend the architecture metaphor. Repeating it would turn the end into another case study and make mobile reading expensive. | Reject.                            |
| Evidence routing → open channel | Uses the existing signal language to connect four concise capabilities to named proof, then converts that same signal into contact. | The routes can become decorative or dense if proof anchors and mobile reduction are weak.                                                           | Select, with the safeguards below. |

### Self-critique of the selected direction

- A line alone is not evidence. Every route must terminate at a visible named
  project/role link even if all motion is removed.
- Four capability lanes are the upper bound. If copy wraps into a technology
  catalogue at 375px, reduce technology detail instead of shrinking type.
- The email convergence risks looking like another ornamental divider. It is
  retained only if 07C makes the relationship legible: the routes visibly end
  at the email focus/underline and the email remains the dominant interactive
  object.
- A dark Contact scene after a light Skills scene adds another tone cut. The
  cut is justified only because it closes the narrative and keeps the form from
  reading like a fifth capability card.

## Design contract

| Field                   | Decision                                                                                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Screen job              | Convert verified work into a concise capability model and one reliable contact action.                                                                                                                                                                  |
| Primary user            | Recruiter, engineering manager, or technical founder who has reached the end of the evidence narrative.                                                                                                                                                 |
| Primary action          | Open an email to `tunm17421@gmail.com`.                                                                                                                                                                                                                 |
| Secondary actions       | Download the real CV PDF, send through the real form, inspect GitHub, or open LinkedIn.                                                                                                                                                                 |
| Hierarchy               | Evidence-backed capabilities → oversized email → optional form/socials → quiet footer.                                                                                                                                                                  |
| Layout                  | Full-width mineral routing sheet followed by one night-glass contact field; content stays on the established V2 edge grid instead of entering centered cards.                                                                                           |
| Visual direction        | Mineral capability sheet followed by a night-glass contact field. Existing V2 fonts and tokens only.                                                                                                                                                    |
| Type system             | Anybody display, Be Vietnam Pro body, IBM Plex Mono metadata; no additional font family.                                                                                                                                                                |
| Palette                 | Existing night, mineral, focus-cyan, ceremony-blue, teal, and signal-blue tokens only.                                                                                                                                                                  |
| Spacing rhythm          | Preserve the V2 outer gutters and section rail; capability rows use one consistent vertical unit. No extra fullscreen opener and no long blank dwell between Recognition, Skills, and Contact.                                                          |
| Signature               | The capability ledger reconverges within Skills, then Contact uses the oversized email baseline as its only signal event. Recognition and chapter boundaries stay clean instead of repeating the inter-chapter motif.                                   |
| Aesthetic risk          | Let the mineral-to-night surface cut stand without a connecting signal. The oversized email baseline carries the final action without turning every chapter boundary into the same animation.                                                           |
| Responsive behavior     | Wide routing board on desktop; one vertical bus with four short evidence branches on compact screens. No horizontal swipe rail and no hover-only labels.                                                                                                |
| Motion behavior         | Natural-scroll, reversible routing over a short range. No long pinned dwell, autoplay loop, or scroll-jacking.                                                                                                                                          |
| Progressive enhancement | All capabilities, proof labels, email, social links, and footer render complete before hydration. Direct email remains the no-JS conversion path.                                                                                                       |
| Accessibility           | Semantic headings/lists, visible text labels, 44px targets, clear focus, status announcements, explicit errors, and a static reduced-motion route.                                                                                                      |
| Evidence used           | Parts 04–06 ownership contracts, V1 skill/social data, the working Resend handler, four interface references, and the existing V2 signal/type/palette system.                                                                                           |
| Forbidden defaults      | Logo wall, proficiency bars, equal rounded cards, tag cloud, infinite marquee, generic `Let's work together`, fake availability, fake response time, disabled CV button, decorative terminal, or `Built with` footer copy.                              |
| Acceptance criteria     | Every surfaced capability resolves to real proof; email is the primary conversion; all delivery states are truthful; reverse scroll, reduced motion, no-JS, keyboard, touch, locale, contrast, CLS, and supported widths pass the recorded finish gate. |

## Visual and motion direction

### Surface cadence

1. Recognition remains fully night-glass until its final document and caption
   clear the chapter boundary. The mineral Part 07 surface must not rise behind
   or wash out the Recognition content early.
2. Recognition ends directly at the mineral Part 07 surface. No transition
   signal is added because that motif already appears repeatedly earlier.
3. The capability chapter uses the mineral surface so dense labels stay calm
   and readable.
4. The routes converge and stop inside Skills. The night-glass contact field
   begins with a clean surface cut only after the capability list is complete.
5. Footer content remains inside the contact field, avoiding a third surface
   change at the end of the page.

No new palette is introduced:

| Role                                | Existing token                                                        |
| ----------------------------------- | --------------------------------------------------------------------- |
| Contact field / deepest routing ink | Night glass `#071219`                                                 |
| Supporting dark plane               | Deep lens blue `#0B2738`                                              |
| Capability sheet                    | Mineral white `#EDF4F5`                                               |
| Active route and focus              | Focus cyan `#6BD7D0`                                                  |
| Secondary dark text/accent          | Existing teal / ceremony blue tokens                                  |
| Proof-source distinction            | Existing signal blue, used sparingly and never as a new chapter brand |

### Typography

- `Anybody` remains the display face for the capability title and oversized
  email; it must retain Vietnamese marks and enough line box height.
- `Be Vietnam Pro` handles descriptions and form copy.
- `IBM Plex Mono` handles capability IDs, technologies, evidence routes, form
  state, and footer utility labels.
- Brand logos are not the visual hierarchy. Technology names remain readable
  text at every breakpoint.

### Motion sequence

```text
Recognition exit          Capability sheet       clean cut    Contact field

      │                   ┌───────────────┐
      ●───────────────┬──▶│ 01 Backend    │
                      ├──▶│ 02 Realtime   │──┐
                      ├──▶│ 03 Retrieval  │  ├──▶ centre node
                      └──▶│ 04 Delivery   │──┘
                          └───────────────┘

                                                           ───── @ ─────
                                                            email baseline
```

- The branch drawing is tied to section progress and reverses on upward scroll.
- Capability copy is already present; the signal changes emphasis rather than
  gatekeeping readability.
- The desktop animation completes within roughly `0.6–0.8` viewport of normal
  scrolling. It must not add a multi-screen sticky tax.
- Mobile uses one vertical route with short branches so labels never become a
  miniature desktop diagram.
- Pointer hover/focus may run a short pulse from a capability to its evidence
  anchor. Touch activation and keyboard focus produce the same state.
- When reduced motion is active, all routes are fully drawn, proof labels are
  equally emphasized, and only instant state colour changes remain.

## Content contract

### Chapter rail

| Content            | Vietnamese                                                            | English                                                                    |
| ------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Eyebrow            | `07 / NĂNG LỰC & LIÊN HỆ`                                             | `07 / CAPABILITIES & CONTACT`                                              |
| Axis               | `HỆ THỐNG ĐÃ SHIP → KÊNH TRAO ĐỔI`                                    | `SHIPPED SYSTEMS → OPEN CHANNEL`                                           |
| Capability title   | `Năng lực được neo vào bằng chứng.`                                   | `Capabilities anchored in evidence.`                                       |
| Capability summary | `Mỗi nhóm năng lực dẫn ngược về dự án hoặc vai trò đã chứng minh nó.` | `Each capability routes back to the project or role that demonstrates it.` |

### Evidence-backed capabilities

Technology text is context, not a claim that every item has equal depth.

| ID  | Capability                                                       | Public description                                                            | Technologies / methods                                                               | Proof route                                                             |
| --- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| 01  | `Hệ thống backend` / `Backend systems`                           | APIs, business logic, relational data, asynchronous and scheduled processing. | Java · Spring Boot · PostgreSQL · SQL Server · Redis · AWS SQS · Docker · LocalStack | `FPT Software` → `#career`; `Financial Planning` → `#financial-archive` |
| 02  | `Trải nghiệm AI realtime` / `Realtime AI experiences`            | Realtime session foundation for a live AI interview experience.               | LiveKit · WebRTC                                                                     | `VCareer · direct scope` → `#vcareer`                                   |
| 03  | `Truy xuất & đánh giá` / `Retrieval & evaluation`                | Hybrid retrieval, grounded citations, and evaluation loops.                   | FastAPI · Qdrant · BM25/RRF · RAG · LangSmith · PostgreSQL                           | `ScholarAI · solo project` → `#scholarai`                               |
| 04  | `Phát triển sản phẩm end-to-end` / `End-to-end product delivery` | Product workflow, frontend/backend integration, and a usable delivery path.   | TypeScript · React · Next.js · FastAPI                                               | `ScholarAI · solo end-to-end`; `VCareer · six-week team delivery`       |

The selected list intentionally excludes generic deployment vendors, build
tools, and UI libraries that do not change the hiring decision. They remain in
the V1 dataset and may re-enter only when attached to useful evidence.

### Contact field

| Content           | Vietnamese                                                                                                   | English                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Eyebrow           | `MỞ KÊNH TRAO ĐỔI`                                                                                           | `OPEN A CHANNEL`                                                                                                  |
| Title             | `Có một hệ thống đáng để cùng xây?`                                                                          | `Have a system worth building?`                                                                                   |
| Body              | `Mình quan tâm tới backend, sản phẩm AI realtime và những bài toán cần biến mô hình thành trải nghiệm thật.` | `I’m interested in reliable backends, realtime AI products, and problems that turn models into real experiences.` |
| Primary action    | `tunm17421@gmail.com`                                                                                        | `tunm17421@gmail.com`                                                                                             |
| Form label        | `Hoặc gửi lời nhắn tại đây`                                                                                  | `Or send a message here`                                                                                          |
| Secondary actions | `Tải CV` · `GitHub` · `LinkedIn`                                                                             | `Download CV` · `GitHub` · `LinkedIn`                                                                             |

The form reuses the current localized field/error copy unless review exposes a
V2-specific wording issue. Email remains visible beside every error state.

### Footer

```text
Nguyen Manh Tu
Software Engineer · AI Engineer
Hanoi, Vietnam

GitHub ↗   LinkedIn ↗   Back to top ↑
© 2026 Nguyen Manh Tu
```

- Remove `Built with Next.js & Tailwind CSS`.
- `Back to top` targets the existing document, does not reload the route, and
  does not replay the Intro.
- Do not duplicate a technology list, navigation sitemap, or availability
  badge in the footer.
- The CV action lives in the Contact field and is not repeated in this footer.

## Header and chapter-tone contract

- Preserve the approved Part 06 decision: Header `Contact/Liên hệ` remains a
  direct `mailto:` action and does not become a third chapter tab.
- Add `skills` and `contact` to the chapter-tone model only for colour and
  locale/hash preservation. They do not add two more visible header links.
- `Career` is no longer current after Recognition hands off into Skills. Both
  Work and Career traces settle to inactive in Skills, Contact, and Footer.
- Header tone sequence becomes:
  `Recognition dark → Skills light → Contact/Footer dark`.
- Locale switching preserves `#skills` or `#contact` and any forced contact
  review state.
- Add a real `#top` target to the Hero for the footer return action.

## Interaction states

### Capability routes

- static before hydration;
- forward and reverse scroll;
- pointer hover;
- keyboard focus;
- touch activation;
- direct hash entry;
- reduced-motion static;
- narrow/short viewport;
- no-JS.

### Contact form

- ready;
- client validation error with focus moved to the first invalid field;
- sending with duplicate submission disabled;
- `202` accepted-for-delivery success;
- `429` rate-limited with direct email fallback;
- `502` delivery failure with direct email fallback;
- `503` delivery unavailable with direct email fallback;
- offline/network failure;
- server configuration absent;
- no-JS direct-email fallback.

Proposed deterministic review URLs:

```text
/vi/v2?intro=0#skills
/en/v2?intro=0#skills
/vi/v2?intro=0#contact
/vi/v2?intro=0&contact=ready#contact
/vi/v2?intro=0&contact=validation#contact
/vi/v2?intro=0&contact=sending#contact
/vi/v2?intro=0&contact=success#contact
/vi/v2?intro=0&contact=rate-limit#contact
/vi/v2?intro=0&contact=error#contact
/vi/v2?intro=0&contact=unavailable#contact
/vi/v2?intro=0&contact=static#contact
```

Forced states are review controls only. They do not mutate the API, send email,
or expose environment configuration.

## Implementation checkpoints

### 07A — Static capability foundation

Implement only the complete semantic foundation:

- localized Part 07 copy and typed capability data;
- Recognition → Skills surface boundary with no animated routing yet;
- mineral capability ledger with four proof-linked routes;
- text labels visible at desktop, mobile, keyboard, touch, no-JS, and reduced
  motion;
- real internal links to VCareer, ScholarAI, Financial Planning, and Career;
- no form and no footer redesign yet.

Review focus:

- information hierarchy and selected capabilities;
- whether four routes represent Tu accurately;
- page length and mobile reading order;
- no overlap with the final Recognition document.

Acceptance:

- no logo wall or equal rounded cards;
- every capability names at least one real proof source;
- no direct-scope claim exceeds Parts 04–06;
- 320–1920px has no clipped typography or horizontal overflow;
- VI/EN content is equivalent.

Implementation record (approved and committed at `48577f1`):

- the full localized ledger renders in server HTML and does not depend on
  hydration for its labels or proof routes;
- all four proof destinations resolve in the normal V2 narrative;
- desktop `1440×1000` and mobile `375×812` renders were visually inspected;
- both inspected widths report `scrollWidth === clientWidth`;
- the 07A subtree contains no CSS animation or transition yet;
- scoped lint, TypeScript, `145` tests, `git diff --check`, and production build
  pass. The V2 route remains `85.8 kB` / `197 kB` First Load JS in this build.

### 07B — Evidence-routing motion

Add the Part 07 signature only after 07A is approved:

- signal branches into four capability routes;
- active route emphasis follows scroll, pointer, focus, and touch;
- routes reconverge at the lower Skills boundary;
- mobile becomes one vertical route bus;
- reverse scroll and live reduced-motion changes remain correct.

Review focus:

- signal visibility without text overlap;
- route speed and whether the effect adds understanding;
- no long sticky dwell.

Acceptance:

- all copy remains readable before and during motion;
- the route is reversible and deterministic;
- reduced motion shows the final static map;
- no ambient loop continues after the chapter settles;
- no layout shift is caused by line drawing or active states.

Implementation record (approved and committed at `7f04705`):

- Recognition ends directly at the mineral Skills surface with no repeated
  handoff signal; the routing motion begins only at the capability ledger;
- a geometry-bound route bus contacts each capability lane and terminates at a
  90-degree convergence node;
- lane packets and the vertical cursor use measured GPU transforms rather than
  changing layout coordinates;
- forward and reverse sampling selects all four routes in order; pointer hover,
  keyboard focus, and pressed/touch-equivalent states produce the same emphasis;
- live reduced-motion switching removes enhancement styles and restores the
  already-complete static route map;
- 320, 375, 768, 1024, 1440, and 1920px report no horizontal overflow, and
  a full forward/reverse Part 07 sample records `CLS = 0`;
- TypeScript, scoped lint, `146` tests, `git diff --check`, and production build
  pass. The V2 route is `86.9 kB` / `198 kB` First Load JS in this build.

### 07C — Contact conversion field

Build the visual close before wiring the form:

- transition the converged signal into the night-glass contact field;
- add contact eyebrow, title, positioning line, and oversized real email;
- add the real CV download, GitHub, and LinkedIn actions;
- reserve the form region as a static layout boundary only;
- keep Header Contact as the approved mail action.

Review focus:

- oversized email scale and wrapping;
- Skills → Contact surface timing;
- hierarchy between email and secondary social actions;
- mobile density and short-height behavior.

Acceptance:

- email is the unmistakable primary action;
- its entire visible/focusable target is at least 44px;
- `mailto:` does not open a forced blank tab;
- the CV action resolves to the validated same-origin PDF and exposes the
  normalized download filename `Nguyen-Manh-Tu-CV.pdf`;
- external socials identify new-tab behavior;
- no availability or response-time claim is invented.

Implementation record (awaiting owner review):

- the capability routes reconverge and stop at the centre node inside Skills;
  the mineral-to-night chapter boundary has no stem, falling node, or repeated
  transition motif;
- Contact begins with a clean surface cut, then its email baseline expands from
  the centre with the `@` junction as the visual focus;
- the direct `mailto:` action is the largest interactive object and never opens
  a forced blank tab;
- the owner-supplied A4 PDF is served from the same origin and downloads as
  `Nguyen-Manh-Tu-CV.pdf`; GitHub and LinkedIn retain explicit new-tab names;
- no form controls, fake submission state, availability, or response-time copy
  have been introduced; a non-interactive boundary marks the later 07D region;
- server HTML contains the complete VI/EN contact copy and destinations;
  reduced motion renders the complete static route and contact field;
- 320, 375, 768, 1440, and 1920px report no horizontal overflow, the sampled
  forward/reverse Skills → Contact sequence records `CLS = 0`, and all contact
  targets remain at least 44px tall;
- TypeScript, scoped lint, `149` tests, `git diff --check`, and production build
  pass. The V2 route is `87.9 kB` / `199 kB` First Load JS in this build.

### 07D — Real form and state machine

Integrate the existing Resend path as an optional secondary channel:

- reuse shared schema and delivery endpoint behavior;
- add deterministic, non-sending review controls for every state;
- preserve one submission ID across retries and prevent duplicates while
  sending;
- focus the first invalid field;
- announce success with `role=status` and errors with `role=alert`;
- keep direct email visible in every failure/unavailable state;
- ensure the no-JS path never produces a false submit or false success.

Review focus:

- form density relative to the email action;
- ready/sending/success/error motion;
- wording of accepted-for-delivery success;
- configured and unconfigured environments.

Acceptance:

- no success state appears before a real `202` in normal mode;
- 429/502/503/offline paths are distinct and useful;
- fields retain labels, autocomplete, required state, and error association;
- forced review states never call `/api/contact`;
- form state changes do not move the footer unpredictably.

### 07E — Footer, orientation, and finish gate

Complete the page close and integration:

- replace the V1-style footer copy with the quiet V2 identity row;
- add Back to top without route reload or Intro replay;
- extend chapter tone and locale/hash preservation through Skills and Contact;
- retire active Work/Career traces after Recognition;
- run the complete Part 07 finish gate.

Review focus:

- whether the final screen feels complete rather than appended;
- footer density and back-to-top behavior;
- dark/light header transitions in both scroll directions;
- end-of-page spacing at desktop/mobile/short-height viewports.

Acceptance:

- `#skills`, `#contact`, and `#top` work with and without JavaScript;
- VI/EN switching preserves the final chapter;
- header tone is correct forward and reverse;
- no footer link is duplicated without a clear purpose;
- no horizontal overflow at 320, 375, 768, 899, 900, 1024, 1440, and 1920px;
- all visible controls meet 44px target and contrast requirements;
- keyboard order, focus visibility, reduced motion, no-JS, CLS, image requests,
  route bundle, tests, lint, type check, and production build are recorded.

## Finish gate

Part 07 is not complete until the following evidence is recorded:

1. rendered screenshots for both locales at compact, tablet, desktop, and
   short-height desktop sizes;
2. forward/reverse scroll sampling at Recognition → Skills → Contact;
3. keyboard-only capability, email, social, form, and footer flow;
4. touch path with no hover-only information;
5. live `prefers-reduced-motion` change while the page is open;
6. no-JS render with full capabilities and a working direct-email fallback;
7. forced contact-state screenshots and assertions;
8. axe and Lighthouse accessibility checks;
9. CLS and horizontal-overflow measurement;
10. route bundle comparison against the Part 06 baseline (`85 kB` route,
    `196 kB` First Load JS in its recorded build);
11. tests, scoped lint, TypeScript, `git diff --check`, and production build.

## Confirmed owner inputs

1. Keep the real Resend form as a secondary contact channel; direct email stays
   primary.
2. Omit public full-time, freelance/collaboration, availability, and response-
   time status until the owner supplies explicit wording.
3. Use `public/Nguyen Manh Tu_CV.pdf` for the Contact-field Download CV action.
   The supplied file is a valid one-page, unencrypted A4 PDF with extractable
   text. No CV-related input blocks 07A–07E.

## Explicit non-goals

- 07A does not implement routing animation, Contact, the form, or the footer
  redesign.
- No CV is generated from existing portfolio copy.
- No new technology claims are inferred from icons alone.
- No Part 08 case-study styling or route transition is pulled forward.
- No new animation engine, 3D scene, background particles, or generic cursor
  effect is introduced for the final chapter.
