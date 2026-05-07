import { useState } from 'react'
import Lightbox from '../../components/Lightbox'

function Chess() {
  const [lightbox, setLightbox] = useState(null)
  const open = (src, alt, caption = '') => setLightbox({ src, alt, caption })
  const close = () => setLightbox(null)

  return (
    <section className="hobby-detail">
      <div className="container">
        <div className="hobby-header">
          <div className="hobby-icon">
            <i className="fas fa-chess"></i>
          </div>
        </div>

        <div className="hobby-content">
          {/* Intro text — constrained to reading width */}
          <div className="hobby-description">
            <h2>Chess</h2>
            <p>My brother taught me chess when I was 8, but I didn't really get into it until COVID. I had a lot of free time and started taking it seriously. Pretty quickly I was watching lectures, doing puzzles, and playing way too many blitz games.</p>

            <p>Currently sitting at <strong>2200 rapid</strong>, <strong>2000 blitz</strong>, and <strong>2000 bullet</strong> on chess.com. My profile is <a href="https://www.chess.com/member/EdwardL903" target="_blank" rel="noopener noreferrer" className="chess-link">here</a> if you want to see my games.</p>

            <p>I've also taught chess at my community center, high school, and a few summer camps around Massachusetts. I founded the <strong>Tufts Chess Club</strong> and ran it as president from 2021 to 2025, and captained the collegiate team competing against other schools.</p>

            <p>The chess obsession eventually turned into a data project. I built <strong>ChessLytics</strong> to analyze my own games and find patterns in where I kept losing.</p>

            <a href="https://www.chesslytics.xyz" className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{margin: '1rem 0', display: 'inline-block'}}>
              <i className="fas fa-external-link-alt"></i> Visit ChessLytics
            </a>
          </div>

          {/* Giant Chess Board — full container width */}
          <div className="chess-giant-board">
            <h3>The Giant Chess Board at Tufts</h3>
            <div className="chess-giant-layout">
              <div className="chess-giant-info">
                <p>As club president, I needed a way to actually get people to show up. I pitched the idea of a giant outdoor chess set to the Head of the Tufts University Social Collective, worked out a funding agreement, and we used it to source real chess boards and install a large set in the campus common area. I made a big signup sign to go with it.</p>
                <p>Tour guides still stop there today and people play on it daily. It turned out to be the best recruitment tool we had.</p>
              </div>
              <div className="chess-shorts-card">
                <div className="video-thumbnail portrait">
                  <iframe
                    src="https://www.youtube.com/embed/WxeUu43JMa0"
                    title="Tufts Chess Club Giant Chess Board"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Chess Club Photos — full container width */}
          <div className="chess-club-section">
            <h3>Tufts Chess Club</h3>
            <p>Some photos from four years of running the club. Click any photo to enlarge.</p>

            <div className="chess-photos-grid">
              <div className="chess-photo-card">
                <div className="chess-photo-img-wrap lb-trigger" onClick={() => open('/static/images/hobbies/chess/bc.jpg', 'Boston College Chess Tournament', 'Boston College Tournament')}>
                  <img src="/static/images/hobbies/chess/bc.jpg" alt="Boston College Chess Tournament" loading="lazy" />
                </div>
                <div className="photo-content">
                  <h4>Boston College Tournament</h4>
                  <p>Intercollegiate tournament against 10 other Massachusetts schools. We got 2nd place.</p>
                </div>
              </div>

              <div className="chess-photo-card">
                <div className="chess-photo-img-wrap lb-trigger" onClick={() => open('/static/images/hobbies/chess/eboard.png', '2025 E-Board Members', '2025 E-Board')}>
                  <img src="/static/images/hobbies/chess/eboard.png" alt="2025 E-Board Members" loading="lazy" />
                </div>
                <div className="photo-content">
                  <h4>2025 E-Board</h4>
                  <p>The 2025 e-board. We did Boda Borg, baking contests, poker nights, squash, and way too many dance parties.</p>
                </div>
              </div>

              <div className="chess-photo-card">
                <div className="chess-photo-img-wrap lb-trigger" onClick={() => open('/static/images/hobbies/chess/founders.png', 'Chess Club Founders', 'Chess Club Founders')}>
                  <img src="/static/images/hobbies/chess/founders.png" alt="Chess Club Founders" loading="lazy" />
                </div>
                <div className="photo-content">
                  <h4>Chess Club Founders</h4>
                  <p>Me, Alex (secretary), and Sam (treasurer). We started the whole thing from scratch.</p>
                </div>
              </div>

              <div className="chess-photo-card meeting-photo">
                <div className="chess-photo-img-wrap lb-trigger" onClick={() => open('/static/images/hobbies/chess/meeting1.jpg', 'Chess Club Weekly Meeting', 'Weekly Meetings')}>
                  <img src="/static/images/hobbies/chess/meeting1.jpg" alt="Chess Club Weekly Meeting" loading="lazy" />
                </div>
                <div className="photo-content">
                  <h4>Weekly Meetings</h4>
                  <p>Weekly meetings: food, chess, and a lot of talking trash between games.</p>
                </div>
              </div>

              <div className="chess-photo-card meeting-photo">
                <div className="chess-photo-img-wrap lb-trigger" onClick={() => open('/static/images/hobbies/chess/meeting2.jpg', 'Chess Club Weekly Meeting', 'Chess Club Community')}>
                  <img src="/static/images/hobbies/chess/meeting2.jpg" alt="Chess Club Weekly Meeting" loading="lazy" />
                </div>
                <div className="photo-content">
                  <h4>Chess Club Community</h4>
                  <p>More from weekly meetings. We genuinely had a lot of fun with this club.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={close}
        />
      )}
    </section>
  )
}

export default Chess
