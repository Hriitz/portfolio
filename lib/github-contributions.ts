export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionsResult {
  cells: ContributionDay[]    // padded so cells[0] is a Sunday
  total: number
  longestStreak: number
  username: string
}

export interface LastCommit {
  message: string
  repo: string
  ago: string
  hash: string
  url: string
}

export interface GithubProfile {
  publicRepos: number
  followers: number
  following: number
}

const REVALIDATE_6H = 60 * 60 * 6
const REVALIDATE_30M = 60 * 30
const UA = 'hritik.dev portfolio'

/**
 * GitHub API headers. Adds Authorization when GITHUB_TOKEN is set
 * (5,000 req/h authenticated vs 60 req/h unauthenticated).
 * Set GITHUB_TOKEN in `.env.local` for dev and in Vercel env for prod.
 */
function ghHeaders(): HeadersInit {
  const h: Record<string, string> = {
    'User-Agent': UA,
    Accept: 'application/vnd.github+json',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) h.Authorization = `Bearer ${token}`
  return h
}

/**
 * Fallback: fetch the latest commit from a known public repo when
 * the events API is rate-limited. Defaults to Hriitz/portfolio.
 */
async function getLastCommitFromRepo(repoFullName: string): Promise<LastCommit | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repoFullName}/commits?per_page=1`, {
      next: { revalidate: REVALIDATE_30M },
      headers: ghHeaders(),
    })
    if (!res.ok) return null
    const arr = (await res.json()) as Array<{ sha: string; html_url: string; commit: { message: string; author: { date: string } } }>
    if (!Array.isArray(arr) || arr.length === 0) return null
    const c = arr[0]
    return {
      message: (c.commit.message ?? '(no message)').split('\n')[0],
      repo: repoFullName,
      ago: humanAgo(new Date(c.commit.author.date)),
      hash: '#' + c.sha.slice(0, 7),
      url: c.html_url,
    }
  } catch { return null }
}

function humanAgo(d: Date): string {
  const now = Date.now()
  const ms = Math.max(0, now - d.getTime())
  const s = Math.floor(ms / 1000)
  if (s < 60)        return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60)        return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24)        return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days < 30)     return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

/** Last-year contribution graph for `username`. Falls back to null on failure. */
export async function getGithubContributions(username: string): Promise<ContributionsResult | null> {
  const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_6H },
      headers: { 'User-Agent': UA },
    })
    if (!res.ok) {
      console.error('[gh-contrib] non-ok', res.status, url)
      return null
    }
    const data = (await res.json()) as {
      total: Record<string, number>
      contributions: Array<{ date: string; count: number; level: number }>
    }
    if (!Array.isArray(data.contributions) || data.contributions.length === 0) return null

    // pad so the first cell is a Sunday (column-major grid)
    const first = new Date(data.contributions[0].date + 'T00:00:00Z')
    const startDay = first.getUTCDay()
    const padded: ContributionDay[] = []
    for (let i = 0; i < startDay; i++) padded.push({ date: '', count: 0, level: 0 })
    for (const c of data.contributions) {
      const lvl = Math.max(0, Math.min(4, c.level)) as 0 | 1 | 2 | 3 | 4
      padded.push({ date: c.date, count: c.count, level: lvl })
    }

    let streak = 0, best = 0
    for (const c of data.contributions) {
      if (c.count > 0) { streak++; best = Math.max(best, streak) } else streak = 0
    }
    const totalKeys = Object.keys(data.total)
    const total = totalKeys.length ? data.total[totalKeys[0]] : 0
    return { cells: padded, total, longestStreak: best, username }
  } catch (e) {
    console.error('[gh-contrib] fetch threw', (e as Error)?.message ?? e)
    return null
  }
}

/**
 * Latest public commit across any repo. Two-step:
 *   1) /users/{u}/events/public → find first PushEvent (gives repo + head SHA)
 *   2) /repos/{repo}/commits/{sha}    → fetch the commit message
 * Falls back to null on failure.
 */
export async function getLastCommit(username: string): Promise<LastCommit | null> {
  const eventsUrl = `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=20`
  try {
    const eventsRes = await fetch(eventsUrl, {
      next: { revalidate: REVALIDATE_30M },
      headers: ghHeaders(),
    })
    if (!eventsRes.ok) {
      console.error('[gh-events] non-ok', eventsRes.status, '— falling back to per-repo commits')
      return await getLastCommitFromRepo(`${username}/portfolio`)
        ?? await getLastCommitFromRepo(`${username}/${username}`)
    }
    const events = (await eventsRes.json()) as Array<{
      type: string
      created_at: string
      repo: { name: string }
      payload?: { head?: string }
    }>
    const push = events.find(e => e.type === 'PushEvent' && !!e.payload?.head)
    if (!push) return null
    const repoName = push.repo.name
    const sha = push.payload!.head!

    const commitUrl = `https://api.github.com/repos/${repoName}/commits/${sha}`
    const commitRes = await fetch(commitUrl, {
      next: { revalidate: REVALIDATE_30M },
      headers: ghHeaders(),
    })
    let message = '(commit details unavailable)'
    let url = `https://github.com/${repoName}/commit/${sha}`
    if (commitRes.ok) {
      const c = (await commitRes.json()) as { commit: { message: string }; html_url: string }
      message = (c.commit?.message ?? message).split('\n')[0]
      url = c.html_url ?? url
    } else {
      console.error('[gh-commit] non-ok', commitRes.status, commitUrl)
    }

    return {
      message,
      repo: repoName,
      ago: humanAgo(new Date(push.created_at)),
      hash: '#' + sha.slice(0, 7),
      url,
    }
  } catch (e) {
    console.error('[gh-events] fetch threw', (e as Error)?.message ?? e)
    return null
  }
}

