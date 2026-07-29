import { motion } from 'framer-motion'
import { Diamond, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#111111]/95 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 p-2">
            <Diamond className="h-5 w-5 text-[#C9A227]" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#C9A227]">Diament</p>
            <p className="text-xs text-[#f8f7f4]/80">Fine Jewelry</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm tracking-[0.3em] text-[#f8f7f4]/80 transition hover:text-[#C9A227] ${
                  isActive ? 'text-[#C9A227]' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/login"
          className="rounded-full border border-[#C9A227]/50 bg-gradient-to-r from-[#C9A227] to-[#f3d57a] px-4 py-2 text-sm font-semibold text-[#111111] shadow-[0_8px_24px_rgba(201,162,39,0.25)] transition hover:scale-[1.02]"
        >
          Admin Login
        </Link>

        <button className="rounded-full border border-white/20 p-2 text-white md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </motion.header>
  )
}
