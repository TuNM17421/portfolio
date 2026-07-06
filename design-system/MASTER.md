# Portfolio — Design System (Master)

> **Source of truth** for visual + interaction decisions. When building a page,
> check `design-system/pages/<page>.md` first; if it exists it overrides this file.
> Tokens live in `src/app/globals.css` — reference semantic tokens, never raw hex.

**Product:** AI/ML engineer personal portfolio · **Generated:** 2026-07-06 (UI/UX Pro Max)

---

## Verdict — validated direction

The skill's recommendation (**Portfolio Grid + Dark Mode OLED + Inter**) matches the
work already in the repo. Keep the current dark-first, token-driven foundation.
Two deltas worth applying, listed under *Recommended changes*.

---

## Style

**Dark Mode (OLED), technical/premium.** High contrast, deep near-black surfaces,
minimal glow accents, blueprint grid ambience. Light mode is a first-class opt-in
via `:root[data-theme="light"]` (already implemented) — not an afterthought.

- Key effects: minimal brand glow (`.glow-brand`), gradient text (`.text-gradient`),
  subtle floaty/pulse accents, `prefers-reduced-motion` honored.
- Avoid: heavy shadows, decorative-only motion, glow on body text.

## Color (semantic tokens — see `globals.css`)

Distinctive **violet → cyan** identity (stronger than the generic CSV blue).

| Role | Dark | Light | Token |
|------|------|-------|-------|
| Primary (brand) | `#7c6cff` | `#6d5cf5` | `--primary` / `bg-primary` |
| Accent 2 | `#22d3ee` | `#0891b2` | `--accent-2` |
| Gradient | `#a99bff → #5eead4` | `#6d5cf5 → #0891b2` | `.text-gradient` / `.bg-brand` |
| Background | `#08080b` | `#fafafb` | `--background` |
| Surface | `#131319` | `#ffffff` | `--surface` / `bg-surface` |
| Foreground | `#f4f4f6` | `#0d0d12` | `--foreground` |
| Muted text | `#a1a1ad` | `#55555f` | `--muted-foreground` |
| Border | `#24242e` | `#e6e6ec` | `--border` |
| Destructive | `#f87171` | `#dc2626` | `--destructive` |

**Rule:** functional color must never be the only signal — pair error/success with
icon or text. Verify every fg/bg pair ≥ 4.5:1 in *both* themes independently.

## Typography

- **Current:** system sans + system mono (via `--font-sans` / `--font-mono`).
- **Recommended:** adopt **Inter** for sans (keep a mono for code/labels). Inter is
  the skill's pick for "developer / AI dashboard / high-end utility" and reads more
  premium than the OS default while staying neutral.
- Scale (px): `12 · 14 · 16 · 18 · 24 · 32 · 48`. Body 16px min, line-height 1.5–1.7.
- Weights: 700 display / 600 headings / 500 labels (mono, uppercase, +tracking) / 400 body.

## Layout & spacing

- 4/8px spacing rhythm. Container `max-w-6xl`, section padding `py-20 sm:py-28`.
- Breakpoints: 375 / 768 / 1024 / 1440. Mobile-first, no horizontal scroll.
- Section order (Portfolio Grid): **Hero → Skills → Experience → Projects → Awards → Contact.**
- Project grid: visuals-first, hover-reveal on cards, contact CTA in footer.

## Interaction

- Touch targets ≥ 44px; icon-only links need `aria-label` (already present in hero).
- Hover/press transitions 150–300ms; use `transform`/`opacity` only.
- Visible focus ring (`.ring-brand`) — never remove focus outlines.
- Reveal-on-scroll is progressive-enhancement (`.reveal` visible without JS).

---

## Recommended changes (deltas to apply)

1. **Replace the 🥈 emoji stat in the hero** (`hero-section.tsx` → `STATS`) with an SVG
   medal/award icon. Emoji-as-icon violates the design rules (font-dependent,
   inconsistent cross-platform, not theme-able).
2. **Add Inter** via `next/font/google` in the root layout and map it to `--font-sans`
   (keep the mono stack for labels/code). Zero layout shift, one-line upgrade.

## Anti-patterns

- ❌ Raw hex in components — use semantic tokens.
- ❌ Emoji as structural icons — use SVG (Lucide/Heroicons style, matching `icons.tsx`).
- ❌ Light mode treated as inverted dark — tune it separately (already done).
- ❌ Layout-shifting hovers, instant state changes, invisible focus.

## Pre-delivery checklist

- [ ] Contrast ≥ 4.5:1 body / 3:1 large — verified in **both** themes
- [ ] All clickable elements: `cursor-pointer`, focus ring, ≥44px target
- [ ] No emoji icons; icons from one consistent set
- [ ] `prefers-reduced-motion` respected; motion is meaningful, ≤300ms
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll
- [ ] No content hidden behind the fixed header
