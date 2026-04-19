'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'DEVELOPMENTS', href: '/developments' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

export function PublicNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          'fixed z-[100] transition-all duration-300 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-2rem)] max-w-[1200px]',
          scrolled
            ? 'top-4 bg-white/95 backdrop-blur-md shadow-md rounded-[2rem]'
            : 'top-6 bg-white border border-transparent rounded-[2rem] shadow-sm'
        )}
      >
        <nav className="max-w-[1200px] mx-auto h-navbar flex items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" id="navbar-logo">
            <img src="/logos/Full Color.svg" alt="MiddlePark Properties" className="h-7 lg:h-8 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={cn(
                  'text-nav font-medium uppercase tracking-nav transition-colors duration-200',
                  pathname === link.href
                    ? 'text-green'
                    : 'text-charcoal hover:text-green'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              id="navbar-client-portal"
              className="border border-charcoal text-charcoal px-5 py-2.5 rounded-full text-nav font-medium transition-colors duration-200 hover:bg-cream-dark"
            >
              CLIENT PORTAL
            </Link>
            <Link
              href="/contact"
              id="navbar-enquire"
              className="bg-green text-white px-5 py-2.5 rounded-full text-nav font-medium flex items-center gap-2 transition-all duration-200 hover:bg-green-dark"
            >
              ENQUIRE NOW <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-charcoal hover:text-green transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            id="navbar-mobile-toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          'fixed inset-0 z-[60] lg:hidden transition-all duration-300',
          mobileOpen ? 'visible' : 'invisible'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-charcoal-dark/50 transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={cn(
            'absolute top-0 right-0 w-[320px] max-w-[85vw] h-full bg-white shadow-modal',
            'flex flex-col transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-cream-divider">
            <div className="flex items-center">
              <img src="/logos/Full Color.svg" alt="MiddlePark Properties" className="h-6 w-auto" />
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 text-charcoal-light hover:text-charcoal transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <div className="flex-1 overflow-y-auto py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-6 py-4 text-nav font-medium uppercase tracking-nav transition-all duration-200',
                  pathname === link.href
                    ? 'text-green bg-green-tint border-l-[3px] border-green'
                    : 'text-charcoal hover:text-green hover:bg-cream-dark'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Drawer Footer CTAs */}
          <div className="p-6 border-t border-cream-divider space-y-3">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-green text-white px-5 py-3 rounded-full text-nav font-medium w-full transition-all duration-200 hover:bg-green-dark"
            >
              ENQUIRE NOW <ChevronRight size={14} />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center border border-charcoal text-charcoal px-5 py-3 rounded-full text-nav font-medium w-full transition-colors duration-200 hover:bg-cream-dark"
            >
              CLIENT PORTAL
            </Link>
            <a
              href="tel:08055269579"
              className="flex items-center justify-center gap-2 text-charcoal-light text-sm mt-2"
            >
              <Phone size={14} />
              0805 526 9579
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
