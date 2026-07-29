type SectionTitleProps = {
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="max-w-2xl text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-[#f8f7f4]/70">{subtitle}</p> : null}
    </div>
  )
}
