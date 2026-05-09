import { ProjectStatus } from '@/types'

const MAP: Record<ProjectStatus, { label: string; color: string; symbol: string }> = {
  live:  { label: 'LIVE',      color: 'var(--up)',     symbol: '●' },
  prod:  { label: 'PROD',      color: 'var(--up)',     symbol: '●' },
  daily: { label: 'DAILY-USE', color: 'var(--accent)', symbol: '●' },
  wip:   { label: 'WIP',       color: 'var(--muted)',  symbol: '◐' },
}

export function StatusPill({ status }: { status: ProjectStatus }) {
  const m = MAP[status]
  return (
    <span
      className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em]"
      style={{ color: m.color, borderColor: m.color }}
    >
      <span aria-hidden>{m.symbol}</span>
      {m.label}
    </span>
  )
}

interface DotProps {
  color?: string
  /** if true, the dot pulses; default static (we keep blinking minimal across the page) */
  pulsing?: boolean
}

export function PulseDot({ color = 'var(--up)', pulsing = false }: DotProps) {
  return (
    <span
      className={`relative inline-block h-2 w-2 rounded-full ${pulsing ? 'animate-blink' : ''}`}
      style={{
        background: color,
        boxShadow: pulsing ? `0 0 8px ${color}` : `0 0 4px ${color}`,
      }}
    />
  )
}
