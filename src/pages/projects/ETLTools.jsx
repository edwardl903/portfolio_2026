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
              At Fidelity Investments, I led a comprehensive user behavior analysis for the PB Optimize platform—a
              tool for institutional investors. The platform already offered powerful features, but the team needed a
              clear picture of how clients were actually using it in order to prioritize the right improvements.
              <em> Due to NDA restrictions, specific details about the analysis and findings are limited.</em>
            </p>
          </div>

          <div className="project-section">
            <p>
              I started by analyzing usage analytics to identify which features were getting the most traffic and where
              users were dropping off. I also partnered closely with the Customer Success team to understand the client
              perspective—what pain points they saw in conversations with users and what features clients found
              essential vs. confusing or unnecessary.
            </p>
            <p>
              From there, I experimented with multiple visualization tools. I built dashboards in both Google Looker and
              Power BI and supplemented them with custom visualizations in Python and Excel to drill into more nuanced
              behavior patterns.
            </p>
          </div>

          <div className="project-section">
            <p>
              The main deliverable was a set of interactive dashboards that showed how users were navigating the
              platform end-to-end. These dashboards combined:
            </p>
            <ul>
              <li>High-level KPIs like overall platform engagement and session counts</li>
              <li>Feature-level usage metrics highlighting the most and least used capabilities</li>
              <li>Drop-off points along key user journeys</li>
              <li>Segmentation by user type, tenure, and other attributes</li>
            </ul>
            <p>
              I also produced visual flow diagrams in Figma that mapped the most common user paths through PB Optimize.
              These flows helped the product team quickly see where users were getting stuck and where the experience
              was working well.
            </p>
          </div>

          <div className="project-section">
            <p>
              On the technical side, I combined data from multiple sources, including user tracking logs, engagement
              metrics, and performance data like page load times. I analyzed patterns such as:
            </p>
            <ul>
              <li>Session frequency and duration across different user segments</li>
              <li>Feature co-usage (which tools were often used together)</li>
              <li>Time-of-day and day-of-week usage patterns</li>
              <li>Device and environment breakdowns</li>
            </ul>
            <p>
              The resulting dashboards covered everything from total sessions and user demographics to detailed page
              interactivity and navigation flows.
            </p>
          </div>

          <div className="project-section">
            <p>
              This project helped shift the team from intuition-driven decisions to data-informed prioritization. Instead
              of guessing which features to invest in, product managers and stakeholders could clearly see which
              workflows were creating value and which ones were causing friction.
            </p>
            <p>
              The analysis also helped distinguish between features that looked impressive in demos and those that
              clients actually relied on day-to-day. Customer Success used these insights to tailor their conversations
              with clients and advocate for changes backed by concrete data rather than anecdotes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ETLTools

