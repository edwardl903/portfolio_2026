import { useEffect } from 'react'

export function useCursorEffect() {
  useEffect(() => {
    if (window.matchMedia?.('(pointer: coarse)').matches) return

    // ── Helpers ───────────────────────────────────────────────────
    function make(cls) {
      const d = document.createElement('div')
      d.className = cls
      document.body.appendChild(d)
      return d
    }

    // ── Elements ──────────────────────────────────────────────────
    const dot  = make('cur-dot')   // white circle w/ accent border — snaps
    const ring = make('cur-ring')  // larger ring — lerps behind cursor

    const TRAIL_N = 30
    const trail = Array.from({ length: TRAIL_N }, () => ({ e: make('cur-trail') }))

    // ── Position history (osu!-style: actual past coordinates) ─────
    // Each animation frame pushes the current mouse position in,
    // so fast movement = spread trail, slow movement = bunched trail.
    const histLen = TRAIL_N + 1
    const hist    = Array.from({ length: histLen }, () => ({ x: -300, y: -300 }))

    // ── State ─────────────────────────────────────────────────────
    let mx = -300, my = -300
    let rx = -300, ry = -300
    let hidden   = false
    let hovering = false
    let dotScale  = 1
    let ringScale = 1

    // ── Events ────────────────────────────────────────────────────
    const onMove = (e) => { mx = e.clientX; my = e.clientY }

    const onDown = () => spawnRipple(mx, my)

    function spawnRipple(x, y) {
      const r = document.createElement('div')
      r.className = 'cur-ripple'
      r.style.left = x + 'px'
      r.style.top  = y + 'px'
      document.body.appendChild(r)
      r.addEventListener('animationend', () => r.remove(), { once: true })
    }

    // ── Hover ─────────────────────────────────────────────────────
    function bindHover() {
      document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .lb-trigger, .btn, .project-card-v2'
      ).forEach(el => {
        el.addEventListener('mouseenter', () => { hovering = true  })
        el.addEventListener('mouseleave', () => { hovering = false })
      })
    }

    // ── Iframe hide ───────────────────────────────────────────────
    function setVisible(show) {
      hidden = !show
      const v = show ? '' : '0'
      dot.style.opacity  = v
      ring.style.opacity = v
      trail.forEach(t => { t.e.style.opacity = v })
    }

    document.querySelectorAll('iframe, embed, object').forEach(f => {
      f.addEventListener('mouseenter', () => setVisible(false))
      f.addEventListener('mouseleave', () => setVisible(true))
    })

    // ── Animation loop ────────────────────────────────────────────
    const RING_LERP = 0.16

    const tick = () => {
      if (!hidden) {
        // Smooth scale on hover
        const tDot  = hovering ? 1.5 : 1
        const tRing = hovering ? 1.7 : 1
        dotScale  += (tDot  - dotScale)  * 0.14
        ringScale += (tRing - ringScale) * 0.14

        // Dot snaps exactly to the mouse
        dot.style.transform =
          `translate(${mx}px,${my}px) translate(-50%,-50%) scale(${dotScale.toFixed(3)})`

        // Ring lerps
        rx += (mx - rx) * RING_LERP
        ry += (my - ry) * RING_LERP
        ring.style.transform =
          `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${ringScale.toFixed(3)})`

        // Push current position into history (circular-ish via unshift+pop)
        hist.unshift({ x: mx, y: my })
        if (hist.length > histLen) hist.pop()

        // Trail: each dot sits at a past cursor coordinate
        trail.forEach((t, i) => {
          const p     = hist[i + 1]   // i+1 so index 0 stays under the dot
          const ratio = 1 - i / TRAIL_N   // 1 → 0 as i increases
          t.e.style.transform =
            `translate(${p.x}px,${p.y}px) translate(-50%,-50%) scale(${ratio.toFixed(3)})`
          t.e.style.opacity = (0.6 * ratio).toFixed(3)
        })
      }

      requestAnimationFrame(tick)
    }

    // ── Boot ──────────────────────────────────────────────────────
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    bindHover()
    tick()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      dot.remove()
      ring.remove()
      trail.forEach(t => t.e.remove())
    }
  }, [])
}
