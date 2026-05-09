'use client'

import Link from 'next/link'
import { FileDown } from 'lucide-react'
import { PulseDot } from './status-pill'
import { profile } from '@/data/profile'
import { now } from '@/data/now'

const NAV: { href: string; label: string; key: string }[] = [
  { href: '#whoami',       label: '~/whoami',       key: '⌘1' },
  { href: '#exp',          label: '~/exp',          key: '⌘2' },
  { href: '#proj',         label: '~/proj',         key: '⌘3' },
  { href: '#skills',       label: '~/skills',       key: '⌘4' },
  { href: '#activity',     label: '~/activity',     key: '⌘5' },
  { href: '#achievements', label: '~/achievements', key: '⌘6' },
  { href: '#contact',      label: '~/contact',      key: '⌘7' },
]

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="border-b border-dashed border-border px-2 pb-2 mb-2 font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2">
        // {title}
      </div>
      {children}
    </div>
  )
}

function Item({ href, label, k, ext = false }: { href: string; label: string; k?: string; ext?: boolean }) {
  const props = ext ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Link
      href={href}
      {...props}
      className="flex items-center justify-between rounded-md px-2 py-1.5 font-mono text-[12.5px] text-muted hover:bg-panel-2 hover:text-text transition-colors"
    >
      <span>{label}</span>
      {k && <span className="text-[11px] text-muted-2">{k}</span>}
    </Link>
  )
}

export function NavRail() {
  return (
    <aside className="border-r border-border bg-panel hidden lg:block">
      <div className="sticky top-[88px] max-h-[calc(100vh-100px)] overflow-y-auto p-3.5">
        <Group title="nav">
          {NAV.map(n => <Item key={n.href} href={n.href} label={n.label} k={n.key} />)}
        </Group>

        <Group title="currently">
          <div className="rounded-md border border-border-strong bg-bg/50 px-2 py-2 font-mono text-[11.5px] text-muted">
            <div className="flex items-center gap-2 mb-0.5">
              <PulseDot />
              <span className="text-text">{now.company.toUpperCase()}</span>
            </div>
            <div className="text-accent leading-tight">{now.focus}</div>
            <div className="text-muted-2 mt-1 text-[10.5px]">{now.detail}</div>
          </div>
        </Group>

        <Group title="links">
          <Item href={profile.github}    label="github.com/Hriitz"  k="↗" ext />
          <Item href={profile.linkedin}  label="in/hriitz"          k="↗" ext />
          <Item href={`mailto:${profile.email}`} label="mail · hritik3447" k="↗" />
          <Link
            href={profile.resume}
            download
            className="flex items-center justify-between rounded-md border border-border-strong px-2 py-1.5 mt-2 font-mono text-[12px] text-accent hover:bg-panel-2 transition-colors"
          >
            <span className="flex items-center gap-2"><FileDown className="h-3.5 w-3.5"/>resume.pdf</span>
            <span className="text-muted-2 text-[11px]">↓ 30K</span>
          </Link>
        </Group>

      </div>
    </aside>
  )
}
