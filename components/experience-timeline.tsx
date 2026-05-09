'use client'

import { Panel, PanelChip } from './panel'
import { Sparkline } from './charts/sparkline'
import { experiences } from '@/data/experience'

export function ExperienceTimeline() {
  return (
    <Panel
      id="exp"
      title={`// experience · ${experiences.length} entries`}
      actions={<PanelChip>2023 — now</PanelChip>}
      bodyPadding={false}
    >
      <div>
        {experiences.map((e, i) => (
          <div
            key={e.company}
            className={`grid grid-cols-1 md:grid-cols-[130px_1fr_220px] gap-4 px-4 md:px-5 py-4 ${
              i < experiences.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="font-mono text-[12px] text-muted pt-0.5">{e.start} — {e.end}</div>
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-mono text-[14px] font-semibold text-text">{e.company}</span>
                <span className="font-mono text-[12px] text-muted">— {e.role}</span>
              </div>
              <ul className="mt-2 space-y-1 list-disc pl-5 text-[13px] text-muted">
                {e.achievements.map((a, j) => (
                  <li key={j}>
                    {/* highlight key terms */}
                    {a.split(/(\bGoa HTTP → gRPC \(protobuf\)\b|\bWebSockets?\b|\b25,000\+ users\b|\b<500ms\b|\b70–85% hit\b|\b−40%\b|\b0\.27 → <0\.1\b|\b−90% manual effort, −80% errors\b|\bOpenTelemetry\b|\bPrometheus\b|\bRBAC\b|\b99\.9% uptime\b|\b−30% incident MTTR\b)/g).map((part, k) =>
                      /Goa HTTP → gRPC \(protobuf\)|WebSockets?|25,000\+ users|<500ms|70–85% hit|−40%|0\.27 → <0\.1|−90% manual effort, −80% errors|OpenTelemetry|Prometheus|RBAC|99\.9% uptime|−30% incident MTTR/.test(part) ? (
                        <b key={k} className="text-text font-semibold">{part}</b>
                      ) : (
                        <span key={k}>{part}</span>
                      )
                    )}
                  </li>
                ))}
              </ul>
              {e.trend && (
                <div className="mt-3 max-w-[260px]">
                  <div className="text-[10px] tracking-[0.12em] uppercase text-muted-2 font-mono mb-0.5">impact trend</div>
                  <Sparkline data={e.trend} height={18} />
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1 content-start">
              {e.technologies.map(t => <PanelChip key={t}>{t}</PanelChip>)}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
