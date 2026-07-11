import ClickableExpandableImage from '../../components/ClickableExpandableImage'

function MovieRecommendations() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <ClickableExpandableImage
              src="/static/images/projects/movie-recommendations/movie-recommendations-project.jpg"
              alt="MovieLens recommendation project"
              caption="MovieLens recommender"
            >
              <img
                src="/static/images/projects/movie-recommendations/movie-recommendations-project.jpg"
                alt="MovieLens recommendation project"
                loading="lazy"
              />
            </ClickableExpandableImage>
          </div>
          <div className="project-info">
            <h1>MovieLens Recommender</h1>
            <p className="project-description">
              I got curious how far you can push classic collaborative filtering on MovieLens before you need a full
              production recsys stack. Part one is hand rolled K factor matrix factorization with regularization and a
              bunch of RMSE curves. Part two is Surprise SVD++ with implicit feedback, plus a proper hyperparameter search
              where I tracked validation MAE across trials. The report PDF is the long version with every sweep and the
              leaderboard numbers spelled out.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Surprise</span>
              <span className="tech-tag">Matrix factorization</span>
              <span className="tech-tag">SVD++</span>
              <span className="tech-tag">RandomizedSearchCV</span>
              <span className="tech-tag">MAE</span>
              <span className="tech-tag">RMSE</span>
            </div>
            <div className="project-links">
              <a
                href="/static/images/projects/movie-recommendations/movie-recommendation-project.pdf"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-file-pdf" /> Download report
              </a>
              <a
                href="https://github.com/edwardl903/MovieLensRecommender"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" /> Code
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>What I actually built</h2>
            <p>
              The task is still the boring one in a good way: predict held out star ratings from a sparse user movie
              matrix. I cared about MAE and RMSE, not just accuracy vibes, because the errors are what you feel when you
              rank a list. Matrix factorization taught me the shape of the bias variance tradeoff when K grows. SVD++
              taught me that a smarter model plus search beats guessing hyperparameters by hand, and that dev scores and
              a held out leaderboard can disagree more than you want.
            </p>
          </div>

          <div className="project-section">
            <h2>Part 1: Matrix factorization</h2>
            <p>
              I implemented K factor matrix factorization with regularization and swept latent dimension and penalty
              strength. Validation RMSE improved with K up to a point (best around <code>K = 50</code> with{' '}
              <code>alpha = 0</code> in my setup), then the training curve kept dropping while validation flattened, which
              is the textbook overfitting picture. Turning regularization back on (for example <code>alpha = 0.5</code>)
              helped generalization. Best K did not always line up if you optimize RMSE vs MAE, which is worth deciding
              up front. The embedding scatter still clusters by genre enough that you can squint at it and believe the
              latents mean something.
            </p>
            <div className="project-figure-grid">
              <div className="project-figure-item">
                <h3>Training vs validation RMSE</h3>
                <p>
                  Same metric on train and val so you can see the gap open as capacity increases. Click through if you
                  want the full resolution.
                </p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/movie-recommendations/movielens-training-vs-validation-rmse.png"
                    alt="Training and validation RMSE versus model configuration for matrix factorization"
                    caption="Training vs validation RMSE"
                  >
                    <img
                      src="/static/images/projects/movie-recommendations/movielens-training-vs-validation-rmse.png"
                      alt="Training and validation RMSE versus model configuration for matrix factorization"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
              <div className="project-figure-item">
                <h3>Movie embeddings in 2D</h3>
                <p>Projection of learned movie vectors, colored so genre structure shows up.</p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/movie-recommendations/movie-embedding-clusters.jpg"
                    alt="Movie embedding visualization by genre"
                    caption="2D movie embeddings by genre"
                  >
                    <img
                      src="/static/images/projects/movie-recommendations/movie-embedding-clusters.jpg"
                      alt="Movie embedding visualization by genre"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>Part 2: SVD++ and search</h2>
            <p>
              I switched to the Surprise implementation of SVD++ and ran <code>RandomizedSearchCV</code> over{' '}
              <code>n_factors</code>, learning rate, and regularization. The trial trace below is validation MAE by
              search iteration, which is a nice sanity check that the sampler is actually exploring instead of stuck in a
              corner. I clipped and rounded predictions into [1, 5] so the outputs matched discrete stars, which nudged
              leaderboard MAE in the right direction. On my dev split the best run landed near MAE 0.49; the public
              leaderboard sat around 0.67, which is the usual story about distribution shift and how hard the test users
              are.
            </p>
            <div className="project-figure-grid">
              <div className="project-figure-item">
                <h3>Validation MAE across search trials</h3>
                <p>Each point is a different hyperparameter draw from randomized search on the validation fold.</p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/movie-recommendations/movielens-validation-mae-vs-trial-randomized-search.png"
                    alt="Validation mean absolute error versus RandomizedSearchCV trial index"
                    caption="Validation MAE vs trial (RandomizedSearchCV)"
                  >
                    <img
                      src="/static/images/projects/movie-recommendations/movielens-validation-mae-vs-trial-randomized-search.png"
                      alt="Validation mean absolute error versus RandomizedSearchCV trial index"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
              <div className="project-figure-item">
                <h3>Dev vs leaderboard MAE</h3>
                <p>Quick table from the report comparing the tuned SVD++ run to a simpler K = 10 MF baseline.</p>
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
                        <td>K = 10 MF</td>
                        <td>0.724</td>
                        <td>N/A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>What stuck with me</h2>
            <p>
              Cross validation and search matter, but they do not erase gap between a comfortable dev split and a
              tougher leaderboard. Simple post processing on predictions can matter as much as a fancier model name.
              If I did it again I would spend more time on error analysis per user segment before chasing another tenth
              on MAE.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieRecommendations
