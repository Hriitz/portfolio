'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { track } from '@vercel/analytics'
import { profile } from '@/data/profile'
import { ThemeToggle } from './theme-toggle'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>© {currentYear} {profile.name}. All rights reserved.</p>
            <p className="mt-1">Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => track('social_link_click', { platform: 'email', location: 'footer' })}
              className="rounded-full border border-border bg-background p-2 transition-colors hover:bg-accent"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('social_link_click', { platform: 'github', location: 'footer' })}
              className="rounded-full border border-border bg-background p-2 transition-colors hover:bg-accent"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('social_link_click', { platform: 'linkedin', location: 'footer' })}
              className="rounded-full border border-border bg-background p-2 transition-colors hover:bg-accent"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}


