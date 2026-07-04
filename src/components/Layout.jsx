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

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'portfolio_route_change',
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [location.pathname, location.search, location.hash])

  useCursorEffect()
  useScrollAnimations(location.pathname)

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

