import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DATA_URL = import.meta.env.DEV
  ? 'https://cdn.jsdelivr.net/gh/edwardl903/whoop-analytics@main/data/runs.json'
  : 'https://cdn.jsdelivr.net/gh/edwardl903/whoop-analytics@main/data/runs.json'

// ── Google Polyline decoder ───────────────────────────────────────────────────
function decodePolyline(str) {
  const coords = []
  let index = 0, lat = 0, lng = 0
  while (index < str.length) {
    let b, shift = 0, result = 0
    do {
      b = str.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)
    lat += (result & 1) ? ~(result >> 1) : result >> 1
    shift = 0; result = 0
    do {
      b = str.charCodeAt(index++) - 63
      result |= (b & 0x1f) << shift
      shift += 5
    } while (b >= 0x20)
    lng += (result & 1) ? ~(result >> 1) : result >> 1
    coords.push([lat / 1e5, lng / 1e5])
  }
  return coords
}

const SVG_W = 240, SVG_H = 150, SVG_PAD = 14

function polylineToPoints(encoded) {
  if (!encoded) return null
  const coords = decodePolyline(encoded)
  if (coords.length < 2) return null
  const lats = coords.map(c => c[0])
  const lngs = coords.map(c => c[1])
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const latRange = maxLat - minLat || 0.001
  const lngRange = maxLng - minLng || 0.001
  const scale = Math.min((SVG_W - SVG_PAD * 2) / lngRange, (SVG_H - SVG_PAD * 2) / latRange)
  const offsetX = (SVG_W - lngRange * scale) / 2
  const offsetY = (SVG_H - latRange * scale) / 2
  return coords.map(([lt, lg]) => {
    const x = offsetX + (lg - minLng) * scale
    const y = SVG_H - offsetY - (lt - minLat) * scale
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(raw) {
  if (!raw) return ''
  const d = new Date(raw + 'T00:00:00')
  return isNaN(d) ? raw : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtPace(val) {
  if (val == null) return '--'
  const min = Math.floor(val)
  const sec = Math.round((val - min) * 60)
  return `${min}:${String(sec).padStart(2, '0')}/km`
}

function fmtTime(val) {
  if (val == null) return '--'
  const h = Math.floor(val / 60)
  const m = Math.floor(val % 60)
  const s = Math.round((val - Math.floor(val)) * 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m ${String(s).padStart(2, '0')}s`
}

function fmtDelta(delta) {
  if (delta == null) return null
  const sign = delta > 0 ? '+' : ''
  return `${sign}${Math.round(delta)}`
}

function deltaClass(delta) {
  if (delta == null) return ''
  if (delta > 0) return 'run-delta-pos'
  if (delta < 0) return 'run-delta-neg'
  return ''
}

function bucketBadge(bucket) {
  if (!bucket) return null
  const cls = bucket === 'peak' ? 'run-bucket-peak' : bucket === 'optimal' ? 'run-bucket-opt' : 'run-bucket-poor'
  return <span className={`run-bucket ${cls}`}>{bucket}</span>
}

// ── RunRoute SVG ──────────────────────────────────────────────────────────────
function RunRoute({ polyline }) {
  const pts = polylineToPoints(polyline)
  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="run-card-svg" aria-hidden="true">
      {pts ? (
        <polyline
          points={pts}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      ) : (
        <>
          <rect
            x={SVG_PAD} y={SVG_PAD}
            width={SVG_W - SVG_PAD * 2} height={SVG_H - SVG_PAD * 2}
            rx="4" fill="none"
            stroke="var(--border-color)"
            strokeWidth="1.5"
            strokeDasharray="5,4"
          />
          <text
            x={SVG_W / 2} y={SVG_H / 2 + 5}
            textAnchor="middle" fontSize="12"
            fill="var(--text-muted)"
            fontFamily="system-ui, sans-serif"
          >
            No GPS
          </text>
        </>
      )}
    </svg>
  )
}

// ── StatCard ──────────────────────────────────────────────────────────────────
function SummaryCard({ label, value, sub }) {
  return (
    <div className="run-summary-card">
      <span className="run-summary-value">{value ?? '--'}</span>
      <span className="run-summary-label">{label}</span>
      {sub && <span className="run-summary-sub">{sub}</span>}
    </div>
  )
}

// ── PipelineFooter ────────────────────────────────────────────────────────────
function PipelineFooter({ generatedAt }) {
  const dateStr = generatedAt ? fmtDate(generatedAt.split('T')[0]) : '--'
  return (
    <div className="cv2-pipeline-footer">
      <div className="cv2-pipeline-bar">
        <span className="cv2-dbt-dot" aria-hidden="true" />
        <i className="fas fa-database" aria-hidden="true" />
        <span>BigQuery <span className="cv2-dbt-sep">+</span> dbt <span className="cv2-dbt-sep">+</span> GitHub Actions</span>
        <span className="cv2-dbt-sep" aria-hidden="true">·</span>
        <span>Updated {dateStr}</span>
        <i className="fas fa-circle-info cv2-pipeline-info-icon" aria-hidden="true" />
      </div>
      <div className="cv2-pipeline-popover" role="tooltip">
        <p>
          Every morning GitHub Actions ingests Strava data into BigQuery, dbt joins
          it to WHOOP recovery scores, and the result auto-commits here as a static JSON.
          No backend, no server cost, fully automated.
        </p>
        <Link to="/projects" className="cv2-pipeline-link">
          View the project <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

// ── RunCard ───────────────────────────────────────────────────────────────────
function RunCard({ run }) {
  const delta = run.recovery_delta
  const pts = run.summary_polyline ? polylineToPoints(run.summary_polyline) : null

  return (
    <div className="run-card">
      <div className="run-card-svg-wrap">
        <RunRoute polyline={run.summary_polyline} />
      </div>

      <div className="run-card-base">
        <span className="run-card-date">{fmtDate(run.run_date)}</span>
        <div className="run-card-quick">
          <span>{run.distance_km != null ? `${run.distance_km.toFixed(2)} km` : '--'}</span>
          <span className="run-qdot">·</span>
          <span>{fmtPace(run.pace_min_per_km)}</span>
        </div>
        {delta != null && (
          <span className={`run-delta ${deltaClass(delta)}`}>
            {fmtDelta(delta)} recovery next day
          </span>
        )}
      </div>

      {/* Hover overlay */}
      <div className="run-card-overlay" aria-hidden="true">
        <p className="run-overlay-name">{run.run_name || 'Run'}</p>
        <ul className="run-overlay-list">
          <li><span>Distance</span><span>{run.distance_km != null ? `${run.distance_km.toFixed(2)} km` : '--'}</span></li>
          <li><span>Pace</span><span>{fmtPace(run.pace_min_per_km)}</span></li>
          <li><span>Time</span><span>{fmtTime(run.moving_time_min)}</span></li>
          {run.total_elevation_gain_meter != null && (
            <li><span>Elevation</span><span>{Math.round(run.total_elevation_gain_meter)} m</span></li>
          )}
          {run.run_avg_hr != null && (
            <li><span>Avg HR</span><span>{Math.round(run.run_avg_hr)} bpm</span></li>
          )}
          {run.suffer_score != null && (
            <li><span>Suffer score</span><span>{run.suffer_score}</span></li>
          )}
          {run.same_day_recovery != null && (
            <li>
              <span>Recovery (day of)</span>
              <span>{Math.round(run.same_day_recovery)}% {bucketBadge(run.same_day_recovery_bucket)}</span>
            </li>
          )}
          {run.next_day_recovery != null && (
            <li>
              <span>Recovery (next day)</span>
              <span>{Math.round(run.next_day_recovery)}%</span>
            </li>
          )}
          {delta != null && (
            <li className={`run-overlay-delta ${deltaClass(delta)}`}>
              <span>Delta</span>
              <span>{fmtDelta(delta)} pts</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
function Running() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(DATA_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  const runs = data?.runs ?? []
  const paceRuns = runs.filter(r => r.pace_min_per_km != null)
  const distRuns = runs.filter(r => r.distance_km != null)
  const deltaRuns = runs.filter(r => r.recovery_delta != null)

  const avgPace  = paceRuns.length  ? paceRuns.reduce((s, r) => s + r.pace_min_per_km, 0) / paceRuns.length : null
  const avgDist  = distRuns.length  ? distRuns.reduce((s, r) => s + r.distance_km, 0)    / distRuns.length  : null
  const avgDelta = deltaRuns.length ? deltaRuns.reduce((s, r) => s + r.recovery_delta, 0) / deltaRuns.length : null

  return (
    <section className="hobby-detail">
      <div className="container">
        <div className="hobby-header">
          <div className="hobby-icon">
            <i className="fas fa-person-running" aria-hidden="true" />
          </div>
        </div>

        <div className="hobby-content">
          <div className="hobby-description">
            <h2>Running</h2>
            <p>
              Started running in college to get away from my laptop for an hour. Got
              serious after graduation, WHOOP on my wrist and Strava logging every
              route. Eventually the data made it hard to pretend I was training smart.
            </p>
            <p>
              Every card below is pulled from the same pipeline: GitHub Actions ingests
              Strava data into BigQuery each morning, dbt joins it to my WHOOP recovery
              scores, and the JSON lands here automatically. The recovery delta is the
              interesting part. It tells me whether each run helped or hurt the morning after.
            </p>
          </div>

          {/* Summary stats */}
          {runs.length > 0 && (
            <div className="run-summary-row">
              <SummaryCard label="runs logged" value={runs.length} />
              <SummaryCard label="avg pace" value={avgPace ? fmtPace(avgPace) : '--'} />
              <SummaryCard label="avg distance" value={avgDist ? `${avgDist.toFixed(1)} km` : '--'} />
              <SummaryCard
                label="avg recovery delta"
                value={avgDelta != null ? `${avgDelta > 0 ? '+' : ''}${avgDelta.toFixed(1)}` : '--'}
                sub={avgDelta != null ? (avgDelta > 0 ? 'runs help me recover' : 'runs tax recovery') : null}
              />
            </div>
          )}

          {/* States */}
          {error && (
            <div className="run-state-msg run-state-error">
              <i className="fas fa-triangle-exclamation" aria-hidden="true" />
              <span>Could not load run data. Check back later.</span>
            </div>
          )}

          {!error && !data && (
            <div className="run-state-msg">
              <span className="run-spinner" aria-label="Loading runs" />
              <span>Loading runs...</span>
            </div>
          )}

          {!error && data && runs.length === 0 && (
            <p className="run-state-msg">No runs in the pipeline yet.</p>
          )}

          {!error && runs.length > 0 && (
            <div className="run-grid" role="list" aria-label="Run gallery">
              {runs.map(run => (
                <div key={run.run_id} role="listitem">
                  <RunCard run={run} />
                </div>
              ))}
            </div>
          )}

          {data && <PipelineFooter generatedAt={data.generated_at} />}
        </div>
      </div>
    </section>
  )
}

export default Running
