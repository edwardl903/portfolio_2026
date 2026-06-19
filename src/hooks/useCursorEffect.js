import { useEffect } from 'react'

export function useCursorEffect() {
  useEffect(() => {
    if (window.matchMedia?.('(pointer: coarse)').matches) return

    function make(cls) {
      const d = document.createElement('div')
      d.className = cls
      document.body.appendChild(d)
      return d
    }

    const dot  = make('cur-dot')
    const ring = make('cur-ring')

    let mx = -300, my = -300
    let rx = -300, ry = -300
    let hidden   = false
    let hovering = false
    let dotScale  = 1
    let ringScale = 1

    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    function bindHover() {
      document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .lb-trigger, .btn, .project-card-v2'
      ).forEach(el => {
        el.addEventListener('mouseenter', () => { hovering = true  })
        el.addEventListener('mouseleave', () => { hovering = false })
      })
    }

    function setVisible(show) {
      hidden = !show
      const v = show ? '' : '0'
      dot.style.opacity  = v
      ring.style.opacity = v
    }

    document.querySelectorAll('iframe, embed, object').forEach(f => {
      f.addEventListener('mouseenter', () => setVisible(false))
      f.addEventListener('mouseleave', () => setVisible(true))
    })

    const RING_LERP = 0.16

    const tick = () => {
      if (!hidden) {
        const tDot  = hovering ? 1.5 : 1
        const tRing = hovering ? 1.7 : 1
        dotScale  += (tDot  - dotScale)  * 0.14
        ringScale += (tRing - ringScale) * 0.14

        dot.style.transform =
          `translate(${mx}px,${my}px) translate(-50%,-50%) scale(${dotScale.toFixed(3)})`

        rx += (mx - rx) * RING_LERP
        ry += (my - ry) * RING_LERP
        ring.style.transform =
          `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${ringScale.toFixed(3)})`
      }

      requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    bindHover()
    tick()

    return () => {
      document.removeEventListener('mousemove', onMove)
      dot.remove()
      ring.remove()
    }
  }, [])
}
