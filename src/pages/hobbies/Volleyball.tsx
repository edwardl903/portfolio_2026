function Volleyball() {
  return (
    <section className="hobby-detail">
      <div className="container">
        <div className="hobby-header">
          <div className="hobby-icon">
            <i className="fas fa-volleyball-ball"></i>
          </div>
        </div>

        <div className="hobby-content">
          {/* Intro text — constrained to reading width */}
          <div className="hobby-description">
            <h2>Volleyball</h2>
            <p>My mom taught me when I was 12 and I've been hooked since. We used to play in the backyard with her friends, and I got good enough to try out for the school team.</p>

            <p>I played JV freshman year, moved up to varsity sophomore year, did club ball across New England, and ended up as team captain my senior year. In college I played DS/Libero for the Tufts Men's Volleyball Club Team.</p>

            <p>These days my mom and I still play twice a week. It's a good excuse to stay active and actually hang out. I'll play with anyone who's up for it, and I'm happy to teach if you've never played before.</p>
          </div>

          {/* Volleyball Highlight Video — full container width */}
          <div className="volleyball-highlight">
            <h3>Volleyball Highlight</h3>
            <div className="video-container">
              <div className="video-card">
                <div className="video-thumbnail">
                  <iframe
                    src="https://www.youtube.com/embed/8A-YRYzuicc"
                    title="Edward Lai Volleyball Pancake - Tufts Men's Volleyball"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>
                </div>
                <div className="video-info">
                  <h4>Pancake Save - Tufts Men's Volleyball Club Team</h4>
                  <p>Me doing a pancake save, where you dive and slide your flat hand under the ball just before it hits the ground. Looks more dramatic than it feels.</p>
                  <div className="video-meta">
                    <span className="difficulty">Defensive Specialist</span>
                    <span className="duration">Casual Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Volleyball
