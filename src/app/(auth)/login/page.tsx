'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ChevronRight, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate auth — replace with actual NextAuth signIn
    await new Promise((r) => setTimeout(r, 1500))

    if (email === 'demo@middleparkng.com' && password === 'Demo1234') {
      // Success — redirect to portal
      window.location.href = '/portal'
    } else {
      setError('Invalid email or password. Try demo@middleparkng.com / Demo1234')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ═══ LEFT PANEL — Brand ═══ */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] bg-charcoal-dark relative flex-col justify-between p-10 xl:p-14">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/auth-panel-estate.jpg"
            alt="MiddlePark Estate"
            fill
            className="object-cover opacity-20"
            sizes="540px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/80 via-charcoal-dark/90 to-charcoal-dark" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-0.5">
            <span className="font-bold font-cormorant text-white text-2xl">MIDDLE</span>
            <span className="font-bold font-cormorant text-green text-2xl">PARK</span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="font-cormorant text-white text-3xl xl:text-4xl font-bold leading-tight mb-4">
            Your Home,<br />Your Dashboard
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-[340px]">
            Track your property, monitor construction progress, manage payments, and access
            your documents — all from one place.
          </p>

          {/* Features */}
          <div className="space-y-3">
            {[
              'Real-time construction updates',
              'Payment schedule tracking',
              'Document downloads',
              'Site visit booking',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 size={14} className="text-green shrink-0" strokeWidth={2} />
                <span className="text-white/75 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <Shield size={12} />
            <span>Secured by MiddlePark · Zippatek Digital</span>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Form ═══ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16">
        <motion.div
          className="w-full max-w-[420px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-0.5 mb-8">
            <span className="font-bold font-cormorant text-charcoal text-2xl">MIDDLE</span>
            <span className="font-bold font-cormorant text-green text-2xl">PARK</span>
          </div>

          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-charcoal-light text-sm mb-8 hover:text-charcoal transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Back to website
          </Link>

          {/* Heading */}
          <h1 className="font-cormorant text-charcoal text-3xl font-bold mb-2">
            Welcome Back
          </h1>
          <p className="text-charcoal-light text-sm mb-8">
            Sign in to access your client portal and manage your property.
          </p>

          {/* Error */}
          {error && (
            <motion.div
              className="mb-6 p-3 rounded-sm bg-green-tint border border-green-muted text-green text-xs"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="mp-label">Email Address</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mp-input"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="mp-label mb-0">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-green text-xs font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mp-input pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              SIGN IN <ChevronRight size={14} />
            </Button>
          </form>

          {/* Demo credentials notice */}
          <div className="mt-6 p-3 rounded-sm bg-green-tint border border-green-muted">
            <p className="text-charcoal text-xs font-medium mb-1">Demo Credentials</p>
            <p className="text-charcoal-light text-xs">
              Email: <code className="text-green font-medium">demo@middleparkng.com</code>
            </p>
            <p className="text-charcoal-light text-xs">
              Password: <code className="text-green font-medium">Demo1234</code>
            </p>
          </div>

          {/* Register Link */}
          <p className="text-center text-charcoal-light text-sm mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-green font-medium hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
