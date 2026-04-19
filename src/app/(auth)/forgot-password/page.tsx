'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card */}
        <div
          className="bg-white rounded-card p-8 lg:p-10"
          style={{ boxShadow: '0 4px 24px rgba(237, 27, 36, 0.06)' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-0.5 mb-8">
            <span className="font-bold font-cormorant text-charcoal text-2xl">MIDDLE</span>
            <span className="font-bold font-cormorant text-red text-2xl">PARK</span>
          </div>

          {sent ? (
            /* ═══ SUCCESS STATE ═══ */
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-14 h-14 rounded-full bg-green-tint flex items-center justify-center mx-auto mb-5">
                <Mail size={24} className="text-green" />
              </div>
              <h1 className="font-cormorant text-charcoal text-2xl font-bold mb-2">
                Check Your Email
              </h1>
              <p className="text-charcoal-light text-sm leading-relaxed mb-2">
                We&apos;ve sent a password reset link to:
              </p>
              <p className="text-charcoal text-sm font-semibold mb-6">
                {email}
              </p>
              <p className="text-charcoal-light text-xs leading-relaxed mb-8">
                If you don&apos;t see the email, check your spam folder. The link expires
                in 30 minutes.
              </p>
              <div className="space-y-3">
                <Button variant="primary" fullWidth href="/login">
                  BACK TO SIGN IN
                </Button>
                <button
                  onClick={() => {
                    setSent(false)
                    setEmail('')
                  }}
                  className="text-red text-sm font-medium w-full text-center hover:underline"
                >
                  Try a different email
                </button>
              </div>
            </motion.div>
          ) : (
            /* ═══ FORM STATE ═══ */
            <>
              {/* Back Link */}
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-charcoal-light text-sm mb-6 hover:text-charcoal transition-colors duration-200"
              >
                <ArrowLeft size={14} />
                Back to sign in
              </Link>

              <h1 className="font-cormorant text-charcoal text-2xl font-bold mb-2">
                Forgot Password?
              </h1>
              <p className="text-charcoal-light text-sm mb-8 leading-relaxed">
                Enter the email address associated with your account and we&apos;ll send you a
                link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="forgot-email" className="mp-label">Email Address</label>
                  <input
                    type="email"
                    id="forgot-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="mp-input"
                    autoComplete="email"
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  SEND RESET LINK <ChevronRight size={14} />
                </Button>
              </form>

              <p className="text-center text-charcoal-light text-sm mt-8">
                Remember your password?{' '}
                <Link href="/login" className="text-red font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-charcoal-light text-xs mt-6">
          © {new Date().getFullYear()} MiddlePark Properties Limited
        </p>
      </motion.div>
    </div>
  )
}
