import { useMemo, useState, type ChangeEvent } from 'react'
import { GlassCard } from '../components/ui/GlassCard'
import { AnimatedButton } from '../components/ui/AnimatedButton'
import { AnimatedInput } from '../components/ui/AnimatedInput'
import { useAppContext } from '../context/AppContext'

type BillingFormValues = {
  customerName: string
  customerEmail: string
  phoneNo: string
  diamondName: string
  price: string
}

type BillingFormErrors = Partial<Record<keyof BillingFormValues, string>>

const initialFormValues: BillingFormValues = {
  customerName: '',
  customerEmail: '',
  phoneNo: '',
  diamondName: '',
  price: '',
}

export function CreatePaymentPage() {
  const { setCustomer, setPayment } = useAppContext()
  const [formValues, setFormValues] = useState<BillingFormValues>(initialFormValues)
  const [errors, setErrors] = useState<BillingFormErrors>({})
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)

  const paymentLink = useMemo(() => generatedLink || 'Generate a link to see it here.', [generatedLink])

  const handleCopyLink = async () => {
    if (!generatedLink) return

    try {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof BillingFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const nextErrors: BillingFormErrors = {}

    if (!formValues.customerName.trim()) nextErrors.customerName = 'Customer name is required'
    if (!formValues.customerEmail.trim()) nextErrors.customerEmail = 'Customer email is required'
    if (!formValues.phoneNo.trim()) nextErrors.phoneNo = 'Phone number is required'
    if (!formValues.diamondName.trim()) nextErrors.diamondName = 'Diamond name is required'

    const priceValue = Number(formValues.price)
    if (!formValues.price.trim()) {
      nextErrors.price = 'Price is required'
    } else if (!Number.isFinite(priceValue) || priceValue <= 0) {
      nextErrors.price = 'Enter a valid price'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleGenerateLink = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    const priceValue = Number(formValues.price)
    const customerData = {
      name: formValues.customerName.trim(),
      email: formValues.customerEmail.trim(),
      phone: formValues.phoneNo.trim(),
      diamondName: formValues.diamondName.trim(),
    }

    const params = new URLSearchParams({
      customerName: customerData.name,
      customerEmail: customerData.email,
      phoneNo: customerData.phone,
      diamondName: customerData.diamondName,
      price: String(priceValue),
    })

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
    const nextLink = `${baseUrl}/payment-summary?${params.toString()}`

    setCustomer(customerData)
    setPayment((prev) => ({
      ...prev,
      customer: customerData,
      originalAmount: priceValue,
      finalAmount: priceValue,
      selectedDiscount: 0,
      paymentStatus: 'idle',
    }))
    setGeneratedLink(nextLink)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.15),_transparent_35%),#111111] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        <GlassCard className="p-8 sm:p-10">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Secure Checkout</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Create Billing Link</h1>
            <p className="text-[#f8f7f4]/70">Fill in the customer and diamond details, then generate a payment link for the client.</p>
          </div>

          <div className="mt-8">
            <div className="space-y-6">
              <form onSubmit={handleGenerateLink} className="space-y-4">
                <AnimatedInput
                  label="Customer Name"
                  placeholder="Enter customer name"
                  name="customerName"
                  value={formValues.customerName}
                  onChange={handleFieldChange}
                  error={errors.customerName}
                />
                <AnimatedInput
                  label="Customer Email"
                  type="email"
                  placeholder="customer@email.com"
                  name="customerEmail"
                  value={formValues.customerEmail}
                  onChange={handleFieldChange}
                  error={errors.customerEmail}
                />
                <AnimatedInput
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                  name="phoneNo"
                  value={formValues.phoneNo}
                  onChange={handleFieldChange}
                  error={errors.phoneNo}
                />
                <AnimatedInput
                  label="Diamond Name"
                  placeholder="Enter diamond name"
                  name="diamondName"
                  value={formValues.diamondName}
                  onChange={handleFieldChange}
                  error={errors.diamondName}
                />
                <AnimatedInput
                  label="Price"
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={formValues.price}
                  onChange={handleFieldChange}
                  error={errors.price}
                />

                <AnimatedButton type="submit" className="w-full">
                  Generate Payment Link
                </AnimatedButton>
              </form>

              <div className="relative rounded-[1.5rem] border border-white/10 bg-[#111111]/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <label className="text-sm text-[#f8f7f4]/70">Generated link</label>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <input
                  readOnly
                  value={paymentLink}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
