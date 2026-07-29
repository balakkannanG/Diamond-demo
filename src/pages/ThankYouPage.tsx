import { GlassCard } from '../components/ui/GlassCard'

export function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.15),_transparent_35%),#111111] px-4 py-24 sm:px-6 lg:px-8">
      <GlassCard className="w-full max-w-3xl p-8 sm:p-10 text-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Thank You</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Your payment journey is complete</h1>
          <p className="text-[#f8f7f4]/70">The transaction was successfully processed. We appreciate your trust and look forward to serving you again.</p>
        </div>

        <div className="mt-8 flex justify-center">
          {/* <Link to="#">
            <AnimatedButton>Back to Home</AnimatedButton>
          </Link> */}
        </div>
      </GlassCard>
    </div>
  )
}
