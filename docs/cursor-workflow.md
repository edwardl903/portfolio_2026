# Cursor AI Workflow

This file governs how the AI assistant should work with this codebase.
**It must be read before making any change, and updated after every session.**

---

## Rules (must follow every prompt)

### Before touching any file
1. Read this file (`cursor-workflow.md`) first.
2. Read the relevant doc for the area being changed:
   - Layout / colors / typography → `design-system.md`
   - Page content / assets → `content-structure.md`
   - Component structure / routing → `architecture.md`
   - Project goals / tech stack → `project-overview.md`
   - General Cursor usage (rules, skills, @-mentions) → `cursor-best-practices.md` (optional, human-oriented)
3. Read the actual file(s) being edited before editing them.
4. If the request touches CSS, grep for existing rules before adding new ones, avoid duplication.

### While editing
- No em dashes anywhere (in copy or comments). Use commas or parentheses.
- No emojis in page copy.
- No `!important` unless absolutely necessary and documented with a comment explaining why.
- No inline comments that just narrate what the code does ("// increment counter", "// return result").
- Keep copy concise and human, not AI-sounding. Short sentences. No "lifelong passion", "had the privilege of", "shaped my X skills" phrasing.
- Follow the light theme CSS variables (`--bg`, `--accent`, `--text-primary`, etc.). Do not hardcode hex values that already have a variable.
- Never use `overflow-x: hidden` on `body` (breaks `position: fixed` on iOS). Use `html` instead.

### After editing
- Run `npm run build` to confirm zero errors and zero warnings.
- Update the **Recent Changes** section of this file with a one-line summary.
- Update any affected doc (`design-system.md`, `content-structure.md`, `architecture.md`) if the change affects documented behavior.

---

## Pre-Edit Checklist

```
[ ] Read cursor-workflow.md
[ ] Read the relevant docs section
[ ] Read the actual files being changed
[ ] Grep for existing CSS before adding new rules
[ ] Plan the change before executing
[ ] Run npm run build after
[ ] Update this file's Recent Changes log
```

---

## Project State (keep current)

| Item | Current value |
|---|---|
| Theme | Warm light (`#f9f7f4` bg), `#C4894F` amber accent |
| Fonts | Playfair Display (headings) + Inter (body) |
| Cursor | osu!-style: dot + ring + 30-particle trail + click ripple |
| Nav (desktop) | Hover-only Hobbies dropdown, non-clickable label |
| Nav (mobile) | Slide-in drawer (`.mob-overlay`), separate from desktop `ul.nav-menu` |
| Resume page | Hidden; uncomment in `App.jsx` + `Navbar.jsx` to restore |
| Deployment | Vercel, auto-deploys on `git push` to main |
| Scroll lock | Set on both `html` and `body` (iOS-safe) |
| Image orientation | `image-orientation: from-image` globally in `base.css` |
| Container | `max-width: 1200px; margin: 0 auto; padding: 0 2rem` |
| Reading columns | Project content + hobby description: `max-width: 720-780px; margin: 0 auto` |
| Media sections | Must be siblings of `.hobby-description`, NOT nested inside (avoids width constraint) |
| Cursor project files | `.cursor/rules/portfolio-cursor.mdc` (always-on hints), `docs/cursor-best-practices.md` (guide), `.cursor/skills/portfolio-workflow/SKILL.md` (optional skill) |

---

## Recent Changes

