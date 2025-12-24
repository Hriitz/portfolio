'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Determine if we're in dark mode
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', updateMousePosition)

    // Elements that should trigger hover state
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null

  return (
    <>
      {/* Custom cursor dot - only on desktop */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-50 hidden lg:block ${
          isDark ? 'mix-blend-difference' : ''
        }`}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        <div
          className={`h-2 w-2 rounded-full ${
            isDark ? 'bg-white' : 'bg-foreground'
          }`}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden lg:block ${
          isDark ? 'mix-blend-difference' : ''
        }`}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? (isDark ? 0.5 : 0.4) : (isDark ? 0.3 : 0.25),
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
        }}
      >
        <div
          className={`h-10 w-10 rounded-full border ${
            isDark ? 'border-white' : 'border-foreground'
          }`}
        />
      </motion.div>
    </>
  )
}

