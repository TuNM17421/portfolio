# Homepage Design Contract

> **Status:** Active implementation contract
> **Scope:** `src/app/[locale]/page.tsx` and its homepage components
> **Precedence:** This page-level contract overrides `design-system/MASTER.md`
> where the two documents disagree. Phase 8 must reconcile the master document
> with the completed implementation.

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
| Content hierarchy | 1. Name, canonical role, location, concise positioning, and flagship CTA. 2. VCareer problem, direct contribution, verified outcomes, and real links. 3. FPT experience and Codex Hackathon evidence. 4. Supporting projects, skills, education, languages, and contact. |
| Section order | Hero → Featured Project / Projects → Experience → Awards → Skills → Contact. Header navigation follows the same order. |
| Navigation and controls | Sticky section navigation remains. The primary hero CTA opens the VCareer case study. Secondary project actions render only when a destination exists. Language and theme are secondary utilities. |
| Visual language | Keep Inter, mono metadata labels, the violet-to-cyan identity, semantic tokens, dark/light parity, real product screenshots, portrait photography, and real event photography. Glow and motion communicate hierarchy only. |
| Required states | Contact: unconfigured, idle, invalid, submitting, queued/sent, delivery error, and rate-limited when supported. Project links: public, private, and unavailable. Gallery: closed, open, navigating, and restored focus. Page: SSR/no-JS, hydrated, reduced-motion, and unsupported IntersectionObserver. |
| Responsive behavior | 375–767px uses a single-column evidence flow with visible skill names and no duplicate floating role/location cards. 768–1023px may use the two-column hero only while copy remains readable and controls do not wrap incorrectly. 1024px and 1440px use the existing `max-w-6xl` system. All interactive targets are at least 44×44px. |
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
- Supporting statistics use only verified evidence. A project count alone is
  not sufficient proof.

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

## Phase gates

| Phase | Exit condition |
| --- | --- |
| 1 — Contact | No false success; configured delivery has success/failure coverage; unconfigured delivery exposes only real contact paths. |
| 2 — Reveal | Hydrated, no-JS, observer-unavailable, and reduced-motion states all keep content readable. |
| 3 — Role | Canonical role never becomes partial or empty and has one valid accessible name. |
| 4 — VCareer | Flagship CTA reaches a localized case study with user-verified role, contributions, outcomes, and truthful link states. |
| 5 — Skills | Every skill name is visible without hover and the section remains usable at 375px. |
| 6 — Accessibility | No failing automated accessibility audit; manual keyboard, contrast, focus, zoom, and touch-target checks pass. |
| 7 — Mobile density | The evidence hierarchy is preserved and the measured mobile layout meets the agreed density targets. |
| 8 — Design system | `MASTER.md`, this contract, and implementation describe the same current rules. |
| 9 — Finish gate | Build, lint, tests, locales, themes, breakpoints, interaction states, no-JS, and reduced motion all pass. |

## Required user-verified inputs

These inputs gate later phases and must not be invented during implementation:

1. Contact delivery provider, verified sender, recipient, credentials, and an
   appropriate persistent rate-limit mechanism if a form is retained.
2. Confirmation that `Backend Software Engineer · AI Engineer` is the canonical
   public role label.
3. VCareer role, direct contributions, verified outcomes or metrics, live URL,
   repository URL, repository visibility, and screenshot-publication limits.
