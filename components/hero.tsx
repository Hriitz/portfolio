'use client'

import Link from 'next/link'
import { ArrowRight, FileDown, Sparkles } from 'lucide-react'
import { Panel } from './panel'
import { Repl } from './shell/repl'
import { profile } from '@/data/profile'
import { now } from '@/data/now'

export function Hero() {
  return (
    <Panel
      id="whoami"
      title="// whoami"
      meta="hritik@mumbai:~"
      actions={
        <span className="hidden md:inline-flex items-center gap-2 text-[10.5px] text-muted-2">
          <Sparkles className="h-3 w-3" /> press <kbd className="rounded border border-border-strong px-1 py-0.5 text-[10px] text-muted">⌘K</kbd> for palette
        </span>
      }
    >
      <div>
        <h1 className="font-mono text-[26px] md:text-[30px] tracking-tight leading-[1.05] text-text">
          {profile.name}
        </h1>
        <div className="mt-1.5 font-mono text-[13px] text-muted">
          {profile.role} · {profile.location.split(',')[0]}
        </div>
        <div className="mt-1 font-mono text-[12px] text-muted-2">
          open to opportunities · founding · platform · staff · freelance · <span className="text-accent">ships products fast</span>
        </div>

        <div className="mt-5">
          <Repl initialCommands={['whoami', 'now']} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="#proj"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-panel-2 px-3.5 py-2 font-mono text-[12.5px] text-accent hover:bg-panel transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5" /> see projects
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-panel-2 px-3.5 py-2 font-mono text-[12.5px] text-text hover:border-accent transition-colors"
          >
            <ArrowRight className="h-3.5 w-3.5" /> get in touch
          </Link>
          <Link
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-panel-2 px-3.5 py-2 font-mono text-[12.5px] text-text hover:border-accent transition-colors"
          >
            <FileDown className="h-3.5 w-3.5" /> resume.pdf
          </Link>
        </div>

        <div className="mt-5 lg:hidden rounded-md border border-border-strong bg-bg/40 p-3 font-mono text-[12px] text-muted">
          <div className="text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mb-1">// currently</div>
          <div className="text-text">{now.company}</div>
          <div className="text-accent">{now.focus}</div>
        </div>
      </div>
    </Panel>
  )
}
