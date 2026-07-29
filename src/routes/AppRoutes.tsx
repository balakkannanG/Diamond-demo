import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Loader } from '../components/ui/Loader'
import { PageTransition } from '../components/ui/PageTransition'

const LandingPage = lazy(() => import('../pages/LandingPage').then((module) => ({ default: module.LandingPage })))
const LoginPage = lazy(() => import('../pages/LoginPage').then((module) => ({ default: module.LoginPage })))
const CreatePaymentPage = lazy(() => import('../pages/CreatePaymentPage').then((module) => ({ default: module.CreatePaymentPage })))
const PaymentSummaryPage = lazy(() => import('../pages/PaymentSummaryPage').then((module) => ({ default: module.PaymentSummaryPage })))
const SuccessPage = lazy(() => import('../pages/SuccessPage').then((module) => ({ default: module.SuccessPage })))
const ThankYouPage = lazy(() => import('../pages/ThankYouPage').then((module) => ({ default: module.ThankYouPage })))
const RazorpayDemoPage = lazy(() => import('../pages/RazorpayDemoPage').then((module) => ({ default: module.RazorpayDemoPage })))

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <PageTransition>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-payment" element={<CreatePaymentPage />} />
          <Route path="/payment-summary" element={<PaymentSummaryPage />} />
          <Route path="/razorpay-demo" element={<RazorpayDemoPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/collections" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
    </Suspense>
  )
}
