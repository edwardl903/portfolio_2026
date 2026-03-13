function NLPipeline() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/nlp-pipeline/nlp-pipeline-project.jpg"
              alt="NLP reading level classifier"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>Reading Level Classifier</h1>
            <p className="project-description">
              Developed an end-to-end NLP pipeline for automatic reading-level classification of educational content,
              processing thousands of documents with machine learning models.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">NLP</span>
              <span className="tech-tag">Machine Learning</span>
              <span className="tech-tag">Text Processing</span>
              <span className="tech-tag">ETL</span>
            </div>
            <div className="project-links">
              <a
                href="/static/images/projects/nlp-pipeline/nlp-pipeline-project.pdf"
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
              This project addresses a fundamental challenge in education and content creation:{' '}
              <strong>how do we automatically determine the reading level of text?</strong> Think about textbooks,
              educational websites, or even news articles—they all need to be appropriately leveled for their target
              audience.
            </p>
            <p>
              I built an <strong>NLP (Natural Language Processing) pipeline</strong> that can automatically classify text
              passages as either &quot;lower-level&quot; (easier to read) or &quot;upper-level&quot; (more complex).
              This system processes thousands of literary passages and uses machine learning to predict their reading
              difficulty.
            </p>

            <h3>The Challenge</h3>
            <p>The main challenge is that reading difficulty isn&apos;t just about word length or sentence structure. It involves complex factors like:</p>
            <ul>
              <li>Vocabulary complexity and frequency</li>
              <li>Sentence structure and syntax</li>
              <li>Conceptual complexity and abstract thinking required</li>
              <li>Literary devices and metaphorical language</li>
            </ul>
            <p>Our task was to build a system that could capture these nuances automatically.</p>

            <h3>Two Approaches Explored</h3>
            <ul>
              <li>
                <strong>Part 1:</strong> Traditional Bag-of-Words approach – analyzing word frequencies and patterns
              </li>
              <li>
                <strong>Part 2:</strong> Advanced BERT embeddings – using modern language models to understand context
                and meaning
              </li>
            </ul>

            <h3>Key Metrics</h3>
            <p>We measured success using:</p>
            <ul>
              <li>
                <strong>AUROC (Area Under ROC Curve):</strong> Measures how well our model distinguishes between reading
                levels (higher is better)
              </li>
              <li>
                <strong>Confusion Matrix:</strong> Shows how often we correctly vs. incorrectly classify texts
              </li>
            </ul>
            <p>Our goal was to achieve high accuracy while understanding what types of texts were most challenging to classify.</p>

            <h3>Real-World Applications</h3>
            <p>This technology could be used by:</p>
            <ul>
              <li>
                <strong>Educational platforms</strong> like Khan Academy or Coursera to recommend appropriate content
              </li>
              <li>
                <strong>Publishers</strong> to automatically categorize books and articles
              </li>
              <li>
                <strong>Content creators</strong> to ensure their writing reaches the intended audience
              </li>
              <li>
                <strong>Libraries and schools</strong> to organize reading materials by difficulty
              </li>
            </ul>
          </div>

          <div className="project-section">
            <h2>Part 1: Bag-of-Words Classification</h2>

            <h3>1A: Bag-of-Words Design Decision</h3>
            <p>
              To convert each passage into numerical features for classification, we used a Bag-of-Words (BoW)
              representation implemented via scikit-learn&apos;s <code>TfidfVectorizer</code>, which uses TF-IDF
              features instead of counts or binary values to improve our AUROC value.
            </p>
            <p>
              As a preprocessing step, we made all text lowercase and used the vectorizer&apos;s built-in tokenizer to
              handle punctuation. To reduce noise and improve generalization, we excluded stopwords by setting{' '}
              <code>stop_words='english'</code> and applied document frequency thresholds (<code>min_df=3</code>,{' '}
              <code>max_df=0.8</code>). We used unigrams, removed non-alphanumeric characters with a regex token
              pattern, and tuned TF settings to prevent very frequent words from dominating the representation.
            </p>
            <p>
              Our final vocabulary size was 9,414 terms. Since <code>TfidfVectorizer</code> builds vocabulary solely
              from training data, any out-of-vocabulary words in the test set are ignored automatically at prediction
              time.
            </p>

            <h3>1B: Cross Validation Design</h3>
            <p>
              We used 5-fold cross-validation via <code>GridSearchCV</code> with AUROC on the train set as the primary
              optimization metric. Data was randomly shuffled into five folds (~80% train, 20% validation each).
            </p>
            <p>
              After identifying the best regularization strength (<code>C = 0.001</code>) via mean AUROC across folds,
              we refit a final model on the entire training set and used it to generate predictions for the test set.
            </p>

            <h3>1C: Hyperparameter Selection for Logistic Regression</h3>
            <p>
              We used Logistic Regression with L2 regularization on top of the BoW features. Logistic Regression works
              well on high-dimensional, sparse data and provides probabilistic outputs, which are useful when evaluating
              AUROC.
            </p>
            <p>
              We tuned the inverse regularization strength <code>C</code> over a logarithmically spaced grid from{' '}
              <code>1e-4</code> to <code>1e4</code>. The best performance was achieved with <code>C = 0.001</code>,
              yielding a mean AUROC of ~0.724 on the held-out validation folds.
            </p>

            <div className="project-image">
              <img
                src="/static/images/projects/nlp-pipeline/logistic-regression.jpg"
                alt="Logistic Regression performance chart"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Logistic Regression Performance</h3>
                <p>AUROC performance across different C values showing optimal regularization at C = 0.001.</p>
              </div>
            </div>

            <h3>1D: Analysis of Predictions</h3>
            <p>
              Our classifier showed a mild bias toward predicting the lower-level class. The confusion matrix revealed
              higher true negatives than true positives, meaning it was slightly more conservative about labeling texts
              as upper-level.
            </p>
            <div className="project-image">
              <img
                src="/static/images/projects/nlp-pipeline/confusion-matrix.jpg"
                alt="Confusion matrix for Bag-of-Words model"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Confusion Matrix – Bag-of-Words</h3>
                <p>Confusion matrix showing a bias toward lower-level class predictions.</p>
              </div>
            </div>
            <p>
              The model struggled most with literary or abstract authors like Franz Kafka and Thomas Hardy, whose
              writing relies heavily on metaphor and complex structure. It performed best on simpler, children&apos;s
              literature where vocabulary and syntax are more straightforward.
            </p>

            <h3>1E: Test Performance</h3>
            <p>
              Using the final pipeline with <code>C = 0.001</code>, our leaderboard AUROC was 0.67605—slightly lower
              than our CV estimate (~0.724), suggesting mild overestimation, but still demonstrating solid
              generalization.
            </p>
          </div>

          <div className="project-section">
            <h2>Part 2: Open-Ended Challenge with BERT</h2>

            <h3>2A: Feature Representation</h3>
            <p>
              For Problem 2, we used BERT-based document embeddings provided as dense feature vectors. Each passage was
              represented by a high-dimensional embedding capturing contextual meaning, rather than simple word counts.
            </p>

            <h3>2B: Cross Validation</h3>
            <p>
              We used <code>RandomizedSearchCV</code> with 5-fold stratified CV to tune a Random Forest classifier on
              top of the BERT embeddings. Randomized search reduced training time compared to an exhaustive grid search.
            </p>

            <h3>2C: Random Forest with Hyperparameter Search</h3>
            <p>
              We chose Random Forest for its effectiveness and interpretability with dense vectors. We tuned{' '}
              <code>max_depth</code> over a range of values with fixed settings for other hyperparameters and selected
              the configuration that maximized AUROC.
            </p>
            <p>
              The best model achieved a validation AUROC of 0.7262, with performance peaking around{' '}
              <code>max_depth = 10</code> before declining slightly due to overfitting at larger depths.
            </p>

            <div className="project-image">
              <img
                src="/static/images/projects/nlp-pipeline/rf-random-search.jpg"
                alt="Random Forest hyperparameter tuning results"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Random Forest Performance</h3>
                <p>AUROC vs. max_depth showing optimal depth around 10 when using BERT embeddings.</p>
              </div>
            </div>

            <h3>2D: Error Analysis</h3>
            <p>
              The Random Forest model showed a slight bias toward the upper-level class, with higher recall for
              difficult texts. This contrasted with the BoW model&apos;s bias toward lower-level predictions and
              highlighted how richer features can shift model behavior.
            </p>
            <div className="project-image">
              <img
                src="/static/images/projects/nlp-pipeline/rf-confusion-matrix.jpg"
                alt="Confusion matrix for BERT-based model"
                loading="lazy"
              />
              <div className="image-caption">
                <h3>Confusion Matrix – BERT</h3>
                <p>Confusion matrix showing a bias toward upper-level class predictions.</p>
              </div>
            </div>

            <h3>2E: Test Performance</h3>
            <p>
              Our final BERT + Random Forest model achieved a leaderboard AUROC of 0.71989, a strong improvement over
              the BoW + Logistic Regression model (0.67605). This reinforced a key lesson:{' '}
              <strong>better features can matter more than switching models</strong>.
            </p>
          </div>

          <div className="project-section">
            <h2>Key Insights &amp; Learnings</h2>
            <ul>
              <li>
                <strong>Feature Engineering Impact:</strong> BERT embeddings significantly outperformed traditional
                Bag-of-Words approaches.
              </li>
              <li>
                <strong>Model Selection:</strong> Random Forest worked better with dense BERT features than Logistic
                Regression.
              </li>
              <li>
                <strong>Hyperparameter Tuning:</strong> Cross-validation and search strategies were crucial for optimal
                performance.
              </li>
              <li>
                <strong>Bias Analysis:</strong> Different models exhibited different biases toward reading levels.
              </li>
              <li>
                <strong>Author Analysis:</strong> Literary and abstract authors were more challenging to classify
                accurately.
              </li>
              <li>
                <strong>Performance Improvement:</strong> Better features had greater impact than model tweaking alone.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NLPipeline

