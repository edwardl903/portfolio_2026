import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Running.module.css'

const DATA_URL = 'https://cdn.jsdelivr.net/gh/edwardl903/whoop-analytics@main/data/runs.json'

// ── Polyline decoder ──────────────────────────────────────────────────────────
function decodePolyline(str) {
  const out = []
  let idx = 0, lat = 0, lng = 0
  while (idx < str.length) {
    let b, shift = 0, result = 0
    do { b = str.charCodeAt(idx++) - 63; result |= (b & 0x1f) << shift; shift += 5 } while (b >= 0x20)
    lat += (result & 1) ? ~(result >> 1) : result >> 1
    shift = 0; result = 0
    do { b = str.charCodeAt(idx++) - 63; result |= (b & 0x1f) << shift; shift += 5 } while (b >= 0x20)
    lng += (result & 1) ? ~(result >> 1) : result >> 1
    out.push([lat / 1e5, lng / 1e5])
  }
  return out
}

function polylineToSvg(encoded, W, H, PAD) {
  if (!encoded) return null
  const coords = decodePolyline(encoded)
  if (coords.length < 2) return null
  const lats = coords.map(c => c[0])
  const lngs = coords.map(c => c[1])
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const latR = maxLat - minLat || 0.001
  const lngR = maxLng - minLng || 0.001
  const scale = Math.min((W - PAD * 2) / lngR, (H - PAD * 2) / latR)
  const offX = (W - lngR * scale) / 2
  const offY = (H - latR * scale) / 2
  const pts = coords.map(([lt, lg]) => [
    +(offX + (lg - minLng) * scale).toFixed(1),
    +(H - offY - (lt - minLat) * scale).toFixed(1),
  ])
  return {
    d: 'M' + pts.map(([x, y]) => `${x},${y}`).join('L'),
    start: pts[0],
    end: pts[pts.length - 1],
  }
}

// ── Formatters ────────────────────────────────────────────────────────────────
function fmtDate(raw, opts = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!raw) return ''
  const d = new Date(raw + 'T00:00:00')
  return isNaN(d) ? raw : d.toLocaleDateString('en-US', opts)
}

function fmtPace(val) {
  if (val == null) return null
  const min = Math.floor(val)
  const sec = Math.round((val - min) * 60)
  return `${min}:${String(sec).padStart(2, '0')}/km`
}

function fmtTime(val) {
  if (val == null) return null
  const h = Math.floor(val / 60)
  const m = Math.floor(val % 60)
  const s = Math.round((val - Math.floor(val)) * 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m ${String(s).padStart(2, '0')}s`
}

// ── Route SVG ─────────────────────────────────────────────────────────────────
// routeKey change forces <path key={routeKey}> to remount, resetting
// stroke-dashoffset to 1 (hidden), so drawRoute animation replays from scratch.
function RunRoute({ polyline, runId, delay = 0, routeKey = 0 }) {
  const [animClass, setAnimClass] = useState('')
  const isReplay = routeKey > 0
  // Gradient IDs must be unique per card to avoid SVG defs collision
  const gid = `rg${String(runId).replace(/\D/g, 'x')}`
  const svg = polylineToSvg(polyline, 240, 380, 22)

  useEffect(() => {
    setAnimClass('')
    const t = setTimeout(
      () => setAnimClass(isReplay ? styles.routeReplay : styles.routeAnimate),
      isReplay ? 0 : 180 + delay,
    )
    return () => clearTimeout(t)
  }, [routeKey]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!svg) return null

  const [sx, sy] = svg.start
  const [ex, ey] = svg.end

  return (
    <svg viewBox="0 0 240 380" className={styles.routeSvg} aria-hidden="true">
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse"
          x1={sx} y1={sy} x2={ex} y2={ey}>
          <stop offset="0%"   stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>

      <rect width="240" height="380" fill="#0e0d0b" />

      {/* Glow — blurred duplicate sitting behind the route */}
      <path d={svg.d} stroke="#f97316" strokeWidth="10" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        opacity="0.1" style={{ filter: 'blur(6px)' }} />

      {/* Route — animated via CSS on .routePath */}
      <path
        key={routeKey}
        d={svg.d}
        stroke={`url(#${gid})`}
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        className={`${styles.routePath}${animClass ? ` ${animClass}` : ''}`}
      />

      {/* Start: green halo + dot */}
      <circle cx={sx} cy={sy} r="9" fill="#4ade80" opacity="0.12" />
      <circle cx={sx} cy={sy} r="4" fill="#4ade80" />

      {/* End: orange halo + dot */}
      <circle cx={ex} cy={ey} r="9" fill="#f97316" opacity="0.12" />
      <circle cx={ex} cy={ey} r="4" fill="#f97316" />
    </svg>
  )
}

// ── Recovery rail (back panel) ────────────────────────────────────────────────
function RecoveryRail({ before, after }) {
  if (before == null || after == null) return null
  const delta = after - before
  const pos = delta >= 0
  const lo = Math.min(before, after)
  const hi = Math.max(before, after)
  return (
    <div className={styles.section}>
      <span className={styles.sectionTitle}>Recovery Impact</span>
      <div className={styles.recRailWrap}>
        <span className={styles.recRailLabel}>{Math.round(before)}%</span>
        <div className={styles.recRail}>
          <div className={styles.recFill} style={{
            left: `${lo}%`, width: `${hi - lo}%`,
            background: pos ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)',
          }} />
          <div className={styles.recDot} style={{ left: `${before}%` }}>
            <span className={styles.recVal}>{Math.round(before)}</span>
          </div>
          <div className={`${styles.recDot} ${pos ? styles.recDotPos : styles.recDotNeg}`}
            style={{ left: `${after}%` }}>
            <span className={styles.recVal}>{Math.round(after)}</span>
          </div>
        </div>
        <span className={styles.recRailLabel}>{Math.round(after)}%</span>
      </div>
      <div className={styles.recMeta}>
        <span className={`${styles.recDelta} ${pos ? styles.pos : styles.neg}`}>
          {pos ? '+' : ''}{Math.round(delta)} pts
        </span>
        {delta && (
          <>
            <span className={styles.recMetaSep}>·</span>
            <span className={styles.recMetaItem}>{pos ? 'recovery improved' : 'recovery declined'}</span>
          </>
        )}
      </div>
    </div>
  )
}

