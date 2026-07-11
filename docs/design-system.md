# Design System

This document captures the core visual and interaction rules for the portfolio. It is intentionally lightweight but opinionated, so changes stay consistent as the site evolves.

---

## 1. Layout & Spacing

- **Layout grid**
  - Max content width: `1200px` via `.container` (`max-width: 1200px; margin: 0 auto; padding: 0 2rem`)
  - Detail page content (project body, hobby description): `max-width: 780px; margin: 0 auto` — centered reading column
  - Global section padding (desktop): `8rem 2rem 5rem 2rem`
  - Global section padding (mobile): `6rem 1.5rem 3.5rem 1.5rem`
  - Sections use `scroll-margin-top: 120px` to account for the fixed navbar
- **Spacing**
  - Primary vertical rhythm: `1.5rem`–`3rem` between major blocks
  - Card padding: `1rem`–`2rem` depending on density

---

## 2. Color System

The site supports **light and dark modes** (toggled via the moon/sun button in the navbar). Preference is persisted in `localStorage` (`portfolio-theme`); first visit respects `prefers-color-scheme`. The `data-theme` attribute on `<html>` drives the swap.

### CSS Variables (defined in `src/styles/base.css`)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#f9f7f4` | Page background |
| `--bg-surface` | `#ffffff` | Cards, panels, navbar |
| `--bg-subtle` | `#f2f0ec` | Hover states, subtle fills |
| `--text-primary` | `#1c1c1c` | Headings, strong text |
| `--text-secondary` | `#555555` | Body text |
| `--text-muted` | `#909090` | Captions, labels, metadata |
| `--border-color` | `rgba(0,0,0,0.09)` | Dividers, card borders |
| `--accent` | `#C4894F` | Amber — active states, highlights, CTAs |
| `--accent-dark` | `#a06b36` | Accent hover states |
| `--accent-light` | `rgba(196,137,79,0.15)` | Soft amber fills (tags, active nav items) |
| `--shadow-sm` | subtle | Card resting shadow |
| `--shadow-md` | moderate | Dropdown, elevated surface shadow |
| `--bg-nav` | `rgba(249,247,244,0.97)` / dark `rgba(28,25,23,0.97)` | Frosted navbar + project navigation background |

Dark mode overrides `--bg`, `--bg-surface`, `--bg-subtle`, `--bg-nav`, all text tokens, `--border-color`, and shadow tokens under `html[data-theme="dark"]`.

### Rules
- **Never** use white text on a white/light background.
- Active nav links, section headings, and tags all use `--accent` (amber).
- Section `h2` headings are clean left-aligned text (no decorative accent bar).

---

## 3. Typography

### Current Theme: Playfair Display + Inter
- `--font-heading`: `'Playfair Display'` — used for `h1`, `h2`, `h3`, hero title, logo
- `--font-sans`: `'Inter'` — used for body copy, nav links, labels, buttons
- `--font-mono`: `ui-monospace / SF Mono / Consolas` — used for code/tech references

### Scale
- `h1` (hero): `clamp(3rem, 7vw, 5.5rem)`, `font-weight: 700`, `line-height: 1.05`
- `h2` (section): `~2.25rem`, `font-weight: 700`
- `h3`: `~1.4rem`
- Body: `1rem`–`1.05rem`, `line-height: 1.7–1.8`
- Muted/caption: `0.8rem`–`0.875rem`

### Font Theme Options (switch in `src/styles/base.css` and `index.html`)

| Option | Body / UI | Headings | Feel |
|--------|-----------|----------|------|
| **A. Playfair + Inter** (current) | Inter | Playfair Display | Editorial, warm, professional |
| **B. DM Sans** | DM Sans | DM Sans | Softer, friendly |
| **C. Source Serif + Inter** | Inter | Source Serif Pro | Long-form reading |
| **D. Outfit** | Outfit | Outfit | Geometric, modern |
| **E. System fonts** | system-ui | system-ui | Fast load, native OS |

---

## 4. Components

### Buttons (`.btn`)
- **Primary (`.btn-primary`)**: amber background (`var(--accent)`), white text. Hover darkens to `var(--accent-dark)`.
- **Secondary (`.btn-secondary`)**: transparent background, `rgba(255,255,255,0.25)` border on dark, `var(--accent)` text/border on hover.
- Text: short and action-oriented ("View Projects", "About Me", "Send Message")
- One primary button per section max

