import ClickableExpandableImage from '../../components/ClickableExpandableImage'

function ETLTools() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <ClickableExpandableImage
              src="/static/images/projects/etl-tools/pison-technology.jpg"
              alt="Pison Technology data operations and ETL"
              caption="Pison Technology ETL"
            >
              <img
                src="/static/images/projects/etl-tools/pison-technology.jpg"
                alt="Pison Technology data operations and ETL"
                loading="lazy"
              />
            </ClickableExpandableImage>
          </div>
          <div className="project-info">
            <h1>Pison Technology ETL</h1>
            <p className="project-description">
              I was a Data Operations intern at{' '}
              <a href="https://pison.com/" target="_blank" rel="noopener noreferrer">
                Pison
              </a>
              , a Boston company building a wrist worn wearable with serious real time sensors and performance
              expectations. My work sat between hardware testing and reporting: merge datasets in Python, chase bugs in
              staging data around new releases, wire movement from source systems into BigQuery for Looker Studio, and give
              the team dashboards they could actually use to compare test results across users and see whether things were
              getting better release over release.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Jupyter</span>
              <span className="tech-tag">BigQuery</span>
              <span className="tech-tag">Looker Studio</span>
              <span className="tech-tag">ETL</span>
              <span className="tech-tag">REST APIs</span>
              <span className="tech-tag">Staging QA</span>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>What the product is</h2>
            <p>
              My job was data paths and QA, not firmware, but it helps to see what all those tens of thousands of test rows
              were about. Pison markets a neural focused wearable platform (mind and body metrics, sleep, readiness, and
              similar signals). The renders below are straight from their public marketing site so you get the same visual
              context a visitor would see on{' '}
              <a href="https://pison.com/" target="_blank" rel="noopener noreferrer">
                pison.com
              </a>
              . All rights stay with Pison; I am hosting copies here only as a quick visual anchor for this write up.
            </p>
            <div className="project-figure-grid">
              <div className="project-figure-item">
                <h3>Hardware render</h3>
                <p>Public product shot from Pison&apos;s site (device angle).</p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/etl-tools/pison-official-device-render.png"
                    alt="Pison wrist wearable product render from pison.com"
                    caption="Pison device (official render)"
                  >
                    <img
                      src="/static/images/projects/etl-tools/pison-official-device-render.png"
                      alt="Pison wrist wearable product render from pison.com"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
              <div className="project-figure-item">
                <h3>Product and app</h3>
                <p>Marketing still from their PDP assets (band plus app surface).</p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/etl-tools/pison-official-app-product.png"
                    alt="Pison product and companion app from pison.com marketing"
                    caption="Pison product and app (official)"
                  >
                    <img
                      src="/static/images/projects/etl-tools/pison-official-app-product.png"
                      alt="Pison product and companion app from pison.com marketing"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
              <div className="project-figure-item">
                <h3>Mind and body positioning</h3>
                <p>Lifestyle frame from the same homepage narrative (physiological and cognitive performance).</p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/etl-tools/pison-official-health-lifestyle.jpg"
                    alt="Pison health and performance lifestyle image from pison.com"
                    caption="Pison health story (official)"
                  >
                    <img
                      src="/static/images/projects/etl-tools/pison-official-health-lifestyle.jpg"
                      alt="Pison health and performance lifestyle image from pison.com"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>What the job looked like</h2>
            <p>
              Lab and field tests generate a lot of semi structured output, and every new feature meant another chance for
              staging tables to disagree with what production would eventually see. A normal analysis run sat on tens of
              thousands of test records and often north of fifty columns, so the boring part of the job was getting the
              grain right. I spent a lot of time mapping primary keys and foreign keys, validating join logic in Python, and
              triple checking that a merge did not quietly duplicate rows or drop sessions.
            </p>
            <p>
              When joins looked off or a test pattern did not match what engineering expected, I wrote it up clearly:
              repro steps, which tables and keys I used, and whether it smelled like a pipeline bug, bad hardware data, or
              a real product regression. Half the value was making unexpected test results legible to people who were not
              in the notebook with me.
            </p>
            <p>
              I still merged databases, cleaned columns, dropped duplicates, and debugged notebooks or small services when
              a step failed or returned nonsense. When something broke, it was usually a mix of schema drift, a bad join, or
              an API edge case, so I got comfortable reading logs and reproducing in Jupyter before touching the
              microservice in front of the data store.
            </p>
          </div>

          <div className="project-section">
            <h2>What I shipped</h2>
            <ul>
              <li>
                Python merges across datasets so test and internal sources could be joined consistently for analysis and
                release checks, with explicit attention to primary and foreign keys at tens of thousands of rows per slice
                and schemas with fifty plus columns.
              </li>
              <li>
                Investigation and fixes for data bugs tied to staging databases, new features, and release candidates
                (bad rows, wrong keys, timing issues after schema changes).
              </li>
              <li>
                Scripts to move data from A to B and hook cleanly into BigQuery as the reporting layer for downstream
                charts and shared definitions.
              </li>
              <li>
                Help with hands on data collection workflows where the team needed reliable capture before anything hit the
                warehouse.
              </li>
              <li>
                Looker Studio dashboards so people outside my immediate team could compare user level test scores,
                spot regressions, and track improvement without opening a notebook every time.
              </li>
            </ul>
          </div>

          <div className="project-section">
            <h2>What stuck</h2>
            <p>
              When the hardware is sensitive and the product is real time, the data path has to be boring on purpose. I
              still think about that balance: enough logging and tests that trust holds, without slowing down people who
              are trying to ship hardware, not a dissertation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ETLTools
