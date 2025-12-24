import { PerformanceMetric } from '@/types'

export const performanceMetrics: PerformanceMetric[] = [
  {
    label: 'Users Served',
    value: '25,000+',
    improvement: 'Wright Research Platform',
    description: 'Production FinTech platform',
  },
  {
    label: 'API Latency',
    value: '<500ms',
    improvement: 'From 2-3s',
    description: 'Redis caching & optimization',
  },
  {
    label: 'Cache Hit Rate',
    value: '70-85%',
    improvement: 'Memcached → Redis',
    description: 'High-performance caching',
  },
  {
    label: 'Dashboard Speed',
    value: '60-80% faster',
    improvement: 'Database optimization',
    description: 'Query patterns & indexing',
  },
  {
    label: 'PageSpeed Score',
    value: '90+ / 75+',
    improvement: 'Desktop / Mobile',
    description: 'Performance optimization',
  },
  {
    label: 'Bundle Size',
    value: 'Reduced 40-50%',
    improvement: 'Vite optimization',
    description: 'Code splitting & lazy loading',
  },
  {
    label: 'Uptime',
    value: '99.9%',
    improvement: 'Production ops',
    description: 'GCP infrastructure',
  },
]

