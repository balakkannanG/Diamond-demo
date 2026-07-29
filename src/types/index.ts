export interface CustomerData {
  name: string
  email: string
  phone?: string
  diamondName?: string
}

export interface PaymentState {
  customer: CustomerData
  originalAmount: number
  selectedDiscount: number
  finalAmount: number
  paymentStatus: 'idle' | 'processing' | 'success'
  paymentId: string
}

export interface DiscountOption {
  id: string
  label: string
  value: number
  description: string
}
