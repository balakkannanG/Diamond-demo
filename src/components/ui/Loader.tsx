import { motion } from 'framer-motion'
import { Diamond } from 'lucide-react'

export function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 p-5"
        >
          <Diamond className="h-10 w-10 text-[#C9A227]" />
        </motion.div>
        <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Preparing your experience</p>
      </div>
    </div>
  )
}
