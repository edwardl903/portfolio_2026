import { useRef, useState } from 'react'

const VIDEO_SRC = '/static/videos/intro.mp4'
const POSTER_SRC = '/static/images/home/intro-poster.jpg'

function IntroVideo() {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setPlaying(true)
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => setPlaying(false))
    })
  }

  return (
    <section className="intro-video-section">
      <div className={`intro-video-frame${playing ? ' is-playing' : ''}`}>
        <video
          ref={videoRef}
          className="intro-video-el"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          controls={playing}
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            type="button"
            className="intro-video-play"
            onClick={handlePlay}
            aria-label="Play introduction video"
          >
            <span className="intro-video-play-ring" aria-hidden="true" />
            <i className="fas fa-play" aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  )
}

export default IntroVideo
