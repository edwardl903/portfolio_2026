import ClickableExpandableImage from '../../components/ClickableExpandableImage'
import ProjectNav from '../../components/ProjectNav'

function NlpPipeline() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <ClickableExpandableImage
              src="/static/images/projects/nlp-pipeline/nlp-pipeline-project.jpg"
              alt="NLP reading level classifier"
              caption="Reading level classifier"
            >
              <img
                src="/static/images/projects/nlp-pipeline/nlp-pipeline-project.jpg"
                alt="NLP reading level classifier"
                loading="lazy"
              />
            </ClickableExpandableImage>
          </div>
          <div className="project-info">
            <h1>Reading Level Classifier</h1>
            <p className="project-description">
              I wanted a straight answer on whether you can guess reading difficulty from raw text without hand labeling
              every paragraph forever. This project scores passages as easier vs harder to read, then compares a fast
              bag-of-words pipeline against BERT embeddings plus a tree model. I leaned on AUROC and confusion matrices
              because accuracy alone hides the messy cases. Full write-up is in the PDF if you want every table and
              citation.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">scikit-learn</span>
              <span className="tech-tag">TF-IDF</span>
              <span className="tech-tag">Logistic Regression</span>
              <span className="tech-tag">BERT</span>
              <span className="tech-tag">Random Forest</span>
              <span className="tech-tag">RandomizedSearchCV</span>
              <span className="tech-tag">5-fold CV</span>
            </div>
            <div className="project-links">
              <a
                href="/static/images/projects/nlp-pipeline/nlp-pipeline-project.pdf"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-file-pdf" /> Download report
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>What I actually built</h2>
            <p>
              End to end it is the usual ML story: clean text, vectorize, cross validate, tune hyperparameters, then
              hold out a test set and stare at the confusion matrix until it makes sense. How little the fancy model
              moved the headline number until the features changed is the real takeaway. Literary and abstract authors
              stayed the headache in both setups, which tells you the label is partly about style and not just word
              rarity.
            </p>
          </div>

          <div className="project-section">
            <h2>Part 1: TF-IDF and logistic regression</h2>
            <p>
              I started with <code>TfidfVectorizer</code>, five fold CV, and L2 logistic regression. Swept the
              regularization strength <code>C</code> and tracked mean CV AUROC. The sweet spot landed around{' '}
              <code>C = 0.001</code> with validation AUROC near 0.724, but test AUROC dropped to 0.676, so the linear
              model was doing a bit of happy fitting on the folds. It also leaned toward predicting the lower reading
              level more often than the upper bucket.
            </p>
            <div className="project-figure-grid">
              <div className="project-figure-item">
                <h3>Mean CV AUROC vs C</h3>
                <p>
                  This is the sweep that justified the <code>C</code> I used for the final BoW model. Click to enlarge
                  if the axis labels are tiny.
                </p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/nlp-pipeline/nlp-lr-mean-cv-auroc-vs-c.png"
                    alt="Mean cross-validated AUROC versus regularization C for logistic regression"
                    caption="Mean CV AUROC vs C (logistic regression)"
                  >
                    <img
                      src="/static/images/projects/nlp-pipeline/nlp-lr-mean-cv-auroc-vs-c.png"
                      alt="Mean cross-validated AUROC versus regularization C for logistic regression"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
              <div className="project-figure-item">
                <h3>Confusion matrix</h3>
                <p>Where the BoW model swaps the two levels, especially on harder prose.</p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/nlp-pipeline/nlp-lr-confusion-matrix.jpg"
                    alt="Confusion matrix for Bag-of-Words model"
                    caption="Bag-of-Words confusion matrix"
                  >
                    <img
                      src="/static/images/projects/nlp-pipeline/nlp-lr-confusion-matrix.jpg"
                      alt="Confusion matrix for Bag-of-Words model"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>Part 2: BERT embeddings and random forest</h2>
            <p>
              For the second pass I used precomputed BERT document vectors and a random forest tuned with{' '}
              <code>RandomizedSearchCV</code>. Validation AUROC peaked near 0.726 at <code>max_depth = 10</code>, and test
              AUROC came in at 0.720, so the denser representation mostly closed the generalization gap I saw with
              TF-IDF. Same confusion matrix habit: it still confuses some authors, but the errors look a little less
              one-sided.
            </p>
            <div className="project-figure-grid">
              <div className="project-figure-item">
                <h3>Validation AUROC vs max depth</h3>
                <p>
                  Random forest depth on the x axis, AUROC on the y axis. Useful sanity check that I was not chasing
                  noise past the elbow.
                </p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/nlp-pipeline/nlp-rf-auroc-vs-max-depth.png"
                    alt="Random forest validation AUROC versus max tree depth"
                    caption="Random forest AUROC vs max_depth"
                  >
                    <img
                      src="/static/images/projects/nlp-pipeline/nlp-rf-auroc-vs-max-depth.png"
                      alt="Random forest validation AUROC versus max tree depth"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
              <div className="project-figure-item">
                <h3>Confusion matrix</h3>
                <p>BERT plus trees after tuning. Compare cell balance to the BoW matrix above.</p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/nlp-pipeline/nlp-rf-confusion-matrix.jpg"
                    alt="Confusion matrix for BERT-based random forest model"
                    caption="BERT + Random Forest confusion matrix"
                  >
                    <img
                      src="/static/images/projects/nlp-pipeline/nlp-rf-confusion-matrix.jpg"
                      alt="Confusion matrix for BERT-based random forest model"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>What stuck with me</h2>
            <p>
              Better features beat incremental model drama here. BERT did not blow the doors off on AUROC, but it
              behaved more honestly on the test split. Both models kept tripping on the same passages, which is
              a good reminder that metrics are only as clean as the definition of &quot;reading level&quot; you started
              with.
            </p>
          </div>

          <ProjectNav currentId="nlp-pipeline" />
        </div>
      </div>
    </section>
  )
}

export default NlpPipeline