### Cards
- Used for: project cards, photo cards, video/performance cards, chess highlights
- Shared traits: `background: var(--bg-surface)`, `border: 1px solid var(--border-color)`, rounded corners, `var(--shadow-sm)`
- Clear hierarchy: image → title → supporting text → links/metadata

### Tags (`.tech-tag`, `.project-tag`)
- `background: var(--accent-light)`, `color: var(--accent-dark)`
- `border: 1px solid rgba(196,137,79,0.25)`, `border-radius: 4px`
- `font-size: ~0.72rem`, `font-weight: 600`

### Section Headings (`section h2`)
- `font-family: var(--font-heading)`
- `text-align: left`
- no decorative left border or forced left padding
- `font-size: 2.25rem` (desktop), scales down on mobile

---

## 5. Navigation

### Desktop Navbar
- Fixed to top, `background: rgba(249,247,244,0.97)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid var(--border-color)`
- `z-index: 1000`
- Horizontal link row; "Hobbies" is a **hover-only dropdown** (label is `<span>`, not a link — not clickable)
- Active link: `color: var(--accent)`, `border-bottom: 2px solid var(--accent)`

### Mobile Navbar (≤ 768px)
- Hamburger `<button>` (right side of nav bar), `z-index: 10001`
- Tapping opens a **slide-in drawer** from the left (85% width, max 320px)
- Implemented as `.mob-overlay` — a completely separate DOM element from the desktop `<ul class="nav-menu">` to avoid CSS conflicts
- "Hobbies" always expands as a flat labelled sub-list (no toggle needed)
- Backdrop click closes the menu
- Scroll locked on both `html` and `body` when open (iOS-safe)

### Scrolling
- Global scroll fade-in via `useScrollAnimations` (IntersectionObserver on `section` elements)
- Smooth scrolling for internal anchors (e.g., Piano performances link)
- `scroll-margin-top: 120px` on sections and key anchors

### Route transitions
- Native **View Transitions API** cross-fade on path change, driven in `src/App.tsx` (`AppRoutes` keeps a `displayLocation` and wraps the swap in `document.startViewTransition` + `flushSync`). No animation library.
- Styling: `::view-transition-old(root)` / `::view-transition-new(root)` keyframes (`vt-fade-out` / `vt-fade-in`) in `styles.css`.
- Degrades gracefully: browsers without the API (or hash/search-only changes) swap instantly.
- Projects grid cards use a staggered `cardEnter` entrance (inline `animationDelay` per index, capped at 0.5s).

### Reduced motion
- Global guard in `base.css`: under `prefers-reduced-motion: reduce`, all animation/transition durations and delays collapse to near-zero (uses `!important`; documented in the file). Route transitions are also skipped in JS when the user prefers reduced motion.

---

## 6. Interaction Patterns

- **Hover**: subtle background / color change; occasional `translateY(-2px)` on cards
- **Cursor**: custom cursor (desktop/fine-pointer only)
  - Small solid amber dot snaps to mouse
  - Amber ring lerps behind the dot; both scale up on interactive elements
  - Disabled entirely on touch/coarse-pointer devices (mobile/tablet)

---

## 7. Media & Assets

- **Images**: `public/static/images/` organized by page (`home/`, `about/`, `projects/*`, `hobbies/*`, `resume/`, `shared/`)
- Use `loading="lazy"` on all non-hero images
- Compress with `npm run optimize-images` (sharp-based script)
- `image-orientation: from-image` applied globally in `base.css` to handle EXIF rotation
- **Enlargeable photos**: Home hero and project detail images use `ClickableExpandableImage` (`role="button"`, `aria-label`, focus ring, expand affordance on hover) plus shared `Lightbox` (backdrop click + close button + Escape)

---

## 8. Accessibility & Content

- Meaningful `alt` text on all images
- Logical heading hierarchy (H1 → H2 → H3)
- No em dashes — they sound AI-generated. Use commas or parentheses
- No emojis in copy
- Contact form has labels and clear error states
- Avoid long walls of text; break into logical short paragraphs
