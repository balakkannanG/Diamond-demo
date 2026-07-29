import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -8, scale: 1.01, transition: { duration: 0.2 } } : undefined}
      className={`rounded-[2rem] border border-white/20 bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  )
}
