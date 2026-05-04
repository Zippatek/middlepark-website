'use client'
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Plus,
  CheckCircle2,
  Calendar,
  ArrowRight,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import { getSiteVisits, bookSiteVisit } from '@/lib/api'
import type { SiteVisit } from '@/types'

const tabs = ['Upcoming', 'Past']

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
}

function dayMonth(d: string | Date) {
  const dt = new Date(d)
  return {
    day: dt.getDate(),
    month: dt.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
  }
}

export default function SiteVisitsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('Upcoming')
  const [showBooking, setShowBooking] = useState(false)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [bookingLoading, setBookingLoading] = useState(false)

  const [upcoming, setUpcoming] = useState<SiteVisit[]>([])
  const [past, setPast] = useState<SiteVisit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = (session as any)?.accessToken
    if (!token) return
    getSiteVisits(token)
      .then((res) => {
        if (res.success && res.data) {
          setUpcoming(res.data.upcoming)
          setPast(res.data.past)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [session])

  const handleBookVisit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = (session as any)?.accessToken
    if (!token) return
    setBookingError('')
    setBookingLoading(true)
    try {
      const res = await bookSiteVisit(token, { date: bookingDate, time: bookingTime })
      if (res.success) {
        setBookingSubmitted(true)
        // Add the new visit to the upcoming list
        if (res.data) setUpcoming((prev) => [res.data!, ...prev])
        setTimeout(() => {
          setShowBooking(false)
          setBookingSubmitted(false)
          setBookingDate('')
          setBookingTime('')
        }, 3000)
      }
    } catch (err: any) {
      setBookingError(err.message || 'Could not book visit. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-portal mx-auto space-y-6 animate-pulse">
        <div className="h-14 bg-cream rounded-card" />
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-cream rounded-sm" />
          <div className="h-9 w-16 bg-cream rounded-sm" />
        </div>
        {[...Array(2)].map((_, i) => <div key={i} className="h-32 bg-cream rounded-card" />)}
      </div>
    )
  }

  return (
    <div className="max-w-portal mx-auto space-y-6">
      {/* ═══ HEADER ═══ */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="font-cormorant text-charcoal text-xl font-bold">Site Visits</h2>
          <p className="text-charcoal-light text-sm">Schedule and manage your construction site visits.</p>
        </div>
        <Button variant="primary" onClick={() => setShowBooking(true)}>
          <Plus size={16} /> BOOK A VISIT
        </Button>
      </motion.div>

      {/* ═══ TABS ═══ */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wide transition-all duration-200',
              activeTab === tab
                ? 'bg-green text-white'
                : 'bg-green-tint text-charcoal hover:bg-green-muted'
            )}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* ═══ UPCOMING VISITS ═══ */}
      {activeTab === 'Upcoming' && (
        <div className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map((visit) => {
              const { day, month } = dayMonth(visit.date)
              return (
                <motion.div
                  key={visit.id}
                  className="bg-white rounded-card p-6 border border-cream-divider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-badge bg-green-tint text-green text-[10px] font-semibold uppercase tracking-wider">
                          <CheckCircle2 size={10} /> CONFIRMED
                        </span>
                        {visit.confirmationNumber && (
                          <span className="text-charcoal-light text-[10px]">{visit.confirmationNumber}</span>
                        )}
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2.5 text-charcoal text-sm">
                          <CalendarDays size={14} className="text-green shrink-0" strokeWidth={1.5} />
                          {formatDate(visit.date)}
                        </div>
                        <div className="flex items-center gap-2.5 text-charcoal text-sm">
                          <Clock size={14} className="text-green shrink-0" strokeWidth={1.5} />
                          {visit.time}
                        </div>
                        <div className="flex items-center gap-2.5 text-charcoal text-sm">
                          <MapPin size={14} className="text-green shrink-0" strokeWidth={1.5} />
                          {visit.location}
                        </div>
                        {visit.guide && (
                          <div className="flex items-center gap-2.5 text-charcoal text-sm">
                            <User size={14} className="text-green shrink-0" strokeWidth={1.5} />
                            Guide: {visit.guide}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-container bg-green-tint flex flex-col items-center justify-center shrink-0">
                      <span className="text-green text-xl font-bold leading-none">{day}</span>
                      <span className="text-green text-[10px] font-medium">{month}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <div className="bg-white rounded-card p-12 border border-cream-divider text-center">
              <CalendarDays size={40} className="text-green-muted mx-auto mb-3" />
              <p className="text-charcoal text-sm font-medium">No upcoming visits</p>
              <p className="text-charcoal-light text-xs mt-1 mb-6">Book a site visit to see your construction progress.</p>
              <Button variant="primary" onClick={() => setShowBooking(true)}>
                <Plus size={16} /> BOOK A VISIT
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ═══ PAST VISITS ═══ */}
      {activeTab === 'Past' && (
        <div className="space-y-4">
          {past.length > 0 ? (
            past.map((visit, i) => (
              <motion.div
                key={visit.id}
                className="bg-white rounded-card p-6 border border-cream-divider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-badge bg-charcoal/5 text-charcoal-light text-[10px] font-semibold uppercase tracking-wider">
                        COMPLETED
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 text-charcoal text-sm">
                        <CalendarDays size={14} className="text-charcoal-light shrink-0" strokeWidth={1.5} />
                        {formatDate(visit.date)} · {visit.time}
                      </div>
                      <div className="flex items-center gap-2.5 text-charcoal-light text-sm">
                        <MapPin size={14} className="shrink-0" strokeWidth={1.5} />
                        {visit.location}
                      </div>
                    </div>
                    {visit.notes && (
                      <div className="mt-3 p-3 rounded-container bg-cream">
                        <p className="text-charcoal-light text-xs leading-relaxed">
                          <strong className="text-charcoal">Notes:</strong> {visit.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-card p-12 border border-cream-divider text-center">
              <Calendar size={40} className="text-green-muted mx-auto mb-3" />
              <p className="text-charcoal text-sm font-medium">No past visits</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ BOOKING MODAL ═══ */}
      {showBooking && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-charcoal-dark/50"
            onClick={() => !bookingLoading && setShowBooking(false)}
          />
          <motion.div
            className="relative bg-white rounded-card p-6 lg:p-8 w-full max-w-[440px]"
            style={{ boxShadow: '0 20px 60px rgba(0, 149, 61, 0.15)' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {bookingSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 size={48} className="text-green mx-auto mb-4" />
                <h3 className="font-cormorant text-charcoal text-2xl font-bold mb-2">Visit Requested</h3>
                <p className="text-charcoal-light text-sm">
                  Our team will confirm your visit within 24 hours. You&apos;ll receive an SMS and email confirmation.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-cormorant text-charcoal text-xl font-bold">Book a Site Visit</h3>
                  <button
                    onClick={() => setShowBooking(false)}
                    className="p-1.5 text-charcoal-light hover:text-charcoal transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {bookingError && (
                  <motion.p
                    className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-sm p-3 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {bookingError}
                  </motion.p>
                )}

                <form onSubmit={handleBookVisit} className="space-y-5">
                  <div>
                    <label htmlFor="visit-date" className="mp-label">Preferred Date</label>
                    <input
                      type="date"
                      id="visit-date"
                      value={bookingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                      className="mp-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="visit-time" className="mp-label">Preferred Time</label>
                    <select
                      id="visit-time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                      className="mp-input cursor-pointer"
                    >
                      <option value="">Select a time slot</option>
                      <option value="9:00 AM — 10:30 AM">9:00 AM — 10:30 AM</option>
                      <option value="11:00 AM — 12:30 PM">11:00 AM — 12:30 PM</option>
                      <option value="2:00 PM — 3:30 PM">2:00 PM — 3:30 PM</option>
                      <option value="4:00 PM — 5:30 PM">4:00 PM — 5:30 PM</option>
                    </select>
                  </div>
                  <p className="text-charcoal-light text-xs">
                    Site visits are subject to availability. Our team will confirm via SMS.
                  </p>
                  <Button variant="primary" size="lg" type="submit" fullWidth disabled={bookingLoading}>
                    {bookingLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>REQUEST VISIT <ArrowRight size={14} /></>
                    )}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
