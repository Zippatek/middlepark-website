'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
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
  { number: '01', title: 'Title Verification', description: 'We confirm AGIS title verification and FCDA approval before anything else. Your land is clean.', image: '/images/process-title-verification.png' },
  { number: '02', title: 'Unit Selection & Pricing', description: 'Choose your preferred unit type, review the transparent pricing breakdown, and lock in your selection.', image: '/images/process-unit-selection.png' },
  { number: '03', title: 'Payment Plan Agreement', description: 'Select a payment plan that works for you — no hidden extras, no development levies at handover.', image: '/images/process-payment-plan.png' },
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

// ─── 3D HERO INTERACTIVE ELEMENT ─────────────────────────────────────────────
function HeroAbstractElement({
  mouseX,
  mouseY,
}: {
  mouseX: any
  mouseY: any
}) {
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20])
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 20 })

  return (
    <motion.div
      className="absolute right-[-10%] top-[10%] w-[800px] h-[800px] pointer-events-none hidden lg:block"
      style={{
        perspective: '1500px',
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
    >
      <div className="relative w-full h-full">
        {/* Large Architectural Lattice — Minimalist depth */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-green/10 rounded-[100px]"
            style={{
              transform: `translateZ(${i * 60}px) rotate(${i * 10}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 1 + i * 0.2 }}
          />
        ))}
        {/* Central Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green/10 blur-[80px] rounded-full" />
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  // Mouse tracking for hero parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const heroRef = useRef<HTMLDivElement>(null)

  // Scroll-based 3D portal effect for developments section
  const developmentsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: devScrollProgress } = useScroll({
    target: developmentsRef,
    offset: ['start end', 'start 0.3'],
  })
  const portalScale = useTransform(devScrollProgress, [0, 1], [0.7, 1])
  const portalOpacity = useTransform(devScrollProgress, [0, 0.5, 1], [0, 0.5, 1])
  const portalPerspective = useTransform(devScrollProgress, [0, 1], [800, 0])
  const portalRotateX = useTransform(devScrollProgress, [0, 1], [25, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    const el = heroRef.current
    if (el) {
      el.addEventListener('mousemove', handleMouseMove)
      return () => el.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO — IMMERSIVE 3D PERSPECTIVE EXPERIENCE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden bg-[#0A0A0C] pt-[140px] pb-24 lg:pb-32" id="hero">
        {/* 3D Perspective Grid Floor — Deep space effect */}
        <div className="absolute inset-0" style={{ perspective: '1200px' }}>
          {/* Main grid */}
          <div
            className="absolute w-[250%] h-[70%] bottom-0 left-[-75%]"
            style={{
              transform: 'rotateX(68deg)',
              transformOrigin: 'center bottom',
              backgroundImage: `
                linear-gradient(rgba(40,107,56,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(40,107,56,0.12) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
          {/* Grid glow pulse — breathing effect */}
          <motion.div
            className="absolute w-[250%] h-[70%] bottom-0 left-[-75%]"
            style={{
              transform: 'rotateX(68deg)',
              transformOrigin: 'center bottom',
              backgroundImage: `
                linear-gradient(rgba(40,107,56,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(40,107,56,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
            animate={{ opacity: [0, 0.35, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Horizon glow — vanishing point */}
          <div
            className="absolute w-full h-[30%] bottom-[28%] left-0"
            style={{
              background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(40,107,56,0.08) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Vertical scan lines — subtle digital texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none hidden lg:block"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 3px)',
          }}
        />

        {/* Ambient glow orbs — atmospheric depth */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] bg-green/12"
          style={{ top: '5%', right: '10%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[130px] bg-green/6"
          style={{ bottom: '15%', left: '5%' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        {/* Secondary accent glow */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-[100px] bg-white/[0.02]"
          style={{ top: '40%', left: '35%' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />

        {/* Content layer */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left — Text */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-6 lg:mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div
                  className="h-[1px] bg-green"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
                <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans">
                  Abuja&apos;s Defining Developer
                </p>
              </motion.div>

              {/* Desktop headline */}
              <h1 className="font-cormorant text-white font-bold leading-[0.92] mb-6 lg:mb-8 hidden sm:block">
                {['Where', 'Every', 'Home'].map((word, i) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-[0.22em]"
                    style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}
                    initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {['Tells', 'a'].map((word, i) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-[0.22em]"
                    style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}
                    initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, delay: 1.0 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block relative"
                  style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}
                  initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-green">Story</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] bg-green"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6, delay: 2 }}
                  />
                </motion.span>
              </h1>

              {/* Mobile headline — compact minimalist */}
              <motion.h1
                className="font-cormorant text-white font-bold leading-[0.95] mb-5 sm:hidden"
                style={{ fontSize: '42px' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Where Every Home<br />
                Tells a <span className="text-green">Story</span>
              </motion.h1>

              <motion.p
                className="text-white/45 text-sm sm:text-base lg:text-lg max-w-[480px] mb-8 lg:mb-10 leading-[1.7] font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                MiddlePark Properties builds carefully crafted estates across Abuja&apos;s most
                sought-after neighbourhoods. Every unit is designed to last. Every title is clean.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <Button variant="white-on-dark" size="lg" href="/developments">
                  VIEW DEVELOPMENTS <ArrowRight size={16} />
                </Button>
                <Button variant="ghost-white" size="lg" href="/contact">
                  ENQUIRE ABOUT A UNIT
                </Button>
              </motion.div>
            </div>

            {/* Right — Interactive Abstract depth (desktop only) */}
            <HeroAbstractElement mouseX={mouseX} mouseY={mouseY} />

            {/* Mobile — Minimalist Visual */}
            <motion.div
              className="lg:hidden relative mt-12 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              <div className="w-24 h-24 rounded-full bg-green/5 border border-green/20 backdrop-blur-md flex items-center justify-center relative mx-auto">
                <motion.div 
                  className="absolute inset-0 rounded-full border border-green/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <Award className="text-green opacity-40" size={32} strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0C] to-transparent" />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <span className="text-white/20 text-[9px] sm:text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <div className="w-[1px] h-6 sm:h-8 bg-white/15 relative overflow-hidden">
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
      <section className="bg-[#1C1C1E] py-10 sm:py-14 px-5 sm:px-6 lg:px-8" id="stats-bar">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center lg:px-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="font-cormorant text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
                {stat.number}
              </p>
              <p className="text-white/40 text-[11px] sm:text-[13px] mt-1.5 sm:mt-2 font-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. FEATURED DEVELOPMENTS — 3D PORTAL ENTRANCE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream relative overflow-hidden" id="featured-developments" ref={developmentsRef}>
        {/* 3D Portal entrance effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(40,107,56,0.04) 0%, transparent 60%)',
          }}
        />

        <motion.div
          className="middlepark-container"
          style={{
            scale: portalScale,
            opacity: portalOpacity,
          }}
        >
          {/* Section header with 3D reveal */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
            initial={{ opacity: 0, y: 40, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
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
          </motion.div>

          {/* Cards with staggered 3D entrance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDevelopments.map((dev, i) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 60, rotateX: 12, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: 'center bottom' }}
              >
                <DevelopmentCard development={dev} />
              </motion.div>
            ))}
          </div>
        </motion.div>
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
      {/* 6. HOW WE WORK — ALTERNATING IMAGE + STEP (MINIMALIST MOBILE) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F2F2F7]" id="process">
        <div className="middlepark-container">
          <div className="text-center mb-12 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green" />
              <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                How We Work
              </p>
            </div>
            <h2 className="font-cormorant text-charcoal-dark text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1]">
              From Enquiry to Keys in Hand
            </h2>
          </div>

          {/* Desktop — Alternating timeline */}
          <div className="hidden lg:block space-y-0">
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

          {/* Mobile — Minimalist vertical timeline */}
          <div className="lg:hidden space-y-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex gap-4"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {/* Timeline line + number */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-9 h-9 rounded-full bg-green text-white flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-[1px] flex-1 bg-green/15 mt-2" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-6">
                  <h3 className="font-cormorant text-charcoal-dark text-xl font-bold mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-charcoal-light text-[13px] leading-[1.65]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
      {/* 9. WHERE WE BUILD (MINIMALIST MOBILE) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="neighbourhoods">
        <div className="middlepark-container">
          <div className="text-center mb-10 lg:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green" />
              <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                Where We Build
              </p>
            </div>
            <h2 className="font-cormorant text-charcoal-dark text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1] mb-3 sm:mb-4">
              Abuja&apos;s Most Established<br />Neighbourhoods
            </h2>
            <p className="text-charcoal-light text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              We develop exclusively in locations with existing infrastructure, proven land titles, and strong property appreciation.
            </p>
          </div>

          {/* Desktop — Full cards */}
          <motion.div
            className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8"
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

          {/* Mobile — Compact horizontal scroll cards */}
          <div className="sm:hidden flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
            {neighbourhoods.map((area, i) => (
              <motion.div
                key={area.name}
                className="shrink-0 w-[260px] rounded-[14px] overflow-hidden bg-white border border-[#E5E5EA] snap-start"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="relative h-[140px] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={`${area.name}`}
                    fill
                    className="object-cover"
                    sizes="260px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-cormorant text-charcoal-dark text-lg font-bold">{area.name}</h3>
                  <p className="text-green text-[10px] uppercase tracking-[0.12em] font-semibold mb-1.5">{area.tagline}</p>
                  <span className="inline-block px-2.5 py-1 bg-[#F2F2F7] rounded-full text-charcoal text-[10px] font-semibold">
                    {area.developments} Active
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 10. TESTIMONIALS (MINIMALIST MOBILE) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F2F2F7]" id="testimonials">
        <div className="middlepark-container">
          <div className="text-center mb-10 lg:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-green" />
              <p className="text-charcoal-light text-xs uppercase tracking-[0.15em] font-semibold">
                What Our Clients Say
              </p>
            </div>
            <h2 className="font-cormorant text-charcoal-dark text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.1]">
              Trusted by Homeowners<br />Across Abuja
            </h2>
          </div>

          {/* Desktop — Full grid */}
          <motion.div
            className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8"
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

          {/* Mobile — Compact stacked cards */}
          <div className="sm:hidden space-y-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="bg-white rounded-[14px] p-5 border border-[#E5E5EA]"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F2F2F7] border border-[#E5E5EA] shrink-0">
                    <Image
                      src={t.avatar || '/images/avatar-default.jpg'}
                      alt={t.clientName}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-charcoal text-sm font-semibold">{t.clientName}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={10} className="text-[#C7A84E] fill-[#C7A84E]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-charcoal text-[13px] leading-[1.65]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
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
      {/* 13. STAY UPDATED — WAITLIST CTA (TRANSPARENT BG) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden" id="waitlist-cta">
        {/* Background image with dark transparent overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-estate-aerial.jpg"
            alt="MiddlePark estate aerial"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0C]/85" />
        </div>

        {/* Subtle grid bg — on top of the image */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Accent glow */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[150px] bg-green/8"
          style={{ top: '-15%', right: '20%' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div
            className="max-w-[580px] mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-green text-xs uppercase tracking-[0.25em] font-semibold mb-4">
              Stay Updated
            </p>
            <h2 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Be the First to Know
            </h2>
            <p className="text-white/45 text-[15px] leading-[1.7] mb-10 font-sans">
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
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.07] border border-white/12 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-1 focus:ring-green/40 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
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
