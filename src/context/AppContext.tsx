import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CustomerData, PaymentState } from '../types'

type AppContextType = {
  customer: CustomerData
  setCustomer: (customer: CustomerData) => void
  payment: PaymentState
  setPayment: (payment: PaymentState | ((prev: PaymentState) => PaymentState)) => void
}

const defaultPayment: PaymentState = {
  customer: { name: '', email: '', phone: '', diamondName: '' },
  originalAmount: 25000,
  selectedDiscount: 0,
  finalAmount: 25000,
  paymentStatus: 'idle',
  paymentId: '',
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerData>({ name: '', email: '', phone: '', diamondName: '' })
  const [payment, setPayment] = useState<PaymentState>(defaultPayment)

  const value = useMemo(
    () => ({
      customer,
      setCustomer,
      payment,
      setPayment,
    }),
    [customer, payment],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
