function ChessLytics() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/chesslytics/chesslytics-project.jpg"
              alt="ChessLytics overview"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>ChessLytics</h1>
            <p className="project-description">
              End-to-end chess analytics platform processing 100,000+ games with personalized insights,
              interactive visualizations, and cloud-based data pipelines using modern data engineering practices.
            </p>
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
              <a
                href="https://www.chesslytics.xyz"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
              <a
                href="https://github.com/edwardl903/chesslyzer"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" /> View Code
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>Overview</h2>
            <p>
              ChessLytics is a personal project: a data pipeline that pulls my chess games from the Chess.com API,
              processes them with Python, stores them in BigQuery, and surfaces trends in Looker Studio. I built it to
              see where I was improving and where I kept repeating the same mistakes.
            </p>
            <p>
              The system grew to support multiple users, Lichess bulk data, and a hybrid setup using Azure Databricks
              for large-scale processing and GCP for analytics and dashboards.
            </p>
          </div>

          <div className="project-section">
            <h2>What I Built</h2>
            <ul>
              <li>Automated ingestion from the Chess.com REST API (Python, rate limiting, error handling)</li>
              <li>PGN parsing into tables for players, games, openings, and time controls</li>
              <li>SQL analytics for opening performance, time pressure, and rating trends</li>
              <li>Flask app and Looker Studio dashboards for per-user and global views</li>
            </ul>
          </div>

          <div className="project-section story-section">
            <h2>Initial System Architecture</h2>
            <p>
              Here&apos;s how I designed the initial ChessLytics architecture using Google Cloud Platform to solve these
              chess analytics challenges:
            </p>
            <div className="diagram-image-container">
              <img
                src="/static/images/projects/chesslytics/chesslytics-initial-diagram.png"
                alt="ChessLytics initial GCP architecture"
                className="architecture-image"
                loading="lazy"
              />
              <div className="diagram-caption">
                <p>
                  <strong>Initial GCP Architecture:</strong> Complete data pipeline from Chess.com API and user uploads
                  through in-memory processing to BigQuery analytics and interactive dashboards.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>Multi-Cloud Hybrid Architecture</h2>
            <div className="diagram-image-container">
              <img
                src="/static/images/projects/chesslytics/chesslytics-diagram.png"
                alt="ChessLytics multi-cloud data engineering architecture"
                className="architecture-image"
                loading="lazy"
              />
              <div className="diagram-caption">
                <p>
                  <strong>Data Engineering Pipeline:</strong> Multi-cloud hybrid architecture combining Azure Databricks
                  for distributed processing and Google Cloud Platform for analytics and visualization.
                </p>
              </div>
            </div>

            <div className="architecture-details">
              <div className="detail-section">
                <h3>
                  <i className="fas fa-cogs" /> Data Processing Pipeline
                </h3>
                <div className="pipeline-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <strong>Data Ingestion:</strong> Lichess monthly game dumps (30GB+ compressed)
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <strong>Distributed Processing:</strong> PySpark with ZST decompression &amp; PGN parsing
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <strong>Data Lake:</strong> Delta Lake with partitioning by YearMonth
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <strong>Analytics:</strong> Cross-cloud integration for comprehensive insights
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>
                  <i className="fas fa-chart-bar" /> Key Benefits
                </h3>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <i className="fas fa-rocket" />
                    <span>Scalability</span>
                    <p>Handle millions of games with distributed processing.</p>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-shield-alt" />
                    <span>Reliability</span>
                    <p>ACID transactions and data versioning with Delta Lake.</p>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-dollar-sign" />
                    <span>Cost Optimization</span>
                    <p>Use best-in-class services from each cloud provider.</p>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-sync-alt" />
                    <span>Flexibility</span>
                    <p>Hybrid approach allows for future expansion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="project-section">
            <p>
              This project gave me hands-on experience with end-to-end data pipelines, cloud architecture, and
              turning raw game history into clear, actionable insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChessLytics
