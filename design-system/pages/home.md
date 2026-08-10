# Homepage Design Contract

> **Status:** Active implementation contract
> **Scope:** `src/app/[locale]/page.tsx` and its homepage components
> **Precedence:** This page-level contract overrides `design-system/MASTER.md`
> where the two documents disagree.

## Product outcome

The homepage helps a recruiter or engineering manager decide whether Nguyen
Manh Tu is a credible fit for a Backend Software Engineer / AI Engineer role,
inspect evidence of shipped work, and use a real contact path.

The page is a portfolio, not a generic developer dashboard. Every prominent
claim must be supported by an existing project, employment result, award, or
other user-verified evidence already present in the repository.

## Design contract

| Field | Decision |
| --- | --- |
| Screen job | Help a recruiter assess role fit and reach verifiable work without reading the entire page. |
| Primary user and action | A recruiter or engineering manager opens the VCareer flagship case study. Contact is the conversion action after evaluating evidence. |
| Canonical role | `Backend Software Engineer · AI Engineer`. The primary role is always visible and must not be deleted, truncated by animation, or duplicated as competing hero labels. |
| Content hierarchy | 1. Name, canonical role, location, concise positioning, and flagship CTA. 2. VCareer and supporting project evidence. 3. FPT experience and education. 4. Codex Hackathon evidence. 5. Skills and contact. |
| Section order | Hero → Featured Project / Projects → Experience → Awards → Skills → Contact. Header navigation follows the same order. |
| Navigation and controls | Sticky section navigation remains. The primary hero CTA opens the VCareer case study. Secondary project actions render only when a destination exists. Language and theme are secondary utilities. |
| Visual language | Keep Inter, mono metadata labels, the violet-to-cyan identity, semantic tokens, dark/light parity, real product screenshots, portrait photography, and real event photography. Glow and motion communicate hierarchy only. |
| Required states | Contact: unconfigured, idle, invalid, submitting, queued/sent, delivery error, and rate-limited when supported. Project links: public, private, and unavailable. Gallery: closed, open, navigating, and restored focus. Page: SSR/no-JS, hydrated, reduced-motion, and unsupported IntersectionObserver. |
| Responsive behavior | 375–767px uses a single-column evidence flow, a compact portrait, visible skill names, no duplicate floating role/location cards, and native disclosures for secondary project/experience/award detail. 768–1023px restores full evidence and may use the two-column hero. 1024px and 1440px use the `max-w-6xl` system. All interactive targets are at least 44×44px. |
| Evidence used | UIZZE references listed below plus repository evidence: VCareer, ScholarAI, Financial Planning, FPT Software results, Codex Community Hackathon, VinUniversity training, and the existing photo galleries. |
| Forbidden defaults | False success states, invented metrics, vague CTA labels with no destination, icon-only skill clouds, disappearing role text, decorative duplicate facts, hover-only information, inert project cards, and card collections that do not represent a real repeated set. |
| Acceptance criteria | Contact never claims delivery without provider confirmation; the canonical role is continuously visible; VCareer exposes verified contribution/outcome evidence; SSR/no-JS content remains readable; both themes meet contrast requirements; all controls work with keyboard and touch; and the finish gate passes at 375/768/1024/1440px in Vietnamese and English. |

## Reference evidence

References transfer structure and behavior only. Do not copy branding, copy,
imagery, proprietary assets, or an exact layout.

