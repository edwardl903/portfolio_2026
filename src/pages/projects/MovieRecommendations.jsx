function MovieRecommendations() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/movie-recommendations/movie-recommendations-project.jpg"
              alt="MovieLens recommendation project"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>MovieLens Recommender</h1>
            <p className="project-description">
              Built a scalable recommendation system using collaborative filtering algorithms with Mean Absolute Error
              optimization, processing millions of user ratings for personalized movie suggestions.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Collaborative Filtering</span>
              <span className="tech-tag">Machine Learning</span>
              <span className="tech-tag">Recommendation Systems</span>
              <span className="tech-tag">MAE</span>
            </div>
            <div className="project-links">
              <a
                href="/static/images/projects/movie-recommendations/movie-recommendation-project.pdf"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-file-pdf" /> Download Report
              </a>
              <a href="#" className="project-link">
                <i className="fab fa-github" /> View Code
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>Overview</h2>
            <p>
              I built a movie recommendation system on the MovieLens dataset using collaborative filtering. The goal
              was to predict user ratings for unseen movies. I used MAE and RMSE for evaluation and compared basic
              matrix factorization (Part 1) with SVD++ that uses implicit feedback (Part 2).
            </p>
          </div>

          <div className="project-section">
            <h2>Part 1: Matrix Factorization</h2>
            <p>
              I implemented K-factor matrix factorization with regularization. As K increased, validation RMSE improved
              up to a point (best around K=50, alpha=0) but overfitting grew. Regularization (e.g. alpha=0.5) helped
              generalization. Metric choice mattered: best K by RMSE differed from best by MAE. Embedding visualization
              showed interpretable genre clusters.
            </p>
            <div className="project-image">
              <img
                src="/static/images/projects/movie-recommendations/movie-embedding-clusters.jpg"
                alt="Movie embedding visualization"
                loading="lazy"
              />
              <div className="image-caption">
                <p>2D movie embeddings by genre.</p>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>Part 2: SVD++</h2>
            <p>
              I used the Surprise library SVD++ with <code>RandomizedSearchCV</code> over n_factors, learning rate, and
              regularization. Clipping and rounding predictions to [1, 5] improved leaderboard MAE. Best dev MAE was
              0.49; leaderboard MAE was 0.67, highlighting a dev/leaderboard gap.
            </p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Dev MAE</th>
                    <th>Leaderboard MAE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SVD++</td>
                    <td>0.490</td>
                    <td>0.668</td>
                  </tr>
                  <tr>
                    <td>K=10 MF</td>
                    <td>0.724</td>
                    <td>N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="project-section">
            <h2>Takeaways</h2>
            <ul>
              <li>Hyperparameter tuning and cross-validation were critical for generalization.</li>
              <li>Strong dev performance did not guarantee leaderboard success; overfitting and distribution shift matter.</li>
              <li>Simple preprocessing (clipping, rounding) improved metric alignment with discrete ratings.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieRecommendations

