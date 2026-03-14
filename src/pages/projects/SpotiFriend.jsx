function SpotiFriend() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/spotifriend/spotifriend-project.jpg"
              alt="SpotiFriend"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>SpotiFriend</h1>
            <p className="project-description">
              Automated data pipeline extracting Spotify listening data with AWS cloud infrastructure, real-time
              analytics, and personalized music insights using modern data engineering practices.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Spotify API</span>
              <span className="tech-tag">AWS S3</span>
              <span className="tech-tag">AWS Lambda</span>
              <span className="tech-tag">AWS Glue</span>
              <span className="tech-tag">Amazon Athena</span>
              <span className="tech-tag">Amazon QuickSight</span>
              <span className="tech-tag">EventBridge</span>
              <span className="tech-tag">Pandas</span>
              <span className="tech-tag">Boto3</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/edwardl903/spotify-etl"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" /> View Code
              </a>
              <a href="#" className="project-link" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>Overview</h2>
            <p>
              SpotiFriend is an automated pipeline that pulls my Spotify listening data via the API, processes it on AWS,
              and surfaces trends in QuickSight. I built it to see how my taste changes over time and to practice
              serverless ETL and cloud storage.
            </p>
          </div>

          <div className="project-section">
            <h2>What I Built</h2>
            <ul>
              <li>Python ETL using the Spotify Web API (PKCE) for top tracks, recently played, and playlists</li>
              <li>S3 for partitioned JSONL storage; Lambda and Glue for processing and catalog</li>
              <li>EventBridge for scheduled runs; Athena for SQL; QuickSight for dashboards</li>
            </ul>
          </div>

          <div className="project-section story-section">
            <h2>System Architecture</h2>

            <div className="architecture-diagram">
              <h3>
                <i className="fas fa-project-diagram" /> AWS Data Pipeline Architecture
              </h3>
              <div className="architecture-flow">
                <div className="flow-step">
                  <div className="step-icon">
                    <i className="fab fa-spotify" />
                  </div>
                  <div className="step-content">
                    <h4>Data Sources</h4>
                    <p>Spotify Web API</p>
                    <p>User Authentication (PKCE)</p>
                  </div>
                </div>

                <div className="flow-arrow">
                  <i className="fas fa-arrow-right" />
                </div>

                <div className="flow-step">
                  <div className="step-icon">
                    <i className="fab fa-python" />
                  </div>
                  <div className="step-content">
                    <h4>Data Extraction</h4>
                    <p>Python ETL Script</p>
                    <p>Spotipy Library</p>
                  </div>
                </div>

                <div className="flow-arrow">
                  <i className="fas fa-arrow-right" />
                </div>

                <div className="flow-step">
                  <div className="step-icon">
                    <i className="fab fa-aws" />
                  </div>
                  <div className="step-content">
                    <h4>Cloud Processing</h4>
                    <p>AWS Lambda (Serverless)</p>
                    <p>Data Transformation</p>
                  </div>
                </div>

                <div className="flow-arrow">
                  <i className="fas fa-arrow-right" />
                </div>

                <div className="flow-step">
                  <div className="step-icon">
                    <i className="fas fa-database" />
                  </div>
                  <div className="step-content">
                    <h4>Data Storage</h4>
                    <p>AWS S3 Data Lake</p>
                    <p>Partitioned JSONL Format</p>
                  </div>
                </div>

                <div className="flow-arrow">
                  <i className="fas fa-arrow-right" />
                </div>

                <div className="flow-step">
                  <div className="step-icon">
                    <i className="fas fa-search" />
                  </div>
                  <div className="step-content">
                    <h4>Data Catalog</h4>
                    <p>AWS Glue</p>
                    <p>Schema Management</p>
                  </div>
                </div>

                <div className="flow-arrow">
                  <i className="fas fa-arrow-right" />
                </div>

                <div className="flow-step">
                  <div className="step-icon">
                    <i className="fas fa-chart-bar" />
                  </div>
                  <div className="step-content">
                    <h4>Analytics</h4>
                    <p>Amazon Athena (SQL)</p>
                    <p>Amazon QuickSight</p>
                  </div>
                </div>
              </div>

              <div className="architecture-details">
                <div className="detail-item">
                  <h4>
                    <i className="fas fa-clock" /> Automation
                  </h4>
                  <p>EventBridge scheduler triggers daily data collection runs.</p>
                </div>
                <div className="detail-item">
                  <h4>
                    <i className="fas fa-shield-alt" /> Security
                  </h4>
                  <p>PKCE authentication ensures secure API access.</p>
                </div>
                <div className="detail-item">
                  <h4>
                    <i className="fas fa-expand-arrows-alt" /> Scalability
                  </h4>
                  <p>Serverless architecture scales automatically with demand.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpotiFriend

