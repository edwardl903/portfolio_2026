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
          <div className="project-section story-section">
            <h2>Introduction: Curiosity, Strategy, and a Chessboard</h2>
            <p>
              Before I ever wrote a single SQL query or processed a dataset, I was just a chess player trying to
              understand why I kept losing the same types of games.
            </p>
            <p>
              It started like this: I&apos;d play five games online. Win two, lose three. I&apos;d feel like I was
              doing okay—until I checked my history and noticed I had lost to the exact same opening… again. That
              pattern repeated itself over weeks, and I began wondering whether there was something deeper going on.
              Was I making predictable mistakes? Was my intuition failing me under time pressure?
            </p>
            <p>
              This question—<strong>what am I missing?</strong>—sparked the creation of ChessLytics, a data
              analytics platform that helps players make sense of their chess performance by combining large-scale
              game processing with behavioral insights. What started as a small personal project eventually became a
              full data pipeline analyzing thousands of games, complete with automated dashboards, user-specific
              reports, and scalable cloud architecture.
            </p>
            <p>
              While I built ChessLytics to improve at chess, I ended up learning how to build real-world data systems,
              work with messy and complex datasets, and think critically about user behavior. It taught me more than
              any classroom project. And more importantly, it taught me how to connect data with decisions.
            </p>
          </div>

          <div className="project-section story-section">
            <h2>Identifying the Problem: Beyond the Game History</h2>
            <p>
              Platforms like Chess.com do a great job of letting users review their games. But those reviews are usually
              one-off. They show what happened in a single game, but they don&apos;t help players step back and identify
              patterns across time. I wanted answers like:
            </p>
            <div className="problem-questions">
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>Which openings was I overusing?</p>
              </div>
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>Did I struggle more against certain rating brackets?</p>
              </div>
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>Was my decision quality better in longer games or faster time controls?</p>
              </div>
              <div className="question-item">
                <i className="fas fa-question-circle" />
                <p>How often did I blunder when I had less than one minute on the clock?</p>
              </div>
            </div>
            <p>
              The only way to answer these questions was to collect all my games, clean and structure the data, and
              start digging in. At first, I did this manually—exporting my PGN files and reviewing them in Excel. But
              the process was tedious and slow. I knew there had to be a better way, and that&apos;s when I decided to
              automate the entire pipeline.
            </p>
          </div>

          <div className="project-section story-section">
            <h2>Designing the System: From PGN to Dashboard</h2>
            <p>
              To make ChessLytics scalable, I had to build a system that could process thousands of games across
              multiple users, while keeping it efficient and secure. Here&apos;s how I approached it:
            </p>

            <div className="system-design-grid">
              <div className="design-item">
                <h3>
                  <i className="fas fa-download" /> Data Ingestion
                </h3>
                <p>
                  Chess.com provides a comprehensive REST API that allows access to player data and game histories. I
                  built automated scripts to fetch player profiles, monthly game archives, and detailed game information
                  using Python&apos;s requests library with proper rate limiting and error handling.
                </p>
                <p>
                  For user-specific data, I created functionality for people to input their Chess.com username and year,
                  which would trigger the system to collect and process their entire game history automatically.
                </p>
              </div>

              <div className="design-item">
                <h3>
                  <i className="fas fa-cogs" /> Data Processing with Python
                </h3>
                <p>
                  Once the raw data was ingested, I used Python with Pandas and NumPy to parse and transform the files.
                  PGN (Portable Game Notation) is a structured format, but it still requires custom parsing to extract
                  metadata like:
                </p>
                <ul>
                  <li>Opening name and ECO code</li>
                  <li>Move-by-move timestamps and time controls</li>
                  <li>Game duration, result, and rating changes</li>
                  <li>Special moves like castling, en passant, and promotions</li>
                </ul>
                <p>
                  Using Python allowed me to process the data efficiently while maintaining flexibility for complex
                  chess-specific calculations.
                </p>
              </div>

              <div className="design-item">
                <h3>
                  <i className="fas fa-database" /> Storage and Analytics
                </h3>
                <p>
                  Processed data was pushed into Google BigQuery, which allowed me to run complex SQL analytics at
                  scale. For example, I could quickly compute player win rates per opening, track average performance
                  over time, and compare results by time control or rating bracket.
                </p>
                <p>
                  I used Looker Studio to build interactive dashboards, both for global trends and for user-specific
                  insights. Users could input their username and receive a full performance breakdown within minutes.
                </p>
              </div>

              <div className="design-item">
                <h3>
                  <i className="fas fa-globe" /> Frontend and API Layer
                </h3>
                <p>
                  I built a responsive web application with Flask, served by a RESTful API. The frontend allowed users
                  to input their Chess.com username, trigger their personalized analysis, and interact with 20+ different
                  charts and visualizations. The entire process—from raw data collection to visual insights—was
                  streamlined and automated.
                </p>
              </div>
            </div>
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

          <div className="project-section story-section">
            <h2>Initial GCP Solution in Depth</h2>
            <p>
              When I first built ChessLytics, I designed a comprehensive Google Cloud Platform architecture that could
              handle chess game analysis at scale. This initial solution focused on processing Chess.com API data and
              user uploads efficiently.
            </p>
            <p>
              The architecture was built around Google Cloud&apos;s powerful analytics services, providing a solid
              foundation for chess analytics while maintaining cost-effectiveness and scalability.
            </p>

            <div className="hybrid-architecture-grid">
              <div className="arch-item">
                <h3>
                  <i className="fab fa-google" /> Google Cloud Platform Core
                </h3>
                <p>
                  <strong>Cloud Storage &amp; BigQuery:</strong> I implemented a data warehouse solution using Google
                  Cloud Storage for raw data and BigQuery for analytics processing.
                </p>
                <ul>
                  <li>Cloud Storage buckets for raw game data</li>
                  <li>BigQuery datasets for structured analytics</li>
                  <li>Data partitioning by date and user</li>
                  <li>Automated data pipeline scheduling</li>
                </ul>
              </div>

              <div className="arch-item">
                <h3>
                  <i className="fas fa-chart-line" /> Data Processing Pipeline
                </h3>
                <p>
                  <strong>ETL Process:</strong> I built a comprehensive Extract, Transform, Load pipeline using Python
                  and Google Cloud services.
                </p>
                <ul>
                  <li>Chess.com API integration with rate limiting</li>
                  <li>CSV/XLSX file processing for user uploads</li>
                  <li>PGN parsing and game analysis</li>
                  <li>Statistics calculation and aggregation</li>
                </ul>
              </div>

              <div className="arch-item">
                <h3>
                  <i className="fas fa-tachometer-alt" /> Analytics &amp; Visualization
                </h3>
                <p>
                  <strong>Looker Studio Integration:</strong> I created interactive dashboards and visualizations to
                  present chess analytics insights.
                </p>
                <ul>
                  <li>Real-time performance metrics</li>
                  <li>Interactive game history analysis</li>
                  <li>Opening repertoire visualization</li>
                  <li>Player statistics dashboards</li>
                </ul>
              </div>

              <div className="arch-item">
                <h3>
                  <i className="fas fa-globe" /> Web Application
                </h3>
                <p>
                  <strong>Flask API &amp; User Interface:</strong> I developed a complete web application with REST API
                  endpoints and responsive user interface.
                </p>
                <ul>
                  <li>Flask REST API for data access</li>
                  <li>User authentication and data privacy</li>
                  <li>File upload handling (CSV/XLSX)</li>
                  <li>Real-time analytics updates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>Evolution: Multi-Cloud Hybrid Architecture</h2>
            <p>
              As ChessLytics grew, I hit a major limitation: Chess.com&apos;s API rate limits prevented me from
              processing the massive scale of chess games I wanted to analyze. I needed a solution that could handle
              millions of games efficiently.
            </p>
            <p>
              That&apos;s when I discovered Lichess&apos;s monthly game dumps—compressed archives containing all games
              played on their platform each month. This presented an opportunity to build a truly scalable, multi-cloud
              data engineering solution.
            </p>

            <div className="hybrid-architecture-grid">
              <div className="arch-item">
                <h3>
                  <i className="fab fa-microsoft" /> Microsoft Azure Integration
                </h3>
                <p>
                  <strong>Azure Data Lake Storage Gen2:</strong> Set up scalable cloud storage for raw Lichess game data
                  with hierarchical namespace and blob storage capabilities.
                </p>
                <ul>
                  <li>Storage account configuration with access key authentication</li>
                  <li>Container-based organization for monthly game archives</li>
                  <li>WASBS integration for Spark access</li>
                  <li>Automatic data lifecycle management</li>
                </ul>
              </div>

              <div className="arch-item">
                <h3>
                  <i className="fas fa-cloud" /> Databricks &amp; PySpark Processing
                </h3>
                <p>
                  <strong>Azure Databricks:</strong> Leveraged distributed computing clusters for processing massive
                  chess datasets efficiently.
                </p>
                <ul>
                  <li>PySpark for distributed data processing</li>
                  <li>Custom PGN parsing with python-chess</li>
                  <li>Zstandard (ZST) decompression for compressed game files</li>
                  <li>RDD and DataFrame operations for game analysis</li>
                </ul>
              </div>

              <div className="arch-item">
                <h3>
                  <i className="fas fa-database" /> Delta Lake Implementation
                </h3>
                <p>
                  <strong>Silver Layer Data Lake:</strong> Implemented Delta Lake for ACID transactions and schema
                  evolution on processed game data.
                </p>
                <ul>
                  <li>Partitioned by YearMonth for efficient querying</li>
                  <li>Schema enforcement and data quality checks</li>
                  <li>Time travel capabilities for data versioning</li>
                  <li>Optimized storage format for analytics workloads</li>
                </ul>
              </div>

              <div className="arch-item">
                <h3>
                  <i className="fas fa-chart-line" /> Multi-Platform Analytics
                </h3>
                <p>
                  <strong>Hybrid Analytics:</strong> Combined Azure Databricks processing with Google Cloud BigQuery for
                  comprehensive analytics.
                </p>
                <ul>
                  <li>Azure for big data processing and storage</li>
                  <li>GCP BigQuery for interactive SQL analytics</li>
                  <li>Looker Studio for visualization dashboards</li>
                  <li>Cross-cloud data integration and synchronization</li>
                </ul>
              </div>
            </div>

            <div className="diagram-image-container">
              <img
                src="/static/images/projects/chesslytics/databricks.png"
                alt="Databricks notebook implementation for Lichess processing"
                className="architecture-image"
                loading="lazy"
              />
              <div className="diagram-caption">
                <p>
                  <strong>Databricks Notebook:</strong> PySpark notebook showing Lichess game processing pipeline with
                  ZST decompression, PGN parsing, and Delta Lake writes.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>What I Learned from the Data</h2>
            <p>
              With the system in place, I started to see fascinating trends—both in my own gameplay and across users.
            </p>
            <p>
              For example, I discovered that I was frequently making mistakes in the same late-midgame positions when
              under time pressure. My accuracy dropped significantly after move 25, especially when I had less than two
              minutes on the clock. That insight alone helped me improve my time management and focus in endgames.
            </p>
            <p>
              Other users shared similar feedback. Some found that they played too passively with the black pieces,
              while others were overusing risky openings without realizing how poor their results were. I even built
              analytics that looked at rating volatility and performance after losses, helping players understand how
              emotion was affecting their decision-making.
            </p>
            <p>
              These patterns made the experience feel incredibly rewarding. I wasn&apos;t just building charts—I was
              helping people see themselves more clearly.
            </p>

            <div className="diagram-image-container">
              <img
                src="/static/images/projects/chesslytics/sample-dashboard.png"
                alt="Sample chess analytics dashboard"
                className="architecture-image"
                loading="lazy"
              />
              <div className="diagram-caption">
                <p>
                  <strong>Sample Analytics Dashboard:</strong> Looker Studio dashboard showing personalized chess
                  analytics with multiple charts and insights.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>Challenges I Faced</h2>
            <p>Like any real-world project, ChessLytics came with plenty of challenges. A few stand out:</p>

            <div className="challenge-item">
              <h3>
                <i className="fas fa-exclamation-triangle" /> API Rate Limiting
              </h3>
              <p>
                Chess.com APIs have strict rate limits that could cause data collection failures and incomplete
                datasets. I implemented intelligent rate limiting with exponential backoff, proper HTTP headers, and
                error handling to ensure reliable data collection.
              </p>
            </div>

            <div className="challenge-item">
              <h3>
                <i className="fas fa-exclamation-triangle" /> Complex PGN Parsing
              </h3>
              <p>
                Chess games are stored in PGN format which contains complex move notation, annotations, and metadata
                that needed to be accurately parsed and validated. I built custom PGN parsing functions using the
                python-chess library with robust error handling for malformed game data.
              </p>
            </div>

            <div className="challenge-item">
              <h3>
                <i className="fas fa-exclamation-triangle" /> Performance Optimization
              </h3>
              <p>
                Generating 20+ different visualizations dynamically for each user request while maintaining performance
                required careful memory management and optimization. I implemented efficient chart generation using
                Matplotlib and Seaborn with proper figure management and caching mechanisms.
              </p>
            </div>

            <div className="challenge-item">
              <h3>
                <i className="fas fa-exclamation-triangle" /> Cloud Integration
              </h3>
              <p>
                Integrating with Google Cloud BigQuery for data storage and creating personalized Looker Studio
                dashboards required comprehensive authentication, schema management, and data upload pipelines. I built
                dynamic dashboard generation with user-specific filters and parameters.
              </p>
            </div>

            <div className="challenge-item">
              <h3>
                <i className="fas fa-exclamation-triangle" /> Deployment Challenges
              </h3>
              <p>
                Deploying a data-intensive application on Heroku with memory constraints required optimization of memory
                usage, proper process management with Gunicorn, and efficient data structures to minimize memory
                footprint.
              </p>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>Why It Matters</h2>
            <p>
              ChessLytics was never just about chess—it was about learning how to build something that matters. It
              taught me how to work with data from end to end: ingestion, transformation, analysis, visualization, and
              user feedback.
            </p>
            <p>
              But more than that, it taught me to think like a systems designer. Every feature I added had to balance
              performance, usability, and accuracy. Every insight I surfaced had to be statistically sound and
              meaningful. And every line of code I wrote had to scale.
            </p>
            <p>
              These are the same skills I hope to bring into future work, especially in environments where data is
              critical to making informed, high-stakes decisions—whether it&apos;s in finance, health, or national
              security.
            </p>
          </div>

          <div className="project-section story-section">
            <h2>Conclusion</h2>
            <p>
              ChessLytics started as a tool to help me stop losing chess games. But in the end, it taught me how to
              think like a data engineer. It challenged me to design scalable systems, analyze complex behavior, and
              build tools that people actually use.
            </p>
            <p>
              Most importantly, it taught me that data is never just numbers—it&apos;s a reflection of people, patterns,
              and decisions. And when used responsibly, it can be a powerful tool for understanding the world and making
              it better.
            </p>
            <p>
              That&apos;s the mindset I carry into every data project I take on, and one I&apos;m excited to bring to
              the next chapter of my career.
            </p>
          </div>

          <div className="project-section">
            <h2>Future Enhancements</h2>
            <div className="enhancements-grid">
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-brain" /> Machine Learning Integration
                </h3>
                <p>
                  Implement ML models for game outcome prediction, opening recommendations, and player strength
                  assessment.
                </p>
              </div>
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-stream" /> Real-time Analytics
                </h3>
                <p>Add real-time game analysis and live performance tracking capabilities.</p>
              </div>
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-mobile-alt" /> Mobile Application
                </h3>
                <p>Develop a mobile app for on-the-go analytics and push notifications for performance insights.</p>
              </div>
              <div className="enhancement-item">
                <h3>
                  <i className="fas fa-users" /> Social Features
                </h3>
                <p>Add friend comparison features, leaderboards, and community trend analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChessLytics

