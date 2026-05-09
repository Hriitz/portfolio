import { CSSProperties } from 'react'

interface Props {
  data: number[]
  width?: number
  height?: number
  color?: string
  area?: boolean
  className?: string
  style?: CSSProperties
  strokeWidth?: number
}

export function Sparkline({
  data,
  width = 120,
  height = 28,
  color = 'var(--accent)',
  area = true,
  className,
  style,
  strokeWidth = 1.5,
}: Props) {
  if (!data?.length) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = width
  const h = height
  const pad = 2
  const innerW = w
  const innerH = h - pad * 2
  const step = innerW / Math.max(1, data.length - 1)
  const points = data.map((v, i) => {
    const x = i * step
    const y = pad + (1 - (v - min) / range) * innerH
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })
  const linePath = `M ${points[0]} L ${points.slice(1).join(' L ')}`
  const areaPath =
    `M 0,${h} L ${points.join(' L ')} L ${w},${h} Z`

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      width="100%"
      height={h}
      className={className}
      style={style}
      aria-hidden="true"
    >
      {area && (
        <path
          d={areaPath}
          fill={color}
          opacity={0.14}
        />
      )}
      <path d={linePath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
