'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Shield,
  FileCheck,
  Building2,
  TreePine,
  Star,
  ArrowRight,
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
      email: 'sales@middleparkproperties.com',
      phone: '+2349012345678',
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
      email: 'sales@middleparkproperties.com',
      phone: '+2349012345678',
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
      email: 'sales@middleparkproperties.com',
      phone: '+2349012345678',
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
  { number: '01', title: 'Title Verification', description: 'We confirm AGIS title verification and FCDA approval before anything else. Your land is clean.' },
  { number: '02', title: 'Unit Selection & Pricing', description: 'Choose your preferred unit type, review the transparent pricing breakdown, and lock in your selection.' },
  { number: '03', title: 'Payment Plan Agreement', description: 'Select a payment plan that works for you — no hidden extras, no development levies at handover.' },
  { number: '04', title: 'Construction & Updates', description: 'Track progress through your Client Portal. Real-time photo updates, milestone notifications, documented at every stage.' },
  { number: '05', title: 'Handover & Move-In', description: 'Receive your keys, your completed documentation pack, and step into a home that\'s exactly what was promised.' },
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
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
  }),
}

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

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center" id="hero">
        {/* Background image + overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-estate-aerial.jpg"
            alt="MiddlePark Estate — Aerial View"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-16">
          <motion.p
            className="overline text-white/60 text-xs uppercase tracking-widest mb-4"
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
          >
            Abuja&apos;s Defining Developer
          </motion.p>
          <motion.h1
            className="font-cormorant text-white font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(48px, 7vw, 82px)' }}
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
          >
            Where Every Home
            <br />
            Tells a Story
          </motion.h1>
          <motion.p
            className="text-white/70 text-lg max-w-[520px] mb-10 leading-relaxed font-sans"
            initial="hidden"
            animate="visible"
            custom={0.6}
            variants={fadeUp}
          >
            MiddlePark Properties builds carefully crafted estates across Abuja&apos;s most
            sought-after neighbourhoods. Every unit is designed to last. Every title is clean.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial="hidden"
            animate="visible"
            custom={0.8}
            variants={fadeUp}
          >
            <Button variant="white-on-dark" size="lg" href="/developments">
              VIEW DEVELOPMENTS <ArrowRight size={16} />
            </Button>
            <Button variant="ghost-white" size="lg" href="/contact">
              ENQUIRE ABOUT A UNIT
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-white/30 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
            <motion.div
              className="w-full h-3 bg-white/50"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. STATS BAR — Deep Slate */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1C1C1E] py-16 px-6 lg:px-8" id="stats-bar">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center px-4 lg:px-8 py-6 lg:py-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="font-cormorant text-white text-4xl lg:text-5xl font-bold">
                {stat.number}
              </p>
              <p className="text-white/50 text-sm mt-2 font-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. FEATURED DEVELOPMENTS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream" id="featured-developments">
        <div className="middlepark-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              overline="Our Developments"
              heading="Carefully Crafted Estates"
              subCopy="Every MiddlePark development is title-verified before ground is broken. Browse our current projects."
            />
            <Link
              href="/developments"
              className="inline-flex items-center gap-1.5 text-green text-sm font-medium shrink-0 hover:gap-2.5 transition-all duration-200"
            >
              VIEW ALL DEVELOPMENTS
              <ArrowRight size={16} />
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
      {/* 4. WHY MIDDLEPARK */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="why-middlepark">
        <div className="middlepark-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Image */}
            <motion.div
              className="relative h-[400px] lg:h-[520px] rounded-card overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/why-middlepark-interior.jpg"
                alt="MiddlePark interior — living room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Right — Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="accent-line" />
              <SectionHeader
                overline="Why MiddlePark"
                heading="We Build Homes That Keep Their Promise"
                subCopy="In a market where delays and disputes are common, MiddlePark delivers on time, on budget, and on paper."
              />

              <div className="mt-10 space-y-6">
                {whyMiddlePark.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="shrink-0 w-11 h-11 rounded-full bg-[#F2F2F7] flex items-center justify-center">
                      <item.icon size={22} className="text-green" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-sans text-charcoal text-sm font-semibold mb-1">
                        {item.title}
                      </h4>
                      <p className="text-charcoal-light text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. THE MIDDLEPARK DIFFERENCE — COMPARISON (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream" id="difference">
        <div className="middlepark-container">
          <div className="text-center mb-16">
            <span className="accent-line mx-auto" />
            <SectionHeader
              overline="The Difference"
              heading="Why Families Choose MiddlePark"
              align="center"
            />
          </div>

          <div className="space-y-4 max-w-[960px] mx-auto">
            {comparisonData.map((row, i) => (
              <motion.div
                key={row.aspect}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                {/* Typical Developer */}
                <div className="bg-[#F2F2F7] rounded-card p-6 border border-[#E5E5EA]">
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-light font-semibold mb-2">
                    {row.aspect} — Typical Developer
                  </p>
                  <div className="flex items-start gap-2.5">
                    <X size={16} className="text-charcoal-light shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-charcoal-light text-sm leading-relaxed">{row.typical}</p>
                  </div>
                </div>

                {/* With MiddlePark */}
                <div className="bg-white rounded-card p-6 border border-[#E5E5EA] border-t-2 border-t-green">
                  <p className="text-[10px] uppercase tracking-widest text-green font-semibold mb-2">
                    {row.aspect} — With MiddlePark
                  </p>
                  <div className="flex items-start gap-2.5">
                    <Check size={16} className="text-green shrink-0 mt-0.5" strokeWidth={2} />
                    <p className="text-charcoal text-sm leading-relaxed">{row.middlepark}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 6. CHAIRMAN'S MESSAGE (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="chairmans-message">
        <div className="middlepark-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[960px] mx-auto">
            {/* Left — Portrait */}
            <motion.div
              className="relative h-[400px] lg:h-[500px] rounded-card overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/team-member-1.jpg"
                alt="Engr. Adamu Yusuf — Chairman, MiddlePark Properties"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Right — Message */}
            <motion.div
              className="lg:border-l border-[#E5E5EA] lg:pl-12"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="accent-line" />
              <p className="overline text-green text-xs uppercase tracking-widest font-semibold mb-3">
                A Message from Our Chairman
              </p>
              <h2 className="font-cormorant text-charcoal-dark text-3xl lg:text-4xl font-bold leading-tight mb-8">
                Building Trust,<br />One Home at a Time
              </h2>

              <div className="space-y-5 text-charcoal-light text-base leading-relaxed font-cormorant italic text-[18px] lg:text-[20px]" style={{ lineHeight: 1.7 }}>
                <p>
                  When I founded MiddlePark Properties, I had one conviction — that Abuja&apos;s 
                  property market needed a developer whose word was their bond. Too many families 
                  had been let down by broken promises, unclear titles, and homes that fell short 
                  of what was sold on paper.
                </p>
                <p>
                  Today, every MiddlePark home is built on verified land, priced without hidden 
                  fees, and delivered to a standard we would live in ourselves. That is not a 
                  marketing promise — it is a personal guarantee.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E5EA]">
                <p className="font-sans text-charcoal-dark text-sm font-semibold">
                  Engr. Adamu Yusuf
                </p>
                <p className="font-sans text-charcoal-light text-xs mt-0.5">
                  Managing Director & Chairman, MiddlePark Properties Limited
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. OUR PROCESS — TIMELINE (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F2F2F7]" id="process">
        <div className="middlepark-container">
          <div className="text-center mb-16">
            <span className="accent-line mx-auto" />
            <SectionHeader
              overline="How We Work"
              heading="From Enquiry to Keys in Hand"
              subCopy="A clear, structured process — so you always know exactly where things stand."
              align="center"
            />
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-5 left-0 right-0 h-[1px] bg-[#E5E5EA]" />
              
              <div className="grid grid-cols-5 gap-6 relative">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    {/* Circle */}
                    <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center text-sm font-bold relative z-10 ${
                      i === 0 
                        ? 'bg-green text-white' 
                        : 'bg-white border-2 border-[#E5E5EA] text-charcoal-light'
                    }`}>
                      {step.number}
                    </div>
                    <h4 className="font-sans text-charcoal text-sm font-semibold mt-4 mb-2">
                      {step.title}
                    </h4>
                    <p className="text-charcoal-light text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline — Vertical */}
          <div className="lg:hidden space-y-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    i === 0 
                      ? 'bg-green text-white' 
                      : 'bg-white border-2 border-[#E5E5EA] text-charcoal-light'
                  }`}>
                    {step.number}
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="w-[1px] h-full bg-[#E5E5EA] mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h4 className="font-sans text-charcoal text-sm font-semibold mb-1">
                    {step.title}
                  </h4>
                  <p className="text-charcoal-light text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 8. ALTERNATING SHOWCASES */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream" id="showcases">
        {/* Showcase 1 — Interior */}
        <div className="section-padding">
          <div className="middlepark-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="accent-line" />
                <SectionHeader
                  overline="Interiors"
                  heading="Designed for Living, Not Just Showing"
                />
                <p className="text-charcoal-light text-base mt-4 leading-relaxed mb-6">
                  Every MiddlePark home comes finished to move-in standard. High-grade porcelain
                  tiles, solid hardwood kitchen cabinets, and integrated smart-home rough-ins
                  throughout.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    'High-grade porcelain tiles in all rooms',
                    'Solid hardwood kitchen cabinetry',
                    'Smart-home wiring rough-in',
                    'UPVC double-glazed windows',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-green shrink-0" strokeWidth={2} />
                      <span className="text-charcoal text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="primary" href="/developments">
                  EXPLORE DEVELOPMENTS <ArrowRight size={14} />
                </Button>
              </motion.div>

              <motion.div
                className="relative h-[380px] lg:h-[480px] rounded-card overflow-hidden"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Image
                  src="/images/interior-living-room.jpg"
                  alt="MiddlePark interior — modern living room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Showcase 2 — Community (reversed) */}
        <div className="section-padding bg-white">
          <div className="middlepark-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                className="relative h-[380px] lg:h-[480px] rounded-card overflow-hidden order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src="/images/interior-kitchen.jpg"
                  alt="MiddlePark kitchen — modern fitted kitchen"
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
                <span className="accent-line" />
                <SectionHeader
                  overline="Community"
                  heading="Neighbourhoods That Work For You"
                />
                <p className="text-charcoal-light text-base mt-4 leading-relaxed mb-6">
                  We build in established neighbourhoods with existing infrastructure — tarred
                  roads, reliable power connections, and proximity to schools, hospitals, and
                  retail.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: MapPin, label: 'Established locations' },
                    { icon: Home, label: 'Gated communities' },
                    { icon: TreePine, label: 'Green surroundings' },
                    { icon: Shield, label: '24/7 security' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center">
                        <item.icon size={16} className="text-green" strokeWidth={1.5} />
                      </div>
                      <span className="text-charcoal text-xs font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
                <Button variant="primary" href="/about">
                  ABOUT MIDDLEPARK <ArrowRight size={14} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 9. NEIGHBOURHOOD GUIDE (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="neighbourhoods">
        <div className="middlepark-container">
          <div className="text-center mb-16">
            <span className="accent-line mx-auto" />
            <SectionHeader
              overline="Where We Build"
              heading="Abuja's Most Established Neighbourhoods"
              subCopy="We develop exclusively in locations with existing infrastructure, proven land titles, and strong property appreciation."
              align="center"
            />
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
                className="group border border-[#E5E5EA] rounded-card overflow-hidden bg-white"
                variants={staggerItem}
              >
                <div className="relative h-[260px] overflow-hidden">
                  <Image
                    src={area.image}
                    alt={`${area.name} — MiddlePark development area`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-cormorant text-charcoal-dark text-2xl font-bold mb-1">
                    {area.name}
                  </h3>
                  <p className="text-green text-[11px] uppercase tracking-widest font-semibold mb-3">
                    {area.tagline}
                  </p>
                  <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-[#F2F2F7] rounded-badge text-charcoal text-xs font-medium">
                    {area.developments} Active Development{area.developments > 1 ? 's' : ''}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 10. INTERIOR GALLERY — FULL-WIDTH (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-cream" id="interior-gallery">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {/* Large left */}
          <div className="relative col-span-2 row-span-2 h-[400px] lg:h-[560px]">
            <Image
              src="/images/interior-living-room.jpg"
              alt="MiddlePark living room interior"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute top-6 left-6">
              <p className="overline text-white/70 text-xs uppercase tracking-widest">
                Crafted Interiors
              </p>
            </div>
          </div>
          {/* Top right */}
          <div className="relative h-[200px] lg:h-[278px]">
            <Image
              src="/images/interior-kitchen.jpg"
              alt="MiddlePark kitchen"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          {/* Mid right */}
          <div className="relative h-[200px] lg:h-[278px]">
            <Image
              src="/images/interior-bathroom.jpg"
              alt="MiddlePark bathroom"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </div>
          {/* Bottom wide with CTA overlay */}
          <div className="relative col-span-2 h-[200px] lg:h-[278px]">
            <Image
              src="/images/interior-master-bedroom.jpg"
              alt="MiddlePark master bedroom"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/70 to-transparent flex items-end justify-end p-6">
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
      {/* 11. TESTIMONIALS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F2F2F7]" id="testimonials">
        <div className="middlepark-container">
          <div className="text-center mb-14">
            <span className="accent-line mx-auto" />
            <SectionHeader
              overline="What Our Clients Say"
              heading="Trusted by Homeowners Across Abuja"
              align="center"
            />
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
                className="bg-white rounded-card p-6 lg:p-8 relative border border-[#E5E5EA]"
                style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.04)' }}
                variants={staggerItem}
              >
                {/* Decorative quote mark */}
                <Quote 
                  size={48} 
                  className="absolute top-4 right-4 text-[#E5E5EA]" 
                  strokeWidth={1} 
                />

                {/* Stars — Muted Gold */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#C7A84E] fill-[#C7A84E]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-charcoal text-sm leading-relaxed mb-6 relative">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-avatar overflow-hidden bg-[#F2F2F7] border border-[#E5E5EA] shrink-0">
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
      {/* 12. SCHEDULE A VISIT CTA (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white" id="schedule-visit">
        <div className="max-w-[960px] mx-auto px-6 lg:px-8">
          <motion.div
            className="bg-[#F2F2F7] rounded-[16px] p-8 lg:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="accent-line" />
                <p className="overline text-green text-xs uppercase tracking-widest font-semibold mb-3">
                  Visit Us
                </p>
                <h2 className="font-cormorant text-charcoal-dark text-3xl lg:text-4xl font-bold leading-tight mb-4">
                  See It For Yourself
                </h2>
                <p className="text-charcoal-light text-base leading-relaxed mb-8">
                  Book a private tour of any MiddlePark development. Walk the grounds, inspect the 
                  finishes, and speak directly with our construction team on site.
                </p>
                <Button variant="primary" size="lg" href="/contact">
                  <CalendarDays size={16} /> SCHEDULE A SITE VISIT
                </Button>
                <p className="text-charcoal-light text-sm mt-4 flex items-center gap-2">
                  <Phone size={14} className="text-charcoal-light" />
                  Or call us directly: +234 901 234 5678
                </p>
              </div>
              <div className="relative h-[280px] lg:h-[320px] rounded-card overflow-hidden hidden lg:block">
                <Image
                  src="/images/contact-abuja-skyline.jpg"
                  alt="MiddlePark sales office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 13. TRUST & CERTIFICATIONS BAR (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-[#E5E5EA] py-12 px-6 lg:px-8" id="certifications">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-charcoal-light text-xs uppercase tracking-widest font-semibold mb-8">
            Verified. Approved. Certified.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <cert.icon size={20} className="text-charcoal-light" strokeWidth={1.5} />
                <span className="text-charcoal-light text-xs uppercase tracking-wider font-medium">
                  {cert.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 14. PRESS & RECOGNITION (NEW) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 lg:px-8 bg-cream" id="press">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-charcoal-light text-[10px] uppercase tracking-widest font-semibold mb-8">
            As Seen In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {pressLogos.map((name) => (
              <span
                key={name}
                className="font-cormorant text-charcoal-light/40 text-lg lg:text-xl font-bold hover:text-charcoal-light transition-colors duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 15. WAITLIST CTA */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32" id="waitlist-cta">
        {/* Background */}
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
            className="max-w-[640px] mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="overline text-white/50 text-xs uppercase tracking-widest mb-4">
              Stay Updated
            </p>
            <h2 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Be the First to Know
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10 font-sans">
              Get early access to new developments, pricing, and availability before they go
              public. No spam — just the updates that matter.
            </p>

            {/* Email Form */}
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3.5 rounded-full bg-white/8 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
                id="waitlist-email"
              />
              <button
                type="submit"
                className="bg-white text-green px-6 py-3.5 rounded-full text-nav font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-all duration-200 shrink-0"
                id="waitlist-submit"
              >
                JOIN WAITLIST <Mail size={14} />
              </button>
            </form>

            <p className="text-white/25 text-xs mt-4">
              By joining, you agree to receive MiddlePark updates. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
