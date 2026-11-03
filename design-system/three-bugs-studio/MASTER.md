# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/three-bugs-studio/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, follow the rules below.

---

**Project:** Three Bugs Studio (https://3bstudio.me)
**Updated:** 2026-11-03, rewritten from an audit of the live site. The previous version (blue primary, Space Grotesk body, glassmorphism) never matched the site and is replaced.
**Direction:** dark technical studio, one orange accent, readable Vietnamese first.

---

## Color tokens

Defined in `src/index.css`: raw values on `:root` and `html.light`, exposed to Tailwind through `@theme`. Use the utility, never the hex, in new code. Light mode then needs no `html.light` overrides.

| Token | Tailwind utility | Dark | Light | Use |
|---|---|---|---|---|
| canvas | `bg-canvas` | `#090909` | `#F8FAFC` | Page background |
| surface | `bg-surface` | `#121212` | `#FFFFFF` | Cards, panels, inputs |
| ink | `text-ink` | `#F5F5F3` | `#0F172A` | Headings and body text |
| ink-muted | `text-ink-muted` | `#A1A1AA` | `#475569` | Supporting text, hints, captions |
| brand-ink | `text-brand-ink` | `#FF6A00` | `#C2410C` | Orange text and links |
| line | `border-line` | white 10% | `#0F172A` 12% | Borders and dividers |
| brand-orange | `bg-brand-orange` | `#FF6A00` | `#FF6A00` | Primary button fill, always with `#090909` text |

Measured contrast (WCAG): ink on canvas 18.2:1, ink-muted on canvas 7.8:1, ink-muted light on white 7.6:1, `#090909` on brand-orange 6.9:1, brand-ink light on `#F8FAFC` 4.95:1.

**Rules**
- One brand color. Do not use teal `#006989` or any second accent for buttons.
- Never put white text on `#FF6A00` (2.87:1) or `#FF6A00` text on a light background (2.87:1). Use `#090909` on orange, and `text-brand-ink` for orange text.
- Extra hues (cyan, purple, pink, green) only for per-member tags in the team section and the green "available" dot.
- Do not lower text opacity to make it muted. Use `text-ink-muted`.

## Typography

| Role | Font | Tailwind | Notes |
|---|---|---|---|
| Display, headings | Be Vietnam Pro 500–900 | `font-display` | Same family as body; stacked Vietnamese marks (Ệ, Ẩ) stay clean at large sizes and tight leading |
| Body, UI | Be Vietnam Pro 300–700 | `font-sans` (default) | Designed for Vietnamese, reads well in English |
| Numbers, prices, code | IBM Plex Mono 400–600 | `font-mono` | Not for running Vietnamese text |

Both families ship a Vietnamese subset on Google Fonts (checked 2026-11-03) and load from `index.html`. Space Grotesk was dropped on 2026-11-03: its Vietnamese marks looked cramped in large headings.

**Scale**
- Minimum 12px for any text, including labels and badges. Body 16px, line-height 1.5–1.7.
- Headings: `text-4xl md:text-5xl` sections, `text-xl md:text-2xl` cards. Use `[text-wrap:balance]` on headings.
- Uppercase with letter-spacing only for short Latin labels (`MENU`, `VI`). Never uppercase Vietnamese text with diacritics in mono at small sizes.

## Shape and spacing

- Radius: `rounded-sm` (4px) for buttons and inputs, `rounded-xl` (12px) for cards and panels. Nothing else.
- Spacing on Tailwind's 4px scale. Sections `py-20 md:py-28`, container `max-w-7xl mx-auto px-4 md:px-12`, card padding `p-4 md:p-6`.
- Touch targets at least 44px tall on mobile.

## Components

**Primary button:** `bg-brand-orange text-[#090909] font-semibold rounded-sm px-6 py-3.5`, hover adds an orange glow. One primary button per view.

**Secondary button:** `border border-line text-ink rounded-sm px-6 py-3.5 hover:border-brand-orange/60`.

**Card:** `bg-surface border border-line rounded-xl p-4 md:p-6`. Hover may change the border to `border-brand-orange/50`; no layout-shifting transforms on cards inside grids.

**Input:** `bg-canvas border border-line rounded-sm px-4 py-3 text-sm text-ink focus:border-brand-orange`, visible label above, error text below the field.

**Focus:** keep the global dashed orange `:focus-visible` outline. Never remove it.

## Motion

- 150–300ms for hover and state changes, `prefers-reduced-motion` already shortens everything globally.
- Decorative effects (glitch, scanlines, CRT) stay inside their component and never block reading.

## Migration status

All three steps done on 2026-11-03:

1. Tokens added to `@theme`, body font switched from Inter to Be Vietnam Pro, this file rewritten.
2. Every component except the always-dark ones moved to tokens, text raised to 12px minimum.
3. Hex-keyed and blanket `html.light` overrides removed from `src/index.css`. What remains in `html.light` is scoped to named classes (pricing cards, FAQ items, team cards, art deco frame, theme button).

Still hard-coded on purpose: `Lightbox`, `MagnifyingLens`, `ThemeSwitch`, `TechIcon`, `Logo`, `ui/MiniCrtLoader` (always dark or brand colours), white text on images and gradients, and Zalo's blue buttons.

## Anti-patterns

- Hard-coded hex colors in components when a token exists
- New `html.light` overrides keyed on a hex class
- Text below 12px, or muted text that fails 4.5:1
- A second accent color for buttons
- Emojis as icons (use the existing Majestic icon set or `react-icons`)

## Pre-delivery checklist

- [ ] Uses tokens, no new hex values
- [ ] Text at least 12px, contrast at least 4.5:1 in both themes
- [ ] Checked in dark and light mode
- [ ] Checked at 375px, 768px, 1024px, 1280px and 1440px with no horizontal scroll
- [ ] Visible keyboard focus, `cursor-pointer` on clickable elements
- [ ] Vietnamese and English copy both fit without breaking the layout
