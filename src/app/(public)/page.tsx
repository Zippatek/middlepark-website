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
    quote: 'I\'ve bought from three developers in Abuja. MiddlePark is the only one that delivered exactly what was promised—no hidden charges, no delays, no stories.',
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

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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
      {/* HERO SECTION */}
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
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-16">
          <motion.p
            className="overline text-white/80 text-xs uppercase tracking-widest mb-4"
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={fadeUp}
          >
            Abuja&apos;s Defining Developer
          </motion.p>
          <motion.h1
            className="font-cormorant text-white font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(52px, 7vw, 88px)' }}
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
            className="text-white text-lg max-w-[540px] mb-10 leading-relaxed font-sans"
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
          <span className="text-white/50 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-8 bg-white/30 relative overflow-hidden">
            <motion.div
              className="w-full h-3 bg-white/70"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* STATS BAR */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal-dark py-16 px-6 lg:px-8" id="stats-bar">
        <div className="max-w-[1320px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
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
              <p className="text-white/75 text-sm mt-2 font-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FEATURED DEVELOPMENTS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-cream" id="featured-developments">
        <div className="middlepark-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              overline="Our Developments"
              heading="Carefully Crafted Estates"
              subCopy="Every MiddlePark development is title-verified before we break ground. Browse our latest projects."
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
      {/* WHY MIDDLEPARK */}
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
              {/* Floating badge */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2.5 rounded-badge"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 20px rgba(237, 27, 36, 0.15)',
                }}
              >
                <Award size={18} className="text-green" strokeWidth={2} />
                <span className="text-charcoal text-xs font-semibold">
                  MiddlePark Certified Quality
                </span>
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
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
                    <div className="shrink-0 w-11 h-11 rounded-container bg-green-tint flex items-center justify-center">
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
      {/* ALTERNATING SHOWCASES */}
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
                    'Premium porcelain tiles in all rooms',
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

        {/* Showcase 2 — Kitchen (reversed) */}
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
                <SectionHeader
                  overline="Community"
                  heading="Neighbourhoods That Work For You"
                />
                <p className="text-charcoal-light text-base mt-4 leading-relaxed mb-6">
                  We build in established neighbourhoods with existing infrastructure — tarred
                  roads, reliable power connections, and proximity to schools, hospitals, and
                  shopping.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: MapPin, label: 'Established locations' },
                    { icon: Home, label: 'Gated communities' },
                    { icon: TreePine, label: 'Green surroundings' },
                    { icon: Shield, label: '24/7 security' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-tint flex items-center justify-center">
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
      {/* TESTIMONIALS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-green-tint" id="testimonials">
        <div className="middlepark-container">
          <SectionHeader
            overline="What Our Clients Say"
            heading="Trusted by Homeowners Across Abuja"
            align="center"
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                className="bg-white rounded-card p-6 lg:p-8 relative"
                style={{ boxShadow: '0 4px 24px rgba(237, 27, 36, 0.06)' }}
                variants={staggerItem}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-[#D97706] fill-[#D97706]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-charcoal text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-avatar overflow-hidden bg-green-tint shrink-0">
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
      {/* WAITLIST CTA */}
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
          <div className="absolute inset-0 bg-charcoal-dark/90" />
        </div>

        <div className="relative z-10 middlepark-container px-6 lg:px-8">
          <motion.div
            className="max-w-[640px] mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="overline text-white/70 text-xs uppercase tracking-widest mb-4">
              Stay Updated
            </p>
            <h2 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Be the First to Know
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-10 font-sans">
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
                className="flex-1 px-4 py-3.5 rounded-full bg-white/15 border border-white/30 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
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

            <p className="text-white/40 text-xs mt-4">
              By joining, you agree to receive MiddlePark updates. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
