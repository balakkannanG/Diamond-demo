import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnimatedButton } from '../ui/AnimatedButton'
import { AnimatedInput } from '../ui/AnimatedInput'

const paymentSchema = z.object({
  amount: z.coerce.number().min(1000, 'Minimum amount is ₹1,000'),
})

type PaymentFormValues = {
  amount: number
}

type PaymentFormProps = {
  onSubmit: (amount: number) => void
}

export function PaymentForm({ onSubmit }: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema) as never,
    defaultValues: { amount: 25000 },
  })

  return (
    <form className="space-y-6" onSubmit={handleSubmit((values) => onSubmit(values.amount))}>
      <AnimatedInput
        label="Amount"
        type="number"
        placeholder="25000"
        error={errors.amount?.message}
        {...register('amount')}
      />
      <AnimatedButton type="submit" className="w-full">
        Continue
      </AnimatedButton>
    </form>
  )
}
