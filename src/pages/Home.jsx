import { Link } from 'react-router-dom'
import ClickableExpandableImage from '../components/ClickableExpandableImage'

function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-eyebrow">Data Analyst</p>
            <h1 className="hero-title">Edward<br />Lai</h1>
            <p className="hero-tagline">Tufts University &middot; Computer Science &amp; Human Factors</p>
            <p className="hero-bio">I turn raw data into clear answers through dashboards, SQL, and analysis that helps teams make better decisions. Currently at <strong>Curaleaf Holdings Inc</strong>.</p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">View Projects</Link>
              <Link to="/about" className="btn btn-secondary">About Me</Link>
            </div>
          </div>
          <div className="hero-image">
            <ClickableExpandableImage
              src="/static/images/home/profile-picture.jpg"
              alt="Edward Lai"
              caption="Edward Lai"
              className="hero-photo-card"
            >
              <img src="/static/images/home/profile-picture.jpg" alt="Edward Lai" />
            </ClickableExpandableImage>
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
