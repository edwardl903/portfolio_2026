# Content Structure

How content is organized across pages, components, and static assets.

---

## Pages (`src/pages`)

### Home (`Home.jsx`)
- Eyebrow: "Data Analyst"
- Hero title: "Edward / Lai" (two-line)
- Tagline: "Tufts University · Computer Science & Human Factors"
- Bio: data analytics-focused paragraph, mentions Curaleaf Holdings
- CTAs: "View Projects" → `/projects`, "About Me" → `/about`
- Hero image: `/static/images/home/profile-picture.jpg` (tall photo card, `object-position: center 15%`)

### About (`About.jsx`)
- Work history paragraph (Curaleaf → Fidelity → Pison → Tufts HCI/IDEA Labs)
- Miyazaki quote block
- Editorial photo mosaic (portrait, pet, adventure grid with lightbox on click)
- Skills tags section
- All photos in `/static/images/about/`
- Lightbox powered by `src/components/Lightbox.jsx`

### Projects (`Projects.jsx`)
- Title: "Data Projects"
- Subtitle: one-line intro
- Project cards grid (3 col desktop → 2 tablet → 1 mobile) using `.project-card-v2`
- Each card: image, tags, title, description, GitHub/live/demo links

### Project Detail Pages (`src/pages/projects/`)
| File | Route | Status |
|---|---|---|
| `ChessLytics.jsx` | `/projects/chesslytics` | Full content + architecture diagrams |
| `ChessLyticsAzure.jsx` | `/projects/chesslytics-azure` | Full content |
| `SpotiFriend.jsx` | `/projects/spotifriend` | Full content |
| `NLPipeline.jsx` | `/projects/nlp-pipeline` | Full content |
| `MovieRecommendations.jsx` | `/projects/movie-recommendations` | Full content |
| `ETLTools.jsx` | `/projects/etl-tools` | Full content |
| `EEGResearch.jsx` | `/projects/eeg-research` | Full content |

Layout: `.project-detail > .container > .project-header` (image + info, max 900px centered) + `.project-content` (text body, max 780px centered)

### Hobbies (`src/pages/hobbies/`)
Each hobby page pattern:
- `.hobby-detail > .container`
- Icon + optional header
- `.hobby-description` (max 720px, centered) — narrative intro
- Media section (YouTube iframes or photo grid)

| File | Route | Notable content |
|---|---|---|
| `Piano.jsx` | `/hobbies/piano` | Multiple YouTube performance sections; smooth-scroll CTA |
| `Chess.jsx` | `/hobbies/chess` | Live chess board embed, openings section, photo grid |
| `Volleyball.jsx` | `/hobbies/volleyball` | Narrative + photos |
| `Skateboarding.jsx` | `/hobbies/skateboarding` | Narrative + photos |

### Contact (`Contact.jsx`)
- Validated form: name, email, subject, message
- Formspree POST integration
- On success → `/contact-success`
- Contact info panel + social links

### Resume (`Resume.jsx`) — **currently hidden**
- Re-enable in `src/App.jsx` (uncomment route) and `src/components/Navbar.jsx` (uncomment link)

---

## Assets (`public/static/images/`)

```
public/static/images/
├── home/          # profile-picture.jpg
├── about/         # killington-snowboarding.jpg, family photos, etc.
├── projects/
│   ├── chesslytics/
│   ├── chesslytics-azure/
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
