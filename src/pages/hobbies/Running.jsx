import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './Running.module.css'

const DATA_URL = 'https://cdn.jsdelivr.net/gh/edwardl903/whoop-analytics@main/data/runs.json'

const GREEN = '#4ade80'
const RED   = '#f87171'
const BLUE  = '#60a5fa'
const ORANGE = '#f97316'

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

function projectCoords(coords, W, H, PAD, bounds) {
  if (!coords || coords.length < 2) return null
  const lats = coords.map(c => c[0])
  const lngs = coords.map(c => c[1])
  const minLat = bounds ? bounds.minLat : Math.min(...lats)
  const maxLat = bounds ? bounds.maxLat : Math.max(...lats)
  const minLng = bounds ? bounds.minLng : Math.min(...lngs)
  const maxLng = bounds ? bounds.maxLng : Math.max(...lngs)
  const latR = (maxLat - minLat) || 0.001
  const lngR = (maxLng - minLng) || 0.001
  const midLat = (minLat + maxLat) / 2
  const lngScaleAdj = Math.cos((midLat * Math.PI) / 180)
  const effLngR = lngR * lngScaleAdj
  const scale = Math.min((W - PAD * 2) / effLngR, (H - PAD * 2) / latR)
  const drawW = effLngR * scale
  const drawH = latR * scale
  const offX = (W - drawW) / 2
  const offY = (H - drawH) / 2
  const pts = coords.map(([lt, lg]) => [
    +(offX + (lg - minLng) * lngScaleAdj * scale).toFixed(1),
    +(H - offY - (lt - minLat) * scale).toFixed(1),
  ])
  return { d: 'M' + pts.map(p => p.join(',')).join('L'), start: pts[0], end: pts[pts.length - 1] }
}

function runSvg(run, W, H, PAD, bounds) {
  if (!run?.summary_polyline) return null
  return projectCoords(decodePolyline(run.summary_polyline), W, H, PAD, bounds)
}

function fmtDate(raw, opts = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!raw) return ''
  const d = new Date(raw + 'T00:00:00')
  return isNaN(d) ? raw : d.toLocaleDateString('en-US', opts)
}

