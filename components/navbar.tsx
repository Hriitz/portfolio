'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { track } from '@vercel/analytics'
import { ThemeToggle } from './theme-toggle'
import { Menu, X, User, Briefcase, FolderKanban, Code, Mail, Home } from 'lucide-react'

const navItems = [
  { name: 'About', href: '#about', icon: User },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: FolderKanban },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Contact', href: '#contact', icon: Mail },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Detect active section with proper offset for mobile navbar
      const sections = navItems.map(item => item.href.substring(1))
      const headerOffset = 100
      const scrollPosition = window.scrollY + headerOffset
      
      // Find the current active section
      let currentSection = ''
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset
          const elementBottom = elementTop + element.offsetHeight
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentSection = `#${section}`
            break
          }
        }
      }
      
      // If no section found, check reverse order for scroll position
      if (!currentSection) {
        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element && element.getBoundingClientRect().top + window.pageYOffset <= scrollPosition) {
            currentSection = `#${section}`
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('nav')) {
        setMobileMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [mobileMenuOpen])
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    
    // Track navigation click
    const sectionName = href.substring(1) || 'home'
    track('navigation_click', { section: sectionName })
    
    // Small delay to allow menu to close smoothly
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        const headerOffset = 80 // Account for fixed navbar height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-border/30 bg-background/80 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setMobileMenuOpen(false)
            track('navigation_click', { section: 'home', source: 'logo' })
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 group"
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
            transition={{ duration: 0.3 }}
          />
          <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
            <Image
              src="/logo-H.png"
              alt="Hritik Singh Logo"
              width={32}
              height={32}
              className="relative h-6 w-6 md:h-8 md:w-8 transition-transform group-hover:rotate-3"
              priority
            />
          </div>
          {!scrolled && (
            <span className="hidden md:block text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hritik Singh
            </span>
          )}
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href
            const Icon = item.icon
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.02 }}
                className="relative group"
              >
                <motion.div
                  className={`relative px-4 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-500/30'
                      : 'bg-background/50 border border-border/50 hover:border-blue-500/40 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon 
                      className={`h-4 w-4 transition-colors ${
                        isActive 
                          ? 'text-blue-400' 
                          : 'text-muted-foreground group-hover:text-blue-400'
                      }`} 
                    />
                    <span 
                      className={`text-sm font-medium transition-colors ${
                        isActive 
                          ? 'text-foreground' 
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-1/2 h-1 w-1/2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </motion.a>
            )
          })}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: navItems.length * 0.1 }}
            className="ml-2"
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <motion.button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
              track('mobile_menu_toggle', { action: !mobileMenuOpen ? 'open' : 'close' })
            }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-border/50 hover:border-blue-500/40 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border/30 bg-background/95 backdrop-blur-xl md:hidden overflow-hidden z-50"
          >
            <div className="flex flex-col px-4 py-4 gap-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-500/30 text-foreground' 
                        : 'border border-border/50 bg-background/50 hover:border-blue-500/40 hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon 
                      className={`h-5 w-5 ${
                        isActive ? 'text-blue-400' : 'text-muted-foreground'
                      }`} 
                    />
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeMobileNav"
                        className="absolute right-4 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

