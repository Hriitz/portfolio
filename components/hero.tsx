'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Code, Database, Server, Cpu, Zap, Network, Cloud, Box } from 'lucide-react'
import { profile } from '@/data/profile'

const phrases = [
  'Building scalable FinTech platforms & backend systems',
  'Engineering secure financial platforms',
  'Optimizing performance at scale',
  'Crafting robust backend solutions',
]

export function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typePhrase = () => {
      const phrase = phrases[currentPhrase]
      const currentLength = displayText.length

      if (!isDeleting && currentLength < phrase.length) {
        setDisplayText(phrase.slice(0, currentLength + 1))
      } else if (!isDeleting && currentLength === phrase.length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentLength > 0) {
        setDisplayText(phrase.slice(0, currentLength - 1))
      } else if (isDeleting && currentLength === 0) {
        setIsDeleting(false)
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
      }
    }

    const timer = setTimeout(typePhrase, isDeleting ? 50 : 100)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentPhrase])

  const scrollToContent = () => {
    const element = document.getElementById('about')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
      </div>

      {/* Animated tech icons */}
      <motion.div
        className="absolute left-10 top-20 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Server className="h-16 w-16 text-blue-500" />
      </motion.div>

      <motion.div
        className="absolute right-10 top-40 opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Database className="h-16 w-16 text-purple-500" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/4 opacity-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Code className="h-16 w-16 text-green-500" />
      </motion.div>

      <motion.div
        className="absolute left-1/4 top-1/3 opacity-15"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Cpu className="h-12 w-12 text-cyan-500" />
      </motion.div>

      <motion.div
        className="absolute right-1/4 top-1/4 opacity-15"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Zap className="h-14 w-14 text-yellow-500" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/3 opacity-15"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Network className="h-12 w-12 text-pink-500" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/6 opacity-15"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Cloud className="h-10 w-10 text-blue-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/6 opacity-15"
        animate={{
          y: [0, 16, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Box className="h-11 w-11 text-indigo-500" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-sm font-medium text-muted-foreground md:text-base"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 min-h-[60px] text-xl text-muted-foreground md:text-2xl lg:text-3xl"
        >
          <span className="inline-block">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="ml-1 inline-block"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-12 text-lg text-muted-foreground md:text-xl"
        >
          {profile.role} • {profile.specialization}
          <br />
          <span className="text-base">{profile.location}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-foreground px-8 py-3 text-background transition-colors hover:bg-foreground/90"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg border border-border bg-card px-8 py-3 transition-colors hover:bg-accent"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll to content"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </motion.button>
    </section>
  )
}

