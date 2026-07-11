# Portfolio Mental Model

> **Purpose of this file:** A single place to understand the whole site at a glance.
> Update it whenever a page is added/removed, a route changes, a major feature ships, or the narrative direction shifts.
> Detail lives in the other `docs/` files — this file points to them and shows how they connect.

---

## What this site is trying to do

Edward Lai's portfolio has **one job**: convince a recruiter or technical lead that Edward is worth talking to, and leave them with a clear picture of who he is.

**Target audiences (in priority order):**
1. **Hiring manager / recruiter** — 30-second skim: who is he, where did he work, does he seem sharp and real?
2. **Technical lead** — 5-minute read: can he build things end-to-end, does he understand the data stack, is his code honest?
3. **Collaborators / curious people** — hobby pages, chess stats, contact form

**The narrative arc:**
```
Home (first impression)
  ↓
About (who he is as a person)
  ↓
Projects (what he actually built)
  ↓
Hobbies (why he is interesting outside of work)
  ↓
Contact (reach out)
```

The site should read like a person, not a resume. Direct, specific, a little personal. No corporate filler.

---

## Site map (current live state)

```
/                      Home              ← public, in nav
/about                 About             ← public, in nav
/projects              Projects index    ← public, in nav
/contact               Contact           ← public, in nav
/contact-success       ContactSuccess    ← redirect after form submit

── Project detail pages (linked from /projects) ──────────────────────
/projects/chesslytics           ChessLytics Flask app
/projects/chesslytics-dbt       ChessLytics dbt pipeline
/projects/chesslytics-azure     → redirects to /projects/chesslytics-dbt
/projects/spotifriend           SpotiFriend personal pipeline
/projects/nlp-pipeline          NLP sentiment/classification
/projects/movie-recommendations Movie recommendation system
/projects/etl-tools             Pison Technology internship
/projects/fidelity              Fidelity Investments work
/projects/eeg-research          EEG / Tufts research

── Hobby pages (linked from Hobbies dropdown) ────────────────────────
/hobbies/piano                  PianoKeyboard (interactive)  ← in nav
/hobbies/piano/more             Piano (narrative + videos)    ← linked from /piano
/hobbies/chess                  ChessStats (live dashboard)   ← in nav
/hobbies/chess/more             Chess (narrative + photos)    ← linked from /chess
/hobbies/volleyball             Volleyball                    ← in nav
/hobbies/skateboarding          Skateboarding                 ← in nav

── Hidden pages (not in nav — direct URL only) ───────────────────────
/resume                         Resume      ← HIDDEN (uncomment in App.tsx + Navbar.tsx)
/analytics                      Analytics   ← HIDDEN bookmark (embeds Umami dashboard)
```

---

## Page-by-page: purpose and current state

### Home `/`
- **Job:** Make a strong first impression in 5 seconds
- **Key elements:** eyebrow ("Data Analyst"), two-line name hero, tagline (Tufts), short bio, CTA buttons, hero photo (lightbox)
- **Current state:** Bio references Curaleaf in present tense — update when Edward decides how to frame the job search
- **Tone target:** Warm and confident, not corporate

### About `/about`
- **Job:** Make Edward a real person, not just a resume
- **Key elements:** work history paragraph, Miyazaki quote, photo mosaic (lightbox), skills tags
- **Current state:** Solid. Education not mentioned (Tufts only on Home). No major copy issues.
- **Note:** No Volleyball or Skateboarding linked from About text — Piano and Chess are linked inline

### Projects `/projects`
- **Job:** Give a recruiters a fast overview of all projects; link to detail pages
- **Key elements:** casual subtitle, project card grid (`.project-card-v2`)
- **Current state:** Fidelity card copy is still generic ("Led... high-value... actionable insights") — needs a rewrite pass to match the Fidelity detail page
- **Project ranking on the card grid:** [check current order in Projects.tsx — update this line when reordered]

### Project deep-dives
| Route | What it shows | Flagship? | Known issues |
|-------|---------------|-----------|--------------|
| `/projects/chesslytics` | Flask app, GCP pipeline, screenshots | Yes — lead project | None (dbt contradiction fixed 2026-07-04) |
| `/projects/chesslytics-dbt` | dbt model lineage, incremental strategy, GitHub Actions pipeline | Yes — lead project | None |
| `/projects/spotifriend` | Personal AWS/S3 pipeline, OAuth/PKCE | Yes | None — copy is strong |
| `/projects/nlp-pipeline` | NLP course project, real metrics, honest scope | Supporting | No GitHub link |
| `/projects/movie-recommendations` | ML course project | Supporting | No GitHub link |
| `/projects/etl-tools` | Pison internship | Supporting | Copy needs Edward's actual experience |
| `/projects/fidelity` | Fidelity analytics | Supporting | Copy needs Edward's actual experience |
| `/projects/eeg-research` | Tufts EEG research | Supporting | Copy needs Edward's actual experience |

