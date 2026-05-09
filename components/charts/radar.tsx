'use client'

import { useMemo, useState } from 'react'
import { Skill } from '@/types'

interface Props {
  skills: Skill[]
}

// Larger viewBox + bigger rings for breathing room.
const SIZE = 460
const CENTER = SIZE / 2
const RING_RADIUS: Record<number, number> = { 1: 80, 2: 130, 3: 175, 4: 210 }

const QUADRANTS = {
  backend:  { label: 'backend',  color: 'var(--accent)', x: CENTER + 40, y: 22 },
  infra:    { label: 'infra',    color: '#7dd3fc',       x: 14,         y: 22 },
  frontend: { label: 'frontend', color: '#ffb86c',       x: CENTER + 40, y: SIZE - 12 },
  tools:    { label: 'tools',    color: '#c084fc',       x: 14,         y: SIZE - 12 },
} as const

function quadrantOf(angle: number): keyof typeof QUADRANTS {
  const a = ((angle % 360) + 360) % 360
  if (a < 90)  return 'backend'
  if (a < 180) return 'infra'
  if (a < 270) return 'tools'
  return 'frontend'
}

function project(angle: number, ring: number) {
  const r = RING_RADIUS[ring] ?? RING_RADIUS[2]
  const rad = (angle * Math.PI) / 180
  // SVG y is inverted
  return { x: CENTER + r * Math.cos(rad), y: CENTER - r * Math.sin(rad) }
}

export function Radar({ skills }: Props) {
  const [hover, setHover] = useState<Skill | null>(null)

  const positioned = useMemo(
    () => skills.map(s => ({ s, ...project(s.angle, s.ring) })),
    [skills]
  )

  // Pre-compute label anchors so labels never collide with the center.
  const withLabel = positioned.map(p => {
    const onLeft = p.x < CENTER
    const dx = onLeft ? -8 : 8
    return { ...p, anchor: onLeft ? 'end' : 'start', lx: p.x + dx, ly: p.y + 3 }
  })

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" className="block">
        {/* Rings */}
        {Object.values(RING_RADIUS).map((r, i) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke={i === Object.values(RING_RADIUS).length - 1 ? 'var(--border)' : 'var(--border-strong)'}
            strokeWidth={1}
          />
        ))}
        {/* Crosshair */}
        <line x1={CENTER - 220} y1={CENTER} x2={CENTER + 220} y2={CENTER} stroke="var(--border)" />
        <line x1={CENTER} y1={CENTER - 220} x2={CENTER} y2={CENTER + 220} stroke="var(--border)" />

        {/* Quadrant labels */}
        {Object.entries(QUADRANTS).map(([k, q]) => (
          <text
            key={k}
            x={q.x}
            y={q.y}
            textAnchor={q.x < CENTER ? 'start' : 'start'}
            fill={q.color}
            fontFamily="var(--font-mono), monospace"
            fontSize={11.5}
            opacity={0.9}
          >
            {q.label}
          </text>
        ))}

        {/* Connecting lines for hovered dot (so it stands out) */}
        {hover && (() => {
          const p = withLabel.find(x => x.s.name === hover.name)
          if (!p) return null
          return <line x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} stroke="var(--accent)" strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
        })()}

        {/* Dots — labels for ring 1 only (or on hover). */}
        {withLabel.map(({ s, x, y, lx, ly, anchor }) => {
          const q = QUADRANTS[quadrantOf(s.angle)]
          const isHover = hover?.name === s.name
          const showLabel = s.ring === 1 || isHover
          const dim = hover && !isHover && s.ring !== 1
          return (
            <g
              key={s.name}
              opacity={dim ? 0.35 : 1}
              style={{ transition: 'opacity 120ms' }}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(null)}
            >
              <circle
                cx={x}
                cy={y}
                r={isHover ? 5.5 : (s.ring === 1 ? 4 : 3.2)}
                fill={q.color}
                stroke="var(--bg)"
                strokeWidth={1}
                style={{ cursor: 'default' }}
              />
              {showLabel && (
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor as 'start' | 'end'}
                  fill={isHover ? q.color : 'var(--text)'}
                  fontFamily="var(--font-mono), monospace"
                  fontSize={isHover ? 11 : 10.5}
                  style={{ pointerEvents: 'none' }}
                >
                  {s.name}
                </text>
              )}
              {/* Larger transparent hit-area so smaller dots are still hoverable */}
              <circle cx={x} cy={y} r={11} fill="transparent" />
            </g>
          )
        })}
      </svg>

      {/* Hover tooltip */}
      {hover && (
        <div className="pointer-events-none absolute left-3 top-3 max-w-[260px] rounded-md border border-border-strong bg-panel-2 px-2.5 py-1.5 font-mono text-[11.5px] shadow-xl">
          <div className="text-text">{hover.name}</div>
          <div className="text-muted-2">
            ring {hover.ring} · {hover.category}
          </div>
          {hover.description && (
            <div className="text-muted mt-0.5 normal-case">{hover.description}</div>
          )}
        </div>
      )}

      <div className="mt-2 text-center font-mono text-[11px] text-muted-2">
        ● mastery (inner) → ○ exposure (outer) · hover for details
      </div>
    </div>
  )
}
