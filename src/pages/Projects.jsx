import { Link } from 'react-router-dom'

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects-header">
          <h1 className="projects-title">I have worked on a number of fun data projects (data engineering and data analytics).</h1>
          <p className="projects-subtitle">Feel free to ask me any questions!</p>
        </div>
        
        <div className="projects-grid">
          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/chesslytics">
                <img src="/static/images/chesslytics-project.jpg" alt="ChessLytics" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>ChessLytics</h3>
                    <p>End-to-end chess analytics platform processing 100,000+ games with personalized Year in Review reports and real-time insights.</p>
                    <div className="project-links">
                      <a href="https://www.chesslytics.xyz" className="project-link" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt"></i> Live</a>
                      <a href="https://github.com/edwardl903/chesslyzer" className="project-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> Code</a>
                    </div>
                    <Link to="/projects/chesslytics" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/chesslytics-azure">
                <img src="/static/images/chesslytics-azure.jpg" alt="ChessLytics Azure Analytics" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>ChessLytics Azure Analytics</h3>
                    <p>Scalable Azure-based chess analytics extension processing millions of games using Databricks, Delta Lake, and Spark SQL for trend analysis.</p>
                    <div className="project-links">
                      <a href="#" className="project-link"><i className="fab fa-github"></i> Code</a>
                    </div>
                    <Link to="/projects/chesslytics-azure" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/spotifriend">
                <img src="/static/images/spotifriend-project.jpg" alt="SpotiFriend" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>SpotiFriend</h3>
                    <p>Scalable cloud-based data pipeline analyzing Spotify listening behavior across 10,000+ tracks with real-time SQL queries.</p>
                    <div className="project-links">
                      <a href="https://github.com/edwardl903/spotify-etl" className="project-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> Code</a>
                    </div>
                    <Link to="/projects/spotifriend" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/nlp-pipeline">
                <img src="/static/images/nlp-pipeline-project.jpg" alt="NLP Pipeline" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>Reading Level Classifier</h3>
                    <p>Developed a NLP pipeline for automatic reading-level classification of educational content.</p>
                    <div className="project-links">
                      <a href="#" className="project-link"><i className="fab fa-github"></i> Code</a>
                    </div>
                    <Link to="/projects/nlp-pipeline" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/movie-recommendations">
                <img src="/static/images/movie-recommendations-project.jpg" alt="Movie Recommendations" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>MovieLens Recommender</h3>
                    <p>Built a scalable recommendation system using collaborative filtering algorithms processing millions of user ratings for personalized movie suggestions.</p>
                    <div className="project-links">
                      <a href="https://github.com/edwardl903/MovieLensRecommender" className="project-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> Code</a>
                    </div>
                    <Link to="/projects/movie-recommendations" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/etl-tools">
                <img src="/static/images/pison-technology.jpg" alt="Pison Technology ETL Tools" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>Pison Technology ETL Tools</h3>
                    <p>Built ETL tools and automation scripts for Boston startup Pison Technology, improving data integration efficiency and reducing manual workload.</p>
                    <div className="project-links">
                      <a href="#" className="project-link"><i className="fab fa-github"></i> Code</a>
                    </div>
                    <Link to="/projects/etl-tools" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/etl-tools">
                <img src="/static/images/etl-tools-project.jpg" alt="Fidelity PB Optimize User Behavior Analysis" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>Fidelity PB Optimize User Behavior Analysis</h3>
                    <p>Led comprehensive user behavior analysis for Fidelity's PB Optimize platform to identify high-value features and improve user experience.</p>
                    <div className="project-links">
                      <a href="#" className="project-link"><i className="fas fa-chart-line"></i> Analysis Report</a>
                    </div>
                    <Link to="/projects/etl-tools" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="project-card-overlay">
            <div className="project-image-cover">
              <Link to="/projects/eeg-research">
                <img src="/static/images/research-lab-project.jpg" alt="EEG Research Lab" />
                <div className="project-overlay">
                  <div className="overlay-content">
                    <h3>EEG Research Lab</h3>
                    <p>Contributed to published EEG research on human cognition, analyzing neural activity from 20+ participants for strategic thinking studies.</p>
                    <div className="project-links">
                      <a href="#" className="project-link"><i className="fas fa-external-link-alt"></i> Research</a>
                    </div>
                    <Link to="/projects/eeg-research" className="view-project-btn">View Project →</Link>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