### Hobbies
| Route | What it shows | Notes |
|-------|---------------|-------|
| `/hobbies/piano` | Interactive keyboard with video previews | Unique feature — good differentiator |
| `/hobbies/piano/more` | YouTube performances, narrative | Strong copy |
| `/hobbies/chess` | **Live dbt-powered stats dashboard** | Powered by nightly GitHub Actions pipeline — shows real engineering |
| `/hobbies/chess/more` | Club story, giant chess board, photos | Strong copy; chess ratings will go stale |
| `/hobbies/volleyball` | Narrative + photos | Casual, good voice |
| `/hobbies/skateboarding` | Narrative + photos | Casual, good voice |

---

## How the data projects connect

```
Chess.com API
      │
      ▼
ChessLytics Flask app (/projects/chesslytics)
      │  dumps raw games
      ▼
BigQuery raw_games table
      │
      ▼
dbt pipeline (/projects/chesslytics-dbt)
      │  runs nightly via GitHub Actions
      ▼
fct_my_games + my_daily_stats (mart layer)
      │
      ├──► Looker Studio embed (in ChessLytics Flask app)
      │
      └──► ChessStats live dashboard (/hobbies/chess)
               Flask API on Heroku reads from mart tables

Spotify Web API
      │  OAuth PKCE
      ▼
SpotiFriend (/projects/spotifriend)
      │  partitioned JSONL
      ▼
AWS S3
```

This is the story that shows Edward can own an end-to-end pipeline, not just build dashboards.

---

## Technical quick-reference

| Area | Current state |
|------|---------------|
| Framework | React 19, Vite 7, React Router DOM 7 |
| Router type | `BrowserRouter` (Vercel handles SPA routing) |
| CSS | `src/styles/base.css` (tokens) + `src/styles.css` (~4,550 lines after 2026-07-04 purge) |
| Theme | **Light only** in practice. Dark mode toggle exists in Navbar but is legacy. Tokens in `base.css` still include dark overrides. See `design-system.md` for token list. |
| Cursor | osu!-style dot + ring, event delegation hover, disabled on touch/coarse-pointer |
| Scroll animations | IntersectionObserver on `section` elements; re-runs on route change (fixed 2026-07-04) |
| Analytics | Umami Cloud (privacy-friendly); GTM/GA4 `dataLayer` push on route change |
| Contact form | Formspree POST; client validation; success redirect to `/contact-success` |
| Image optimization | `npm run optimize-images` (sharp); lazy-load on all non-hero images |
| Deploy | `git push main` → Vercel auto-builds |

---

## Accessibility state (as of 2026-07-04 audit)

| Item | Status |
|------|--------|
| `lang="en"` on `<html>` | Done |
| Lightbox triggers keyboard-accessible | Done (About, Chess — fixed 2026-07-04) |
| Hobbies dropdown keyboard-accessible | Done (fixed 2026-07-04) |
| Scroll/cursor hooks work after navigation | Done (fixed 2026-07-04) |
| Contact form labels + error states | Done |
| Lightbox focus trap | Not done — Tab can escape to page behind |
| Color contrast on `--text-muted` / accent small text | Not verified — likely below WCAG AA |
| Skip-to-content link | Not done |
| `ChessStats` ARIA tabs pattern | Partial — tabs lack `aria-controls`, arrow-key nav |

---

## Open items / known issues

| Issue | Priority | Where |
|-------|----------|-------|
| Home + About still say present-tense Curaleaf | High — when Edward decides on framing | `Home.tsx`, `About.tsx` |
| Fidelity card on Projects index is generic copy | High | `Projects.tsx` |
| Education (Tufts, CS + HFE, May 2025) missing from About | Medium | `About.tsx` |
| Dark theme infrastructure is dead code | Medium | `useTheme.js`, Navbar toggle, `base.css` dark overrides |
| ChessStats: rating numbers will go stale in Chess.tsx | Low | `Chess.tsx` line ~24 |
| Lightbox has no focus trap | Medium | `Lightbox.tsx` |
| Pison / Fidelity / EEG deep-dive copy not yet personalized | Medium | respective JSX files |
| Google Fonts + Font Awesome are render-blocking | Low | `index.html` |

---

## What to update in this file

Update `mental-model.md` when:
- A page or route is added or removed
- A project is added, moved to hidden, or removed from the projects index
- The narrative framing changes (e.g., if Edward's job title or target role changes)
- A major known issue is resolved or discovered
- The technical stack changes (new service, new dependency)
- The accessibility state changes

Do **not** put CSS rules, token values, or component-level details here — those live in `design-system.md` and `architecture.md`.

---

*Last updated: 2026-07-04 — initial version; reflects post-audit state*
