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
            <h2>Overview</h2>
            <p>
              I built an NLP pipeline that classifies text passages as easier or harder to read. The goal was to
              support use cases like leveling educational content. I compared two approaches: Bag-of-Words with
              Logistic Regression, and BERT embeddings with Random Forest. Success was measured with AUROC and
              confusion matrices.
            </p>
          </div>

          <div className="project-section">
            <h2>Part 1: Bag-of-Words</h2>
            <p>
              I used TF-IDF features (scikit-learn <code>TfidfVectorizer</code>), 5-fold CV, and Logistic Regression
              with L2. Best validation AUROC was around 0.724 at <code>C = 0.001</code>; test AUROC was 0.676. The
              model was slightly biased toward predicting lower-level; it struggled most on literary or abstract authors.
            </p>
            <div className="project-image">
              <img
                src="/static/images/projects/nlp-pipeline/confusion-matrix.jpg"
                alt="Confusion matrix for Bag-of-Words model"
                loading="lazy"
              />
              <div className="image-caption">
                <p>Confusion matrix for the Bag-of-Words classifier.</p>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>Part 2: BERT + Random Forest</h2>
            <p>
              I used precomputed BERT document embeddings and tuned a Random Forest with <code>RandomizedSearchCV</code>.
              Best validation AUROC was 0.726 at <code>max_depth = 10</code>; test AUROC was 0.720. Richer features
              improved results more than model tweaking alone.
            </p>
            <div className="project-image">
              <img
                src="/static/images/projects/nlp-pipeline/rf-confusion-matrix.jpg"
                alt="Confusion matrix for BERT-based model"
                loading="lazy"
              />
              <div className="image-caption">
                <p>Confusion matrix for the BERT + Random Forest classifier.</p>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>Takeaways</h2>
            <ul>
              <li>BERT embeddings outperformed Bag-of-Words for this task.</li>
              <li>Different models showed different prediction biases (lower vs. upper level).</li>
              <li>Literary and abstract texts were hardest to classify.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NLPipeline

