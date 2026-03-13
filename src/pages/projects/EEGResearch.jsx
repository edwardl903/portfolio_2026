function EEGResearch() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/eeg-research/research-lab-project.jpg"
              alt="EEG research lab"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>EEG Research Analysis</h1>
            <p className="project-description">
              Contributed to published research on neural signatures in chess puzzle solving and cognitive tasks using
              consumer-grade EEG devices.
            </p>
            <div className="project-tech">
              <span className="tech-tag">R</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Statistical Analysis</span>
              <span className="tech-tag">Data Visualization</span>
              <span className="tech-tag">Machine Learning</span>
              <span className="tech-tag">EEG Processing</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                <i className="fas fa-external-link-alt" /> Publication
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>Overview</h2>
            <p>
              I had the opportunity to contribute to a published research study exploring how consumer-grade EEG devices
              can detect different cognitive states. The study, titled &quot;Neural Signatures Within and Between Chess
              Puzzle Solving and Standard Cognitive Tasks for Brain-Computer Interfaces: A Low-Cost Electroencephalography
              Study,&quot; used the MUSE 2 headband to distinguish between tasks like chess puzzles, memory games, and
              visual rotation exercises.
            </p>
          </div>

          <div className="project-section">
            <h2>What I Did</h2>
            <ul>
              <li>
                <strong>Study Design:</strong> Helped design the experimental protocol and select cognitive tasks to
                elicit distinct neural signatures.
              </li>
              <li>
                <strong>Data Collection:</strong> Ran participants through experiments, ensured proper MUSE 2 setup, and
                maintained data quality.
              </li>
              <li>
                <strong>Statistical Analysis:</strong> Contributed to linear mixed-effects modeling to test whether EEG
                signals could reliably distinguish cognitive states.
              </li>
              <li>
                <strong>Visualization:</strong> Built charts and visual summaries to make complex EEG data
                interpretable.
              </li>
              <li>
                <strong>Machine Learning:</strong> Helped implement models that predict task type from EEG-derived
                features.
              </li>
            </ul>
          </div>

          <div className="project-section">
            <h2>How We Did It</h2>
            <div className="architecture-grid">
              <div className="arch-item">
                <h3>Mixed Cognitive Tasks</h3>
                <p>
                  We combined classic cognitive tests (e.g., memory and color–word matching) with chess puzzles to probe
                  different types of thinking.
                </p>
              </div>
              <div className="arch-item">
                <h3>Consumer-Grade EEG</h3>
                <p>
                  We used the MUSE 2—an affordable headband with EEG sensors—to record brain activity, testing whether
                  low-cost hardware could support serious research.
                </p>
              </div>
              <div className="arch-item">
                <h3>Statistical Modeling</h3>
                <p>
                  We used linear mixed-effects models to separate signal from noise and identify patterns linked to
                  specific tasks.
                </p>
              </div>
              <div className="arch-item">
                <h3>Machine Learning</h3>
                <p>
                  We trained models to predict which task a participant was performing based solely on their EEG
                  features.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>The Technical Work</h2>
            <ul>
              <li>
                <strong>Signal Cleaning:</strong> Filtered raw EEG signals, removed artifacts, and extracted meaningful
                features from noisy sensor data.
              </li>
              <li>
                <strong>Statistical Analysis:</strong> Used linear mixed-effects models to test for reliable differences
                between tasks and workload conditions.
              </li>
              <li>
                <strong>Visualization:</strong> Built time-series plots and summary charts to illustrate how brain
                activity changed across tasks.
              </li>
              <li>
                <strong>ML Modeling:</strong> Trained classifiers to distinguish between chess puzzles, memory tasks,
                and other cognitive activities based on EEG patterns.
              </li>
              <li>
                <strong>Validation:</strong> Helped verify that results were robust and reproducible across
                participants.
              </li>
            </ul>
          </div>

          <div className="project-section">
            <h2>Key Findings</h2>
            <div className="challenge-item">
              <h3>Consumer EEG Can Work</h3>
              <p>
                We found that the MUSE 2—a relatively inexpensive device—could reliably distinguish between different
                cognitive tasks and workload levels.
              </p>
              <p>
                <strong>Why it matters:</strong> This suggests that brain–computer interfaces don&apos;t always require
                expensive lab-grade equipment.
              </p>
            </div>
            <div className="challenge-item">
              <h3>Task Classification is Feasible</h3>
              <p>
                Our machine learning models were able to predict whether someone was performing chess puzzles, memory
                tasks, or other activities using EEG features.
              </p>
              <p>
                <strong>Why it matters:</strong> This opens the door to adaptive systems that respond to cognitive state
                in real time.
              </p>
            </div>
          </div>

          <div className="project-section">
            <h2>Why This Research Matters</h2>
            <ul>
              <li>Shows that affordable EEG devices can be useful for serious research.</li>
              <li>Demonstrates that different cognitive tasks generate distinguishable neural signatures.</li>
              <li>Highlights unique brain activity patterns during chess problem solving.</li>
              <li>Provides a foundation for practical brain–computer interface applications.</li>
            </ul>
          </div>

          <div className="project-section">
            <h2>About the Publication</h2>
            <p>
              <strong>Title:</strong> Neural Signatures Within and Between Chess Puzzle Solving and Standard Cognitive
              Tasks for Brain-Computer Interfaces: A Low-Cost Electroencephalography Study
            </p>
            <p>
              <strong>Authors:</strong> Russell, Matthew; Youkeles, Samuel; Xia, William; Zheng, Kenny; Shah, Aman;
              Jacob, Robert J. K.
            </p>
            <p>
              <strong>My Role:</strong> While I&apos;m not listed as an author (which is common in academic projects), I
              was actively involved in designing experiments, collecting data, running analyses, and building
              visualizations that made the results understandable.
            </p>
          </div>

          <div className="project-section">
            <h2>What Could Come Next</h2>
            <ul>
              <li>
                Brain–computer interfaces that work in everyday environments, not just labs.
              </li>
              <li>
                Combining EEG with other modalities to get richer, multimodal views of cognition.
              </li>
              <li>
                Adaptive software that responds to focus, fatigue, or cognitive load in real time.
              </li>
              <li>
                Clinical applications for monitoring cognitive function and recovery.</li>
              <li>
                Smarter ML models that capture increasingly subtle patterns in brain activity.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EEGResearch

