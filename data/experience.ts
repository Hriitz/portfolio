import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    company: 'Spring Street',
    role: 'Founding / Platform Engineer',
    period: 'Nov 2025 — Present',
    start: '2025.11',
    end: 'now',
    location: 'On-site · Mumbai',
    description:
      'Founding engineer — built the entire broker-grade fintech platform from scratch. Backend, frontend, infra, deployment, observability owned end-to-end.',
    achievements: [
      'Built the full platform from scratch — backend, frontend, infra, CI/CD, observability — as the founding engineer on Go + Goa v3 + PostgreSQL + GKE',
      'Migrated transport from Goa HTTP → Connect-RPC (protobuf) for tighter contracts and lower payload',
      'Real-time portfolio & order streaming over WebSockets with low-latency event delivery',
      'Designed exactly-once outbox execution + reconciliation workflows for trading ops',
      'Secure APIs: JWT auth, refresh-token rotation, RBAC, broker impersonation, session security',
      'Production infra on Docker, GitHub Actions, Artifact Registry, Kubernetes (GKE)',
      'End-to-end observability with Prometheus + OpenTelemetry',
      'Frontend bundle strategy on Vite — code-splitting, lazy loading, caching (−40 to −50% bundle)',
      'Improved Lighthouse scores, reduced TTI through aggressive perf optimization',
    ],
    technologies: [
      'Go', 'Goa v3', 'protobuf', 'Connect-RPC', 'PostgreSQL', 'React 18', 'TypeScript', 'Vite', 'Tailwind CSS',
      'Docker', 'Kubernetes', 'GKE', 'GitHub Actions', 'Artifact Registry', 'Prometheus', 'OpenTelemetry',
      'WebSockets', 'JWT', 'RBAC', 'Redis',
    ],
    trend: [0.4, 0.45, 0.5, 0.6, 0.7, 0.78, 0.85, 0.88, 0.93, 0.97],
  },
  {
    company: 'Wright Research',
    role: 'Software Engineer',
    period: 'Dec 2023 — Feb 2026',
    start: '2023.12',
    end: '2026.02',
    location: 'Remote',
    description:
      'Architecting and scaling a production fintech platform serving 25,000+ users — performance, security, and reliability work owned end-to-end.',
    achievements: [
      'Architected and scaled Django + DRF backend serving 25,000+ users',
      'Led and mentored 5+ interns and junior engineers',
      'Optimized DB routing, indexing, query patterns → 60–80% faster dashboards',
      'Migrated cache from Memcached → Redis (70–85% hit rate)',
      'Reduced API latency 2–3s → <500ms',
      'Built Mutual Fund Review System end-to-end — 1000+ portfolios analyzed',
      'Designed OMS/PMS integrations and backend services on Python/Django/DRF/Redis/PostgreSQL/GCP',
      'Lighthouse mobile 45 → 75+, desktop 77 → 90+, LCP −40%, CLS 0.27 → <0.1, page weight −15–20MB',
      'Security hardening: CSP, HSTS, audit logging, CERT-In aligned, fixed OWASP A2/A3/A5/A7/A10',
      'Owned production ops on GCP — Nginx, Gunicorn, Redis, Cloud CDN — 99.9% uptime, −30% incident MTTR',
    ],
    technologies: [
      'Python', 'Django', 'DRF', 'Redis', 'PostgreSQL', 'React 18', 'TypeScript',
      'GCP', 'Nginx', 'Gunicorn', 'Cloud CDN', 'Memcached',
    ],
    trend: [0.1, 0.18, 0.28, 0.42, 0.55, 0.62, 0.7, 0.78, 0.85, 0.9, 0.95],
  },
  {
    company: 'Floworx',
    role: 'Junior Software Engineer',
    period: 'Sep 2023 — Nov 2023',
    start: '2023.09',
    end: '2023.11',
    location: 'Bengaluru',
    description:
      'Backend services and REST APIs across Node.js / TypeScript and Java / Spring Boot stacks.',
    achievements: [
      'Built backend services on Node.js, Express, TypeScript, PostgreSQL, Redis, Spring Boot',
      'REST APIs, authentication systems, backend optimizations, CI/CD',
      'Contributed across multiple stacks (Java/Spring Boot + Node.js)',
    ],
    technologies: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Redis', 'Spring Boot'],
    trend: [0.25, 0.4, 0.55, 0.7],
  },
]
