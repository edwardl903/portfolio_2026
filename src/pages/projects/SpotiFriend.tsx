import ClickableExpandableImage from '../../components/ClickableExpandableImage'
import ProjectNav from '../../components/ProjectNav'

function SpotiFriend() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <ClickableExpandableImage
              src="/static/images/projects/spotifriend/spotifriend-project.jpg"
              alt="SpotiFriend Spotify pipeline"
              caption="SpotiFriend"
            >
              <img
                src="/static/images/projects/spotifriend/spotifriend-project.jpg"
                alt="SpotiFriend Spotify pipeline"
                loading="lazy"
              />
            </ClickableExpandableImage>
          </div>
          <div className="project-info">
            <h1>SpotiFriend</h1>
            <p className="project-description">
              I wanted my Spotify history in a place I could query with SQL instead of only inside the app. SpotiFriend is
              a small personal pipeline: pull listening data with the Web API (PKCE), land partitioned JSONL in S3, let
              Glue catalog it, run Athena when I am curious, and lean on QuickSight when I want charts without another
              side project frontend. No flashy product site, just scheduled ETL and a data lake shaped around my own
              account.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Spotify Web API</span>
              <span className="tech-tag">PKCE</span>
              <span className="tech-tag">AWS S3</span>
              <span className="tech-tag">AWS Lambda</span>
              <span className="tech-tag">AWS Glue</span>
              <span className="tech-tag">Amazon Athena</span>
              <span className="tech-tag">Amazon QuickSight</span>
              <span className="tech-tag">EventBridge</span>
              <span className="tech-tag">pandas</span>
              <span className="tech-tag">Boto3</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/edwardl903/spotify-etl"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" /> Code
              </a>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>What it actually does</h2>
            <p>
              On a schedule, a Python job authenticates with Spotify, grabs the slices I care about (top tracks, recently
              played, playlists, that kind of thing), and writes append friendly files into S3. Partitions keep the object
              list sane as the history grows into tens of thousands of track rows. Glue stays the boring source of truth
              for schemas so Athena stops being guesswork, and QuickSight sits on top when I want visuals without wiring
              another Flask app.
            </p>
          </div>

          <div className="project-section">
            <h2>How the pieces fit</h2>
            <p>
              Lambda runs the extraction and light transforms, EventBridge is the alarm clock, S3 is the lake, Glue is the
              catalog, Athena is the ad hoc SQL layer, QuickSight is the BI exit ramp. Spotipy plus boto3 in practice, with
              pandas when I need to reshape before land. Order of operations is dull on purpose: Spotify API, then Python
              on Lambda, then S3 partitions, then Glue so Athena sees stable columns, then whatever chart or query I want
              that week.
            </p>
            <p>
              EventBridge fires the Lambda on a cadence so I never rely on remembering to run a script. PKCE keeps the
              OAuth refresh story tolerable without hosting a full auth service. Serverless billing matches how often I
              actually need fresh pulls, bursts instead of an always on box.
            </p>
            <ul>
              <li>OAuth with PKCE so the refresh story stays sane for a long running personal integration.</li>
              <li>Partitioned JSONL in S3 so time range queries stay cheap and predictable.</li>
              <li>Glue crawler and tables so downstream SQL sees stable column names even when Spotify tweaks payloads.</li>
            </ul>
          </div>

          <div className="project-section">
            <h2>What stuck</h2>
            <p>
              The interesting part was not the chart types, it was getting partitions and Glue tables boring enough that
              Athena queries stayed fast six months later. Personal pipelines still deserve the same hygiene as prod ones,
              just smaller blast radius when I break something.
            </p>
          </div>

          <ProjectNav currentId="spotifriend" />
        </div>
      </div>
    </section>
  )
}

export default SpotiFriend
