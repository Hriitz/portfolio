'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SHORTCUTS: { keys: string; what: string }[] = [
  { keys: '⌘K / Ctrl+K', what: 'open command palette' },
  { keys: '/',           what: 'open command palette (search)' },
  { keys: '?',           what: 'show this overlay' },
  { keys: 'r',           what: 'download resume.pdf' },
  { keys: 'c',           what: 'jump to contact' },
  { keys: 'g g',         what: 'scroll to top' },
  { keys: 'G',           what: 'scroll to bottom' },
  { keys: 'Esc',         what: 'close any modal' },
  { keys: '↑ / ↓',       what: 'history (in REPL)' },
  { keys: 'Tab',         what: 'autocomplete (in REPL)' },
  { keys: 'Ctrl+L',      what: 'clear REPL' },
]

export function ShortcutOverlay() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const inEditor = tag === 'INPUT' || tag === 'TEXTAREA'
      const isQuestionMark = e.key === '?' || (e.shiftKey && e.key === '/')
      if (isQuestionMark && !inEditor && !e.metaKey && !e.ctrlKey) {
        e.preventDefault(); setOpen(true)
      } else if (e.key === 'Escape' && open) {
        e.preventDefault(); setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!mounted) return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.65)' }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="fixed left-1/2 top-[18%] z-[301] w-[92vw] max-w-[440px] -translate-x-1/2 rounded-xl border border-border bg-panel p-5 shadow-2xl"
            role="dialog"
            aria-label="Keyboard shortcuts"
          >
            <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mb-3">// keyboard shortcuts</div>
            <ul className="space-y-1.5 font-mono text-[13px]">
              {SHORTCUTS.map(s => (
                <li key={s.keys} className="flex justify-between gap-4">
                  <span className="text-muted">{s.what}</span>
                  <kbd className="rounded border border-border-strong bg-panel-2 px-1.5 py-0.5 text-[11px] text-text">{s.keys}</kbd>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-border pt-2 text-[11px] text-muted-2 text-right">esc to close</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
