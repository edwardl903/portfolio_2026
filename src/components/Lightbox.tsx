import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

interface LightboxProps {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}

function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)

    // Compensate for scrollbar width before hiding scroll to prevent layout shift.
    // Classic scrollbars (Windows) take ~15 px; overlay scrollbars (macOS) take 0.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    // Use documentElement (html) rather than body: body overflow:hidden is ignored
    // by iOS Safari, which scrolls the viewport, not the body element.
    document.documentElement.style.overflowY = 'hidden'

    closeBtnRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.documentElement.style.overflowY = ''
      document.body.style.paddingRight = ''
    }
  }, [handleKey])

  // Portal to document.body is required. The Lightbox is typically rendered inside
  // a <section> that has a CSS transform (translateY) from the scroll-reveal animation.
  // Any non-none transform on an ancestor creates a new containing block for
  // position:fixed children, which breaks inset:0 centering. Portaling to body
  // escapes that ancestor entirely so the overlay covers the true viewport.
  return createPortal(
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <button ref={closeBtnRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close image">
        <i className="fas fa-times"></i>
      </button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="lightbox-img" />
        {caption && <p className="lightbox-caption">{caption}</p>}
      </div>
    </div>,
    document.body
  )
}

export default Lightbox
