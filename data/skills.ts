import { Skill } from '@/types'

// Tech radar layout
//   Quadrants (angles measured CCW from +x axis):
//     backend  TR :   5° – 85°
//     infra    TL :  95° – 175°
//     tools    BL : 185° – 265°
//     frontend BR : 275° – 355°
//   Rings: 1 = mastery (innermost), 4 = exposure (outermost). Used by Radar.
//
// This list is grounded in real evidence from the user's actual repos
// (gh api ... languages, go.mod, pyproject.toml). Private projects contribute
// to the skill set but are not attributed back here.

export const skills: Skill[] = [
  // ── Backend (TR) — Go side ───────────────────────────────────
  { name: 'Go',          category: 'backend', ring: 1, angle: 14,  description: 'Primary backend language — concurrent services, single-binary deploys' },
  { name: 'Goa v3',      category: 'backend', ring: 1, angle: 28,  description: 'DSL-driven service framework — current production stack' },
  { name: 'gRPC',        category: 'backend', ring: 1, angle: 42,  description: 'protobuf RPC transport — Goa HTTP → gRPC migration in flight' },
  { name: 'protobuf',    category: 'backend', ring: 1, angle: 56,  description: 'Wire format for the RPC layer + schema evolution' },
  { name: 'GORM',        category: 'backend', ring: 2, angle: 18,  description: 'Type-safe ORM over PostgreSQL & SQLite' },
  { name: 'WebSockets',  category: 'backend', ring: 1, angle: 70,  description: 'Real-time portfolio + order streaming · gorilla/websocket' },
  { name: 'JWT / RBAC',  category: 'backend', ring: 1, angle: 84,  description: 'Auth, refresh-token rotation, broker impersonation flows' },
  { name: 'Gin',         category: 'backend', ring: 3, angle: 24,  description: 'Go HTTP framework — used in earlier services' },

  // ── Backend (TR) — Python side ────────────────────────────────
  { name: 'FastAPI',     category: 'backend', ring: 1, angle: 38,  description: 'Async Python services — pydantic-typed APIs' },
  { name: 'SQLAlchemy',  category: 'backend', ring: 2, angle: 50,  description: 'Async ORM (asyncio + aiosqlite/asyncpg)' },
  { name: 'Pydantic',    category: 'backend', ring: 2, angle: 62,  description: 'Typed data validation, settings, schema' },
  { name: 'Django',      category: 'backend', ring: 2, angle: 32,  description: 'REST APIs, ORM, admin — Wright Research stack' },
  { name: 'DRF',         category: 'backend', ring: 2, angle: 46,  description: 'Django REST Framework' },
  { name: 'Spring Boot', category: 'backend', ring: 3, angle: 78,  description: 'Java enterprise — early-career stack' },
  { name: 'Node.js',     category: 'backend', ring: 3, angle: 8,   description: 'JS runtime · Express services' },

  // ── Infra (TL) ────────────────────────────────────────────────
  { name: 'PostgreSQL',  category: 'infra', ring: 1, angle: 100, description: 'Primary relational store · pgx + GORM' },
  { name: 'Redis',       category: 'infra', ring: 1, angle: 114, description: 'Caching · session store · 70–85% hit rate at scale' },
  { name: 'Docker',      category: 'infra', ring: 1, angle: 128, description: 'Containerized services · multi-stage builds' },
  { name: 'GKE',         category: 'infra', ring: 1, angle: 142, description: 'Kubernetes on GCP · GitHub Actions → Artifact Registry' },
  { name: 'Kubernetes',  category: 'infra', ring: 2, angle: 108, description: 'Pods, services, helm-style manifests' },
  { name: 'GCP',         category: 'infra', ring: 2, angle: 122, description: 'Cloud platform · Cloud CDN, IAM, networking' },
  { name: 'Nginx',       category: 'infra', ring: 2, angle: 136, description: 'Reverse proxy · load balancing · static caching' },
  { name: 'SQLite',      category: 'infra', ring: 2, angle: 150, description: 'Embedded DB · zero-ops single-writer workloads' },
  { name: 'Memcached',   category: 'infra', ring: 4, angle: 170, description: 'Migrated away in favour of Redis' },
  { name: 'MongoDB',     category: 'infra', ring: 4, angle: 165, description: 'Document store · earlier projects' },

  // ── Tools / Observability / DevOps (BL) ───────────────────────
  { name: 'Prometheus',     category: 'tools', ring: 1, angle: 192, description: 'Metrics, alerting, golden signals' },
  { name: 'OpenTelemetry',  category: 'tools', ring: 1, angle: 206, description: 'Distributed tracing — Goa + go.opentelemetry.io/otel' },
  { name: 'GitHub Actions', category: 'tools', ring: 1, angle: 220, description: 'CI/CD pipelines · build · test · deploy' },
  { name: 'Linux',          category: 'tools', ring: 1, angle: 234, description: 'systemd, networking, ops, $5-droplet self-host' },
  { name: 'Artifact Reg.',  category: 'tools', ring: 2, angle: 198, description: 'Container image registry on GCP' },
  { name: 'pytest',         category: 'tools', ring: 2, angle: 212, description: 'Python testing · pytest-asyncio · pytest-cov' },
  { name: 'ruff / pyright', category: 'tools', ring: 2, angle: 226, description: 'Modern Python lint + type-check' },
  { name: 'uv',             category: 'tools', ring: 3, angle: 242, description: 'Fast Python package manager' },
  { name: 'Make',           category: 'tools', ring: 3, angle: 256, description: 'Project task runner · used everywhere' },

  // ── Frontend (BR) ─────────────────────────────────────────────
  { name: 'React 18',    category: 'frontend', ring: 1, angle: 280, description: 'Suspense, lazy, transitions, server components' },
  { name: 'TypeScript',  category: 'frontend', ring: 1, angle: 296, description: 'Type-safe full-stack · strict mode' },
  { name: 'Vite',        category: 'frontend', ring: 1, angle: 312, description: 'Code-splitting, lazy loading · −40 to −50% bundles' },
  { name: 'Next.js',     category: 'frontend', ring: 1, angle: 328, description: 'App router, server components · this site' },
  { name: 'Tailwind',    category: 'frontend', ring: 2, angle: 286, description: 'Utility-first CSS · design-system primitives' },
  { name: 'Framer Motion', category: 'frontend', ring: 3, angle: 320, description: 'Stagger, layout, spring transitions' },

  // ── AI / agentic dev — how I ship fast ─────────────────────────
  { name: 'Agentic coding',   category: 'tools', ring: 1, angle: 188, description: 'Agent-driven dev workflows · ship products fast' },
  { name: 'Claude Code',      category: 'tools', ring: 1, angle: 196, description: 'Daily-driver coding agent · refactor, test, ship' },
  { name: 'Claude API',       category: 'tools', ring: 1, angle: 204, description: 'Sonnet for reasoning · Haiku for high-volume enrichment' },
  { name: 'Cursor / Codex',   category: 'tools', ring: 2, angle: 192, description: 'Editor-side AI assist when iterating tightly' },
  { name: 'LLM orchestration',category: 'tools', ring: 2, angle: 200, description: 'Multi-LLM pipelines · prompt eval · routing' },
  { name: 'MCP',              category: 'tools', ring: 3, angle: 184, description: 'Model Context Protocol — agent tool integrations' },
  { name: 'Prompt engineering',category: 'tools', ring: 3, angle: 208, description: 'Schema-first prompts · evals · regression tests' },

  // ── ML / Data — outer rings of tools quadrant ─────────────────
  { name: 'PyTorch',     category: 'tools', ring: 3, angle: 252, description: 'Reasoning + enrichment models' },
  { name: 'transformers',category: 'tools', ring: 3, angle: 264, description: 'HuggingFace · LLM + classifier inference' },
  { name: 'scikit-learn',category: 'tools', ring: 3, angle: 272, description: 'Classical ML baselines' },
  { name: 'xgboost',     category: 'tools', ring: 4, angle: 280, description: 'Gradient boosted trees' },
  { name: 'spaCy',       category: 'tools', ring: 4, angle: 268, description: 'NLP pipelines · entity recognition' },
  { name: 'pandas',      category: 'tools', ring: 2, angle: 256, description: 'Tabular data wrangling' },
  { name: 'Jupyter',     category: 'tools', ring: 3, angle: 248, description: 'Notebooks for analysis · ipykernel' },
  { name: 'Streamlit',   category: 'tools', ring: 4, angle: 260, description: 'Quick analyst dashboards' },

  // ── Languages anchor row ──────────────────────────────────────
  { name: 'Python',      category: 'language', ring: 1, angle: 60,  description: 'AI/ML, FastAPI services, data pipelines' },
  { name: 'Java',        category: 'language', ring: 3, angle: 72,  description: 'Spring Boot, J2EE — early-career' },
  { name: 'SQL',         category: 'language', ring: 1, angle: 158, description: 'Query optimization, indexing, EXPLAIN ANALYZE' },
  { name: 'C++',         category: 'language', ring: 4, angle: 4,   description: 'Systems / algorithms — academic + interview' },
]
