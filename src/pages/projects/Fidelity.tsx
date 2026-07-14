import ClickableExpandableImage from '../../components/ClickableExpandableImage'
import ProjectNav from '../../components/ProjectNav'

function Fidelity() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <ClickableExpandableImage
              src="/static/images/projects/etl-tools/etl-tools-project.jpg"
              alt="Fidelity PB Optimize user behavior analysis"
              caption="Fidelity PB Optimize analysis"
            >
              <img
                src="/static/images/projects/etl-tools/etl-tools-project.jpg"
                alt="Fidelity PB Optimize user behavior analysis"
                loading="lazy"
              />
            </ClickableExpandableImage>
          </div>
          <div className="project-info">
            <h1>Fidelity PB Optimize User Behavior Analysis</h1>
            <p className="project-description">
              I spent a lot of time in the PB Optimize product trying to turn messy usage logs into something product and
              Customer Success could argue from. The job was less about one flashy model and more about reliable cuts of
              who was stuck where, which features actually moved engagement, and how to show that in tools people already
              opened. NDA still applies to the specifics, but the shape of the work is below.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Looker</span>
              <span className="tech-tag">Power BI</span>
              <span className="tech-tag">Tableau</span>
              <span className="tech-tag">Excel</span>
              <span className="tech-tag">Figma</span>
              <span className="tech-tag">Analytics</span>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>What I was solving for</h2>
            <p>
              Product needed a clearer picture of real workflows, not just page hits. Customer Success wanted backup when
              clients asked why something felt slow or underused. I stayed close to both sides so the dashboards and
              slices stayed honest about what the data could and could not say.
            </p>
          </div>

          <div className="project-section">
            <h2>What I actually did</h2>
            <ul>
              <li>
                Dug through usage analytics and drop off points, then sanity checked stories with Customer Success so we
                were not chasing ghosts in the logs.
              </li>
              <li>
                Built and iterated dashboards in Looker and Power BI, plus ad hoc views in Python and Excel when a
                one-off question did not deserve a full model.
              </li>
              <li>
                Shipped views for engagement KPIs, feature level usage, journey drop offs, and simple segment cuts by user
                type and tenure.
              </li>
              <li>
                Drew common user paths in Figma so PMs and CS had a shared picture of the flows behind the numbers.
              </li>
              <li>
                Combined tracking, engagement, and performance signals (for example page load) to look at sessions,
                feature co usage, and time of day patterns where it helped explain friction.
              </li>
            </ul>
          </div>

          <div className="project-section">
            <h2>What stuck</h2>
            <p>
              The win was getting stakeholders to trust one set of definitions long enough to act. Formal reports stayed
              under NDA, but the habit of pairing charts with a short narrative of limits and next questions carried over to
              every job after.
            </p>
          </div>

          <ProjectNav currentId="fidelity" />
        </div>
      </div>
    </section>
  )
}

export default Fidelity
