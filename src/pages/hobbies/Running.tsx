import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
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

function runSvg(run, W, H, PAD, bounds?) {
  if (!run?.summary_polyline) return null
  return projectCoords(decodePolyline(run.summary_polyline), W, H, PAD, bounds)
}

function fmtDate(raw, opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!raw) return ''
  const d = new Date(raw + 'T00:00:00')
  return isNaN(d.getTime()) ? raw : d.toLocaleDateString('en-US', opts)
}

const KM_TO_MI = 0.621371
const MI_PACE_FACTOR = 1.60934  // multiply min/km to get min/mile

function kmToUnit(km, unit) {
  return unit === 'mi' ? km * KM_TO_MI : km
}

function fmtDist(km, unit) {
  if (km == null || km <= 0) return null
  return kmToUnit(km, unit).toFixed(2)
}

function fmtPace(val, unit = 'km') {
  if (val == null) return null
  const converted = unit === 'mi' ? val * MI_PACE_FACTOR : val
  const m = Math.floor(converted)
  const s = Math.round((converted - m) * 60)
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
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (target == null) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    // Only run the count-up animation on the very first value arrival.
    // Unit switches (or any later updates) snap instantly so there's no re-count glitch.
    if (reduce || hasAnimated.current) {
      setVal(target) // eslint-disable-line react-hooks/set-state-in-effect
      return
    }
    hasAnimated.current = true
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

// Wraps any value that changes on unit switch with a quick fade-in.
// Using key= causes React to remount the span, triggering the CSS animation.
function UnitFade({ watchKey, children }) {
  return <span key={watchKey} className={styles.unitFade}>{children}</span>
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
    setAnim('') // eslint-disable-line react-hooks/set-state-in-effect
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

// ── Sleep quality colour helper ───────────────────────────────────────────────
function sleepQualityColor(q) {
  if (!q) return '#818cf8'
  const s = q.toLowerCase()
  if (s.includes('excellent') || s.includes('great')) return '#4ade80'
  if (s.includes('good')) return '#60a5fa'
  if (s.includes('fair') || s.includes('okay')) return '#f97316'
  return '#f87171'
}

// ── Sleep panel ───────────────────────────────────────────────────────────────
function SleepPanel({ run }) {
  const hours = run.next_day_sleep_hours != null ? Number(run.next_day_sleep_hours) : null
  const perf  = run.next_day_sleep_performance != null ? Math.round(run.next_day_sleep_performance) : null
  const qual  = run.next_day_sleep_quality ?? null
  const hrv1  = run.same_day_hrv != null ? Math.round(run.same_day_hrv) : null
  const hrv2  = run.next_day_hrv != null ? Math.round(run.next_day_hrv) : null
  const rhr   = run.next_day_resting_hr != null ? Math.round(run.next_day_resting_hr) : null

  if (hours == null && perf == null) {
    return <p className={styles.sleepEmpty}>No sleep data linked to this run.</p>
  }

  const MAX_SLEEP = 9
  const barPct = hours != null ? Math.min(hours / MAX_SLEEP, 1) * 100 : 0
  const hrvDelta = hrv1 != null && hrv2 != null ? hrv2 - hrv1 : null
  const qColor = sleepQualityColor(qual)

  return (
    <div className={styles.sleepPanel}>
      {/* Hours + bar */}
      {hours != null && (
        <div>
          <div className={styles.sleepHoursRow}>
            <div>
              <span className={styles.sleepHoursNumber}>{hours.toFixed(1)}</span>
              <span className={styles.sleepHoursUnit}>hrs</span>
            </div>
            {qual && (
              <span className={styles.sleepQualityBadge} style={{
                background: `${qColor}22`, color: qColor, borderColor: `${qColor}44`,
              }}>{qual}</span>
            )}
          </div>
          <div className={styles.sleepBarTrack} style={{ marginTop: '0.6rem' }}>
            <div className={styles.sleepBarFill} style={{ width: `${barPct}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.3rem' }}>
            <span className={styles.sleepHoursLabel}>0 hrs</span>
            <span className={styles.sleepHoursLabel}>9 hrs target</span>
          </div>
        </div>
      )}

      {/* Metric cards */}
      <div className={styles.sleepMetricGrid}>
        {perf != null && (
          <div className={styles.sleepMetricCard}>
            <div className={styles.sleepMetricCardLabel}>Sleep perf.</div>
            <div className={styles.sleepMetricCardValue} style={{ color: perf >= 85 ? GREEN : perf >= 70 ? ORANGE : RED }}>
              {perf}%
            </div>
            <div className={styles.sleepMetricCardSub}>next morning</div>
          </div>
        )}
        {rhr != null && (
          <div className={styles.sleepMetricCard}>
            <div className={styles.sleepMetricCardLabel}>Resting HR</div>
            <div className={styles.sleepMetricCardValue}>{rhr} <span style={{ fontSize: '0.7rem', fontWeight: 400 }}>bpm</span></div>
            <div className={styles.sleepMetricCardSub}>next morning</div>
          </div>
        )}
        {hrv1 != null && hrv2 != null && (
          <div className={styles.sleepMetricCard} style={{ gridColumn: hrv1 != null && hrv2 != null && perf == null && rhr == null ? 'span 2' : undefined }}>
            <div className={styles.sleepMetricCardLabel}>HRV</div>
            <div className={styles.sleepMetricCardValue} style={{ fontSize: '0.95rem' }}>
              {hrv1}
              <span className={styles.hrvArrow}>→</span>
              <span style={{ color: hrvDelta >= 0 ? GREEN : RED }}>{hrv2}</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 400, color: 'var(--run-text-muted)', marginLeft: '0.2rem' }}>ms</span>
            </div>
            <div className={styles.sleepMetricCardSub} style={{ color: hrvDelta >= 0 ? GREEN : RED }}>
              {hrvDelta >= 0 ? '+' : ''}{hrvDelta} ms overnight
            </div>
          </div>
        )}
        {run.same_day_recovery != null && run.next_day_recovery != null && (
          <div className={styles.sleepMetricCard}>
            <div className={styles.sleepMetricCardLabel}>Recovery</div>
            <div className={styles.sleepMetricCardValue} style={{ fontSize: '0.95rem' }}>
              {Math.round(run.same_day_recovery)}
              <span className={styles.hrvArrow}>→</span>
              <span style={{ color: run.next_day_recovery > run.same_day_recovery ? GREEN : RED }}>
                {Math.round(run.next_day_recovery)}
              </span>
            </div>
            <div className={styles.sleepMetricCardSub}>before → after</div>
          </div>
        )}
      </div>

      {/* Narrative */}
      {perf != null && hours != null && (
        <p style={{ fontSize: '0.7rem', color: 'var(--run-text-muted)', margin: 0 }}>
          {perf >= 85 && hours >= 7
            ? 'Strong sleep night after this run — body absorbed it well.'
            : perf < 70 || hours < 6
            ? 'Tough night after this run. Harder efforts can compress recovery sleep.'
            : 'Solid sleep night, though there is room for more rest.'}
        </p>
      )}
    </div>
  )
}

// ── Stage with tabs ───────────────────────────────────────────────────────────
function Stage({ run, badge, idx, total, onPrev, onNext, unit = 'km' }) {
  const [tab, setTab] = useState('run')

  // Reset to run tab when run changes
  const prevId = useRef(run.run_id)
  useEffect(() => {
    if (prevId.current !== run.run_id) { setTab('run'); prevId.current = run.run_id } // eslint-disable-line react-hooks/set-state-in-effect
  }, [run.run_id])

  return (
    <div className={`${styles.card} ${styles.stage}`}>
      {/* Left: route map */}
      <div className={styles.stageMap}>
        <StageRoute run={run} />
        <div className={styles.mapOverlayTop}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <div>
              <p className={styles.runTitle}>{run.run_name || 'Run'}</p>
              <p className={styles.runDate}>{fmtDate(run.run_date)}</p>
            </div>
            {badge && (
              <span className={styles.runBadge} style={{ background: `${badge.color}22`, color: badge.color, borderColor: `${badge.color}44` }}>
                {badge.label}
              </span>
            )}
          </div>
        </div>
        <div className={styles.mapOverlayBottom}>
          <span className={`${styles.runLegend} ${styles.legendItem}`}>
            <span style={{ height: 8, width: 8, borderRadius: '50%', background: GREEN, display: 'inline-block' }} /> Start
          </span>
          <span className={`${styles.runLegend} ${styles.legendItem}`}>
            <span style={{ height: 8, width: 8, borderRadius: '50%', background: ORANGE, display: 'inline-block' }} /> Finish
          </span>
        </div>
        {/* Prev / Next arrows overlaid on the map */}
        {onPrev && (
          <button className={styles.mapNavBtn} style={{ left: '0.5rem' }}
            onClick={onPrev} aria-label="Previous run" type="button">
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
        )}
        {onNext && (
          <button className={styles.mapNavBtn} style={{ right: '0.5rem' }}
            onClick={onNext} aria-label="Next run" type="button">
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Right: tabbed telemetry */}
      <div className={styles.stageTelemetry}>
        {/* Top stats + position counter */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div className={styles.stageStats}>
            <BigStat value={<UnitFade watchKey={unit}>{fmtDist(run.distance_km, unit) ?? '--'}</UnitFade>} unit={unit} />
            <BigStat value={<UnitFade watchKey={unit}>{fmtPace(run.pace_min_per_km, unit) ?? '--'}</UnitFade>} unit={`min/${unit}`} />
            <BigStat value={fmtTime(run.moving_time_min) ?? '--'} unit="moving" />
          </div>
          {total != null && (
            <span className={styles.stageCounter}>{idx + 1} / {total}</span>
          )}
        </div>

        <div className={styles.divider} />

        {/* Tab bar */}
        <div className={styles.tabBar}>
          {[['run', 'Run'], ['recovery', 'Recovery'], ['sleep', 'Sleep']].map(([id, label]) => (
            <button key={id} className={`${styles.tab} ${tab === id ? styles.tabActive : ''}`}
              onClick={() => setTab(id)} type="button">
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div key={tab} className={styles.tabContent}>
          {tab === 'run' && (
            <div className={styles.signalGrid2col}>
              <Signal label="Avg HR"    value={run.run_avg_hr != null ? `${Math.round(run.run_avg_hr)} bpm` : null} />
              <Signal label="Max HR"    value={run.run_max_hr != null ? `${Math.round(run.run_max_hr)} bpm` : null} />
              <Signal label="Cadence"   value={run.average_cadence != null ? `${Math.round(run.average_cadence)} spm` : null} />
              <Signal label="Elevation" value={run.total_elevation_gain_meter != null ? `${Math.round(run.total_elevation_gain_meter)} m` : null} />
              <Signal label="Strain"    value={run.same_day_strain != null ? Number(run.same_day_strain).toFixed(1) : null} />
              <Signal label="Suffer"    value={run.suffer_score != null ? String(run.suffer_score) : null} />
            </div>
          )}
          {tab === 'recovery' && (
            <RecoveryMeter before={run.same_day_recovery} after={run.next_day_recovery} />
          )}
          {tab === 'sleep' && (
            <SleepPanel run={run} />
          )}
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

function RecoveryScatter({ runs, selectedId, onSelect, unit = 'km' }) {
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
                {fmtDate(hover.r.run_date, { month: 'short', day: 'numeric' })} · {kmToUnit(hover.r.distance_km ?? 0, unit).toFixed(1)} {unit}
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

// ── Trends over time ──────────────────────────────────────────────────────────
const TREND_METRICS = [
  { id: 'pace',     label: 'Pace',     color: ORANGE,    better: 'lower' },
  { id: 'distance', label: 'Distance', color: BLUE,      better: 'higher' },
  { id: 'recovery', label: 'Recovery', color: GREEN,     better: 'higher' },
  { id: 'run_hr',   label: 'Run HR',   color: RED,       better: null },
  { id: 'sleep',    label: 'Sleep',    color: '#818cf8', better: 'higher' },
  { id: 'strain',   label: 'Strain',   color: '#facc15', better: null },
]

function metricValue(run, id, unit) {
  switch (id) {
    case 'pace':
      if (run.pace_min_per_km == null || !(run.distance_km > 0)) return null
      return unit === 'mi' ? run.pace_min_per_km * MI_PACE_FACTOR : run.pace_min_per_km
    case 'distance':
      return run.distance_km > 0 ? kmToUnit(run.distance_km, unit) : null
    case 'recovery':
      return run.next_day_recovery ?? null
    case 'run_hr':
      return run.run_avg_hr ?? null
    case 'sleep':
      return run.next_day_sleep_hours != null ? Number(run.next_day_sleep_hours) : null
    case 'strain':
      return run.same_day_strain != null ? Number(run.same_day_strain) : null
    default:
      return null
  }
}

function metricFmt(id, v) {
  if (v == null) return '--'
  if (id === 'pace') {
    // v is already converted to min per selected unit, so format directly.
    const m = Math.floor(v)
    const s = Math.round((v - m) * 60)
    return `${m}:${String(s).padStart(2, '0')}`
  }
  if (id === 'distance' || id === 'sleep' || id === 'strain') return v.toFixed(1)
  return String(Math.round(v))
}

function metricUnitLabel(id, unit) {
  switch (id) {
    case 'pace': return `min/${unit}`
    case 'distance': return unit
    case 'recovery': return 'pts'
    case 'run_hr': return 'bpm'
    case 'sleep': return 'hrs'
    default: return ''
  }
}

function buildTrendCaption(metric, delta, days, unit, count) {
  if (count < 3) return null
  const up = delta > 0
  const mag = Math.abs(delta)
  const dir = up ? 'up' : 'down'
  switch (metric.id) {
    case 'pace': {
      const secs = Math.round(mag * 60)
      if (secs < 2) return `Pace has held steady across ${days} days.`
      return up
        ? `Pace drifting up about ${secs}s/${unit} over ${days} days, a touch slower.`
        : `Pace trending down about ${secs}s/${unit} over ${days} days. Getting faster.`
    }
    case 'distance':
      return `Run distance trending ${dir} about ${mag.toFixed(1)} ${unit} over ${days} days.`
    case 'recovery':
      return `Next-day recovery trending ${dir} about ${Math.round(mag)} pts over ${days} days.`
    case 'sleep':
      return `Sleep trending ${dir} about ${mag.toFixed(1)} hrs over ${days} days.`
    case 'run_hr':
      return `Run avg HR trending ${dir} about ${Math.round(mag)} bpm over ${days} days.`
    case 'strain':
      return `Day strain trending ${dir} about ${mag.toFixed(1)} over ${days} days.`
    default:
      return null
  }
}

function TrendChart({ runs, selectedId, onSelect, unit = 'km' }) {
  const [metric, setMetric] = useState('pace')
  const [hover, setHover] = useState(null)
  const W = 720, H = 320
  const ML = 46, MR = 20, MT = 24, MB = 40
  const CW = W - ML - MR, CH = H - MT - MB

  const active = TREND_METRICS.find(m => m.id === metric) ?? TREND_METRICS[0]

  const { pts, chrono } = useMemo(() => {
    const sorted = [...runs].sort(
      (a, b) => new Date(a.run_start).getTime() - new Date(b.run_start).getTime(),
    )
    const points = sorted
      .map(r => ({
        run_id: r.run_id,
        t: new Date(r.run_start).getTime(),
        date: r.run_date,
        y: metricValue(r, metric, unit),
      }))
      .filter(p => p.y != null && !Number.isNaN(p.t))
    return { pts: points, chrono: sorted }
  }, [runs, metric, unit])

  const cumul = useMemo(() => {
    if (metric !== 'distance') return null
    let sum = 0
    return chrono
      .filter(r => r.distance_km > 0 && r.run_start)
      .map(r => {
        sum += kmToUnit(r.distance_km, unit)
        return { t: new Date(r.run_start).getTime(), c: sum }
      })
  }, [chrono, metric, unit])

  if (pts.length < 2) return null

  const ts = pts.map(p => p.t)
  const ys = pts.map(p => p.y)
  const tMin = Math.min(...ts), tMax = Math.max(...ts)
  const tSpan = (tMax - tMin) || 1
  let yLo = Math.min(...ys), yHi = Math.max(...ys)
  const pad = ((yHi - yLo) || 1) * 0.12
  yLo -= pad; yHi += pad
  const ySpan = (yHi - yLo) || 1

  const toX = t => ML + ((t - tMin) / tSpan) * CW
  const toY = v => MT + CH - ((v - yLo) / ySpan) * CH

  const linePath = 'M' + pts.map(p => `${toX(p.t).toFixed(1)},${toY(p.y).toFixed(1)}`).join('L')

  const n = pts.length
  const tm = ts.reduce((s, v) => s + v, 0) / n
  const ym = ys.reduce((s, v) => s + v, 0) / n
  let num = 0, den = 0
  for (let i = 0; i < n; i++) { num += (ts[i] - tm) * (ys[i] - ym); den += (ts[i] - tm) ** 2 }
  const slope = den ? num / den : 0
  const fitStart = ym + slope * (tMin - tm)
  const fitEnd = ym + slope * (tMax - tm)
  const trendDelta = fitEnd - fitStart
  const days = Math.max(1, Math.round(tSpan / 86400000))

  let cumulPath = null
  if (cumul && cumul.length > 1) {
    const cMax = Math.max(...cumul.map(c => c.c)) || 1
    const cToY = c => MT + CH - (c / cMax) * CH
    cumulPath =
      `M${toX(cumul[0].t).toFixed(1)},${(MT + CH).toFixed(1)}L` +
      cumul.map(c => `${toX(c.t).toFixed(1)},${cToY(c.c).toFixed(1)}`).join('L') +
      `L${toX(cumul[cumul.length - 1].t).toFixed(1)},${(MT + CH).toFixed(1)}Z`
  }

  const yTicks = [yLo + ySpan * 0.06, yLo + ySpan / 2, yHi - ySpan * 0.06]
  const caption = buildTrendCaption(active, trendDelta, days, unit, pts.length)

  return (
    <div className={`${styles.card} ${styles.scatter}`}>
      <h3 className={styles.scatterTitle}>How my running is trending</h3>
      <p className={styles.scatterDesc}>
        Every run over time. Pick a metric to see how it is moving. The dashed line is the
        overall trend. Click any point to load that run above.
      </p>

      <div className={styles.trendChips}>
        {TREND_METRICS.map(m => (
          <button key={m.id} type="button"
            className={`${styles.trendChip} ${metric === m.id ? styles.trendChipActive : ''}`}
            style={metric === m.id ? { borderColor: m.color, color: m.color } : undefined}
            onClick={() => setMetric(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%' }} onMouseLeave={() => setHover(null)}>
        {yTicks.map((v, i) => (
          <g key={i}>
            <line x1={ML} y1={toY(v)} x2={W - MR} y2={toY(v)}
              stroke="var(--run-grid)" strokeWidth="1" />
            <text x={ML - 8} y={toY(v) + 3} fontSize="8" fill="var(--run-axis)"
              fontFamily="system-ui" textAnchor="end">{metricFmt(active.id, v)}</text>
          </g>
        ))}

        <text x={ML} y={H - 8} fontSize="9" fill="var(--run-axis-label)" fontFamily="system-ui">
          {fmtDate(pts[0].date, { month: 'short', day: 'numeric' })}
        </text>
        <text x={W - MR} y={H - 8} fontSize="9" fill="var(--run-axis-label)"
          fontFamily="system-ui" textAnchor="end">
          {fmtDate(pts[pts.length - 1].date, { month: 'short', day: 'numeric' })}
        </text>

        {cumulPath && <path d={cumulPath} fill={`${BLUE}14`} stroke="none" />}

        {pts.length >= 3 && (
          <line x1={toX(tMin)} y1={toY(fitStart)} x2={toX(tMax)} y2={toY(fitEnd)}
            stroke={active.color} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
        )}

        <path d={linePath} fill="none" stroke={active.color} strokeWidth="2.5"
          strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />

        {pts.map(p => {
          const isSel = p.run_id === selectedId
          return (
            <g key={p.run_id} style={{ cursor: 'pointer' }}
              onClick={() => onSelect(p.run_id)} onMouseEnter={() => setHover(p)}>
              {isSel && <circle cx={toX(p.t)} cy={toY(p.y)} r="9" fill="none"
                stroke={active.color} strokeWidth="2" />}
              <circle cx={toX(p.t)} cy={toY(p.y)} r={isSel ? 5 : 4}
                fill={active.color} opacity={isSel ? 1 : 0.85} />
            </g>
          )
        })}

        {hover && (() => {
          const tx = Math.min(Math.max(toX(hover.t), 60), W - 60)
          const ty = Math.max(toY(hover.y) - 44, 4)
          return (
            <g pointerEvents="none">
              <rect x={tx - 56} y={ty} width="112" height="36" rx="5"
                fill="var(--run-tooltip-bg)" stroke="var(--run-border)" />
              <text x={tx} y={ty + 14} textAnchor="middle" fontSize="9"
                fill="var(--run-tooltip-text)" fontFamily="system-ui">
                {fmtDate(hover.date, { month: 'short', day: 'numeric' })}
              </text>
              <text x={tx} y={ty + 28} textAnchor="middle" fontSize="11" fontWeight="700"
                fill={active.color} fontFamily="system-ui">
                {metricFmt(active.id, hover.y)} {metricUnitLabel(active.id, unit)}
              </text>
            </g>
          )
        })()}
      </svg>

      {caption && <p className={styles.trendCaption}>{caption}</p>}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/projects" className="cv2-pipeline-link">
            View the project <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
          <a
            href="https://edwardl903.github.io/whoop-debrief/#!/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="cv2-pipeline-link"
          >
            dbt docs <i className="fas fa-arrow-right" aria-hidden="true" />
          </a>
        </div>
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
  const [unit, setUnit] = useState('km')

  useEffect(() => {
    fetch(DATA_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(setData)
      .catch(e => setError(e.message))
  }, [])

  const runs = useMemo(() => (data?.runs ?? []).filter(r => r.summary_polyline), [data])

  useEffect(() => {
    if (runs.length && selectedId == null) setSelectedId(runs[0].run_id) // eslint-disable-line react-hooks/set-state-in-effect
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

  const selectedIdx = runs.findIndex(r => r.run_id === selectedId)

  const goTo = useCallback(idx => {
    if (idx < 0 || idx >= runs.length) return
    setSelectedId(runs[idx].run_id)
  }, [runs])

  // Filmstrip click: select + scroll to stage
  const onSelectScroll = useCallback(id => {
    setSelectedId(id)
    document.getElementById('run-stage')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [])

  // Scatter click: select only, no scroll (user is already looking at scatter)
  const onSelectQuiet = useCallback(id => {
    setSelectedId(id)
  }, [])

  // Keyboard ← / → to step through runs
  useEffect(() => {
    const handler = e => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(selectedIdx - 1) }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(selectedIdx + 1) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedIdx, goTo])

  // Personal best badge for the selected run
  const badge = useMemo(() => {
    if (!selected || runs.length < 2) return null
    const paceRuns = runs.filter(r => r.pace_min_per_km != null && r.distance_km > 0)
    const bestPace = paceRuns.length ? Math.min(...paceRuns.map(r => r.pace_min_per_km)) : null
    const longestDist = Math.max(...runs.map(r => r.distance_km || 0))
    const validDelta = runs.filter(r => r.recovery_delta != null)
    const bestDelta = validDelta.length ? Math.max(...validDelta.map(r => r.recovery_delta)) : null
    if (bestPace != null && selected.pace_min_per_km === bestPace) return { label: 'PR Pace', color: ORANGE }
    if (selected.distance_km === longestDist && longestDist > 0)   return { label: 'Longest Run', color: BLUE }
    if (bestDelta != null && selected.recovery_delta === bestDelta) return { label: 'Best Recovery', color: GREEN }
    return null
  }, [selected, runs])

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/running-cover.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            opacity: 0.28,
          }} />
          {bounds && runs.length > 0 && (
            <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
              <AllRoutesBackdrop runs={runs} bounds={bounds} />
              <div className={styles.heroBackdrop} />
            </div>
          )}
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Strava × WHOOP</p>
            <h2 className={styles.heroTitle}>Running</h2>
            <p className={styles.heroBody}>
              My sister got me into distance running in June 2026. I ran varsity track in high
              school, but I was always a sprinter: 55m, 300m, never anything longer than
              400m. Distance running was a completely different world. Since moving to Cambridge
              I have been running along the Charles River constantly, trying to get my 5K time
              down, joining run clubs, and even starting my own. I wear a WHOOP every day, so
              naturally I started tracking whether the runs were helping my recovery or just
              wrecking me. Every route here is real GPS from Strava, joined to WHOOP recovery
              the next morning via BigQuery and dbt. My running journey, with data.
            </p>
            {runs.length > 0 && (
              <div className={styles.heroStats}>
                <HeroStat label="runs mapped"><Counter value={runs.length} /></HeroStat>
                <HeroStat label={`total ${unit}`}>
                  <UnitFade watchKey={unit}><Counter value={kmToUnit(totalDist, unit)} decimals={1} /></UnitFade>
                </HeroStat>
                <HeroStat label="avg pace">
                  <UnitFade watchKey={unit}>
                    {avgPace ? <>{fmtPace(avgPace, unit)}<span style={{ fontSize: '1rem' }}> /{unit}</span></> : '--'}
                  </UnitFade>
                </HeroStat>
                <HeroStat label="runs that helped recovery">
                  <Counter value={helpRate} decimals={0} suffix="%" />
                </HeroStat>
                <button
                  className={styles.unitToggle}
                  onClick={() => setUnit(u => u === 'km' ? 'mi' : 'km')}
                  aria-label={`Switch to ${unit === 'km' ? 'miles' : 'kilometers'}`}
                  type="button"
                >
                  <span className={unit === 'km' ? styles.unitActive : styles.unitInactive}>km</span>
                  <span className={styles.unitSep}>/</span>
                  <span className={unit === 'mi' ? styles.unitActive : styles.unitInactive}>mi</span>
                </button>
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
              <Stage
                run={selected}
                badge={badge}
                idx={selectedIdx}
                total={runs.length}
                unit={unit}
                onPrev={selectedIdx > 0 ? () => goTo(selectedIdx - 1) : null}
                onNext={selectedIdx < runs.length - 1 ? () => goTo(selectedIdx + 1) : null}
              />
              <p className={styles.keyHint}>
                <kbd>←</kbd> <kbd>→</kbd> to step through runs
              </p>
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
                    <button key={run.run_id} onClick={() => onSelectScroll(run.run_id)}
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
                          {run.distance_km > 0 ? `${kmToUnit(run.distance_km, unit).toFixed(1)} ${unit}` : 'indoor'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <TrendChart runs={runs} selectedId={selectedId} onSelect={onSelectQuiet} unit={unit} />
            <PhotoStrip />
            <RecoveryScatter runs={runs} selectedId={selectedId} onSelect={onSelectQuiet} unit={unit} />

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
