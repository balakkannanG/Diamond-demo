import { motion } from 'framer-motion'
import type { DiscountOption } from '../../types'

type DiscountSelectorProps = {
  options: DiscountOption[]
  selected: number
  onSelect: (value: number) => void
}

export function DiscountSelector({ options, selected, onSelect }: DiscountSelectorProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => {
        const active = selected === option.value
        return (
          <motion.label
            key={option.id}
            whileHover={{ x: 4 }}
            className={`flex cursor-pointer items-start justify-between rounded-2xl border px-4 py-4 transition ${
              active ? 'border-[#C9A227] bg-[#C9A227]/10' : 'border-white/10 bg-white/5'
            }`}
          >
            <div>
              <div className="font-semibold text-white">{option.label}</div>
              <div className="mt-1 text-sm text-[#f8f7f4]/70">{option.description}</div>
            </div>
            <input
              type="radio"
              name="discount"
              checked={active}
              onChange={() => onSelect(option.value)}
              className="mt-1 h-4 w-4 accent-[#C9A227]"
            />
          </motion.label>
        )
      })}
    </div>
  )
}