| Reference | Transferable decision | Why it fits this portfolio | Do not copy |
| --- | --- | --- | --- |
| [Dylan Brouwer](https://singapore.objective.company/design-media/e3/e384ab8122d78f72aee5b0119f87f916bafef2cffcd4e70eb2e63b5b608bd7a3.webp) | Strong personal identity followed immediately by visible work. | The visitor must remember the person and understand what they ship. | Cinematic imagery, extreme display type, or obscured supporting copy. |
| [Modal](https://singapore.objective.company/design-media/17/17f44d04ba09f3ed4122e77e32e11bd3e128d6c0be40c4c5f96034f67fac85dd.webp) | A precise technical specialty, one primary action, and proof near the hero. | Backend and AI positioning must be more specific than a rotating list of job titles. | Neon cube, customer logos, or Modal's visual identity. |
| [Vercel](https://singapore.objective.company/design-media/42/4202e89300304207ac9eb08c9c45f93785fb5c9cfa9491e60d1a74096280bfbd.webp) | Asymmetric hero with terse copy, one visual anchor, and explicit actions. | It supports the existing portrait-and-copy composition while reducing duplicate facts. | Triangle branding, client-logo strip, or whitespace without evidence. |
| [Framer](https://singapore.objective.company/design-media/01/01c6ebf7ad11cc67fe7165ef78cdac04b2153412de52c9ea2d95df602509cdd3.webp) | Shipped work is the immediate next step after the proposition. | VCareer should be reachable before a visitor scans the full resume. | Black-void minimalism or Framer's exact typography and spacing. |
| [GitHub](https://singapore.objective.company/design-media/dc/dc2fa8b45abe046ab3ddae3c270bad25128e65bac9d223f8ee32663e7d1a5575.webp) | Promise → primary action → product evidence. | The portfolio needs a direct path from role positioning to proof. | Email-signup flow, mascots, gradients, or GitHub product copy. |

## Content rules

### Hero

- The canonical role is stable text. Optional specialty motion must never leave
  the role blank and is ignored by assistive technology.
- Location appears once in the mobile information hierarchy.
- The primary CTA names and opens the VCareer case study.
- Supporting statistics use only verified evidence. The current proof is 2+
  years, 150+ VCareer pilot learners and the 2026 hackathon recognition; a
  project count alone is not sufficient proof.

### Projects and VCareer

- VCareer is the flagship case study.
- The case study contains: product problem, Tu's role, direct contributions,
  verified outcomes, architecture decisions, gallery evidence, and link state.
- `liveUrl` and `repoUrl` controls render only when their destinations exist.
- A private repository is stated as status text, not presented as a disabled or
  inert button.
- Outcomes and metrics require explicit user verification. The implementation
  must not infer them from screenshots, technology choices, or marketing copy.

### Contact

- A form may render only when a real delivery integration is configured.
- Without delivery configuration, the section exposes `mailto:`, GitHub, and
  LinkedIn as real contact paths and does not simulate form submission.
- The client displays success only after the server confirms that a provider
  accepted the message for delivery.
- Delivery errors preserve user input and offer a retry or direct-email path.
- Raw names, email addresses, and messages are not written to application logs.

### Skills

- Skill names are visible on touch, keyboard, and pointer interfaces.
- Skills are informational list items, not buttons unless a real action is
  added later.
- A tooltip may supplement a visible name but may not be the only label.

## Motion and progressive enhancement

- Server-rendered content is visible by default.
- JavaScript manages reveal animation only for below-the-fold elements that it
  successfully observes.
- A hydration failure, disabled JavaScript, or unsupported observer must leave
  all content readable.
- `prefers-reduced-motion: reduce` disables reveal, type, float, shimmer, pulse,
  and menu motion without removing information.
- Essential identity text never animates through a partial or empty value.

## Accessibility contract

- Normal-size text meets WCAG AA contrast of at least 4.5:1 in both themes.
- Large text meets at least 3:1.
- Every interactive target is at least 44×44 CSS pixels.
- Heading levels remain sequential within each section.
- Visible control text and badges are represented in the accessible name or
  explicitly hidden from assistive technology when redundant.
- Dialogs trap focus, close with Escape, lock background scroll, and restore
  focus to the invoking control.
- Validation focuses the first invalid field and exposes each error through its
  field's accessible description.

## Responsive density targets

At 375×812px, target these bounds without deleting verified evidence or using
line clamping that makes content unreachable:

| Region | Target height |
| --- | ---: |
| Hero | ≤ 1,050px |
| Experience | ≤ 1,600px |
| Projects | ≤ 1,850px |
| Full page | ≤ 7,500px |

Secondary details may use a real disclosure such as `<details>` when the
summary retains the decision-making evidence and the expanded content remains
keyboard accessible.

Measured on 2026-08-10 after Phase 7, with disclosures collapsed:

| Locale | Hero | Projects | Experience | Full page |
| --- | ---: | ---: | ---: | ---: |
| VI | 1,050px | 1,759px | 1,270px | 7,171px |
| EN | 1,050px | 1,693px | 1,330px | 7,205px |

## Phase gates

| Phase | Status | Exit condition |
| --- | --- | --- |
| 1 — Contact | Complete | No false success; configured delivery has success/failure coverage; unconfigured delivery exposes only real contact paths. |
| 2 — Reveal | Complete | Hydrated, no-JS, observer-unavailable, and reduced-motion states all keep content readable. |
| 3 — Role | Complete | Canonical role never becomes partial or empty and has one valid accessible name. |
| 4 — VCareer | Complete | Flagship CTA reaches a localized case study with user-verified role, contributions, outcomes, and truthful link states. |
| 5 — Skills | Complete | Every skill name is visible without hover and the section remains usable at 375px. |
| 6 — Accessibility | Complete | Lighthouse reaches 100 and axe has no violations; keyboard, contrast, focus and touch-target checks pass. |
| 7 — Mobile density | Complete | The evidence hierarchy is preserved and the measured mobile layout meets the agreed density targets. |
| 8 — Design system | Complete | `MASTER.md`, page contracts and implementation describe the same current rules. |
| 9 — Finish gate | Complete | Build, lint, tests, locales, themes, breakpoints, interaction states, no-JS and reduced motion all pass together. |

## Verified implementation inputs

- Contact delivery uses Resend and renders the form only when all three
  server-only environment variables are valid. `.env.example` contains the
  verified sender and recipient templates; no API key is committed.
- `Backend Software Engineer · AI Engineer` is the exact canonical public role
  in both locales.
- VCareer facts and publication permissions are recorded in
  `design-system/pages/vcareer.md`; production marketing placeholders are
  explicitly excluded.

## Finish gate evidence — 2026-08-10

- `npm test`: 5 files and 20 tests passed.
- `npm run lint` and `npx tsc --noEmit`: no lint or type errors.
- `npm run build`: production build passed for both locales on the homepage and
  VCareer case-study routes.
- Lighthouse accessibility: 100/100 on the homepage and VCareer case study.
- axe: zero violations across homepage/case study, VI/EN and dark/light themes.
- Browser layout audit: 32 page/locale/theme/breakpoint combinations at 375,
  768, 1024 and 1440px passed overflow, touch-target, accessible-name and
  heading-order assertions.
- At 375px, the final VI/EN page heights are 7,171/7,205px; hero is 1,050px,
  projects are 1,759/1,693px and experience is 1,270/1,330px.
- Keyboard checks passed for native disclosures, the mobile menu and the
  lightbox, including focus trap, arrow navigation, Escape and focus restore.
- JavaScript-disabled checks kept every reveal visible on all four localized
  routes; reduced motion removed background, shimmer, float, pulse and reveal
  animation without hiding content.
- The live product and public architecture report both returned HTTP 200; each
  localized case study rendered all six approved screenshots.
