'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LiveClock } from './charts/live-clock'
import { PulseDot } from './status-pill'
import { profile } from '@/data/profile'

const BUILD = process.env.NEXT_PUBLIC_BUILD_HASH || 'dev'

// Every value here is from the resume — no fabricated runtime numbers.
const KPIS: { lbl: string; val: string; cls?: string }[] = [
  { lbl: 'USERS',    val: '25,000+' },
  { lbl: 'LATENCY',  val: '<500ms', cls: 'text-up' },
  { lbl: 'UPTIME',   val: '99.9%' },
  { lbl: 'CACHE',    val: '70–85%' },
  { lbl: 'BUNDLE',   val: '−40–50%' },
  { lbl: 'BUILD',    val: `#${BUILD}`, cls: 'text-[12px]' },
]

export function HeaderStrip() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-panel/95 backdrop-blur supports-[backdrop-filter]:bg-panel/80">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_repeat(6,minmax(0,1fr))_auto] font-mono">
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-r border-border">
          <div className="flex h-7 w-7 items-center justify-center rounded border border-border-strong text-accent">
            <Image src="/logo-H.png" alt="" width={20} height={20} className="opacity-90" priority />
          </div>
          <div className="leading-tight">
            <div className="text-[13px]">{profile.handle}<span className="text-muted">.dev</span></div>
            <div className="text-[10.5px] text-muted">workspace · v2.0.0</div>
          </div>
        </div>

        {/* KPI cells (hidden on small screens) */}
        {KPIS.map((k, i) => (
          <div key={k.lbl} className={`hidden lg:flex flex-col gap-0.5 px-3.5 py-2 border-r border-border ${i === KPIS.length - 1 ? 'border-r-0' : ''}`}>
            <span className="text-[9.5px] tracking-[0.12em] text-muted uppercase">{k.lbl}</span>
            <span className={`text-[13px] font-semibold ${k.cls ?? 'text-text'}`}>{k.val}</span>
          </div>
        ))}

        {/* Right cluster */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2.5">
          <Link href="#contact" className="text-[11.5px] flex items-center gap-1 text-muted hover:text-accent transition-colors">
            <PulseDot pulsing /> LIVE
          </Link>
          <LiveClock />
        </div>

        {/* Compact strip on small screens */}
        <div className="lg:hidden flex items-center justify-between px-4 py-2 border-t border-border">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-muted">USERS</span><b>25K+</b>
            <span className="text-muted ml-2">p99</span><b className="text-up">&lt;500ms</b>
            <span className="text-muted ml-2">UP</span><b>99.9%</b>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-muted"><PulseDot/>LIVE</span>
        </div>
      </div>
    </header>
  )
}
