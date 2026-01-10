import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'

function Home() {
  const roles = [
    "I am a Data Enthusiast",
    "I am a Data Explorer", 
    "I am a Data Storyteller",
  ]
  const typewriterText = useTypewriter(roles, 100)

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Edward Lai</h1>
            <h2 className="hero-subtitle">Data Engineer & Data Analyst</h2>
            <div className="typewriter-container">
              <span className="typewriter-text">{typewriterText}</span>
            </div>
            <p>Tufts University Graduate | Computer Science & Human Factors Engineering | Building scalable data solutions and turning insights into meaningful action</p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">View Projects</Link>
              <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/static/images/profile-picture.jpg" alt="Edward Lai" />
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  )
}

export default Home

