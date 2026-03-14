import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }, [location.pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto'
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">EL</Link>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
          <li><Link to="/projects" className={isActive('/projects') ? 'active' : ''}>Projects</Link></li>
          {/* Resume hidden for now – uncomment to show: <li><Link to="/resume" className={isActive('/resume') ? 'active' : ''}>Resume</Link></li> */}
          <li className="dropdown">
            <a 
              href="#" 
              className="dropdown-toggle"
              onClick={(e) => {
                e.preventDefault()
                setIsDropdownOpen(!isDropdownOpen)
              }}
            >
              Hobbies <i className="fas fa-chevron-down"></i>
            </a>
            <ul className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
              <li><Link to="/hobbies/piano">Piano</Link></li>
              <li><Link to="/hobbies/chess">Chess</Link></li>
              <li><Link to="/hobbies/volleyball">Volleyball</Link></li>
              <li><Link to="/hobbies/skateboarding">Skateboarding</Link></li>
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

