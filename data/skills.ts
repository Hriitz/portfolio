import { Skill } from '@/types'

export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'language', projects: ['Wright Research'], description: 'Django, DRF, data processing' },
  { name: 'Go', category: 'language', projects: ['Spring Street', 'E-commerce API'], description: 'High-performance backend services' },
  { name: 'Java', category: 'language', projects: ['Floworx'], description: 'Spring Boot, enterprise applications' },
  { name: 'C++', category: 'language', projects: ['Academic Projects'], description: 'System programming, algorithms' },
  { name: 'JavaScript', category: 'language', projects: ['Wright Research', 'Spring Street', 'Floworx'], description: 'Modern ES6+ development' },
  { name: 'TypeScript', category: 'language', projects: ['Wright Research', 'Spring Street', 'Floworx'], description: 'Type-safe frontend & backend' },
  { name: 'SQL', category: 'language', projects: ['Wright Research', 'Spring Street', 'Floworx'], description: 'Database queries and optimization' },
  
  // Backend
  { name: 'Django', category: 'backend', projects: ['Wright Research'], description: 'REST APIs, ORM, admin' },
  { name: 'DRF', category: 'backend', projects: ['Wright Research'], description: 'Django REST Framework' },
  { name: 'Goa', category: 'backend', projects: ['Spring Street'], description: 'Go framework for microservices' },
  { name: 'Gin', category: 'backend', projects: ['Spring Street', 'E-commerce API'], description: 'High-performance Go web framework' },
  { name: 'Spring Boot', category: 'backend', projects: ['Floworx'], description: 'Enterprise Java framework' },
  { name: 'Node.js', category: 'backend', projects: ['Floworx'], description: 'Runtime for JavaScript servers' },
  { name: 'Express', category: 'backend', projects: ['Floworx'], description: 'Node.js web framework' },
  { name: 'JWT', category: 'backend', projects: ['Spring Street', 'E-commerce API'], description: 'Authentication & authorization' },
  { name: 'RBAC', category: 'backend', projects: ['Spring Street'], description: 'Role-based access control' },
  
  // Frontend
  { name: 'React 18', category: 'frontend', projects: ['Wright Research', 'Spring Street'], description: 'Component library' },
  { name: 'TypeScript', category: 'frontend', projects: ['Wright Research', 'Spring Street'], description: 'Type-safe UI development' },
  { name: 'Vite', category: 'frontend', projects: ['Spring Street'], description: 'Build tool, code-splitting' },
  { name: 'Tailwind CSS', category: 'frontend', projects: ['Spring Street', 'This Portfolio'], description: 'Utility-first CSS framework' },
  
  // Databases
  { name: 'PostgreSQL', category: 'infra', projects: ['Wright Research', 'Spring Street', 'Floworx'], description: 'Primary relational database' },
  { name: 'Redis', category: 'infra', projects: ['Wright Research', 'Spring Street'], description: 'Caching, sessions' },
  { name: 'SQLite', category: 'infra', projects: ['Various Projects'], description: 'Lightweight database' },
  
  // Cloud & Infrastructure
  { name: 'GCP', category: 'infra', projects: ['Wright Research', 'Spring Street'], description: 'Google Cloud Platform' },
  { name: 'Docker', category: 'infra', projects: ['Spring Street', 'Wright Research'], description: 'Containerization' },
  { name: 'Kubernetes (GKE)', category: 'infra', projects: ['Spring Street'], description: 'Container orchestration' },
  { name: 'Nginx', category: 'infra', projects: ['Wright Research'], description: 'Reverse proxy, load balancing' },
  { name: 'CI/CD', category: 'infra', projects: ['Spring Street', 'Wright Research'], description: 'Continuous integration & deployment' },
  
  // Observability
  { name: 'Prometheus', category: 'tools', projects: ['Spring Street'], description: 'Metrics & observability' },
  { name: 'Sentry', category: 'tools', projects: ['Wright Research'], description: 'Error tracking & monitoring' },
]
