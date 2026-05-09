'use client'

import { useEffect } from 'react'

/**
 * Global single-key hotkeys (when no input is focused):
 *   r  → download resume
 *   c  → jump to contact
 *   gg → scroll to top
 *   G  → scroll to bottom
 *
 * ⌘K / `/` and `?` are owned by Palette and ShortcutOverlay respectively.
 */
export function GlobalHotkeys() {
  useEffect(() => {
    let lastG = 0

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const inEditor = tag === 'INPUT' || tag === 'TEXTAREA'
      if (inEditor || e.metaKey || e.ctrlKey || e.altKey) return

      if (e.key === 'r') {
        e.preventDefault()
        const a = document.createElement('a')
        a.href = '/resume.pdf'
        a.download = 'Hritik-Singh-Resume.pdf'
        a.click()
        return
      }
      if (e.key === 'c') {
        e.preventDefault()
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        return
      }
      if (e.key === 'G') {
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        return
      }
      if (e.key === 'g') {
        const now = Date.now()
        if (now - lastG < 500) {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
          lastG = 0
        } else {
          lastG = now
        }
        return
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return null
}