// ── Signal row helper ─────────────────────────────────────────────────────────
function Sig({ label, value }) {
  if (value == null) return null
  return (
    <>
      <span className={styles.signalLabel}>{label}</span>
      <span className={styles.signalVal}>{value}</span>
    </>
  )
}

// ── Back panel ────────────────────────────────────────────────────────────────
function CardBack({ run }) {
  const delta  = run.recovery_delta
  const pos    = delta != null && delta >= 0
  const strain = run.same_day_strain != null ? Number(run.same_day_strain).toFixed(1) : null

  return (
    <div className={styles.backInner}>
      {/* Header */}
      <div className={styles.backHeader}>
        <span className={styles.backDate}>
          {fmtDate(run.run_date, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className={styles.backName}>{run.run_name || 'Run'}</span>
      </div>

      {/* Hero stats */}
      <div className={styles.heroRow}>
        {run.distance_km > 0 && (
          <div className={styles.heroStat}>
            <span className={styles.heroVal}>{run.distance_km.toFixed(2)}</span>
            <span className={styles.heroUnit}>km</span>
          </div>
        )}
        {run.pace_min_per_km != null && (
          <div className={styles.heroStat}>
            <span className={styles.heroVal}>{fmtPace(run.pace_min_per_km)}</span>
            <span className={styles.heroUnit}>pace</span>
          </div>
        )}
        {run.moving_time_min != null && (
          <div className={styles.heroStat}>
            <span className={styles.heroVal}>{fmtTime(run.moving_time_min)}</span>
            <span className={styles.heroUnit}>time</span>
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      {/* Recovery rail */}
      <RecoveryRail before={run.same_day_recovery} after={run.next_day_recovery} />

      {/* Recovery meta: delta + strain */}
      {(strain || run.same_day_avg_hr != null) && (
        <div className={styles.recMeta} style={{ marginTop: '0.15rem' }}>
          {strain && <><span className={styles.recMetaItem}>Strain {strain}</span></>}
          {strain && run.same_day_avg_hr != null && <span className={styles.recMetaSep}>·</span>}
          {run.same_day_avg_hr != null && (
            <span className={styles.recMetaItem}>Resting HR {Math.round(run.same_day_avg_hr)} bpm</span>
          )}
        </div>
      )}

      <hr className={styles.divider} />

      {/* Signals */}
      <div className={styles.section}>
        <span className={styles.sectionTitle}>Signals</span>
        <div className={styles.signalGrid}>
          <Sig label="Avg HR"
            value={run.run_avg_hr != null ? `${Math.round(run.run_avg_hr)} bpm` : null} />
          <Sig label="Max HR"
            value={run.run_max_hr != null ? `${Math.round(run.run_max_hr)} bpm` : null} />
          <Sig label="Elevation"
            value={run.total_elevation_gain_meter != null ? `${Math.round(run.total_elevation_gain_meter)} m` : null} />
          <Sig label="Suffer score"
            value={run.suffer_score != null ? run.suffer_score : null} />
          {run.same_day_hrv != null && run.next_day_hrv != null && (
            <Sig label="HRV" value={`${Math.round(run.same_day_hrv)} → ${Math.round(run.next_day_hrv)} ms`} />
          )}
          <Sig label="Resting HR (next)"
            value={run.next_day_resting_hr != null ? `${Math.round(run.next_day_resting_hr)} bpm` : null} />
          <Sig label="Sleep"
            value={run.next_day_sleep_hours != null ? `${Number(run.next_day_sleep_hours).toFixed(1)} hrs` : null} />
          <Sig label="Sleep perf."
            value={run.next_day_sleep_performance != null ? `${Math.round(run.next_day_sleep_performance)}%` : null} />
        </div>
      </div>
    </div>
  )
}

// ── Run card ──────────────────────────────────────────────────────────────────
function RunCard({ run, delay }) {
  const [flipped, setFlipped]   = useState(false)
  const [routeKey, setRouteKey] = useState(0)
  const replayTimer = useRef(null)

  const delta = run.recovery_delta
  const borderColor = delta == null  ? 'transparent'
    : delta > 0                      ? '#4ade80'
    : delta < -20                    ? '#f87171'
    : 'rgba(248,113,113,0.4)'

  const onEnter = () => {
    if (replayTimer.current) clearTimeout(replayTimer.current)
    setFlipped(true)
  }

  const onLeave = () => {
    setFlipped(false)
    // Wait for card to flip back (~half of 720ms), then replay draw animation
    replayTimer.current = setTimeout(() => setRouteKey(k => k + 1), 380)
  }

  useEffect(() => () => { if (replayTimer.current) clearTimeout(replayTimer.current) }, [])

  return (
    <article
      className={`${styles.card}${flipped ? ` ${styles.flipped}` : ''}`}
      style={{ '--delta-border': borderColor }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      aria-label={`Run on ${fmtDate(run.run_date)}, ${run.distance_km?.toFixed(2)} km`}
    >
      <div className={styles.cardInner}>
        {/* Front — the route */}
        <div className={styles.cardFront}>
          <RunRoute
            polyline={run.summary_polyline}
            runId={run.run_id}
            delay={delay}
            routeKey={routeKey}
          />
        </div>

        {/* Back — full stats */}
        <div className={styles.cardBack}>
          <CardBack run={run} />
        </div>
      </div>
    </article>
  )
}

// ── Summary pill ──────────────────────────────────────────────────────────────
function StatPill({ label, value, accent }) {
  return (
    <div className={`${styles.statPill}${accent ? ` ${styles.statPillAccent}` : ''}`}>
      <span className={styles.statVal}>{value ?? '--'}</span>
      <span className={styles.statLbl}>{label}</span>
    </div>
  )
}

// ── Delta bar chart ───────────────────────────────────────────────────────────
function DeltaChart({ runs }) {
  const [tip, setTip] = useState(null)
  const data = [...runs].reverse().filter(r => r.recovery_delta != null)
  if (data.length < 3) return null

  const W = 680, H = 96, ML = 6, MR = 6, MT = 8, MB = 20
  const CW = W - ML - MR, CH = H - MT - MB
  const deltas = data.map(r => r.recovery_delta)
  const maxAbs = Math.max(Math.abs(Math.min(...deltas)), Math.abs(Math.max(...deltas)), 15)
  const yZero = MT + CH / 2
  const toY = v => yZero - (v / maxAbs) * (CH / 2)
  const barW = Math.max(3, Math.floor(CW / data.length) - 2)

  return (
    <div className={styles.chartPanel}>
      <span className={styles.chartLabel}>recovery delta per run — oldest to newest. hover for details.</span>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.deltaChart}
        onMouseLeave={() => setTip(null)}>
        <line x1={ML} y1={yZero} x2={W - MR} y2={yZero}
          stroke="var(--border-color)" strokeWidth="1" />
        {data.map((run, i) => {
          const x = ML + (i / data.length) * CW
          const y = toY(run.recovery_delta)
          const barH = Math.max(Math.abs(y - yZero), 1)
          const isPos = run.recovery_delta >= 0
          return (
            <rect key={run.run_id}
              x={x + 1} y={isPos ? y : yZero} width={barW} height={barH}
              fill={isPos ? '#4ade80' : '#f87171'} opacity="0.72" rx="1"
              className={styles.chartBar}
              onMouseEnter={() => setTip({ run, x: x + barW / 2, isPos, y: isPos ? y : yZero + barH })}
            />
          )
        })}
        <text x={ML} y={MT + 8} fontSize="8" fill="var(--text-muted)" fontFamily="system-ui">+{Math.round(maxAbs)}</text>
        <text x={ML} y={yZero + CH / 2 + 11} fontSize="8" fill="var(--text-muted)" fontFamily="system-ui">−{Math.round(maxAbs)}</text>
        {tip && (() => {
          const tx = Math.min(Math.max(tip.x, 46), W - 46)
          const ty = tip.isPos ? tip.y + 4 : tip.y - 32
          return (
            <g>
              <rect x={tx - 44} y={ty} width="88" height="28" rx="4"
                fill="#1a1816" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x={tx} y={ty + 11} textAnchor="middle" fontSize="9"
                fill="#c0bab0" fontFamily="system-ui">
                {fmtDate(tip.run.run_date, { month: 'short', day: 'numeric' })}
              </text>
              <text x={tx} y={ty + 23} textAnchor="middle" fontSize="10"
                fill={tip.isPos ? '#4ade80' : '#f87171'} fontFamily="system-ui" fontWeight="600">
                {tip.isPos ? '+' : ''}{Math.round(tip.run.recovery_delta)} pts
              </text>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}

// ── Pipeline footer ───────────────────────────────────────────────────────────
function PipelineFooter({ generatedAt }) {
  const dateStr = generatedAt
    ? new Date(generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '--'
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
          Every morning GitHub Actions ingests Strava data into BigQuery, dbt joins it
          to WHOOP recovery scores, and the result auto-commits here as static JSON.
          No backend, no server cost, fully automated.
        </p>
        <Link to="/projects" className="cv2-pipeline-link">
          View the project <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
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

  const runs      = (data?.runs ?? []).filter(r => r.summary_polyline)
  const paceRuns  = runs.filter(r => r.pace_min_per_km != null && r.distance_km > 0)
  const distRuns  = runs.filter(r => r.distance_km > 0)
  const deltaRuns = runs.filter(r => r.recovery_delta != null)

  const avgPace  = paceRuns.length  ? paceRuns.reduce((s, r)  => s + r.pace_min_per_km, 0) / paceRuns.length  : null
  const avgDist  = distRuns.length  ? distRuns.reduce((s, r)  => s + r.distance_km, 0)      / distRuns.length  : null
  const avgDelta = deltaRuns.length ? deltaRuns.reduce((s, r) => s + r.recovery_delta, 0)   / deltaRuns.length : null

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
              Started running in college to get away from the laptop for an hour.
              Got more serious after graduation, WHOOP on my wrist, Strava logging
              every route. Eventually the data made it hard to pretend I was training smart.
            </p>
            <p>
              The recovery delta is the number I actually care about. The difference
              between my WHOOP recovery score the morning of a run and the morning
              after. Positive means the run helped. Hover any card to flip it and
              see the full breakdown.
            </p>
          </div>

          {runs.length > 0 && (
            <div className={styles.statsRow}>
              <StatPill label="runs logged"         value={runs.length} />
              <StatPill label="avg pace"            value={avgPace ? fmtPace(avgPace) : '--'} />
              <StatPill label="avg distance"        value={avgDist ? `${avgDist.toFixed(1)} km` : '--'} />
              <StatPill label="avg recovery delta"
                value={avgDelta != null ? `${avgDelta > 0 ? '+' : ''}${avgDelta.toFixed(1)}` : '--'}
                accent />
            </div>
          )}

          <DeltaChart runs={runs} />

          {error && (
            <div className={`${styles.stateMsg} ${styles.stateError}`}>
              <i className="fas fa-triangle-exclamation" aria-hidden="true" />
              <span>Could not load run data. Check back later.</span>
            </div>
          )}
          {!error && !data && (
            <div className={styles.stateMsg}>
              <span className={styles.spinner} aria-label="Loading" />
              <span>Loading runs...</span>
            </div>
          )}
          {!error && data && runs.length === 0 && (
            <p className={styles.stateMsg}>No GPS runs in the pipeline yet.</p>
          )}

          {!error && runs.length > 0 && (
            <div className={styles.grid} role="list" aria-label="Run gallery">
              {runs.map((run, i) => (
                <div key={run.run_id} role="listitem">
                  <RunCard run={run} delay={i * 120} />
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
