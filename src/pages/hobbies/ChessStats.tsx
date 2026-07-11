import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.DEV
  ? '/api-chess/api/portfolio/stats'
  : 'https://chesslyzer-app-51eb54138df6.herokuapp.com/api/portfolio/stats'

const TIME_CLASSES = [
  { key: 'blitz',  label: 'Blitz'  },
  { key: 'rapid',  label: 'Rapid'  },
  { key: 'bullet', label: 'Bullet' },
]

const DATE_RANGES = [
  { label: '30D', days: 30       },
  { label: '90D', days: 90       },
  { label: 'All', days: Infinity },
]

// SVG chart layout constants
const ML = 52, MR = 10, MT = 10, MB = 28
const CW = 820, CH = 130
const VW = ML + CW + MR   // 882
const VH = MT + CH + MB   // 168

// ─── Helpers ─────────────────────────────────────────────────────────────────

function niceStep(range) {
  if (range <= 50)  return 10
  if (range <= 150) return 25
  if (range <= 300) return 50
  return 100
}

function cutoffDate(days) {
  if (days === Infinity) return null
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().split('T')[0]
}

function fmtDate(raw) {
  if (!raw) return ''
  const d = new Date(raw)
  return isNaN(d.getTime()) ? raw : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function fmtDateTime(raw) {
  if (!raw) return ''
  const d = new Date(raw)
  if (isNaN(d.getTime())) return raw
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' at ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  )
}

function fmtOpening(raw) {
  if (!raw || raw === 'N/A') return null
  return raw.replace(/-/g, ' ')
}


// ─── LastUpdated ─────────────────────────────────────────────────────────────

function LastUpdated({ data }) {
  if (!data || !data.length) return null
  const ts = data.reduce(
    (latest, d) => (d.updated_at && d.updated_at > latest ? d.updated_at : latest),
    data[0].updated_at || ''
  )
  if (!ts) return null
  return (
    <div className="cv2-pipeline-footer">
      <div className="cv2-pipeline-bar">
        <span className="cv2-dbt-dot" aria-hidden="true" />
        <i className="fas fa-database" aria-hidden="true" />
        <span>Powered by <strong>dbt</strong></span>
        <span className="cv2-dbt-sep" aria-hidden="true">·</span>
        <span>Updated {fmtDateTime(ts)}</span>
        <i className="fas fa-circle-info cv2-pipeline-info-icon" aria-hidden="true" />
      </div>
      <div className="cv2-pipeline-popover" role="tooltip">
        <p>
          This dashboard is powered by a dbt pipeline that runs daily around 6:00 AM UTC
          via GitHub Actions. It incrementally loads new chess.com games into BigQuery and
          refreshes these stats automatically.
        </p>
        <Link to="/projects/chesslytics-dbt" className="cv2-pipeline-link">
          View the project <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string
  value?: string | number | null
  sub?: string
  accent?: boolean
}

function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className={`cv2-stat-card${accent ? ' cv2-stat-accent' : ''}`}>
      <span className="cv2-stat-value">{value ?? '--'}</span>
      <span className="cv2-stat-label">{label}</span>
      {sub && <span className="cv2-stat-sub">{sub}</span>}
    </div>
  )
}

// ─── ResultBadge ─────────────────────────────────────────────────────────────

function ResultBadge({ outcome }) {
  const letter = outcome === 'win' ? 'W' : outcome === 'lose' ? 'L' : 'D'
  const cls    = letter === 'W' ? 'cv2-win' : letter === 'L' ? 'cv2-loss' : 'cv2-draw'
  return <span className={`cv2-result-badge ${cls}`}>{letter}</span>
}

// ─── RatingChart ─────────────────────────────────────────────────────────────

