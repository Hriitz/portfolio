'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Users, Zap, TrendingUp, Gauge, Package, Activity, ArrowUp } from 'lucide-react'
import { performanceMetrics } from '@/data/performance'

const metricIcons: Record<string, any> = {
  'Users Served': Users,
  'API Latency': Zap,
  'Cache Hit Rate': TrendingUp,
  'Dashboard Speed': Gauge,
  'PageSpeed Score': Activity,
  'Bundle Size': Package,
  'Uptime': Activity,
}

const getMetricColor = (label: string): string => {
  if (label.includes('Users') || label.includes('Uptime')) return 'text-blue-400'
  if (label.includes('Latency') || label.includes('Speed')) return 'text-green-400'
  if (label.includes('Cache') || label.includes('PageSpeed')) return 'text-purple-400'
  if (label.includes('Bundle')) return 'text-orange-400'
  return 'text-cyan-400'
}

const getMetricGradient = (label: string): string => {
  if (label.includes('Users') || label.includes('Uptime')) return 'from-blue-500/20 via-blue-600/10 to-transparent border-blue-500/30'
  if (label.includes('Latency') || label.includes('Speed')) return 'from-green-500/20 via-green-600/10 to-transparent border-green-500/30'
  if (label.includes('Cache') || label.includes('PageSpeed')) return 'from-purple-500/20 via-purple-600/10 to-transparent border-purple-500/30'
  if (label.includes('Bundle')) return 'from-orange-500/20 via-orange-600/10 to-transparent border-orange-500/30'
  return 'from-cyan-500/20 via-cyan-600/10 to-transparent border-cyan-500/30'
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  
  // Handle special cases that shouldn't be animated (like "90+ / 75+")
  const hasSlash = value.includes('/')
  const hasFaster = value.toLowerCase().includes('faster')
  
  // Extract numeric value - handle comma-separated numbers and k/m suffixes
  let numericValue: number | null = null
  let suffix = ''
  let prefix = ''
  
  // Check for k (thousands) suffix
  if (value.toLowerCase().includes('k')) {
    const match = value.match(/([\d.]+)k/i)
    if (match) {
      numericValue = parseFloat(match[1]) * 1000
      suffix = 'k'
    }
  } else {
    // Extract first number (handles comma-separated)
    const numericMatch = value.match(/[\d,]+\.?\d*/)
    if (numericMatch) {
      const numStr = numericMatch[0].replace(/,/g, '')
      numericValue = parseFloat(numStr)
    }
  }
  
  // Extract prefix (like "<") and suffix units (like "ms", "s", "%", "k")
  if (value.includes('<')) prefix = '<'
  if (value.includes('ms')) suffix = 'ms'
  else if (value.includes('s') && !value.includes('ms') && !hasFaster) suffix = 's'
  else if (value.includes('%')) suffix = '%'
  else if (value.includes('k')) suffix = 'k'
  
  // Extract "faster" text if present
  const fasterText = hasFaster ? ' faster' : ''
  
  const hasPlus = value.includes('+')
  const hasReduced = value.includes('Reduced')
  const hasPercent = value.includes('%')
  const hasDash = value.includes('-') && !hasReduced
  
  // For values with slash (like "90+ / 75+"), don't animate, just show as-is
  if (hasSlash) {
    useEffect(() => {
      if (isInView && ref.current) {
        ref.current.textContent = value
      }
    }, [isInView, value])
    return <span ref={ref}>{value}</span>
  }
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })

  useEffect(() => {
    if (isInView && numericValue !== null && !isNaN(numericValue)) {
      // If we have a k suffix, animate the original value (like 25), not 25000
      if (value.toLowerCase().includes('k') && !value.match(/[\d,]+k/)) {
        const kMatch = value.match(/([\d.]+)k/i)
        motionValue.set(parseFloat(kMatch?.[1] || '0'))
      } else {
        motionValue.set(numericValue)
      }
    } else if (isInView && numericValue === null) {
      if (ref.current) {
        ref.current.textContent = value
      }
    }
  }, [motionValue, isInView, numericValue, value])

  useEffect(() => {
    if (numericValue === null || isNaN(numericValue)) return
    
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const decimals = value.includes('.') && !value.includes('k') ? 1 : 0
        let formatted = latest.toFixed(decimals).replace(/\.0$/, '')
        
        // Handle k suffix - show the k value, not the full number
        if (value.toLowerCase().includes('k') && suffix === 'k') {
          const kMatch = value.match(/([\d.]+)k/i)
          if (kMatch) {
            formatted = parseFloat(kMatch[1]).toString()
          }
        }
        
        if (hasReduced) {
          const rangeMatch = value.match(/Reduced\s+([\d.]+)-?([\d.]+)?%?/i)
          if (rangeMatch && rangeMatch[2]) {
            ref.current.textContent = `Reduced ${formatted}-${rangeMatch[2]}%`
          } else {
            ref.current.textContent = `Reduced ${formatted}${hasPercent ? '%' : ''}`
          }
        } else if (hasDash) {
          // Handle ranges like "70-85%" or "60-80% faster"
          const parts = value.split('-')
          if (parts.length === 2) {
            const secondPart = parts[1]
            const secondNum = secondPart.match(/[\d.]+/)?.[0]
            const secondSuffix = secondPart.match(/(%|ms|s|k)/)?.[0] || ''
            ref.current.textContent = `${formatted}-${secondNum || ''}${suffix || secondSuffix || (hasPercent ? '%' : '')}${fasterText}`
          } else {
            ref.current.textContent = `${formatted}${suffix || (hasPercent ? '%' : '')}${fasterText}`
          }
        } else {
          // Build the output string
          let output = prefix + formatted + suffix + fasterText
          if (hasPlus) output += '+'
          else if (hasPercent && !suffix) output += '%'
          
          ref.current.textContent = output
        }
      }
    })
    
    return () => unsubscribe()
  }, [springValue, value, numericValue, hasPlus, hasReduced, hasPercent, hasDash, prefix, suffix, fasterText])

  if (numericValue === null || isNaN(numericValue)) {
    return <span ref={ref}>{value}</span>
  }

  return <span ref={ref}>0</span>
}

