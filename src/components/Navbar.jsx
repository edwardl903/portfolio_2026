import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [hobbiesClosed, setHobbiesClosed] = useState(false)
  const location  = useLocation()
  const overlayRef = useRef(null)
  const [theme, toggleTheme] = useTheme()

  // Scroll-shrink effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock / unlock body + html scroll when menu opens/closes
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (menuOpen) {
      html.style.overflow = 'hidden'
      body.style.overflow  = 'hidden'
    } else {
      html.style.overflow = ''
      body.style.overflow  = ''
    }
    return () => {
      html.style.overflow = ''
      body.style.overflow  = ''
    }
  }, [menuOpen])

  // Auto-close on route change
  useEffect(() => {
    setMenuOpen(false)
    setHobbiesClosed(true)
    document.activeElement?.blur()
  }, [location.pathname])

  const toggleMenu = () => setMenuOpen(o => !o)
  const closeMenu  = () => setMenuOpen(false)
  const closeHobbiesDropdown = () => {
    setHobbiesClosed(true)
    document.activeElement?.blur()
  }
  const openHobbiesDropdown = () => setHobbiesClosed(false)

  const isActive  = path => location.pathname === path
  const hobbyOn   = location.pathname.startsWith('/hobbies')

  return (
    <>
      {/* ── Fixed top bar ── */}
      <nav className={`navbar${isScrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img src="/static/images/shared/el-logo.png" alt="EL" />
          </Link>

          {/* Desktop horizontal menu — hidden on mobile via CSS */}
          <ul className="nav-menu">
            <li><Link to="/"         className={isActive('/')         ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about"    className={isActive('/about')    ? 'active' : ''}>About</Link></li>
            <li><Link to="/projects" className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
            <li
              className={`dropdown${hobbiesClosed ? ' dropdown-closed' : ''}`}
              onMouseEnter={openHobbiesDropdown}
              onMouseLeave={closeHobbiesDropdown}
            >
              <Link
                to="/hobbies"
                className={`dropdown-toggle${hobbyOn ? ' active' : ''}`}
                aria-haspopup="true"
                onClick={closeHobbiesDropdown}
              >
                Hobbies <i className="fas fa-chevron-down" aria-hidden="true" />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/hobbies/piano"        className={isActive('/hobbies/piano')        ? 'active' : ''} onClick={closeHobbiesDropdown}>Piano</Link></li>
                <li><Link to="/hobbies/chess"        className={isActive('/hobbies/chess')        ? 'active' : ''} onClick={closeHobbiesDropdown}>Chess</Link></li>
                <li><Link to="/hobbies/volleyball"   className={isActive('/hobbies/volleyball')   ? 'active' : ''} onClick={closeHobbiesDropdown}>Volleyball</Link></li>
                <li><Link to="/hobbies/skateboarding"className={isActive('/hobbies/skateboarding')? 'active' : ''} onClick={closeHobbiesDropdown}>Skateboarding</Link></li>
                <li><Link to="/hobbies/running"      className={isActive('/hobbies/running')      ? 'active' : ''} onClick={closeHobbiesDropdown}>Running</Link></li>
              </ul>
            </li>
            <li><Link to="/contact"   className={isActive('/contact')    ? 'active' : ''}>Contact</Link></li>
            <li><Link to="/analytics" className={isActive('/analytics')  ? 'active' : ''}>Analytics</Link></li>
            <li>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                type="button"
              >
                <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'} aria-hidden="true" />
              </button>
            </li>
          </ul>

          {/* Hamburger — shown only on mobile */}
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            type="button"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      {/* Rendered as sibling to <nav>, styled independently, no CSS conflicts */}
      <div
        ref={overlayRef}
        className={`mob-overlay${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Tappable backdrop — clicking the gap closes the menu */}
        <div className="mob-backdrop" onClick={closeMenu} />

        <nav className="mob-inner" aria-label="Mobile navigation">
          <Link to="/"         className={`mob-link${isActive('/')         ? ' active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/about"    className={`mob-link${isActive('/about')    ? ' active' : ''}`} onClick={closeMenu}>About</Link>
          <Link to="/projects" className={`mob-link${isActive('/projects') ? ' active' : ''}`} onClick={closeMenu}>Projects</Link>

          <div className="mob-section">
            <Link to="/hobbies" className={`mob-label${hobbyOn ? ' active' : ''}`} onClick={closeMenu}>Hobbies</Link>
            <Link to="/hobbies/piano"        className={`mob-link sub${isActive('/hobbies/piano')        ? ' active' : ''}`} onClick={closeMenu}>Piano</Link>
            <Link to="/hobbies/chess"        className={`mob-link sub${isActive('/hobbies/chess')        ? ' active' : ''}`} onClick={closeMenu}>Chess</Link>
            <Link to="/hobbies/volleyball"   className={`mob-link sub${isActive('/hobbies/volleyball')   ? ' active' : ''}`} onClick={closeMenu}>Volleyball</Link>
            <Link to="/hobbies/skateboarding"className={`mob-link sub${isActive('/hobbies/skateboarding')? ' active' : ''}`} onClick={closeMenu}>Skateboarding</Link>
            <Link to="/hobbies/running"      className={`mob-link sub${isActive('/hobbies/running')      ? ' active' : ''}`} onClick={closeMenu}>Running</Link>
          </div>

          <Link to="/contact"   className={`mob-link${isActive('/contact')    ? ' active' : ''}`} onClick={closeMenu}>Contact</Link>
          <Link to="/analytics" className={`mob-link${isActive('/analytics')  ? ' active' : ''}`} onClick={closeMenu}>Analytics</Link>

          <button
            className="mob-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            type="button"
          >
            <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'} aria-hidden="true" />
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </nav>
      </div>
    </>
  )
}

export default Navbar
