import { Panel, PanelChip } from './panel'
import { achievements } from '@/data/achievements'

export function Achievements() {
  return (
    <Panel
      id="achievements"
      title="// achievements"
      actions={<PanelChip>selected highlights</PanelChip>}
    >
      <ul className="font-mono text-[13px] space-y-2.5">
        {achievements.map((a, i) => (
          <li key={a.id} className="grid grid-cols-[40px_1fr] gap-3">
            <span className="text-accent">{String(i + 1).padStart(2, '0')}.</span>
            <span>
              <span className="text-text">{a.title}</span>
              <span className="text-muted block text-[12.5px] mt-0.5 font-sans">{a.description}</span>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
