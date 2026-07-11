import { useState, useCallback } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import Lightbox from './Lightbox'

interface ClickableExpandableImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  showExpandIcon?: boolean
  children?: ReactNode
}

function ClickableExpandableImage({ src, alt, caption = '', className = '', showExpandIcon = true, children }: ClickableExpandableImageProps) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const label = caption || alt

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <>
      <div
        className={`lb-trigger ${className}`.trim()}
        onClick={() => setOpen(true)}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Enlarge image: ${label}`}
      >
        {children}
        {showExpandIcon ? (
          <span className="lb-expand-icon" aria-hidden="true">
            <i className="fas fa-expand" />
          </span>
        ) : null}
      </div>
      {open ? <Lightbox src={src} alt={alt} caption={caption} onClose={close} /> : null}
    </>
  )
}

export default ClickableExpandableImage
