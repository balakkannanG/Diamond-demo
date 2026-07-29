import { motion } from 'framer-motion'
import { ArrowRight, Gem, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { GlassCard } from '../components/ui/GlassCard'
import { SectionTitle } from '../components/ui/SectionTitle'

const particles = Array.from({ length: 20 }, (_, index) => ({ id: index, left: `${(index * 7) % 100}%`, top: `${(index * 13) % 100}%` }))

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      <main className="overflow-hidden">
        <section className="relative flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(201,162,39,0.2),_transparent_40%),linear-gradient(135deg,_rgba(17,17,17,1),_rgba(31,31,31,0.95))]" />
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute h-2.5 w-2.5 rounded-full bg-[#C9A227]/70"
              style={{ left: particle.left, top: particle.top }}
              animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
              transition={{ duration: 4 + (particle.id % 5), repeat: Infinity, delay: particle.id * 0.1 }}
            />
          ))}

          <div className="relative z-10 grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-2 text-sm text-[#f3d57a]">
                <Sparkles className="h-4 w-4" />
                Luxury payment experience
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Timeless Diamond Elegance
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f8f7f4]/70">
                A refined private experience for exquisite diamond acquisitions, premium payments, and lasting memories.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/login">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="rounded-full bg-gradient-to-r from-[#C9A227] via-[#f1c74a] to-[#b97f00] px-6 py-3 font-semibold text-[#111111] shadow-[0_12px_36px_rgba(201,162,39,0.25)]">
                    Admin Login <ArrowRight className="ml-2 inline h-4 w-4" />
                  </motion.button>
                </Link>
                {/* <Link to="/create-payment" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white">
                  Create Payment
                </Link> */}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <GlassCard className="p-6 sm:p-8">
                <div className="rounded-[2rem] border border-white/10 bg-[#111111]/70 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Signature Set</p>
                      <h2 className="mt-2 text-3xl font-semibold text-white">Solstice Ring</h2>
                    </div>
                    <div className="rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 p-3">
                      <Gem className="h-6 w-6 text-[#C9A227]" />
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-[#f8f7f4]/70">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[#C9A227]">Crafted</p>
                      <p className="mt-2 font-semibold text-white">18K White Gold</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[#C9A227]">Center Stone</p>
                      <p className="mt-2 font-semibold text-white">4.2 CT Diamond</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Our Promise" title="A world of craftsmanship, comfort, and confidence." subtitle="Every detail is designed to feel personal, exquisite, and effortless." />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                ['Private Consultations', 'Bespoke guidance from our diamond specialists.'],
                ['Certified Diamonds', 'Ethically sourced stones with exceptional brilliance.'],
                ['Secure Checkout', 'Luxury-level payment protection and instant confirmation.'],
              ].map(([title, text]) => (
                <GlassCard key={title} className="p-6">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-[#f8f7f4]/70">{text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