function RatingChart({ data }) {
  const [tooltip, setTooltip] = useState(null)
  const svgRef = useRef(null)

  if (!data || data.length < 2) return null
  const ratings = data.map(d => d.closing_rating).filter(Boolean)
  if (ratings.length < 2) return null

  const rawMin = Math.min(...ratings)
  const rawMax = Math.max(...ratings)
  const step   = niceStep(rawMax - rawMin)
  const yMin   = Math.floor(rawMin / step) * step
  const yMax   = Math.ceil(rawMax  / step) * step
  const yRange = yMax - yMin || 1

  const toX = (i) => ML + (i / (data.length - 1)) * CW
  const toY = (v) => MT + CH - ((v - yMin) / yRange) * CH

  const yTicks = []
  for (let v = yMin; v <= yMax; v += step) yTicks.push(v)

  const xTickCount = Math.min(5, data.length)
  const xTicks = Array.from({ length: xTickCount }, (_, i) =>
    Math.round(i * (data.length - 1) / (xTickCount - 1))
  )

  const linePts = data
    .map((d, i) => `${toX(i).toFixed(1)},${toY(d.closing_rating).toFixed(1)}`)
    .join(' ')

  const areaClose = `${toX(data.length - 1).toFixed(1)},${MT + CH} ${ML},${MT + CH}`

  const accPts = (() => {
    const pts = data
      .map((d, i) => d.avg_accuracy != null
        ? `${toX(i).toFixed(1)},${(MT + CH - (d.avg_accuracy / 100) * CH).toFixed(1)}`
        : null)
      .filter(Boolean)
    return pts.length >= 3 ? pts.join(' ') : null
  })()

  const handleMouseMove = (e) => {
    const el = svgRef.current
    if (!el) return
    const rect  = el.getBoundingClientRect()
    const domX  = e.clientX - rect.left
    const svgX  = (domX / rect.width) * VW
    const chartX = Math.max(0, Math.min(svgX - ML, CW))
    const idx   = Math.round((chartX / CW) * (data.length - 1))
    const d     = data[Math.max(0, Math.min(idx, data.length - 1))]
    setTooltip({ d, svgX: toX(idx), svgY: toY(d.closing_rating) })
  }

  const ttRight = tooltip ? (tooltip.svgX / VW) > 0.55 : false
  const ttPctX  = tooltip ? (tooltip.svgX / VW) * 100 : 0
  const ttPctY  = tooltip ? (tooltip.svgY / VH) * 100 : 0

  return (
    <div className="cv2-chart-container">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        className="cv2-chart-svg"
        style={{ cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id="cv2-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01" />
          </linearGradient>
          <clipPath id="cv2-chart-clip">
            <rect x={ML} y={MT} width={CW} height={CH} />
          </clipPath>
        </defs>

        {/* Gridlines + Y-axis labels */}
        {yTicks.map(v => (
          <g key={v}>
            <line
              x1={ML} x2={ML + CW} y1={toY(v)} y2={toY(v)}
              stroke="var(--border-color)" strokeWidth="1"
            />
            <text
              x={ML - 7} y={toY(v) + 4}
              textAnchor="end" fontSize="10"
              fontFamily="var(--font-sans)" fill="var(--text-muted)"
            >{v}</text>
          </g>
        ))}

        {/* X-axis labels */}
        {xTicks.map(i => (
          <text key={i}
            x={toX(i)} y={MT + CH + 18}
            textAnchor="middle" fontSize="10"
            fontFamily="var(--font-sans)" fill="var(--text-muted)"
          >{fmtDate(data[i].game_date)}</text>
        ))}

        {/* Area fill */}
        <polygon
          points={`${linePts} ${areaClose}`}
          fill="url(#cv2-area-grad)"
          clipPath="url(#cv2-chart-clip)"
        />

        {/* Rating line */}
        <polyline
          points={linePts}
          fill="none" stroke="var(--accent)"
          strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
          clipPath="url(#cv2-chart-clip)"
        />

        {/* Accuracy overlay */}
        {accPts && (
          <polyline
            points={accPts}
            fill="none" stroke="rgba(100,180,255,0.65)"
            strokeWidth="1.5" strokeLinejoin="round"
            strokeDasharray="5 3"
            clipPath="url(#cv2-chart-clip)"
          />
        )}

        {/* Crosshair */}
        {tooltip && (
          <>
            <line
              x1={tooltip.svgX} x2={tooltip.svgX}
              y1={MT} y2={MT + CH}
              stroke="var(--text-muted)" strokeWidth="1"
              strokeDasharray="4 3" opacity="0.55"
            />
            <circle
              cx={tooltip.svgX} cy={tooltip.svgY}
              r={5} fill="var(--accent)"
              stroke="var(--bg-surface)" strokeWidth="2"
            />
          </>
        )}
      </svg>

      {tooltip && (
        <div
          className="cv2-chart-tooltip"
          style={{
            left:  ttRight ? 'auto'  : `calc(${ttPctX}% + 14px)`,
            right: ttRight ? `calc(${100 - ttPctX}% + 14px)` : 'auto',
            top:   `${Math.max(2, Math.min(ttPctY - 12, 50))}%`,
          }}
        >
          <div className="cv2-ctt-date">{fmtDate(tooltip.d.game_date)}</div>
          <div className="cv2-ctt-rating">{tooltip.d.closing_rating}</div>
          <div className="cv2-ctt-wld">
            <span className="cv2-ctt-w">{tooltip.d.wins   ?? 0}W</span>
            <span className="cv2-ctt-l">{tooltip.d.losses ?? 0}L</span>
            <span className="cv2-ctt-d">{tooltip.d.draws  ?? 0}D</span>
          </div>
          <div className="cv2-ctt-sub">
            {tooltip.d.games_played} game{tooltip.d.games_played !== 1 ? 's' : ''}
          </div>
          {tooltip.d.avg_accuracy != null && (
            <div className="cv2-ctt-sub">{tooltip.d.avg_accuracy}% accuracy</div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── DonutChart ───────────────────────────────────────────────────────────────

function DonutChart({ wins, losses, draws }) {
  const total = wins + losses + draws
  if (total === 0) return <p className="cv2-empty">No games in this range.</p>

  const SIZE = 130, CX = SIZE / 2, CY = SIZE / 2, R = 48, IR = 28

  const segments = [
    { value: wins,   color: '#4caf50', label: 'Wins'   },
    { value: losses, color: '#ef5350', label: 'Losses' },
    { value: draws,  color: '#7a756d', label: 'Draws'  },
  ]

  let angle = -Math.PI / 2
  const paths = segments.filter(s => s.value > 0).map(seg => {
    const sweep = (seg.value / total) * 2 * Math.PI
    const end   = angle + sweep
    const c1x = CX + R * Math.cos(angle),  c1y = CY + R * Math.sin(angle)
    const c2x = CX + R * Math.cos(end),    c2y = CY + R * Math.sin(end)
    const i1x = CX + IR * Math.cos(angle), i1y = CY + IR * Math.sin(angle)
    const i2x = CX + IR * Math.cos(end),   i2y = CY + IR * Math.sin(end)
    const large = sweep > Math.PI ? 1 : 0
    const d = [
      `M ${i1x.toFixed(2)} ${i1y.toFixed(2)}`,
      `L ${c1x.toFixed(2)} ${c1y.toFixed(2)}`,
      `A ${R} ${R} 0 ${large} 1 ${c2x.toFixed(2)} ${c2y.toFixed(2)}`,
      `L ${i2x.toFixed(2)} ${i2y.toFixed(2)}`,
      `A ${IR} ${IR} 0 ${large} 0 ${i1x.toFixed(2)} ${i1y.toFixed(2)} Z`,
    ].join(' ')
    angle = end
    return { d, color: seg.color, label: seg.label, value: seg.value }
  })

  return (
    <div className="cv2-donut-inner">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="cv2-donut-svg">
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)}
        <text x={CX} y={CY - 6} textAnchor="middle" fontSize="15" fontWeight="700"
          fill="currentColor" fontFamily="var(--font-heading)">
          {Math.round(wins / total * 100)}%
        </text>
        <text x={CX} y={CY + 9} textAnchor="middle" fontSize="7.5"
          fill="var(--text-muted)" letterSpacing="0.08em">WINS</text>
        <text x={CX} y={CY + 21} textAnchor="middle" fontSize="7.5"
          fill="var(--text-muted)">{total} games</text>
      </svg>
      <div className="cv2-donut-legend">
        {paths.map(p => (
          <div key={p.label} className="cv2-donut-legend-row">
            <span className="cv2-donut-swatch" style={{ background: p.color }} />
            <span className="cv2-donut-legend-label">{p.label}</span>
            <span className="cv2-donut-legend-count">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ActivityHeatmap ──────────────────────────────────────────────────────────

function ActivityHeatmap({ data }) {
  const dateMap = new Map(data.map(d => [d.game_date, d.games_played]))

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 90)

  const cells = []
  for (let p = 0; p < startDate.getDay(); p++) cells.push(null)
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const ds = d.toISOString().split('T')[0]
    cells.push({ date: ds, games: dateMap.get(ds) ?? 0, d })
  }
  while (cells.length % 7 !== 0) cells.push(null)

  const CELL = 13, GAP = 3, STEP = CELL + GAP
  const numWeeks = cells.length / 7
  const SVG_W = numWeeks * STEP + 22
  const SVG_H = 7 * STEP + 16

  const monthSeen = new Set()
  const monthLabels = []
  cells.forEach((cell, i) => {
    if (!cell) return
    const col = Math.floor(i / 7)
    const m = cell.d.toLocaleDateString('en-US', { month: 'short' })
    if (!monthSeen.has(m)) { monthSeen.add(m); monthLabels.push({ col, label: m }) }
  })

  const opacity = (g) => {
    if (g === 0) return null
    if (g <= 2) return 0.28
    if (g <= 4) return 0.55
    if (g <= 6) return 0.8
    return 1.0
  }

  const DOW = ['S', '', 'T', '', 'T', '', 'S']

  return (
    <div className="cv2-heatmap-wrap">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="cv2-heatmap-svg">
        {monthLabels.map(({ col, label }) => (
          <text key={label} x={col * STEP + 20} y={9} fontSize="7.5" fill="var(--text-muted)">{label}</text>
        ))}
        {DOW.map((label, dow) => label && (
          <text key={dow} x={2} y={dow * STEP + CELL + 13} fontSize="7" fill="var(--text-muted)">{label}</text>
        ))}
        {cells.map((cell, i) => {
          const col = Math.floor(i / 7)
          const row = i % 7
          const x = col * STEP + 20
          const y = row * STEP + 12
          const op = cell ? opacity(cell.games) : null
          return (
            <rect key={i} x={x} y={y} width={CELL} height={CELL} rx={2}
              fill={op == null ? 'var(--bg-subtle)' : 'var(--accent)'}
              fillOpacity={op == null ? 1 : op}>
              {cell && cell.games > 0 && (
                <title>{cell.date}: {cell.games} game{cell.games !== 1 ? 's' : ''}</title>
              )}
            </rect>
          )
        })}
      </svg>
      <div className="cv2-heatmap-legend">
        <span className="cv2-heatmap-legend-label">Less</span>
        {[null, 0.28, 0.55, 0.8, 1.0].map((op, i) => (
          <span key={i} className="cv2-heatmap-swatch" style={{
            background: op == null ? 'var(--bg-subtle)' : 'var(--accent)',
            opacity: op == null ? 1 : op,
          }} />
        ))}
        <span className="cv2-heatmap-legend-label">More</span>
      </div>
    </div>
  )
}

// ─── OpeningBar ───────────────────────────────────────────────────────────────

function OpeningBar({ games }) {
  const [hoveredRow, setHoveredRow] = useState(null)

  const cleaned = games.filter(g => fmtOpening(g.my_opening))
  if (!cleaned.length) return <p className="cv2-empty">No opening data for this time class.</p>

  const map = new Map()
  cleaned.forEach(g => {
    const name = fmtOpening(g.my_opening)
    if (!map.has(name)) map.set(name, { w: 0, l: 0, d: 0 })
    const e = map.get(name)
    if (g.outcome === 'win') e.w++
    else if (g.outcome === 'lose') e.l++
    else e.d++
  })

  const rows = [...map.entries()]
    .map(([name, c]) => ({ name, total: c.w + c.l + c.d, ...c }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 7)

  const maxTotal = rows[0]?.total ?? 1

  return (
    <div className="cv2-opening-list">
      {rows.map(op => {
        const winPct = Math.round((op.w / op.total) * 100)
        const isH = hoveredRow === op.name
        return (
          <div
            key={op.name}
            className={`cv2-opening-row${isH ? ' cv2-opening-row-hovered' : ''}`}
            onMouseEnter={() => setHoveredRow(op.name)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <span className="cv2-opening-name" title={op.name}>{op.name}</span>
            <div className="cv2-opening-bar-outer">
              <div className="cv2-opening-bar-track" style={{ width: `${(op.total / maxTotal) * 100}%` }}>
                {op.w > 0 && <div className="cv2-ob-win"  style={{ flex: op.w }} />}
                {op.d > 0 && <div className="cv2-ob-draw" style={{ flex: op.d }} />}
                {op.l > 0 && <div className="cv2-ob-loss" style={{ flex: op.l }} />}
              </div>
            </div>
            <span className={`cv2-opening-winpct${winPct >= 50 ? ' pos' : ''}`}>{winPct}%</span>
            {isH && (
              <div className="cv2-opening-tooltip">
                <div className="cv2-ott-name">{op.name}</div>
                <div className="cv2-ott-total">{op.total} game{op.total !== 1 ? 's' : ''}</div>
                <div className="cv2-ctt-wld">
                  <span className="cv2-ctt-w">{op.w}W</span>
                  <span className="cv2-ctt-l">{op.l}L</span>
                  <span className="cv2-ctt-d">{op.d}D</span>
                </div>
                <div className="cv2-ott-rate">{winPct}% win rate</div>
              </div>
            )}
          </div>
        )
      })}
      <div className="cv2-opening-key">
        <span><span className="cv2-ob-key-win" />Win</span>
        <span><span className="cv2-ob-key-draw" />Draw</span>
        <span><span className="cv2-ob-key-loss" />Loss</span>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ChessStats() {
  const [timeClass, setTimeClass]   = useState('blitz')
  const [rangeDays, setRangeDays]   = useState(30)
  const [outcomeFilter, setOutcome] = useState('all')
  const [allData, setAllData]       = useState(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(json => { setAllData(json); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const summary  = allData?.summary?.find(s => s.time_class === timeClass) ?? null
  const cutoff   = cutoffDate(rangeDays)

  const daily = (allData?.daily ?? [])
    .filter(d => d.time_class === timeClass && (cutoff ? d.game_date >= cutoff : true))
    .sort((a, b) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime())

  const allDailyForClass = (allData?.daily ?? []).filter(d => d.time_class === timeClass)

  const recentGames = (allData?.recent_games ?? [])
    .filter(g => g.time_class === timeClass &&
      (outcomeFilter === 'all' || g.outcome === outcomeFilter))

  const totalW = daily.reduce((s, d) => s + (d.wins   ?? 0), 0)
  const totalL = daily.reduce((s, d) => s + (d.losses ?? 0), 0)
  const totalD = daily.reduce((s, d) => s + (d.draws  ?? 0), 0)

  const accDays = daily.filter(d => d.avg_accuracy != null)
  const avgAcc  = accDays.length
    ? (accDays.reduce((s, d) => s + d.avg_accuracy, 0) / accDays.length).toFixed(1)
    : null

  const winRatePct = summary?.lifetime_win_rate != null
    ? `${(summary.lifetime_win_rate * 100).toFixed(1)}%`
    : undefined

  const streakSub = summary?.current_streak_outcome && summary?.current_streak_length
    ? `${summary.current_streak_length} ${summary.current_streak_outcome} streak`
    : undefined

  const hasAccOverlay = daily.some(d => d.avg_accuracy != null)
  const rangeLabel    = rangeDays === Infinity ? 'all time' : `${rangeDays}d`

  const lastPlayedDate = allDailyForClass.length > 0
    ? allDailyForClass.reduce((max, d) => (d.game_date && d.game_date > max) ? d.game_date : max, allDailyForClass[0].game_date)
    : recentGames[0]?.game_date

  return (
    <div className="cv2-page">
      <header className="cv2-header">
        <p className="cv2-eyebrow">hobby</p>
        <Link to="/hobbies/chess/more" className="cv2-more-link">
          About my chess background <i className="fas fa-arrow-right" />
        </Link>
        {allData && <LastUpdated data={allDailyForClass} />}
      </header>

      {/* Filters */}
      <div className="cv2-filter-row">
        <div className="cv2-tabs" role="tablist" aria-label="Time class">
          {TIME_CLASSES.map(({ key, label }) => (
            <button key={key} role="tab" aria-selected={timeClass === key}
              className={`cv2-tab${timeClass === key ? ' cv2-tab-active' : ''}`}
              onClick={() => { setTimeClass(key); setOutcome('all') }}>
              {label}
            </button>
          ))}
        </div>
        <div className="cv2-tabs cv2-tabs-sm" role="group" aria-label="Date range">
          {DATE_RANGES.map(({ label, days }) => (
            <button key={label}
              className={`cv2-tab${rangeDays === days ? ' cv2-tab-active' : ''}`}
              onClick={() => setRangeDays(days)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="cv2-state" aria-live="polite">
          <div className="cv2-spinner" />
          <p>Loading stats...</p>
        </div>
      )}

      {error && !loading && (
        <div className="cv2-state cv2-state-error" aria-live="polite">
          <i className="fas fa-exclamation-triangle" />
          <p>Could not load stats. The API may be offline.</p>
        </div>
      )}

      {allData && !loading && (
        <div className="cv2-content">

          {/* Stat cards */}
          <div className="cv2-stats-row">
            <StatCard label="Rating"         value={summary?.current_rating}    accent
              sub={lastPlayedDate ? `Last played ${fmtDate(lastPlayedDate)}` : undefined} />
            <StatCard label="Peak Rating"    value={summary?.peak_rating_ever} />
            <StatCard label="Total Games"    value={summary?.total_games?.toLocaleString()} />
            <StatCard label="Win Rate"       value={winRatePct} sub={streakSub} />
            <StatCard label="Longest Streak" value={summary?.longest_win_streak ? `${summary.longest_win_streak}W` : undefined} />
            {avgAcc && <StatCard label={`Avg Accuracy (${rangeLabel})`} value={`${avgAcc}%`} />}
          </div>

          {/* Rating trend */}
          {daily.length > 1 && (
            <div className="cv2-panel">
              <div className="cv2-panel-header">
                <h3 className="cv2-section-title">Rating trend</h3>
                <div className="cv2-chart-legend-pills">
                  <span className="cv2-legend-pill cv2-legend-rating">Rating</span>
                  {hasAccOverlay && (
                    <span className="cv2-legend-pill cv2-legend-accuracy">Accuracy</span>
                  )}
                </div>
              </div>
              <RatingChart data={daily} />
              <p className="cv2-chart-range">
                {fmtDate(daily[0]?.game_date)} &mdash; {fmtDate(daily[daily.length - 1]?.game_date)}
              </p>
            </div>
          )}

          {/* Donut + Openings */}
          <div className="cv2-two-col">
            <div className="cv2-panel">
              <h3 className="cv2-section-title">W / L / D &mdash; {rangeLabel}</h3>
              <DonutChart wins={totalW} losses={totalL} draws={totalD} />
            </div>
            <div className="cv2-panel">
              <h3 className="cv2-section-title">Top openings</h3>
              <OpeningBar
                games={(allData?.recent_games ?? []).filter(g => g.time_class === timeClass)}
              />
            </div>
          </div>

          {/* Activity heatmap */}
          {allDailyForClass.length > 0 && (
            <div className="cv2-panel">
              <h3 className="cv2-section-title">Activity &mdash; last 90 days</h3>
              <ActivityHeatmap data={allDailyForClass} />
            </div>
          )}

          {/* Recent games */}
          <div className="cv2-panel cv2-games-section">
            <div className="cv2-panel-header">
              <h3 className="cv2-section-title">Recent games</h3>
              <div className="cv2-tabs cv2-tabs-xs" role="group" aria-label="Outcome filter">
                {['all', 'win', 'lose', 'draw'].map(f => (
                  <button key={f}
                    className={`cv2-tab${outcomeFilter === f ? ' cv2-tab-active' : ''}`}
                    onClick={() => setOutcome(f)}>
                    {f === 'all' ? 'All' : f === 'win' ? 'W' : f === 'lose' ? 'L' : 'D'}
                  </button>
                ))}
              </div>
            </div>

            {recentGames.length > 0 ? (
              <div className="cv2-games-list">
                {recentGames.map((game, i) => {
                  const diff = game.rating_diff
                  const isUnderdog = diff != null && diff < 0
                  return (
                    <div key={i} className="cv2-game-row">
                      <ResultBadge outcome={game.outcome} />
                      <div className="cv2-game-info">
                        <span className="cv2-game-opponent">
                          vs {game.opp_username}
                          <span className="cv2-game-opp-rating"> ({game.opp_rating})</span>
                          {diff != null && (
                            <span className={`cv2-rating-diff${isUnderdog ? ' underdog' : ' fav'}`}>
                              {diff > 0 ? `+${diff}` : diff}
                            </span>
                          )}
                        </span>
                        {fmtOpening(game.my_opening) && (
                          <span className="cv2-game-eco">{fmtOpening(game.my_opening)}</span>
                        )}
                      </div>
                      {game.my_accuracy != null && (
                        <span className="cv2-game-accuracy">{game.my_accuracy}%</span>
                      )}
                      <span className="cv2-game-date">{fmtDate(game.game_date)}</span>
                      {game.game_url && (
                        <a href={game.game_url} target="_blank" rel="noopener noreferrer"
                          className="cv2-game-link" aria-label="View on chess.com">
                          <i className="fas fa-external-link-alt" />
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="cv2-empty">
                No {outcomeFilter !== 'all' ? outcomeFilter : ''} games found for this time class.
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  )
}
