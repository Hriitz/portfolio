'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Server, Palette, Database, Settings, Sparkles } from 'lucide-react'
import { skills } from '@/data/skills'
import { Skill } from '@/types'

const categoryConfig: Record<Skill['category'], { label: string; icon: any; color: string; bgGradient: string }> = {
  language: {
    label: 'Languages',
    icon: Code2,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
  },
  backend: {
    label: 'Backend',
    icon: Server,
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/10 to-purple-600/10 border-purple-500/20',
  },
  frontend: {
    label: 'Frontend',
    icon: Palette,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/10 to-pink-600/10 border-pink-500/20',
  },
  infra: {
    label: 'Infrastructure',
    icon: Database,
    color: 'text-green-400',
    bgGradient: 'from-green-500/10 to-green-600/10 border-green-500/20',
  },
  tools: {
    label: 'Tools & Observability',
    icon: Settings,
    color: 'text-orange-400',
    bgGradient: 'from-orange-500/10 to-orange-600/10 border-orange-500/20',
  },
}

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Skill['category'] | null>(null)

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const category = skill.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>
  )

  return (
    <section id="skills" className="relative border-b border-border bg-background py-24 px-4 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-pink-500/5 to-orange-500/5 blur-3xl" />
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
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <Sparkles className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold md:text-4xl">Technical Skills</h2>
            <Sparkles className="h-8 w-8 text-purple-400 ml-3" />
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, performant systems
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
            const config = categoryConfig[category as Skill['category']]
            const Icon = config.icon
            const isSelected = selectedCategory === category || selectedCategory === null

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="group"
                onMouseEnter={() => setSelectedCategory(category as Skill['category'])}
                onMouseLeave={() => setSelectedCategory(null)}
              >
                <div 
                  className="relative h-full rounded-2xl border p-6 transition-all duration-300"
                  style={{
                    background: config.bgGradient.includes('blue') ? 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))' :
                                config.bgGradient.includes('purple') ? 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))' :
                                config.bgGradient.includes('pink') ? 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))' :
                                config.bgGradient.includes('green') ? 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))' :
                                config.bgGradient.includes('orange') ? 'linear-gradient(to bottom right, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))' : undefined,
                    borderColor: config.bgGradient.includes('blue') ? 'rgba(59, 130, 246, 0.2)' :
                                config.bgGradient.includes('purple') ? 'rgba(168, 85, 247, 0.2)' :
                                config.bgGradient.includes('pink') ? 'rgba(236, 72, 153, 0.2)' :
                                config.bgGradient.includes('green') ? 'rgba(34, 197, 94, 0.2)' :
                                config.bgGradient.includes('orange') ? 'rgba(249, 115, 22, 0.2)' : undefined,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div 
                      className="p-2 rounded-lg border"
                      style={{
                        background: config.bgGradient.includes('blue') ? 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))' :
                                    config.bgGradient.includes('purple') ? 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))' :
                                    config.bgGradient.includes('pink') ? 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))' :
                                    config.bgGradient.includes('green') ? 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))' :
                                    config.bgGradient.includes('orange') ? 'linear-gradient(to bottom right, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))' : undefined,
                        borderColor: config.color.includes('blue') ? 'rgba(96, 165, 250, 0.2)' :
                                    config.color.includes('purple') ? 'rgba(196, 181, 253, 0.2)' :
                                    config.color.includes('pink') ? 'rgba(251, 113, 133, 0.2)' :
                                    config.color.includes('green') ? 'rgba(74, 222, 128, 0.2)' :
                                    config.color.includes('orange') ? 'rgba(251, 146, 60, 0.2)' : undefined,
                      }}
                    >
                      <Icon className={`h-6 w-6 ${config.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{config.label}</h3>
                      <p className="text-sm text-muted-foreground">{categorySkills.length} technologies</p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <AnimatePresence>
                      {categorySkills.map((skill, index) => {
                        const isHovered = hoveredSkill?.name === skill.name
                        return (
                          <motion.button
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: isSelected ? 1 : 0.3,
                              scale: isSelected ? 1 : 0.95,
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.02 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            onHoverStart={() => setHoveredSkill(skill)}
                            onHoverEnd={() => setHoveredSkill(null)}
                            className="relative p-3 rounded-xl border bg-background/50 backdrop-blur-sm text-sm font-medium transition-all duration-200 border-border/50 hover:border-border"
                            style={isHovered ? {
                              borderColor: config.color.includes('blue') ? 'rgba(96, 165, 250, 0.5)' :
                                          config.color.includes('purple') ? 'rgba(196, 181, 253, 0.5)' :
                                          config.color.includes('pink') ? 'rgba(251, 113, 133, 0.5)' :
                                          config.color.includes('green') ? 'rgba(74, 222, 128, 0.5)' :
                                          config.color.includes('orange') ? 'rgba(251, 146, 60, 0.5)' : undefined,
                              boxShadow: config.color.includes('blue') ? '0 10px 15px -3px rgba(96, 165, 250, 0.2)' :
                                         config.color.includes('purple') ? '0 10px 15px -3px rgba(196, 181, 253, 0.2)' :
                                         config.color.includes('pink') ? '0 10px 15px -3px rgba(251, 113, 133, 0.2)' :
                                         config.color.includes('green') ? '0 10px 15px -3px rgba(74, 222, 128, 0.2)' :
                                         config.color.includes('orange') ? '0 10px 15px -3px rgba(251, 146, 60, 0.2)' : undefined,
                              background: config.bgGradient.includes('blue') ? 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))' :
                                          config.bgGradient.includes('purple') ? 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))' :
                                          config.bgGradient.includes('pink') ? 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))' :
                                          config.bgGradient.includes('green') ? 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))' :
                                          config.bgGradient.includes('orange') ? 'linear-gradient(to bottom right, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))' : undefined,
                            } : {}}
                          >
                            <span className={isHovered ? config.color : ''}>{skill.name}</span>
                            
                            {/* Hover tooltip */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 w-64 rounded-lg border bg-background/95 backdrop-blur-md p-3 shadow-xl z-20"
                                  style={{
                                    background: config.bgGradient.includes('blue') ? 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))' :
                                                config.bgGradient.includes('purple') ? 'linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(147, 51, 234, 0.1))' :
                                                config.bgGradient.includes('pink') ? 'linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1))' :
                                                config.bgGradient.includes('green') ? 'linear-gradient(to bottom right, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))' :
                                                config.bgGradient.includes('orange') ? 'linear-gradient(to bottom right, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1))' : undefined,
                                    borderColor: config.color.includes('blue') ? 'rgba(96, 165, 250, 0.3)' :
                                                config.color.includes('purple') ? 'rgba(196, 181, 253, 0.3)' :
                                                config.color.includes('pink') ? 'rgba(251, 113, 133, 0.3)' :
                                                config.color.includes('green') ? 'rgba(74, 222, 128, 0.3)' :
                                                config.color.includes('orange') ? 'rgba(251, 146, 60, 0.3)' : undefined,
                                  }}
                                >
                                  <div className={`text-sm font-semibold mb-1 ${config.color}`}>
                                    {skill.name}
                                  </div>
                                  {skill.description && (
                                    <div className="text-xs text-muted-foreground mb-2">
                                      {skill.description}
                                    </div>
                                  )}
                                  {skill.projects && skill.projects.length > 0 && (
                                    <div className="text-xs">
                                      <span className="font-medium text-foreground">Used in: </span>
                                      <span className="text-muted-foreground">
                                        {skill.projects.join(', ')}
                                      </span>
                                    </div>
                                  )}
                                  {/* Arrow */}
                                  <div 
                                    className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
                                    style={{
                                      borderTopColor: config.color.includes('blue') ? 'rgba(59, 130, 246, 0.3)' :
                                                      config.color.includes('purple') ? 'rgba(168, 85, 247, 0.3)' :
                                                      config.color.includes('pink') ? 'rgba(236, 72, 153, 0.3)' :
                                                      config.color.includes('green') ? 'rgba(34, 197, 94, 0.3)' :
                                                      config.color.includes('orange') ? 'rgba(249, 115, 22, 0.3)' : undefined,
                                    }}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>Hover over skills to see detailed information and project usage</p>
        </motion.div>
      </div>
    </section>
  )
}
