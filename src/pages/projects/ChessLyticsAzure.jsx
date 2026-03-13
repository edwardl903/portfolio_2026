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
              This project was an extension of my original ChessLytics platform, but scaled up to handle millions of
              chess games using Microsoft Azure&apos;s big data services. While the original ChessLytics processed
              around 100,000 games, this Azure version was designed to analyze trends across millions of games to
              uncover deeper insights about chess strategy and player behavior patterns.
            </p>
          </div>

          <div className="project-section">
            <p>
              I built this on Azure Databricks, which gave me the power to process massive datasets using Spark SQL. The
              data was stored in Azure Data Lake and Blob Storage, with Delta Lake providing the reliability and
              performance needed for this scale of analysis.
            </p>
            <p>
              The goal was to move beyond individual player analytics and start identifying broader trends in chess—
              things like how opening popularity changes over time, which strategies are becoming more or less
              effective, and what patterns emerge when you look at millions of games together.
            </p>
          </div>

          <div className="project-section">
            <p>
              I set up the data pipeline to ingest chess games from multiple sources, transform them using Delta Lake
              for ACID compliance, and then run complex analytical queries using Spark SQL. The Delta Lake mounts made
              it easy to access data across different storage layers while maintaining data integrity.
            </p>
            <p>
              The analytics focused on trend analysis—looking at how chess strategies evolve over time, identifying
              which openings are gaining or losing popularity, and understanding the relationship between player ratings
              and strategic choices across massive datasets.
            </p>
          </div>

          <div className="project-section">
            <h2>Architecture Overview</h2>
            <div className="architecture-layout">
              <div className="architecture-text">
                <p>
                  The data pipeline starts with a massive local chess file containing the entire Lichess database—over
                  6.8 billion games totaling 2.16TB of data. This represents years of chess games from millions of
                  players worldwide.
                </p>
                <p>
                  Azure Data Factory handles the initial data ingestion, copying this massive dataset into Azure Data
                  Lake Storage Gen2. From there, the data flows into Delta Lake tables, which provide ACID compliance
                  and efficient storage for the processed data.
                </p>
                <p>
                  Azure Databricks processes this data using Apache Spark clusters. I wrote Python scripts using PySpark
                  to transform and analyze the chess games, then used Spark SQL to run complex analytical queries across
                  the massive dataset.
                </p>
                <p>
                  The processed data is stored back in Delta Lake, which can then be queried using Databricks SQL
                  Warehouse. Finally, Power BI connects to create interactive dashboards and visualizations that reveal
                  trends and patterns across millions of chess games.
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

          <div className="project-section">
            <p>
              This project really showed me the power of cloud-based big data processing. Being able to analyze
              millions of chess games in a reasonable amount of time opened up possibilities that just weren&apos;t
              feasible with the original local setup. It also taught me a lot about data lake architecture and how to
              design systems that can scale to handle truly massive datasets.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChessLyticsAzure

