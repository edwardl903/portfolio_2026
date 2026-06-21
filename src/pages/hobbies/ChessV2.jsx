import { useState, useEffect } from 'react'
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
  { label: '30D', days: 30  },
  { label: '90D', days: 90  },
  { label: 'All', days: Infinity },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function cutoffDate(days) {
  if (days === Infinity) return null
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().split('T')[0]
}

function fmtDate(raw) {
  if (!raw) return ''
  const d = new Date(raw)
  return isNaN(d) ? raw : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function fmtOpening(raw) {
  if (!raw || raw === 'N/A') return null
  return raw.replace(/-/g, ' ')
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent }) {
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
  const cls = letter === 'W' ? 'cv2-win' : letter === 'L' ? 'cv2-loss' : 'cv2-draw'
  return <span className={`cv2-result-badge ${cls}`}>{letter}</span>
}

// ─── RatingChart ─────────────────────────────────────────────────────────────

function RatingChart({ data }) {
  if (!data || data.length < 2) return null
  const ratings = data.map(d => d.closing_rating).filter(Boolean)
  if (ratings.length < 2) return null

  const W = 800, H = 120
  const min = Math.min(...ratings) - 30
  const max = Math.max(...ratings) + 30

  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((d.closing_rating - min) / (max - min)) * H
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  // Accuracy overlay — normalize 0-100 to chart height
  const accPts = data
    .filter(d => d.avg_accuracy != null)
    .map(d => {
      const i = data.indexOf(d)
      const x = (i / (data.length - 1)) * W
      const y = H - (d.avg_accuracy / 100) * H
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })

  const showAccuracy = accPts.length >= 3

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="cv2-chart-svg">
      <defs>
        <linearGradient id="cv2-area-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polygon points={`${pts.join(' ')} ${W},${H} 0,${H}`} fill="url(#cv2-area-grad)" />
      <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)"
        strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {showAccuracy && (
        <polyline points={accPts.join(' ')} fill="none"
          stroke="rgba(100,180,255,0.65)" strokeWidth="1.5"
          strokeLinejoin="round" strokeDasharray="5 3" />
      )}
    </svg>
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
    const d = `M ${i1x.toFixed(2)} ${i1y.toFixed(2)} L ${c1x.toFixed(2)} ${c1y.toFixed(2)} A ${R} ${R} 0 ${large} 1 ${c2x.toFixed(2)} ${c2y.toFixed(2)} L ${i2x.toFixed(2)} ${i2y.toFixed(2)} A ${IR} ${IR} 0 ${large} 0 ${i1x.toFixed(2)} ${i1y.toFixed(2)} Z`
    angle = end
    return { d, color: seg.color, label: seg.label, value: seg.value }
  })

  return (
    <div className="cv2-donut-inner">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="cv2-donut-svg">
        {paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)}
        <text x={CX} y={CY - 5} textAnchor="middle" fontSize="15" fontWeight="700"
          fill="currentColor" fontFamily="var(--font-heading)">
          {Math.round(wins / total * 100)}%
        </text>
        <text x={CX} y={CY + 11} textAnchor="middle" fontSize="8"
          fill="var(--text-muted)" letterSpacing="0.08em">
          WINS
        </text>
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
  // Build date → games map
  const dateMap = new Map(data.map(d => [d.game_date, d.games_played]))

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Pad so column 0 starts on a Sunday
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 90)

  const cells = []
  for (let p = 0; p < startDate.getDay(); p++) cells.push(null) // leading padding

  for (let i = 90; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const ds = d.toISOString().split('T')[0]
    cells.push({ date: ds, games: dateMap.get(ds) ?? 0, d })
  }
  while (cells.length % 7 !== 0) cells.push(null) // trailing padding

  const CELL = 13, GAP = 3, STEP = CELL + GAP
  const numWeeks = cells.length / 7
  const SVG_W = numWeeks * STEP + 22
  const SVG_H = 7 * STEP + 16

  // Month labels: show at column where a new month starts
  const monthSeen = new Set()
  const monthLabels = []
  cells.forEach((cell, i) => {
    if (!cell) return
    const col = Math.floor(i / 7)
    const m = cell.d.toLocaleDateString('en-US', { month: 'short' })
    if (!monthSeen.has(m)) {
      monthSeen.add(m)
      monthLabels.push({ col, label: m })
    }
  })

  const opacity = (games) => {
    if (games === 0) return null
    if (games <= 2) return 0.28
    if (games <= 4) return 0.55
    if (games <= 6) return 0.8
    return 1.0
  }

  const DOW = ['S', '', 'T', '', 'T', '', 'S']

  return (
    <div className="cv2-heatmap-wrap">
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="cv2-heatmap-svg">
        {/* Month labels */}
        {monthLabels.map(({ col, label }) => (
          <text key={label} x={col * STEP + 20} y={9}
            fontSize="7.5" fill="var(--text-muted)">{label}</text>
        ))}

        {/* Day-of-week labels */}
        {DOW.map((label, dow) => label && (
          <text key={dow} x={2} y={dow * STEP + CELL + 13}
            fontSize="7" fill="var(--text-muted)">{label}</text>
        ))}

        {/* Cells */}
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
      {rows.map(op => (
        <div key={op.name} className="cv2-opening-row">
          <span className="cv2-opening-name" title={op.name}>{op.name}</span>
          <div className="cv2-opening-bar-outer">
            <div className="cv2-opening-bar-track"
              style={{ width: `${(op.total / maxTotal) * 100}%` }}>
              {op.w > 0 && <div className="cv2-ob-win"  style={{ flex: op.w }} />}
              {op.d > 0 && <div className="cv2-ob-draw" style={{ flex: op.d }} />}
              {op.l > 0 && <div className="cv2-ob-loss" style={{ flex: op.l }} />}
            </div>
          </div>
          <span className="cv2-opening-count">{op.total}</span>
        </div>
      ))}
      <div className="cv2-opening-key">
        <span><span className="cv2-ob-key-win" />Win</span>
        <span><span className="cv2-ob-key-draw" />Draw</span>
        <span><span className="cv2-ob-key-loss" />Loss</span>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ChessV2() {
  const [timeClass, setTimeClass]     = useState('blitz')
  const [rangeDays, setRangeDays]     = useState(30)
  const [outcomeFilter, setOutcome]   = useState('all')
  const [allData, setAllData]         = useState(null)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(json => { setAllData(json); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const summary     = allData?.summary?.find(s => s.time_class === timeClass) ?? null
  const cutoff      = cutoffDate(rangeDays)

  const daily = (allData?.daily ?? [])
    .filter(d => d.time_class === timeClass && (cutoff ? d.game_date >= cutoff : true))
    .sort((a, b) => new Date(a.game_date) - new Date(b.game_date))

  const allDailyForClass = (allData?.daily ?? []).filter(d => d.time_class === timeClass)

  const recentGames = (allData?.recent_games ?? [])
    .filter(g => g.time_class === timeClass &&
      (outcomeFilter === 'all' || g.outcome === outcomeFilter))

  // Totals from daily (for donut + avg accuracy)
  const totalW = daily.reduce((s, d) => s + (d.wins   ?? 0), 0)
  const totalL = daily.reduce((s, d) => s + (d.losses ?? 0), 0)
  const totalD = daily.reduce((s, d) => s + (d.draws  ?? 0), 0)

  const accDays   = daily.filter(d => d.avg_accuracy != null)
  const avgAcc    = accDays.length
    ? (accDays.reduce((s, d) => s + d.avg_accuracy, 0) / accDays.length).toFixed(1)
    : null

  const winRatePct = summary?.lifetime_win_rate != null
    ? `${(summary.lifetime_win_rate * 100).toFixed(1)}%`
    : undefined

  const streakSub = summary?.current_streak_outcome && summary?.current_streak_length
    ? `${summary.current_streak_length} ${summary.current_streak_outcome} streak`
    : undefined

  const hasAccOverlay = daily.some(d => d.avg_accuracy != null)
  const rangeLabel = rangeDays === Infinity ? 'all time' : `${rangeDays}d`

  return (
    <div className="cv2-page">
      <header className="cv2-header">
        <p className="cv2-eyebrow">hobby</p>
        <Link to="/hobbies/chess/more" className="cv2-more-link">
          About my chess background <i className="fas fa-arrow-right" />
        </Link>
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

          {/* ── Stat cards ── */}
          <div className="cv2-stats-row">
            <StatCard label="Rating"         value={summary?.current_rating}    accent />
            <StatCard label="Peak Rating"    value={summary?.peak_rating_ever} />
            <StatCard label="Total Games"    value={summary?.total_games?.toLocaleString()} />
            <StatCard label="Win Rate"       value={winRatePct}  sub={streakSub} />
            <StatCard label="Longest Streak" value={summary?.longest_win_streak ? `${summary.longest_win_streak}W` : undefined} />
            {avgAcc && <StatCard label={`Avg Accuracy (${rangeLabel})`} value={`${avgAcc}%`} />}
          </div>

          {/* ── Rating trend ── */}
          {daily.length > 1 && (
            <div className="cv2-panel">
              <div className="cv2-panel-header">
                <h3 className="cv2-section-title">Rating trend</h3>
                {hasAccOverlay && (
                  <div className="cv2-chart-legend">
                    <span className="cv2-legend-pill cv2-legend-rating">Rating</span>
                    <span className="cv2-legend-pill cv2-legend-accuracy">Accuracy</span>
                  </div>
                )}
              </div>
              <div className="cv2-chart-wrap">
                <RatingChart data={daily} />
              </div>
              <p className="cv2-chart-range">
                {fmtDate(daily[0]?.game_date)} &mdash; {fmtDate(daily[daily.length - 1]?.game_date)}
              </p>
            </div>
          )}

          {/* ── Donut + Openings ── */}
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

          {/* ── Activity heatmap ── */}
          {allDailyForClass.length > 0 && (
            <div className="cv2-panel">
              <h3 className="cv2-section-title">Activity — last 90 days</h3>
              <ActivityHeatmap data={allDailyForClass} />
            </div>
          )}

          {/* ── Recent games ── */}
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
                {recentGames.map((game, i) => (
                  <div key={i} className="cv2-game-row">
                    <ResultBadge outcome={game.outcome} />
                    <div className="cv2-game-info">
                      <span className="cv2-game-opponent">
                        vs {game.opp_username}
                        <span className="cv2-game-opp-rating"> ({game.opp_rating})</span>
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
                ))}
              </div>
            ) : (
              <p className="cv2-empty">No {outcomeFilter !== 'all' ? outcomeFilter : ''} games found for this time class.</p>
            )}
          </div>

        </div>
      )}
    </div>
  )
}