function ProgressBar({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const numericMatch = value.match(/[\d.]+/)
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : null
  
  // Calculate percentage for progress bar (normalize different metrics)
  let percentage = 0
  if (numericValue !== null) {
    if (label.includes('Cache Hit Rate')) {
      percentage = Math.min(numericValue, 100)
    } else if (label.includes('Uptime')) {
      percentage = numericValue
    } else if (label.includes('PageSpeed')) {
      const parts = value.split('/')
      percentage = parseFloat(parts[0]?.trim() || '0')
    } else if (label.includes('Bundle') || label.includes('Speed')) {
      // For reductions, show as improvement
      percentage = 100 - (numericValue > 100 ? 0 : numericValue)
    } else {
      percentage = Math.min(numericValue / 100, 1) * 100
    }
  }

  const color = getMetricColor(label)
  const colorClass = color.replace('text-', 'bg-')

  return (
    <div ref={ref} className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-2">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: label.includes('Users') || label.includes('Uptime') ? 'linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8))' :
                                label.includes('Latency') || label.includes('Speed') ? 'linear-gradient(to right, rgba(34, 197, 94, 0.8), rgba(22, 163, 74, 0.8))' :
                                label.includes('Cache') || label.includes('PageSpeed') ? 'linear-gradient(to right, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 0.8))' :
                                label.includes('Bundle') ? 'linear-gradient(to right, rgba(249, 115, 22, 0.8), rgba(234, 88, 12, 0.8))' :
                                'linear-gradient(to right, rgba(34, 211, 238, 0.8), rgba(6, 182, 212, 0.8))',
                  }}
      />
    </div>
  )
}

export function Performance() {
  return (
    <section className="relative border-b border-border bg-card py-24 px-4 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <TrendingUp className="h-8 w-8 text-green-400 mr-3" />
            <h2 className="text-3xl font-bold md:text-4xl">Performance Metrics</h2>
            <TrendingUp className="h-8 w-8 text-blue-400 ml-3" />
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Engineering credibility through measurable impact and real-world results
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {performanceMetrics.map((metric, index) => {
            const Icon = metricIcons[metric.label] || Activity
            const color = getMetricColor(metric.label)
            const gradient = getMetricGradient(metric.label)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl`}
                style={{
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)`,
                }}
              >
                {/* Icon */}
                <div className={`absolute top-4 right-4 ${color} opacity-20 group-hover:opacity-30 transition-opacity`}>
                  <Icon className="h-16 w-16" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                    className="p-2 rounded-lg bg-background/50 border"
                    style={{
                      borderColor: color.includes('blue') ? 'rgba(96, 165, 250, 0.2)' :
                                  color.includes('green') ? 'rgba(74, 222, 128, 0.2)' :
                                  color.includes('purple') ? 'rgba(196, 181, 253, 0.2)' :
                                  color.includes('orange') ? 'rgba(251, 146, 60, 0.2)' :
                                  color.includes('cyan') ? 'rgba(34, 211, 238, 0.2)' : undefined,
                    }}
                  >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{metric.label}</h3>
                        {metric.improvement && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <ArrowUp className="h-3 w-3 text-green-400" />
                            <span>{metric.improvement}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Value */}
                  <div className={`mb-3 text-4xl font-bold ${color} font-mono`}>
                    <AnimatedCounter value={metric.value} />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mb-4">{metric.description}</p>

                  {/* Progress bar for applicable metrics */}
                  {(metric.label.includes('Cache') || 
                    metric.label.includes('Uptime') || 
                    metric.label.includes('PageSpeed') || 
                    metric.label.includes('Bundle') || 
                    metric.label.includes('Speed')) && (
                    <ProgressBar value={metric.value} label={metric.label} />
                  )}
                </div>

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>Metrics from production systems • All numbers verified in real-world deployments</p>
        </motion.div>
      </div>
    </section>
  )
}
