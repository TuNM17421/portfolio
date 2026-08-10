# Portfolio — Design System (Master)

> **Source of truth** for shared visual and interaction decisions. A file under
> `design-system/pages/` overrides this document for its page. Runtime tokens
> live in `src/app/globals.css`.

**Product:** Backend Software Engineer · AI Engineer portfolio
**Updated:** 2026-08-10

## Product direction

This is an evidence-led engineering portfolio, not a generic developer
dashboard. The first screen identifies Nguyen Manh Tu and his canonical role;
the next screen exposes the VCareer flagship case study. Employment, awards,
supporting projects, skills and contact follow in hiring-decision order.

The visual direction is dark-first technical/premium: near-black surfaces,
violet-to-cyan identity, real product screenshots, restrained glow and a subtle
blueprint-grid ambience. Light mode is tuned independently and has equal
functional status.

## Page architecture

| Route | Job | Page contract |
| --- | --- | --- |
| `/[locale]` | Establish role fit, lead to proof, then convert to contact. | `design-system/pages/home.md` |
| `/[locale]/projects/vcareer` | Present verified scope, outcomes, architecture and link state for the flagship project. | `design-system/pages/vcareer.md` |

Homepage order and header order are identical:

**Hero → Projects → Experience → Awards → Skills → Contact**

## Color

Semantic UI color comes from tokens. Brand marks and deliberate skill-category
accents may retain their official hex values; component surfaces, text, borders,
states and actions must not introduce arbitrary raw colors.

| Role | Dark | Light | Token / utility |
| --- | --- | --- | --- |
| Primary | `#7c6cff` | `#6d5cf5` | `--primary` |
| Cyan text accent | `#22d3ee` | `#0e7490` | `--accent-2` |
| Faint text | `#858591` | `#666670` | `--faint` |
| Background | `#08080b` | `#fafafb` | `--background` |
| Surface | `#131319` | `#ffffff` | `--surface` |
| Foreground | `#f4f4f6` | `#0d0d12` | `--foreground` |
| Muted text | `#a1a1ad` | `#55555f` | `--muted-foreground` |
| Border | `#24242e` | `#e6e6ec` | `--border` |
| Destructive | `#f87171` | `#dc2626` | `--destructive` |
| Decorative text gradient | `#a99bff → #5eead4` | `#6d5cf5 → #0e7490` | `.text-gradient` |
| Functional button gradient | `#6554e8 → #0e7490` | `#6d5cf5 → #0e7490` | `.bg-brand` |

Functional color is never the only signal. Normal text must reach at least
4.5:1 and large text at least 3:1 in both themes. Button-gradient endpoints
must each support white text at 4.5:1; this is enforced by
`src/lib/accessibility-tokens.test.ts`.

## Typography

- Inter is loaded through `next/font/google` and mapped to `--font-sans`.
- The system mono stack is reserved for metadata, periods, indexes and compact
  technical labels.
- Body copy is normally 14–16px with 1.5–1.7 line-height.
- Display hierarchy uses strong weight and tight tracking; body text never uses
  decorative gradient or glow.

## Layout and responsive density

- Container: `max-w-6xl` with 24px mobile gutters.
- Breakpoints to verify: 375, 768, 1024 and 1440px.
- Desktop section rhythm remains `sm:py-28`; mobile sections use the compact
  page-specific values in `pages/home.md`.
- No horizontal scroll at any supported breakpoint or at reflow-equivalent
  zoom widths.
- Mobile keeps decision-making evidence visible and moves secondary tech,
  bullets and event photos into native `<details>` disclosures.
- Skill names remain visible without opening a disclosure or invoking hover.

## Interaction and state

- Every interactive target is at least 44×44 CSS pixels.
- Links and buttons have a visible 2px focus outline; focus is never removed.
- Hover/press motion lasts 150–300ms and uses transform/opacity where possible.
- The lightbox traps focus, supports Escape/arrow keys, locks body scroll and
  restores focus to its invoking gallery button.
- Gallery-button accessible names include the visible screenshot count.
- Private or unavailable project destinations render as text state, never as an
  inert or disabled fake button.
- Contact success appears only after Resend accepts the message for delivery.

## Motion and progressive enhancement

- Server-rendered content is visible by default.
- `.reveal-active` is applied only after JavaScript successfully creates the
  reveal observer.
- The canonical role is static; essential evidence never types through an empty
  or partial state.
- `prefers-reduced-motion: reduce` disables reveal, float, pulse, shimmer,
  background and menu animation without removing information.

## Content and evidence rules

- Prominent claims require a user-verified metric, source, screenshot, award or
  work result already represented in the repository.
- Marketing placeholders from a linked production product are not portfolio
  evidence.
- A public live URL and public architecture report may be actions. A private
  source repository is explanatory status text.
- Roadmap items are explicitly labeled pending/not shipped.
- Do not merge facts between projects or award tracks.

## Anti-patterns

- Invented metrics, placeholder traction or employment-outcome claims.
- Vague CTA labels with no destination, inert project buttons or fake success.
- Icon-only skill clouds, hover-only essential text or mobile-only hidden names.
- Emoji as structural icons; use the matching SVG icon system.
- Light mode produced by simple inversion rather than independently checked
  tokens.
- Long mobile pages created by repeating desktop evidence without progressive
  disclosure.

## Pre-delivery checklist

- [ ] Page-specific contract and implementation agree.
- [ ] Build, lint, typecheck and tests pass.
- [ ] Lighthouse and axe have no accessibility failures in both themes.
- [ ] Keyboard focus, disclosure, gallery and contact states work.
- [ ] 375 / 768 / 1024 / 1440 have no horizontal overflow in VI and EN.
- [ ] SSR/no-JS and reduced-motion retain all essential information.
- [ ] Real external destinations return successfully; private destinations are
      text state.
