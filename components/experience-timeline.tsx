'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Briefcase, Calendar, MapPin, CheckCircle2, Code } from 'lucide-react'
import { experiences } from '@/data/experience'

const experienceColors = [
  { gradient: 'from-blue-500/20 via-cyan-500/20 to-blue-600/20', border: 'border-blue-500/30', icon: 'text-blue-400' },
  { gradient: 'from-purple-500/20 via-pink-500/20 to-purple-600/20', border: 'border-purple-500/30', icon: 'text-purple-400' },
  { gradient: 'from-green-500/20 via-emerald-500/20 to-green-600/20', border: 'border-green-500/30', icon: 'text-green-400' },
]

export function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="relative border-b border-border bg-background py-24 px-4 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-green-500/5 to-cyan-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl">
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
            <Briefcase className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold md:text-4xl">Experience</h2>
            <Briefcase className="h-8 w-8 text-purple-400 ml-3" />
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey building production systems
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index
            const colors = experienceColors[index % experienceColors.length]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`relative rounded-2xl border bg-gradient-to-br ${colors.gradient} ${colors.border} p-6 backdrop-blur-sm transition-all duration-300 overflow-hidden`}
                  style={{
                    boxShadow: isExpanded 
                      ? '0 10px 40px rgba(0, 0, 0, 0.15)' 
                      : '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Background icon */}
                  <div className={`absolute top-4 right-4 ${colors.icon} opacity-10`}>
                    <Briefcase className="h-24 w-24" />
                  </div>

                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full text-left relative z-10"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-3">
                          <div className={`p-2 rounded-lg bg-background/50 border ${colors.border}`}>
                            <Briefcase className={`h-5 w-5 ${colors.icon}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                            <p className="text-lg font-semibold text-muted-foreground mb-2">{exp.company}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{exp.period}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden relative z-10"
                      >
                        <div className="pt-4 border-t border-border/50 space-y-6">
                          {/* Key Achievements */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <CheckCircle2 className={`h-5 w-5 ${colors.icon}`} />
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-start gap-3 text-muted-foreground"
                                >
                                  <div className={`mt-1.5 h-1.5 w-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')}`} />
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Code className={`h-5 w-5 ${colors.icon}`} />
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.03 }}
                                  className="rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1.5 text-sm font-medium hover:border-border transition-colors"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