| Date | Change |
|---|---|
| 2026-05-10 | Footer: dropped duplicate page links; copyright + social only |
| 2026-05-10 | Footer: removed cliché tagline; added footer nav + social links, responsive layout |
| 2026-05-10 | Piano performances: flattened copy so blurbs read more plain / less “AI polish” |
| 2026-05-10 | Piano hobby page: revised performance blurbs, category intros, and iframe titles for clearer voice |
| 2026-05-10 | SpotiFriend: removed architecture flow diagram; folded schedule/auth/scale into prose |
| 2026-05-10 | `SpotiFriend.jsx` casual rewrite, removed dead demo link, tightened architecture copy; `Projects.jsx` SpotiFriend card tags/description (dropped PostgreSQL) |
| 2026-05-10 | Pison project page: downloaded official marketing images from pison.com into `etl-tools/`, gallery + attribution + outbound link |
| 2026-05-10 | Pison `ETLTools.jsx`: PK/FK and join rigor, bug comms, scale (10k+ test rows, 50+ cols) |
| 2026-05-10 | Pison `ETLTools.jsx` + `Projects.jsx` card: real intern scope (merges, staging bugs, BigQuery, Looker Studio, Jupyter, APIs, wearable sensors) |
| 2026-05-10 | Split Pison ETL vs Fidelity: `ETLTools.jsx` is Pison (`/projects/etl-tools`), new `Fidelity.jsx` at `/projects/fidelity`; fixed `Projects.jsx` Fidelity card `to`; docs + sitemap |
| 2026-05-10 | MovieLens project page: casual copy, RMSE and RandomizedSearchCV MAE figures in `movie-recommendations/`, figure grid + table; GitHub link; `Projects.jsx` tags aligned (Surprise, SVD++, no Spark) |
| 2026-05-10 | NLP pipeline project page: casual copy, two-up figure grid (LR AUROC vs C, RF AUROC vs depth, confusion matrices), removed dead GitHub link; shared `.project-figure-grid` CSS with ChessLytics gallery |
| 2026-05-10 | Fixed NLP pipeline project page image paths (confusion matrices live under `public/static/images/projects/charts/`) |
| 2026-05-10 | Synced ChessLytics tags on `Projects.jsx` and `ChessLytics.jsx` (full stack: Flask, pandas, matplotlib, BigQuery, Looker, cache, API, Heroku, GCP, dbt) |
| 2026-05-10 | ChessLytics: moved four UI screenshots into `public/static/images/projects/chesslytics/` with renamed files, added Screenshots gallery on project page + CSS grid |
| 2026-05-10 | Toned down `ChessLytics.jsx` copy to sound more casual (first person, fewer listicles, looser headings) |
| 2026-05-10 | Rewrote `ChessLytics.jsx` project page from `docs/projects/chesslytics.md` (Flask-first, raw BigQuery, fetch notes, Azure cross-link; removed generic benefits grid) |
| 2026-05-10 | Rewrote `Projects.jsx` ChessLytics / Azure card copy and page subtitle from `docs/projects/chesslytics.md`; documented deep-dive path in `content-structure.md` |
| 2026-05-07 | Added osu!-inspired cursor: dot + ring + 30-particle history trail + click ripple |
| 2026-05-07 | Rebuilt mobile nav as separate `.mob-overlay` DOM element to eliminate CSS conflicts |
| 2026-05-07 | Fixed iOS `position: fixed` bug: moved `overflow-x: hidden` from `body` to `html` |
| 2026-05-07 | Added `padding: 0 2rem` to `.container`; centered project/hobby reading columns |
| 2026-05-07 | Moved media sections (videos, photo grids) out of `.hobby-description` on Chess, Volleyball, Skateboarding |
| 2026-05-07 | Rewrote all four hobby pages (Piano, Chess, Volleyball, Skateboarding), more casual, no AI-sounding copy |
| 2026-05-07 | Updated all four docs to reflect current light theme, amber accent, and actual project state |
| 2026-05-07 | Aligned/centered text on project detail pages and hobby pages |
| 2026-05-07 | Added YouTube Shorts embed to Chess hobby page; added `.video-thumbnail.portrait` CSS class for 9:16 aspect ratio |
| 2026-05-07 | Chess page: added lightbox to all photos, restructured Shorts into "Giant Chess Board" side-by-side section, removed non-clickable hover zoom from chess-photo-card imgs |
| 2026-05-07 | Replaced "EL" text logo in navbar with PNG exported from PSD; saved to `public/static/images/shared/el-logo.png`; PSD/AI/sketch added to .gitignore |
| 2026-05-07 | Rotated `public/static/images/hobbies/chess/bc.jpg` by 90 degrees to correct the Boston College photo orientation |
| 2026-05-07 | Added subtle desktop navbar hover affordance (soft background + micro-lift) and gentle hover-expand effect on home hero photo card |
| 2026-05-07 | Increased hover affordance strength on desktop nav and home hero photo (stronger lift, shadow, and zoom) |
| 2026-05-07 | Made desktop navbar hover state more explicit with amber hover fill, accent text, and visible bottom border indicator |
| 2026-05-07 | Removed decorative vertical accent line from section/page headers (global `section h2`, projects title, hobby and piano headings) |
| 2026-05-07 | Fixed dark-theme CSS leftovers in project detail pages (diagrams, pipeline steps, benefits, cloud sections, detail items), converted to light theme variables |
| 2026-05-10 | Added `docs/cursor-best-practices.md`, `.cursor/rules/portfolio-cursor.mdc`, and `.cursor/skills/portfolio-workflow/SKILL.md` for Cursor conventions |
| 2026-05-07 | Added `ClickableExpandableImage` + Home hero and project detail lightboxes; `Lightbox` autofocuses close button; `.lb-trigger:focus-visible` and `.project-image > .lb-trigger` layout fixes |
