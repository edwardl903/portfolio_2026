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
          <div className="hobby-description">
            <h2>My Skateboarding Journey</h2>
            
            <p>During the COVID era, I went snowboarding at a small mountain with some friends. We all thought snowboarding was incredibly fun, but the problem was that it wasn't very accessible - we couldn't do it every day. So we pondered and thought, "What if we learned how to skateboard?" That summer before entering college, we all bought skateboards and practiced relentlessly.</p>
            
            <p>At first, we were atrocious, but we were all racing to land an ollie as fast as possible. Then we learned pop shuvits, but unfortunately during my progress, I took a hard fall and broke my elbow, forcing me to take a three-month break. When I got back on the board, I continued working on my kickflips, but eventually decided to convert to longboarding.</p>
            
            <p>These days, I longboard frequently in various places and find it to be an excellent form of exercise. A longboard is essentially a safer version of a skateboard - it's bigger with larger wheels, making it easier to make curved turns and navigate over bumps and cracks in the road.</p>
            
            <p>Skateboarding has taught me perseverance, creativity, and the importance of pushing my limits. The journey from being completely uncoordinated to landing tricks has been incredibly rewarding and has shaped my approach to learning new skills in all areas of life.</p>
            
            {/* Skateboarding Highlight Video */}
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
                    <p>A video showing my progress learning the kickflip trick. It's one of the basic flip tricks in skateboarding that I've been working on.</p>
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
      </div>
    </section>
  )
}

export default Skateboarding