function fmtPace(val) {
  if (val == null) return null
  const m = Math.floor(val)
  const s = Math.round((val - m) * 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function fmtTime(val) {
  if (val == null) return null
  const h = Math.floor(val / 60)
  const m = Math.floor(val % 60)
  const s = Math.round((val - Math.floor(val)) * 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m ${String(s).padStart(2, '0')}s`
}

function useCountUp(target, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (target == null) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setVal(target); return }
    let raf, start
    const step = t => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(target * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

function Counter({ value, decimals = 0, prefix = '', suffix = '' }) {
  const v = useCountUp(value)
  const shown = value == null ? '--' : `${prefix}${v.toFixed(decimals)}${suffix}`
  return <span>{shown}</span>
}

function AllRoutesBackdrop({ runs, bounds }) {
  const W = 900, H = 520
  const paths = useMemo(
    () => runs.map(r => ({ id: r.run_id, svg: runSvg(r, W, H, 40, bounds) })).filter(p => p.svg),
    [runs, bounds],
  )
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.fullSize} aria-hidden="true"
      preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
      {paths.map((p, i) => (
        <path key={p.id} d={p.svg.d} fill="none" stroke="var(--accent)"
          strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
          opacity={0.10 + (i % 3) * 0.03} />
      ))}
    </svg>
  )
}

function StageRoute({ run }) {
  const W = 680, H = 460
  const [anim, setAnim] = useState('')
  const svg = useMemo(() => runSvg(run, W, H, 44), [run])
  const gid = `stage-grad-${String(run.run_id).replace(/\D/g, 'x')}`

  useEffect(() => {
    setAnim('')
    const t = setTimeout(() => setAnim(styles.routeAnimate), 60)
    return () => clearTimeout(t)
  }, [run.run_id])

  if (!svg) return null
  const [sx, sy] = svg.start
  const [ex, ey] = svg.end

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.routeMap} aria-hidden="true">
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={sx} y1={sy} x2={ex} y2={ey}>
          <stop offset="0%" stopColor={BLUE} />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
      </defs>

      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={(W / 8) * i} y1="0" x2={(W / 8) * i} y2={H}
          stroke="var(--run-grid)" strokeWidth="1" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={(H / 6) * i} x2={W} y2={(H / 6) * i}
          stroke="var(--run-grid)" strokeWidth="1" />
      ))}

      <path d={svg.d} fill="none" stroke={ORANGE} strokeWidth="9" opacity="0.12"
        strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'blur(7px)' }} />

      <path key={run.run_id} d={svg.d} fill="none" stroke={`url(#${gid})`} strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" pathLength="1"
        className={`${styles.routePath}${anim ? ` ${anim}` : ''}`} />

      <circle cx={sx} cy={sy} r="12" fill={GREEN} className={styles.markerPulse} />
      <circle cx={sx} cy={sy} r="5" fill={GREEN} />
      <circle cx={ex} cy={ey} r="12" fill={ORANGE} className={styles.markerPulse} />
      <circle cx={ex} cy={ey} r="5" fill={ORANGE} />
    </svg>
  )
}

function ThumbRoute({ run, active }) {
  const W = 128, H = 92
  const svg = useMemo(() => runSvg(run, W, H, 12), [run])
  if (!svg) return null
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.fullSize} aria-hidden="true">
      <path d={svg.d} fill="none"
        stroke={active ? 'var(--accent)' : 'var(--run-route-idle)'}
        strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RecoveryMeter({ before, after }) {
  if (before == null || after == null) {
    return <p className={styles.recoveryEmpty}>No WHOOP recovery data for this run.</p>
  }
  const delta = after - before
  const pos = delta >= 0
  const lo = Math.min(before, after)
  const hi = Math.max(before, after)
  return (
    <div>
      <div className={styles.recoveryHeader}>
        <span className={styles.eyebrow}>Recovery Impact</span>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: pos ? GREEN : RED }}>
          {pos ? '+' : ''}{Math.round(delta)} pts
        </span>
      </div>
      <div className={styles.recoveryTrack}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: `${lo}%`, width: `${hi - lo}%`,
          borderRadius: '999px',
          background: pos ? 'rgba(74,222,128,0.4)' : 'rgba(248,113,113,0.4)',
        }} />
        <Dot pct={before} color="var(--run-text-muted)" label={`${Math.round(before)}`} sub="before" />
        <Dot pct={after} color={pos ? GREEN : RED} label={`${Math.round(after)}`} sub="after" />
      </div>
      <p className={styles.recoveryNote}>
        {pos
          ? 'Recovery climbed the morning after this run.'
          : 'Recovery dipped the morning after this run.'}
      </p>
    </div>
  )
}

function Dot({ pct, color, label, sub }) {
  return (
    <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)' }}>
      <div className={styles.dotRing} style={{ background: color }} />
      <div style={{ position: 'absolute', left: '50%', top: '1rem', transform: 'translateX(-50%)', whiteSpace: 'nowrap', textAlign: 'center' }}>
        <div className={styles.dotLabel} style={{ color }}>{label}</div>
        <div className={styles.dotSub}>{sub}</div>
      </div>
    </div>
  )
}

function Signal({ label, value }) {
  if (value == null) return null
  return (
    <div className={styles.signalRow}>
      <span className={styles.signalLabel}>{label}</span>
      <span className={styles.signalValue}>{value}</span>
    </div>
  )
}

