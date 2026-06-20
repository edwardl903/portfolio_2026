# Architecture

Client-rendered React SPA built on Vite. No backend — all server-side concerns (hosting, SSL, CDN) are handled by Vercel.

---

## App Structure

```
index.html
  └─ src/main.jsx         ← mounts React, imports base.css + styles.css
       └─ <HashRouter>
            └─ <App>      ← declares all routes
                 └─ <Layout>
                      ├─ <Background />
                      ├─ <Navbar />
                      └─ <div class="layout-shell">
                           ├─ <main class="layout-main">
                           │    └─ <Routes> (page components)
                           └─ <Footer />
```

## Entry Points

| File | Role |
|---|---|
| `index.html` | Shell HTML, loads Google Fonts (Playfair Display + Inter) |
| `src/main.jsx` | Mounts React into `#root`, imports `base.css` then `styles.css` |
| `src/App.jsx` | All route declarations |
| `src/components/Layout.jsx` | Shared shell; scroll-to-top; `dataLayer` push `portfolio_route_change` for GTM/GA4 SPA routes; global hooks |

---

## Routing

Defined in `src/App.jsx` using React Router DOM (`HashRouter` for GitHub Pages):

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
| `/projects/fidelity` | `Fidelity` |
| `/projects/eeg-research` | `EEGResearch` |
| `/hobbies/piano` | `Piano` |
| `/hobbies/chess` | `Chess` |
| `/hobbies/volleyball` | `Volleyball` |
| `/hobbies/skateboarding` | `Skateboarding` |
| `/contact` | `Contact` |
| `/contact-success` | `ContactSuccess` |
| `/resume` | `Resume` *(hidden — uncomment in App.jsx to re-enable)* |
| `/analytics` | `Analytics` |

---

## Components

| Component | Purpose |
|---|---|
| `Navbar` | Fixed top bar; desktop hover dropdown for Hobbies; mobile slide-in drawer (`mob-overlay`) |
| `Layout` | Shell that wraps all pages; manages scroll-to-top, cursor, scroll animations |
| `Background` | Decorative particle layer (z-index: -1) |
| `Footer` | Copyright year, GitHub / LinkedIn / email icons (no duplicate nav) |
| `Lightbox` | Full-screen image overlay; Escape to close; focus moves to close control when open |
| `ClickableExpandableImage` | Reusable `lb-trigger` wrapper + `Lightbox`; used on Home hero photo and project detail images |

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
| Umami Cloud | Privacy-friendly analytics; tracking script in `index.html`; public share dashboard + REST API stats on `/analytics` page |
