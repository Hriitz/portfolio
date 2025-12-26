'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ExternalLink, Code } from 'lucide-react'
import { useTheme } from 'next-themes'
import { track } from '@vercel/analytics'
import { projects } from '@/data/projects'
import { Project } from '@/types'

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  // Get backdrop color based on theme
  const currentTheme = resolvedTheme || theme || 'dark'
  const backdropColor = currentTheme === 'dark' 
    ? 'rgba(0, 0, 0, 0.92)' 
    : 'rgba(0, 0, 0, 0.75)'

  return (
    <section id="projects" className="relative border-b border-border bg-card py-24 px-4 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 blur-3xl" />
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 blur-3xl" />
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
            <Code className="h-8 w-8 text-purple-400 mr-3" />
            <h2 className="text-3xl font-bold md:text-4xl">Projects</h2>
            <Code className="h-8 w-8 text-pink-400 ml-3" />
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Production systems and case studies from real-world deployments
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-background to-background/50 backdrop-blur-sm transition-all hover:border-purple-500/50"
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => {
                setSelectedProject(project)
                track('project_view', { project: project.title })
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
              
              <div className="relative p-6 z-10">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground mb-3">{project.tagline}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-purple-400" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/50 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium hover:border-border transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="rounded-full border border-border/50 bg-background/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal - Rendered via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <>
                {/* Backdrop - Fully opaque to hide background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] backdrop-blur-sm"
                  onClick={() => setSelectedProject(null)}
                  style={{ 
                    backgroundColor: backdropColor,
                  }}
                />
                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                  onClick={() => setSelectedProject(null)}
                >
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-card shadow-2xl pointer-events-auto flex flex-col"
                  >
                    {/* Header with close button */}
                    <div className="flex-shrink-0 border-b border-border px-6 pt-6 pb-4 md:px-8 md:pt-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-4 flex-wrap">
                            <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                            {selectedProject.url && (
                              <motion.a
                                href={selectedProject.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => track('project_external_link', { project: selectedProject.title, url: selectedProject.url })}
                                whileHover={{ scale: 1.1 }}
                                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span>Live Site</span>
                              </motion.a>
                            )}
                          </div>
                          <p className="text-lg text-muted-foreground">{selectedProject.tagline}</p>
                        </div>
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="flex-shrink-0 rounded-full border border-border bg-background p-2 transition-colors hover:bg-accent"
                          aria-label="Close modal"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Description</h3>
                          <p className="text-muted-foreground">{selectedProject.description}</p>
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Problem</h3>
                          <p className="text-muted-foreground">{selectedProject.problem}</p>
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Constraints</h3>
                          <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
                            {selectedProject.constraints.map((constraint, i) => (
                              <li key={i}>{constraint}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Architecture</h3>
                          <p className="text-muted-foreground">{selectedProject.architecture}</p>
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Key Decisions</h3>
                          <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
                            {selectedProject.decisions.map((decision, i) => (
                              <li key={i}>{decision}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Impact</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {selectedProject.impact.map((metric, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-lg border border-border bg-background p-4"
                              >
                                <div className="mb-1 text-2xl font-bold">{metric.value}</div>
                                <div className="text-sm font-medium text-foreground">{metric.metric}</div>
                                {metric.before && (
                                  <div className="text-xs text-muted-foreground">
                                    From {metric.before}
                                  </div>
                                )}
                                <div className="mt-1 text-xs text-muted-foreground">
                                  {metric.description}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Technologies</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-border bg-background px-3 py-1 text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
              </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}