function Stage({ run }) {
  return (
    <div className={`${styles.card} ${styles.stage}`}>
      <div className={styles.stageMap}>
        <StageRoute run={run} />
        <div className={styles.mapOverlayTop}>
          <p className={styles.runTitle}>{run.run_name || 'Run'}</p>
          <p className={styles.runDate}>{fmtDate(run.run_date)}</p>
        </div>
        <div className={styles.mapOverlayBottom}>
          <span className={`${styles.runLegend} ${styles.legendItem}`}>
            <span style={{ height: 8, width: 8, borderRadius: '50%', background: GREEN, display: 'inline-block' }} /> Start
          </span>
          <span className={`${styles.runLegend} ${styles.legendItem}`}>
            <span style={{ height: 8, width: 8, borderRadius: '50%', background: ORANGE, display: 'inline-block' }} /> Finish
          </span>
        </div>
      </div>

      <div className={styles.stageTelemetry}>
        <div className={styles.stageStats}>
          <BigStat value={run.distance_km > 0 ? run.distance_km.toFixed(2) : '--'} unit="km" />
          <BigStat value={fmtPace(run.pace_min_per_km) ?? '--'} unit="min/km" />
          <BigStat value={fmtTime(run.moving_time_min) ?? '--'} unit="moving" />
        </div>

        <div className={styles.divider} />
        <RecoveryMeter before={run.same_day_recovery} after={run.next_day_recovery} />
        <div className={styles.divider} />

        <div>
          <span className={styles.eyebrow}>Signals</span>
          <div className={styles.signalGrid}>
            <Signal label="Avg HR" value={run.run_avg_hr != null ? `${Math.round(run.run_avg_hr)} bpm` : null} />
            <Signal label="Max HR" value={run.run_max_hr != null ? `${Math.round(run.run_max_hr)} bpm` : null} />
            <Signal label="Cadence" value={run.average_cadence != null ? `${Math.round(run.average_cadence)} spm` : null} />
            <Signal label="Elevation" value={run.total_elevation_gain_meter != null ? `${Math.round(run.total_elevation_gain_meter)} m` : null} />
            <Signal label="Strain" value={run.same_day_strain != null ? Number(run.same_day_strain).toFixed(1) : null} />
            <Signal label="Suffer" value={run.suffer_score != null ? run.suffer_score : null} />
            <Signal label="HRV" value={run.same_day_hrv != null && run.next_day_hrv != null ? `${Math.round(run.same_day_hrv)} → ${Math.round(run.next_day_hrv)} ms` : null} />
            <Signal label="Resting HR" value={run.next_day_resting_hr != null ? `${Math.round(run.next_day_resting_hr)} bpm` : null} />
            <Signal label="Sleep" value={run.next_day_sleep_hours != null ? `${Number(run.next_day_sleep_hours).toFixed(1)} hrs` : null} />
            <Signal label="Sleep perf." value={run.next_day_sleep_performance != null ? `${Math.round(run.next_day_sleep_performance)}%` : null} />
          </div>
        </div>
      </div>
    </div>
  )
}

function BigStat({ value, unit }) {
  return (
    <div>
      <div className={styles.bigStatValue}>{value}</div>
      <div className={styles.bigStatUnit}>{unit}</div>
    </div>
  )
}

