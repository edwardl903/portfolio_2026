function Resume() {
  return (
    <section id="resume" className="resume">
      <div className="container">
        <h2>Resume</h2>
        <div className="resume-download">
          <a href="/static/images/resume/EdwardLai_DataEnthusiast_Resume2025.pdf" className="resume-download-btn" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-download"></i>
            Download Full Resume (PDF)
          </a>
        </div>
        
        <div className="resume-embed">
          <iframe src="/static/images/resume/EdwardLai_DataEnthusiast_Resume2025.pdf" width="100%" height="800px" frameBorder="0" title="Resume PDF"></iframe>
        </div>
      </div>
    </section>
  )
}

export default Resume

