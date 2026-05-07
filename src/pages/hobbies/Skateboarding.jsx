function Skateboarding() {
  return (
    <section className="hobby-detail">
      <div className="container">
        <div className="hobby-header">
          <div className="hobby-icon">
            <i className="fas fa-skating"></i>
          </div>
        </div>

        <div className="hobby-content">
          {/* Intro text — constrained to reading width */}
          <div className="hobby-description">
            <h2>Skateboarding</h2>

            <p>We went snowboarding during COVID and loved it, but couldn't exactly do it every day. Someone suggested skateboarding as a summer alternative. We all bought boards and started practicing.</p>

            <p>We were terrible at first, just racing each other to land an ollie. Eventually got to pop shuvits, then I took a nasty fall and broke my elbow. Three months off the board. When I came back I kept working on kickflips, but at some point switched over to longboarding.</p>

            <p>I longboard pretty regularly now. It's easier to commute and cruise around on, and way less sketchy on cracked sidewalks. Still have the skateboard though.</p>
          </div>

          {/* Skateboarding Highlight Video — full container width */}
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
        </div>
      </div>
    </section>
  )
}

export default Skateboarding
