import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClickableExpandableImage from '../../components/ClickableExpandableImage'
import ProjectNav from '../../components/ProjectNav'

const CHESSLYTICS_URL = 'https://www.chesslytics.xyz'

function ChessLytics() {
  const [demoLoaded, setDemoLoaded] = useState(false)
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <ClickableExpandableImage
              src="/static/images/projects/chesslytics/chesslytics-project.jpg"
              alt="ChessLytics overview"
              caption="ChessLytics"
            >
              <img
                src="/static/images/projects/chesslytics/chesslytics-project.jpg"
                alt="ChessLytics overview"
                loading="lazy"
              />
            </ClickableExpandableImage>
          </div>
          <div className="project-info">
            <h1>ChessLytics</h1>
            <p className="project-description">
              I got tired of guessing whether I was actually improving at chess, so I hacked together a Flask site where
              you punch in a Chess.com username and a year. You get the obvious headline numbers, a bunch of matplotlib
              charts, and a Looker embed that already knows who you are. Nothing fancy on the front end. The fun part
              for me was wiring the fetch so one run fills the page and also dumps the raw API payload into BigQuery.
              That way I can mess with SQL later without calling Chess.com again for five years of games. It lives on
              Heroku and talks to a real GCP project.
            </p>
            <div className="project-tech">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Flask</span>
              <span className="tech-tag">pandas</span>
              <span className="tech-tag">matplotlib</span>
              <span className="tech-tag">BigQuery</span>
              <span className="tech-tag">Looker Studio</span>
              <span className="tech-tag">requests-cache</span>
              <span className="tech-tag">Chess.com API</span>
              <span className="tech-tag">Heroku</span>
              <span className="tech-tag">GCP</span>
              <span className="tech-tag">dbt</span>
            </div>
            <div className="project-links">
              <a
                href={CHESSLYTICS_URL}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-external-link-alt" /> Live demo
              </a>
              <a
                href="https://github.com/edwardl903/chesslyzer"
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
            <h2>Try it live</h2>
            <p>Type any Chess.com username and pick a year.</p>
            <div className="project-browser-frame">
              <div className="project-browser-bar">
                <div className="project-browser-dots" aria-hidden="true">
                  <span /><span /><span />
                </div>
                <span className="project-browser-url">chesslytics.xyz</span>
                <a
                  href={CHESSLYTICS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-browser-open"
                >
                  <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" /> Open
                </a>
              </div>
              <div className="project-browser-iframe-wrap">
                {!demoLoaded ? (
                  <button
                    type="button"
                    className="project-browser-load"
                    onClick={() => setDemoLoaded(true)}
                    aria-label="Load ChessLytics live demo in this frame"
                  >
                    <span className="project-browser-load-icon" aria-hidden="true">
                      <i className="fas fa-play" />
                    </span>
                    <span className="project-browser-load-title">Load live demo</span>
                    <span className="project-browser-load-hint">Tap to interact with chesslytics.xyz</span>
                  </button>
                ) : (
                  <iframe
                    src={CHESSLYTICS_URL}
                    title="ChessLytics live app"
                    className="project-browser-iframe"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>How it works</h2>
            <p>
              You open the site, type username and year, wait a second or two. Then you get the stats block, a stack of
              charts (rating line, heatmaps, whatever I felt like plotting that week), and optional downloads if you
              want spreadsheets. Looker sits in the same page and is already filtered to that user and year because the
              backend passes the right embed config after the upload finishes.
            </p>
          </div>

          <div className="project-section">
            <h2>Screenshots</h2>
            <p>
              A few grabs from the live app so you can see what actually ships.
            </p>
            <div className="chesslytics-gallery">
              <div className="chesslytics-gallery-item">
                <h3>Home</h3>
                <p>
                  Landing page where you drop a Chess.com username and pick a year. Same vibe as other &quot;wrapped&quot;
                  flows, just for chess.
                </p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/chesslytics/chesslytics-ui-home.png"
                    alt="ChessLytics home page with username and year"
                    caption="Home"
                  >
                    <img
                      src="/static/images/projects/chesslytics/chesslytics-ui-home.png"
                      alt="ChessLytics home page with username and year"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>

              <div className="chesslytics-gallery-item">
                <h3>Year wrapped</h3>
                <p>
                  Big year-in-review style stats for whatever year you picked, same energy as Spotify Wrapped or
                  Google Photos year summaries, just built from your Chess.com history.
                </p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/chesslytics/chesslytics-year-wrapped.png"
                    alt="ChessLytics year summary statistics"
                    caption="Year wrapped"
                  >
                    <img
                      src="/static/images/projects/chesslytics/chesslytics-year-wrapped.png"
                      alt="ChessLytics year summary statistics"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>

              <div className="chesslytics-gallery-item">
                <h3>Highlights</h3>
                <p>
                  Notable games (biggest win, worst loss, that kind of thing) with links out so you can open the actual
                  game on Chess.com in one click.
                </p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/chesslytics/chesslytics-game-highlights.png"
                    alt="ChessLytics special games and highlights with Chess.com links"
                    caption="Game highlights"
                  >
                    <img
                      src="/static/images/projects/chesslytics/chesslytics-game-highlights.png"
                      alt="ChessLytics special games and highlights with Chess.com links"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>

              <div className="chesslytics-gallery-item">
                <h3>Looker dashboard</h3>
                <p>
                  Embedded Looker Studio report filtered to the user and year you just ran, sitting in the same page as
                  the matplotlib stuff.
                </p>
                <div className="diagram-image-container">
                  <ClickableExpandableImage
                    src="/static/images/projects/chesslytics/chesslytics-looker-dashboard.png"
                    alt="Embedded Looker Studio dashboard in ChessLytics"
                    caption="Looker Studio embed"
                  >
                    <img
                      src="/static/images/projects/chesslytics/chesslytics-looker-dashboard.png"
                      alt="Embedded Looker Studio dashboard in ChessLytics"
                      className="architecture-image"
                      loading="lazy"
                    />
                  </ClickableExpandableImage>
                </div>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>What I actually wired up</h2>
            <p>
              The Chess.com pull was the annoying bit at first. I now hit the archive index so I skip empty months,
              fan out month fetches with a small worker pool, back off when I get 429s, and cache hard with
              requests-cache in SQLite (old months basically never expire, current month is short TTL). Pandas does the
              boring shaping for the HTML and PNGs so the page does not wait on BigQuery. BigQuery still gets a
              flattened copy of the raw response in one append-friendly table.
            </p>
            <p>
              A separate GitHub Actions cron at 06:00 UTC (2am ET) runs the daily ingest incrementally (high-water mark per user
              from BigQuery, not re-fetching everything). dbt runs right after and rebuilds mart tables used by the Pulse
              and chess dashboard pages. Matchup Analyzer is its own Flask endpoint: two usernames in, Elo win
              probability + form stats + game plan text out. Looker is one shared report for everyone -- Flask sets the
              filter params per request so I never had to clone dashboards. For credentials I read JSON from a Heroku
              config var in prod and fall back to a local service account file when debugging.
            </p>
          </div>

          <div className="project-section story-section">
            <h2>Full pipeline</h2>
            <p>
              Three phases. Ingest: a GitHub Actions cron at 06:00 UTC (2am ET) runs <code>daily_ingest.py</code>, which does an
              incremental pull per user (high-water mark from BigQuery) and appends to <code>raw_games</code>. Transform:
              dbt runs immediately after ingest, rebuilding staging views, the intermediate per-player model, and four
              mart tables. Serve: Flask on Heroku exposes the API; React + Vite serves Year in Review, Matchup Analyzer,
              and Pulse. The on-demand Year in Review flow also appends to <code>raw_games</code> mid-request so the
              marts stay current.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/chesslytics/chesslytics-pipeline.png"
                alt="ChessLytics full pipeline: Ingest, Transform, Serve"
                caption="Ingest (GitHub Actions + daily_ingest.py) → Transform (BigQuery + dbt) → Serve (Flask + React)"
              >
                <img
                  src="/static/images/projects/chesslytics/chesslytics-pipeline.png"
                  alt="ChessLytics full pipeline: Ingest, Transform, Serve"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
              <div className="diagram-caption">
                <p>
                  Chess.com API → <code>daily_ingest.py</code> → GitHub Actions cron → BigQuery <code>raw_games</code>{' '}
                  → dbt (staging, intermediate, marts) → Flask + React serving Year in Review, Matchup Analyzer, Pulse,
                  and Looker Studio.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>The dbt layer</h2>
            <p>
              Once the raw data is in BigQuery, a separate dbt project cleans, models, and aggregates it nightly via
              GitHub Actions. That pipeline is what keeps the{' '}
              <Link to="/hobbies/chess">chess analytics page</Link> on this site up to date. If you want to see the
              model lineage, incremental strategy, and how the mart tables are structured, that is all documented
              separately:{' '}
              <Link to="/projects/chesslytics-dbt">ChessLytics dbt Pipeline</Link>.
            </p>
          </div>

          <div className="project-section">
            <h2>Stuff that moved the needle</h2>
            <p>
              I stopped walking month by month from join date when there were zero games. I stopped believing the old
              comment about only two concurrent requests and bumped workers with real backoff. I put HTTP behind
              requests-cache. For a chunky account a cold pull used to drag for maybe 9 to 12 seconds, now it is
              closer to 2. If the cache is warm it feels instant.
            </p>
            <p>
              Landing raw rows in BigQuery felt like extra work at first but it saved me later when I wanted to redo a
              metric without re-downloading half a decade from Chess.com. I also stopped checking generated junk into
              git and added a real .env.example so future me does not forget half the env vars.
            </p>
          </div>

          <div className="project-section">
            <h2>Still want to do</h2>
            <ul>
              <li>Stop doing the slow pandas row loops where vectorized code would win.</li>
              <li>Import the pipeline from Flask instead of subprocess so a request is not paying a cold Python boot.</li>
              <li>Real tests. The tests folder is mostly wishful thinking right now.</li>
            </ul>
          </div>

          <ProjectNav currentId="chesslytics" />
        </div>
      </div>
    </section>
  )
}

export default ChessLytics
