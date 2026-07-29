import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatedButton } from '../components/ui/AnimatedButton'
import { GlassCard } from '../components/ui/GlassCard'
import { DiscountSelector } from '../components/payment/DiscountSelector'
import { AmountCard } from '../components/payment/AmountCard'
import { useAppContext } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

type DiscountOption = {
  id: string
  label: string
  value: number
  description: string
}

const discounts: DiscountOption[] = [
  { id: 'none', label: 'Full Price', value: 100, description: 'Full price remains unchanged.' },
  { id: 'threequarter', label: '75% Payable', value: 75, description: 'Premium celebration pricing.' },
  { id: 'half', label: '50% Payable', value: 50, description: 'A generous seasonal offer.' },
]

export function PaymentSummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { customer, setCustomer, payment, setPayment } = useAppContext()
  const [selectedDiscount, setSelectedDiscount] = useState(payment.selectedDiscount)

  const searchParams = new URLSearchParams(location.search)
  const queryPrice = Number(searchParams.get('price') || payment.originalAmount || 0)
  const queryCustomerName = searchParams.get('customerName') || customer.name || 'Guest Customer'
  const queryCustomerEmail = searchParams.get('customerEmail') || customer.email || 'guest@diament.com'
  const queryPhone = searchParams.get('phoneNo') || customer.phone || 'Not provided'
  const queryDiamondName = searchParams.get('diamondName') || customer.diamondName || 'Diamond'

  const originalAmount = Number.isFinite(queryPrice) && queryPrice > 0 ? queryPrice : payment.originalAmount
  const finalAmount = useMemo(() => (originalAmount * selectedDiscount) / 100, [originalAmount, selectedDiscount])
  const discountAmount = useMemo(() => originalAmount - finalAmount, [originalAmount, finalAmount])

  useEffect(() => {
    // If page loaded via shared link, initialize context with those values
    if (searchParams.has('customerName') || searchParams.has('price')) {
      const linkDiscount = Number(searchParams.get('discount') || '100')
      const linkOriginal = Number(searchParams.get('price') || payment.originalAmount || 0)
      const linkFinal = (linkOriginal * linkDiscount) / 100

      setSelectedDiscount(linkDiscount)
      setCustomer({ name: queryCustomerName, email: queryCustomerEmail, phone: queryPhone, diamondName: queryDiamondName })
      setPayment((prev) => ({
        ...prev,
        customer: { name: queryCustomerName, email: queryCustomerEmail, phone: queryPhone, diamondName: queryDiamondName },
        originalAmount: linkOriginal,
        finalAmount: linkFinal,
        selectedDiscount: linkDiscount,
        paymentStatus: prev.paymentStatus,
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = (value: number) => {
    setSelectedDiscount(value)
    setPayment((prev) => ({ ...prev, selectedDiscount: value, finalAmount: (originalAmount * value) / 100 }))
  }

  const handleRazorpay = () => {
    setPayment((prev) => ({ ...prev, paymentStatus: 'processing', finalAmount }))

    const params = new URLSearchParams({
      customerName: queryCustomerName,
      customerEmail: queryCustomerEmail,
      phoneNo: queryPhone,
      diamondName: queryDiamondName,
      originalAmount: String(originalAmount),
      payableAmount: String(finalAmount),
      discount: String(selectedDiscount),
    })

    navigate(`/razorpay-demo?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.15),_transparent_35%),#111111] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <GlassCard className="p-8 sm:p-10">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Luxury Summary</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Payment Summary</h1>
            <p className="text-[#f8f7f4]/70">Review your personalised offer and proceed to a secure checkout.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
              <div className="space-y-2">
                <p className="text-sm text-[#f8f7f4]/70">Customer Name</p>
                <p className="text-xl font-semibold text-white">{queryCustomerName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#f8f7f4]/70">Customer Email</p>
                <p className="text-xl font-semibold text-white">{queryCustomerEmail}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#f8f7f4]/70">Phone Number</p>
                <p className="text-xl font-semibold text-white">{queryPhone}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-[#f8f7f4]/70">Diamond Name</p>
                <p className="text-xl font-semibold text-white">{queryDiamondName}</p>
              </div>
              <div className="space-y-2 rounded-[1rem] border border-white/10 bg-[#111111]/40 p-4">
                <p className="text-sm text-[#f8f7f4]/70">Price</p>
                <p className="text-xl font-semibold text-white">{formatCurrency(originalAmount)}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <AmountCard title="Original Amount" amount={originalAmount} />
                <AmountCard title="Final Amount" amount={finalAmount} accent />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Choose Payment</h2>
                <p className="mt-2 text-[#f8f7f4]/70">Select the offer that best suits your purchase.</p>
              </div>
              <DiscountSelector options={discounts} selected={selectedDiscount} onSelect={handleSelect} />

              <motion.div layout className="rounded-[1.5rem] border border-white/10 bg-[#111111]/70 p-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <AmountCard title="Original" amount={originalAmount} />
                  <AmountCard title="Balance Payable" amount={discountAmount} />
                  <AmountCard title="Final Payable" amount={finalAmount} accent />
                </div>
              </motion.div>

              <AnimatedButton onClick={handleRazorpay} className="w-full">
                Proceed to Razorpay Payment
              </AnimatedButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
