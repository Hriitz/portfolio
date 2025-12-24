'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Github, Linkedin, Send, Check, Phone, MessageSquare, Sparkles, X, AlertCircle } from 'lucide-react'
import { profile } from '@/data/profile'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSubmitted(false) // Clear any previous success state

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success state
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 8 seconds
      setTimeout(() => setSubmitted(false), 8000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative border-b border-border bg-background py-24 px-4 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
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
            <MessageSquare className="h-8 w-8 text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold md:text-4xl">Get In Touch</h2>
            <Sparkles className="h-8 w-8 text-purple-400 ml-3" />
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Always open to discussing new opportunities, interesting projects, and collaborations
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10 border-blue-500/20 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-xl font-semibold flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-400" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${profile.email}`}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background hover:border-blue-500/50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-medium">{profile.email}</div>
                  </div>
                </motion.a>
                {profile.phone && (
                  <motion.a
                    href={`tel:${profile.phone}`}
                    whileHover={{ x: 4, scale: 1.02 }}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background hover:border-green-500/50 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                      <Phone className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Phone</div>
                      <div className="font-medium">{profile.phone}</div>
                    </div>
                  </motion.a>
                )}
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background hover:border-purple-500/50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                    <Github className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">GitHub</div>
                    <div className="font-medium">@hritik3447</div>
                  </div>
                </motion.a>
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background hover:border-cyan-500/50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                    <Linkedin className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">LinkedIn</div>
                    <div className="font-medium">Connect with me</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-purple-500/20 p-8 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-xl font-semibold flex items-center gap-2">
              <Send className="h-5 w-5 text-purple-400" />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-3 focus:border-purple-500/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-3 focus:border-purple-500/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-3 focus:border-purple-500/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {/* Error Notification */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-lg border-2 border-red-500/50 bg-gradient-to-r from-red-500/20 via-red-500/15 to-red-500/20 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-red-500/20 p-2 border border-red-500/30">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-red-300 mb-1">Failed to Send</div>
                        <div className="text-sm text-red-400/90">{error}</div>
                      </div>
                      <button
                        onClick={() => setError(null)}
                        className="rounded-full hover:bg-red-500/20 p-1 transition-colors"
                        aria-label="Dismiss error"
                      >
                        <X className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Notification */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-lg border-2 border-green-500/50 bg-gradient-to-r from-green-500/20 via-green-500/15 to-green-500/20 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="rounded-full bg-green-500/20 p-2 border border-green-500/30"
                      >
                        <Check className="h-5 w-5 text-green-400" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="font-semibold text-green-300 mb-1">Message Sent Successfully!</div>
                        <div className="text-sm text-green-400/90">
                          Thank you for reaching out. I'll get back to you as soon as possible.
                        </div>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="rounded-full hover:bg-green-500/20 p-1 transition-colors"
                        aria-label="Dismiss success"
                      >
                        <X className="h-4 w-4 text-green-400" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting || submitted}
                whileHover={!isSubmitting && !submitted ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && !submitted ? { scale: 0.98 } : {}}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-medium text-white transition-all hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="check"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-5 w-5" />
                      <span>Sent!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <Send className="h-5 w-5" />
                          </motion.div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
