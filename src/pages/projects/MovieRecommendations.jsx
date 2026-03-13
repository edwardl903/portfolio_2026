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
            <h2>Project Overview</h2>
            <p>
              This project tackles one of the most common challenges in modern technology:{' '}
              <strong>how do we recommend movies to users?</strong> Streaming platforms need to predict what you might
              enjoy watching based on your past preferences and the behavior of similar users.
            </p>
            <p>
              I built a <strong>movie recommendation system</strong> using the MovieLens dataset, which contains
              millions of movie ratings from thousands of users. The goal was to predict how a user would rate a movie
              they haven&apos;t seen yet, using patterns from their previous ratings and the ratings of similar users.
            </p>

            <h3>What is Collaborative Filtering?</h3>
            <p>
              At the heart of this project is <strong>collaborative filtering</strong>, which works on a simple
              principle: &quot;Users who liked similar movies in the past will like similar movies in the future.&quot;
              Instead of analyzing movie content, we focus on user behavior patterns.
            </p>
            <p>
              For example, if User A and User B both loved &quot;The Matrix&quot; and &quot;Inception,&quot; and User A
              also loved &quot;Interstellar,&quot; we might recommend &quot;Interstellar&quot; to User B.
            </p>

            <h3>The Challenge</h3>
            <p>
              The main challenge is that most users have only rated a small fraction of available movies, creating a{' '}
              <strong>sparse matrix</strong> where most entries are missing. Our task was to fill in these missing
              ratings accurately using machine learning techniques.
            </p>

            <h3>Two Approaches Explored</h3>
            <ul>
              <li>
                <strong>Part 1:</strong> Basic matrix factorization – breaking down the user–movie rating matrix into
                simpler components
              </li>
              <li>
                <strong>Part 2:</strong> Advanced SVD++ algorithm – incorporating both explicit ratings and implicit
                user behavior
              </li>
            </ul>

            <h3>Key Metrics</h3>
            <p>We evaluated performance using:</p>
            <ul>
              <li>
                <strong>MAE (Mean Absolute Error):</strong> Average difference between predicted and actual ratings
              </li>
              <li>
                <strong>RMSE (Root Mean Square Error):</strong> Similar to MAE but penalizes larger errors more heavily
              </li>
            </ul>
            <p>Lower values mean better predictions.</p>
          </div>

          <div className="project-section">
            <h2>Part 1: Matrix Factorization Analysis</h2>

            <h3>Figure 1a: Training and Validation RMSE vs. Training Steps</h3>
            <div className="project-image">
              <img
                src="/static/images/projects/movie-recommendations/tv-rmse-same-alpha.jpg"
                alt="Training and validation RMSE vs. training steps"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Training and Validation RMSE vs. Training Steps</h3>
                <p>RMSE plots for different K values showing overfitting as K increases.</p>
              </div>
            </div>

            <h4>Analysis</h4>
            <p>
              <strong>(i) What happens as K increases in terms of under- or over-fitting?</strong>
            </p>
            <p>
              As K increases, the model begins to overfit: training RMSE decreases, but validation RMSE eventually
              stops improving and can worsen, signaling reduced generalization.
            </p>
            <p>
              <strong>(ii) How does &quot;best&quot; validation performance change from K = 2 to 10 to 50?</strong>
            </p>
            <p>
              The best validation RMSE improves slightly as K increases: around 0.930 at K=2, 0.923 at K=10, and 0.919
              at K=50, before overfitting dominates as training continues.
            </p>
            <p>
              <strong>(iii) What step size did you pick and why?</strong>
            </p>
            <p>
              We chose a step size of 0.8 after experimenting with larger values that caused divergence. At 0.8 the
              learning curves were stable without sharp oscillations.
            </p>

            <h3>Figure 1b: Training and Validation RMSE with Regularization</h3>
            <div className="project-image">
              <img
                src="/static/images/projects/movie-recommendations/tv-rmse-diff-alpha.jpg"
                alt="Training and validation RMSE with regularization"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Training and Validation RMSE with Regularization</h3>
                <p>RMSE plots with different alpha values showing regularization effects.</p>
              </div>
            </div>

            <h4>Analysis</h4>
            <p>
              <strong>(i) What value of alpha? How did you select it?</strong>
            </p>
            <p>
              We picked <code>alpha = 0.5</code> after testing several values. At 0.5 the training RMSE plateaued
              instead of continually decreasing, indicating reduced overfitting compared to alpha = 0.
            </p>
            <p>
              <strong>(ii) What step size did you pick?</strong>
            </p>
            <p>
              We again used step size 0.8, which produced stable curves across different alpha values without
              divergence.
            </p>
            <p>
              <strong>
                (iii) Did you get better validation-set error with this alpha than with K = 50, alpha = 0 in 1a?
              </strong>
            </p>
            <p>
              The lowest validation RMSE with alpha = 0 (0.919) is numerically better than with alpha = 0.5 (0.947), but
              the regularized model generalizes better over longer training, since it resists overfitting.
            </p>

            <h3>Table 1c: Performance Comparison</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>K</th>
                    <th>Alpha</th>
                    <th>Best RMSE</th>
                    <th>Best MAE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td>0</td>
                    <td>0.930</td>
                    <td>0.731</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>0</td>
                    <td>0.923</td>
                    <td>0.724</td>
                  </tr>
                  <tr>
                    <td>50</td>
                    <td>0</td>
                    <td>0.919</td>
                    <td>0.725</td>
                  </tr>
                  <tr>
                    <td>50</td>
                    <td>0.5</td>
                    <td>0.947</td>
                    <td>0.746</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4>Analysis</h4>
            <p>
              <strong>(i) Focusing on RMSE, how many factors K do you recommend?</strong>
            </p>
            <p>
              Based on RMSE alone, K = 50 performs best among the tested configurations when alpha = 0.
            </p>
            <p>
              <strong> (ii) Does the model ranking change if you use MAE instead of RMSE?</strong>
            </p>
            <p>
              Yes. When ranking by MAE, K = 10 becomes the best model, highlighting how metric choice can change which
              configuration looks optimal.
            </p>

            <h3>Figure 1d: Movie Embedding Visualization</h3>
            <div className="project-image">
              <img
                src="/static/images/projects/movie-recommendations/movie-embedding-clusters.jpg"
                alt="Movie embedding visualization"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Movie Embedding Visualization</h3>
                <p>2D visualization of movie embeddings showing clustering by genre.</p>
              </div>
            </div>
            <p>
              We observed interpretable clusters: action/adventure films grouped together, children&apos;s movies near
              each other, and horror films forming their own neighborhoods. Some outliers (e.g., sequels spread apart)
              highlighted the limits of purely rating-based embeddings.
            </p>
          </div>

          <div className="project-section">
            <h2>Part 2: SVD++ Implementation</h2>

            <h3>2a: SVD++ and Hyperparameter Tuning</h3>
            <p>
              For Part 2 we used the SVD++ algorithm from the Surprise library. SVD++ extends matrix factorization by
              incorporating implicit feedback—whether a user has interacted with an item at all—making it well-suited
              for sparse recommendation problems like MovieLens.
            </p>
            <p>
              We tuned:
            </p>
            <ul>
              <li>
                <strong>n_factors</strong> (latent dimensions)
              </li>
              <li>
                <strong>lr_all</strong> (global learning rate)
              </li>
              <li>
                <strong>reg_all</strong> (global regularization strength)
              </li>
            </ul>
            <p>
              Using <code>RandomizedSearchCV</code> over 50 trials with 5-fold cross-validation, we optimized for MAE
              and then retrained the best configuration on the full development set. We clipped predictions to [1, 5]
              and rounded to the nearest integer, which surprisingly improved leaderboard MAE because true ratings are
              discrete.
            </p>

            <div className="project-image">
              <img
                src="/static/images/projects/movie-recommendations/hyperparameters-tuning.jpg"
                alt="Hyperparameter tuning results"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Hyperparameter Tuning Results</h3>
                <p>MAE across different hyperparameter combinations showing optimal settings.</p>
              </div>
            </div>

            <h3>2b: Performance Analysis</h3>
            <p>
              The best SVD++ model achieved a dev-set test MAE of 0.4899 but a leaderboard MAE of 0.668, indicating a
              noticeable performance drop. This suggests some overfitting to the dev distribution or distribution shifts
              between dev and leaderboard data.
            </p>

            <h3>2c: Comparing Part 1 and Part 2</h3>
            <p>
              Part 1 focused on simpler matrix factorization with limited hyperparameters. Part 2 added implicit
              feedback and tuned multiple parameters (latent dimensions, learning rate, regularization) with
              cross-validation. As a result, the Part 2 solution generalized better on the dev set and achieved stronger
              MAE than the simpler models, though the leaderboard highlighted the usual gap between dev performance and
              real-world generalization.
            </p>

            <h3>MAE Performance Summary</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Dev Set Test MAE</th>
                    <th>Leaderboard MAE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SVD++</td>
                    <td>0.490</td>
                    <td>0.6684</td>
                  </tr>
                  <tr>
                    <td>K = 10 MF</td>
                    <td>0.724</td>
                    <td>N/A</td>
                  </tr>
                  <tr>
                    <td>GradientBoosting</td>
                    <td>0.533</td>
                    <td>N/A</td>
                  </tr>
                  <tr>
                    <td>XGBoost</td>
                    <td>0.512</td>
                    <td>N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>2d: Approach Analysis</h3>
            <p>
              SVD++ worked well because it leveraged both explicit ratings and implicit user–item interactions, making
              it powerful for sparse recommendation tasks. The downside is computational cost: training and tuning were
              significantly slower than simpler models, especially as we scaled up hyperparameter search or dataset
              size.
            </p>
            <p>
              Overall, SVD++ is a strong choice for classic user–item recommendation problems, but less suited for
              scenarios with extremely large or streaming data where training cost and update latency are critical.
            </p>
          </div>

          <div className="project-section">
            <h2>Key Learnings &amp; Reflections</h2>
            <p>
              This project reinforced how critical hyperparameter tuning, cross-validation, and metric selection are for
              building recommendation systems that generalize. It also highlighted that strong dev-set performance does
              not guarantee leaderboard success—distribution shifts and overfitting are real risks.
            </p>
            <p>
              I also learned how simple preprocessing choices (like clipping and rounding predictions) can have a large
              impact on evaluation metrics, and how to reason about trade-offs between model complexity, training time,
              and real-world robustness.
            </p>
          </div>

          <div className="project-section">
            <h2>Technical Implementation</h2>
            <ul>
              <li>
                <strong>Open-source tools:</strong> Surprise (SVD++ and tuning utilities), Pandas/NumPy for data
                manipulation, Matplotlib for visualization
              </li>
              <li>
                <strong>Matrix Factorization:</strong> Custom K-factor MF with regularization and learning rate tuning
              </li>
              <li>
                <strong>SVD++:</strong> Advanced collaborative filtering with implicit feedback signals
              </li>
              <li>
                <strong>Hyperparameter Tuning:</strong> RandomizedSearchCV with 5-fold cross-validation
              </li>
              <li>
                <strong>Evaluation:</strong> MAE and RMSE for comprehensive performance assessment
              </li>
              <li>
                <strong>Preprocessing:</strong> Rating clipping and rounding to align predictions with true rating scale
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieRecommendations

