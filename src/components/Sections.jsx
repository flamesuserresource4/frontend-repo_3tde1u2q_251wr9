import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useParallax, usePrefersReducedMotion } from './hooks'

const COLORS = {
  primary: '#1F3A93',
  surface: '#F6F9FF',
  accent: '#00BFA6',
  text: '#111827',
}

export function About() {
  const reduce = usePrefersReducedMotion()
  const ref = useParallax(reduce ? 0 : 0.08)
  const skills = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Node', 'GraphQL', 'Accessibility']
  return (
    <section id="about" className="relative py-24 md:py-32" style={{ background: COLORS.surface }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 h-40 w-40 rounded-full blur-2xl opacity-30" style={{ background: COLORS.primary }} />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: COLORS.text }}>About</h2>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              I’m a frontend-focused developer passionate about crafting fast, accessible, and delightful digital products. I blend thoughtful UX with clean, scalable code.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold" style={{ color: COLORS.text }}>Skills</h3>
            <div ref={ref} className="mt-4 flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="px-4 py-2 rounded-full text-sm font-medium shadow-sm border bg-white"
                  style={{ borderColor: '#E5E7EB' }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Projects({ items = [] }) {
  const reduce = usePrefersReducedMotion()
  const [filter, setFilter] = useState('All')
  const techs = useMemo(() => ['All', ...Array.from(new Set(items.flatMap(i => i.stack || [])))], [items])
  const filtered = items.filter(i => filter === 'All' || (i.stack || []).includes(filter))

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-20 h-60 w-60 rounded-full blur-2xl opacity-20" style={{ background: COLORS.accent }} />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-5xl font-bold" style={{ color: COLORS.text }}>Featured Projects</h2>
          <div className="flex gap-2 overflow-x-auto">
            {techs.map(t => (
              <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 rounded-full text-sm border ${filter===t?'text-white':''}`} style={{ background: filter===t?COLORS.primary:'transparent', color: filter===t?'white':COLORS.text, borderColor: '#E5E7EB' }}>{t}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, idx) => (
            <motion.a
              key={p.slug}
              href={`/project/${p.slug}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.06 }}
              className="group block rounded-2xl overflow-hidden border bg-white shadow-sm"
              style={{ borderColor: '#E5E7EB' }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'} alt="" className="h-full w-full object-cover will-change-transform transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {(p.stack||[]).slice(0,3).map(s => <span key={s} className="px-2 py-1 rounded-full bg-gray-100">{s}</span>)}
                </div>
                <h3 className="mt-3 text-lg font-semibold" style={{ color: COLORS.text }}>{p.title}</h3>
                <p className="mt-1 text-gray-600 line-clamp-2">{p.summary}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const [status, setStatus] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed')
      setStatus('Thanks! I will get back to you shortly.')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('Something went wrong. Please try again later.')
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32" style={{ background: COLORS.surface }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold" style={{ color: COLORS.text }}>Let’s build something great</h2>
            <p className="mt-6 text-gray-600 text-lg">Have a project in mind? I’m available for freelance and collaborations.</p>
            <div className="mt-6 flex gap-4">
              <a href="https://github.com" target="_blank" className="text-gray-600 hover:text-gray-900">GitHub</a>
              <a href="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-gray-900">LinkedIn</a>
              <a href="mailto:hello@example.com" className="text-gray-600 hover:text-gray-900">Email</a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input name="name" required className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" required className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input name="company" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Budget</label>
              <input name="budget" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea name="message" rows="5" required className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} />
            </div>
            <button className="mt-6 w-full px-5 py-3 rounded-md text-white font-semibold shadow-lg hover:shadow-xl transition-all" style={{ background: COLORS.primary }}>Send</button>
            {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
