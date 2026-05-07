# Architecture

Client-rendered React SPA built on Vite. No backend — all server-side concerns (hosting, SSL, CDN) are handled by Vercel.

---

## App Structure

```
index.html
  └─ src/main.jsx         ← mounts React, imports base.css + styles.css
       └─ <BrowserRouter>
            └─ <App>      ← declares all routes
                 └─ <Layout>
                      ├─ <Background />
                      ├─ <Navbar />
                      ├─ <Routes> (page components)
                      └─ <Footer />
```

## Entry Points

| File | Role |
|---|---|
| `index.html` | Shell HTML, loads Google Fonts (Playfair Display + Inter) |
| `src/main.jsx` | Mounts React into `#root`, imports `base.css` then `styles.css` |
| `src/App.jsx` | All route declarations |
| `src/components/Layout.jsx` | Shared shell; triggers scroll-to-top and global hooks |

---

## Routing

Defined in `src/App.jsx` using React Router DOM (BrowserRouter):

| Path | Component |
|---|---|
| `/` | `Home` |
| `/about` | `About` |
| `/projects` | `Projects` |
| `/projects/chesslytics` | `ChessLytics` |
| `/projects/chesslytics-azure` | `ChessLyticsAzure` |
| `/projects/spotifriend` | `SpotiFriend` |
| `/projects/nlp-pipeline` | `NLPipeline` |
| `/projects/movie-recommendations` | `MovieRecommendations` |
| `/projects/etl-tools` | `ETLTools` |
| `/projects/eeg-research` | `EEGResearch` |
| `/hobbies/piano` | `Piano` |
| `/hobbies/chess` | `Chess` |
| `/hobbies/volleyball` | `Volleyball` |
| `/hobbies/skateboarding` | `Skateboarding` |
| `/contact` | `Contact` |
| `/contact-success` | `ContactSuccess` |
| `/resume` | `Resume` *(hidden — uncomment in App.jsx to re-enable)* |

---

## Components

| Component | Purpose |
|---|---|
| `Navbar` | Fixed top bar; desktop hover dropdown for Hobbies; mobile slide-in drawer (`mob-overlay`) |
| `Layout` | Shell that wraps all pages; manages scroll-to-top, cursor, scroll animations |
| `Background` | Decorative particle layer (z-index: -1) |
| `Footer` | Simple site footer |
| `Lightbox` | Full-screen image overlay; used on About page photos |

---

## Hooks

| Hook | Purpose |
|---|---|
| `useCursorEffect` | osu!-style custom cursor (dot + ring + 30-particle trail + click ripple). Disabled on touch/coarse-pointer devices. |
| `useScrollAnimations` | IntersectionObserver on `section` elements; adds `fade-in` + `visible` classes for CSS entrance animations |

---

## Styling

Two CSS files, loaded in order:

1. **`src/styles/base.css`** — CSS reset, `:root` variables (colors, fonts), `body` / `html` / `#root` base styles
2. **`src/styles.css`** — All component and page styles (~4500 lines)

### Key CSS conventions
- CSS variables for all design tokens (colors, fonts) — defined in `base.css`
- `.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem }` — shared layout wrapper
- Detail page content uses centered reading columns: `max-width: 780px; margin: 0 auto`
- Mobile nav (`≤768px`) uses `.mob-overlay` — a separate DOM element from the desktop `ul.nav-menu` to avoid CSS specificity conflicts
- `image-orientation: from-image` applied globally to handle EXIF-rotated photos

---

## Assets & Build

- **Source images**: `public/static/images/` (organized by page/feature)
- **Build output**: `dist/` (Vite, hashed JS/CSS bundles, copied public assets)
- **Image optimization**: `npm run optimize-images` — runs `scripts/optimize-images.js` (uses `sharp`)
- **Deploy**: `git push` to `main` → Vercel auto-deploys from `dist/`

---

## Third-Party Integrations

| Service | Usage |
|---|---|
| Formspree | Contact form POST (`src/pages/Contact.jsx`) |
| YouTube | `<iframe>` embeds in Piano and Chess hobby pages |
| Google Fonts | Playfair Display + Inter (loaded in `index.html`) |
| Vercel | Hosting + auto-deploy |
