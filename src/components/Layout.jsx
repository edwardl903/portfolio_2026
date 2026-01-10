import { useState, useEffect } from 'react'
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
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout

