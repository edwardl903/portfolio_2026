import { Link } from 'react-router-dom'

const projects = [
  {
    id: 'chesslytics',
    title: 'ChessLytics',
    description:
      'Self-serve chess analytics: enter a Chess.com username for stats, matplotlib charts, and a Looker embed. Most of the work went into a fast, cached Chess.com fetch and raw-first BigQuery loads so analytics can evolve without re-pulling years of API data.',
    tags: [
      'Python',
      'Flask',
      'pandas',
      'matplotlib',
      'BigQuery',
      'Looker Studio',
      'requests-cache',
      'Chess.com API',
      'Heroku',
      'GCP',
      'dbt',
    ],
    image: '/static/images/projects/chesslytics/chesslytics-project.jpg',
    links: [
      { label: 'Live', icon: 'fas fa-external-link-alt', href: 'https://www.chesslytics.xyz' },
      { label: 'Code', icon: 'fab fa-github', href: 'https://github.com/edwardl903/chesslyzer' },
    ],
    to: '/projects/chesslytics',
  },
  {
    id: 'chesslytics-dbt',
    title: 'ChessLytics dbt Pipeline',
    description:
      'dbt project that incrementally loads chess.com games per username into BigQuery every night. Seeds track multiple players, incremental models skip old rows, and the mart layer powers the chess analytics page on this site.',
    tags: ['dbt', 'BigQuery', 'SQL', 'GCP', 'Incremental Models'],
    image: '/static/images/projects/chesslytics/chesslytics-dbt-cover.jpg',
    links: [],
    to: '/projects/chesslytics-dbt',
  },
  {
    id: 'spotifriend',
    title: 'SpotiFriend',
    description:
      'Personal Spotify lake house: PKCE API pulls, partitioned JSONL in S3, Glue catalog, Athena SQL, QuickSight charts, EventBridge plus Lambda for scheduled ETL.',
    tags: ['Python', 'AWS', 'Spotify API', 'S3', 'Glue', 'Athena', 'QuickSight', 'ETL'],
    image: '/static/images/projects/spotifriend/spotifriend-project.jpg',
    links: [
      { label: 'Code', icon: 'fab fa-github', href: 'https://github.com/edwardl903/spotify-etl' },
    ],
    to: '/projects/spotifriend',
  },
  {
    id: 'nlp-pipeline',
    title: 'Reading Level Classifier',
    description:
      'Binary reading-level labels from text: TF-IDF + logistic regression vs BERT + random forest, with CV sweeps and confusion matrices.',
    tags: ['Python', 'scikit-learn', 'TF-IDF', 'BERT', 'Random Forest', 'NLP'],
    image: '/static/images/projects/nlp-pipeline/nlp-pipeline-project.jpg',
    links: [],
    to: '/projects/nlp-pipeline',
  },
  {
    id: 'movie-recommendations',
    title: 'MovieLens Recommender',
    description:
      'MovieLens ratings: matrix factorization (RMSE curves, embeddings) then Surprise SVD++ with RandomizedSearchCV and leaderboard MAE.',
    tags: ['Python', 'Surprise', 'SVD++', 'Matrix factorization', 'MAE', 'RMSE'],
    image: '/static/images/projects/movie-recommendations/movie-recommendations-project.jpg',
    links: [
      { label: 'Code', icon: 'fab fa-github', href: 'https://github.com/edwardl903/MovieLensRecommender' },
    ],
    to: '/projects/movie-recommendations',
  },
  {
    id: 'etl-tools',
    title: 'Pison Technology ETL',
    description:
      'Data ops at a sensor heavy wearable startup: Python merges, staging QA for releases, BigQuery reporting pipes, and Looker Studio dashboards for test scores and improvement across users.',
    tags: ['Python', 'BigQuery', 'Looker Studio', 'Jupyter', 'ETL', 'APIs'],
    image: '/static/images/projects/etl-tools/pison-technology.jpg',
    links: [],
    to: '/projects/etl-tools',
  },
  {
    id: 'fidelity',
    title: 'Fidelity User Behavior Analysis',
    description: 'User behavior analysis for Fidelity PB Optimize: SQL and Python on usage logs to show product and CS where people got stuck and which features moved retention.',
    tags: ['SQL', 'Python', 'Tableau', 'Analytics'],
    image: '/static/images/projects/etl-tools/etl-tools-project.jpg',
    links: [],
    to: '/projects/fidelity',
  },
  {
    id: 'eeg-research',
    title: 'EEG Research Lab',
    description: 'Contributed to published EEG research on human cognition, analyzing neural data from 20+ participants in strategic thinking studies.',
    tags: ['Python', 'EEG', 'Research', 'Data Analysis'],
    image: '/static/images/projects/eeg-research/research-lab-project.jpg',
    links: [],
    to: '/projects/eeg-research',
  },
]

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects-header">
          <h1 className="projects-title">I have worked on a number of fun data projects (data engineering and data analytics).</h1>
          <p className="projects-subtitle">Feel free to ask me any questions!</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card-v2" key={project.id}>
              <Link to={project.to} className="project-card-img-wrap">
                <img src={project.image} alt={project.title} loading="lazy" />
              </Link>

              <div className="project-card-body">
                <div className="project-card-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>

                <Link to={project.to} className="project-card-title">{project.title}</Link>
                <p className="project-card-desc">{project.description}</p>

                <div className="project-card-footer">
                  <Link to={project.to} className="project-card-detail-link">
                    View project <i className="fas fa-arrow-right"></i>
                  </Link>
                  {project.links.length > 0 && (
                    <div className="project-card-ext-links">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-ext-link"
                          title={link.label}
                        >
                          <i className={link.icon}></i> {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
