'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
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
import PropertySpecTable from '@/components/ui/PropertySpecTable'

// Dynamic import for the map to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import('@/components/ui/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-green-tint flex items-center justify-center">
      <Loader2 className="text-green animate-spin" />
    </div>
  )
})

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
    phone: '+2348055269579',
    whatsapp: '+2348055269579',
  }

  // ─── Prepare Specs for Table ──────────────────────────────────────────────
  const propertySpecs = [
    { label: 'Development ID', value: dev.id },
    { label: 'Status', value: statusLabel[dev.status] || dev.status, isBold: true },
    { label: 'Base Price', value: formatNaira(dev.priceFrom), isBold: true },
    { label: 'Bedrooms', value: Array.isArray(dev.bedrooms) ? dev.bedrooms.join(', ') : dev.bedrooms },
    { label: 'Bathrooms', value: Array.isArray(dev.bathrooms) ? dev.bathrooms.join(', ') : dev.bathrooms },
    { label: 'Floor Area', value: dev.sizeRange },
    { label: 'Neighborhood', value: dev.neighborhood },
    { label: 'Total Units', value: dev.totalUnits },
    { label: 'Projected Completion', value: dev.completionDate ? new Date(dev.completionDate).getFullYear().toString() : 'TBC' },
  ]

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
            onError={(e) => {
              // Fallback for broken image paths from the database
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.classList.add('bg-green-tint', 'flex', 'items-center', 'justify-center')
            }}
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

        {/* ─── Spec Table ──────────────────────────────────────────────── */}
        <div className="mx-auto w-full max-w-[1000px]">
          <PropertySpecTable specs={propertySpecs} />
        </div>

        {/* ─── Body Layout ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mt-6">

          {/* Main Left Column */}
          <div className="flex-1 w-full flex flex-col gap-12">

            {/* Gallery */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 grid-rows-2 h-[420px] gap-3">
                <div className="col-span-2 row-span-2 relative rounded-[16px] overflow-hidden cursor-pointer bg-green-tint">
                  <Image src={gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <div className="col-span-1 row-span-2 relative rounded-[16px] overflow-hidden cursor-pointer bg-green-tint">
                  <Image src={gallery[1] || gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <div className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden cursor-pointer bg-green-tint">
                  <Image src={gallery[2] || gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </div>
                <div className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden cursor-pointer bg-green-tint">
                  <Image src={gallery[3] || gallery[0]} alt="Property" fill className="object-cover hover:scale-[1.03] transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
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
            <div className="space-y-6">
              {dev.description?.split('\n').map((paragraph: string, index: number) => paragraph.trim() ? (
                <p key={index} className="text-[18px] lg:text-[21px] text-charcoal leading-[1.65] font-medium tracking-tight">
                  {index === 0 ? (
                    <span className="float-left text-green text-[54px] font-cormorant leading-[0.8] pr-3 pt-2 font-bold">{paragraph.charAt(0)}</span>
                  ) : null}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ) : null)}
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

            {/* Unit Types Breakdown */}
            {dev.unitTypes && dev.unitTypes.length > 0 && (
              <div>
                <h2 className="font-cormorant text-charcoal text-4xl font-bold leading-tight mb-6">Unit Breakdown</h2>
                <div className="w-full overflow-x-auto rounded-[16px] border border-cream-border bg-white shadow-sm">
                  <table className="w-full text-left border-collapse min-w-[640px]">
                    <thead>
                      <tr className="bg-[#F0F4F1]">
                        <th className="py-4 px-6 text-[11px] uppercase tracking-widest text-green font-bold">Unit Type</th>
                        <th className="py-4 px-4 text-[11px] uppercase tracking-widest text-green font-bold text-center">Beds</th>
                        <th className="py-4 px-4 text-[11px] uppercase tracking-widest text-green font-bold text-center">Baths</th>
                        <th className="py-4 px-4 text-[11px] uppercase tracking-widest text-green font-bold text-center">Parking</th>
                        <th className="py-4 px-4 text-[11px] uppercase tracking-widest text-green font-bold">Floor Area</th>
                        <th className="py-4 px-6 text-[11px] uppercase tracking-widest text-green font-bold text-right">Price</th>
                        <th className="py-4 px-4 text-[11px] uppercase tracking-widest text-green font-bold text-center">Available</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dev.unitTypes.map((u: any, i: number) => (
                        <tr key={u.id || i} className="border-t border-cream-border hover:bg-[#FAFAF7] transition-colors">
                          <td className="py-4 px-6 text-[15px] font-bold text-charcoal">{u.name}</td>
                          <td className="py-4 px-4 text-center text-charcoal font-semibold">{u.bedrooms}</td>
                          <td className="py-4 px-4 text-center text-charcoal font-semibold">{u.bathrooms}</td>
                          <td className="py-4 px-4 text-center text-charcoal font-semibold">{u.parking ?? '—'}</td>
                          <td className="py-4 px-4 text-[14px] text-charcoal">{u.floorArea}</td>
                          <td className="py-4 px-6 text-right text-[15px] font-bold text-green">{Number(u.price) > 0 ? formatNaira(Number(u.price)) : '—'}</td>
                          <td className="py-4 px-4 text-center text-charcoal font-semibold">{u.availableUnits}<span className="text-charcoal-light font-normal"> / {u.totalUnits}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Highlights */}
            {dev.highlights && dev.highlights.length > 0 && (
              <div>
                <h2 className="font-cormorant text-charcoal text-4xl font-bold leading-tight mb-6">Quality Guarantee</h2>
                <div className="space-y-4">
                  {dev.highlights.map((h: any) => (
                    <p key={h.label} className="flex items-start gap-4 text-[16px] font-medium text-charcoal">
                      <span className="text-green font-bold">✓</span>
                      <span><strong className="text-charcoal pr-2">{h.label}:</strong> {h.description}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Map */}
            {(() => {
              const lat = (dev as any).latitude ?? dev.coordinates?.lat ?? 9.0765
              const lng = (dev as any).longitude ?? dev.coordinates?.lng ?? 7.3986
              return (
                <div>
                  <h2 className="font-cormorant text-charcoal text-4xl font-bold leading-tight mb-6">Location</h2>
                  <div className="relative w-full h-[440px] rounded-[24px] overflow-hidden border border-white bg-white/50 shadow-sm">
                    <InteractiveMap
                      center={[lat, lng]}
                      markers={[{ position: [lat, lng], title: dev.name, address: dev.location }]}
                    />
                  </div>
                </div>
              )
            })()}
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
