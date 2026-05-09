import { Panel } from './panel'
import { performanceMetrics } from '@/data/performance'

export function Performance() {
  return (
    <Panel
      id="stats"
      title="// stats / verified production metrics"
      bodyPadding={false}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {performanceMetrics.map((m) => (
          <div key={m.label} className="bg-panel p-4 flex flex-col gap-1">
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted">{m.label}</div>
            <div className="font-mono text-[22px] font-semibold text-text leading-tight mt-1">{m.value}</div>
            {m.improvement && (
              <div className="font-mono text-[11.5px] text-muted mt-0.5">{m.improvement}</div>
            )}
            <div className="font-mono text-[10.5px] text-muted-2 mt-1.5">{m.description}</div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
