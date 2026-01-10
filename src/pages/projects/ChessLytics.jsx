function ChessLytics() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img src="/static/images/projects/chesslytics/chesslytics-project.jpg" alt="ChessLytics" />
          </div>
          <div className="project-info">
            <h1>ChessLytics</h1>
            <p className="project-description">End-to-end chess analytics platform processing 100,000+ games with personalized insights, interactive visualizations, and cloud-based data pipelines using modern data engineering practices.</p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Flask</span>
              <span className="tech-tag">BigQuery</span>
              <span className="tech-tag">Looker Studio</span>
              <span className="tech-tag">Pandas</span>
              <span className="tech-tag">Matplotlib</span>
              <span className="tech-tag">Seaborn</span>
              <span className="tech-tag">Chess.com API</span>
              <span className="tech-tag">Heroku</span>
              <span className="tech-tag">GCP</span>
            </div>
            <div className="project-links">
              <a href="https://www.chesslytics.xyz" className="project-link" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
              <a href="https://github.com/edwardl903/chesslyzer" className="project-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> View Code
              </a>
            </div>
          </div>
        </div>
        <div className="project-content">
          <div className="project-section story-section">
            <h2>Introduction: Curiosity, Strategy, and a Chessboard</h2>
            <p>Before I ever wrote a single SQL query or processed a dataset, I was just a chess player trying to understand why I kept losing the same types of games.</p>
            <p>It started like this: I'd play five games online. Win two, lose three. I'd feel like I was doing okay—until I checked my history and noticed I had lost to the exact same opening… again. That pattern repeated itself over weeks, and I began wondering whether there was something deeper going on. Was I making predictable mistakes? Was my intuition failing me under time pressure?</p>
            <p>This question—<strong>what am I missing?</strong>—sparked the creation of ChessLytics, a data analytics platform that helps players make sense of their chess performance by combining large-scale game processing with behavioral insights. What started as a small personal project eventually became a full data pipeline analyzing thousands of games, complete with automated dashboards, user-specific reports, and scalable cloud architecture.</p>
            <p><em>Full project content will be migrated from projects/chesslytics.html. This is a placeholder structure.</em></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChessLytics

