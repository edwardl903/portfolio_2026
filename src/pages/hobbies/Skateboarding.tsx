import { useCallback, useEffect, useState } from 'react'
import Lightbox from '../../components/Lightbox'

type LightboxState = { src: string; alt: string; caption: string } | null

type SkateSlide = {
  src: string
  alt: string
  caption: string
}

const SKATE_SLIDES: SkateSlide[] = [
  {
    src: '/static/images/hobbies/skateboarding/trick-night.jpg',
    alt: 'Night session trick',
    caption: 'Night session',
  },
  {
    src: '/static/images/hobbies/skateboarding/trick-campus.jpg',
    alt: 'Kickflip on campus',
    caption: 'Tufts campus',
  },
  {
    src: '/static/images/hobbies/skateboarding/trick-1.jpg',
    alt: 'Kickflip against tile wall',
    caption: 'Kickflip against tile wall',
  },
  {
    src: '/static/images/hobbies/skateboarding/the-boards.jpg',
    alt: 'Two skateboards, one with custom "ED" mosaic art, one covered in stickers',
    caption: 'The boards',
  },
  {
    src: '/static/images/hobbies/skateboarding/broken-board.jpg',
    alt: 'Delaminated skateboard deck on the ground',
    caption: 'The one that ended things for three months',
  },
  {
    src: '/static/images/hobbies/skateboarding/dog-on-board.jpg',
    alt: 'A dog sitting on a longboard',
    caption: 'A more experienced longboarder than me',
  },
]

function Skateboarding() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const slideCount = SKATE_SLIDES.length
  const activeSlide = SKATE_SLIDES[activeIndex]

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slideCount) % slideCount)
  }, [slideCount])

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1)
  }, [activeIndex, goTo])

  const goNext = useCallback(() => {
    goTo(activeIndex + 1)
  }, [activeIndex, goTo])

  const openLightbox = () => {
    setLightbox({
      src: activeSlide.src,
      alt: activeSlide.alt,
      caption: activeSlide.caption,
    })
  }

  const closeLightbox = () => setLightbox(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightbox) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev, lightbox])

  return (
    <section className="hobby-detail">
      <div className="container">
        <div className="hobby-header">
          <div className="hobby-icon">
            <i className="fas fa-skating"></i>
          </div>
        </div>

        <div className="hobby-content">
          <div className="hobby-description">
            <h2>Skateboarding</h2>

            <p>Picked this up during COVID, and I had zero natural talent for it. Just balancing on the board took longer than I expected. There were a lot of falls before anything started clicking.</p>

            <p>It took me a month or two to land a decent ollie, and honestly I'm still refining it. Pop shuvits came next, then kickflips, which I'm still working on consistently. The progression is slow but it's satisfying when something finally sticks.</p>

            <p>Mostly I cruise now. I put cruiser wheels on my skateboard so it doubles as transportation, and you'll catch me riding that or my longboard around more than doing tricks. It's genuinely one of my favorite hobbies though.</p>
          </div>

          <div className="skateboarding-highlight">
            <h3>Skateboarding Highlight</h3>
            <div className="video-container">
              <div className="video-card">
                <div className="video-thumbnail">
                  <iframe
                    src="https://www.youtube.com/embed/9SnrObSmlt8"
                    title="Edward Lai Kickflip Progression"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="video-info">
                  <h4>Kickflip Progression</h4>
                  <p>Progress video from when I was learning kickflips. Still not consistent, but getting there.</p>
                  <div className="video-meta">
                    <span className="difficulty">Intermediate</span>
                    <span className="duration">Progression Video</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="skate-slideshow-section">
            <div className="skate-slideshow-header">
              <h3>Photos</h3>
              <p className="skate-slideshow-count" aria-live="polite">
                {activeIndex + 1} / {slideCount}
              </p>
            </div>

            <div className="skate-slideshow">
              <button
                type="button"
                className="skate-slideshow-nav skate-slideshow-nav-prev"
                onClick={goPrev}
                aria-label="Previous photo"
              >
                <i className="fas fa-chevron-left" aria-hidden="true" />
              </button>

              <div className="skate-slideshow-viewport">
                <button
                  type="button"
                  className="skate-slideshow-image-btn lb-trigger"
                  onClick={openLightbox}
                  aria-label={`Enlarge photo: ${activeSlide.alt}`}
                >
                  <img
                    key={activeSlide.src}
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    className="skate-slideshow-image"
                    loading="lazy"
                  />
                </button>
              </div>

              <button
                type="button"
                className="skate-slideshow-nav skate-slideshow-nav-next"
                onClick={goNext}
                aria-label="Next photo"
              >
                <i className="fas fa-chevron-right" aria-hidden="true" />
              </button>
            </div>

            <p className="skate-slideshow-caption">{activeSlide.caption}</p>

            <div className="skate-slideshow-dots" role="tablist" aria-label="Skateboarding photos">
              {SKATE_SLIDES.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  className={`skate-slideshow-dot${index === activeIndex ? ' is-active' : ''}`}
                  aria-label={`Show photo ${index + 1}: ${slide.caption}`}
                  aria-selected={index === activeIndex}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={closeLightbox}
        />
      )}
    </section>
  )
}

export default Skateboarding
