import { motion, type HTMLMotionProps } from 'framer-motion'

type AnimatedInputProps = HTMLMotionProps<'input'> & {
  label: string
  error?: string
}

export function AnimatedInput({ label, error, className = '', ...props }: AnimatedInputProps) {
  return (
    <label className="block w-full text-left">
      <span className="mb-2 block text-sm font-medium text-[#f8f7f4]/80">{label}</span>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        className={`w-full rounded-2xl border border-white/20 bg-[#111111]/60 px-4 py-3 text-white outline-none transition focus:border-[#C9A227] ${className}`}
        {...props}
      />
      {error ? <p className="mt-2 text-sm text-rose-300">{error}</p> : null}
    </label>
  )
}
