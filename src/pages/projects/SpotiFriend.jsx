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
          <div className="project-section story-section">
            <h2>Introduction: From Music Discovery to Data Discovery</h2>
            <p>It started with a simple question: &quot;Why do I keep listening to the same songs on repeat?&quot;</p>
            <p>
              As someone who spends hours every day with music playing in the background—while coding, studying, or just
              relaxing—I began noticing patterns in my listening habits. Some weeks I&apos;d be obsessed with indie
              rock, others with classical piano pieces. But I had no way to quantify these trends or understand what was
              driving my musical choices.
            </p>
            <p>
              This curiosity about my own listening behavior led me to build SpotiFriend, an automated data pipeline
              that extracts, processes, and analyzes Spotify listening data using AWS cloud services. What began as a
              personal project to understand my music taste evolved into a comprehensive data engineering solution that
              demonstrates real-world ETL processes, cloud architecture, and analytics automation.
            </p>
            <p>
              While the goal was to gain insights into my musical preferences, the project became a perfect showcase of
              modern data engineering practices—from API integration and data extraction to cloud storage, processing,
              and visualization.
            </p>
          </div>

          <div className="project-section story-section">
            <h2>Identifying the Problem: Beyond the Spotify Wrapped</h2>
            <p>
              Spotify&apos;s annual Wrapped feature is great, but it&apos;s limited. It only shows you data once a year,
              and it doesn&apos;t let you dive deep into the patterns. I wanted to answer questions like:
            </p>
            <div className="problem-questions">
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>How does my music taste change throughout the day?</p>
              </div>
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>Which artists am I discovering vs. returning to?</p>
              </div>
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>Do I listen to different genres on weekdays vs. weekends?</p>
              </div>
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>How often do I skip songs, and what patterns emerge?</p>
              </div>
            </div>
            <p>
              The Spotify API provides access to this data, but it&apos;s raw and unstructured. To get meaningful
              insights, I needed to build a system that could automatically collect, process, and analyze this data on a
              regular basis. That&apos;s when I decided to create a complete data pipeline using AWS services.
            </p>
          </div>

          <div className="project-section story-section">
            <h2>Designing the System: From API to Analytics</h2>
            <p>
              To make SpotiFriend scalable and automated, I designed a cloud-native architecture that could handle data
              extraction, processing, and analysis with minimal manual intervention. Here&apos;s how I approached it:
            </p>

            <div className="system-design-grid">
              <div className="design-item">
                <h3>
                  <i className="fas fa-download" /> Data Extraction Layer
                </h3>
                <p>
                  I built a Python-based ETL system using the Spotify Web API with PKCE authentication for secure access
                  to user data. The system extracts multiple data types:
                </p>
                <ul>
                  <li>Top tracks and artists across different time ranges (short, medium, long term)</li>
                  <li>Recently played tracks with timestamps and audio features</li>
                  <li>Playlist data including track details and user behavior</li>
                  <li>User profile information and listening statistics</li>
                </ul>
                <p>
                  The extraction process handles both free and premium account features, with graceful degradation for
                  premium-only data points.
                </p>
              </div>

              <div className="design-item">
                <h3>
                  <i className="fas fa-cloud" /> AWS Cloud Infrastructure
                </h3>
                <p>I implemented a serverless architecture using AWS services for scalability and cost-effectiveness:</p>
                <ul>
                  <li>
                    <strong>S3:</strong> Data lake storage with partitioned JSONL format for efficient querying
                  </li>
                  <li>
                    <strong>Lambda:</strong> Serverless functions for data processing and transformation
                  </li>
                  <li>
                    <strong>Glue:</strong> Data catalog and ETL jobs for schema management
                  </li>
                  <li>
                    <strong>Athena:</strong> Serverless SQL queries for analytics
                  </li>
                  <li>
                    <strong>EventBridge:</strong> Automated scheduling for daily data collection
                  </li>
                </ul>
              </div>

              <div className="design-item">
                <h3>
                  <i className="fas fa-cogs" /> Data Processing Pipeline
                </h3>
                <p>The processing layer handles data transformation and quality:</p>
                <ul>
                  <li>JSON to JSONL conversion for efficient storage</li>
                  <li>Data validation and error handling</li>
                  <li>Partitioning by date for optimal query performance</li>
                  <li>Schema evolution handling for API changes</li>
                  <li>Incremental processing to avoid duplicate data</li>
                </ul>
                <p>
                  I used Pandas for data manipulation and Boto3 for AWS service integration, ensuring the pipeline could
                  handle both small and large datasets efficiently.
                </p>
              </div>

              <div className="design-item">
                <h3>
                  <i className="fas fa-chart-line" /> Analytics and Visualization
                </h3>
                <p>For insights and reporting, I implemented:</p>
                <ul>
                  <li>
                    <strong>Amazon QuickSight:</strong> Interactive dashboards for trend analysis
                  </li>
                  <li>
                    <strong>Custom Analytics:</strong> SQL queries for specific insights
                  </li>
                  <li>
                    <strong>Automated Reports:</strong> Scheduled generation of listening summaries
                  </li>
                  <li>
                    <strong>Real-time Monitoring:</strong> Pipeline health and data quality metrics
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>System Architecture</h2>
            <p>Here&apos;s the complete data engineering architecture I designed for SpotiFriend:</p>

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

          <div className="project-section story-section">
            <h2>Data Pipeline Implementation</h2>
            <p>
              The core of SpotiFriend is a robust ETL pipeline that handles data extraction, transformation, and loading
              with proper error handling and monitoring:
            </p>

            <div className="pipeline-details">
              <div className="pipeline-step">
                <h3>
                  <i className="fas fa-download" /> 1. Data Extraction
                </h3>
                <p>Using the Spotify Web API with PKCE authentication, the system extracts:</p>
                <ul>
                  <li>
                    <strong>Top Tracks/Artists:</strong> Across short-term (4 weeks), medium-term (6 months), and
                    long-term (several years) time ranges
                  </li>
                  <li>
                    <strong>Recently Played:</strong> Track history with timestamps, audio features, and metadata
                  </li>
                  <li>
                    <strong>Playlist Data:</strong> User-created and followed playlists with track details
                  </li>
                  <li>
                    <strong>User Profile:</strong> Account information and listening statistics
                  </li>
                </ul>
              </div>

              <div className="pipeline-step">
                <h3>
                  <i className="fas fa-cogs" /> 2. Data Processing
                </h3>
                <p>The processing layer handles data transformation and quality assurance:</p>
                <ul>
                  <li>
                    <strong>JSON to JSONL:</strong> Conversion for efficient storage and querying
                  </li>
                  <li>
                    <strong>Data Validation:</strong> Schema validation and error handling for API responses
                  </li>
                  <li>
                    <strong>Partitioning:</strong> Date-based partitioning for optimal query performance
                  </li>
                  <li>
                    <strong>Deduplication:</strong> Handling of duplicate records and incremental processing
                  </li>
                </ul>
              </div>

              <div className="pipeline-step">
                <h3>
                  <i className="fas fa-database" /> 3. Data Storage
                </h3>
                <p>Data is stored in AWS S3 with a well-organized structure:</p>
                <ul>
                  <li>
                    <strong>Raw Data:</strong> Partitioned by data type and date for efficient access
                  </li>
                  <li>
                    <strong>Processed Data:</strong> Cleaned and transformed datasets ready for analysis
                  </li>
                  <li>
                    <strong>Metadata:</strong> Schema definitions and data lineage information
                  </li>
                </ul>
              </div>

              <div className="pipeline-step">
                <h3>
                  <i className="fas fa-chart-bar" /> 4. Analytics &amp; Insights
                </h3>
                <p>The analytics layer provides actionable insights:</p>
                <ul>
                  <li>
                    <strong>Trend Analysis:</strong> Listening patterns over time and seasonal variations
                  </li>
                  <li>
                    <strong>Genre Analysis:</strong> Music taste evolution and genre preferences
                  </li>
                  <li>
                    <strong>Artist Insights:</strong> Discovery patterns and loyalty metrics
                  </li>
                  <li>
                    <strong>Behavioral Analysis:</strong> Skip rates, listening duration, and session patterns
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>Technical Implementation Highlights</h2>
            <p>Here are the key technical challenges I solved and the solutions I implemented:</p>

            <div className="tech-highlights">
              <div className="tech-item">
                <h3>
                  <i className="fas fa-shield-alt" /> Secure Authentication
                </h3>
                <p>
                  Implemented PKCE (Proof Key for Code Exchange) authentication for secure Spotify API access without
                  exposing client secrets. This ensures the application can run securely in production environments.
                </p>
              </div>

              <div className="tech-item">
                <h3>
                  <i className="fas fa-sync" /> Automated Scheduling
                </h3>
                <p>
                  Used AWS EventBridge to schedule daily data collection runs, ensuring fresh insights without manual
                  intervention. The system handles failures gracefully with retry logic and error notifications.
                </p>
              </div>

              <div className="tech-item">
                <h3>
                  <i className="fas fa-expand-arrows-alt" /> Scalable Architecture
                </h3>
                <p>
                  Designed the system to handle both individual user data and potential multi-user scenarios. The
                  serverless architecture automatically scales based on demand and only charges for actual usage.
                </p>
              </div>

              <div className="tech-item">
                <h3>
                  <i className="fas fa-code" /> Code Quality
                </h3>
                <p>
                  Implemented proper error handling, logging, and monitoring throughout the pipeline. Used environment
                  variables for configuration management and followed AWS best practices for security and performance.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>Future Enhancements</h2>
            <p>
              SpotiFriend has the foundation for several exciting enhancements that would further demonstrate advanced
              data engineering capabilities:
            </p>

            <div className="enhancement-grid">
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-brain" /> Machine Learning Integration
                </h3>
                <p>
                  Implement recommendation systems using AWS SageMaker to predict user preferences and suggest new music
                  based on listening patterns and audio features.
                </p>
              </div>
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-users" /> Multi-User Support
                </h3>
                <p>
                  Scale the system to handle multiple users with proper data isolation, user management, and
                  personalized dashboards for each user.
                </p>
              </div>
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-stream" /> Real-time Processing
                </h3>
                <p>
                  Implement real-time data streaming using AWS Kinesis to process listening events as they happen,
                  enabling live analytics and instant insights.
                </p>
              </div>
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-mobile-alt" /> Mobile Application
                </h3>
                <p>
                  Develop a mobile app that provides personalized music insights, trend notifications, and social
                  features for sharing music discoveries.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>Conclusion: Beyond the Music</h2>
            <p>
              SpotiFriend started as a way to understand my music taste, but it became much more than that. It&apos;s a
              comprehensive demonstration of modern data engineering practices, from API integration and cloud
              architecture to automated processing and analytics.
            </p>
            <p>The project showcases my ability to:</p>
            <ul>
              <li>Design and implement end-to-end data pipelines</li>
              <li>Work with cloud-native technologies and serverless architectures</li>
              <li>Handle real-world data challenges like authentication, error handling, and scalability</li>
              <li>Create meaningful insights from raw data</li>
              <li>Build production-ready systems with proper monitoring and maintenance</li>
            </ul>
            <p>
              While the insights about my music taste were interesting, the real value came from building a system that
              could reliably collect, process, and analyze data at scale. It&apos;s a perfect example of how data
              engineering can turn curiosity into actionable insights.
            </p>
            <p>
              SpotiFriend represents my approach to data engineering: start with a real problem, design a scalable
              solution, implement it with best practices, and continuously improve based on results. It&apos;s not just
              about the technology—it&apos;s about using data to understand the world better.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpotiFriend

