export interface Experience {
  company: string
  role: string
  period: string
  start: string  // YYYY.MM, used for timeline ordering
  end: string    // YYYY.MM or 'now'
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  /** small array of normalized 0–1 numbers for the inline sparkline */
  trend?: number[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  location: string
  gpa?: string
}

export interface Skill {
  name: string
  category: 'language' | 'backend' | 'frontend' | 'infra' | 'tools'
  /** quadrant ring 1 (center, strongest) → 4 (outer, exposure) */
  ring: 1 | 2 | 3 | 4
  /** angle in degrees (0 = right, 90 = up). Used by the radar chart. */
  angle: number
  projects?: string[]
  description?: string
}

export type ProjectStatus = 'live' | 'prod' | 'daily' | 'wip'

export type ProjectCategory = 'fintech' | 'fullstack' | 'tooling' | 'ai' | 'data'

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  status: ProjectStatus
  problem: string
  constraints: string[]
  architecture: string
  decisions: string[]
  impact: {
    metric: string
    value: string
    before?: string
    description?: string
  }[]
  technologies: string[]
  highlights: string[]
  /** Projects can belong to multiple categories (e.g. fintech + tooling). */
  categories: ProjectCategory[]
  url?: string
  /** trend used for the sparkline on the card */
  trend?: number[]
}

export interface PerformanceMetric {
  label: string
  value: string
  improvement?: string
  description: string
  /** sparkline points 0–1 normalized */
  trend?: number[]
  /** for gauges: 0–100 */
  gauge?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
}

export interface NowState {
  company: string
  focus: string
  detail: string
  status: 'online' | 'busy' | 'away'
  location: string
}
