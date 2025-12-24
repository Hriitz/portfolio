import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Performance } from '@/components/performance'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <ExperienceTimeline />
      <Projects />
      <Skills />
      <Performance />
      <Contact />
      <Footer />
    </main>
  )
}

