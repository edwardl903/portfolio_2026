function ChessLyticsAzure() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/chesslytics/chesslytics-azure.jpg"
              alt="ChessLytics Azure Analytics"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>ChessLytics Azure Analytics</h1>
            <p className="project-description">
              Scalable Azure-based chess analytics extension processing millions of games using Databricks, Delta Lake,
              and Spark SQL for trend analysis.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Big Data Analytics</span>
              <span className="tech-tag">Data Engineering</span>
              <span className="tech-tag">Microsoft Azure</span>
              <span className="tech-tag">Azure Databricks</span>
              <span className="tech-tag">Azure Data Factory (ADF)</span>
              <span className="tech-tag">Azure Data Lake (ADLS Gen2)</span>
              <span className="tech-tag">Apache Spark</span>
              <span className="tech-tag">Delta Lake</span>
              <span className="tech-tag">Lakehouse</span>
              <span className="tech-tag">Spark SQL</span>
              <span className="tech-tag">Python (PySpark)</span>
              <span className="tech-tag">Power BI</span>
              <span className="tech-tag">Databricks SQL</span>
              <span className="tech-tag">Data Visualization</span>
              <span className="tech-tag">ETL</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                <i className="fab fa-github" /> Code
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>Overview</h2>
            <p>
              This extends ChessLytics to millions of games using Azure. I used Azure Databricks, Delta Lake, and Spark SQL
              to process large Lichess archives and analyze trends in openings, time controls, and player behavior at scale.
            </p>
          </div>

          <div className="project-section">
            <h2>What I Built</h2>
            <ul>
              <li>Ingestion of Lichess game data into Azure Data Lake Storage (via Data Factory)</li>
              <li>PySpark pipelines for transformation and Delta Lake tables for storage</li>
              <li>Spark SQL for trend analysis across millions of games</li>
              <li>Power BI dashboards for visualization</li>
            </ul>
          </div>

          <div className="project-section">
            <h2>Architecture</h2>
            <div className="architecture-layout">
              <div className="architecture-text">
                <p>
                  Data flows from raw Lichess files into ADLS Gen2, then into Delta Lake tables. Databricks runs
                  PySpark jobs for parsing and analytics; Databricks SQL and Power BI are used for querying and dashboards.
                </p>
              </div>
              <div className="pipeline-image">
                <img
                  src="/static/images/projects/chesslytics/chesslytics-azure-pipeline.png"
                  alt="ChessLytics Azure pipeline architecture"
                  loading="lazy"
                  style={{
                    maxWidth: '300px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChessLyticsAzure

