export interface Experience {
  company: string
  role: string
  period: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
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
  projects?: string[]
  description?: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
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
  category: 'fintech' | 'fullstack' | 'other'
  url?: string
}

export interface PerformanceMetric {
  label: string
  value: string
  improvement?: string
  description: string
}

