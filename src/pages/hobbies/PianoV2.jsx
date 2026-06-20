import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WHITE_W = 68
const BLACK_W = 40
const BLACK_H = 136
const WHITE_H = 216
const PREVIEW_W = 296

const PERFORMANCES = [
  // Duets (indices 0-5, white keys C through A)
  {
    id: 'ESv27FFFxkU',
    title: 'Yellow',
    artist: 'Coldplay (Katherine Ho version)',
    category: 'duet',
    context: 'Tufts CSA formal. Roan and Eric sang, I played piano.',
  },
  {
    id: 'XlFLukgERCU',
    title: 'Light',
    artist: 'Wave to Earth',
    category: 'duet',
    context: 'Tufts Vietnamese Student Culture Club coffee shop night. Gawon sang.',
  },
  {
    id: 'Hbk1MypXwY0',
    title: 'Gurenge',
    artist: 'LiSA (piano and viola)',
    category: 'duet',
    context: 'Demon Slayer opening with Justin on viola.',
  },
  {
    id: 'MKek29hEIrY',
    title: "Gotta Catch 'Em All",
    artist: 'Pokemon Theme',
    category: 'duet',
    context: 'Short with Kate on the Pokemon theme.',
  },
  {
    id: 'cq2GTBF19hE',
    title: "Driver's License",
    artist: 'Olivia Rodrigo (piano duet)',
    category: 'duet',
    context: 'Four hands with my sister Emai.',
  },
  {
    id: '5ukPpMSdI8k',
    title: 'Comethru',
    artist: 'Jeremy Zucker (piano duet)',
    category: 'duet',
    context: 'With Rebecca. We rehearsed during COVID with masks on.',
  },
  // Favorites (indices 6-9, white keys B through E)
  {
    id: 'V_uyAVF7G6g',
    title: 'Merry-Go-Round of Life',
    artist: 'Joe Hisaishi',
    category: 'favorite',
    context: "Kyle Landry's arrangement of Howl's Moving Castle.",
  },
  {
    id: '5v-TmCWWivM',
    title: 'Snow Halation',
    artist: 'Love Live!',
    category: 'favorite',
    context: 'Love Live song. I like how it sounds on piano in winter.',
  },
  {
    id: '_4woMFijPyw',
    title: 'Hacking to the Gate',
    artist: 'Kanako Ito',
    category: 'favorite',
    context: 'Steins;Gate opening. Glitchy jumps in the video are from editing, not live.',
  },
  {
    id: 'xmAIylGoWS0',
    title: 'Loser',
    artist: 'Kenshi Yonezu',
    category: 'favorite',
    context: 'Jazzy piano version of a Kenshi Yonezu song.',
  },
  // Classical (indices 10-13, white keys F through B)
  {
    id: 'YqCZQ_jTLuU',
    title: 'Revolutionary Etude',
    artist: 'Chopin, Op. 10 No. 12',
    category: 'classical',
    context: 'Worked on this in spring 2020.',
  },
  {
    id: 'awgRrKACTio',
    title: 'Rhapsody in G minor',
    artist: 'Brahms, Op. 79 No. 2',
    category: 'classical',
    context: 'Picked it for the fast staccato sections and the way phrases repeat.',
  },
  {
    id: 'Sml-MhcTXWI',
    title: 'Moonlight Sonata',
    artist: 'Beethoven, third movement',
    category: 'classical',
    context: 'Small competition in 2017. First time playing in front of judges.',
  },
  {
    id: 'ZmtXTxyWI3Y',
    title: 'Prelude in C-sharp minor',
    artist: 'Rachmaninoff, Op. 3 No. 2',
    category: 'classical',
    context: 'Slow piece with a lot of low notes.',
  },
]

// White key note names for two octaves
const WHITE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B']

// Black keys: afterIndex = the left white key's index; perfIndex = which performance to show
// Each black key shows the same performance as the white key to its left
const BLACK_KEY_DEFS = [
  { label: 'C#', afterIndex: 0,  perfIndex: 0  },
  { label: 'D#', afterIndex: 1,  perfIndex: 1  },
  { label: 'F#', afterIndex: 3,  perfIndex: 3  },
  { label: 'G#', afterIndex: 4,  perfIndex: 4  },
  { label: 'A#', afterIndex: 5,  perfIndex: 5  },
  { label: 'C#', afterIndex: 7,  perfIndex: 7  },
  { label: 'D#', afterIndex: 8,  perfIndex: 8  },
  { label: 'F#', afterIndex: 10, perfIndex: 10 },
  { label: 'G#', afterIndex: 11, perfIndex: 11 },
  { label: 'A#', afterIndex: 12, perfIndex: 12 },
]

const CATEGORY_LABELS = { duet: 'Duet', favorite: 'Favorite', classical: 'Classical' }

function blackLeft(afterIndex) {
  return (afterIndex + 1) * WHITE_W - BLACK_W / 2
}

