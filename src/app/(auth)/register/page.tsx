'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ChevronRight, ArrowLeft, Shield, CheckCircle2, Check } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui'
import { registerUser } from '@/lib/api'

const developments = [
  'Dakibiyu Estate Phase 2',
  'Katampe Heights',
  'Apo Residences',
  'Maitama Gardens',
  'Gwarinpa Terraces',
  'Dakibiyu Estate Phase 3',
  'Not sure yet',
]

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    developmentInterest: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const passwordChecks = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'One number', met: /[0-9]/.test(formData.password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const res = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
        developmentInterest: formData.developmentInterest || undefined,
        terms: true,
      })
      if (!res.success) throw new Error(res.error || 'Registration failed')
      // Auto sign in after registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })
      if (result?.ok) {
        router.push('/portal')
      } else {
        // Registration succeeded but auto-login failed — show success anyway
        setSuccess(true)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="max-w-[420px] w-full text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-green-tint flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-green" />
          </div>
          <h1 className="font-cormorant text-charcoal text-3xl font-bold mb-3">
            Account Created
          </h1>
          <p className="text-charcoal-light text-sm leading-relaxed mb-8">
            Welcome to MiddlePark. Your account has been created successfully.
            Our sales team will review your registration and activate your portal
            access within 24 hours.
          </p>
          <div className="space-y-3">
            <Button variant="primary" size="lg" fullWidth href="/login">
              SIGN IN NOW <ChevronRight size={14} />
            </Button>
            <Button variant="secondary" size="lg" fullWidth href="/">
              BACK TO WEBSITE
            </Button>
          </div>
        </motion.div>
      </div>
    )
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
            Join the MiddlePark<br />Community
          </h2>
          <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-[340px]">
            Create your client account to access the portal, track your property
            purchase, and stay connected with our sales team.
          </p>

          {/* Trust badges */}
          <div className="space-y-3">
            {[
              'Transparent pricing',
              'Dedicated client relationship manager',
              'Portal access from day one',
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
      <div className="flex-1 flex items-start justify-center px-6 py-10 lg:py-12 lg:px-16 overflow-y-auto">
        <motion.div
          className="w-full max-w-[480px]"
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
            className="inline-flex items-center gap-1.5 text-charcoal-light text-sm mb-6 hover:text-charcoal transition-colors duration-200"
          >
            <ArrowLeft size={14} />
            Back to website
          </Link>

          {/* Heading */}
          <h1 className="font-cormorant text-charcoal text-3xl font-bold mb-2">
            Create Your Account
          </h1>
          <p className="text-charcoal-light text-sm mb-8">
            Register to access the MiddlePark client portal.
          </p>

          {/* Error */}
          {error && (
            <motion.div
              className="mb-4 p-3 rounded-sm bg-red-50 border border-red-200 text-red-700 text-xs"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg-first-name" className="mp-label">First Name</label>
                <input
                  type="text"
                  id="reg-first-name"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="First name"
                  required
                  className="mp-input"
                />
              </div>
              <div>
                <label htmlFor="reg-last-name" className="mp-label">Last Name</label>
                <input
                  type="text"
                  id="reg-last-name"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Last name"
                  required
                  className="mp-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="mp-label">Email Address</label>
              <input
                type="email"
                id="reg-email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
                required
                className="mp-input"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="reg-phone" className="mp-label">Phone Number</label>
              <input
                type="tel"
                id="reg-phone"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+234 ..."
                required
                className="mp-input"
              />
            </div>

            <div>
              <label htmlFor="reg-development" className="mp-label">Development of Interest</label>
              <select
                id="reg-development"
                value={formData.developmentInterest}
                onChange={(e) => updateField('developmentInterest', e.target.value)}
                className="mp-input cursor-pointer"
              >
                <option value="">Select a development (optional)</option>
                {developments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="reg-password" className="mp-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="reg-password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Create a password"
                  required
                  className="mp-input pr-11"
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
              {/* Password Strength */}
              {formData.password.length > 0 && (
                <div className="mt-2 space-y-1">
                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className="flex items-center gap-1.5"
                    >
                      <Check
                        size={12}
                        className={check.met ? 'text-green' : 'text-charcoal-light'}
                        strokeWidth={2.5}
                      />
                      <span
                        className={`text-[11px] ${check.met ? 'text-green' : 'text-charcoal-light'
                          }`}
                      >
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="reg-confirm" className="mp-label">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="reg-confirm"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="mp-input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-green text-xs mt-1.5">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="reg-terms"
                checked={formData.terms}
                onChange={(e) => updateField('terms', e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded-sm border-cream-border text-green focus:ring-green accent-green"
              />
              <label htmlFor="reg-terms" className="text-charcoal-light text-xs leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-green font-medium hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-green font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              CREATE ACCOUNT <ChevronRight size={14} />
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-charcoal-light text-sm mt-8 pb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-green font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
