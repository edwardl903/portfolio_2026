## Design System

This document captures the core visual and interaction rules for the portfolio. It is intentionally lightweight but opinionated, so changes stay consistent as the site evolves.

### 1. Layout & Spacing

- **Layout grid**
  - Max content width: `1200px` via `.container`
  - Global section padding: `8rem 2rem 5rem 2rem` (top, sides, bottom)
  - Sections use `scroll-margin-top: 120px` to account for the fixed navbar
- **Spacing**
  - Primary vertical rhythm: `1.5rem`–`3rem` between major blocks
  - Card padding: `1rem`–`2rem` depending on density

### 2. Color System

The site uses a **dark theme with neutral accents** (purple/glowy effects have been removed/simplified).

- **Base**
  - Background: `#0a0a0a` (body), with subtle variations to `#1a1a1a` in some sections
  - Text (primary): `#ffffff`
  - Text (muted): `#cccccc` or `#aaaaaa`
- **Surfaces**
  - Cards / panels: `rgba(255, 255, 255, 0.03–0.05)` with a subtle border
  - Borders: `rgba(200, 200, 200, 0.2–0.3)`
- **Accents**
  - Buttons on dark background:
    - Primary: `#ffffff` (text: `#0a0a0a`)
    - Secondary: transparent with white border, white on hover
  - Links: inherit text color; emphasis via hover opacity and subtle transforms

Guideline: **Never use white text on white/light backgrounds.** When a container has a white/light background, use dark text (`#0a0a0a`).

### 3. Typography

- **Base font**: `'Roboto', sans-serif`
- **Headings**
  - `h1` (hero title): large, bold, used sparingly (e.g., name on Home, page titles)
  - `h2`: section titles (e.g., “About Me”, “Projects”, “Resume”)
  - `h3` / `h4`: subsection titles inside cards, project sections, and hobby sections
- **Body text**
  - Font size: ~`1rem`–`1.1rem`
  - Line height: `1.6–1.7` for readability
  - Use `<p>` for paragraphs; avoid long walls of text by breaking into logical chunks

### 4. Components

#### Buttons

- **Primary button (`.btn.btn-primary`)**
  - Background: white or light gradient
  - Text: dark (`#0a0a0a`)
  - Shape: slightly rounded corners
  - Hover: slight opacity change or small translateY (no heavy shadows)

- **Secondary button (`.btn.btn-secondary`)**
  - Transparent background, white text, white border
  - Hover: white background, dark text

Guidelines:
- Keep button text short and action-oriented (e.g., “View Projects”, “Send Message”).
- Don’t overuse primary buttons—usually one primary action per section.

#### Cards

- Used for:
  - Project cards
  - Photo cards
  - Performance/video cards
  - Chess club / hobby highlights
- Shared traits:
  - Soft borders, subtle background tint
  - Clear hierarchy: image → title → supporting text → metadata/links

### 5. Navigation & Scrolling

- **Navbar**
  - Fixed to top, dark transparent background with subtle border
  - Desktop: horizontal menu with dropdown for “Hobbies”
  - Mobile: hamburger menu toggling a vertical menu
  - Active link: slightly emphasized via color and background state

- **Scrolling**
  - Global scroll animations via `useScrollAnimations` (fade-in + visible classes on sections)
  - Smooth scrolling for internal anchors (e.g., Piano page performances link)
  - Sections use `scroll-margin-top` to avoid being hidden by the navbar

### 6. Interaction Patterns

- **Hover**
  - Buttons: small movement and/or background change
  - Links/icons: subtle opacity or color change (no extreme glow)
  - Cards: optional slight lift on hover for clickable cards

- **Cursor**
  - Custom cursor with trailing elements (via `useCursorEffect`)
  - Cursor hides automatically over iframes/PDFs to avoid conflicts
  - Cursor slightly enlarges over interactive elements (`a`, `button`, `.btn`, form controls)

### 7. Media & Assets

- **Images**
  - Organized by usage (`home/`, `about/`, `projects/*`, `hobbies/*`, `resume/`, `shared/`)
  - Use `loading="lazy"` for non-critical images (implemented on project, about, and hobby photos)
  - Prefer compressed JPG/PNG (or WebP if added later) to keep page weight low

- **Embeds**
  - YouTube iframes use consistent `iframe` styling and responsive containers

### 8. Accessibility & Content

- Always set meaningful `alt` text on images
- Use headings in a logical hierarchy (H1 → H2 → H3…)
- Avoid relying solely on color for meaning; use text and icons where appropriate
- Ensure forms have labels and clear error messages (already implemented on Contact page)

This design system is intentionally minimal but should guide future additions so that new components look and feel consistent with the current portfolio.

