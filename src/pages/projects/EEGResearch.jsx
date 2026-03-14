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
              I contributed to a published study that used the MUSE 2 consumer EEG headband to tell different
              cognitive tasks apart (e.g. chess puzzles, memory games, visual rotation). The goal was to see whether
              low-cost hardware could support serious brain–computer interface research.
            </p>
          </div>

          <div className="project-section">
            <h2>My Role</h2>
            <ul>
              <li>Helped design the protocol and select tasks</li>
              <li>Ran participants, managed MUSE 2 setup, and kept data quality high</li>
              <li>Contributed to signal cleaning, linear mixed-effects models, and visualizations</li>
              <li>Helped implement ML models that predict task type from EEG features</li>
            </ul>
          </div>

          <div className="project-section">
            <h2>Findings</h2>
            <p>
              The MUSE 2 could reliably distinguish between tasks and workload levels. Our classifiers predicted
              whether someone was doing chess puzzles, memory tasks, or other activities from EEG alone, suggesting
              consumer EEG is viable for research and future adaptive systems.
            </p>
          </div>

          <div className="project-section">
            <h2>Publication</h2>
            <p>
              <strong>Title:</strong> Neural Signatures Within and Between Chess Puzzle Solving and Standard Cognitive
              Tasks for Brain-Computer Interfaces: A Low-Cost Electroencephalography Study
            </p>
            <p>
              <strong>Authors:</strong> Russell, Matthew; Youkeles, Samuel; Xia, William; Zheng, Kenny; Shah, Aman;
              Jacob, Robert J. K. I was not listed as an author but was involved in design, data collection, analysis,
              and visualization.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EEGResearch

