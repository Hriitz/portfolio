'use client'

// Real metrics from the resume — no fabricated runtime numbers.
// Source: Hritik Singh Resume V2 (Wright Research + Spring Street).
const ITEMS: [string, string, 'up' | 'down' | ''][] = [
  ['USERS',         '25,000+',          'up'],
  ['API LATENCY',   '2–3s → <500ms',    'up'],
  ['CACHE HIT',     '70–85%',           'up'],
  ['DASHBOARD',     '60–80% faster',    'up'],
  ['LIGHTHOUSE',    '90+ desk · 75+ mob','up'],
  ['LCP',           '−40%',             'up'],
  ['CLS',           '0.27 → <0.1',      'up'],
  ['BUNDLE',        '−40 to −50%',      'up'],
  ['UPTIME',        '99.9% (Wright) · 99.95% (Spring)', 'up'],
  ['MTTR',          '−30%',             'up'],
  ['MIGRATION',     'Goa HTTP → Connect-RPC (protobuf)', ''],
  ['STREAMING',     'WebSockets · portfolio + orders', ''],
  ['STACK',         'Go · Goa · React 18 · GKE · OTel', ''],
  ['REGION',        'asia-south1', ''],
]

function Item({ label, value, dir }: { label: string; value: string; dir: 'up' | 'down' | '' }) {
  return (
    <span className="px-3.5 text-muted">
      <b className="text-text font-medium mr-1">{label}</b>
      {dir === 'up'   && <span className="text-up mr-1">▲</span>}
      {dir === 'down' && <span className="text-down mr-1">▼</span>}
      {value}
    </span>
  )
}

export function Ticker() {
  return (
    <div className="overflow-hidden whitespace-nowrap border-b border-border bg-bg font-mono text-[11.5px]">
      <div className="inline-block py-1.5 animate-ticker">
        {[...ITEMS, ...ITEMS].map(([l, v, d], i) => (
          <Item key={`${l}-${i}`} label={l} value={v} dir={d} />
        ))}
      </div>
    </div>
  )
}
