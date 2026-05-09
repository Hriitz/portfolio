'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { Panel, PanelChip } from './panel'
import { StatusPill } from './status-pill'
import { Sparkline } from './charts/sparkline'
import { projects } from '@/data/projects'
import { Project } from '@/types'

type Filter = 'all' | 'fintech' | 'ai' | 'tooling' | 'data' | 'fullstack' | 'live' | 'wip'
const FILTERS: Filter[] = ['all', 'fintech', 'ai', 'tooling', 'data', 'fullstack', 'live', 'wip']

function matches(p: Project, f: Filter) {
  if (f === 'all')   return true
  if (f === 'live')  return p.status === 'live' || p.status === 'prod' || p.status === 'daily'
  if (f === 'wip')   return p.status === 'wip'
  return p.categories.includes(f)
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [mounted, setMounted] = useState(false)

  const filtered = useMemo(() => projects.filter(p => matches(p, filter)), [filter])

  useEffect(() => setMounted(true), [])

  // Listen for REPL/palette `open <id>` events.
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      const p = projects.find(x => x.id === id)
      if (p) setSelected(p)
    }
    window.addEventListener('hritik:open-project', handler as EventListener)
    return () => window.removeEventListener('hritik:open-project', handler as EventListener)
  }, [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [selected])

  return (
    <>
      <Panel
        id="proj"
        title={`// projects · ${filtered.length} of ${projects.length}`}
        actions={
          <div className="flex items-center gap-1">
            {FILTERS.map(f => {
              const count = projects.filter(p => matches(p, f)).length
              const active = filter === f
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded border px-1.5 py-0.5 text-[10px] tracking-[0.08em] uppercase transition-colors ${
                    active
                      ? 'border-accent text-accent'
                      : 'border-border-strong text-muted hover:text-text hover:border-text'
                  }`}
                  title={`${count} project${count === 1 ? '' : 's'}`}
                >
                  {f} <span className="opacity-60">{count}</span>
                </button>
              )
            })}
          </div>
        }
        bodyPadding={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelected(p); track('project_view', { project: p.title }) }}
              className="group bg-panel hover:bg-panel-2 text-left p-4 transition-colors focus:outline-none"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <StatusPill status={p.status} />
                <span className="font-mono text-[11px] text-muted-2 truncate">
                  {p.url ? new URL(p.url).host : p.categories.join(' · ')}
                </span>
              </div>
              <h3 className="font-mono text-[16px] text-text group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="mt-1 text-[13px] text-muted">{p.tagline}</p>
              <p className="mt-2 text-[12.5px] text-muted line-clamp-3">{p.description}</p>
              {p.trend && (
                <div className="mt-3">
                  <Sparkline data={p.trend} height={22} />
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-1">
                {p.technologies.slice(0, 6).map(t => <PanelChip key={t}>{t}</PanelChip>)}
                {p.technologies.length > 6 && <PanelChip>+{p.technologies.length - 6}</PanelChip>}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="bg-panel p-6 text-center font-mono text-[12px] text-muted-2">
              no projects matched · clear filter to see all
            </div>
          )}
        </div>
      </Panel>

      {mounted && createPortal(
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] backdrop-blur-sm"
                style={{ background: 'rgba(0,0,0,0.85)' }}
                onClick={() => setSelected(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                onClick={() => setSelected(null)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative pointer-events-auto flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl border border-border bg-panel shadow-2xl"
                >
                  <header className="flex items-start justify-between gap-4 border-b border-border bg-panel-2 px-5 py-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusPill status={selected.status} />
                        <h2 className="font-mono text-[18px] text-text truncate">{selected.title}</h2>
                        {selected.url && (
                          <a
                            href={selected.url}
                            target="_blank" rel="noopener noreferrer"
                            onClick={() => track('project_external_link', { project: selected.title, url: selected.url })}
                            className="inline-flex items-center gap-1 rounded border border-border-strong px-1.5 py-0.5 font-mono text-[11px] text-muted hover:text-accent hover:border-accent"
                          >
                            <ExternalLink className="h-3 w-3" /> live
                          </a>
                        )}
                      </div>
                      <p className="font-mono text-[12px] text-muted mt-1">{selected.tagline}</p>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="rounded border border-border-strong p-1.5 text-muted hover:text-text hover:border-accent"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </header>

                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                    <Section label="DESCRIPTION">{selected.description}</Section>
                    <Section label="PROBLEM">{selected.problem}</Section>
                    <Section label="ARCHITECTURE">{selected.architecture}</Section>

                    <div>
                      <Label>CONSTRAINTS</Label>
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-[13px] text-muted">
                        {selected.constraints.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                    <div>
                      <Label>KEY DECISIONS</Label>
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-[13px] text-muted">
                        {selected.decisions.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </div>
                    <div>
                      <Label>IMPACT</Label>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {selected.impact.map((m, i) => (
                          <div key={i} className="rounded-md border border-border bg-bg/50 p-3">
                            <div className="font-mono text-[18px] text-text">{m.value}</div>
                            <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted">{m.metric}</div>
                            {m.before && <div className="text-[11px] text-muted-2 mt-0.5 font-mono">from {m.before}</div>}
                            {m.description && <div className="text-[12px] text-muted mt-1">{m.description}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>TECHNOLOGIES</Label>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selected.technologies.map(t => <PanelChip key={t}>{t}</PanelChip>)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2">{children}</div>
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="mt-1.5 text-[13px] text-muted leading-relaxed">{children}</p>
    </div>
  )
}
