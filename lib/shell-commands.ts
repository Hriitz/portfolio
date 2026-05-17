import { ReactNode } from 'react'
import { profile } from '@/data/profile'
import { now } from '@/data/now'
import { experiences } from '@/data/experience'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { achievements } from '@/data/achievements'
import { personalProjects } from '@/data/personal-projects'
import { Skill } from '@/types'

export interface ShellContext {
  /** Append a line to the REPL output. (Set by the REPL host.) */
  print: (out: ShellOutput) => void
  /** Replace the entire output buffer. */
  clear: () => void
  /** Open a project modal by id. */
  openProject: (id: string) => void
  /** Set the accent (and persist). */
  setAccent: (a: 'amber' | 'green' | 'cyan') => void
  /** Trigger a navigation/scroll to a section anchor. */
  goto: (hash: string) => void
}

export type ShellOutput =
  | { kind: 'text'; tone?: 'normal' | 'muted' | 'accent' | 'down' | 'up'; value: string }
  | { kind: 'lines'; lines: ShellOutput[] }
  | { kind: 'pre'; value: string }
  | { kind: 'jsx'; value: ReactNode }

export interface ShellCommand {
  name: string
  aliases?: string[]
  help: string
  /** Optional richer description for the help screen */
  long?: string
  hidden?: boolean
  run: (args: string[], ctx: ShellContext) => ShellOutput | ShellOutput[] | void | Promise<ShellOutput | ShellOutput[] | void>
}

const text = (value: string, tone: 'normal' | 'muted' | 'accent' | 'down' | 'up' = 'normal'): ShellOutput =>
  ({ kind: 'text', tone, value })

const lines = (...l: ShellOutput[]): ShellOutput => ({ kind: 'lines', lines: l })

function table(rows: string[][]): ShellOutput {
  const widths = rows.reduce<number[]>((acc, row) => {
    row.forEach((c, i) => { acc[i] = Math.max(acc[i] ?? 0, c.length) })
    return acc
  }, [])
  const out = rows.map(r => r.map((c, i) => c.padEnd(widths[i] + 2)).join('')).join('\n')
  return { kind: 'pre', value: out }
}

function projectIds() { return projects.map(p => p.id) }

