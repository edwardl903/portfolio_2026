import { Link } from 'react-router-dom'
import ClickableExpandableImage from '../../components/ClickableExpandableImage'
import ProjectNav from '../../components/ProjectNav'

function ChessLyticsDbt() {
  return (
    <section className="project-detail">
      <div className="container">
        <div className="project-header">
          <div className="project-image">
            <ClickableExpandableImage
              src="/static/images/projects/chesslytics/chesslytics-dbt-cover.jpg"
              alt="ChessLytics dbt Pipeline"
              caption="ChessLytics dbt Pipeline"
            >
              <img
                src="/static/images/projects/chesslytics/chesslytics-dbt-cover.jpg"
                alt="ChessLytics dbt Pipeline"
                loading="lazy"
              />
            </ClickableExpandableImage>
          </div>
          <div className="project-info">
            <h1>ChessLytics dbt Pipeline</h1>
            <p className="project-description">
              I built a dbt project on top of the raw chess.com game data already sitting in BigQuery.
              It runs every night via GitHub Actions (06:00 UTC, 2am ET), keeps game history fresh for 15 players
              including Hikaru and Magnus, and directly powers the{' '}
              <Link to="/hobbies/chess">chess analytics page</Link>, the Pulse opening trends view, and
              the Matchup Analyzer on this site.
            </p>
            <div className="project-tech">
              <span className="tech-tag">dbt</span>
              <span className="tech-tag">BigQuery</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">GCP</span>
              <span className="tech-tag">Incremental Models</span>
              <span className="tech-tag">Data Modeling</span>
              <span className="tech-tag">Chess.com API</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">GitHub Actions</span>
              <span className="tech-tag">Flask</span>
              <span className="tech-tag">dbt_utils</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/edwardl903/chesslytics"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github" /> Code
              </a>
              <Link to="/hobbies/chess" className="project-link">
                <i className="fas fa-chart-line" /> Live output
              </Link>
            </div>
          </div>
        </div>

        <div className="project-content">
          <div className="project-section">
            <h2>Why I built this</h2>
            <p>
              The <Link to="/projects/chesslytics">ChessLytics</Link> Flask app was already dumping
              raw chess.com API responses into a BigQuery table called <code>raw_games</code>. But
              that table was a mess. Duplicates piling up from re-runs, no player perspective column,
              no outcome logic, nothing aggregated. Every time I wanted to look at my stats I was
              re-running the same pandas code from scratch.
            </p>
            <p>
              I wanted something that just runs nightly, stores everything cleanly, and stays up to
              date without me thinking about it. So I built a dbt project on top of it. Now I can
              add a username to a CSV, and from that point on their full game history gets loaded
              and kept current automatically.
            </p>
          </div>

          <div className="project-section">
            <h2>Model lineage</h2>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/chesslytics/dbt-docs-lineage.png"
                alt="dbt docs lineage graph showing sources through reporting layer to consumers"
                caption="dbt docs lineage graph"
              >
                <img
                  src="/static/images/projects/chesslytics/dbt-docs-lineage.png"
                  alt="dbt docs lineage graph showing sources through reporting layer to consumers"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
              <div className="diagram-caption">
                <p>
                  This is from <code>dbt docs serve</code>. Source on the left, exposures on the
                  right (Looker Studio, the Heroku web app, and GitHub Actions). Each node links to
                  the compiled SQL and test results.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>Who gets tracked</h2>
            <p>
              There is a <code>seeds/tracked_usernames.csv</code> with one row per player. Right now
              it has 15 entries: my account plus a bunch of GMs and streamers I actually watch, like
              Hikaru Nakamura, Magnus Carlsen, GothamChess, Fabiano Caruana, and Daniel Naroditsky.
              To add someone you just drop in their username, run <code>dbt seed</code>, and the next
              nightly run picks up their full history.
            </p>
            <p>
              This is the thing the Flask app could not do. Flask only fetches on demand for one user
              at a time and throws the result away after the response. With this pipeline, everyone in
              the CSV gets their games stored for good and updated every night.
            </p>
          </div>

          <div className="project-section">
            <h2>Staging: stg_raw_games</h2>
            <p>
              Materialized as a view to keep it cheap. Two jobs: dedup and clean.
            </p>
            <p>
              The raw table is append-only so the same game UUID can show up multiple times if
              ingestion reruns. Instead of a subquery I used BigQuery&apos;s{' '}
              <code>QUALIFY ROW_NUMBER() OVER (PARTITION BY uuid ORDER BY uploaded_at DESC) = 1</code>{' '}
              to keep only the latest upload per game. Much cleaner than a self-join.
            </p>
            <p>
              The rest is just renaming and casting: convert the Unix <code>end_time</code> to a
              proper timestamp, pull out year, month, day, hour, and day-of-week, and alias all the
              white/black columns to snake_case. No business logic in staging.
            </p>
          </div>

          <div className="project-section">
            <h2>Intermediate: int_player_games</h2>
            <p>
              This is the part I liked thinking through the most. The raw table has one row per game
              with separate white and black columns. That is annoying to query because you always end
              up writing <code>WHERE white_username = x OR black_username = x</code> and duplicating
              all the CASE logic everywhere.
            </p>
            <p>
              Instead I UNION ALL two CTEs, one from white&apos;s perspective and one from black&apos;s.
              Every game now shows up twice with consistent <code>my_username</code>,{' '}
              <code>my_rating</code>, <code>opp_username</code>, and <code>outcome</code> columns.
              Downstream queries just filter by <code>my_username</code> and everything lines up.
            </p>
            <p>
              This model also handles opening extraction and outcome classification. Chess.com buries
              the opening name in the PGN as a URL like{' '}
              <code>https://www.chess.com/openings/Sicilian-Defense-Najdorf</code>. I use{' '}
              <code>REGEXP_EXTRACT</code> to pull the slug and then truncate it at the first major
              keyword (Defense, Gambit, Opening, etc.) so you get a clean short name. Outcome maps
              the dozen-or-so chess.com result strings down to just win, draw, or lose.
            </p>
          </div>

          <div className="project-section">
            <h2>Incremental strategy</h2>
            <p>
              <code>fct_games</code>, <code>fct_my_games</code>, and <code>fct_user_statistics</code>{' '}
              are all incremental merges. The watermark is <code>uploaded_at</code> from the source
              compared to <code>MAX(loaded_at)</code> already in the table. First run loads everything.
              Every run after that only touches rows uploaded since the last time.
            </p>
            <div className="diagram-image-container">
              <ClickableExpandableImage
                src="/static/images/projects/chesslytics/dbt-incremental-model.png"
                alt="Diagram showing incremental model strategy: full load day 1, append only on day 2"
                caption="Incremental load strategy"
              >
                <img
                  src="/static/images/projects/chesslytics/dbt-incremental-model.png"
                  alt="Diagram showing incremental model strategy: full load day 1, append only on day 2"
                  className="architecture-image"
                  loading="lazy"
                />
              </ClickableExpandableImage>
              <div className="diagram-caption">
                <p>
                  <code>fct_games</code> is partitioned by <code>game_date</code> month and clustered
                  by <code>my_username</code> and <code>time_class</code>. Queries like &quot;my blitz
                  games in 2026&quot; hit one partition without scanning everything.
                </p>
              </div>
            </div>
          </div>

          <div className="project-section">
            <h2>Reporting models</h2>
            <ul>
              <li>
                <strong>fct_games</strong> - full multi-user fact table, one row per (game, player).
                Incremental merge on <code>player_game_key</code>. Looker Studio reads this.
              </li>
              <li>
                <strong>fct_my_games</strong> - just my games filtered from <code>fct_games</code>.
                The portfolio API reads from this so it is not scanning the full table every time.
              </li>
              <li>
                <strong>fct_user_statistics</strong> - daily per-user per-time-class aggregates with
                cumulative window functions. Tracks total games, total wins, avg accuracy, and closing
                rating each day.
              </li>
              <li>
                <strong>dim_users</strong> - one row per player with current rating, peak rating,
                active days, and a time-class game count breakdown.
              </li>
              <li>
                <strong>snap_dim_users</strong> - SCD Type 2 dbt snapshot of <code>dim_users</code>.
                Tracks historical rating changes over time so you can see when a player peaked, not
                just their current number.
              </li>
              <li>
                <strong>my_daily_stats</strong> - portfolio-specific table that pre-aggregates
                everything the chess hobby page needs, including win/loss streak calculations, into
                one flat table the Flask API can read with a single SELECT.
              </li>
            </ul>
          </div>

          <div className="project-section">
            <h2>Macros and tests</h2>
            <p>
              I have a <code>win_rate()</code> macro that wraps <code>SAFE_DIVIDE</code> with a
              zero-denominator guard so I do not have to write the same CASE block in every model
              and analysis. There is also <code>get_current_season()</code> that returns a{' '}
              <code>YYYY-QN</code> label for grouping by quarter.
            </p>
            <p>
              For data quality: <code>assert_outcomes_sum_to_total</code> makes sure wins + losses +
              draws always equals games_played, <code>assert_no_future_games</code> catches timestamp
              parsing bugs, and <code>assert_fct_games_has_tracked_users</code> checks that every
              username in the seed actually shows up in the fact table after a run. Plus the usual
              schema tests (not_null, unique, accepted_values) on all the keys.
            </p>
          </div>

          <div className="project-section">
            <h2>Daily pipeline and live output</h2>
            <p>
              The <code>Daily Chesslytics Pipeline</code> workflow runs at 06:00 UTC (2am ET). Job 1
              runs <code>scripts/daily_ingest.py</code>: fetch new games for everyone in{' '}
              <code>tracked_usernames.csv</code> and append to <code>raw_games</code> in BigQuery. Job 2
              runs only after ingest succeeds: <code>dbt deps</code>, <code>dbt seed</code>,{' '}
              <code>dbt snapshot</code>, <code>dbt run</code>, <code>dbt test</code>. Each ingest run
              also logs to a <code>pipeline_runs</code> audit table. You can trigger it manually from
              the Actions UI with optional username overrides or a dry-run flag.
            </p>
            <p>
              Three things on this site read from those mart tables. The{' '}
              <Link to="/hobbies/chess">chess analytics page</Link> reads from{' '}
              <code>fct_my_games</code> and <code>my_daily_stats</code> and shows rating trends,
              win rates by opening, recent games, and a &quot;last updated&quot; timestamp. The Pulse
              view reads opening frequency directly from <code>fct_games</code> filtered by time class.
              The Matchup Analyzer pulls live player stats from Chess.com on demand but uses the mart
              tables as a fallback reference for head-to-head history.
            </p>
          </div>

          <ProjectNav currentId="chesslytics-dbt" />
        </div>
      </div>
    </section>
  )
}

export default ChessLyticsDbt
