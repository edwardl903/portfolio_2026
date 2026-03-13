## Content Structure

This document describes how content is organized across pages, components, and static assets.

### High-Level Sections

The portfolio is organized around a few key sections:

- **Home** – High-level intro, name, role, and primary CTAs
- **About** – Narrative biography, photos, and skills
- **Projects** – Project grid and individual project detail pages
- **Resume** – Embedded PDF and download link
- **Hobbies** – Deep-dive pages for Piano, Chess, Volleyball, and Skateboarding
- **Contact** – Contact form + social links

### Pages (`src/pages`)

- `Home.jsx`
  - Hero content (name, title, short pitch)
  - Primary calls to action:
    - `View Projects` → `/projects`
    - `Get In Touch` → `/contact`
  - Hero image: `/static/images/home/profile-picture.jpg`

- `About.jsx`
  - Three main blocks:
    - **Intro paragraphs**: background, work history, hobbies
    - **Personal motto** (quote block with citation)
    - **About photos** (portrait, dog, family / friends / adventures)
  - Supports:
    - Inline hobby links (`/hobbies/piano`, `/hobbies/chess`, etc.)
    - Skills section at the bottom

- `Projects.jsx`
  - Top-level heading + short intro
  - **Projects grid**: each card links to a project detail route and external resources (live demo, GitHub)
  - Each project card includes:
    - Thumbnail image
    - Name and short description
    - Links: GitHub / live / report

- `pages/projects/*`
  - `ChessLytics.jsx`: detailed story + architecture narrative (more content planned)
  - Other project pages: placeholders for content migration; currently show a title and note referencing old HTML files

- `Resume.jsx`
  - Download button for PDF
  - Embedded PDF viewer using `<iframe>`

- `Contact.jsx`
  - Validated contact form:
    - Name, email, message
    - Basic client-side validation
  - Formspree integration for handling submissions
  - Contact info + social links (GitHub, LinkedIn, ChessLytics)

- `ContactSuccess.jsx`
  - Simple confirmation screen after successful form submission

### Hobbies (`src/pages/hobbies`)

Each hobby page follows the pattern:

- **Intro narrative**: how the hobby started and what it means to you
- **Highlight media**: YouTube embeds or curated photos
- **Meta details**: difficulty, context (competition, casual, etc.)

Examples:

- `Piano.jsx`
  - Multiple performance sections (duets, favorite pieces, classical)
  - Mix of iframes (YouTube) and a thumbnail-with-overlay pattern

- `Chess.jsx`
  - Chess journey, rating, teaching + leadership context
  - Chess club photo grid with curated captions

### Assets (`public/static/images`)

Images are organized by usage:

- `home/` – Hero/profile images
- `about/` – Personal + family/friends/adventure photos
- `projects/`
  - One folder per major project (e.g., `chesslytics`, `spotifriend`, etc.)
  - `charts/` for shared visualizations
- `hobbies/` – One folder per hobby
- `resume/` – Resume PDF
- `shared/` – Shared logos/graphics (e.g., Databricks logo)

### Content Ownership & Updates

- **Copy** lives in React components under `src/pages/…`
  - Edit content directly in these files (no CMS)
  - Each page is responsible for its own narrative and microcopy
- **Images / PDFs** live in `public/static/images/…`
  - When adding a new image:
    - Place it in the correct subfolder
    - Reference with `/static/images/...` from components

This structure is optimized for:
- Simple mental model (one folder per concern)
- Easy updates (all page copy lives in one file per page)
- Good mapping between routes, content, and assets

