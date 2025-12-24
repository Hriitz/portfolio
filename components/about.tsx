'use client'

import { motion } from 'framer-motion'
import { User, GraduationCap, MapPin, Award } from 'lucide-react'
import { profile } from '@/data/profile'
import { education } from '@/data/education'

export function About() {
  return (
    <section id="about" className="relative border-b border-border bg-card py-24 px-4 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <User className="h-8 w-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold md:text-4xl">About Me</h2>
            <User className="h-8 w-8 text-blue-400 ml-3" />
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know my background and expertise
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl border bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/20 p-8 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <User className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Who I Am</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{profile.bio}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  I'm passionate about building robust, scalable systems that handle real financial data
                  with precision and performance. My work focuses on backend infrastructure, API design,
                  and ensuring security and compliance in financial applications.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-2xl border bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-purple-500/20 p-8 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <GraduationCap className="h-6 w-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  Education
                  {education.gpa && (
                    <span className="text-sm font-normal text-muted-foreground">({education.gpa} GPA)</span>
                  )}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-lg text-foreground">{education.degree}</p>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{education.institution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{education.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Award className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{education.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
