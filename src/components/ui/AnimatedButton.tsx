import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type AnimatedButtonProps = HTMLMotionProps<'button'> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function AnimatedButton({ children, variant = 'primary', className = '', ...props }: AnimatedButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(201,162,39,0.28)' }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-full px-6 py-3 font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-[#111111] ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-[#C9A227] via-[#f1c74a] to-[#b97f00] text-[#111111]'
          : 'border border-white/20 bg-white/10 text-white'
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
