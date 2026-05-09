'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { COMMANDS } from '@/lib/shell-commands'
import { projects } from '@/data/projects'

interface Entry {
  /** Command string to dispatch through the REPL host. */
  exec: string
  label: string
  group: 'command' | 'project' | 'jump' | 'theme' | 'action'
  hint?: string
}

const STATIC_ENTRIES: Entry[] = [
  ...['amber', 'green', 'cyan'].map<Entry>(c => ({
    exec: `theme ${c}`, label: `theme ${c}`, group: 'theme', hint: 'set accent',
  })),
  { exec: 'goto whoami',  label: 'jump · ~/whoami',  group: 'jump' },
  { exec: 'goto exp',     label: 'jump · ~/exp',     group: 'jump' },
  { exec: 'goto proj',    label: 'jump · ~/proj',    group: 'jump' },
  { exec: 'goto skills',  label: 'jump · ~/skills',  group: 'jump' },
  { exec: 'goto contact', label: 'jump · ~/contact', group: 'jump' },
  { exec: 'resume',       label: 'download resume.pdf', group: 'action' },
  { exec: 'mail copy',    label: 'copy email to clipboard', group: 'action' },
  { exec: 'github',       label: 'open · github.com/Hriitz', group: 'action' },
  { exec: 'linkedin',     label: 'open · linkedin/in/hriitz', group: 'action' },
]

function buildEntries(): Entry[] {
  const cmdEntries: Entry[] = COMMANDS.filter(c => !c.hidden).map(c => ({
    exec: c.name,
    label: c.name,
    hint: c.help,
    group: 'command',
  }))
  const projEntries: Entry[] = projects.map(p => ({
    exec: `open ${p.id}`,
    label: `open · ${p.title}`,
    hint: p.tagline,
    group: 'project',
  }))
  return [...STATIC_ENTRIES, ...cmdEntries, ...projEntries]
}

function score(needle: string, hay: string): number {
  if (!needle) return 0.5
  const n = needle.toLowerCase()
  const h = hay.toLowerCase()
  if (h === n) return 100
  if (h.startsWith(n)) return 80
  if (h.includes(n)) return 60
  // fuzzy: every char in order
  let i = 0
  for (const ch of h) {
    if (ch === n[i]) i++
    if (i === n.length) return 40
  }
  return 0
}

function dispatch(exec: string) {
  const w = (window as unknown as { hritikRunCommand?: (s: string) => void })
  if (w.hritikRunCommand) w.hritikRunCommand(exec)
}

export function Palette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const allEntries = useMemo(() => buildEntries(), [])

  const filtered = useMemo(() => {
    return allEntries
      .map(e => ({ e, s: Math.max(score(q, e.label), score(q, e.hint ?? '')) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map(x => x.e)
  }, [q, allEntries])

  // Window keymap: ⌘K / Ctrl+K open (works regardless of focus); `/` only when not editing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      const inEditor = tag === 'INPUT' || tag === 'TEXTAREA'
      // ⌘K / Ctrl+K — always opens, even when an input is focused
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
        return
      }
      // `/` — only when not in a regular input/textarea
      if (!open && e.key === '/' && !inEditor) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // When opened, focus + reset
  useEffect(() => {
    if (!open) return
    setQ('')
    setIdx(0)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  const close = () => setOpen(false)

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { close(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, filtered.length - 1)); return }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i - 1, 0));                    return }
    if (e.key === 'Enter') {
      e.preventDefault()
      const sel = filtered[idx]
      if (sel) {
        close()
        // tiny defer so the modal closes before commands run that may trigger modals
        setTimeout(() => dispatch(sel.exec), 30)
      }
      return
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.65)' }}
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.14 }}
            className="fixed left-1/2 top-[14%] z-[201] w-[92vw] max-w-[520px] -translate-x-1/2 rounded-xl border border-border bg-panel shadow-2xl"
            role="dialog"
            aria-label="Command palette"
          >
            <div className="border-b border-border px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-[13px]">
                <span className="text-accent">⌘K</span>
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setIdx(0) }}
                  onKeyDown={onKey}
                  placeholder="type a command, project, or jump…"
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent outline-none text-text"
                />
                <span className="text-muted-2 text-[11px]">esc to close</span>
              </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-1">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center font-mono text-[12px] text-muted-2">no matches</div>
              )}
              {filtered.map((e, i) => (
                <button
                  key={`${e.group}-${e.exec}`}
                  onClick={() => { close(); setTimeout(() => dispatch(e.exec), 30) }}
                  onMouseEnter={() => setIdx(i)}
                  className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left font-mono text-[12.5px] transition-colors ${
                    i === idx ? 'bg-panel-2 text-text' : 'text-muted hover:bg-panel-2'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className={`inline-block w-12 text-[10px] tracking-[0.1em] uppercase ${
                      e.group === 'project' ? 'text-accent' :
                      e.group === 'jump'    ? 'text-up' :
                      e.group === 'theme'   ? 'text-down' :
                      e.group === 'action'  ? 'text-text' : 'text-muted-2'
                    }`}>{e.group}</span>
                    <span className="truncate">{e.label}</span>
                  </span>
                  {e.hint && <span className="text-muted-2 text-[11px] truncate">{e.hint}</span>}
                </button>
              ))}
            </div>
            <div className="border-t border-border px-3 py-2 font-mono text-[10.5px] text-muted-2 flex justify-between">
              <span>↑↓ navigate</span>
              <span>↵ run</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
