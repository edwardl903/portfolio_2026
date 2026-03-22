import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }, [location.pathname])

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen
    setIsMobileMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : 'auto'
  }

  const isActive = (path) => location.pathname === path
  const isHobbyActive = location.pathname.startsWith('/hobbies')

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">EL</Link>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
          <li><Link to="/projects" className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
          <li className="dropdown">
            {/* Label only — not a link, not clickable */}
            <span className={`dropdown-toggle ${isHobbyActive ? 'active' : ''}`}>
              Hobbies <i className="fas fa-chevron-down"></i>
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/hobbies/piano" className={isActive('/hobbies/piano') ? 'active' : ''}>Piano</Link></li>
              <li><Link to="/hobbies/chess" className={isActive('/hobbies/chess') ? 'active' : ''}>Chess</Link></li>
              <li><Link to="/hobbies/volleyball" className={isActive('/hobbies/volleyball') ? 'active' : ''}>Volleyball</Link></li>
              <li><Link to="/hobbies/skateboarding" className={isActive('/hobbies/skateboarding') ? 'active' : ''}>Skateboarding</Link></li>
            </ul>
          </li>
          <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
        </ul>
        <div
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

