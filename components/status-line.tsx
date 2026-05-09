import { PulseDot } from './status-pill'
import { profile } from '@/data/profile'

const BUILD = process.env.NEXT_PUBLIC_BUILD_HASH || 'dev'

export function StatusLine() {
  return (
    <footer className="sticky bottom-0 z-30 flex justify-between border-t border-border bg-panel px-4 py-1.5 font-mono text-[11px] text-muted">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5"><PulseDot /> ONLINE</span>
        <span>BLR · IST</span>
        <span className="hidden sm:inline">main</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">build #{BUILD}</span>
        <span>© {new Date().getFullYear()} {profile.name}</span>
      </div>
    </footer>
  )
}
