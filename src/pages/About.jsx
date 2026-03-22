import { useState } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from '../components/Lightbox'

function About() {
  const [lightbox, setLightbox] = useState(null) // { src, alt, caption }

  const open = (src, alt, caption = '') => setLightbox({ src, alt, caption })
  const close = () => setLightbox(null)

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>

        {/* Intro: text left, portrait stack right */}
        <div className="about-intro">
          <div className="about-text">
            <p>Hi, I'm Edward Lai. I work as a Data Analyst at <a href="https://www.curaleaf.com" target="_blank" rel="noopener noreferrer">Curaleaf Holdings Inc.</a>, where I turn complex datasets into decisions that actually matter. Previously I was a Data Analyst at <a href="https://www.fidelity.com" target="_blank" rel="noopener noreferrer">Fidelity Investments</a>, a Data Operations Intern at <a href="https://pison.com" target="_blank" rel="noopener noreferrer">Pison Technology</a>, and did research at the <a href="https://hci.cs.tufts.edu" target="_blank" rel="noopener noreferrer">Tufts HCI Lab</a> and <a href="https://sites.tufts.edu/idea/" target="_blank" rel="noopener noreferrer">Tufts IDEA Lab</a>.</p>

            <p>I grew up north of Boston with my family of six and our dog Charlie. I have a twin brother. Outside of work you'll find me playing pickleball, practicing <Link to="/hobbies/piano" className="hobby-link-inline">piano</Link>, playing <Link to="/hobbies/chess" className="hobby-link-inline">chess</Link>, or out on the mountain snowboarding.</p>

            <div className="personal-motto">
              <blockquote>
                <p>"I do believe in the power of story. I believe that stories have an important role to play in the formation of human beings, that they can stimulate, amaze and inspire their listeners."</p>
                <cite><a href="https://en.wikipedia.org/wiki/Hayao_Miyazaki" target="_blank" rel="noopener noreferrer">Hayao Miyazaki</a></cite>
              </blockquote>
            </div>
          </div>

          <div className="about-portrait-stack">
            <div
              className="portrait-main-wrap lb-trigger"
              onClick={() => open('/static/images/about/edward-portrait.jpg', 'Edward Lai', 'Edward Lai')}
            >
              <img src="/static/images/about/edward-portrait.jpg" alt="Edward Lai" loading="lazy" />
              <span className="lb-expand-icon"><i className="fas fa-expand"></i></span>
            </div>
            <div
              className="portrait-pet-wrap lb-trigger"
              onClick={() => open('/static/images/about/charlie-dog.jpg', 'Charlie the Dog', 'Charlie')}
            >
              <img src="/static/images/about/charlie-dog.jpg" alt="Charlie the Dog" loading="lazy" />
              <span className="portrait-label">Charlie</span>
              <span className="lb-expand-icon"><i className="fas fa-expand"></i></span>
            </div>
          </div>
        </div>

        {/* Photo essay mosaic */}
        <div className="photo-essay">
          <p className="photo-essay-label">Life outside work</p>
          <div className="photo-grid">
            <div
              className="pg-item pg-wide lb-trigger"
              onClick={() => open('/static/images/about/family-photo.jpg', 'The Lai Family', 'The Lai Family, Tufts Graduation')}
            >
              <img src="/static/images/about/family-photo.jpg" alt="The Lai Family" loading="lazy" />
              <span className="pg-caption">The Lai Family, Tufts Graduation</span>
              <span className="lb-expand-icon"><i className="fas fa-expand"></i></span>
            </div>
            <div
              className="pg-item pg-tall lb-trigger"
              onClick={() => open('/static/images/about/graduation-friends.jpg', 'Graduation with Friends', 'Friends')}
            >
              <img src="/static/images/about/graduation-friends.jpg" alt="Graduation with Friends" loading="lazy" />
              <span className="pg-caption">Friends</span>
              <span className="lb-expand-icon"><i className="fas fa-expand"></i></span>
            </div>
            <div
              className="pg-item lb-trigger"
              onClick={() => open('/static/images/about/mount-washington.jpg', 'Mount Washington Climb', 'Mount Washington, NH (6,300 ft)')}
            >
              <img src="/static/images/about/mount-washington.jpg" alt="Mount Washington Climb" loading="lazy" />
              <span className="pg-caption">Mount Washington, NH (6,300 ft)</span>
              <span className="lb-expand-icon"><i className="fas fa-expand"></i></span>
            </div>
            <div
              className="pg-item lb-trigger"
              onClick={() => open('/static/images/about/killington-snowboarding.jpg', 'Snowboarding at Killington', 'Killington, VT')}
            >
              <img src="/static/images/about/killington-snowboarding.jpg" alt="Snowboarding at Killington" loading="lazy" />
              <span className="pg-caption">Killington, VT</span>
              <span className="lb-expand-icon"><i className="fas fa-expand"></i></span>
            </div>
            <div
              className="pg-item pg-full lb-trigger"
              onClick={() => open('/static/images/about/sunday-river.JPG', 'Sunday River, ME', 'Sunday River, ME')}
            >
              <img src="/static/images/about/sunday-river.JPG" alt="Sunday River, ME" loading="lazy" />
              <span className="pg-caption">Sunday River, ME</span>
              <span className="lb-expand-icon"><i className="fas fa-expand"></i></span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="skills">
          <h3>Technical Skills</h3>
          <div className="skill-tags">
            <span>Python</span><span>SQL</span><span>BigQuery</span><span>GCP</span>
            <span>AWS</span><span>Azure</span><span>PySpark</span><span>Databricks</span>
            <span>PostgreSQL</span><span>MySQL</span><span>MongoDB</span><span>Flask</span>
            <span>Node.js</span><span>Git</span><span>Tableau</span><span>Power BI</span>
            <span>Machine Learning</span><span>ETL</span><span>Data Visualization</span>
          </div>
        </div>
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={close}
        />
      )}
    </section>
  )
}

export default About
