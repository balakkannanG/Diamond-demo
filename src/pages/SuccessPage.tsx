import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedButton } from '../components/ui/AnimatedButton'
import { GlassCard } from '../components/ui/GlassCard'
import { SuccessCard } from '../components/payment/SuccessCard'
import { useAppContext } from '../context/AppContext'

export function SuccessPage() {
  const { payment, setPayment } = useAppContext()

  useEffect(() => {
    setPayment((prev) => ({ ...prev, paymentStatus: 'success', paymentId: `pay_${Math.random().toString(36).slice(2, 10)}` }))
  }, [setPayment])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.15),_transparent_35%),#111111] px-4 py-24 sm:px-6 lg:px-8">
      <GlassCard className="w-full max-w-3xl p-8 sm:p-10">
        <SuccessCard
          name={payment.customer.name}
          email={payment.customer.email}
          originalAmount={payment.originalAmount}
          discount={payment.selectedDiscount}
          finalAmount={payment.finalAmount}
          paymentId={payment.paymentId || 'pay_0x1234'}
        />
        <div className="mt-8 text-center">
          <Link to="/thank-you">
            <AnimatedButton>Back to Home</AnimatedButton>
          </Link>
        </div>
      </GlassCard>
    </div>
  )
}
