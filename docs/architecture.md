# Architecture

Client-rendered React SPA written in TypeScript and built on Vite. No backend — all server-side concerns (hosting, SSL, CDN) are handled by Vercel.

Source is TypeScript: components/pages are `.tsx`, hooks are `.ts`. `tsconfig.json` targets the `src` folder; `npm run typecheck` runs `tsc --noEmit` (Vite/esbuild strips types at build time without type-checking, so `typecheck` is the gate for type errors). Config files (`vite.config.js`, `eslint.config.js`, `scripts/optimize-images.js`) stay JavaScript.

---

## App Structure

```
index.html
  └─ src/main.tsx         ← mounts React, imports base.css + styles.css
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
| `src/main.tsx` | Mounts React into `#root`, imports `base.css` then `styles.css` |
| `src/App.tsx` | All route declarations; `AppRoutes` drives View Transitions API cross-fade on route change (renders `<Routes>` against a `displayLocation`) |
| `src/components/Layout.tsx` | Shared shell; scroll-to-top; `dataLayer` push `portfolio_route_change` for GTM/GA4 SPA routes; global hooks |

---

## Routing

Defined in `src/App.tsx` using React Router DOM (`HashRouter` for GitHub Pages):

| Path | Component |
|---|---|
| `/` | `Home` |
| `/about` | `About` |
| `/projects` | `Projects` |
| `/projects/chesslytics` | `ChessLytics` |
| `/projects/chesslytics-dbt` | `ChessLyticsDbt` |
| `/projects/chesslytics-azure` | redirects → `/projects/chesslytics-dbt` |
| `/projects/spotifriend` | `SpotiFriend` |
| `/projects/nlp-pipeline` | `NlpPipeline` |
| `/projects/movie-recommendations` | `MovieRecommendations` |
| `/projects/etl-tools` | `Pison` |
| `/projects/fidelity` | `Fidelity` |
| `/projects/eeg-research` | `EEGResearch` |
| `/hobbies/piano` | `PianoKeyboard` |
| `/hobbies/piano/more` | `Piano` |
| `/hobbies/chess` | `ChessStats` |
| `/hobbies/chess/more` | `Chess` |
| `/contact` | `Contact` |
| `/contact-success` | `ContactSuccess` |
| `/resume` | `Resume` *(hidden — uncomment in App.tsx to re-enable)* |
| `/analytics` | `Analytics` *(hidden — no nav link; embeds Umami share dashboard)* |

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
| Formspree | Contact form POST (`src/pages/Contact.tsx`) |
| YouTube | `<iframe>` embeds in Piano and Chess hobby pages |
| Google Fonts | Playfair Display + Inter (loaded in `index.html`) |
| Vercel | Hosting + auto-deploy |
| Umami Cloud | Privacy-friendly analytics; tracking script in `index.html`; hidden `/#/analytics` embeds [Umami share dashboard](https://cloud.umami.is/analytics/us/share/ro275gw9xcSCsLan) |
