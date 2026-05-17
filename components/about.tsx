import { Panel, PanelChip } from './panel'
import { profile } from '@/data/profile'
import { education } from '@/data/education'

export function About() {
  return (
    <Panel
      id="about"
      title="// man hritik"
      actions={<PanelChip>SECTION 1</PanelChip>}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2">NAME</div>
          <div className="font-mono text-[14px] mt-1">
            <span className="text-text">{profile.name.toLowerCase().replace(' ', '-')}</span>
            <span className="text-muted"> — building fintech at startup velocity</span>
          </div>

          <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mt-4">DESCRIPTION</div>
          <p className="text-[13.5px] leading-relaxed text-muted mt-1.5">
            {profile.bio}
          </p>
          <p className="text-[13.5px] leading-relaxed text-muted mt-3">
            Backend, infra, frontend perf — owned end-to-end across two production fintech platforms.
            Strong focus on founding-engineer execution, product-minded backend systems, and production reliability.
          </p>

          <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mt-5">EXAMPLES</div>
          <ul className="mt-1.5 space-y-1 font-mono text-[12.5px] text-muted">
            <li>$ hritik <span className="text-accent">--ship</span> founding-engineer fintech</li>
            <li>$ hritik <span className="text-accent">--deliver</span> fast — agentic + lean stack</li>
            <li>$ hritik <span className="text-accent">--migrate</span> goa-http to connect-rpc</li>
            <li>$ hritik <span className="text-accent">--scale</span> django-platform 25k+</li>
            <li>$ hritik <span className="text-accent">--harden</span> owasp,cert-in</li>
          </ul>
        </div>

        <div className="md:border-l md:border-border md:pl-5">
          <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2">EDUCATION</div>
          <div className="font-mono text-[13px] text-text mt-1.5">{education.degree}</div>
          <div className="text-[12px] text-muted mt-1">{education.institution}</div>
          <div className="text-[11.5px] text-muted-2 mt-0.5 font-mono">{education.period} · {education.location}</div>

          <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mt-5">LOCATION</div>
          <div className="font-mono text-[12.5px] text-text mt-1.5">Mumbai · IST · UTC+5:30</div>

          <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-muted-2 mt-5">SEE ALSO</div>
          <ul className="mt-1.5 space-y-0.5 font-mono text-[12px] text-muted">
            <li>· experience(1)</li>
            <li>· projects(1)</li>
            <li>· skills(1)</li>
            <li>· achievements(1)</li>
          </ul>
        </div>
      </div>
    </Panel>
  )
}
