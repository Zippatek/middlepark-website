'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft, MapPin, BedDouble, Bath, Maximize2, ChevronRight, Phone,
  Mail, MessageCircle, Shield, Building2, CalendarDays,
  Layers, Car, Hash, CheckCircle, AlertCircle, Loader2,
} from 'lucide-react'
import { getDevelopmentBySlug, submitDevelopmentEnquiry } from '@/lib/api'
import type { Development } from '@/types'
import { formatNaira } from '@/lib/utils'

// ─── STATUS LABEL MAP ────────────────────────────────────────────────────────
const statusLabel: Record<string, string> = {
  FOR_SALE: 'For Sale',
  OFF_PLAN: 'Off-Plan',
  COMPLETED: 'Completed',
  SOLD_OUT: 'Sold Out',
  'for-sale': 'For Sale',
  'off-plan': 'Off-Plan',
}

export default function DevelopmentDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const slug = params?.slug as string

  const [dev, setDev] = useState<Development | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)

  // ─── Enquiry form state ────────────────────────────────────────────────────
  const [enquiry, setEnquiry] = useState({ fullName: '', email: '', phone: '', message: '' })
  const [enquiryLoading, setEnquiryLoading] = useState(false)
  const [enquirySuccess, setEnquirySuccess] = useState(false)
  const [enquiryError, setEnquiryError] = useState('')

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getDevelopmentBySlug(slug)
      .then((res) => {
        if (res.success && res.data) {
          setDev(res.data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const handleCopyId = () => {
    if (!dev) return
    navigator.clipboard.writeText(dev.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dev) return
    setEnquiryError('')
    setEnquiryLoading(true)
    try {
      const res = await submitDevelopmentEnquiry(dev.id, {
        fullName: enquiry.fullName,
        email: enquiry.email,
        phone: enquiry.phone,
        message: enquiry.message,
      })
      if (res.success) {
        setEnquirySuccess(true)
        setEnquiry({ fullName: '', email: '', phone: '', message: '' })
      }
    } catch (err: any) {
      setEnquiryError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setEnquiryLoading(false)
    }
  }

  // ─── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full bg-[#f4f3ea] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={36} className="text-green animate-spin mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-charcoal-light text-sm">Loading development...</p>
        </div>
      </div>
    )
  }

  // ─── Not found ───────────────────────────────────────────────────────────
  if (notFound || !dev) {
    return (
      <div className="w-full bg-[#f4f3ea] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 size={48} className="text-green-muted mx-auto mb-4" strokeWidth={1} />
          <h2 className="font-cormorant text-charcoal text-3xl font-bold mb-2">Development Not Found</h2>
          <p className="text-charcoal-light text-sm mb-6">We couldn't find this development.</p>
          <Link
            href="/developments"
            className="inline-flex items-center gap-2 bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-green-dark transition-colors"
          >
            <ArrowLeft size={14} /> Back to Developments
          </Link>
        </div>
      </div>
    )
  }

  const gallery = dev.images || []
  const developer = (dev as any).developer || {
    name: 'MiddlePark Sales Team',
    email: 'sales@middleparkproperties.com',
    phone: '+2349012345678',
    whatsapp: '+2349012345678',
  }

  return (
    <div className="w-full bg-[#f4f3ea] min-h-screen pb-20">

      {/* ─── Back Nav ─────────────────────────────────────────────────── */}
      <div className="absolute top-navbar-offset left-4 z-50 mt-4 ml-4">
        <Link
          href="/developments"
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full text-charcoal font-medium text-[13px] hover:bg-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Developments
        </Link>
      </div>

      {/* ─── Hero Image ──────────────────────────────────────────────── */}
      <section className="relative w-full h-[550px] lg:h-[650px] overflow-hidden -mt-navbar-offset">
        {gallery[0] ? (
          <Image
            src={gallery[0]}
            alt={dev.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-green-tint flex items-center justify-center">
            <Building2 size={64} className="text-green-muted" strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f3ea] via-[#f4f3ea]/20 to-transparent" />
      </section>

      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 -mt-[80px] relative z-10 flex flex-col gap-10">

        {/* ─── Title ──────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-cormorant text-[42px] sm:text-[50px] lg:text-[64px] font-bold text-charcoal leading-[1.05] tracking-tight max-w-[900px] mx-auto">
            {dev.name}
          </h1>
          <div className="flex items-center gap-2 mt-5 text-[15px] font-medium text-charcoal-light">
            <MapPin size={18} strokeWidth={2} className="text-green" />
            <span className="underline underline-offset-4 decoration-current opacity-80">{dev.location}</span>
          </div>
        </div>

        {/* ─── Spec Grid ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-[24px] px-8 py-10 shadow-[0px_10px_30px_rgba(58,59,63,0.04)] mx-auto w-full max-w-[1000px]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-cream-divider pb-8">
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Building2 size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Status</span>
              <span className="text-[14px] text-charcoal-light font-medium">{statusLabel[dev.status] || dev.status}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span className="text-[26px] font-bold text-charcoal opacity-80 pb-1">₦</span>
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">From</span>
              <span className="text-[14px] text-charcoal-light font-medium">{formatNaira(dev.priceFrom)}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <BedDouble size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Beds</span>
              <span className="text-[14px] text-charcoal-light font-medium">
                {Array.isArray(dev.bedrooms) ? dev.bedrooms.join('–') : dev.bedrooms}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Bath size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Baths</span>
              <span className="text-[14px] text-charcoal-light font-medium">
                {Array.isArray(dev.bathrooms) ? dev.bathrooms.join('–') : dev.bathrooms}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Maximize2 size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Size</span>
              <span className="text-[14px] text-charcoal-light font-medium">{dev.sizeRange}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 md:px-12">
            <div className="flex flex-col items-center justify-center gap-1.5">
              <CalendarDays size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Complete</span>
              <span className="text-[14px] text-charcoal-light font-medium">
                {dev.completionDate ? new Date(dev.completionDate).getFullYear() : 'TBC'}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Layers size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Units</span>
              <span className="text-[14px] text-charcoal-light font-medium">{dev.totalUnits}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 text-center">
              <Car size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Parking</span>
              <span className="text-[13px] text-charcoal-light leading-snug font-medium">Covered Allocation</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <Hash size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
              <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">ID</span>
              <button
                onClick={handleCopyId}
                className="flex items-center gap-1 text-[13px] text-charcoal-light hover:text-green transition-colors font-medium"
              >
                {dev.id} {copied ? <CheckCircle size={14} className="text-green" /> : <Hash size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── Body Layout ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mt-6">

          {/* Main Left Column */}
          <div className="flex-1 w-full flex flex-col gap-12">

            {/* Gallery */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 grid-rows-2 h-[420px] gap-3">
                <div className="col-span-2 row-span-2 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="col-span-1 row-span-2 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[1] || gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[2] || gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[3] || gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" />
                  {gallery.length > 4 && (
                    <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-charcoal text-white text-[12px] font-bold px-5 py-2.5 rounded-[8px] tracking-wider uppercase">
                        +{gallery.length - 4} More
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <p className="text-[18px] lg:text-[21px] text-charcoal leading-[1.65] font-medium tracking-tight">
                {dev.description}
              </p>
            </div>

            {/* Amenities */}
            {dev.amenities && dev.amenities.length > 0 && (
              <div>
                <h2 className="font-cormorant text-charcoal text-4xl font-bold leading-tight mb-6">Development Scope</h2>
                <div className="flex flex-wrap gap-4">
                  {dev.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[12px] bg-white text-[15px] text-charcoal font-medium shadow-[0px_4px_10px_rgba(0,0,0,0.02)] transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      <Shield size={18} strokeWidth={1.5} className="text-green/70" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {(dev as any).highlights && (dev as any).highlights.length > 0 && (
              <div>
                <h2 className="font-cormorant text-charcoal text-4xl font-bold leading-tight mb-6">Quality Guarantee</h2>
                <div className="space-y-4">
                  {(dev as any).highlights.map((h: any) => (
                    <p key={h.label} className="flex items-start gap-4 text-[16px] font-medium text-charcoal">
                      <span className="text-green font-bold">✓</span>
                      <span><strong className="text-charcoal pr-2">{h.label}:</strong> {h.description}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="relative w-full h-[320px] rounded-[24px] overflow-hidden border border-white bg-white/50 shadow-sm">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-green-tint">
                <MapPin size={42} strokeWidth={1} className="text-green" />
                <span className="text-[15px] font-semibold text-charcoal">{dev.location}</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-8">

            {/* Sales Contact Card */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_8px_30px_rgba(58,59,63,0.04)] border border-transparent sticky top-[100px]">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-[60px] h-[60px] rounded-[16px] bg-cream flex items-center justify-center border border-charcoal/5">
                  <span className="font-cormorant text-[26px] font-bold text-charcoal">MP</span>
                </div>
                <div>
                  <p className="text-[11px] text-charcoal-light uppercase tracking-[0.1em] font-semibold mb-1">Listed By</p>
                  <p className="text-[18px] font-bold text-charcoal">{developer.name}</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-charcoal/10">
                  <div>
                    <p className="text-[14px] font-bold text-charcoal mb-0.5">Email</p>
                    <a href={`mailto:${developer.email}`} className="text-[14px] text-charcoal-light hover:text-green underline underline-offset-4 decoration-current/30">
                      {developer.email}
                    </a>
                  </div>
                  <Mail size={22} strokeWidth={1.5} className="text-charcoal" />
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-charcoal/10">
                  <div>
                    <p className="text-[14px] font-bold text-charcoal mb-0.5">Phone</p>
                    <a href={`tel:${developer.phone}`} className="text-[14px] text-charcoal-light hover:text-green underline underline-offset-4 decoration-current/30">
                      {developer.phone}
                    </a>
                  </div>
                  <Phone size={22} strokeWidth={1.5} className="text-charcoal" />
                </div>
              </div>

              <a
                href={`https://wa.me/${developer.whatsapp?.replace(/[^0-9]/g, '')}`}
                target="_blank" rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-[12px] text-[14px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0px_4px_16px_rgba(37,211,102,0.25)] hover:-translate-y-0.5"
              >
                WHATSAPP SALES <MessageCircle size={18} strokeWidth={2.5} />
              </a>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_8px_30px_rgba(58,59,63,0.04)]">
              <h3 className="font-cormorant text-[28px] font-bold text-charcoal tracking-tight mb-2">Enquire Now</h3>
              <p className="text-[15px] text-charcoal-light mb-8 leading-snug">
                Register your interest to receive brochures, available unit list, and payment schedules.
              </p>

              {enquirySuccess ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle size={48} className="text-green mx-auto mb-4" />
                  <h4 className="font-cormorant text-charcoal text-xl font-bold mb-2">Enquiry Received</h4>
                  <p className="text-charcoal-light text-sm">
                    Our team will reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setEnquirySuccess(false)}
                    className="mt-6 text-green text-sm font-medium hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleEnquiry}>
                  <div>
                    <label className="block text-[14px] font-bold text-charcoal mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={enquiry.fullName}
                      onChange={(e) => setEnquiry((p) => ({ ...p, fullName: e.target.value }))}
                      className="w-full px-5 py-3.5 rounded-[12px] bg-[#f4f3ea] border border-transparent text-charcoal text-[15px] placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-green/30 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-charcoal mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={enquiry.email}
                      onChange={(e) => setEnquiry((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-5 py-3.5 rounded-[12px] bg-[#f4f3ea] border border-transparent text-charcoal text-[15px] placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-green/30 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-charcoal mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={enquiry.phone}
                      onChange={(e) => setEnquiry((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-5 py-3.5 rounded-[12px] bg-[#f4f3ea] border border-transparent text-charcoal text-[15px] placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-green/30 transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-charcoal mb-2">Development</label>
                    <input
                      type="text"
                      value={dev.name}
                      readOnly
                      className="w-full px-5 py-3.5 rounded-[12px] bg-[#f4f3ea] border border-transparent text-charcoal text-[15px] opacity-60 font-medium overflow-hidden text-ellipsis"
                    />
                  </div>

                  {enquiryError && (
                    <motion.div
                      className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-[8px] p-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <AlertCircle size={14} />
                      {enquiryError}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={enquiryLoading}
                    className="w-full bg-green hover:bg-green-dark disabled:opacity-60 text-white px-6 py-4 rounded-[12px] text-[15px] font-bold tracking-widest uppercase mt-4 flex items-center justify-center gap-2 shadow-cta hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    {enquiryLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>SEND ENQUIRY <ChevronRight size={16} strokeWidth={3} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
