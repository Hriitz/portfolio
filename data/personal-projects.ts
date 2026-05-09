/**
 * Right-rail personal projects. Workplaces (Spring Street, Wright Research)
 * are intentionally excluded — they appear in the main Projects panel.
 *
 * Private project descriptions are intentionally minimal — public taglines only,
 * no architecture / metrics / dependency leakage.
 */
export interface PersonalProject {
  name: string
  visibility: 'public' | 'private'
  status: 'live' | 'daily-use' | 'wip'
  tagline: string
  /** absent for private repos — they don't link out */
  href?: string
  /** GitHub repo full name (public or private), used by the live-data fetch */
  repo?: string
}

export const personalProjects: PersonalProject[] = [
  {
    name: 'njord',
    visibility: 'private',
    status: 'daily-use',
    tagline: 'personal finance · UPI ingestion',
    repo: 'Hriitz/njord',
  },
  {
    name: 'globradar',
    visibility: 'private',
    status: 'wip',
    tagline: 'market intel · multi-source signal',
    repo: 'Hriitz/globradar',
  },
  {
    name: 'portfolio',
    visibility: 'public',
    status: 'live',
    tagline: 'this site',
    href: 'https://github.com/Hriitz/portfolio',
    repo: 'Hriitz/portfolio',
  },
]
