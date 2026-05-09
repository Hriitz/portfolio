interface Props {
  value: number // 0–100
  label?: string
  color?: string
  size?: number
}

export function Gauge({ value, label, color = 'var(--accent)', size = 70 }: Props) {
  const v = Math.max(0, Math.min(100, value))
  const cx = 55
  const cy = 56
  const r = 42
  const startAngle = Math.PI
  const sweep = Math.PI * (v / 100)
  const endX = cx + r * Math.cos(startAngle + sweep)
  const endY = cy - r * Math.sin(startAngle + sweep)
  const largeArc = sweep > Math.PI ? 1 : 0

  // Full track ends at (cx + r, cy) when sweep = π
  const trackEnd = `${cx + r} ${cy}`

  return (
    <svg viewBox="0 0 110 70" width="100%" height={size} aria-label={label}>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${trackEnd}`}
        fill="none"
        stroke="var(--border-strong)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      {v > 0 && (
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
