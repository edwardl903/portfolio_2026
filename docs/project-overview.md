## Project Overview

This repository contains **Edward Lai’s personal portfolio**, built as a single-page React application with client-side routing. The site showcases professional experience, technical projects, and personal hobbies, while emphasizing performance, readability, and a clean, minimal visual style.

The primary goals of the project are:
- **Tell a coherent story** about Edward as a data engineer / data analyst
- **Highlight key projects** (ChessLytics, SpotiFriend, NLP pipeline, MovieLens recommender, ETL tools, EEG research)
- **Show personality and hobbies** (piano, chess, volleyball, skateboarding)
- **Provide clear contact paths** for recruiters, hiring managers, and collaborators

### Tech Stack

- **Frontend framework**: React 19
- **Routing**: React Router DOM 7 (HashRouter by default; can be switched to BrowserRouter for Vercel)
- **Build tool**: Vite 7
- **Styling**: Hand-crafted CSS in `styles.css` and `index.css`
- **Deployment**: Vercel (recommended) or GitHub Pages
- **Forms**: Formspree for contact form submission

### High-Level Features

- **Hero / Home**: Name, role, short summary, primary CTAs (“View Projects”, “Get In Touch”)
- **About**: Narrative biography, personal photos, and a skills summary
- **Projects**: Grid of project cards + dedicated detail pages for major projects
- **Resume**: Embedded PDF with a separate download button
- **Hobbies**: Rich content pages for piano, chess, volleyball, and skateboarding (including YouTube embeds)
- **Contact**: Validated contact form with success screen and social links

### Non-Goals

- No authentication or user accounts
- No CMS or admin interface
- No backend API in this repo (projects link out to external apps / repos)

