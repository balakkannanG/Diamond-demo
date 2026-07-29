import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Gem } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { GlassCard } from '../components/ui/GlassCard'
import { AnimatedButton } from '../components/ui/AnimatedButton'
import { AnimatedInput } from '../components/ui/AnimatedInput'
import { useAppContext } from '../context/AppContext'

const ADMIN_CREDENTIALS = {
  loginId: 'Admin@123',
  password: 'Admin@123',
}

const schema = z.object({
  loginId: z.string().trim().min(1, 'Login ID is required'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const { setCustomer, setPayment } = useAppContext()
  const [loginError, setLoginError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (values: FormValues) => {
    if (values.loginId !== ADMIN_CREDENTIALS.loginId || values.password !== ADMIN_CREDENTIALS.password) {
      setLoginError('Invalid login ID or password. Please try again.')
      return
    }

    setLoginError('')
    setCustomer({ name: 'Admin', email: 'admin@diament.com' })
    setPayment((prev) => ({ ...prev, customer: { name: 'Admin', email: 'admin@diament.com' }, paymentStatus: 'idle' }))
    navigate('/create-payment')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(201,162,39,0.15),_transparent_35%),#111111] px-4 py-20 sm:px-6 lg:px-8">
      <GlassCard className="w-full max-w-2xl p-6 sm:p-8 lg:p-10">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10">
            <Gem className="h-7 w-7 text-[#C9A227]" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-white">Admin Login</h1>
          <p className="mt-3 text-[#f8f7f4]/70">Enter the admin credentials to continue to the secure payment experience.</p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <AnimatedInput
            label="Login ID"
            placeholder="Enter your login ID"
            error={errors.loginId?.message}
            autoComplete="username"
            {...register('loginId')}
          />
          <AnimatedInput
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            autoComplete="current-password"
            {...register('password')}
          />

          {loginError ? <p className="text-sm text-rose-300">{loginError}</p> : null}

          <AnimatedButton type="submit" className="flex w-full items-center justify-center gap-2">
            Sign In <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
        </form>
      </GlassCard>
    </div>
  )
}