export const COMMANDS: ShellCommand[] = [
  {
    name: 'help',
    aliases: ['?', 'h'],
    help: 'list available commands',
    run: () => {
      const visible = COMMANDS.filter(c => !c.hidden)
      return [
        text(`hritik.dev shell · ${visible.length} commands · type 'help <cmd>' for details, '?' opens shortcuts`, 'muted'),
        table(
          visible.map(c => [
            c.name + (c.aliases?.length ? ` (${c.aliases.join(',')})` : ''),
            c.help,
          ]),
        ),
      ]
    },
  },
  {
    name: 'whoami',
    help: 'who am I',
    run: () => lines(
      text(`${profile.name} — ${profile.role}`),
      text(`${profile.location} · open to roles + freelance projects`, 'muted'),
      text(`stack: Go · Goa · Connect-RPC (protobuf) · React 18 · GKE · OpenTelemetry · FastAPI · pgsql`, 'muted'),
    ),
  },
  {
    name: 'now',
    aliases: ['focus'],
    help: 'what I am building right now',
    run: () => lines(
      text(`@ ${now.company}`, 'accent'),
      text(`▲ ${now.focus}`),
      text(`  ${now.detail}`, 'muted'),
    ),
  },
  {
    name: 'experience',
    aliases: ['exp', 'work'],
    help: 'show work history',
    run: () => {
      const rows = experiences.map(e => [
        `${e.start} → ${e.end}`,
        e.company,
        e.role,
      ])
      return [table(rows), text('use `cat <company>` for details, e.g. `cat spring-street`', 'muted')]
    },
  },
  {
    name: 'projects',
    aliases: ['proj', 'p', 'ls'],
    help: 'list projects (filter: `proj fintech` / `proj live`)',
    run: (args) => {
      const filter = (args[0] ?? '').toLowerCase()
      const filtered = filter
        ? projects.filter(p =>
            p.categories.some(c => c.toLowerCase().includes(filter)) ||
            p.status.toLowerCase().includes(filter) ||
            p.title.toLowerCase().includes(filter))
        : projects
      if (filtered.length === 0) return text(`no projects matched: ${filter}`, 'down')
      return [
        text(`${filtered.length} project${filtered.length === 1 ? '' : 's'}${filter ? ` · filter=${filter}` : ''}`, 'muted'),
        table(filtered.map((p, i) => [
          `[${String(i + 1).padStart(2, '0')}]`,
          p.id,
          `[${p.status.toUpperCase()}]`,
          p.tagline,
        ])),
        text(`use \`open <id>\` to view details — ids: ${projectIds().join(', ')}`, 'muted'),
      ]
    },
  },
  {
    name: 'skills',
    aliases: ['tech', 'stack'],
    help: 'list skills (filter: `skills backend` / `skills infra`)',
    run: (args) => {
      const f = (args[0] ?? '').toLowerCase()
      const items = f ? skills.filter(s => s.category.includes(f) || s.name.toLowerCase().includes(f)) : skills
      if (!items.length) return text(`no skills matched: ${f}`, 'down')
      const grouped: Record<string, Skill[]> = {}
      items.forEach(s => { (grouped[s.category] ||= []).push(s) })
      const out: ShellOutput[] = [
        text(`${items.length} skill${items.length === 1 ? '' : 's'}${f ? ` · filter=${f}` : ''}`, 'muted'),
      ]
      Object.entries(grouped).forEach(([cat, list]) => {
        const sorted = list.slice().sort((a, b) => a.ring - b.ring)
        out.push(text(`# ${cat}`, 'accent'))
        out.push({ kind: 'pre', value: '  ' + sorted.map(s => s.name).join('  ·  ') })
      })
      return out
    },
  },
  {
    name: 'achievements',
    aliases: ['awards'],
    help: 'list achievements',
    run: () => table(achievements.map((a, i) => [`[${String(i + 1).padStart(2, '0')}]`, a.title])),
  },
  {
    name: 'cat',
    help: 'show details · `cat <project|company>`',
    run: (args) => {
      if (!args.length) return text('usage: cat <project-id | company>', 'down')
      const q = args.join(' ').toLowerCase()
      // try project
      const pj = projects.find(p => p.id === q || p.title.toLowerCase().includes(q))
      if (pj) {
        return lines(
          text(`${pj.title} — [${pj.status.toUpperCase()}]`, 'accent'),
          text(pj.tagline, 'muted'),
          text(''),
          text(pj.description),
          text(''),
          text(`stack: ${pj.technologies.slice(0, 8).join(' · ')}`, 'muted'),
          text(pj.url ? `link:  ${pj.url}` : 'link:  (private)', 'muted'),
        )
      }
      // try experience
      const xp = experiences.find(e => e.company.toLowerCase().includes(q) || e.company.toLowerCase().replace(/\s/g, '-') === q)
      if (xp) {
        return lines(
          text(`${xp.company} — ${xp.role}`, 'accent'),
          text(`${xp.period} · ${xp.location}`, 'muted'),
          text(''),
          text(xp.description),
          text(''),
          ...xp.achievements.slice(0, 5).map(a => text('· ' + a, 'muted')),
        )
      }
      return text(`not found: ${q}`, 'down')
    },
  },
  {
    name: 'open',
    help: 'open project modal · `open <id>`',
    run: (args, ctx) => {
      if (!args.length) return text(`usage: open <${projectIds().join('|')}>`, 'muted')
      const id = args[0]
      const found = projects.find(p => p.id === id)
      if (!found) return text(`no project: ${id}`, 'down')
      ctx.openProject(id)
      return text(`→ opening ${found.title}`, 'accent')
    },
  },
  {
    name: 'theme',
    help: 'set accent · `theme <amber|green|cyan>`',
    run: (args, ctx) => {
      const c = (args[0] ?? '').toLowerCase()
      if (c !== 'amber' && c !== 'green' && c !== 'cyan') {
        return text(`usage: theme <amber|green|cyan>  (current default: green)`, 'muted')
      }
      ctx.setAccent(c as 'amber' | 'green' | 'cyan')
      return text(`✓ accent → ${c}`, 'up')
    },
  },
  {
    name: 'goto',
    aliases: ['cd', 'jump'],
    help: 'jump to section · `goto whoami|exp|proj|skills|contact`',
    run: (args, ctx) => {
      const map: Record<string, string> = {
        '~': '#whoami', 'home': '#whoami', 'whoami': '#whoami',
        'about': '#about',
        'exp': '#exp', 'experience': '#exp',
        'proj': '#proj', 'projects': '#proj',
        'skills': '#skills', 'tech': '#skills',
        'contact': '#contact',
      }
      const target = map[(args[0] ?? '').toLowerCase().replace(/^~\//, '')]
      if (!target) return text(`usage: goto <home|exp|proj|skills|contact>`, 'muted')
      ctx.goto(target)
      return text(`→ ${target}`, 'accent')
    },
  },
  {
    name: 'resume',
    aliases: ['cv'],
    help: 'download resume.pdf',
    run: () => {
      if (typeof window !== 'undefined') {
        const a = document.createElement('a')
        a.href = '/resume.pdf'
        a.download = 'Hritik-Singh-Resume.pdf'
        a.click()
      }
      return text('↓ downloading resume.pdf …', 'accent')
    },
  },
  {
    name: 'github',
    aliases: ['gh'],
    help: 'open github profile',
    run: () => { if (typeof window !== 'undefined') window.open(profile.github, '_blank'); return text('→ github.com/Hriitz', 'accent') },
  },
  {
    name: 'linkedin',
    aliases: ['li'],
    help: 'open linkedin',
    run: () => { if (typeof window !== 'undefined') window.open(profile.linkedin, '_blank'); return text('→ linkedin.com/in/hriitz', 'accent') },
  },
  {
    name: 'mail',
    aliases: ['email', 'contact'],
    help: 'send mail · args=copy copies to clipboard',
    run: async (args) => {
      if (args[0] === 'copy' && typeof navigator !== 'undefined') {
        try { await navigator.clipboard.writeText(profile.email); return text(`✓ ${profile.email} copied`, 'up') } catch { /* fallthrough */ }
      }
      if (typeof window !== 'undefined') window.location.href = `mailto:${profile.email}`
      return text(`→ ${profile.email}`, 'accent')
    },
  },
  {
    name: 'which',
    help: 'show ring + projects for a skill · `which Go`',
    run: (args) => {
      if (!args.length) return text('usage: which <skill>', 'muted')
      const q = args.join(' ').toLowerCase()
      const s = skills.find(x => x.name.toLowerCase() === q || x.name.toLowerCase().includes(q))
      if (!s) return text(`no such skill: ${q}`, 'down')
      return lines(
        text(`${s.name}  ring=${s.ring}  category=${s.category}`),
        text(s.description ?? '', 'muted'),
      )
    },
  },
  {
    name: 'personal',
    help: 'list my personal projects',
    run: () => lines(
      ...personalProjects.map(p =>
        text(`  ${p.name.padEnd(11)} ${p.visibility.padEnd(8)} ${p.status.padEnd(10)} ${p.tagline}`)),
    ),
  },
  {
    name: 'clear',
    aliases: ['cls'],
    help: 'clear the buffer',
    run: (_a, ctx) => { ctx.clear() },
  },
  // ── Easter eggs (text-only, no side effects) ────────────────
  { name: 'sudo',  hidden: true, help: 'permission denied (you are not root)', run: (a) => text(`sudo: ${a.join(' ') || '<cmd>'}: nice try.`, 'down') },
  { name: 'vim',   hidden: true, help: 'open vim',                              run: () => text('vim: cannot open /dev/portfolio: file is read-only. (press ⌘K to escape)', 'muted') },
  { name: 'top',   hidden: true, help: 'process list',                          run: () => ({ kind: 'pre', value: '  PID  USER     STATE   CMD\n  1    hritik   R       building broker-grade fintech\n  2    hritik   R       protobuf RPC migration\n  3    hritik   S       docs review\n' }) },
  { name: 'echo',  hidden: true, help: 'echo args',                             run: (a) => text(a.join(' ')) },
  { name: 'man',   hidden: true, help: 'manual',                                run: (a) => text(`man ${a.join(' ') || 'hritik'}: see ‘help ${a[0] ?? ''}’`, 'muted') },
  { name: 'rm',    hidden: true, help: 'delete',                                run: () => text('rm: refusing to remove root directory ‘/career’', 'down') },
]

export function findCommand(name: string): ShellCommand | undefined {
  const n = name.toLowerCase()
  return COMMANDS.find(c => c.name === n || c.aliases?.includes(n))
}

export function autocomplete(input: string): string[] {
  const trimmed = input.trim()
  if (!trimmed) return []
  const parts = trimmed.split(/\s+/)
  // Completing the command itself
  if (parts.length === 1) {
    const q = parts[0].toLowerCase()
    return COMMANDS
      .filter(c => !c.hidden && (c.name.startsWith(q) || c.aliases?.some(a => a.startsWith(q))))
      .map(c => c.name)
  }
  // Completing args of `open`
  if (parts[0] === 'open') {
    const q = (parts[1] ?? '').toLowerCase()
    return projects.map(p => p.id).filter(id => id.startsWith(q)).map(id => `open ${id}`)
  }
  // Completing args of `theme`
  if (parts[0] === 'theme') {
    return ['amber', 'green', 'cyan']
      .filter(c => c.startsWith((parts[1] ?? '').toLowerCase()))
      .map(c => `theme ${c}`)
  }
  // Completing args of `cat`
  if (parts[0] === 'cat') {
    const q = (parts[1] ?? '').toLowerCase()
    const ids = [...projects.map(p => p.id), ...experiences.map(e => e.company.toLowerCase().replace(/\s/g, '-'))]
    return ids.filter(id => id.startsWith(q)).map(id => `cat ${id}`)
  }
  return []
}
