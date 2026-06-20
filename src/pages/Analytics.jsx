import { useState, useEffect, useMemo } from 'react'
import WorldMap from '../components/WorldMap'

const WEBSITE_ID  = '478605db-1a1d-4c33-80f1-a5b5b68573d1'
const SHARE_TOKEN = 'ro275gw9xcSCsLan'
const BASE        = 'https://cloud.umami.is'

// ─── Date utilities ──────────────────────────────────────────────────────────

const PRESETS = [
  { key: 'today',     label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: '7d',        label: '7 days' },
  { key: '30d',       label: '30 days' },
  { key: '90d',       label: '90 days' },
  { key: 'month',     label: 'This month' },
  { key: 'lastMonth', label: 'Last month' },
  { key: 'custom',    label: 'Custom' },
]

function getRange(preset, customStart, customEnd) {
  const now = Date.now()
  const tod = (() => { const d = new Date(); d.setHours(0,0,0,0); return d.getTime() })()
  const DAY = 86_400_000

  switch (preset) {
    case 'today':     return { start: tod, end: now }
    case 'yesterday': return { start: tod - DAY, end: tod - 1 }
    case '7d':        return { start: tod - 6 * DAY, end: now }
    case '30d':       return { start: tod - 29 * DAY, end: now }
    case '90d':       return { start: tod - 89 * DAY, end: now }
    case 'month': {
      const s = new Date(); s.setDate(1); s.setHours(0,0,0,0)
      return { start: s.getTime(), end: now }
    }
    case 'lastMonth': {
      const s = new Date(); s.setDate(1); s.setHours(0,0,0,0); s.setMonth(s.getMonth() - 1)
      const e = new Date(); e.setDate(1); e.setHours(0,0,0,0)
      return { start: s.getTime(), end: e.getTime() - 1 }
    }
    case 'custom':
      if (!customStart || !customEnd) return getRange('30d')
      return {
        start: new Date(customStart).getTime(),
        end:   new Date(customEnd + 'T23:59:59').getTime(),
      }
    default:
      return getRange('30d')
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtDuration(totalSec, visits) {
  if (!visits) return '—'
  const avg = Math.round(totalSec / visits)
  const m = Math.floor(avg / 60)
  const s = avg % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

function fmtPct(n, total) {
  if (!total) return '—'
  return `${Math.round((n / total) * 100)}%`
}

function changePct(curr, prev) {
  if (!prev) return null
  return Math.round(((curr - prev) / prev) * 100)
}

function fmtYTick(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`
  return String(n)
}

function niceMax(val) {
  if (!val) return 5
  const exp  = Math.pow(10, Math.floor(Math.log10(val)))
  const nice = Math.ceil(val / exp) * exp
  return nice || 5
}

// ─── Data hook ────────────────────────────────────────────────────────────────

const METRIC_TYPES = ['url', 'referrer', 'browser', 'os', 'device', 'country']

function useUmamiData(start, end) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!start || !end) return

    let cancelled = false
    setLoading(true)
    setData(null)

    const dur       = end - start
    const prevStart = start - dur
    const prevEnd   = start - 1
    const unit      = dur <= 2 * 86_400_000 ? 'hour' : 'day'
    const tz        = encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const headers   = { 'X-Umami-Share-Token': SHARE_TOKEN }
    const qs        = `startAt=${start}&endAt=${end}`
    const pqs       = `startAt=${prevStart}&endAt=${prevEnd}`
    const api       = path => fetch(`${BASE}/api/websites/${WEBSITE_ID}/${path}`, { headers })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })

    Promise.all([
      api(`stats?${qs}`),
      api(`stats?${pqs}`),
      api(`pageviews?${qs}&unit=${unit}&timezone=${tz}`),
      ...METRIC_TYPES.map(t =>
        api(`metrics?${qs}&type=${t}&limit=10`).then(d => [t, Array.isArray(d) ? d : []])
      ),
    ])
      .then(([stats, prevStats, pageviews, ...metricEntries]) => {
        if (cancelled) return
        setData({ stats, prevStats, pageviews, metrics: Object.fromEntries(metricEntries), unit })
        setLoading(false)
      })
      .catch(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [start, end])

  return { data, loading }
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ value, currNum, prevNum, label, loading }) {
  const pct = (!loading && prevNum != null) ? changePct(currNum, prevNum) : null

  return (
    <div className="stat-card">
      <h3>{loading ? <span className="analytics-skeleton analytics-skeleton--h3" /> : value}</h3>
      {pct !== null && (
        <span className={`analytics-change${pct >= 0 ? ' up' : ' down'}`}>
          <i className={`fas fa-arrow-${pct >= 0 ? 'up' : 'down'}`} aria-hidden="true" />
          {Math.abs(pct)}%
        </span>
      )}
      <p>{label}</p>
    </div>
  )
}

// ─── Traffic chart ────────────────────────────────────────────────────────────

const C = { w: 900, h: 220, pt: 20, pr: 16, pb: 44, pl: 52 }
const IW = C.w - C.pl - C.pr
const IH = C.h - C.pt - C.pb

function TrafficChart({ pvData, sessData, unit, loading }) {
  const [hovered, setHovered] = useState(null)
  const [metric,  setMetric]  = useState('pageviews')

  if (loading) return <div className="analytics-chart-empty"><span className="analytics-skeleton analytics-skeleton--chart" /></div>

  const series = metric === 'pageviews' ? pvData : sessData
  if (!series?.length) return <div className="analytics-chart-empty">No traffic data for this period.</div>

  const maxY    = niceMax(Math.max(...series.map(d => d.y), 1))
  const yTicks  = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(maxY * f))
  const n       = series.length
  const step    = IW / Math.max(n, 1)
  const xOf     = i => C.pl + i * step + step / 2
  const yOf     = v => C.pt + IH - (v / maxY) * IH
  const bot     = C.pt + IH

  const linePts = series.map((d, i) => `${xOf(i)},${yOf(d.y)}`).join(' ')
  const areaPts = `${C.pl},${bot} ${linePts} ${xOf(n - 1)},${bot}`

  const labelEvery = Math.ceil(n / 8)

  const fmtXLabel = x => {
    const d = new Date(x)
    return unit === 'hour'
      ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  const accentRgb = '196,137,79'

  return (
    <div className="analytics-chart-outer">
      <div className="analytics-chart-controls">
        <button
          type="button"
          className={`analytics-metric-btn${metric === 'pageviews' ? ' active' : ''}`}
          onClick={() => setMetric('pageviews')}
        >
          <span className="analytics-dot accent" /> Pageviews
        </button>
        <button
          type="button"
          className={`analytics-metric-btn${metric === 'sessions' ? ' active' : ''}`}
          onClick={() => setMetric('sessions')}
        >
          <span className="analytics-dot muted" /> Sessions
        </button>
      </div>

      <div className="analytics-chart-wrap" onMouseLeave={() => setHovered(null)}>
        <svg
          viewBox={`0 0 ${C.w} ${C.h}`}
          style={{ width: '100%', display: 'block' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={`rgb(${accentRgb})`} stopOpacity="0.25" />
              <stop offset="100%" stopColor={`rgb(${accentRgb})`} stopOpacity="0"    />
            </linearGradient>
          </defs>

          {/* Y gridlines + labels */}
          {yTicks.map(t => (
            <g key={t}>
              <line
                x1={C.pl} y1={yOf(t)} x2={C.pl + IW} y2={yOf(t)}
                stroke="var(--border-color)" strokeWidth={1}
              />
              <text
                x={C.pl - 8} y={yOf(t) + 4}
                textAnchor="end"
                style={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
              >
                {fmtYTick(t)}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <polygon points={areaPts} fill="url(#areaGrad)" />

          {/* Line */}
          <polyline points={linePts} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" />

          {/* Hovered point */}
          {hovered !== null && (
            <circle
              cx={xOf(hovered)} cy={yOf(series[hovered].y)}
              r={4} fill="var(--accent)" stroke="var(--bg-surface)" strokeWidth={2}
            />
          )}

          {/* X labels */}
          {series.map((d, i) => i % labelEvery === 0 && (
            <text
              key={`lbl${i}`}
              x={xOf(i)} y={C.pt + IH + 20}
              textAnchor="middle"
              style={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
            >
              {fmtXLabel(d.x)}
            </text>
          ))}

          {/* Invisible hit areas per time unit */}
          {series.map((d, i) => (
            <rect
              key={`hit${i}`}
              x={xOf(i) - step / 2} y={C.pt}
              width={step} height={IH}
              fill="transparent"
              style={{ cursor: 'crosshair' }}
              onMouseEnter={() => setHovered(i)}
            />
          ))}
        </svg>

        {hovered !== null && (
          <div
            className="analytics-chart-tooltip"
            style={{
              left: `${((hovered + 0.5) / n) * 100}%`,
              transform: 'translateX(-50%)',
              top: 4,
            }}
          >
            <strong>{series[hovered].y.toLocaleString()}</strong>
            <span>{fmtXLabel(series[hovered].x)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Metric list ──────────────────────────────────────────────────────────────

function MetricList({ rows, loading, renderLabel }) {
  if (loading) {
    return (
      <ul className="analytics-metric-list">
        {[...Array(5)].map((_, i) => (
          <li key={i} className="analytics-metric-row">
            <span className="analytics-skeleton analytics-skeleton--wide" />
            <span className="analytics-skeleton analytics-skeleton--narrow" />
          </li>
        ))}
      </ul>
    )
  }
  if (!rows.length) return <p className="analytics-empty">No data yet.</p>

  const max = rows[0]?.y || 1
  return (
    <ul className="analytics-metric-list">
      {rows.map(row => (
        <li key={row.x} className="analytics-metric-row">
          <div className="analytics-metric-bar-wrap">
            <span className="analytics-metric-bar" style={{ width: `${Math.round((row.y / max) * 100)}%` }} />
            <span className="analytics-metric-label" title={row.x}>
              {renderLabel ? renderLabel(row.x) : (row.x || '(direct)')}
            </span>
          </div>
          <span className="analytics-metric-count">{row.y.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  )
}

function Panel({ title, children }) {
  return (
    <div className="analytics-breakdown-col">
      <h3 className="analytics-breakdown-title">{title}</h3>
      {children}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

function Analytics() {
  const [preset,      setPreset]      = useState('30d')
  const [customStart, setCustomStart] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 29); return d.toISOString().slice(0, 10)
  })
  const [customEnd, setCustomEnd] = useState(todayStr)

  const { start, end } = useMemo(
    () => getRange(preset, customStart, customEnd),
    [preset, customStart, customEnd]
  )
  const { data, loading } = useUmamiData(start, end)

  const s  = data?.stats
  const ps = data?.prevStats
  const m  = data?.metrics ?? {}
  const g  = key => m[key] ?? []

  const pv       = s?.pageviews?.value  ?? 0
  const visitors = s?.visitors?.value   ?? 0
  const visits   = s?.visits?.value     ?? 0
  const bounces  = s?.bounces?.value    ?? 0
  const totaltime = s?.totaltime?.value ?? 0

  const ppv      = ps?.pageviews?.value ?? 0
  const pvis     = ps?.visitors?.value  ?? 0
  const pvists   = ps?.visits?.value    ?? 0
  const pbounces = ps?.bounces?.value   ?? 0
  const ptime    = ps?.totaltime?.value ?? 0

  const pvData   = data?.pageviews?.pageviews ?? []
  const sessData = data?.pageviews?.sessions  ?? []

  return (
    <section className="analytics-page">
      <div className="container">

        {/* Header + date controls */}
        <div className="analytics-header">
          <h2>Site Analytics</h2>

          <div className="analytics-date-bar">
            {PRESETS.map(p => (
              <button
                key={p.key}
                type="button"
                className={`analytics-period-tab${preset === p.key ? ' active' : ''}`}
                onClick={() => setPreset(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {preset === 'custom' && (
            <div className="analytics-custom-range">
              <label>
                From
                <input
                  type="date"
                  className="analytics-date-input"
                  value={customStart}
                  max={customEnd}
                  onChange={e => setCustomStart(e.target.value)}
                />
              </label>
              <span className="analytics-range-sep">—</span>
              <label>
                To
                <input
                  type="date"
                  className="analytics-date-input"
                  value={customEnd}
                  min={customStart}
                  max={todayStr()}
                  onChange={e => setCustomEnd(e.target.value)}
                />
              </label>
            </div>
          )}
        </div>

        {/* Stat cards */}
        <div className="hobby-stats analytics-stat-grid">
          <StatCard value={pv.toLocaleString()}              currNum={pv}      prevNum={ppv}      label="Pageviews"           loading={loading} />
          <StatCard value={visitors.toLocaleString()}         currNum={visitors} prevNum={pvis}     label="Unique visitors"     loading={loading} />
          <StatCard value={visits.toLocaleString()}           currNum={visits}  prevNum={pvists}   label="Visits"              loading={loading} />
          <StatCard value={fmtPct(bounces, visits)}           currNum={bounces} prevNum={pbounces} label="Bounce rate"         loading={loading} />
          <StatCard value={fmtDuration(totaltime, visits)}    currNum={totaltime} prevNum={ptime}  label="Avg. visit duration" loading={loading} />
        </div>

        {/* Traffic over time */}
        <div className="analytics-section">
          <h3 className="analytics-section-title">Traffic over time</h3>
          <TrafficChart pvData={pvData} sessData={sessData} unit={data?.unit} loading={loading} />
        </div>

        {/* Breakdown grid */}
        <div className="analytics-breakdown">
          <Panel title="Top pages">
            <MetricList rows={g('url')} loading={loading} />
          </Panel>
          <Panel title="Top referrers">
            <MetricList rows={g('referrer')} loading={loading} />
          </Panel>
          <Panel title="Browsers">
            <MetricList rows={g('browser')} loading={loading} />
          </Panel>
          <Panel title="Operating systems">
            <MetricList rows={g('os')} loading={loading} />
          </Panel>
          <Panel title="Devices">
            <MetricList rows={g('device')} loading={loading} />
          </Panel>
          <Panel title="Countries">
            <MetricList
              rows={g('country')}
              loading={loading}
              renderLabel={code => {
                const flag = [...(code ?? '').toUpperCase()]
                  .map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)).join('')
                return `${flag} ${code}`
              }}
            />
          </Panel>
        </div>

        {/* World map */}
        <div className="analytics-section">
          <h3 className="analytics-section-title">Visitors by country</h3>
          <WorldMap data={loading ? [] : g('country')} />
        </div>

      </div>
    </section>
  )
}

export default Analytics
