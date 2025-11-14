import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { usePrefersReducedMotion } from './hooks'

const COLORS = {
  primary: '#1F3A93',
  surface: '#F6F9FF',
  accent: '#00BFA6',
  text: '#111827',
}

export default function Hero() {
  const reduce = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 600], [0, -80])
  const yMid = useTransform(scrollY, [0, 600], [0, -140])
  const yFg = useTransform(scrollY, [0, 600], [0, -220])

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden flex items-center" style={{ background: COLORS.surface }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full blur-3xl opacity-40" style={{ background: COLORS.primary }} />
        <div className="absolute -bottom-24 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30" style={{ background: COLORS.accent }} />
      </div>

      <motion.div style={{ y: reduce ? 0 : yBg }} className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500">Web Developer • Frontend Engineer</p>
          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold leading-[0.95]" style={{ color: COLORS.text }}>
            Building performant, elegant web experiences.
          </h1>
          <p className="mt-6 text-gray-600 text-lg md:text-xl">
            I craft modern, accessible interfaces with motion that feels natural and purposeful.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#contact" className="px-6 py-3 rounded-md text-white font-semibold shadow-lg hover:shadow-xl transition-all" style={{ background: COLORS.primary }}>Hire Me</a>
            <a href="#projects" className="px-6 py-3 rounded-md font-semibold border" style={{ borderColor: COLORS.primary, color: COLORS.primary }}>View Portfolio</a>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ y: reduce ? 0 : yFg }} className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <div className="h-10 w-[2px] bg-gray-300 rounded-full overflow-hidden">
          <motion.span initial={{ y: 0 }} animate={{ y: [0, 28, 0] }} transition={{ duration: 2, repeat: Infinity }} className="block h-3 w-[2px] bg-gray-500" />
        </div>
      </motion.div>
    </section>
  )
}
