import { useEffect, useCallback, useRef } from 'react'

function Lightbox({ src, alt, caption, onClose }) {
  const closeBtnRef = useRef(null)

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
      <button ref={closeBtnRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close image">
        <i className="fas fa-times"></i>
      </button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="lightbox-img" />
        {caption && <p className="lightbox-caption">{caption}</p>}
      </div>
    </div>
  )
}

export default Lightbox
