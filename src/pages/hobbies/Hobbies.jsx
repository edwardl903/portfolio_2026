import { Link } from 'react-router-dom'

// Layout (grid areas) lives in styles.css under .hob-mosaic. Each tile gets a
// per-hobby class (hob-piano, hob-chess, ...) so the grid can be re-arranged
// responsively without fighting inline styles.
const hobbies = [
  { id: 'piano',         label: 'Piano',         to: '/hobbies/piano',         img: '/static/images/hobbies/piano.jpg',         blurb: 'Playing by ear since I was a kid' },
  { id: 'chess',         label: 'Chess',         to: '/hobbies/chess',         img: '/static/images/hobbies/chess.jpg',         blurb: 'Blitz addict, over the board and online' },
  { id: 'running',       label: 'Running',       to: '/hobbies/running',       img: '/static/images/hobbies/running.jpg',       blurb: 'Charles River miles, tracked with data' },
  { id: 'skateboarding', label: 'Skateboarding', to: '/hobbies/skateboarding', img: '/static/images/hobbies/skateboarding.jpg', blurb: 'Still landing tricks after dark' },
  { id: 'volleyball',    label: 'Volleyball',    to: '/hobbies/volleyball',    img: '/static/images/hobbies/volleyball.jpg',    blurb: 'Libero, twice a week with my mom' },
]

function Hobbies() {
  return (
    <div className="hob-page">
      <div className="hob-intro">
        <p className="hob-eyebrow">Off the clock</p>
        <h1 className="hob-title">Hobbies</h1>
        <p className="hob-lede">
          Here are some of the things I like to do in my personal time.
        </p>
      </div>

      <div className="hob-mosaic">
        {hobbies.map(h => (
          <Link
            key={h.id}
            to={h.to}
            className={`hob-tile hob-${h.id}`}
            aria-label={`${h.label}. ${h.blurb}`}
          >
            <img src={h.img} alt={h.label} className="hob-tile-img" loading="lazy" />
            <div className="hob-tile-veil" />
            <div className="hob-tile-caption">
              <span className="hob-tile-label">{h.label}</span>
              <span className="hob-tile-blurb">{h.blurb}</span>
              <span className="hob-tile-cue">
                Explore <i className="fas fa-arrow-right" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hobbies
