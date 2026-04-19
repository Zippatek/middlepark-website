'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ChevronRight,
  Send,
  CheckCircle2,
  Building2,
} from 'lucide-react'
import { Button, SectionHeader } from '@/components/ui'

// ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

// ─── OFFICE DATA ────────────────────────────────────────────────────────────
const offices = [
  {
    name: 'Head Office — Wuse II',
    address: 'Plot 1234, Aminu Kano Crescent, Wuse II, Abuja',
    phone: '+234 901 234 5678',
    email: 'hello@middleparkproperties.com',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM',
    isPrimary: true,
  },
  {
    name: 'Sales Office — Dakibiyu',
    address: 'Dakibiyu Estate Site Office, Dakibiyu District, Abuja',
    phone: '+234 901 234 5679',
    email: 'sales@middleparkproperties.com',
    hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
    isPrimary: false,
  },
  {
    name: 'Client Centre — Maitama',
    address: 'Plot 456, Maitama District, Abuja',
    phone: '+234 901 234 5680',
    email: 'clients@middleparkproperties.com',
    hours: 'Mon – Fri: 9:00 AM – 5:00 PM',
    isPrimary: false,
  },
]

const developments = [
  'Select a development',
  'Dakibiyu Estate Phase 2',
  'Katampe Heights',
  'Apo Residences',
  'Maitama Gardens',
  'Gwarinpa Terraces',
  'Dakibiyu Estate Phase 3',
  'Not sure yet',
]

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-navbar" id="contact-hero">
        <div className="relative h-[350px] lg:h-[420px]">
          <Image
            src="/images/contact-abuja-skyline.jpg"
            alt="Abuja skyline"
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
                  Get in Touch
                </p>
                <h1 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  We&apos;d Like to Hear From You
                </h1>
                <p className="text-white/60 text-base max-w-[540px] leading-relaxed font-sans">
                  Whether you&apos;re ready to purchase or just exploring, our team is here to help.
                  Reach out through any of the channels below.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OFFICE CARDS ═══ */}
      <section className="section-padding bg-white" id="offices">
        <div className="middlepark-container">
          <div className="mb-12">
            <span className="accent-line" />
            <SectionHeader
              overline="Our Offices"
              heading="Visit Us in Person"
              subCopy="Walk into any of our offices across Abuja for a face-to-face conversation with our sales and client relations team."
            />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {offices.map((office) => (
              <motion.div
                key={office.name}
                className="bg-cream rounded-card p-6 lg:p-8 border border-[#E5E5EA] hover:shadow-card-hover transition-shadow duration-300"
                style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.04)' }}
                variants={staggerItem}
              >
                {office.isPrimary && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge bg-green text-white text-[10px] font-semibold uppercase tracking-wide mb-4">
                    <Building2 size={10} /> HEAD OFFICE
                  </span>
                )}
                <h3 className="font-cormorant text-charcoal-dark text-lg font-bold mb-4">
                  {office.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-green shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-charcoal-light text-sm">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-green shrink-0" strokeWidth={1.5} />
                    <a href={`tel:${office.phone}`} className="text-charcoal text-sm hover:text-green transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-green shrink-0" strokeWidth={1.5} />
                    <a href={`mailto:${office.email}`} className="text-charcoal text-sm hover:text-green transition-colors">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-green shrink-0" strokeWidth={1.5} />
                    <span className="text-charcoal-light text-sm">{office.hours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT FORM + MAP ═══ */}
      <section className="section-padding bg-cream" id="contact-form">
        <div className="middlepark-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="accent-line" />
              <SectionHeader
                overline="Send a Message"
                heading="Enquire About a Development"
                subCopy="Fill out the form below and our team will get back to you within 24 hours."
              />

              {formSubmitted ? (
                <motion.div
                  className="mt-8 bg-[#F2F2F7] rounded-card p-8 text-center border border-[#E5E5EA]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2 size={48} className="text-green mx-auto mb-4" />
                  <h3 className="font-cormorant text-charcoal-dark text-2xl font-bold mb-2">
                    Message Sent
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    Thank you for reaching out. A member of our team will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="mp-label">Full Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        placeholder="Your full name"
                        required
                        className="mp-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="mp-label">Phone Number</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        placeholder="+234 ..."
                        required
                        className="mp-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mp-label">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder="you@example.com"
                      required
                      className="mp-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-development" className="mp-label">Development of Interest</label>
                    <select
                      id="contact-development"
                      className="mp-input cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a development</option>
                      {developments.slice(1).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mp-label">Message</label>
                    <textarea
                      id="contact-message"
                      placeholder="Tell us what you&apos;re looking for..."
                      rows={4}
                      className="mp-input resize-none"
                    />
                  </div>

                  <Button variant="primary" size="lg" type="submit" fullWidth>
                    SEND MESSAGE <Send size={14} />
                  </Button>

                  <p className="text-charcoal-light text-xs text-center mt-3">
                    By submitting, you agree to our privacy policy. We will not share your information.
                  </p>
                </form>
              )}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="sticky top-[120px]">
                {/* Map Placeholder */}
                <div className="h-[400px] lg:h-[500px] rounded-card bg-[#F2F2F7] flex items-center justify-center border border-[#E5E5EA] mb-6">
                  <div className="text-center">
                    <MapPin size={48} className="text-charcoal-light/30 mx-auto mb-3" />
                    <p className="text-charcoal text-sm font-medium">Interactive Map</p>
                    <p className="text-charcoal-light text-xs mt-1">Coming soon — Wuse II, Abuja</p>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/2349012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-card bg-[#25D366] text-white font-medium text-sm transition-all duration-200 hover:bg-[#1fbc57] hover:shadow-lg"
                  id="whatsapp-cta"
                >
                  <MessageCircle size={20} />
                  Chat With Us on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
