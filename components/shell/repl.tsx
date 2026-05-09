'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ShellCommand,
  ShellContext,
  ShellOutput,
  autocomplete,
  findCommand,
} from '@/lib/shell-commands'

interface Entry { id: number; cmd: string; output: ShellOutput[] }

const HISTORY_KEY = 'hritik:repl:history'
const MAX_HISTORY = 50

function flattenOutput(out: ShellOutput | ShellOutput[] | void): ShellOutput[] {
  if (!out) return []
  const arr = Array.isArray(out) ? out : [out]
  const flat: ShellOutput[] = []
  for (const o of arr) {
    if (o.kind === 'lines') flat.push(...o.lines)
    else flat.push(o)
  }
  return flat
}

function OutputBlock({ out }: { out: ShellOutput }) {
  if (out.kind === 'pre') {
    return <pre className="whitespace-pre-wrap text-muted leading-[1.7]">{out.value}</pre>
  }
  if (out.kind === 'jsx') {
    return <div>{out.value}</div>
  }
  if (out.kind === 'lines') {
    return (
      <>
        {out.lines.map((l, i) => <OutputBlock key={i} out={l} />)}
      </>
    )
  }
  const tone = out.tone ?? 'normal'
  const cls =
    tone === 'muted'  ? 'text-muted'
    : tone === 'accent' ? 'text-accent'
    : tone === 'down' ? 'text-down'
    : tone === 'up'   ? 'text-up'
    : 'text-text'
  return <div className={`${cls} whitespace-pre-wrap`}>{out.value}</div>
}

interface Props {
  /** Run a list of commands once on mount to seed the buffer. */
  initialCommands?: string[]
}

export function Repl({ initialCommands = ['whoami', 'now'] }: Props) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [input, setInput] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1) // -1 = current input, 0..n-1 = past
  const idRef = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const seededRef = useRef(false)
  const [hint, setHint] = useState<string | null>(null)
  const [focused, setFocused] = useState(false)

  const persistedHistory = useMemo<string[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') } catch { return [] }
  }, [])
  const historyRef = useRef<string[]>(persistedHistory)

  const ctx: ShellContext = useMemo(() => ({
    print: () => {/* unused — we collect output from run() return */},
    clear: () => setEntries([]),
    openProject: (id) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('hritik:open-project', { detail: id }))
      }
    },
    setAccent: (a) => {
      if (typeof window === 'undefined') return
      document.documentElement.dataset.accent = a
      try { localStorage.setItem('hritik:accent', a) } catch { /* ignore */ }
    },
    goto: (hash) => {
      if (typeof window === 'undefined') return
      const el = document.querySelector(hash)
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
  }), [])

  const runCommand = useCallback(async (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return
    const [name, ...args] = trimmed.split(/\s+/)
    const cmd: ShellCommand | undefined = findCommand(name)
    let output: ShellOutput[]
    if (!cmd) {
      output = [{ kind: 'text', tone: 'down', value: `command not found: ${name}.  try 'help'.` }]
    } else {
      try {
        const result = await cmd.run(args, ctx)
        output = flattenOutput(result)
      } catch (e) {
        output = [{ kind: 'text', tone: 'down', value: `error: ${(e as Error).message}` }]
      }
    }
    if (cmd?.name !== 'clear') {
      setEntries(prev => [...prev, { id: ++idRef.current, cmd: trimmed, output }])
    }
    // history
    historyRef.current = [trimmed, ...historyRef.current.filter(c => c !== trimmed)].slice(0, MAX_HISTORY)
    if (typeof window !== 'undefined') {
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(historyRef.current)) } catch { /* ignore */ }
    }
    setHistoryIndex(-1)
  }, [ctx])

  // Seed buffer once on mount.
  useEffect(() => {
    if (seededRef.current) return
    seededRef.current = true
    ;(async () => { for (const c of initialCommands) await runCommand(c) })()
    // global hook for the palette
    if (typeof window !== 'undefined') {
      ;(window as unknown as { hritikRunCommand?: (s: string) => void }).hritikRunCommand = (s: string) => { runCommand(s) }
    }
  }, [runCommand, initialCommands])

  // autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [entries])

  // keyboard
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      runCommand(input)
      setInput('')
      setHint(null)
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, historyRef.current.length - 1)
      if (next >= 0) {
        setHistoryIndex(next)
        setInput(historyRef.current[next])
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = historyIndex - 1
      if (next < 0) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(next)
        setInput(historyRef.current[next])
      }
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const matches = autocomplete(input)
      if (matches.length === 1) { setInput(matches[0]); setHint(null) }
      else if (matches.length > 1) setHint(matches.join('   '))
      return
    }
    if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setEntries([])
      return
    }
  }

  return (
    <div
      className="rounded-md border border-border bg-bg/40 p-4 font-mono text-[13px] leading-[1.7] relative cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md"
        style={{
          background: 'radial-gradient(700px 200px at 80% -20%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)',
        }}
      />
      <div ref={scrollRef} className="relative md:max-h-[360px] md:overflow-y-auto pr-1 pb-2">
        <div className="text-muted-2 mb-2">
          # interactive shell · press <span className="text-accent">Tab</span> for autocomplete · <span className="text-accent">↑/↓</span> for history · <span className="text-accent">⌘K</span> palette · <span className="text-accent">?</span> shortcuts
        </div>
        {entries.map(e => (
          <div key={e.id} className="mb-2">
            <div>
              <span className="text-muted-2">hritik@mumbai</span>
              <span className="text-muted">:</span>
              <span className="text-accent">~</span>
              <span className="text-muted">$ </span>
              <span className="text-text">{e.cmd}</span>
            </div>
            {e.output.map((o, i) => <OutputBlock key={i} out={o} />)}
          </div>
        ))}
        <div className="flex items-baseline">
          <span className="shrink-0 whitespace-pre">
            <span className="text-muted-2">hritik@mumbai</span>
            <span className="text-muted">:</span>
            <span className="text-accent">~</span>
            <span className="text-muted">$ </span>
          </span>
          {/* Inline blinking block caret — only when the input is unfocused AND empty
              (a "click to type" hint). As soon as the user focuses, the native input
              caret takes over so there's no overlap with typed text. */}
          {!focused && input === '' && (
            <span
              aria-hidden
              className="shrink-0 inline-block h-[14px] w-[7px] bg-accent animate-blink"
            />
          )}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); setHint(null) }}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            spellCheck={false}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            className="flex-1 min-w-0 bg-transparent outline-none text-text font-mono text-[13px]"
            style={{ caretColor: 'var(--accent)' }}
            aria-label="terminal input"
          />
        </div>
        {hint && <div className="text-muted-2 text-[11.5px] mt-1">{hint}</div>}
      </div>
    </div>
  )
}

