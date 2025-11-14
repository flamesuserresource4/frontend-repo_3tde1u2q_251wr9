import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import { About, Projects, Contact } from './components/Sections'

export default function App() {
  const [projects, setProjects] = useState([])
  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/projects`)
        const data = await res.json()
        setProjects(data)
      } catch (e) {
        setProjects([])
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen text-gray-900" style={{ background: '#F6F9FF' }}>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/60 border-b border-white/20">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight" style={{ color: '#1F3A93' }}>Dev Portfolio</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#projects" className="hover:opacity-80">Projects</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        <Hero />
        <About />
        <Projects items={projects} />
        <Contact />
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Your Name</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-800">Privacy</a>
            <a href="#" className="hover:text-gray-800">Imprint</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
