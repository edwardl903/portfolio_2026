import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styles from './Running.module.css'

const DATA_URL = 'https://cdn.jsdelivr.net/gh/edwardl903/whoop-analytics@main/data/runs.json'

const GREEN = '#4ade80'
const RED   = '#f87171'
const BLUE  = '#60a5fa'
const ORANGE = '#f97316'

// ── Polyline decode ─────────────────────────────────────────────────────────
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

// Project raw lat/lng coords into an SVG box. Optionally use shared geo bounds
// (for overlaying many routes in the same coordinate space).
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
  // account for latitude compression so routes aren't horizontally stretched
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

// ── Formatters ────────────────────────────────────────────────────────────────
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

// ── Count-up hook ───────────────────────────────────────────────────────────
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

// ── All-routes backdrop (hero signature visual) ───────────────────────────────
function AllRoutesBackdrop({ runs, bounds }) {
  const W = 900, H = 520
  const paths = useMemo(
    () => runs.map(r => ({ id: r.run_id, svg: runSvg(r, W, H, 40, bounds) })).filter(p => p.svg),
    [runs, bounds],
  )
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true"
      preserveAspectRatio="xMidYMid slice">
      {paths.map((p, i) => (
        <path key={p.id} d={p.svg.d} fill="none" stroke="var(--accent)"
          strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
          opacity={0.10 + (i % 3) * 0.03} />
      ))}
    </svg>
  )
}

// ── Big route canvas (the stage) ──────────────────────────────────────────────
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
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1={sx} y1={sy} x2={ex} y2={ey}>
          <stop offset="0%" stopColor={BLUE} />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
        <filter id={`${gid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* subtle grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={(W / 8) * i} y1="0" x2={(W / 8) * i} y2={H}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={(H / 6) * i} x2={W} y2={(H / 6) * i}
          stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      ))}

      {/* glow underlay */}
      <path d={svg.d} fill="none" stroke={ORANGE} strokeWidth="9" opacity="0.12"
        strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'blur(7px)' }} />

      {/* animated route */}
      <path key={run.run_id} d={svg.d} fill="none" stroke={`url(#${gid})`} strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" pathLength="1"
        className={`${styles.routePath}${anim ? ` ${anim}` : ''}`} />

      {/* start */}
      <circle cx={sx} cy={sy} r="12" fill={GREEN} className={styles.markerPulse} />
      <circle cx={sx} cy={sy} r="5" fill={GREEN} />
      {/* finish */}
      <circle cx={ex} cy={ey} r="12" fill={ORANGE} className={styles.markerPulse} />
      <circle cx={ex} cy={ey} r="5" fill={ORANGE} />
    </svg>
  )
}

// ── Thumbnail route (filmstrip) ───────────────────────────────────────────────
function ThumbRoute({ run, active }) {
  const W = 128, H = 92
  const svg = useMemo(() => runSvg(run, W, H, 12), [run])
  if (!svg) return null
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true">
      <path d={svg.d} fill="none" stroke={active ? 'var(--accent)' : 'rgba(255,255,255,0.35)'}
        strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Recovery before/after bar ─────────────────────────────────────────────────
function RecoveryMeter({ before, after }) {
  if (before == null || after == null) {
    return <p className="text-sm text-white/40">No WHOOP recovery data for this run.</p>
  }
  const delta = after - before
  const pos = delta >= 0
  const lo = Math.min(before, after)
  const hi = Math.max(before, after)
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-accent">
          Recovery Impact
        </span>
        <span className="text-sm font-bold" style={{ color: pos ? GREEN : RED }}>
          {pos ? '+' : ''}{Math.round(delta)} pts
        </span>
      </div>
      <div className="relative h-2.5 w-full rounded-full bg-white/10">
        <div className="absolute inset-y-0 rounded-full"
          style={{ left: `${lo}%`, width: `${hi - lo}%`,
            background: pos ? 'rgba(74,222,128,0.4)' : 'rgba(248,113,113,0.4)' }} />
        <Dot pct={before} color="rgba(255,255,255,0.55)" label={`${Math.round(before)}`} sub="before" />
        <Dot pct={after} color={pos ? GREEN : RED} label={`${Math.round(after)}`} sub="after" />
      </div>
      <div className="mt-6 text-[0.7rem] text-white/45">
        {pos
          ? 'Recovery climbed the morning after this run.'
          : 'Recovery dipped the morning after this run.'}
      </div>
    </div>
  )
}

