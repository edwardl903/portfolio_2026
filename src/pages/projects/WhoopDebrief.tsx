import { Link } from 'react-router-dom'
import ClickableExpandableImage from '../../components/ClickableExpandableImage'
import ProjectNav from '../../components/ProjectNav'

function WhoopDebrief() {
  return (
    <section className="project-detail">
      <div className="container">

        {/* ── Header ── */}
        <div className="project-header">
          <div className="project-image">
            <img
              src="/static/images/projects/whoop-debrief/whoop-debrief-cover.jpg"
              alt="WHOOP Debrief project cover"
              loading="lazy"
            />
          </div>
          <div className="project-info">
            <h1>WHOOP Debrief</h1>
            <p className="project-description">
              A personal data pipeline that pulls daily metrics from the WHOOP API and Strava,
              lands raw responses in BigQuery, transforms them with dbt, and serves the results
              as static JSON to this portfolio. The whole thing runs unattended every morning
              via GitHub Actions. No backend, no server costs, fully automated.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">BigQuery</span>
              <span className="tech-tag">dbt</span>
              <span className="tech-tag">GitHub Actions</span>
              <span className="tech-tag">Strava API</span>
              <span className="tech-tag">WHOOP API</span>
              <span className="tech-tag">OAuth 2.0</span>
              <span className="tech-tag">GCP</span>
              <span className="tech-tag">Incremental Models</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">REST APIs</span>
              <span className="tech-tag">jsDelivr CDN</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/edwardl903/whoop-analytics"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" /> Code
              </a>
              <a
                href="https://edwardl903.github.io/whoop-debrief/#!/overview"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-book" /> dbt docs
              </a>
              <Link to="/hobbies/running" className="project-link">
                <i className="fas fa-route" /> Live output
              </Link>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="project-content">

          {/* Why */}
          <div className="project-section">
            <h2>Why I built this</h2>
            <p>
              I have been wearing a WHOOP for a while and paying attention to recovery scores,
              but the app never showed me what I actually wanted to know: does running actually
              help my recovery, or is it just wrecking me? The app gives you a number every
              morning, but it does not let you slice it by what you did the day before.
            </p>
            <p>
              My sister got me into distance running in June 2026. I came from a sprinting
              background in high school track, so distance running was completely new territory.
              I wanted to use the data to understand my own body as I figured it out. That meant
              I needed the WHOOP data and the Strava GPS data in the same place so I could
              actually join them.
            </p>
            <p>
              I also wanted to build a project that looked like real data engineering, not just
              a notebook. That meant raw tables, a proper transform layer, incremental loads,
              tests, CI, and a serve layer I could actually point to.
            </p>
          </div>

          {/* Architecture */}
          <div className="project-section">
            <h2>How it works</h2>
            <p>
              The pipeline has three phases: ingest, transform, and serve. Every morning at
              06:00 UTC GitHub Actions kicks off two ingestion scripts, then runs the dbt job
              once both complete.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/whoop-debrief/pipeline-architecture.png"
                alt="WHOOP Debrief pipeline architecture: WHOOP API + Strava → BigQuery → dbt → GitHub Actions → static JSON → portfolio"
                caption="Pipeline architecture"
              >
                <img
                  src="/static/images/projects/whoop-debrief/pipeline-architecture.png"
                  alt="WHOOP Debrief pipeline architecture"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
              <div className="diagram-caption">
                <p>
                  Ingest runs <code>scripts/fetch.py</code> (WHOOP) and{' '}
                  <code>scripts/fetch_strava.py</code> (Strava) in parallel. Both write raw
                  API responses into <code>whoop_raw</code> in BigQuery. The dbt job runs
                  after both succeed, builds all models, runs tests, and checks source
                  freshness. If the Strava step fails the WHOOP pipeline still ships.
                </p>
              </div>
            </div>
          </div>

          {/* Ingest */}
          <div className="project-section">
            <h2>Ingest: two APIs, one pattern</h2>
            <p>
              WHOOP uses OAuth 2.0 with a rotating access token — it invalidates on every
              use, which is unusual and caused a lot of pain early on. The token refresh
              logic lives entirely in <code>utils/whoop_client.py</code>. After every
              refresh, the new token is synced back to GitHub Secrets via the GitHub API
              so the next scheduled run has a valid token.
            </p>
            <p>
              Strava also uses OAuth 2.0 but with a static refresh token, so it is simpler.
              Both clients use a watermark pattern: the ingest script queries BigQuery for
              the maximum timestamp already loaded, then only fetches records after that
              point. First run loads everything. Every run after that only moves new data.
            </p>
            <p>
              Every ingest run, successful or not, writes a row to a{' '}
              <code>pipeline_runs</code> audit table with the run ID, endpoint, row count,
              and any error message. That table is how I know whether a run actually
              succeeded versus silently failed.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/whoop-debrief/github-actions.png"
                alt="GitHub Actions pipeline run showing ingest and dbt jobs succeeding"
                caption="Daily WHOOP Pipeline run in GitHub Actions"
              >
                <img
                  src="/static/images/projects/whoop-debrief/github-actions.png"
                  alt="GitHub Actions pipeline run"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
            </div>
          </div>

          {/* dbt model lineage */}
          <div className="project-section">
            <h2>dbt model lineage</h2>
            <p>
              The transform layer follows the medallion pattern: staging, intermediate, and
              marts. Staging is materialized as views (cheap, no storage cost). Intermediate
              and mart models are tables.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/whoop-debrief/dbt-lineage.png"
                alt="dbt lineage graph showing raw sources through staging, intermediate, and mart layers"
                caption="dbt lineage graph from the docs site"
              >
                <img
                  src="/static/images/projects/whoop-debrief/dbt-lineage.png"
                  alt="dbt lineage graph"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
              <div className="diagram-caption">
                <p>
                  Full lineage graph from the{' '}
                  <a
                    href="https://edwardl903.github.io/whoop-debrief/#!/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    dbt docs site
                  </a>
                  . Source nodes on the left, mart and exposure nodes on the right.
                </p>
              </div>
            </div>
            <p>
              The most interesting model is <code>int_run_recovery</code>. It joins every
              Strava run to the WHOOP recovery score recorded the same day the run happened,
              and also to the recovery score the morning after. The derived column{' '}
              <code>recovery_delta</code> is just <code>next_day_recovery - same_day_recovery</code>.
              That single number is what powers the scatter plot on the running page — it
              answers "did this run help or hurt?"
            </p>
          </div>

          {/* Key modeling decision */}
          <div className="project-section">
            <h2>The modeling choice I thought most about</h2>
            <p>
              WHOOP cycles do not align cleanly to calendar days. A cycle can start at 4pm
              and end the next morning. Strava activities have a start timestamp. Joining
              them naively on date would silently mis-join afternoon runs to the wrong
              recovery score.
            </p>
            <p>
              I resolved this in <code>int_daily_metrics</code> by normalizing everything
              to a <code>metric_date</code> derived from the cycle start date, not the
              calendar day. Then in <code>int_run_recovery</code> I join on that normalized
              date rather than raw timestamps. It is a small thing, but if I got it wrong
              every "does this run help" data point would be off by a day.
            </p>
            <p>
              The recovery bucket labels (Green / Yellow / Red) and sleep quality labels
              also live here, in the intermediate layer, so downstream mart queries never
              need to repeat that logic.
            </p>
          </div>

          {/* Incremental */}
          <div className="project-section">
            <h2>Incremental strategy</h2>
            <p>
              <code>fct_daily</code> and <code>fct_runs</code> are both incremental merge
              models. The watermark for <code>fct_daily</code> is <code>metric_date</code>.
              For <code>fct_runs</code> it is <code>run_id</code> plus a 7-day rescan
              window — if a Strava activity gets enriched after the fact (Strava does this
              for segment data), the next run picks it up.
            </p>
            <p>
              <code>int_run_recovery</code> is a full rebuild on purpose. It is the join
              between WHOOP and Strava data, and I want any backfill or correction to
              cascade through without needing a manual <code>--full-refresh</code>. The
              mart models that depend on it are incremental, so the cost of rebuilding
              the intermediate is bounded.
            </p>
          </div>

          {/* Serve layer */}
          <div className="project-section">
            <h2>Serve layer: static JSON via jsDelivr</h2>
            <p>
              After the dbt job finishes, a final step runs{' '}
              <code>scripts/export_runs_json.py</code>. It queries{' '}
              <code>int_run_recovery</code>, serializes the columns the running page needs
              (including <code>summary_polyline</code> for GPS routes), and writes the
              result to <code>data/runs.json</code>. GitHub Actions then commits that file
              back to the repo with <code>[skip ci]</code> on the message.
            </p>
            <p>
              The portfolio fetches it from jsDelivr's CDN, which mirrors public GitHub
              repos with a short cache window. Zero backend, zero infrastructure cost.
              The running page below is reading from that file right now.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/whoop-debrief/running-page.png"
                alt="The running hobby page showing GPS routes, hero stats, and filmstrip"
                caption="Running page — live output of the pipeline"
              >
                <img
                  src="/static/images/projects/whoop-debrief/running-page.png"
                  alt="Running page live output"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
            </div>
          </div>

          {/* Tests + CI */}
          <div className="project-section">
            <h2>Tests and CI</h2>
            <p>
              Schema tests on all primary keys (not_null, unique) and every foreign key
              join. Source freshness tests warn after 25 hours and error after 49 — so if
              the ingest step silently fails, the dbt step still catches it.
            </p>
            <p>
              I also have a custom singular test that asserts no WHOOP cycle has a strain
              score above the documented maximum of 21, and one that checks{' '}
              <code>recovery_delta</code> is bounded within a plausible range. Small things,
              but they have caught real bugs — once when a timezone conversion pushed a
              cycle date forward by a day, and once when a null came through from the
              Strava API on a treadmill run without GPS.
            </p>
            <p>
              dbt docs deploy automatically to GitHub Pages on every push to main via a
              dedicated <code>dbt-docs.yml</code> workflow. The full lineage graph and
              column descriptions are always up to date without any manual step.
            </p>
          </div>

          {/* Live output */}
          <div className="project-section">
            <h2>What it produces</h2>
            <p>
              The <Link to="/hobbies/running">running page</Link> is the live output. Every
              GPS route is decoded from the encoded polyline Strava stores and drawn as an
              SVG path with an animated stroke. The telemetry panel shows the WHOOP signals
              for the same day and the sleep panel shows what happened the night after. The
              recovery scatter plots every run by strain vs. delta so you can see the pattern
              across the whole dataset.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/whoop-debrief/sleep-tabs.png"
                alt="Run, Recovery, and Sleep telemetry tabs on the running page"
                caption="Run / Recovery / Sleep tabs"
              >
                <img
                  src="/static/images/projects/whoop-debrief/sleep-tabs.png"
                  alt="Run Recovery Sleep tabs"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
            </div>
            <p>
              Right now I am using it to track my 5K progress as I build up distance from a
              sprinting background. The data answers a question I actually care about, which
              is the only reason any of this infrastructure is worth building.
            </p>
          </div>

          <ProjectNav currentId="whoop-debrief" />
        </div>
      </div>
    </section>
  )
}

export default WhoopDebrief
