import { LanguageStat } from '@/lib/github-contributions'

interface Props { stats: LanguageStat[] }

export function LangBar({ stats }: Props) {
  // Top 6 + "Other"
  const top = stats.slice(0, 6)
  const otherPct = stats.slice(6).reduce((acc, s) => acc + s.pct, 0)
  const segments = otherPct > 0
    ? [...top, { name: 'Other', bytes: 0, pct: otherPct, color: 'var(--muted-2)' } as LanguageStat]
    : top

  return (
    <div className="font-mono">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-bg/60">
        {segments.map((s, i) => (
          <div
            key={s.name}
            title={`${s.name} · ${s.pct.toFixed(1)}%`}
            style={{ width: `${s.pct}%`, background: s.color, borderTopLeftRadius: i === 0 ? 999 : 0, borderBottomLeftRadius: i === 0 ? 999 : 0 }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11.5px]">
        {segments.map(s => (
          <span key={s.name} className="flex items-center gap-1.5 text-muted">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />
            <span className="text-text">{s.name}</span>
            <span className="text-muted-2">{s.pct.toFixed(1)}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}
