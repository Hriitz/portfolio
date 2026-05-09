import { HeaderStrip } from '@/components/header-strip'
import { Ticker } from '@/components/ticker'
import { NavRail } from '@/components/nav-rail'
import { LiveRail } from '@/components/live-rail'
import { StatusLine } from '@/components/status-line'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Performance } from '@/components/performance'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Achievements } from '@/components/achievements'
import { Contact } from '@/components/contact'
import { getLanguageBreakdown } from '@/lib/github-contributions'

export default async function Home() {
  const langs = await getLanguageBreakdown('Hriitz')

  return (
    <main className="min-h-screen flex flex-col">
      <HeaderStrip />
      <Ticker />

      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)_280px] flex-1">
        <NavRail />

        <div className="min-w-0 px-4 md:px-6 lg:px-8 py-5 lg:py-6 space-y-4">
          <Hero />
          <About />
          <ExperienceTimeline />
          <Projects />
          <Skills langs={langs ?? undefined} />
          <Performance />
          <Achievements />
          <Contact />
        </div>

        <LiveRail />
      </div>

      <StatusLine />
    </main>
  )
}
