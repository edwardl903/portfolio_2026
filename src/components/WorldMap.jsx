import { useState, useRef } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// ISO 3166-1 numeric → alpha-2
const N2A2 = {
  4:'AF',8:'AL',12:'DZ',24:'AO',31:'AZ',32:'AR',36:'AU',40:'AT',
  50:'BD',56:'BE',64:'BT',68:'BO',70:'BA',76:'BR',100:'BG',104:'MM',
  116:'KH',120:'CM',124:'CA',144:'LK',152:'CL',156:'CN',170:'CO',
  188:'CR',191:'HR',196:'CY',203:'CZ',208:'DK',214:'DO',218:'EC',
  222:'SV',231:'ET',233:'EE',246:'FI',250:'FR',276:'DE',288:'GH',
  300:'GR',320:'GT',340:'HN',344:'HK',348:'HU',356:'IN',360:'ID',
  364:'IR',368:'IQ',372:'IE',376:'IL',380:'IT',388:'JM',392:'JP',
  398:'KZ',400:'JO',404:'KE',410:'KR',414:'KW',422:'LB',428:'LV',
  440:'LT',442:'LU',458:'MY',484:'MX',496:'MN',504:'MA',524:'NP',
  528:'NL',554:'NZ',566:'NG',578:'NO',586:'PK',591:'PA',598:'PG',
  604:'PE',608:'PH',616:'PL',620:'PT',630:'PR',634:'QA',642:'RO',
  643:'RU',682:'SA',686:'SN',703:'SK',704:'VN',705:'SI',710:'ZA',
  716:'ZW',724:'ES',752:'SE',756:'CH',762:'TJ',764:'TH',780:'TT',
  784:'AE',788:'TN',792:'TR',800:'UG',804:'UA',807:'MK',818:'EG',
  826:'GB',840:'US',858:'UY',860:'UZ',862:'VE',887:'YE',112:'BY',
  178:'CG',180:'CD',192:'CU',702:'SG',
}

function countryFlag(code) {
  if (!code || code.length !== 2) return ''
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65))
    .join('')
}

const COUNTRY_NAMES = {
  US:'United States',GB:'United Kingdom',CA:'Canada',AU:'Australia',DE:'Germany',
  FR:'France',IN:'India',BR:'Brazil',JP:'Japan',CN:'China',KR:'South Korea',
  NL:'Netherlands',SE:'Sweden',NO:'Norway',CH:'Switzerland',SG:'Singapore',
  MX:'Mexico',AR:'Argentina',ES:'Spain',IT:'Italy',PL:'Poland',RU:'Russia',
  UA:'Ukraine',TR:'Turkey',ZA:'South Africa',NG:'Nigeria',KE:'Kenya',
  EG:'Egypt',IL:'Israel',AE:'UAE',SA:'Saudi Arabia',PK:'Pakistan',ID:'Indonesia',
  TH:'Thailand',VN:'Vietnam',PH:'Philippines',MY:'Malaysia',HK:'Hong Kong',
  NZ:'New Zealand',IE:'Ireland',BE:'Belgium',AT:'Austria',CZ:'Czech Republic',
  HU:'Hungary',RO:'Romania',FI:'Finland',DK:'Denmark',PT:'Portugal',
  GR:'Greece',BG:'Bulgaria',HR:'Croatia',SK:'Slovakia',
}

function WorldMap({ data }) {
  const [tooltip, setTooltip] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const dataMap = Object.fromEntries((data ?? []).map(d => [d.x, d.y]))
  const maxVal  = data?.length ? Math.max(...data.map(d => d.y), 1) : 1

  const onMove = e => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      className="analytics-world-map"
      onMouseMove={onMove}
    >
      <ComposableMap
        projectionConfig={{ scale: 140, center: [0, 10] }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => {
              const alpha2   = N2A2[+geo.id]
              const value    = alpha2 ? (dataMap[alpha2] ?? 0) : 0
              const opacity  = value ? 0.18 + (value / maxVal) * 0.82 : 0
              const fill     = value
                ? `rgba(196,137,79,${opacity.toFixed(2)})`
                : 'var(--bg-subtle)'

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={tooltip?.code === alpha2 ? 'var(--accent)' : fill}
                  stroke="var(--bg-surface)"
                  strokeWidth={0.4}
                  style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
                  onMouseEnter={() => alpha2 && setTooltip({ code: alpha2, value })}
                  onMouseLeave={() => setTooltip(null)}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && tooltip.value > 0 && (
        <div
          className="analytics-map-tooltip"
          style={{ left: pos.x, top: pos.y - 44 }}
        >
          {countryFlag(tooltip.code)}{' '}
          {COUNTRY_NAMES[tooltip.code] ?? tooltip.code}
          {' — '}
          <strong>{tooltip.value.toLocaleString()}</strong>
        </div>
      )}
    </div>
  )
}

export default WorldMap
