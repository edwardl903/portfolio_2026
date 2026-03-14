function ETLTools() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/etl-tools/etl-tools-project.jpg"
              alt="ETL tools and user behavior analysis"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>Fidelity PB Optimize User Behavior Analysis</h1>
            <p className="project-description">
              Led comprehensive user behavior analysis for Fidelity&apos;s PB Optimize platform to identify high-value
              features and improve user experience.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Google Looker</span>
              <span className="tech-tag">Power BI</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Excel</span>
              <span className="tech-tag">Data Analysis</span>
              <span className="tech-tag">User Research</span>
              <span className="tech-tag">Figma</span>
              <span className="tech-tag">Dashboard Design</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                <i className="fas fa-chart-line" /> Analysis Report
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>Overview</h2>
            <p>
              At Fidelity I led user behavior analysis for the PB Optimize platform so the team could prioritize
              improvements based on real usage. <em>NDA limits how much I can share about findings.</em>
            </p>
          </div>

          <div className="project-section">
            <h2>What I Did</h2>
            <ul>
              <li>Analyzed usage analytics and drop-off points; partnered with Customer Success to align with client feedback</li>
              <li>Built dashboards in Looker and Power BI, plus custom views in Python and Excel</li>
              <li>Delivered interactive dashboards: engagement KPIs, feature-level usage, user journey drop-offs, segmentation by type and tenure</li>
              <li>Created flow diagrams in Figma for common user paths</li>
              <li>Combined tracking logs, engagement metrics, and performance data (e.g. page load) to analyze sessions, feature co-usage, and time patterns</li>
            </ul>
          </div>

          <div className="project-section">
            <h2>Outcome</h2>
            <p>
              The work gave product and stakeholders a clear view of which workflows added value and where users
              struggled, and helped Customer Success use data instead of anecdotes in client conversations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ETLTools