function Dot({ pct, color, label, sub }) {
  return (
    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${pct}%` }}>
      <div className="h-3.5 w-3.5 rounded-full border-2 border-[#0d0c0a]" style={{ background: color }} />
      <div className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-center">
        <div className="text-[0.7rem] font-bold" style={{ color }}>{label}</div>
        <div className="text-[0.55rem] uppercase tracking-wide text-white/35">{sub}</div>
      </div>
    </div>
  )
}

// ── Signal grid ───────────────────────────────────────────────────────────────
function Signal({ label, value }) {
  if (value == null) return null
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3 border-b border-white/5 py-1.5">
      <span className="shrink-0 text-[0.68rem] leading-snug text-white/40">{label}</span>
      <span className="truncate text-right text-[0.78rem] font-medium leading-snug text-white/85">{value}</span>
    </div>
  )
}

// ── The stage (cockpit) ─────────────────────────────────────────────────────
function Stage({ run }) {
  const delta = run.recovery_delta
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c0a] lg:grid-cols-[1.15fr_1fr]">
      {/* Left: route canvas */}
      <div className="relative min-h-[320px] border-b border-white/10 lg:border-b-0 lg:border-r">
        <StageRoute run={run} />
        <div className="pointer-events-none absolute left-5 top-5">
          <p className="font-heading text-lg font-bold text-white">{run.run_name || 'Run'}</p>
          <p className="text-xs text-white/50">{fmtDate(run.run_date)}</p>
        </div>
        <div className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-4 text-[0.65rem] text-white/45">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: GREEN }} /> Start
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: ORANGE }} /> Finish
          </span>
        </div>
      </div>

      {/* Right: telemetry */}
      <div className="flex flex-col gap-5 p-6">
        {/* Hero numbers */}
        <div className="grid grid-cols-3 gap-3">
          <BigStat value={run.distance_km > 0 ? run.distance_km.toFixed(2) : '--'} unit="km" />
          <BigStat value={fmtPace(run.pace_min_per_km) ?? '--'} unit="min/km" />
          <BigStat value={fmtTime(run.moving_time_min) ?? '--'} unit="moving" />
        </div>

        <div className="h-px w-full bg-white/8" />

        <RecoveryMeter before={run.same_day_recovery} after={run.next_day_recovery} />

        <div className="h-px w-full bg-white/8" />

        {/* Signals */}
        <div>
          <span className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.12em] text-accent">
            Signals
          </span>
          <div className="grid grid-cols-2 gap-x-8 sm:grid-cols-1">
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
    <div className="flex flex-col">
      <span className="font-heading text-2xl font-bold leading-none tracking-tight text-white">{value}</span>
      <span className="mt-1 text-[0.6rem] uppercase tracking-[0.08em] text-white/40">{unit}</span>
    </div>
  )
}

// ── Recovery scatter (effort vs recovery delta) ───────────────────────────────
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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c0a] p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-white/90">Does running help me recover?</h3>
      </div>
      <p className="mb-3 max-w-xl text-sm text-white/45">
        Each dot is a run, placed by how hard it was (WHOOP day strain) and what happened to my
        recovery the next morning. Bigger dots are longer runs. Click one to load it above.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onMouseLeave={() => setHover(null)}>
        {/* quadrant background above/below zero */}
        <rect x={ML} y={MT} width={CW} height={CH / 2} fill="rgba(74,222,128,0.04)" />
        <rect x={ML} y={yZero} width={CW} height={CH / 2} fill="rgba(248,113,113,0.04)" />

        {/* zero line */}
        <line x1={ML} y1={yZero} x2={W - MR} y2={yZero} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
        {/* axes labels */}
        <text x={ML} y={MT - 8} fontSize="9" fill={GREEN} fontFamily="system-ui" fontWeight="600">recovered better ↑</text>
        <text x={ML} y={H - 8} fontSize="9" fill={RED} fontFamily="system-ui" fontWeight="600">taxed recovery ↓</text>
        <text x={W - MR} y={H - 8} fontSize="9" fill="rgba(255,255,255,0.35)" fontFamily="system-ui" textAnchor="end">higher strain →</text>

        {/* y ticks */}
        {[-yAbs, 0, yAbs].map((v, i) => (
          <text key={i} x={ML - 8} y={toY(v) + 3} fontSize="8" fill="rgba(255,255,255,0.30)"
            fontFamily="system-ui" textAnchor="end">{v > 0 ? '+' : ''}{Math.round(v)}</text>
        ))}

        {/* points */}
        {pts.map(r => {
          const cx = toX(r.same_day_strain)
          const cy = toY(r.recovery_delta)
          const rad = 5 + (r.distance_km / dMax) * 9
          const pos = r.recovery_delta >= 0
          const isSel = r.run_id === selectedId
          return (
            <g key={r.run_id} className="cursor-pointer" onClick={() => onSelect(r.run_id)}
              onMouseEnter={() => setHover({ r, cx, cy })}>
              {isSel && <circle cx={cx} cy={cy} r={rad + 5} fill="none" stroke="#f97316" strokeWidth="2" />}
              <circle cx={cx} cy={cy} r={rad} fill={pos ? GREEN : RED}
                opacity={isSel ? 0.95 : 0.6} stroke={pos ? GREEN : RED} strokeWidth="1" />
            </g>
          )
        })}

        {/* hover tooltip */}
        {hover && (() => {
          const tx = Math.min(Math.max(hover.cx, 60), W - 60)
          const ty = Math.max(hover.cy - 46, 4)
          const pos = hover.r.recovery_delta >= 0
          return (
            <g pointerEvents="none">
              <rect x={tx - 58} y={ty} width="116" height="38" rx="5" fill="#1a1816" stroke="rgba(255,255,255,0.12)" />
              <text x={tx} y={ty + 14} textAnchor="middle" fontSize="9" fill="#c0bab0" fontFamily="system-ui">
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

// ── Photo strip ───────────────────────────────────────────────────────────────
function PhotoStrip() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>
      {/* Photo 1 — solo post-run */}
      <div style={{
        position: 'relative', borderRadius: '1rem', overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)', marginTop: '1.5rem',
      }}>
        <img
          src="/running-photo-1.jpg"
          alt="Edward post-run by the river"
          style={{ width: '100%', height: '340px', objectFit: 'cover', objectPosition: 'center 20%',
            display: 'block', filter: 'brightness(0.78) saturate(0.85)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(11,10,9,0.75) 0%, rgba(11,10,9,0.1) 50%, transparent 100%)',
        }} />
        <p style={{
          position: 'absolute', bottom: '0.85rem', left: '1rem',
          fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', margin: 0,
          letterSpacing: '0.04em',
        }}>Post-run, Charles River</p>
      </div>

      {/* Photo 2 — group run */}
      <div style={{
        position: 'relative', borderRadius: '1rem', overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <img
          src="/running-photo-2.jpg"
          alt="Run club group"
          style={{ width: '100%', height: '340px', objectFit: 'cover', objectPosition: 'center 30%',
            display: 'block', filter: 'brightness(0.78) saturate(0.85)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(11,10,9,0.75) 0%, rgba(11,10,9,0.1) 50%, transparent 100%)',
        }} />
        <p style={{
          position: 'absolute', bottom: '0.85rem', left: '1rem',
          fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', margin: 0,
          letterSpacing: '0.04em',
        }}>Run club crew</p>
      </div>
    </div>
  )
}

// ── Pipeline footer (shared global classes) ───────────────────────────────────
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

// ── Page ──────────────────────────────────────────────────────────────────────
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

  // Shared geo bounds across all routes for the hero backdrop
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

  // Aggregates
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
    <div style={{ background: '#0b0a09', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', paddingLeft: 0, paddingRight: 0 }}>
      <div className="container">
        {/* ── Hero ── */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c0a]" style={{ padding: '3rem 2.5rem' }}>
          {bounds && runs.length > 0 && (
            <div className="absolute inset-0 opacity-70">
              <AllRoutesBackdrop runs={runs} bounds={bounds} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0a] via-[#0d0c0a]/80 to-transparent" />
            </div>
          )}
          <div className="relative" style={{ maxWidth: '640px' }}>
            <p style={{ marginBottom: '0.75rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Strava × WHOOP
            </p>
            <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Running</h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.65)' }}>
              Every route I have run, joined to my WHOOP recovery data. The question I kept asking:
              does a hard run actually set me back, or does my body bounce back stronger? Pick any
              run below and watch it draw, or scan the scatter to see the pattern.
            </p>
            {runs.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
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

        {/* ── States ── */}
        {error && (
          <div className="flex items-center gap-3 py-10 text-white/60">
            <i className="fas fa-triangle-exclamation text-[#f87171]" aria-hidden="true" />
            <span>Could not load run data. Check back later.</span>
          </div>
        )}
        {!error && !data && (
          <div className="flex items-center gap-3 py-10 text-white/40">
            <span className={`${styles.spinner} h-4 w-4 rounded-full border-2 border-white/10 border-t-white/60`} />
            <span>Loading runs...</span>
          </div>
        )}
        {!error && data && runs.length === 0 && (
          <p className="py-10 text-white/40">No GPS runs in the pipeline yet.</p>
        )}

        {/* ── Stage + filmstrip + scatter ── */}
        {!error && selected && (
          <div className="flex flex-col gap-8">
            <div id="run-stage" className={styles.fadeUp} style={{ scrollMarginTop: '120px' }}>
              <Stage run={selected} />
            </div>

            {/* Filmstrip */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/40">
                  All routes ({runs.length})
                </span>
                <span className="text-[0.7rem] text-white/30">click to explore</span>
              </div>
              <div className={`${styles.filmstrip} flex gap-3 overflow-x-auto pb-3`}>
                {runs.map(run => {
                  const active = run.run_id === selectedId
                  const delta = run.recovery_delta
                  const edge = delta == null ? 'transparent' : delta >= 0 ? GREEN : RED
                  return (
                    <button key={run.run_id} onClick={() => onSelect(run.run_id)}
                      className={`group relative flex-shrink-0 overflow-hidden rounded-xl border bg-[#0d0c0a] transition-all duration-200 ${active ? 'border-accent' : 'border-white/10 hover:border-white/30'}`}
                      style={{ width: 128, height: 112, borderTopWidth: 3, borderTopColor: edge }}
                      aria-label={`${fmtDate(run.run_date)}, ${run.distance_km?.toFixed(2)} km`}
                      aria-pressed={active}>
                      <div className="h-[74px] w-full">
                        <ThumbRoute run={run} active={active} />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1">
                        <div className="truncate text-[0.6rem] font-semibold text-white/80">
                          {fmtDate(run.run_date, { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-[0.55rem] text-white/45">
                          {run.distance_km > 0 ? `${run.distance_km.toFixed(1)} km` : 'indoor'}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Photo strip */}
            <PhotoStrip />

            {/* Scatter insight */}
            <RecoveryScatter runs={runs} selectedId={selectedId} onSelect={onSelect} />

            {/* takeaway line */}
            {avgDelta != null && (
              <p className="text-center text-sm text-white/45">
                Across {deltaRuns.length} runs my recovery moved{' '}
                <span className="font-bold" style={{ color: avgDelta >= 0 ? GREEN : RED }}>
                  {avgDelta >= 0 ? '+' : ''}{avgDelta.toFixed(1)} points
                </span>{' '}
                on average the next morning.
              </p>
            )}
          </div>
        )}

        {data && <div className="mt-10"><PipelineFooter generatedAt={data.generated_at} /></div>}
      </div>
    </div>
  )
}

function HeroStat({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, color: '#fff' }}>{children}</span>
      <span style={{ marginTop: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'rgba(255,255,255,0.45)' }}>{label}</span>
    </div>
  )
}

export default Running
