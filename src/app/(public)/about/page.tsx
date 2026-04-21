'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Shield,
  FileCheck,
  Building2,
  Users,
  Award,
  Target,
  Heart,
  Eye,
  ArrowRight,
} from 'lucide-react'
import { Button, SectionHeader } from '@/components/ui'
import type { TeamMember } from '@/types'

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
  visible: { transition: { staggerChildren: 0.12 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const values = [
  {
    icon: Shield,
    title: 'Integrity First',
    description:
      'Every material is tested, every promise kept. We build trust by being transparent — from specifications to timelines.',
  },
  {
    icon: Building2,
    title: 'Built to Outlast',
    description:
      'We use quality building materials to give premium finishing.',
  },
  {
    icon: FileCheck,
    title: 'Transparency Always',
    description:
      'No hidden charges. No development levies at handover. The price you see is the price you pay.',
  },
  {
    icon: Heart,
    title: 'Community Centred',
    description:
      'Every estate is planned as a complete neighbourhood — with green spaces, shared amenities, internal roads, and security infrastructure built in from day one.',
  },
  {
    icon: Target,
    title: 'Deliberate Design',
    description:
      'Every space is tested for real life — storage, natural light, cross-ventilation, and family flow.',
  },
  {
    icon: Eye,
    title: 'Accountable Delivery',
    description:
      'Track your construction from your phone. Real-time updates, not excuses. Every milestone, documented.',
  },
]

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Aminu S Muhammad',
    title: 'Managing Director & CEO',
    bio: 'Managing Director of MiddlePark Properties. Aminu has extensive experience in real estate development, leading the delivery of quality-built homes and commercial properties across Nigeria.',
    avatar: '/images/aminu.jpg',
    linkedin: 'https://www.linkedin.com/in/aminu-s-muhammad',
  },
  {
    id: '2',
    name: 'Arc. Halima Bello',
    title: 'Head of Design & Architecture',
    bio: 'A TOPREC-certified architect with a passion for functional, beautiful spaces. Halima oversees every design detail from concept to handover.',
    avatar: '/images/team-member-2.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'Barr. Chinedu Ikechukwu',
    title: 'Head of Quality & Compliance',
    bio: 'Chinedu leads our quality control process, ensuring every building material meets our rigorous structural and finishing standards.',
    avatar: '/images/avatar-default.jpg',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '4',
    name: 'Mrs. Nkechi Obi',
    title: 'Head of Client Relations',
    bio: 'Nkechi ensures every MiddlePark client receives clear communication, prompt updates, and a handover experience that exceeds expectations.',
    avatar: '/images/avatar-default.jpg',
    linkedin: 'https://linkedin.com',
  },
]

const stats = [
  { number: '12+', label: 'Completed Developments' },
  { number: '300+', label: 'Units Delivered' },
  { number: '2,500+', label: 'Happy Homeowners' },
  { number: '8', label: 'Years in Nigeria' },
]

export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-navbar-offset" id="about-hero">
        <div className="relative h-[400px] lg:h-[500px]">
          <Image
            src="/images/about-hero-estate.jpg"
            alt="MiddlePark Estate — Overview"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-16 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="overline text-white/50 text-xs uppercase tracking-widest mb-3">
                  Our Story
                </p>
                <h1 className="font-cormorant text-white text-4xl lg:text-6xl font-bold leading-tight mb-4">
                  Built With Intention.
                  <br />
                  Priced With Purpose.
                </h1>
                <p className="text-white/60 text-base lg:text-lg max-w-[540px] leading-relaxed font-sans">
                  MiddlePark Properties was founded on a simple belief — that Nigeria deserves a
                  developer you can trust. One that delivers what it promises, on time and on paper.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className="section-padding bg-white" id="our-story">
        <div className="middlepark-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeader
                overline="Who We Are"
                heading="A Developer That Delivers"
              />
              <div className="mt-6 space-y-4 text-charcoal-light text-base leading-relaxed">
                <p>
                  MiddlePark Properties Limited was established in 2018 with one clear mission — to build
                  homes across Nigeria that families can trust. In a market where structural compromises,
                  poor finishes, and hidden fees had become the norm, we set out to do things differently.
                </p>
                <p>
                  Every MiddlePark development starts with rigorous material testing. Before any
                  foundation is laid, our engineering team confirms structural integrity and
                  material quality. This is not a feature — it is a requirement. No MiddlePark home
                  will ever face a structural compromise.
                </p>
                <p>
                  Today, we have delivered over 800 units across 12 developments in Nigeria&apos;s
                  most established neighbourhoods. And we are just getting started.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[400px] lg:h-[480px] rounded-card overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Image
                src="/images/why-middlepark-interior.jpg"
                alt="MiddlePark finished interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute bottom-4 left-4 px-4 py-2.5 rounded-badge"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                }}
              >
                <span className="text-charcoal text-xs font-semibold">
                  Est. 2018 · Nigeria
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="section-padding bg-cream" id="values">
        <div className="middlepark-container">
          <div className="text-center mb-14">
            <SectionHeader
              overline="Our Values"
              heading="What We Stand For"
              subCopy="These are not slogans. They are the standards behind every project we take on, every team we build, and every decision we make."
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
            {values.map((value) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-card p-6 lg:p-8 border border-[#E5E5EA] transition-shadow duration-300 hover:shadow-card-hover"
                style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.04)' }}
                variants={staggerItem}
              >
                <div className="w-12 h-12 rounded-full bg-[#F2F2F7] flex items-center justify-center mb-5">
                  <value.icon size={24} className="text-green" strokeWidth={1.5} />
                </div>
                <h3 className="font-cormorant text-charcoal text-xl font-bold mb-2">
                  {value.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="section-padding bg-white" id="team">
        <div className="middlepark-container">
          <div className="text-center mb-14">
            <SectionHeader
              overline="Our Team"
              heading="The People Behind MiddlePark"
              subCopy="A team of engineers, architects, and quality control professionals — all committed to delivering exceptional, refined homes."
              align="center"
            />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="bg-[#F2F2F7] rounded-card overflow-hidden group border border-[#E5E5EA]"
                variants={staggerItem}
              >
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={member.avatar || '/images/avatar-default.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-cormorant text-charcoal-dark text-lg font-bold">
                    {member.name}
                  </h4>
                  <p className="text-green text-xs font-medium uppercase tracking-wide mt-0.5 mb-3">
                    {member.title}
                  </p>
                  <p className="text-charcoal-light text-xs leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="bg-[#1C1C1E] py-16 px-6 lg:px-8" id="about-stats">
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

      {/* ═══ CTA ═══ */}
      <section className="section-padding bg-cream" id="about-cta">
        <div className="middlepark-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              overline="Get Started"
              heading="Find Your MiddlePark Home"
              subCopy="Browse our developments, explore available units, and speak to our team about your next home."
              align="center"
            />
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button variant="primary" size="lg" href="/developments">
                VIEW DEVELOPMENTS <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                CONTACT US
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
