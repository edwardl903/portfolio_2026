import { Link } from 'react-router-dom'

const projects = [
  {
    id: 'chesslytics',
    title: 'ChessLytics',
    description: 'End-to-end chess analytics platform processing 100,000+ games with personalized Year in Review reports and real-time insights.',
    tags: ['Python', 'GCP', 'BigQuery', 'Flask'],
    image: '/static/images/projects/chesslytics/chesslytics-project.jpg',
    links: [
      { label: 'Live', icon: 'fas fa-external-link-alt', href: 'https://www.chesslytics.xyz' },
      { label: 'Code', icon: 'fab fa-github', href: 'https://github.com/edwardl903/chesslyzer' },
    ],
    to: '/projects/chesslytics',
  },
  {
    id: 'chesslytics-azure',
    title: 'ChessLytics Azure Analytics',
    description: 'Scalable Azure-based chess analytics extension processing millions of games using Databricks, Delta Lake, and Spark SQL.',
    tags: ['Azure', 'Databricks', 'PySpark', 'Delta Lake'],
    image: '/static/images/projects/chesslytics/chesslytics-azure.jpg',
    links: [],
    to: '/projects/chesslytics-azure',
  },
  {
    id: 'spotifriend',
    title: 'SpotiFriend',
    description: 'Cloud data pipeline analyzing Spotify listening behavior across 10,000+ tracks with real-time SQL queries and dashboards.',
    tags: ['AWS', 'PostgreSQL', 'Python', 'ETL'],
    image: '/static/images/projects/spotifriend/spotifriend-project.jpg',
    links: [
      { label: 'Code', icon: 'fab fa-github', href: 'https://github.com/edwardl903/spotify-etl' },
    ],
    to: '/projects/spotifriend',
  },
  {
    id: 'nlp-pipeline',
    title: 'Reading Level Classifier',
    description: 'NLP pipeline for automatic reading-level classification of educational content using machine learning models.',
    tags: ['Python', 'NLP', 'ML', 'scikit-learn'],
    image: '/static/images/projects/nlp-pipeline/nlp-pipeline-project.jpg',
    links: [],
    to: '/projects/nlp-pipeline',
  },
  {
    id: 'movie-recommendations',
    title: 'MovieLens Recommender',
    description: 'Recommendation system using collaborative filtering on millions of user ratings to generate personalized movie suggestions.',
    tags: ['Python', 'Machine Learning', 'Spark'],
    image: '/static/images/projects/movie-recommendations/movie-recommendations-project.jpg',
    links: [
      { label: 'Code', icon: 'fab fa-github', href: 'https://github.com/edwardl903/MovieLensRecommender' },
    ],
    to: '/projects/movie-recommendations',
  },
  {
    id: 'etl-tools',
    title: 'Pison Technology ETL',
    description: 'Built ETL tools and automation scripts for Boston startup Pison Technology, improving data integration and reducing manual work.',
    tags: ['Python', 'ETL', 'APIs', 'Automation'],
    image: '/static/images/projects/etl-tools/pison-technology.jpg',
    links: [],
    to: '/projects/etl-tools',
  },
  {
    id: 'fidelity',
    title: 'Fidelity User Behavior Analysis',
    description: 'Led user behavior analysis for Fidelity PB Optimize to identify high-value features and surface actionable insights for product teams.',
    tags: ['SQL', 'Python', 'Tableau', 'Analytics'],
    image: '/static/images/projects/etl-tools/etl-tools-project.jpg',
    links: [],
    to: '/projects/etl-tools',
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
          <h1 className="projects-title">Data Projects</h1>
          <p className="projects-subtitle">A selection of work across analytics, engineering, and research. Feel free to ask me anything.</p>
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