export default function PianoV2() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 })

  // Apply the extra-dark bg override only when site is in dark mode
  useEffect(() => {
    const apply = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      document.documentElement.classList.toggle('pv2-dark', isDark)
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('pv2-dark')
    }
  }, [])

  const navigate = (dir) => {
    setSelected((prev) => {
      if (!prev) return prev
      const idx = PERFORMANCES.findIndex((p) => p.id === prev.id)
      const next = (idx + dir + PERFORMANCES.length) % PERFORMANCES.length
      return PERFORMANCES[next]
    })
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape')     setSelected(null)
      else if (e.key === 'ArrowRight') navigate(1)
      else if (e.key === 'ArrowLeft')  navigate(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const el = document.documentElement
    const body = document.body
    if (selected) {
      el.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
    } else {
      el.style.overflow = ''
      body.style.overflow = ''
    }
    return () => {
      el.style.overflow = ''
      body.style.overflow = ''
    }
  }, [selected])

  const handleKeyEnter = (perf, e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const clamped = Math.min(
      Math.max(cx, PREVIEW_W / 2 + 16),
      window.innerWidth - PREVIEW_W / 2 - 16
    )
    setHovered(perf)
    setPreviewPos({ x: clamped, y: rect.top })
  }

  const handleKeyLeave = () => setHovered(null)

  const handleKeyClick = (perf) => {
    setHovered(null)
    setSelected(perf)
  }

  // mqdefault.jpg (320x180, 16:9) is guaranteed to exist for every public YouTube video.
  // maxresdefault / hqdefault are not always generated (older or lower-res uploads return
  // a blank placeholder instead of a 404, so onError never fires for them).
  const thumbSrc = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`

  return (
    <div className="pv2-page">
      <header className="pv2-header">
        <p className="pv2-eyebrow">hobby</p>
        <h1 className="pv2-title">Piano</h1>
        <Link to="/hobbies/piano/more" className="pv2-more-link">
          About my piano background <i className="fas fa-arrow-right" />
        </Link>
      </header>

      <div className="pv2-stage" role="region" aria-label="Piano keyboard">
        <div className="pv2-piano-wrap">
          <div className="pv2-piano-frame">
            <div
              className="pv2-keyboard"
              style={{ width: `${WHITE_W * 14}px`, height: `${WHITE_H}px` }}
            >
              {/* White keys */}
              {PERFORMANCES.map((perf, i) => (
                <button
                  key={perf.id}
                  className={`pv2-key pv2-white pv2-cat-${perf.category}${hovered?.id === perf.id ? ' pv2-key-hovered' : ''}`}
                  style={{ width: `${WHITE_W}px`, height: `${WHITE_H}px` }}
                  onMouseEnter={(e) => handleKeyEnter(perf, e)}
                  onMouseLeave={handleKeyLeave}
                  onClick={() => handleKeyClick(perf)}
                  aria-label={`Play ${perf.title} by ${perf.artist}`}
                >
                  <span className="pv2-key-label" aria-hidden="true">
                    {WHITE_NOTES[i]}
                  </span>
                </button>
              ))}

              {/* Black keys */}
              {BLACK_KEY_DEFS.map(({ label, afterIndex, perfIndex }, i) => {
                const perf = PERFORMANCES[perfIndex]
                return (
                  <button
                    key={`${label}-${i}`}
                    className={`pv2-key pv2-black pv2-cat-${perf.category}${hovered?.id === perf.id ? ' pv2-key-hovered' : ''}`}
                    style={{
                      left: `${blackLeft(afterIndex)}px`,
                      width: `${BLACK_W}px`,
                      height: `${BLACK_H}px`,
                    }}
                    onMouseEnter={(e) => handleKeyEnter(perf, e)}
                    onMouseLeave={handleKeyLeave}
                    onClick={() => handleKeyClick(perf)}
                    aria-label={`Play ${perf.title} by ${perf.artist}`}
                  />
                )
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Floating preview card */}
      {hovered && (
        <div
          className={`pv2-preview pv2-preview-${hovered.category}`}
          style={{ left: `${previewPos.x}px`, top: `${previewPos.y}px` }}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="pv2-preview-thumb-wrap">
            <img
              src={thumbSrc(hovered.id)}
              alt={`${hovered.title} thumbnail`}
              className="pv2-preview-thumb"
              loading="lazy"
            />
            <div className="pv2-preview-play-ring" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="pv2-preview-body">
            <span className={`pv2-cat-pill pv2-cat-${hovered.category}`}>
              {CATEGORY_LABELS[hovered.category]}
            </span>
            <h3 className="pv2-preview-title">{hovered.title}</h3>
            <p className="pv2-preview-artist">{hovered.artist}</p>
            <p className="pv2-preview-cta" aria-hidden="true">
              <span className="pv2-cta-dot" />
              click to open
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen modal */}
      {selected && (
        <div
          className="pv2-modal-backdrop"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null) }}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${selected.title}`}
        >
          <div className="pv2-modal">
            <button
              className="pv2-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="pv2-modal-video-wrap">
              <iframe
                key={selected.id}
                src={`https://www.youtube.com/embed/${selected.id}?autoplay=1&rel=0&modestbranding=1`}
                title={selected.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                className="pv2-nav-btn pv2-nav-prev"
                onClick={() => navigate(-1)}
                aria-label="Previous video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="pv2-nav-btn pv2-nav-next"
                onClick={() => navigate(1)}
                aria-label="Next video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className={`pv2-modal-footer pv2-modal-footer-${selected.category}`}>
              <div className="pv2-modal-footer-left">
                <span className={`pv2-cat-pill pv2-cat-${selected.category}`}>
                  {CATEGORY_LABELS[selected.category]}
                </span>
                <h2 className="pv2-modal-title">{selected.title}</h2>
                <p className="pv2-modal-artist">{selected.artist}</p>
              </div>
              <div className="pv2-modal-footer-right">
                <p className="pv2-modal-context">{selected.context}</p>
                <p className="pv2-modal-nav-hint" aria-hidden="true">
                  <kbd>←</kbd><kbd>→</kbd> to navigate
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
