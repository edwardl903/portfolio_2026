# Project Overview

Edward Lai's personal portfolio — a single-page React application showcasing his work as a Data Analyst, his data engineering projects, and his personal hobbies.

## Primary Goals

- Tell a coherent story about Edward as a **Data Analyst** (currently at Curaleaf Holdings; previously Fidelity Investments, Pison Technology, Tufts HCI Lab)
- Highlight key technical projects (ChessLytics, SpotiFriend, NLP Pipeline, Movie Recommendations, ETL Tools, EEG Research)
- Show personality through hobbies (piano, chess, volleyball, skateboarding)
- Provide clear contact paths for recruiters and collaborators

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 |
| Routing | React Router DOM 7 (BrowserRouter, Vercel deployment) |
| Build | Vite 7 |
| Styling | Hand-crafted CSS (`src/styles.css`, `src/styles/base.css`) |
| Fonts | Playfair Display (headings) + Inter (body) via Google Fonts |
| Forms | Formspree |
| Image optimization | `sharp` via `npm run optimize-images` |
| Deployment | Vercel (auto-deploys on `git push` to main) |

## Current Design

- **Theme**: Warm light theme (`#f9f7f4` background, `#ffffff` surfaces)
- **Accent**: Amber (`#C4894F`) for active states, CTAs, tags, and section borders
- **Typography**: Playfair Display headings + Inter body
- **Cursor**: Custom osu!-inspired cursor with trail and click ripple (desktop only)

## Key Features

- Responsive layout (desktop + mobile drawer nav)
- Custom cursor with osu!-style particle trail and click ripple
- Lightbox for About page photos
- Scroll-triggered fade-in animations (IntersectionObserver)
- Lazy-loaded images throughout
- Contact form with Formspree integration + success screen

## Non-Goals

- No authentication or user accounts
- No CMS or admin interface
- No backend API (projects link out to external apps/repos)
- Resume page is temporarily hidden (can be re-enabled in `App.jsx` and `Navbar.jsx`)
