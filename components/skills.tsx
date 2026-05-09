'use client'

import { useMemo, useState } from 'react'
import { Panel } from './panel'
import { LangBar } from './charts/lang-bar'
import { skills } from '@/data/skills'
import { Skill } from '@/types'
import type { LanguageStat } from '@/lib/github-contributions'

const QUADRANTS: { key: Skill['category']; title: string; dot: string }[] = [
  { key: 'backend',  title: 'BACKEND',   dot: 'var(--accent)' },
  { key: 'frontend', title: 'FRONTEND',  dot: '#ffb86c' },
  { key: 'infra',    title: 'INFRA',     dot: '#7dd3fc' },
  { key: 'tools',    title: 'TOOLS · AI · DATA', dot: '#c084fc' },
  { key: 'language', title: 'LANGUAGES', dot: 'var(--text)' },
]

const RING_LABEL: Record<number, string> = {
  1: 'mastery',
  2: 'strong',
  3: 'working',
  4: 'exposure',
}

export function Skills({ langs }: { langs?: LanguageStat[] }) {
  const [filter, setFilter] = useState<'all' | 1 | 2>('all')

  const grouped = useMemo(() => {
    const map: Record<string, Skill[]> = {}
    skills.forEach(s => { (map[s.category] ||= []).push(s) })
    return map
  }, [])

  const filterSkills = (list: Skill[]) => {
    if (filter === 'all') return list
    return list.filter(s => s.ring <= filter)
  }

  return (
    <Panel
      id="skills"
      title="// skills"
      meta={`${skills.length} entries`}
      actions={
        <div className="flex items-center gap-1">
          {([
            ['all', 'all'],
            [1,     'mastery'],
            [2,     'strong+'],
          ] as const).map(([k, label]) => (
            <button
              key={String(k)}
              onClick={() => setFilter(k)}
              className={`rounded border px-1.5 py-0.5 text-[10px] tracking-[0.08em] uppercase transition-colors ${
                filter === k ? 'border-accent text-accent' : 'border-border-strong text-muted hover:text-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      {langs && langs.length > 0 && (
        <div className="mb-6 pb-5 border-b border-dashed border-border-strong">
          <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mb-3 flex items-center gap-2">
            // languages · live from github
            <span className="rounded border border-up px-1 py-0.5 text-[9px] tracking-[0.08em] text-up">LIVE</span>
            <span className="text-muted-2">aggregated across recent repos</span>
          </div>
          <LangBar stats={langs} />
        </div>
      )}

      <div className="space-y-5">
        {QUADRANTS.map(q => {
          const items = filterSkills(grouped[q.key] ?? []).slice().sort((a, b) => a.ring - b.ring)
          if (!items.length) return null
          return (
            <div key={q.key}>
              <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mb-2.5 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: q.dot }} />
                {q.title}
                <span className="text-muted-2">· {items.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map(s => (
                  <span
                    key={s.name}
                    className="group relative rounded-md border bg-bg/40 px-2.5 py-1 font-mono text-[12.5px] cursor-help transition-colors"
                    style={{
                      borderColor: s.ring === 1 ? q.dot : 'var(--border-strong)',
                      color: s.ring === 1 ? q.dot : s.ring === 2 ? 'var(--text)' : 'var(--muted)',
                    }}
                    title={`${s.name} · ${RING_LABEL[s.ring]}${s.description ? ' · ' + s.description : ''}`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 font-mono text-[11px] text-muted-2 flex flex-wrap gap-x-5 gap-y-1">
        <span><span className="inline-block h-1.5 w-1.5 rounded-full bg-accent mr-1.5 align-middle" /> filled border = mastery</span>
        <span>· dim border = strong / working</span>
        <span>· hover for details</span>
      </div>
    </Panel>
  )
}
