# Edward Lai - React Portfolio

A modern React-based portfolio website built with Vite, React Router, and modern web technologies.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
portfolio_2026/
├── public/
│   ├── static/
│   │   └── images/     # All images and assets
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/     # Reusable components (Navbar, Footer, Layout)
│   ├── pages/          # Page components
│   │   ├── hobbies/    # Hobby detail pages
│   │   └── projects/   # Project detail pages
│   ├── hooks/          # Custom React hooks
│   ├── App.jsx         # Main App component with routing
│   ├── main.jsx        # Entry point
│   ├── styles.css      # Main stylesheet (from original project)
│   └── index.css       # Base styles
└── dist/               # Production build output
```

## 🛠️ Technologies

- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Vite 7** - Build tool and dev server
- **CSS3** - Styling (original styles.css preserved)

## 🚀 Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to GitHub Pages:
   - Option A: Use GitHub Actions (recommended)
   - Option B: Use `gh-pages` package
   - Option C: Copy `dist` contents to root branch

3. The app uses `HashRouter` which is compatible with GitHub Pages without needing server configuration.

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. For Vercel, you can switch to `BrowserRouter` in `src/main.jsx` for cleaner URLs (no # in URLs).

### Switching to BrowserRouter for Vercel/Netlify

If deploying to Vercel or Netlify, you can use `BrowserRouter` instead of `HashRouter`:

1. Update `src/main.jsx`:
```jsx
import { BrowserRouter } from 'react-router-dom'
// Change HashRouter to BrowserRouter
```

2. Create `vercel.json` for Vercel:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📝 Notes

- All original HTML pages have been converted to React components
- All styling is preserved from the original `styles.css`
- Static assets are in the `public/static/images/` folder
- The app uses HashRouter by default for GitHub Pages compatibility
- Custom hooks handle cursor effects, scroll animations, and typewriter effects
- Contact form uses Formspree for form submission

## 🎯 Next Steps

- Complete migration of hobby pages (currently placeholders)
- Complete migration of project detail pages (currently placeholders)
- Add React-specific optimizations (lazy loading, code splitting)
- Add error boundaries
- Consider adding TypeScript for type safety

## 📄 License

Same as original portfolio project.

---

**Built with ❤️ and lots of ☕ by Edward Lai**
