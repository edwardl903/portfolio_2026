import { Link } from 'react-router-dom'

function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-intro">
            <div className="about-text">
              <p>Hi, I'm Edward Lai! I'm a data engineer and data analyst passionate about transforming complex data into actionable insights. I thrive on solving challenging problems across diverse domains and love staying current with the latest technologies. Whether it's building ETL pipelines, creating dashboards, or developing machine learning models, I enjoy every aspect of working with data.</p>
                          
              <p>I currently work as a Data Analyst at <a href="https://www.curaleaf.com" target="_blank" rel="noopener noreferrer">Curaleaf Holdings Inc.</a> Previously, I was a Data Analyst at <a href="https://www.fidelity.com" target="_blank" rel="noopener noreferrer">Fidelity Investments</a>, a Data Operations Intern at <a href="https://pison.com" target="_blank" rel="noopener noreferrer">Pison Technology</a>, and I gained research experience at the <a href="https://hci.cs.tufts.edu" target="_blank" rel="noopener noreferrer">Tufts HCI Lab</a> and <a href="https://sites.tufts.edu/idea/" target="_blank" rel="noopener noreferrer">Tufts IDEA Lab</a>.</p>
                          
              <p>I grew up in the suburbs north of Boston with my family of 6 and our dog Charlie. Fun fact: I have a twin brother! When I'm not coding, you'll likely find me playing pickleball or exploring one of my many hobbies. I'm passionate about staying active and learning new skills. Some of my favorite activities include <Link to="/hobbies/piano" className="hobby-link-inline">Piano</Link>, <Link to="/hobbies/chess" className="hobby-link-inline">Chess</Link>, <Link to="/hobbies/volleyball" className="hobby-link-inline">Volleyball</Link>, <Link to="/hobbies/skateboarding" className="hobby-link-inline">Skateboarding</Link>, snowboarding, rock climbing, hiking, biking, squash, badminton, word and board games, and going to the gym.</p>
                          
              <div className="personal-motto">
                <blockquote>
                  <p>"I do believe in the power of story. I believe that stories have an important role to play in the formation of human beings, that they can stimulate, amaze and inspire their listeners."</p>
                  <cite>— <a href="https://en.wikipedia.org/wiki/Hayao_Miyazaki" target="_blank" rel="noopener noreferrer">Hayao Miyazaki</a>, Studio Ghibli (adapted to my data storytelling approach)</cite>
                </blockquote>
              </div>
            </div>
            <div className="about-photos">
              <div className="photo-card">
                <img src="/static/images/about/edward-portrait.jpg" alt="Edward Lai" className="main-photo" loading="lazy" />
                <p className="photo-caption">Edward Lai</p>
              </div>
              <div className="photo-card">
                <img src="/static/images/about/charlie-dog.jpg" alt="Charlie the Dog" className="pet-photo" loading="lazy" />
                <p className="photo-caption">Charlie 🐕</p>
              </div>
            </div>
          </div>
          
          <div className="adventure-cards">
            <div className="adventure-card">
              <img src="/static/images/about/family-photo.jpg" alt="The Lai Family" loading="lazy" />
              <div className="adventure-content">
                <h4>The Lai Family</h4>
                <p>My twin brother and I graduating from Tufts University! I'm the one on the left. My older brother and older sister are on the right, and my parents are on the left.</p>
              </div>
            </div>
            
            <div className="adventure-card">
              <img src="/static/images/about/graduation-friends.jpg" alt="Graduation with Friends" loading="lazy" />
              <div className="adventure-content">
                <h4>Friends</h4>
                <p>My friends and I graduating from Tufts! Celebrated four amazing years of learning, growth, and unforgettable memories together.</p>
              </div>
            </div>
          </div>
          
          <div className="adventure-cards">
            <div className="adventure-card">
              <img src="/static/images/about/mount-washington.jpg" alt="Mount Washington Climb" loading="lazy" />
              <div className="adventure-content">
                <h4>Mount Washington, NH</h4>
                <p>My favorite hike! Started the day at 6:00 AM, 3-hour drive there, 4-hour hike up and 4-hour hike down, 3-hour drive back. Climbed elevation of 6,300 feet!</p>
              </div>
            </div>
            
            <div className="adventure-card">
              <div className="img-rotate-ccw-wrapper">
                <img src="/static/images/about/killington-snowboarding.jpg" alt="Snowboarding at Killington" className="img-rotate-ccw" loading="lazy" />
              </div>
              <div className="adventure-content">
                <h4>Mount Killington, VT</h4>
                <p>Snowboarding at Killington "The Beast of the East"! Spent a week snowboarding with friends and conquered a bunch of blues and blacks.</p>
              </div>
            </div>
            
            <div className="adventure-card">
              <img src="/static/images/about/sunday-river.JPG" alt="White Cap Peak, ME" loading="lazy" />
              <div className="adventure-content">
                <h4>Mount White Cap, ME</h4>
                <p>Went on a snowboarding trip to Sunday River in Maine! Spent the weekend exploring the mountain's diverse terrain and enjoying the beautiful New England winter scenery.</p>
              </div>
            </div>
          </div>
          
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
      </div>
    </section>
  )
}

export default About

