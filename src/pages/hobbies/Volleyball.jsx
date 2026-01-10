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
          <div className="hobby-description">
            <h2>My Volleyball Journey</h2>
            <p>My volleyball journey began when I was 12 years old, when my mom taught me how to play. I would actively play with her and her friends, developing a love for the sport that would grow into a lifelong passion.</p>
            
            <p>In high school, I joined the freshman team as JV and quickly progressed to varsity the following year. During this time, I also played club volleyball, competing all over the New England area. My dedication and leadership skills were recognized when I became captain of my varsity team in my senior year.</p>
            
            <p>I continued my love for volleyball into college, where I played on the Tufts Men's Volleyball Club Team as a DS/Libero. These days, I play volleyball recreationally with my mom twice a week, keeping the sport as a fun way to stay active and spend quality time together. I love playing both recreationally and competitively, and I'm always willing to teach another person how to play.</p>
            
            {/* Volleyball Highlight Video */}
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
                    <p>A clip from casual volleyball with the Tufts Men's Volleyball Club Team. In this video, you can see me doing a "pancake" - when I dive to the ground and put my hand flat (like a pancake) under the ball right before it hits the floor. It's like making a "table" with your hand to bounce the ball back up so my teammates can keep playing.</p>
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
      </div>
    </section>
  )
}

export default Volleyball
