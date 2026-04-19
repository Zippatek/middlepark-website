import React from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  developments: [
    { label: 'Dakibiyu Estate Phase 2', href: '/developments/dakibiyu-estate-phase-2' },
    { label: 'Katampe Heights', href: '/developments/katampe-heights' },
    { label: 'Apo Residences', href: '/developments/apo-residences' },
    { label: 'Maitama Gardens', href: '/developments/maitama-gardens' },
    { label: 'Gwarinpa Terraces', href: '/developments/gwarinpa-terraces' },
  ],
  company: [
    { label: 'About MiddlePark', href: '/about' },
    { label: 'Our Developments', href: '/developments' },
    { label: 'Client Portal', href: '/login' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/middleparkng' },
  { label: 'Twitter', href: 'https://twitter.com/middleparkng' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/middlepark' },
  { label: 'Facebook', href: 'https://facebook.com/middleparkng' },
]

export function PublicFooter() {
  return (
    <footer className="bg-charcoal-dark text-white">
      {/* Main Footer */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="mb-5 inline-block">
              <img src="/logos/Full Color.svg" alt="MiddlePark Properties" className="h-8 lg:h-9 w-auto brightness-0 invert" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-[280px]">
              Built with intention. Priced with purpose. Abuja&apos;s defining property developer.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+2349012345678"
                className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors duration-200"
              >
                <Phone size={14} strokeWidth={1.5} />
                +234 901 234 5678
              </a>
              <a
                href="mailto:hello@middleparkproperties.com"
                className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors duration-200"
              >
                <Mail size={14} strokeWidth={1.5} />
                hello@middleparkproperties.com
              </a>
              <div className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin size={14} strokeWidth={1.5} className="shrink-0 mt-0.5" />
                <span>Plot 1234, Wuse II, Abuja, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Developments */}
          <div>
            <h4 className="font-cormorant text-white text-lg font-bold mb-5">Developments</h4>
            <ul className="space-y-3">
              {footerLinks.developments.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="font-cormorant text-white text-lg font-bold mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="font-cormorant text-white text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4 — Social & Certifications */}
          <div>
            <h4 className="font-cormorant text-white text-lg font-bold mb-5">Follow Us</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/60 text-sm hover:text-white transition-colors duration-200 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </a>
                </li>
              ))}
            </ul>


          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} MiddlePark Properties Limited. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Built by{' '}
            <a
              href="https://zippatek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors duration-200"
            >
              Zippatek Digital Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
