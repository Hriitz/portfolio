interface Annotation {
  x: number       // 0–100 (%)
  label: string
  date?: string
}

interface Props {
  /** points 0–1 normalized */
  data: number[]
  annotations?: Annotation[]
  height?: number
  /** axis labels under the chart */
  xLabels?: string[]
  yLabels?: string[]
  color?: string
}

export function LineChart({
  data,
  annotations = [],
  height = 320,
  xLabels = [],
  yLabels = [],
  color = 'var(--accent)',
}: Props) {
  if (!data?.length) return null
  const w = 1000
  const innerH = height - 30
  const step = w / Math.max(1, data.length - 1)
  const pts = data.map((v, i) => {
    const x = i * step
    const y = innerH - v * innerH * 0.92 - 6
    return { x, y }
  })
  const linePts = pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
  const areaPath =
    `M ${pts[0].x.toFixed(2)},${innerH} L ${linePts} L ${pts[pts.length - 1].x.toFixed(2)},${innerH} Z`
  const last = pts[pts.length - 1]

  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" width="100%" height={height} className="block">
      {/* horizontal gridlines */}
      {[0.2, 0.4, 0.6, 0.8].map(p => (
        <line
          key={p}
          x1={0}
          x2={w}
          y1={innerH * p}
          y2={innerH * p}
          stroke="var(--border)"
          strokeDasharray="2 4"
        />
      ))}
      {/* y labels */}
      {yLabels.map((l, i) => (
        <text key={i} x={6} y={innerH * (i + 0.4) / Math.max(1, yLabels.length - 1) + 8}
          fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize={10}>{l}</text>
      ))}
      {/* x labels */}
      {xLabels.map((l, i) => (
        <text key={i}
          x={(w / Math.max(1, xLabels.length - 1)) * i + 2}
          y={height - 6}
          fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize={10}>
          {l}
        </text>
      ))}
      {/* area */}
      <path d={areaPath} fill={color} opacity={0.12} />
      {/* line */}
      <polyline fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" points={linePts} />
      {/* annotations */}
      {annotations.map((a, i) => {
        const x = (a.x / 100) * w
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={0} y2={innerH} stroke="var(--down)" strokeDasharray="2 3" opacity={0.55} />
            <text x={x + 6} y={14} fill="var(--text)" fontFamily="var(--font-mono), monospace" fontSize={10.5}>{a.label}</text>
            {a.date && (
              <text x={x + 6} y={28} fill="var(--muted)" fontFamily="var(--font-mono), monospace" fontSize={10}>{a.date}</text>
            )}
          </g>
        )
      })}
      {/* live cursor pulse on last point */}
      <circle cx={last.x} cy={last.y} r={4} fill={color} />
      <circle cx={last.x} cy={last.y} r={4} fill="none" stroke={color} opacity={0.6}>
        <animate attributeName="r" from="4" to="14" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
