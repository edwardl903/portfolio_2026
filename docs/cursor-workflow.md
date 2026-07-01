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
- Append an entry to `CHANGELOG.md` at the repo root (date, Added/Changed/Fixed, brief description).
- Update any affected doc (`design-system.md`, `content-structure.md`, `architecture.md`) if the change affects documented behavior.

### Committing
Write detailed commit messages that cover:
1. What changed (specific files and components)
2. Why (the user's intent from the prompt)
3. Any notable trade-offs or decisions made

Example format:
```
feat(ChessV2): add dbt pipeline hover popover with project link

Edward wanted the dbt badge more prominent and interactive. Moved
badge to cv2-header, redesigned as pill with green pulse dot and
orange left border. Hover reveals popover (CSS :hover, no JS state)
explaining daily GitHub Actions pipeline; "View project" links to
ChessLytics dbt Pipeline page. Fixed hover gap with padding bridge
pattern so the link stays reachable.

Files: ChessV2.jsx, styles.css
```

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
[ ] Append entry to CHANGELOG.md
[ ] Write a detailed commit message (what, why, files affected)
```

---

## Project State (keep current)

| Item | Current value |
|---|---|
| Theme | Warm light (`#f9f7f4` bg) + dark (`#1c1917` bg) toggled via `data-theme` on `<html>`; `#C4894F` amber accent in both |
| Fonts | Playfair Display (headings) + Inter (body) |
| Cursor | Dot + ring (no trail); lerp ring, hover scale |
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
| 2026-06-21 | ChessV2: interactive chart with Y/X axes, gridlines, crosshair tooltip; opening hover tooltips + win%; rating_diff badge on game rows; dbt last-run timestamp |
| 2026-06-21 | ChessV2: enhanced dashboard -- W/L/D donut chart, activity heatmap (90-day), stacked opening bars, dual-line rating+accuracy chart, outcome + date-range filters |
| 2026-06-21 | ChessV2: live stats dashboard at /hobbies/chess (tabs for blitz/bullet/daily, stat cards, rating chart, recent games); old Chess page moved to /hobbies/chess/more |
| 2026-06-20 | PianoV2: left/right arrow key navigation between videos in modal; prev/next hover buttons on video; kbd hint in footer |
| 2026-06-20 | PianoV2 is now the default /hobbies/piano route; old Piano page moved to /hobbies/piano/more with a subtle link from PianoV2 |
| 2026-06-20 | PianoV2: removed hint text, full light+dark mode support via data-theme reactive CSS variables and MutationObserver on html element |
| 2026-06-20 | PianoV2: stripped header text/legend, black keys now fully interactive (hover glow + video preview), removed Background particle dots globally |
| 2026-06-20 | PianoV2: new experimental page at /hobbies/piano-v2 — interactive piano keyboard, hover-preview cards with YouTube thumbnails, fullscreen modal embed, dark atmospheric theme |
| 2026-06-20 | ChessLytics: removed second bottom diagram; added live browser-chrome iframe embed (chesslytics.xyz) as first section |
| 2026-06-20 | Analytics page: full redesign — date presets + custom range, % change stat cards, SVG area/line traffic chart, 6 breakdown panels, choropleth world map (react-simple-maps) |
| 2026-06-19 | Dark/light mode: `useTheme` hook, `html[data-theme="dark"]` token overrides, toggle in desktop nav + mobile overlay; `--bg-nav` CSS var for frosted navbar |
| 2026-06-19 | Cursor simplified: removed 30-particle trail + click ripple; dot + ring only |
| 2026-05-10 | `Layout.jsx`: `dataLayer` push `portfolio_route_change` on route change for GTM / GA4 SPA page views |
| 2026-05-10 | Layout: `layout-shell` + `layout-main` flex column for sticky footer; contact success page fills main and centers card |
| 2026-05-10 | Contact + ContactSuccess: form UX (inline server error, field error styling, a11y), success page matches light theme; removed legacy glass success CSS |
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
| 2026-06-30 | About: fixed sunday-river.jpg case (.JPG → .jpg) so image loads on Vercel/Linux |
| 2026-06-30 | Umami Analytics: fixed metrics type `url` → `path` (API 400); stats parsing for flat API response |
| 2026-06-24 | Naming cleanup: added docs/naming-conventions.md; renamed components (ChessLyticsDbt, PianoKeyboard, ChessStats, Pison, NlpPipeline); route chesslytics-dbt + redirect; renamed chess/about images; removed unused assets |
| 2026-06-24 | PianoV2: removed pv2-dark body override and extra-black dark CSS; page/preview/modal now use shared theme tokens to match ChessV2 |
