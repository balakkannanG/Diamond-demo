import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/format'

type SuccessCardProps = {
  name: string
  email: string
  originalAmount: number
  discount: number
  finalAmount: number
  paymentId: string
}

export function SuccessCard({ name, email, originalAmount, finalAmount, paymentId }: SuccessCardProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A227]/15"
      >
        <CheckCircle2 className="h-12 w-12 text-[#C9A227]" />
      </motion.div>

      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold text-white">Payment Successful</h2>
        <p className="text-[#f8f7f4]/70">Your luxury purchase is confirmed and beautifully secured.</p>
      </div>

      <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-[#f8f7f4]/80">
        <div className="flex justify-between"><span>Customer</span><span className="text-white">{name}</span></div>
        <div className="flex justify-between"><span>Email</span><span className="text-white">{email}</span></div>
        <div className="flex justify-between"><span>Original</span><span className="text-white">{formatCurrency(originalAmount)}</span></div>
        {/* <div className="flex justify-between"><span>Payable Amount</span><span className="text-white">{formatCurrency(finalAmount)}</span></div> */}
        <div className="flex justify-between"><span>Paid</span><span className="text-white">{formatCurrency(finalAmount)}</span></div>
        <div className="flex justify-between"><span>Payment ID</span><span className="text-white">{paymentId}</span></div>
        <div className="flex justify-between"><span>Transaction Date</span><span className="text-white">{formatDate(new Date())}</span></div>
      </div>
    </div>
  )
}
