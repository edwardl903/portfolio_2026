import { Link } from 'react-router-dom'
import ClickableExpandableImage from '../../components/ClickableExpandableImage'

function ChessLytics() {
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
                href="https://www.chesslytics.xyz"
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
              A few grabs from the live app so you can see what actually ships. Click any image to open it full screen.
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
              boring shaping for the HTML and the PNGs so the page does not wait on BigQuery. BigQuery still gets a
              flattened copy of the raw response in one append-friendly table. dbt is on the roadmap, not in prod yet.
            </p>
            <p>
              Looker is one shared report for everyone. Flask just sets the filter params per request so I never had to
              clone dashboards by hand. For credentials I read JSON from a Heroku config var in prod and fall back to
              a local service account file when I am debugging on my laptop.
            </p>
          </div>

          <div className="project-section story-section">
            <h2>Sketch of the GCP side</h2>
            <p>
              I split it on purpose: Python makes the response snappy, BigQuery keeps the messy truth so I can change my
              mind about metrics later without replaying the whole API crawl.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/chesslytics/chesslytics-initial-diagram.png"
                alt="ChessLytics initial GCP architecture"
                caption="Flask, fetch pipeline, BigQuery raw table, Looker embed"
              >
                <img
                  src="/static/images/projects/chesslytics/chesslytics-initial-diagram.png"
                  alt="ChessLytics initial GCP architecture"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
              <div className="diagram-caption">
                <p>
                  Roughly: browser talks to Flask, processor hits Chess.com with caching, pandas spits out JSON and chart
                  files for the page, same pass shoves rows into BigQuery for Looker (and later dbt if I finish it).
                </p>
              </div>
            </div>
          </div>

          <div className="project-section story-section">
            <h2>When it gets huge</h2>
            <p>
              If you are doing silly-big historical batches, the cute Heroku path is not enough. I spun up a separate
              Azure track with Databricks and Delta for the warehouse-style work. Same overall idea, different scale.
            </p>
            <p>
              I wrote that up over here:{' '}
              <Link to="/projects/chesslytics-azure">ChessLytics Azure Analytics</Link>. The diagram below is the whole
              story in one picture, GCP app plus the Azure branch.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/chesslytics/chesslytics-diagram.png"
                alt="ChessLytics full architecture including Azure scale path"
                caption="GCP app plus Azure scale path"
              >
                <img
                  src="/static/images/projects/chesslytics/chesslytics-diagram.png"
                  alt="ChessLytics full architecture including Azure scale path"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
              <div className="diagram-caption">
                <p>
                  Left side is what you actually click around on. Middle is BigQuery and Looker. Off to the side is the
                  Azure lakehouse path for when the files stop fitting in polite company.
                </p>
              </div>
            </div>
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
              <li>Actually ship dbt on top of raw_games.</li>
              <li>Stop doing the slow pandas row loops where vectorized code would win.</li>
              <li>Smarter incremental fetch using max game time in BigQuery, not only cache luck.</li>
              <li>Import the pipeline from Flask instead of subprocess so a request is not paying a cold Python boot.</li>
              <li>Real tests. The tests folder is mostly wishful thinking right now.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChessLytics
