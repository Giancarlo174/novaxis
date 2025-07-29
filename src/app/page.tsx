'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Foda from '@/components/Foda'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Foda />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