export interface LanguageStat {
  name: string
  bytes: number
  pct: number
  color: string
}

// Curated for visual distinction — drifts off GitHub's canonical colors where
// two languages would otherwise read as the same hue (Python vs TypeScript).
const GH_LANG_COLORS: Record<string, string> = {
  Go:                 '#00ADD8', // cyan (Go's brand)
  Python:             '#FFD43B', // amber-yellow (Python.org secondary brand) — was #3572A5, too close to TS blue
  TypeScript:         '#3178c6', // blue (TS brand)
  JavaScript:         '#a8c83a', // lime-green — was #f1e05a, too close to Python's new yellow
  Java:               '#f89820', // warm orange — was muddy brown
  'C++':              '#f34b7d', // pink
  C:                  '#a8b9cc', // steel blue (distinct from Python and TS)
  Shell:              '#4caf50', // saturated green
  Dockerfile:         '#0db7ed', // docker blue (distinct from TS)
  Makefile:           '#7e57c2', // purple
  HTML:               '#e34c26', // red-orange (HTML brand)
  CSS:                '#9b59b6', // CSS-ish violet
  'Jupyter Notebook': '#DA5B0B', // deep orange
  Rust:               '#dea584',
  Swift:              '#f05138',
  Kotlin:             '#A97BFF',
  Ruby:               '#701516',
}

/** Aggregated language breakdown from the user's most recent non-fork repos. */
export async function getLanguageBreakdown(username: string, top = 12): Promise<LanguageStat[] | null> {
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`,
      {
        next: { revalidate: REVALIDATE_6H },
        headers: ghHeaders(),
      },
    )
    if (!reposRes.ok) return null
    const repos = (await reposRes.json()) as Array<{
      full_name: string; fork: boolean; archived: boolean; pushed_at: string
    }>
    const eligible = repos.filter(r => !r.fork && !r.archived).slice(0, top)
    const totals: Record<string, number> = {}
    await Promise.all(eligible.map(async r => {
      try {
        const res = await fetch(`https://api.github.com/repos/${r.full_name}/languages`, {
          next: { revalidate: REVALIDATE_6H },
          headers: ghHeaders(),
        })
        if (!res.ok) return
        const obj = await res.json() as Record<string, number>
        for (const [k, v] of Object.entries(obj)) totals[k] = (totals[k] ?? 0) + v
      } catch {/* skip this repo */}
    }))
    const total = Object.values(totals).reduce((a, b) => a + b, 0)
    if (total === 0) return null
    return Object.entries(totals)
      .map(([name, bytes]) => ({ name, bytes, pct: (bytes / total) * 100, color: GH_LANG_COLORS[name] ?? 'var(--muted)' }))
      .sort((a, b) => b.bytes - a.bytes)
  } catch (e) {
    console.error('[gh-langs] threw', (e as Error)?.message ?? e)
    return null
  }
}

/** Public profile counts for the live rail. */
export async function getGithubProfile(username: string): Promise<GithubProfile | null> {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}`
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_6H },
      headers: ghHeaders(),
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      public_repos: number
      followers: number
      following: number
    }
    return {
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
    }
  } catch {
    return null
  }
}
