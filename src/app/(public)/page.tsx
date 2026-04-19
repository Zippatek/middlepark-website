'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  Shield,
  FileCheck,
  Building2,
  TreePine,
  Star,
  ArrowRight,
  ArrowUpRight,
  Mail,
  CheckCircle2,
  MapPin,
  Users,
  Award,
  Home,
  CalendarDays,
  Phone,
  X,
  Check,
  Quote,
  Plus,
  Minus,
} from 'lucide-react'
import { Button, SectionHeader, DevelopmentCard } from '@/components/ui'
import type { Development, Testimonial } from '@/types'

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const stats = [
  { number: '12+', label: 'Completed Developments' },
  { number: '800+', label: 'Units Delivered' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '₦15B+', label: 'Property Value Managed' },
]

const featuredDevelopments: Development[] = [
  {
    id: 'MP-ABJ-0012',
    name: 'Dakibiyu Estate Phase 2',
    slug: 'dakibiyu-estate-phase-2',
    tagline: 'Where modern living meets nature',
    description: 'A 40-unit gated community of 4 and 5-bedroom terrace duplexes in Dakibiyu, one of Abuja\'s fastest-growing neighbourhoods.',
    status: 'for-sale',
    location: 'Plot 2045, Dakibiyu District, Abuja',
    neighborhood: 'Dakibiyu',
    city: 'Abuja',
    priceFrom: 95000000,
    priceTo: 120000000,
    unitTypes: [],
    totalUnits: 40,
    availableUnits: 12,
    bedrooms: [4, 5],
    bathrooms: [4, 5],
    sizeRange: '260–320 SQM',
    images: ['/images/dev-dakibiyu-1.jpg', '/images/dev-dakibiyu-2.jpg'],
    amenities: ['24/7 Security', 'Landscaped Gardens', 'Prepaid Meters', 'Covered Parking'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2025-06-01',
    completionDate: '2027-03-01',
    developer: {
      name: 'MiddlePark Sales Team',
      email: 'info@middleparkproperties.com',
      phone: '08055269579',
    },
  },
  {
    id: 'MP-ABJ-0015',
    name: 'Katampe Heights',
    slug: 'katampe-heights',
    tagline: 'Elevated living in the heart of Abuja',
    description: 'A collection of 24 carefully designed 5-bedroom detached duplexes in the exclusive Katampe Extension.',
    status: 'off-plan',
    location: 'Plot 1089, Katampe Extension, Abuja',
    neighborhood: 'Katampe Extension',
    city: 'Abuja',
    priceFrom: 150000000,
    priceTo: 180000000,
    unitTypes: [],
    totalUnits: 24,
    availableUnits: 24,
    bedrooms: [5],
    bathrooms: [6],
    sizeRange: '380–420 SQM',
    images: ['/images/dev-katampe-1.jpg', '/images/dev-katampe-2.jpg'],
    amenities: ['Estate Club House', 'Swimming Pool', 'Underground Parking', 'Smart Home Ready'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2025-09-15',
    completionDate: '2028-06-01',
    developer: {
      name: 'MiddlePark Sales Team',
      email: 'info@middleparkproperties.com',
      phone: '08055269579',
    },
  },
  {
    id: 'MP-ABJ-0018',
    name: 'Apo Residences',
    slug: 'apo-residences',
    tagline: 'Accessible homes, uncompromised quality',
    description: 'A 60-unit community of 3 and 4-bedroom terrace homes in the growing Apo District.',
    status: 'for-sale',
    location: 'Plot 567, Apo District, Abuja',
    neighborhood: 'Apo',
    city: 'Abuja',
    priceFrom: 65000000,
    priceTo: 85000000,
    unitTypes: [],
    totalUnits: 60,
    availableUnits: 28,
    bedrooms: [3, 4],
    bathrooms: [3, 4],
    sizeRange: '200–280 SQM',
    images: ['/images/dev-apo-1.jpg', '/images/dev-apo-2.jpg'],
    amenities: ['Perimeter Fencing', 'Borehole Water', 'Tarred Roads', 'Green Areas'],
    highlights: [],
    certifications: ['AGIS Title Verified', 'FCDA Approved'],
    createdAt: '2025-03-01',
    completionDate: '2026-12-01',
    developer: {
      name: 'MiddlePark Sales Team',
      email: 'info@middleparkproperties.com',
      phone: '08055269579',
    },
  },
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Aisha Bello',
    unitPurchased: '4-Bed Terrace, Dakibiyu Phase 1',
    rating: 5,
    quote: 'From the first site visit to handover, MiddlePark kept every promise. Our title was clean, the build quality exceeded expectations, and we moved in on schedule.',
    avatar: '/images/avatar-default.jpg',
    purchaseYear: 2024,
  },
  {
    id: '2',
    clientName: 'Emeka Okonkwo',
    unitPurchased: '5-Bed Detached, Maitama Gardens',
    rating: 5,
    quote: 'I\'ve bought from three developers in Abuja. MiddlePark is the only one that delivered exactly what was promised — no hidden charges, no delays, no stories.',
    avatar: '/images/avatar-default.jpg',
    purchaseYear: 2023,
  },
  {
    id: '3',
    clientName: 'Fatima Abdullahi',
    unitPurchased: '3-Bed Terrace, Apo Phase 1',
    rating: 5,
    quote: 'The client portal alone sets MiddlePark apart. I could track my payment schedule, construction progress, and download my documents all in one place.',
    avatar: '/images/avatar-default.jpg',
    purchaseYear: 2025,
  },
]

const whyMiddlePark = [
  {
    icon: Shield,
    title: 'Title Verified Before Ground Breaks',
    description: 'Every plot is AGIS title-verified and FCDA-approved before any construction begins. No grey areas.',
  },
  {
    icon: FileCheck,
    title: 'Transparent Pricing, No Hidden Fees',
    description: 'The quoted price is the final price. No development levies, no surprise charges at handover.',
  },
  {
    icon: Building2,
    title: 'Built to Outlast Trends',
    description: 'We use reinforced concrete, not timber frames. Every unit is designed for decades, not just show.',
  },
  {
    icon: Users,
    title: 'Client Portal Access from Day One',
    description: 'Track your payment schedule, construction progress, and download documents from your personal dashboard.',
  },
]

const comparisonData = [
  {
    aspect: 'Title Verification',
    typical: 'Verbal assurance, often unverified',
    middlepark: 'AGIS title confirmed and FCDA approved before construction begins',
  },
  {
    aspect: 'Pricing',
    typical: 'Base price + hidden development levies, legal fees, and infrastructure charges at handover',
    middlepark: 'Final price includes everything. No extras. No surprises.',
  },
  {
    aspect: 'Build Timeline',
    typical: '"18 months" that becomes 3+ years',
    middlepark: 'Published timeline with milestone tracking via your Client Portal',
  },
  {
    aspect: 'Construction Quality',
    typical: 'Timber frame, quick finishes',
    middlepark: 'Reinforced concrete, porcelain tiles, solid hardwood cabinetry',
  },
  {
    aspect: 'Communication',
    typical: 'Occasional WhatsApp updates',
    middlepark: 'Dedicated Client Portal with real-time progress photos and payment tracking',
  },
  {
    aspect: 'Documentation',
    typical: 'Handed over informally, often incomplete',
    middlepark: 'Full digital documentation pack — title, building plans, receipts, warranties',
  },
]

const processSteps = [
  { number: '01', title: 'Title Verification', description: 'We confirm AGIS title verification and FCDA approval before anything else. Your land is clean.', image: '/images/dev-dakibiyu-1.jpg' },
  { number: '02', title: 'Unit Selection & Pricing', description: 'Choose your preferred unit type, review the transparent pricing breakdown, and lock in your selection.', image: '/images/dev-katampe-1.jpg' },
  { number: '03', title: 'Payment Plan Agreement', description: 'Select a payment plan that works for you — no hidden extras, no development levies at handover.', image: '/images/interior-living-room.jpg' },
  { number: '04', title: 'Construction & Updates', description: 'Track progress through your Client Portal. Real-time photo updates, milestone notifications, documented at every stage.', image: '/images/interior-kitchen.jpg' },
  { number: '05', title: 'Handover & Move-In', description: 'Receive your keys, your completed documentation pack, and step into a home that\'s exactly what was promised.', image: '/images/dev-apo-1.jpg' },
]

const neighbourhoods = [
  {
    name: 'Dakibiyu',
    tagline: 'Growing. Connected. Promising.',
    description: 'One of Abuja\'s fastest-developing districts with direct access to the Outer Northern Expressway. Close to schools, hospitals, and the city\'s expanding commercial corridor.',
    image: '/images/dev-dakibiyu-1.jpg',
    developments: 2,
  },
  {
    name: 'Katampe Extension',
    tagline: 'Elevated. Exclusive. Arrived.',
    description: 'Abuja\'s most sought-after residential enclave — minutes from Maitama and the Central Business District. Mature infrastructure, excellent security, and surrounded by nature.',
    image: '/images/dev-katampe-1.jpg',
    developments: 1,
  },
  {
    name: 'Apo District',
    tagline: 'Accessible. Central. Grounded.',
    description: 'A well-established residential area with strong transport links, growing amenities, and proximity to some of Abuja\'s key institutions and shopping centres.',
    image: '/images/dev-apo-1.jpg',
    developments: 1,
  },
]

const certifications = [
  { icon: Shield, label: 'AGIS Title Verified' },
  { icon: FileCheck, label: 'FCDA Approved' },
  { icon: Award, label: 'MiddlePark Quality Seal' },
  { icon: Building2, label: 'COREN Registered' },
  { icon: Users, label: 'NIA Member' },
]

const pressLogos = [
  'The Guardian Nigeria',
  'BusinessDay',
  'ThisDay',
  'Premium Times',
  'The Cable',
  'Nairametrics',
]

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

// ─── COMPARISON ACCORDION ───────────────────────────────────────────────────
function ComparisonAccordion({ row, index }: { row: typeof comparisonData[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <motion.div
      className="border-b border-[#E5E5EA]"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-7 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-green text-white shadow-md' 
              : 'border border-[#E5E5EA] text-charcoal-light group-hover:border-green group-hover:text-green'
          }`}>
            {isOpen ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
          </div>
          <h3 className={`font-cormorant text-xl lg:text-[26px] font-bold transition-colors duration-200 ${
            isOpen ? 'text-charcoal-dark' : 'text-charcoal group-hover:text-charcoal-dark'
          }`}>
            {row.aspect}
          </h3>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8 pl-[60px]">
              <div className="bg-[#F2F2F7] rounded-[12px] p-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-charcoal-light/60 font-semibold mb-4">
                  Typical Developer
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-charcoal-light/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X size={10} className="text-charcoal-light/50" strokeWidth={3} />
                  </div>
                  <p className="text-charcoal-light text-[15px] leading-relaxed">{row.typical}</p>
                </div>
              </div>

              <div className="bg-white rounded-[12px] p-6 border-l-[3px] border-green shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.15em] text-green font-semibold mb-4">
                  With MiddlePark
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-green" strokeWidth={3} />
                  </div>
                  <p className="text-charcoal text-[15px] leading-relaxed font-medium">{row.middlepark}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── WHY MIDDLEPARK ACCORDION ───────────────────────────────────────────────
function WhyAccordion({ item, index }: { item: typeof whyMiddlePark[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <motion.div
      className="border-b border-[#E5E5EA]"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-7 text-left group cursor-pointer"
      >
        <div className="flex items-center gap-5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? 'bg-green/10 border border-green/20' 
              : 'border border-[#E5E5EA] group-hover:border-green/30'
          }`}>
            {isOpen ? <Minus size={16} strokeWidth={1.5} className="text-green" /> : <Plus size={16} strokeWidth={1.5} className="text-charcoal-light group-hover:text-green transition-colors" />}
          </div>
          <h3 className={`font-sans text-base lg:text-lg font-semibold transition-colors duration-200 ${
            isOpen ? 'text-charcoal-dark' : 'text-charcoal group-hover:text-charcoal-dark'
          }`}>
            {item.title}
          </h3>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-[60px]">
              <p className="text-charcoal-light text-[15px] leading-[1.7] max-w-[520px]">
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO — ANIMATED TEXT REVEAL */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center overflow-hidden" id="hero">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-estate-aerial.jpg"
            alt="MiddlePark Estate — Aerial View"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1C1C1E]/65" />
        </div>

        {/* Animated light sweep overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
          style={{ width: '50%' }}
        />

        {/* Subtle moving particles / bokeh */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/[0.03]"
              style={{
                width: 120 + i * 80,
                height: 120 + i * 80,
                left: `${10 + i * 18}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16 w-full">
          <div className="max-w-[720px]">
            {/* Overline with animated line */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="h-[1px] bg-green"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-sans">
                Abuja&apos;s Defining Developer
              </p>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h1 className="font-cormorant text-white font-bold leading-[0.95] mb-8">
              {['Where', 'Every', 'Home'].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  style={{ fontSize: 'clamp(52px, 7.5vw, 88px)' }}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: [0.2, 0.8, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {['Tells', 'a', 'Story'].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  style={{ fontSize: 'clamp(52px, 7.5vw, 88px)' }}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 + i * 0.12, ease: [0.2, 0.8, 0.3, 1] }}
                >
                  {word === 'Story' ? (
                    <span className="relative">
                      Story
                      <motion.span
                        className="absolute -bottom-2 left-0 h-[3px] bg-green"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                      />
                    </span>
                  ) : word}
                </motion.span>
              ))}
            </h1>

            {/* Body text */}
            <motion.p
              className="text-white/65 text-lg max-w-[520px] mb-10 leading-[1.7] font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              MiddlePark Properties builds carefully crafted estates across Abuja&apos;s most
              sought-after neighbourhoods. Every unit is designed to last. Every title is clean.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <Button variant="white-on-dark" size="lg" href="/developments">
                VIEW DEVELOPMENTS <ArrowRight size={16} />
              </Button>
              <Button variant="ghost-white" size="lg" href="/contact">
                ENQUIRE ABOUT A UNIT
              </Button>
            </motion.div>
          </div>

          {/* Right side — floating stat card */}
          <motion.div
            className="hidden xl:block absolute right-8 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-[16px] p-6 w-[200px]">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Since 2016</p>
              <div className="space-y-5">
                {[
                  { val: '800+', label: 'Units built' },
                  { val: '98%', label: 'On-time delivery' },
                  { val: '12', label: 'Developments' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-cormorant text-white text-2xl font-bold">{s.val}</p>
                    <p className="text-white/35 text-[11px] mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <span className="text-white/25 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-8 bg-white/15 relative overflow-hidden">
            <motion.div
              className="w-full h-3 bg-white/40"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. STATS BAR */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1C1C1E] py-14 px-6 lg:px-8" id="stats-bar">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="font-cormorant text-white text-4xl lg:text-5xl font-bold">
                {stat.number}
              </p>
              <p className="text-white/40 text-[13px] mt-2 font-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. FEATURED DEVELOPMENTS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream" id="featured-developments">
        <div className="middlepark-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green" />
                <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                  Our Developments
                </p>
              </div>
              <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1]">
                Carefully Crafted Estates
              </h2>
              <p className="text-charcoal-light text-base mt-3 max-w-lg leading-relaxed">
                Every MiddlePark development is title-verified before ground is broken. Browse our current projects.
              </p>
            </div>
            <Link
              href="/developments"
              className="inline-flex items-center gap-2 text-charcoal text-sm font-medium shrink-0 hover:text-green transition-colors duration-200 group"
            >
              VIEW ALL
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {featuredDevelopments.map((dev) => (
              <motion.div key={dev.id} variants={staggerItem}>
                <DevelopmentCard development={dev} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. WHY MIDDLEPARK — ACCORDION STYLE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="why-middlepark">
        <div className="middlepark-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left — Sticky header + image */}
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green" />
                <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                  Why MiddlePark
                </p>
              </div>
              <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1] mb-5">
                We Build Homes That<br />Keep Their Promise
              </h2>
              <p className="text-charcoal-light text-base leading-[1.7] mb-8 max-w-md">
                In a market where delays and disputes are common, MiddlePark delivers on time, on budget, and on paper.
              </p>
              <div className="relative h-[320px] lg:h-[380px] rounded-[16px] overflow-hidden">
                <Image
                  src="/images/why-middlepark-interior.jpg"
                  alt="MiddlePark interior — living room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right — Accordion items */}
            <div className="border-t border-[#E5E5EA]">
              {whyMiddlePark.map((item, i) => (
                <WhyAccordion key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. THE MIDDLEPARK DIFFERENCE — ACCORDION COMPARISON */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream" id="difference">
        <div className="middlepark-container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green" />
              <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                The Difference
              </p>
            </div>
            <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1] mb-4">
              Why Families Choose MiddlePark
            </h2>
            <p className="text-charcoal-light text-base max-w-lg mx-auto leading-relaxed">
              We removed everything that was wrong with buying property in Abuja.
            </p>
          </div>

          <div className="max-w-[960px] mx-auto border-t border-[#E5E5EA]">
            {comparisonData.map((row, i) => (
              <ComparisonAccordion key={row.aspect} row={row} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 6. HOW WE WORK — ALTERNATING IMAGE + STEP */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F2F2F7]" id="process">
        <div className="middlepark-container">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green" />
              <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                How We Work
              </p>
            </div>
            <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1]">
              From Enquiry to Keys in Hand
            </h2>
          </div>

          {/* Alternating timeline */}
          <div className="space-y-0">
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i > 0 ? 'mt-16 lg:mt-0' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Image */}
                  <div className={`relative h-[280px] lg:h-[360px] rounded-[16px] overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}>
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Step badge on image */}
                    <div className="absolute top-4 left-4 bg-green text-white px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                      Step {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${!isEven ? 'lg:order-1' : ''} flex`}>
                    <div className="flex flex-col items-center mr-6 hidden lg:flex">
                      {/* Step number circle */}
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E5E5EA] flex items-center justify-center text-charcoal font-cormorant text-lg font-bold">
                        {step.number}
                      </div>
                      {/* Vertical line */}
                      {i < processSteps.length - 1 && (
                        <div className="w-[1px] flex-1 bg-[#E5E5EA] mt-3" />
                      )}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-cormorant text-charcoal-dark text-2xl lg:text-[28px] font-bold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-charcoal-light text-[15px] leading-[1.7] max-w-[400px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. INTERIORS — FULL-WIDTH SHOWCASE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="interiors">
        <div className="middlepark-container mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green" />
                <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                  Interiors
                </p>
              </div>
              <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1]">
                Designed for Living,<br />Not Just Showing
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="text-charcoal-light text-base leading-[1.7] max-w-md lg:ml-auto mb-5">
                Every MiddlePark home comes finished to move-in standard. High-grade porcelain
                tiles, solid hardwood kitchen cabinets, and integrated smart-home rough-ins.
              </p>
              <Link
                href="/developments"
                className="inline-flex items-center gap-2 text-green text-sm font-semibold uppercase tracking-wide hover:gap-3 transition-all"
              >
                Explore Developments <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-2">
          <div className="relative col-span-2 row-span-2 h-[400px] lg:h-[560px] rounded-[4px] overflow-hidden group">
            <Image
              src="/images/interior-living-room.jpg"
              alt="MiddlePark living room interior"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="50vw"
            />
          </div>
          <div className="relative h-[200px] lg:h-[278px] rounded-[4px] overflow-hidden group">
            <Image
              src="/images/interior-kitchen.jpg"
              alt="MiddlePark kitchen"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="25vw"
            />
          </div>
          <div className="relative h-[200px] lg:h-[278px] rounded-[4px] overflow-hidden group">
            <Image
              src="/images/interior-bedroom.jpg"
              alt="MiddlePark bedroom"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="25vw"
            />
          </div>
          <div className="relative col-span-2 h-[200px] lg:h-[278px] rounded-[4px] overflow-hidden group">
            <Image
              src="/images/interior-kitchen.jpg"
              alt="MiddlePark master bedroom"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/60 to-transparent flex items-end justify-end p-6">
              <Link
                href="/developments"
                className="inline-flex items-center gap-2 text-white text-sm font-medium hover:gap-3 transition-all duration-200"
              >
                VIEW ALL INTERIORS <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 8. COMMUNITY — REVERSED SHOWCASE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream" id="community">
        <div className="middlepark-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              className="relative h-[380px] lg:h-[480px] rounded-[16px] overflow-hidden order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/dev-dakibiyu-1.jpg"
                alt="MiddlePark community — estate grounds"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green" />
                <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                  Community
                </p>
              </div>
              <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1] mb-5">
                Neighbourhoods<br />That Work For You
              </h2>
              <p className="text-charcoal-light text-base leading-[1.7] mb-8 max-w-md">
                We build in established neighbourhoods with existing infrastructure — tarred
                roads, reliable power connections, and proximity to schools, hospitals, and retail.
              </p>
              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  { icon: MapPin, label: 'Established locations' },
                  { icon: Home, label: 'Gated communities' },
                  { icon: TreePine, label: 'Green surroundings' },
                  { icon: Shield, label: '24/7 security' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green/6 border border-green/10 flex items-center justify-center">
                      <item.icon size={16} className="text-green" strokeWidth={1.5} />
                    </div>
                    <span className="text-charcoal text-[13px] font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <Button variant="primary" href="/about">
                ABOUT MIDDLEPARK <ArrowRight size={14} />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 9. WHERE WE BUILD */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="neighbourhoods">
        <div className="middlepark-container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green" />
              <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                Where We Build
              </p>
            </div>
            <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1] mb-4">
              Abuja&apos;s Most Established<br />Neighbourhoods
            </h2>
            <p className="text-charcoal-light text-base max-w-lg mx-auto leading-relaxed">
              We develop exclusively in locations with existing infrastructure, proven land titles, and strong property appreciation.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {neighbourhoods.map((area) => (
              <motion.div
                key={area.name}
                className="group rounded-[16px] overflow-hidden bg-white border border-[#E5E5EA] hover:shadow-lg transition-shadow duration-500"
                variants={staggerItem}
              >
                <div className="relative h-[240px] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={`${area.name} — MiddlePark development area`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant text-charcoal-dark text-[22px] font-bold mb-1">
                    {area.name}
                  </h3>
                  <p className="text-green text-[11px] uppercase tracking-[0.15em] font-semibold mb-3">
                    {area.tagline}
                  </p>
                  <p className="text-charcoal-light text-sm leading-relaxed mb-5">
                    {area.description}
                  </p>
                  <span className="inline-block px-3 py-1.5 bg-[#F2F2F7] rounded-full text-charcoal text-[11px] font-semibold">
                    {area.developments} Active Development{area.developments > 1 ? 's' : ''}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 10. TESTIMONIALS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F2F2F7]" id="testimonials">
        <div className="middlepark-container">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green" />
              <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                What Our Clients Say
              </p>
            </div>
            <h2 className="font-cormorant text-charcoal-dark text-4xl lg:text-[44px] font-bold leading-[1.1]">
              Trusted by Homeowners<br />Across Abuja
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                className="bg-white rounded-[16px] p-7 lg:p-8 relative border border-[#E5E5EA] hover:shadow-md transition-shadow duration-500"
                variants={staggerItem}
              >
                <Quote 
                  size={40} 
                  className="absolute top-5 right-5 text-[#E5E5EA]" 
                  strokeWidth={1} 
                />

                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-[#C7A84E] fill-[#C7A84E]"
                    />
                  ))}
                </div>

                <p className="text-charcoal text-[15px] leading-[1.7] mb-7 relative">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-[#F2F2F7]">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F2F2F7] border border-[#E5E5EA] shrink-0">
                    <Image
                      src={t.avatar || '/images/avatar-default.jpg'}
                      alt={t.clientName}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-charcoal text-sm font-semibold">{t.clientName}</p>
                    <p className="text-charcoal-light text-xs">{t.unitPurchased}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 11. SCHEDULE A VISIT CTA */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="schedule-visit">
        <div className="max-w-[960px] mx-auto px-6 lg:px-8">
          <motion.div
            className="bg-[#1C1C1E] rounded-[20px] p-8 lg:p-14 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green/5 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-[0.15em] font-semibold mb-4">
                  Visit Us
                </p>
                <h2 className="font-cormorant text-white text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  See It For Yourself
                </h2>
                <p className="text-white/55 text-[15px] leading-[1.7] mb-8">
                  Book a private tour of any MiddlePark development. Walk the grounds, inspect the 
                  finishes, and speak directly with our construction team on site.
                </p>
                <Button variant="white-on-dark" size="lg" href="/contact">
                  <CalendarDays size={16} /> SCHEDULE A SITE VISIT
                </Button>
                <p className="text-white/30 text-sm mt-5 flex items-center gap-2">
                  <Phone size={14} />
                  Or call us directly: 0805 526 9579
                </p>
              </div>
              <div className="relative h-[260px] lg:h-[300px] rounded-[12px] overflow-hidden hidden lg:block">
                <Image
                  src="/images/contact-abuja-skyline.jpg"
                  alt="MiddlePark sales office"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 12. TRUST & CERTIFICATIONS BAR */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream border-y border-[#E5E5EA] py-12 px-6 lg:px-8" id="certifications">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-charcoal-light text-[10px] uppercase tracking-[0.2em] font-semibold mb-8">
            Verified · Approved · Certified
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.label}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <cert.icon size={18} className="text-charcoal-light/50" strokeWidth={1.5} />
                <span className="text-charcoal-light/70 text-xs uppercase tracking-wider font-medium">
                  {cert.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 13. PRESS & RECOGNITION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 lg:px-8 bg-white" id="press">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-charcoal-light/50 text-[10px] uppercase tracking-[0.2em] font-semibold mb-8">
            As Seen In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {pressLogos.map((name) => (
              <span
                key={name}
                className="font-cormorant text-charcoal-light/25 text-lg lg:text-xl font-bold hover:text-charcoal-light/60 transition-colors duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 14. STAY UPDATED — WAITLIST CTA */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32" id="waitlist-cta">
        <div className="absolute inset-0">
          <Image
            src="/images/dev-gwarinpa-1.jpg"
            alt="Gwarinpa development"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1C1C1E]/88" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div
            className="max-w-[580px] mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-white/35 text-xs uppercase tracking-[0.2em] mb-4">
              Stay Updated
            </p>
            <h2 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Be the First to Know
            </h2>
            <p className="text-white/50 text-[15px] leading-[1.7] mb-10 font-sans">
              Get early access to new developments, pricing, and availability before they go
              public. No spam — just the updates that matter.
            </p>

            <form
              className="flex flex-col sm:flex-row gap-3 max-w-[460px] mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-transparent transition-all duration-200"
                id="waitlist-email"
              />
              <button
                type="submit"
                className="bg-green text-white px-6 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-green-dark transition-all duration-200 shrink-0"
                id="waitlist-submit"
              >
                JOIN <Mail size={14} />
              </button>
            </form>

            <p className="text-white/15 text-xs mt-5">
              By joining, you agree to receive MiddlePark updates. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
