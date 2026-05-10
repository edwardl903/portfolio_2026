import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Background from './Background'
import { useCursorEffect } from '../hooks/useCursorEffect'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

function Layout({ children }) {
  const location = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useCursorEffect()
  useScrollAnimations()

  return (
    <>
      <Background />
      <Navbar />
      <div className="layout-shell">
        <main className="layout-main">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout

