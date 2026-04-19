'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft, MapPin, BedDouble, Bath, Maximize2, ChevronRight, Phone,
  Mail, MessageCircle, Shield, Building2, Award, CalendarDays,
  Layers, Car, Hash, CheckCircle
} from 'lucide-react'
import { Button, Badge, AmenityChip, MiddleParkSeal } from '@/components/ui'
import { formatNaira } from '@/lib/utils'
import type { Development, UnitType } from '@/types'

// ─── MOCK DEV DATA ──────────────────────────────────────────────────────────
const mockDevelopments: Record<string, Development & { gallery: string[]; units: UnitType[] }> = {
  'dakibiyu-estate-phase-2': {
    id: 'MP-ABJ-0012',
    name: 'Dakibiyu Estate Phase 2',
    slug: 'dakibiyu-estate-phase-2',
    tagline: 'Where modern living meets nature',
    description: 'A 40-unit gated community of 4 and 5-bedroom terrace duplexes in Dakibiyu, one of Abuja\'s fastest-growing neighbourhoods. Every unit is built on verified title land with FCDA approval, featuring top-tier finishes, spacious layouts, and community amenities that make everyday living comfortable.',
    status: 'for-sale',
    location: 'Plot 2045, Dakibiyu District, Abuja',
    neighborhood: 'Dakibiyu',
    city: 'Abuja',
    coordinates: { lat: 9.0765, lng: 7.4986 },
    priceFrom: 95000000,
    priceTo: 120000000,
    unitTypes: [],
    totalUnits: 40,
    availableUnits: 12,
    bedrooms: [4, 5],
    bathrooms: [4, 5],
    sizeRange: '260–320 SQM',
    images: ['/images/dev-dakibiyu-1.jpg'],
    amenities: ['24/7 Security', 'Landscaped Gardens', 'Prepaid Meters', 'Covered Parking', 'Borehole Water', 'Tarred Roads'],
    highlights: [
      { icon: 'Shield', label: 'AGIS Title Verified', description: 'All land titles confirmed and verified before construction.' },
      { icon: 'Building2', label: 'FCDA Approved', description: 'Full Federal Capital Development Authority approval obtained.' },
      { icon: 'Award', label: 'MiddlePark Certified', description: 'Built to MiddlePark\'s rigorous quality standards.' },
    ],
    paymentPlan: {
      depositPercent: 30,
      milestones: [
        { label: 'Initial Deposit', percent: 30, dueAtStage: 'On allocation' },
        { label: 'Foundation', percent: 20, dueAtStage: 'Foundation stage' }
      ],
      flexiblePlansAvailable: true,
      note: 'Flexible payment plans available. Speak to our sales team for custom arrangements.',
    },
    certifications: ['AGIS Title Verified', 'FCDA Approved', 'MiddlePark Quality Seal'],
    createdAt: '2025-06-01',
    completionDate: '2027-03-01',
    developer: {
      name: 'MiddlePark Sales Team',
      email: 'sales@middleparkng.com',
      phone: '+2349012345678',
      whatsapp: '+2349012345678',
    },
    gallery: [
      '/images/dev-dakibiyu-1.jpg',
      '/images/dev-dakibiyu-2.jpg',
      '/images/interior-living-room.jpg',
      '/images/interior-kitchen.jpg',
    ],
    units: [],
  },
}

const fallbackDev = mockDevelopments['dakibiyu-estate-phase-2']

export default function DevelopmentDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const dev = mockDevelopments[slug] || { ...fallbackDev, name: slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Development' }
  const gallery = dev.gallery || dev.images

  const [copied, setCopied] = useState(false)
  const handleCopyId = () => {
    navigator.clipboard.writeText(dev.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full bg-[#f4f3ea] min-h-screen pb-20">
      
      {/* ─── Back Nav ───────────────────────────────────────── */}
      <div className="absolute top-navbar left-4 z-50 mt-4 ml-4">
         <Link
            href="/developments"
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full text-charcoal font-medium text-[13px] hover:bg-white transition-colors"
         >
            <ArrowLeft size={16} /> Back to Developments
         </Link>
      </div>

      {/* ─── Edge-to-Edge Hero Image ────────────────────────────── */}
      <section className="relative w-full h-[550px] lg:h-[650px] overflow-hidden -mt-navbar" data-cursor="view">
        <Image
          src={gallery[0]}
          alt={dev.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f4f3ea] via-[#f4f3ea]/20 to-transparent bottom-0 h-full" />
      </section>

      <div className="max-w-[1280px] mx-auto px-5 lg:px-8 -mt-[80px] relative z-10 flex flex-col gap-10">
        
        {/* ─── Separated Title Component ────────────────────────── */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-cormorant text-[42px] sm:text-[50px] lg:text-[64px] font-bold text-charcoal leading-[1.05] tracking-tight max-w-[900px] mx-auto">
            {dev.name}
          </h1>
          <div className="flex items-center gap-2 mt-5 text-[15px] font-medium text-charcoal-light">
            <MapPin size={18} strokeWidth={2} className="text-green-accent" />
            <span className="underline underline-offset-4 decoration-current opacity-80">{dev.location}</span>
          </div>
        </div>

        {/* ─── 9-Tile Spec Grid (White Container) ──────────────── */}
        <div className="bg-white rounded-[24px] px-8 py-10 shadow-[0px_10px_30px_rgba(58,59,63,0.04)] mx-auto w-full max-w-[1000px]">
          {/* Top row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-cream-divider pb-8">
             <div className="flex flex-col items-center justify-center gap-1.5 focus:outline-none">
                <Building2 size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Type</span>
                <span className="text-[14px] text-charcoal-light font-medium">{dev.status === 'for-sale' ? 'For Sale' : 'Off-Plan'}</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="text-[26px] font-bold text-charcoal opacity-80 pb-1">₦</span>
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">From</span>
                <span className="text-[14px] text-charcoal-light font-medium">{formatNaira(dev.priceFrom)}</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5">
                <BedDouble size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Beds</span>
                <span className="text-[14px] text-charcoal-light font-medium">{dev.bedrooms.join('-')}</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5">
                <Bath size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Baths</span>
                <span className="text-[14px] text-charcoal-light font-medium">{dev.bathrooms.join('-')}</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5">
                <Maximize2 size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Size</span>
                <span className="text-[14px] text-charcoal-light font-medium">{dev.sizeRange}</span>
             </div>
          </div>
          
          {/* Bottom row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 md:px-12">
             <div className="flex flex-col items-center justify-center gap-1.5">
                <CalendarDays size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Complete</span>
                <span className="text-[14px] text-charcoal-light font-medium">{dev.completionDate ? new Date(dev.completionDate).getFullYear() : 'TBC'}</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5">
                <Layers size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Units</span>
                <span className="text-[14px] text-charcoal-light font-medium">{dev.totalUnits}</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5 text-center px-4">
                <Car size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">Parking</span>
                <span className="text-[13px] text-charcoal-light leading-snug font-medium">Covered Allocation</span>
             </div>
             <div className="flex flex-col items-center justify-center gap-1.5">
                <Hash size={26} strokeWidth={1.2} className="text-charcoal opacity-80" />
                <span className="text-[14px] font-bold text-charcoal mt-1 uppercase tracking-widest">ID Log</span>
                <button 
                  onClick={handleCopyId}
                  className="flex items-center gap-1 text-[13px] text-charcoal-light hover:text-green transition-colors font-medium"
                >
                  {dev.id} {copied ? <CheckCircle size={14} className="text-green"/> : <Hash size={14} />}
                </button>
             </div>
          </div>
        </div>

        {/* ─── Body Layout: Left Main Column & Right Sidebar ──── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mt-6">
          
          {/* Main Left Column */}
          <div className="flex-1 w-full flex flex-col gap-12">
            
            {/* Masonry-Style Image Gallery */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 grid-rows-2 h-[420px] gap-3" data-cursor="view">
                {/* Image 1 - Large Left */}
                <div className="col-span-2 row-span-2 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[0]} alt="Property feature" fill className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-in-out" />
                </div>
                {/* Image 2 - Middle Large */}
                <div className="col-span-1 row-span-2 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[1] || gallery[0]} alt="Property feature" fill className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-in-out" />
                </div>
                {/* Image 3 - Top Right Small */}
                <div className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[2] || gallery[0]} alt="Property feature" fill className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-in-out" />
                </div>
                {/* Image 4 - Bottom Right Small with 'View All' Overlay */}
                <div className="col-span-1 row-span-1 relative rounded-[16px] overflow-hidden cursor-pointer">
                  <Image src={gallery[3] || gallery[0]} alt="Property feature" fill className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-charcoal/30 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-charcoal text-white text-[12px] font-bold px-5 py-2.5 rounded-[8px] tracking-wider uppercase">
                      View All
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Description Narrative */}
            <div>
              <p className="text-[18px] lg:text-[21px] text-charcoal leading-[1.65] font-medium tracking-tight whitespace-pre-line">
                {dev.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="font-cormorant text-charcoal text-4xl font-bold leading-tight mb-6">Development Scope</h2>
              <div className="flex flex-wrap gap-4">
                {dev.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[12px] bg-white text-[15px] text-charcoal font-medium shadow-[0px_4px_10px_rgba(0,0,0,0.02)] transition-transform duration-150 hover:-translate-y-0.5"
                    >
                      <Shield size={18} strokeWidth={1.5} className="text-green-accent/70" />
                      {amenity}
                    </span>
                ))}
              </div>
            </div>

            {/* Property Highlights / Certs */}
            {dev.highlights && (
              <div>
                <h2 className="font-cormorant text-charcoal text-4xl font-bold leading-tight mb-6">Quality Guarantee</h2>
                <div className="space-y-4">
                  {dev.highlights.map((highlight) => (
                    <p key={highlight.label} className="flex items-start gap-4 text-[16px] font-medium text-charcoal">
                      <span className="text-green-accent font-bold">✓</span>
                      <span><strong className="text-charcoal pr-2">{highlight.label}:</strong> {highlight.description}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="relative w-full h-[360px] rounded-[24px] overflow-hidden border border-white bg-white/50 shadow-sm mt-4">
               <Image src="/images/property-jabi-1.jpg" alt="Map View Placeholder" fill className="object-cover opacity-30 grayscale blur-sm" />
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <MapPin size={42} strokeWidth={1}  className="text-charcoal" />
                  <span className="text-[15px] font-semibold text-charcoal">Map Location: {dev.location}</span>
               </div>
            </div>

          </div>

          {/* Right Sidebar Form / Agent Box */}
          <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-8">
            
            {/* Sales Card */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_8px_30px_rgba(58,59,63,0.04)] border border-transparent hover:border-charcoal/5 transition-colors sticky top-[100px]">
              
              <div className="flex items-center gap-5 mb-8">
                <div className="w-[60px] h-[60px] rounded-[16px] bg-cream flex items-center justify-center border border-charcoal/5">
                  <span className="font-cormorant text-[26px] font-bold text-charcoal">MP</span>
                </div>
                <div>
                  <p className="text-[11px] text-charcoal-light uppercase tracking-[0.1em] font-semibold mb-1">Listed By</p>
                  <p className="text-[18px] font-bold text-charcoal">{dev.developer.name}</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-charcoal/10">
                  <div>
                    <p className="text-[14px] font-bold text-charcoal mb-0.5">Email</p>
                    <a href={`mailto:${dev.developer.email}`} className="text-[14px] text-charcoal-light hover:text-green underline underline-offset-4 decoration-current/30">
                      {dev.developer.email}
                    </a>
                  </div>
                  <Mail size={22} strokeWidth={1.5} className="text-charcoal" />
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-dashed border-charcoal/10">
                  <div>
                    <p className="text-[14px] font-bold text-charcoal mb-0.5">Phone</p>
                    <a href={`tel:${dev.developer.phone}`} className="text-[14px] text-charcoal-light hover:text-green underline underline-offset-4 decoration-current/30">
                      {dev.developer.phone}
                    </a>
                  </div>
                  <Phone size={22} strokeWidth={1.5} className="text-charcoal" />
                </div>
              </div>

              <a 
                href={`https://wa.me/${dev.developer.whatsapp?.replace('+', '')}`}
                target="_blank" rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-[12px] text-[14px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-[0px_4px_16px_rgba(37,211,102,0.25)] hover:shadow-[0px_6px_20px_rgba(37,211,102,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                WHATSAPP SALES <MessageCircle size={18} strokeWidth={2.5} />
              </a>
            </div>

            {/* Inquiry Intake Form */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0px_8px_30px_rgba(58,59,63,0.04)] border border-transparent">
               <h3 className="font-cormorant text-[28px] font-bold text-charcoal tracking-tight mb-2">Enquire Now</h3>
               <p className="text-[15px] text-charcoal-light mb-8 leading-snug">Register your interest to receive brochures, available unit list, and payment schedules.</p>

               <form className="space-y-4">
                  <div>
                    <label className="block text-[14px] font-bold text-charcoal mb-2">Name</label>
                    <input type="text" placeholder="Full Name" className="w-full px-5 py-3.5 rounded-[12px] bg-[#f4f3ea] border border-transparent text-charcoal text-[15px] placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-green-accent/30 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-charcoal mb-2">Email</label>
                    <input type="email" placeholder="Email Address" className="w-full px-5 py-3.5 rounded-[12px] bg-[#f4f3ea] border border-transparent text-charcoal text-[15px] placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-green-accent/30 transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-charcoal mb-2">Development</label>
                    <input type="text" defaultValue={dev.name} disabled className="w-full px-5 py-3.5 rounded-[12px] bg-[#f4f3ea] border border-transparent text-charcoal text-[15px] opacity-70 font-medium overflow-hidden text-ellipsis whitespace-nowrap" />
                  </div>
                  
                  <button type="submit" className="w-full bg-green hover:bg-green-dark text-white px-6 py-4 rounded-[12px] text-[15px] font-bold tracking-widest uppercase mt-4 flex items-center justify-center gap-2 shadow-cta hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all">
                    SEND ENQUIRY <ChevronRight size={16} strokeWidth={3} />
                  </button>
               </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
