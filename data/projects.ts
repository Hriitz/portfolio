import { Project } from '@/types'

// Personal projects only — workplaces (Spring Street, Wright Research, Floworx)
// live in the experience timeline. Private projects (Njord, Globradar) are
// kept at minimal detail per the user's "don't put too much info out there yet" note.

export const projects: Project[] = [
  {
    id: 'njord',
    title: 'Njord',
    tagline: 'Personal finance for the Indian banking ecosystem',
    status: 'daily',
    description:
      'A daily-driver self-hosted personal finance tracker built for the Indian banking ecosystem. Idempotent ingestion, modular per-bank parsers, runs on a single droplet with systemd. Used personally as the source-of-truth budget system.',
    problem:
      'Indian banking SMS / UPI flows aren\'t well-served by mainstream finance apps. Wanted something self-hosted, fully owned, durable.',
    constraints: [
      'Single-binary deploy on a low-cost VPS',
      'Idempotent ingestion (SMS often duplicates)',
      'Modular per-bank parsing without spaghetti',
      'No external SaaS dependencies',
    ],
    architecture:
      'Go service backed by SQLite. Bot-driven UX. cron schedulers for periodic reconciliation. Self-hosted on a low-cost droplet with systemd.',
    decisions: [
      'Go for one-binary deploy on a low-cost droplet',
      'SQLite for zero-ops single-writer workload',
      'Bot UX over building a custom mobile app',
    ],
    impact: [
      { metric: 'Status',  value: 'daily-use', description: 'Personal driver since 2025' },
      { metric: 'Stack',   value: 'Go + SQLite', description: 'Single binary, zero external deps' },
      { metric: 'Cost',    value: '$5/mo',     description: 'Self-hosted on a small droplet' },
    ],
    technologies: ['Go', 'SQLite', 'Linux', 'systemd', 'cron'],
    highlights: [
      'Idempotent transaction ingestion',
      'Modular per-bank parser interface',
      'Self-hosted on a low-cost droplet',
      'Daily-driver since 2025',
    ],
    categories: ['fintech', 'tooling'],
    trend: [0.3, 0.4, 0.5, 0.55, 0.62, 0.68, 0.72, 0.78, 0.82, 0.85, 0.88],
  },
  {
    id: 'globradar',
    title: 'Globradar',
    tagline: 'AI-powered market intelligence',
    status: 'wip',
    description:
      'In-development market intelligence platform built on multi-LLM workflows. Reasoning-focused enrichment, signal generation, automated alerting. Details kept private while it\'s in active development.',
    problem:
      'Mainstream market-monitoring tools don\'t do reasoning-quality enrichment at the volume / latency I want.',
    constraints: [
      'High-volume enrichment without runaway cost',
      'Reasoning-quality on long-tail events',
      'Alerting latency low enough to act on',
    ],
    architecture:
      'Python services, multi-LLM pipeline (Sonnet for reasoning, Haiku for high-volume enrichment), workflow orchestration, alert delivery.',
    decisions: [
      'Multi-LLM split — heavy model only where it pays for itself',
      'Reasoning-focused enrichment over naïve vector search',
      'Streaming alert pipeline optimized for actionable signals',
    ],
    impact: [
      { metric: 'Stage',    value: 'WIP',       description: 'In active development' },
      { metric: 'Approach', value: 'multi-LLM', description: 'Sonnet + Haiku' },
    ],
    technologies: ['Python', 'Claude API', 'PostgreSQL', 'Redis'],
    highlights: [
      'Reasoning-quality enrichment',
      'Multi-LLM cost / quality split',
      'Streaming alert workflow',
    ],
    categories: ['ai', 'fintech'],
    trend: [0.2, 0.25, 0.3, 0.32, 0.4, 0.42, 0.5, 0.55, 0.6, 0.62, 0.68],
  },
  {
    id: 'portfolio',
    title: 'hritik.dev',
    tagline: 'This site · interactive fintech-terminal portfolio',
    status: 'live',
    url: 'https://hritik-singh-portfolio.vercel.app',
    description:
      'A Linear-dark fintech-terminal portfolio with an interactive REPL (whoami, now, proj, skills, open <id>, theme <color>, …), a ⌘K command palette, live GitHub data (last commit, language breakdown, personal-project rail), and pure-SVG charts. No chart lib — every visualization handcrafted.',
    problem:
      'Most engineering portfolios are static brochures. Wanted something visitors could actually play with that also signals the kind of work I do.',
    constraints: [
      'Dark-only, refined, terminal aesthetic',
      'Real GitHub data (last commit, language breakdown)',
      'Interactive — REPL + ⌘K palette + keyboard shortcuts',
      'Mobile-friendly without dropping the dense look',
      'No heavy chart libraries',
    ],
    architecture:
      'Next.js 14 (App Router) + React 18 + TypeScript + Tailwind. Server components fetch GitHub at build/revalidate time. Pure-SVG charts. Resend for the contact form. Hosted on Vercel.',
    decisions: [
      'Pure SVG over a chart lib (smaller bundle, full control)',
      'Server-component fetches with `revalidate` over client-side polling',
      'Interactive REPL + ⌘K palette over a static page',
      'Single command registry powering both REPL and palette',
    ],
    impact: [
      { metric: 'First-load JS', value: '161 kB', description: 'Lean despite the live data' },
      { metric: 'Page size',     value: '26 kB',  description: 'Compressed HTML payload' },
      { metric: 'GitHub auth',   value: 'token-aware', description: 'Falls back gracefully on rate-limit' },
    ],
    technologies: ['Next.js', 'React 18', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vercel'],
    highlights: [
      'Interactive REPL with autocomplete + history',
      '⌘K command palette + ? shortcuts overlay',
      'Live GitHub data with graceful fallback',
      'Pure-SVG charts (no chart lib)',
    ],
    categories: ['tooling', 'fullstack'],
    trend: [0.1, 0.2, 0.3, 0.45, 0.55, 0.65, 0.75, 0.82, 0.88, 0.94, 1.0],
  },
  {
    id: 'stockapp',
    title: 'stockapp',
    tagline: 'Django stock data visualizer',
    status: 'live',
    url: 'https://github.com/Hriitz/stockapp',
    description:
      'Early Django web app that fetches historical stock data from Yahoo Finance and renders it as an interactive graph. Built as a learning artifact, kept public — first hands-on with finance data + Python web stack.',
    problem:
      'Wanted a quick way to chart any ticker over the last few months without Yahoo Finance\'s noisy default UI.',
    constraints: [
      'Single Django app · minimal moving parts',
      'No paid APIs',
      'Runs locally with `python manage.py runserver`',
    ],
    architecture:
      'Django web app. Pulls historical OHLC from Yahoo Finance, persists to SQLite, renders an interactive line chart in the browser via Chart.js.',
    decisions: [
      'Django over a heavier framework — minimal config',
      'SQLite over Postgres — single-machine learning project',
      'Chart.js over D3 — fast to wire up, plenty for this scope',
    ],
    impact: [
      { metric: 'Repo',  value: 'public', description: 'github.com/Hriitz/stockapp' },
      { metric: 'Stack', value: 'Django + SQLite + Chart.js', description: 'Lean stack' },
    ],
    technologies: ['Python', 'Django', 'SQLite', 'Chart.js', 'Yahoo Finance API'],
    highlights: [
      'Yahoo Finance ingestion',
      'Interactive line chart',
      'Public reference repo',
    ],
    categories: ['fintech', 'data'],
    trend: [0.4, 0.5, 0.6, 0.65, 0.7, 0.72, 0.74, 0.75, 0.76, 0.77, 0.78],
  },
]
