import { ReactNode } from 'react'

interface Props {
  id?: string
  title?: string
  meta?: ReactNode
  actions?: ReactNode
  children: ReactNode
  bodyPadding?: boolean
  className?: string
}

export function Panel({
  id,
  title,
  meta,
  actions,
  children,
  bodyPadding = true,
  className,
}: Props) {
  return (
    <section
      id={id}
      className={`rounded-xl border border-border bg-panel overflow-hidden ${className ?? ''}`}
    >
      {(title || actions || meta) && (
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-panel-2 px-3.5 py-2.5 font-mono text-[11.5px] tracking-[0.06em] uppercase text-muted">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
            {title && <span className="truncate text-muted">{title}</span>}
            {meta && <span className="truncate text-muted-2 normal-case tracking-normal">{meta}</span>}
          </span>
          {actions && <span className="flex flex-wrap items-center gap-1.5 shrink-0">{actions}</span>}
        </header>
      )}
      <div className={bodyPadding ? 'p-5 md:p-6' : ''}>{children}</div>
    </section>
  )
}

export function PanelChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-border-strong px-2 py-0.5 font-mono text-[10.5px] text-muted">
      {children}
    </span>
  )
}
