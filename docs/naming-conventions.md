# Naming Conventions

How files, routes, and assets are named in this repo. Follow these when adding or renaming anything.

---

## General rules

- **Lowercase kebab-case** for folders, routes, and image filenames: `chess-club-meeting-1.jpg`, `/projects/chesslytics-dbt`
- **PascalCase** for React page/component files: `ChessLyticsDbt.jsx`, `PianoKeyboard.jsx`
- **Descriptive over short**: `boston-college-tournament.jpg` not `bc.jpg`
- **No spaces, UUIDs, or "copy"** in filenames
- **Image extensions**: prefer `.jpg` / `.png` lowercase (not `.JPG`)
- **One hero image per project**: `{project-slug}-cover.jpg` in that project's folder
- **Co-locate assets** with the page that uses them (NLP plots live under `nlp-pipeline/`, not a generic `charts/` dump)

---

## Routes vs files

| Route | Component file | Notes |
|---|---|---|
| `/hobbies/piano` | `PianoKeyboard.jsx` | Interactive keyboard; legacy narrative at `/hobbies/piano/more` → `Piano.jsx` |
| `/hobbies/chess` | `ChessStats.jsx` | Live stats dashboard; legacy at `/hobbies/chess/more` → `Chess.jsx` |
| `/projects/chesslytics` | `ChessLytics.jsx` | Flask app writeup |
| `/projects/chesslytics-dbt` | `ChessLyticsDbt.jsx` | dbt pipeline writeup; old `/projects/chesslytics-azure` redirects here |
| `/projects/etl-tools` | `Pison.jsx` | Pison internship (route kept for bookmarks) |
| `/projects/nlp-pipeline` | `NlpPipeline.jsx` | Reading level classifier |

When renaming a route, add a `<Navigate>` redirect from the old path in `App.jsx` and update `public/sitemap.xml`.

---

## Static images (`public/static/images/`)

```
home/           edward-portrait.jpg (or profile-picture.jpg for hero)
about/          {subject}-{context}.jpg
hobbies/{name}/ {context}.jpg — e.g. boston-college-tournament.jpg
projects/{slug}/
  {slug}-cover.jpg          card + page hero
  {slug}-{screenshot}.png   UI captures
  dbt-docs-lineage.png      diagrams (prefix with topic)
shared/         el-logo.png, el-logo-transparent.png
```

**Delete** unused placeholders and duplicate generated assets. Do not commit AI placeholder diagrams if a real screenshot exists.

---

## CSS class prefixes

Page-specific CSS uses a short prefix tied to the feature, not always the filename:

| Page | Prefix | Example |
|---|---|---|
| Piano keyboard | `pv2-` | `.pv2-page` |
| Chess stats | `cv2-` | `.cv2-panel` |

Renaming the JSX file does not require renaming CSS prefixes unless doing a full redesign.

---

## Docs and private files

- `docs/` — agent and human reference (tracked in git)
- `CHANGELOG.md` — personal session log (gitignored)
- `.cursor/rules/` — short always-on AI hints; detail lives in `docs/`