function RecoveryScatter({ runs, selectedId, onSelect }) {
  const W = 720, H = 320
  const ML = 44, MR = 20, MT = 24, MB = 40
  const CW = W - ML - MR, CH = H - MT - MB
  const [hover, setHover] = useState(null)

  const pts = runs.filter(r => r.recovery_delta != null && r.same_day_strain != null)
  if (pts.length < 3) return null

  const strains = pts.map(r => r.same_day_strain)
  const deltas = pts.map(r => r.recovery_delta)
  const xMin = Math.min(...strains) - 1
  const xMax = Math.max(...strains) + 1
  const yAbs = Math.max(Math.abs(Math.min(...deltas)), Math.abs(Math.max(...deltas)), 15)
  const dists = pts.map(r => r.distance_km || 0)
  const dMax = Math.max(...dists, 1)

  const toX = v => ML + ((v - xMin) / (xMax - xMin)) * CW
  const toY = v => MT + CH / 2 - (v / yAbs) * (CH / 2)
  const yZero = MT + CH / 2

  return (
    <div className={`${styles.card} ${styles.scatter}`}>
      <h3 className={styles.scatterTitle}>Does running help me recover?</h3>
      <p className={styles.scatterDesc}>
        Each dot is a run, placed by how hard it was (WHOOP day strain) and what happened to my
        recovery the next morning. Bigger dots are longer runs. Click one to load it above.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }} onMouseLeave={() => setHover(null)}>
        <rect x={ML} y={MT} width={CW} height={CH / 2} fill="rgba(74,222,128,0.04)" />
        <rect x={ML} y={yZero} width={CW} height={CH / 2} fill="rgba(248,113,113,0.04)" />

        <line x1={ML} y1={yZero} x2={W - MR} y2={yZero}
          stroke="var(--run-border)" strokeWidth="1" strokeDasharray="4 4" />
        <text x={ML} y={MT - 8} fontSize="9" fill={GREEN} fontFamily="system-ui" fontWeight="600">recovered better ↑</text>
        <text x={ML} y={H - 8} fontSize="9" fill={RED} fontFamily="system-ui" fontWeight="600">taxed recovery ↓</text>
        <text x={W - MR} y={H - 8} fontSize="9" fill="var(--run-axis-label)" fontFamily="system-ui" textAnchor="end">higher strain →</text>

        {[-yAbs, 0, yAbs].map((v, i) => (
          <text key={i} x={ML - 8} y={toY(v) + 3} fontSize="8" fill="var(--run-axis)"
            fontFamily="system-ui" textAnchor="end">{v > 0 ? '+' : ''}{Math.round(v)}</text>
        ))}

        {pts.map(r => {
          const cx = toX(r.same_day_strain)
          const cy = toY(r.recovery_delta)
          const rad = 5 + (r.distance_km / dMax) * 9
          const pos = r.recovery_delta >= 0
          const isSel = r.run_id === selectedId
          return (
            <g key={r.run_id} style={{ cursor: 'pointer' }} onClick={() => onSelect(r.run_id)}
              onMouseEnter={() => setHover({ r, cx, cy })}>
              {isSel && <circle cx={cx} cy={cy} r={rad + 5} fill="none" stroke={ORANGE} strokeWidth="2" />}
              <circle cx={cx} cy={cy} r={rad} fill={pos ? GREEN : RED}
                opacity={isSel ? 0.95 : 0.6} stroke={pos ? GREEN : RED} strokeWidth="1" />
            </g>
          )
        })}

        {hover && (() => {
          const tx = Math.min(Math.max(hover.cx, 60), W - 60)
          const ty = Math.max(hover.cy - 46, 4)
          const pos = hover.r.recovery_delta >= 0
          return (
            <g pointerEvents="none">
              <rect x={tx - 58} y={ty} width="116" height="38" rx="5"
                fill="var(--run-tooltip-bg)" stroke="var(--run-border)" />
              <text x={tx} y={ty + 14} textAnchor="middle" fontSize="9"
                fill="var(--run-tooltip-text)" fontFamily="system-ui">
                {fmtDate(hover.r.run_date, { month: 'short', day: 'numeric' })} · {hover.r.distance_km?.toFixed(1)} km
              </text>
              <text x={tx} y={ty + 28} textAnchor="middle" fontSize="10" fontWeight="700"
                fill={pos ? GREEN : RED} fontFamily="system-ui">
                {pos ? '+' : ''}{Math.round(hover.r.recovery_delta)} pts recovery
              </text>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}

function PhotoStrip() {
  return (
    <div className={styles.photoGrid}>
      <div className={`${styles.photoCard} ${styles.photoCardOffset}`}>
        <img src="/running-photo-1.jpg" alt="Edward post-run by the river" className={styles.photoImg}
          style={{ objectPosition: 'center 20%' }} />
        <div className={styles.photoOverlay} />
        <p className={styles.photoCaption}>Post-run, Charles River</p>
      </div>
      <div className={styles.photoCard}>
        <img src="/running-photo-2.jpg" alt="Run club group" className={styles.photoImg}
          style={{ objectPosition: 'center 30%' }} />
        <div className={styles.photoOverlay} />
        <p className={styles.photoCaption}>Run club crew</p>
      </div>
    </div>
  )
}

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
          Every morning GitHub Actions ingests Strava data into BigQuery, dbt joins it to WHOOP
          recovery scores, and the result auto-commits here as static JSON. No backend, no server
          cost, fully automated.
        </p>
        <Link to="/projects" className="cv2-pipeline-link">
          View the project <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function HeroStat({ label, children }) {
  return (
    <div>
      <div className={styles.statValue}>{children}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

function Running() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    fetch(DATA_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  const runs = useMemo(() => (data?.runs ?? []).filter(r => r.summary_polyline), [data])

  useEffect(() => {
    if (runs.length && selectedId == null) setSelectedId(runs[0].run_id)
  }, [runs, selectedId])

  const bounds = useMemo(() => {
    const all = runs.flatMap(r => decodePolyline(r.summary_polyline))
    if (!all.length) return null
    const lats = all.map(c => c[0]), lngs = all.map(c => c[1])
    return {
      minLat: Math.min(...lats), maxLat: Math.max(...lats),
      minLng: Math.min(...lngs), maxLng: Math.max(...lngs),
    }
  }, [runs])

  const selected = runs.find(r => r.run_id === selectedId) ?? runs[0]

  const distRuns = runs.filter(r => r.distance_km > 0)
  const paceRuns = runs.filter(r => r.pace_min_per_km != null && r.distance_km > 0)
  const deltaRuns = runs.filter(r => r.recovery_delta != null)
  const totalDist = distRuns.reduce((s, r) => s + r.distance_km, 0)
  const avgPace = paceRuns.length ? paceRuns.reduce((s, r) => s + r.pace_min_per_km, 0) / paceRuns.length : null
  const avgDelta = deltaRuns.length ? deltaRuns.reduce((s, r) => s + r.recovery_delta, 0) / deltaRuns.length : null
  const helpRate = deltaRuns.length ? (deltaRuns.filter(r => r.recovery_delta > 0).length / deltaRuns.length) * 100 : null

  const onSelect = useCallback(id => {
    setSelectedId(id)
    document.getElementById('run-stage')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          {bounds && runs.length > 0 && (
            <div style={{ position: 'absolute', inset: 0, opacity: 0.7 }}>
              <AllRoutesBackdrop runs={runs} bounds={bounds} />
              <div className={styles.heroBackdrop} />
            </div>
          )}
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Strava × WHOOP</p>
            <h2 className={styles.heroTitle}>Running</h2>
            <p className={styles.heroBody}>
              Every route I have run, joined to my WHOOP recovery data. The question I kept asking:
              does a hard run actually set me back, or does my body bounce back stronger? Pick any
              run below and watch it draw, or scan the scatter to see the pattern.
            </p>
            {runs.length > 0 && (
              <div className={styles.heroStats}>
                <HeroStat label="runs mapped"><Counter value={runs.length} /></HeroStat>
                <HeroStat label="total km"><Counter value={totalDist} decimals={1} /></HeroStat>
                <HeroStat label="avg pace">
                  {avgPace ? <>{fmtPace(avgPace)}<span style={{ fontSize: '1rem' }}> /km</span></> : '--'}
                </HeroStat>
                <HeroStat label="runs that helped recovery">
                  <Counter value={helpRate} decimals={0} suffix="%" />
                </HeroStat>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className={styles.stateMessage}>
            <i className="fas fa-triangle-exclamation" style={{ color: RED }} aria-hidden="true" />
            <span>Could not load run data. Check back later.</span>
          </div>
        )}
        {!error && !data && (
          <div className={styles.stateMessage}>
            <span className={styles.spinner} />
            <span>Loading runs...</span>
          </div>
        )}
        {!error && data && runs.length === 0 && (
          <p className={styles.stateMessage}>No GPS runs in the pipeline yet.</p>
        )}

        {!error && selected && (
          <div className={styles.contentStack}>
            <div id="run-stage" className={styles.fadeUp} style={{ scrollMarginTop: '120px' }}>
              <Stage run={selected} />
            </div>

            <div>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionLabel}>All routes ({runs.length})</span>
                <span className={styles.sectionHint}>click to explore</span>
              </div>
              <div className={styles.filmstrip}>
                {runs.map(run => {
                  const active = run.run_id === selectedId
                  const delta = run.recovery_delta
                  const edge = delta == null ? 'transparent' : delta >= 0 ? GREEN : RED
                  return (
                    <button key={run.run_id} onClick={() => onSelect(run.run_id)}
                      className={`${styles.filmstripCard} ${active ? styles.filmstripCardActive : ''}`}
                      style={{ borderTopColor: edge }}
                      aria-label={`${fmtDate(run.run_date)}, ${run.distance_km?.toFixed(2)} km`}
                      aria-pressed={active}>
                      <div className={styles.thumbMap}>
                        <ThumbRoute run={run} active={active} />
                      </div>
                      <div className={styles.filmstripMeta}>
                        <div className={styles.filmstripDate}>
                          {fmtDate(run.run_date, { month: 'short', day: 'numeric' })}
                        </div>
                        <div className={styles.filmstripDist}>
                          {run.distance_km > 0 ? `${run.distance_km.toFixed(1)} km` : 'indoor'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <PhotoStrip />
            <RecoveryScatter runs={runs} selectedId={selectedId} onSelect={onSelect} />

            {avgDelta != null && (
              <p className={styles.takeaway}>
                Across {deltaRuns.length} runs my recovery moved{' '}
                <span style={{ fontWeight: 700, color: avgDelta >= 0 ? GREEN : RED }}>
                  {avgDelta >= 0 ? '+' : ''}{avgDelta.toFixed(1)} points
                </span>{' '}
                on average the next morning.
              </p>
            )}
          </div>
        )}

        {data && (
          <div className={styles.pipelineWrap}>
            <PipelineFooter generatedAt={data.generated_at} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Running
