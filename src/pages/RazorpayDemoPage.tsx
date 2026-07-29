import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatedButton } from '../components/ui/AnimatedButton'
import { GlassCard } from '../components/ui/GlassCard'
import { useAppContext } from '../context/AppContext'

const paymentMethods = [
  { id: 'upi', label: 'UPI', description: 'Google Pay / PhonePe / Paytm', offer: 'Instant transfer' },
  { id: 'card', label: 'Card', description: 'Visa / Mastercard / RuPay', offer: 'Secure card payment' },
  { id: 'netbanking', label: 'Net Banking', description: 'Major Indian banks supported', offer: 'Fast and trusted' },
]

export function RazorpayDemoPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { payment } = useAppContext()
  const [showThanks, setShowThanks] = useState(false)

  const params = new URLSearchParams(location.search)
  const customerName = params.get('customerName') || payment.customer.name || 'Guest'
  const customerEmail = params.get('customerEmail') || payment.customer.email || 'guest@diament.com'
  const payableAmount = Number(params.get('payableAmount') || payment.finalAmount || 0)
  const originalAmount = Number(params.get('originalAmount') || payment.originalAmount || 0)

  const handlePay = () => {
    setShowThanks(true)
  }

  const handleCloseThanks = () => {
    setShowThanks(false)
    navigate('/success')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.15),_transparent_35%),#111111] px-4 py-20 sm:px-6 lg:px-8">
      <GlassCard className="w-full max-w-4xl p-8 sm:p-10">
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Demo Razorpay</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Razorpay Payment Demo</h1>
          <p className="text-[#f8f7f4]/70">Choose a payment method and simulate checkout for your client.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_0.8fr]">
          <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <div className="space-y-3">
              <div className="text-left">
                <p className="text-sm text-[#f8f7f4]/70">Customer</p>
                <p className="text-lg font-semibold text-white">{customerName}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-[#f8f7f4]/70">Email</p>
                <p className="text-lg font-semibold text-white">{customerEmail}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-[#f8f7f4]/70">Original Amount</p>
                <p className="text-2xl font-semibold text-white">₹{originalAmount.toFixed(2)}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-[#f8f7f4]/70">Payable Amount</p>
                <p className="text-2xl font-semibold text-white">₹{payableAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                className="w-full rounded-[1.5rem] border border-white/10 bg-[#111111]/70 p-6 text-left transition hover:border-[#C9A227]/70"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{method.label}</p>
                    <p className="mt-2 text-sm text-[#f8f7f4]/70">{method.description}</p>
                  </div>
                  <span className="rounded-full bg-[#C9A227]/10 px-3 py-1 text-xs font-semibold text-[#f8f7f4]">{method.offer}</span>
                </div>
              </button>
            ))}

            <AnimatedButton onClick={handlePay} className="w-full">
              Pay Now
            </AnimatedButton>
          </div>
        </div>
      </GlassCard>

      {showThanks ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="w-full max-w-md rounded-[1.5rem] border border-white/10 bg-[#111111] p-8 shadow-2xl shadow-black/50">
            <h2 className="text-2xl font-semibold text-white">Thank you!</h2>
            <p className="mt-4 text-[#f8f7f4]/70">Your payment was successful.</p>
            <div className="mt-8 text-right">
              <AnimatedButton onClick={handleCloseThanks}>OK</AnimatedButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
