# Content Structure

How content is organized across pages, components, and static assets.

---

## Pages (`src/pages`)

### Home (`Home.tsx`)
- Eyebrow: "Data Analyst"
- Hero title: "Edward / Lai" (two-line)
- Tagline: "Tufts University · Computer Science & Human Factors"
- Bio: data analytics-focused paragraph, mentions Curaleaf Holdings
- CTAs: "View Projects" → `/projects`, "About Me" → `/about`
- Hero image: `/static/images/home/profile-picture.jpg` (tall photo card, `object-position: center 15%`). Click or keyboard (Enter/Space) opens `Lightbox` full screen via `ClickableExpandableImage`

### About (`About.tsx`)
- Work history paragraph (Curaleaf → Fidelity → Pison → Tufts HCI/IDEA Labs)
- Miyazaki quote block
- Editorial photo mosaic (portrait, pet, adventure grid with lightbox on click)
- Skills tags section
- All photos in `/static/images/about/`
- Lightbox powered by `src/components/Lightbox.tsx`

### Projects (`Projects.tsx`)
- Title: "Data Projects"
- Subtitle: casual intro line under the title
- Project cards grid (3 col desktop → 2 tablet → 1 mobile) using `.project-card-v2`
- Each card: image, tags, title, description, GitHub/live/demo links
- Long-form ChessLytics notes for yourself or the agent: `docs/projects/chesslytics.md` (not rendered on the site; listing copy lives in `Projects.tsx`)

### Project Detail Pages (`src/pages/projects/`)
Hero thumbnails and other large figures use `ClickableExpandableImage` (same lightbox pattern as About) where a full-screen read helps UX.

| File | Route | Status |
|---|---|---|
| `ChessLytics.tsx` | `/projects/chesslytics` | Flask writeup, screenshot gallery (`chesslytics-ui-home.png`, `chesslytics-year-wrapped.png`, `chesslytics-game-highlights.png`, `chesslytics-looker-dashboard.png`), GCP + hybrid diagrams, roadmap (`docs/projects/chesslytics.md`) |
| `ChessLyticsDbt.tsx` | `/projects/chesslytics-dbt` | dbt pipeline writeup; `/projects/chesslytics-azure` redirects here |
| `SpotiFriend.tsx` | `/projects/spotifriend` | Casual writeup; prose + bullets only (no architecture diagram); code on `spotify-etl` |
| `NlpPipeline.tsx` | `/projects/nlp-pipeline` | Hero + PDF + tuning plots + confusion matrices in `nlp-pipeline/` |
| `MovieRecommendations.tsx` | `/projects/movie-recommendations` | Hero + PDF; plots `movielens-training-vs-validation-rmse.png`, `movielens-validation-mae-vs-trial-randomized-search.png`; `movie-embedding-clusters.jpg` |
| `Pison.tsx` | `/projects/etl-tools` | Pison Data Ops: merges, staging QA, BigQuery, Looker Studio, Jupyter, APIs; hero `pison-technology.jpg`; optional official marketing stills `pison-official-*.png|jpg` (sourced from pison.com, credited in page) |
| `Fidelity.tsx` | `/projects/fidelity` | PB Optimize analytics; hero `etl-tools-project.jpg` (shared `etl-tools/` assets) |
| `EEGResearch.tsx` | `/projects/eeg-research` | Full content |

Layout: `.project-detail > .container > .project-header` (image + info, max 900px centered) + `.project-content` (text body, max 780px centered)

### Hobbies (`src/pages/hobbies/`)
Each hobby page pattern:
- `.hobby-detail > .container`
- Icon + optional header
- `.hobby-description` (max 720px, centered) — narrative intro
- Media section (YouTube iframes or photo grid)

| File | Route | Notable content |
|---|---|---|
| `PianoKeyboard.tsx` | `/hobbies/piano` | Interactive keyboard with hover video previews |
| `Piano.tsx` | `/hobbies/piano/more` | YouTube performance sections; narrative |
| `ChessStats.tsx` | `/hobbies/chess` | Live stats dashboard from dbt/API |
| `Chess.tsx` | `/hobbies/chess/more` | Live chess board embed, openings section, photo grid |
| `Volleyball.tsx` | `/hobbies/volleyball` | Narrative + photos |
| `Skateboarding.tsx` | `/hobbies/skateboarding` | Narrative + photos |

### Contact (`Contact.tsx`)
- Validated form: name, email, message (Formspree POST); `noValidate` with client validation, inline field errors, server error banner (no `alert`)
- On success → `/contact-success` (`ContactSuccess.tsx`: light-theme card, primary + secondary actions)

### Contact success (`ContactSuccess.tsx`)
- Post-submit confirmation; links home and back to contact form

### Resume (`Resume.tsx`) — **currently hidden**
- Re-enable in `src/App.tsx` (uncomment route) and `src/components/Navbar.tsx` (uncomment link)

---

## Assets (`public/static/images/`)

```
public/static/images/
├── home/          # profile-picture.jpg
├── about/         # killington-snowboarding.jpg, family photos, etc.
├── projects/
│   ├── chesslytics/     # chesslytics-dbt-cover.jpg, dbt-docs-lineage.png, UI screenshots
│   ├── spotifriend/
│   ├── nlp-pipeline/
│   ├── movie-recommendations/
│   ├── etl-tools/
│   └── eeg-research/
├── hobbies/
│   ├── piano/
│   ├── chess/
│   ├── volleyball/
│   └── skateboarding/
├── resume/
└── shared/        # logos, shared graphics
```

Reference images from components with `/static/images/...`.
Add `loading="lazy"` on all non-hero images.
Run `npm run optimize-images` after adding new images to compress them.

---

## Content Rules

- **No em dashes** — they sound AI-generated. Use commas or parentheses.
- **No emojis** in copy.
- Keep project descriptions concise — avoid redundancy and verbose explanations.
- All copy lives in React components under `src/pages/` (no CMS).
