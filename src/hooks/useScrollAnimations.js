import { useEffect } from 'react'

export function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all sections for fade-in animation
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      section.classList.add('fade-in')
      observer.observe(section)
    })

    // Make first section visible immediately
    if (sections[0]) {
      sections[0].classList.add('visible')
    }

    return () => {
      sections.forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [])
}

