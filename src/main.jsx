import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/base.css'
import './styles.css'
import App from './App.jsx'

// Using HashRouter for GitHub Pages compatibility
// For Vercel/Netlify, change to BrowserRouter
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
