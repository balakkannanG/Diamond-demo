import { motion } from 'framer-motion'
import { formatCurrency } from '../../utils/format'

type AmountCardProps = {
  title: string
  amount: number
  accent?: boolean
}

export function AmountCard({ title, amount, accent = false }: AmountCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border px-4 py-4 ${accent ? 'border-[#C9A227]/50 bg-[#C9A227]/10' : 'border-white/10 bg-white/5'}`}
    >
      <p className="text-sm text-[#f8f7f4]/70">{title}</p>
      <p className={`mt-2 text-2xl font-semibold ${accent ? 'text-[#C9A227]' : 'text-white'}`}>
        {formatCurrency(amount)}
      </p>
    </motion.div>
  )
}
