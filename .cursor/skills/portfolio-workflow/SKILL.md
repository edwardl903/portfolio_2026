---
name: portfolio-workflow
description: >-
  Use when editing the portfolio_2026 React/Vite site (pages, styles, public assets,
  or docs). Enforces reading project docs and post-change checks.
---

# Portfolio workflow (portfolio_2026)

## Before changes

1. Read `docs/cursor-workflow.md` (required project rules).
2. Open the relevant `docs/` file: `design-system.md`, `content-structure.md`, `architecture.md`, or `project-overview.md`.
3. Read the files you will edit; for CSS, search `styles.css` before adding duplicate rules.

## After changes

1. Run `npm run build` (zero errors, zero warnings).
2. Add one line to **Recent Changes** in `docs/cursor-workflow.md`.
3. If behavior or structure changed, update the affected `docs/*.md` file.

## Product rules (summary)

- Light theme tokens only; no `overflow-x: hidden` on `body`.
- No em dashes in copy; concise, human tone.
- Optional: `docs/cursor-best-practices.md` for general Cursor usage.
