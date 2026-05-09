import Link from 'next/link'
import { Lock } from 'lucide-react'
import { LiveClock } from './charts/live-clock'
import { PulseDot } from './status-pill'
import { getLastCommit, getGithubProfile } from '@/lib/github-contributions'
import { personalProjects } from '@/data/personal-projects'

function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mb-2 mt-4 first:mt-0">{children}</h4>
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-dashed border-border last:border-0 font-mono text-[12px]">
      <span className="text-muted">{k}</span>
      <span className="text-text">{v}</span>
    </div>
  )
}

export async function LiveRail() {
  const [commit, profile] = await Promise.all([
    getLastCommit('Hriitz'),
    getGithubProfile('Hriitz'),
  ])

  return (
    <aside className="border-l border-border bg-panel hidden lg:block">
      <div className="sticky top-[88px] max-h-[calc(100vh-100px)] overflow-y-auto p-4">
        <H4>// IST clock</H4>
        <div className="font-mono text-[28px] leading-none tracking-wide">
          <LiveClock variant="split" showLabel={false} />
        </div>
        <div className="text-muted font-mono text-[11px] mt-1">Asia/Kolkata · UTC+5:30</div>

        {profile && (
          <>
            <H4>
              // github
              <span className="ml-2 rounded border border-up px-1 py-0.5 text-[9px] tracking-[0.08em] text-up">LIVE</span>
            </H4>
            <Row k="public repos" v={
              <Link href="https://github.com/Hriitz?tab=repositories" target="_blank" className="hover:text-accent">
                {profile.publicRepos}
              </Link>
            } />
            <Row k="followers" v={profile.followers} />
            <Row k="following" v={profile.following} />
            <Row k="online"    v={<span className="flex items-center gap-1.5"><PulseDot/> yes</span>} />
          </>
        )}

        {commit && (
          <>
            <H4>
              // last commit
              <span className="ml-2 rounded border border-up px-1 py-0.5 text-[9px] tracking-[0.08em] text-up">LIVE</span>
            </H4>
            <Link
              href={commit.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-md border border-dashed border-border-strong bg-bg/50 px-3 py-2 font-mono text-[11.5px] text-muted hover:border-accent transition-colors"
            >
              <div className="text-text break-words">{commit.message}</div>
              <div className="text-muted-2 mt-0.5">{commit.repo} · {commit.ago} · {commit.hash}</div>
            </Link>
          </>
        )}

        <H4>// personal projects</H4>
        <div className="space-y-1.5 mb-1">
          {personalProjects.map(p => {
            const isPrivate = p.visibility === 'private'
            const dotColor =
              p.status === 'live'      ? 'var(--up)' :
              p.status === 'daily-use' ? 'var(--accent)' :
              'var(--muted)'
            const Inner = (
              <div className="flex items-center gap-2 rounded-md border border-dashed border-border-strong bg-bg/40 px-2.5 py-1.5 font-mono text-[11.5px]">
                <PulseDot color={dotColor} />
                <span className={`shrink-0 ${isPrivate ? 'text-muted' : 'text-text'}`}>{p.name}</span>
                {isPrivate && <Lock className="h-3 w-3 text-muted-2" aria-label="private" />}
                <span className="text-muted-2 truncate">· {p.tagline}</span>
              </div>
            )
            if (p.href) {
              return (
                <Link key={p.name} href={p.href} target="_blank" rel="noreferrer" className="block hover:bg-panel-2 rounded-md transition-colors">
                  {Inner}
                </Link>
              )
            }
            return <div key={p.name}>{Inner}</div>
          })}
        </div>

        <CheatSheet />
      </div>
    </aside>
  )
}

const CHEATS: { cmd: string; what: string }[] = [
  { cmd: 'help',          what: 'list commands' },
  { cmd: 'whoami',        what: 'about me' },
  { cmd: 'now',           what: 'current focus' },
  { cmd: 'exp',           what: 'work history' },
  { cmd: 'proj [filter]', what: 'list projects' },
  { cmd: 'open <id>',     what: 'open project' },
  { cmd: 'skills [cat]',  what: 'list skills' },
  { cmd: 'which <skill>', what: 'skill detail' },
  { cmd: 'cat <id>',      what: 'show details' },
  { cmd: 'theme <color>', what: 'amber|green|cyan' },
  { cmd: 'resume',        what: 'download resume' },
  { cmd: 'mail copy',     what: 'copy email' },
  { cmd: 'clear',         what: 'clear buffer' },
]

const KEYS: { key: string; what: string }[] = [
  { key: '⌘K · /', what: 'palette' },
  { key: '?',      what: 'shortcuts' },
  { key: 'r',      what: 'resume' },
  { key: 'c',      what: 'contact' },
  { key: 'gg · G', what: 'top · bottom' },
  { key: '↑↓',     what: 'history' },
  { key: 'Tab',    what: 'autocomplete' },
]

function CheatSheet() {
  return (
    <div className="mt-6 pt-4 border-t border-dashed border-border-strong">
      <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mb-2">
        // cheat sheet
      </div>
      <ul className="font-mono text-[11px] space-y-[3px] mb-3">
        {CHEATS.map(c => (
          <li key={c.cmd} className="flex justify-between gap-2">
            <span className="text-muted">
              <span className="text-muted-2">$ </span>
              <span className="text-text">{c.cmd}</span>
            </span>
            <span className="text-muted-2 truncate">{c.what}</span>
          </li>
        ))}
      </ul>

      <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mb-2">
        // keys
      </div>
      <ul className="font-mono text-[11px] space-y-[3px]">
        {KEYS.map(k => (
          <li key={k.key} className="flex justify-between gap-2">
            <kbd className="rounded border border-border-strong px-1 py-px text-[10px] text-text bg-bg/50">{k.key}</kbd>
            <span className="text-muted-2 truncate">{k.what}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
