import { useEffect } from 'react'

export function useCursorEffect() {
  useEffect(() => {
    // Disable custom cursor on touch / coarse pointer devices (mobile & tablets)
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    // Create main cursor
    const cursor = document.createElement('div')
    cursor.className = 'custom-cursor'
    document.body.appendChild(cursor)
    
    // Create cursor trails
    const trail1 = document.createElement('div')
    trail1.className = 'cursor-trail'
    document.body.appendChild(trail1)
    
    const trail2 = document.createElement('div')
    trail2.className = 'cursor-trail-2'
    document.body.appendChild(trail2)
    
    const trail3 = document.createElement('div')
    trail3.className = 'cursor-trail-3'
    document.body.appendChild(trail3)
    
    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0
    let trail1X = 0, trail1Y = 0
    let trail2X = 0, trail2Y = 0
    let trail3X = 0, trail3Y = 0
    let isOverIframe = false
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    
    const handleIframeEnter = () => {
      isOverIframe = true
      cursor.style.display = 'none'
      trail1.style.display = 'none'
      trail2.style.display = 'none'
      trail3.style.display = 'none'
      document.body.style.cursor = 'auto'
    }
    
    const handleIframeLeave = () => {
      isOverIframe = false
      cursor.style.display = 'block'
      trail1.style.display = 'block'
      trail2.style.display = 'block'
      trail3.style.display = 'block'
      document.body.style.cursor = 'none'
    }
    
    // Handle iframes and PDF viewers
    const iframes = document.querySelectorAll('iframe, embed[type="application/pdf"], object[type="application/pdf"]')
    iframes.forEach(el => {
      el.addEventListener('mouseenter', handleIframeEnter)
      el.addEventListener('mouseleave', handleIframeLeave)
    })
    
    const animateCursor = () => {
      if (!isOverIframe) {
        cursorX = mouseX
        cursorY = mouseY
        
        trail1X += (mouseX - trail1X) * 0.08
        trail1Y += (mouseY - trail1Y) * 0.08
        
        trail2X += (mouseX - trail2X) * 0.05
        trail2Y += (mouseY - trail2Y) * 0.05
        
        trail3X += (mouseX - trail3X) * 0.03
        trail3Y += (mouseY - trail3Y) * 0.03
        
        cursor.style.left = cursorX - 8 + 'px'
        cursor.style.top = cursorY - 8 + 'px'
        
        trail1.style.left = trail1X - 3 + 'px'
        trail1.style.top = trail1Y - 3 + 'px'
        
        trail2.style.left = trail2X - 2 + 'px'
        trail2.style.top = trail2Y - 2 + 'px'
        
        trail3.style.left = trail3X - 1.5 + 'px'
        trail3.style.top = trail3Y - 1.5 + 'px'
      }
      
      requestAnimationFrame(animateCursor)
    }
    
    animateCursor()
    
    // Interactive elements hover effects
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .btn')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (!isOverIframe) {
          cursor.style.transform = 'scale(1.5)'
        }
      })
      el.addEventListener('mouseleave', () => {
        if (!isOverIframe) {
          cursor.style.transform = 'scale(1)'
        }
      })
    })
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      iframes.forEach(el => {
        el.removeEventListener('mouseenter', handleIframeEnter)
        el.removeEventListener('mouseleave', handleIframeLeave)
      })
      cursor.remove()
      trail1.remove()
      trail2.remove()
      trail3.remove()
    }
  }, [])
}

