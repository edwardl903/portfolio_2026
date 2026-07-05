# Chesslytics — Portfolio Writeup

> A self-serve chess analytics platform. Enter a Chess.com username, get a
> personalized stats dashboard backed by BigQuery, dbt mart tables, and a
> React frontend with Year in Review, Matchup Analyzer, and opening Pulse views.

**Live demo:** [chesslytics.xyz](https://www.chesslytics.xyz)
**Code:** [github.com/edwardl903/chesslyzer](https://github.com/edwardl903/chesslyzer)
**Stack:** Python · Flask · pandas · BigQuery · dbt · Looker Studio · GitHub Actions · React · Vite · Heroku

---

## TL;DR

What started as a Flask app that fetches Chess.com data on demand turned into
a full end-to-end data pipeline. The system has three distinct phases:

1. **Ingest** — `daily_ingest.py` runs on a GitHub Actions cron (2 AM UTC)
   and writes raw Chess.com API responses into BigQuery.
2. **Transform** — a dbt project runs immediately after ingest: staging views
   clean the raw data, an intermediate model fans games into per-player rows,
   and mart tables (`fct_games`, `dim_users`, `fct_user_statistics`) power the
   serve layer.
3. **Serve** — a Flask API on Heroku and a React + Vite frontend expose four
   features: Year in Review, Matchup Analyzer, Pulse (opening trends), and
   an embedded Looker Studio dashboard.

---

## Pipeline architecture

```
INGEST                   TRANSFORM                        SERVE
──────                   ─────────                        ─────

Chess.com          ┌──► BigQuery · raw_games         Flask · Heroku
Public API         │    test1 dataset (append-only)        │
     │             │           │                           ▼
     ▼             │           ▼                      React + Vite
daily_ingest.py ───┘      dbt run                          │
     │                         │                  ┌────────┴────────┐
     ▼                   ┌─────┼─────┐            ▼                 ▼
GitHub Actions /         ▼     ▼     ▼     Year in Review    Matchup Analyzer
cron 2 AM UTC     stg  int  fct/dim/fct         │                   │
                  views      marts              ▼                   ▼
                                             Pulse            Dashboard →
                                                           Looker Studio
```

Two data flows co-exist on purpose:

- **On-demand (Year in Review):** Flask fetches fresh games from Chess.com
  during the request, using an 8-worker `ThreadPoolExecutor` with
  `requests-cache` (SQLite, `NEVER_EXPIRE` for completed months). Pandas
  pre-computes JSON + PNG charts so the page renders without waiting on
  BigQuery. The same fetch also appends to `raw_games`.
- **Nightly batch:** `daily_ingest.py` does an incremental fetch per user
  (high-water mark from BigQuery), then the dbt job rebuilds mart tables.
  The React frontend reads live stats from mart tables via `/api/portfolio/stats`.

---

## dbt model lineage

```
SOURCE
test1.raw_games  (append-only)
      │
      ▼  STAGING  (view)
stg_raw_games
  - parse Unix end_time → game_date, game_end_timestamp
  - rename to snake_case
  - QUALIFY ROW_NUMBER() deduplication
      │
      ▼  INTERMEDIATE  (table)
int_player_games
  - UNION ALL: white POV + black POV (2 rows per game)
  - derives: outcome, rating_diff
  - ECO opening from REGEXP_EXTRACT on PGN
      │
      ├──────────────────────┬─────────────────────────────────┐
      ▼                      ▼                                 ▼
dim_users             fct_games (incremental)       fct_user_statistics
1 row/user            grain: game × player          grain: user × date × time class
current + peak        partitioned by game_date      watermark: stat_date
W/D/L                 clustered by username
                            │
                      fct_my_games (incremental)
                        EdwardL903 only, pre-filtered
                            │
                      my_daily_stats (table)
                        consumed by /api/portfolio/stats
```

41 dbt tests run after every nightly pipeline job.

---

## Features

### Year in Review (`/wrapped`)
User submits a Chess.com username and year. Flask fetches, Pandas processes,
matplotlib generates 10+ charts, BigQuery gets the raw append. Response
includes statistics JSON, image paths, embed config, and a Looker Studio URL
pre-filtered to that user and year.

### Matchup Analyzer (`/matchup`)
Two usernames (or a game URL) → Flask pulls profiles, recent games, and per-player
ratings from Chess.com. Returns win probability (Elo expected score + form nudge),
head-to-head stats, strengths/weaknesses, and game plan text per player.

### Pulse (`/pulse`)
Opening trends from the `fct_games` dbt mart, filterable by time class. No
Chess.com API call at view time -- reads from mart tables directly.

---

## Engineering highlights

### Fetch performance: ~5x faster cold, ~65x faster warm

Original problems:
- Walked every month from join date, including empty ones (lots of 404s)
- Capped at 2 concurrent workers from a misread comment
- No caching, fresh TLS per request

Fixes:
- Use `/pub/player/{user}/games/archives` to enumerate only months with games
- 8-worker `ThreadPoolExecutor` + exponential backoff on HTTP 429
- `requests-cache` CachedSession (SQLite): `NEVER_EXPIRE` for past months, 300s for current

| Scenario | Before | After |
|---|---|---|
| Cold fetch (1376 games / 12 months) | ~9-12 s | **1.77 s** |
| Warm fetch (cache hit) | same | **0.03 s** |

### Raw-first BigQuery loading

Raw Chess.com response goes into BigQuery first (nested objects flattened to
top-level columns, no transformations applied). All analytical work -- date
parsing, ECO cleanup, player-perspective calcs -- happens in dbt on top of
the raw table. This makes the pipeline replayable: any metric can be rebuilt
from `raw_games` without re-calling the API.

### Incremental dbt models

`fct_games` and `fct_user_statistics` are incremental (merge strategy) with
`uploaded_at` as the watermark. `my_daily_stats` is a full rebuild on top
of `fct_my_games`. The nightly pipeline runs all models in order, then
runs 41 dbt tests.

### Per-user Looker Studio via embed config

One shared Looker report. Flask builds an embed configuration scoped to
`username_year`, so there is no per-user dashboard provisioning. Infinite
users, one dashboard.

### Dual-credential GCP loading

BigQuery client tries `GOOGLE_APPLICATION_CREDENTIALS_JSON` (Heroku config var)
first, falls back to `gcp/service_account.json` locally. No code changes
between environments.

---

## Tech stack

| Layer | Tools |
|---|---|
| Backend | Python 3.13, Flask, Flask-Cors, gunicorn |
| Ingest | daily_ingest.py, GitHub Actions (cron 2 AM UTC) |
| Data | pandas, NumPy, python-chess |
| HTTP | requests, requests-cache (SQLite), urllib3 retry |
| Visualization | matplotlib, seaborn |
| Cloud (raw) | Google Cloud BigQuery, dataset: test1 |
| Cloud (marts) | BigQuery, dataset: chesslytics_dbt |
| Analytics | dbt (BigQuery adapter), 41 tests |
| Reporting | Looker Studio (embedded, per-user config) |
| Hosting | Heroku |
| Frontend | React 19, Vite 7, TypeScript |

---

## Things I learned / decisions I would defend

- **Land raw data first.** It cost almost nothing to add `raw_games` and it
  gave me unlimited replayability for transformations. Any project that
  talks to a third-party API should do this.
- **HTTP caching is the highest-ROI optimization here.** A 9 MB SQLite file
  converts a slow site into an instant one for returning users.
  `requests-cache` made it about 10 lines of code.
- **Don't trust old comments.** The "max 2 simultaneous requests" comment
  had been there forever. Reading the actual docs revealed it was wrong, and
  bumping workers gave a 4x speedup.
- **Two transformation systems is fine temporarily.** Python and dbt both
  compute stats right now. That is the right state during a migration -- kill
  the Python side once dbt is fully serving the dashboard.

---

## What's next

1. Vectorize `clean_dataframe` -- replace `iterrows()` with `np.where` for
   a 50-100x speedup on large accounts.
2. Import the pipeline directly from Flask instead of `subprocess.run` to skip
   Python interpreter cold-start (~500 ms saved per request).
3. Add real pytest coverage on `src/data` and `src/stats` before the dbt
   cutover.
