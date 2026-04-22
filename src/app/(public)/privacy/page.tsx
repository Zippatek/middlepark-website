import React from 'react'
import { SectionHeader } from '@/components/ui'

export const metadata = {
  title: 'Privacy Policy | MiddlePark Properties',
  description: 'How MiddlePark Properties Limited collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal-dark py-24 lg:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-green text-xs uppercase tracking-widest font-semibold mb-4">Legal</p>
          <h1 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm">
            Last updated: April 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[800px] mx-auto px-6 py-16 lg:py-20">
        <div className="prose-mp space-y-10">
          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              MiddlePark Properties Limited (&quot;MiddlePark&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting
              your personal information. This Privacy Policy explains how we collect, use, store, and safeguard
              information when you visit our website, use our client portal, or interact with our services.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="text-charcoal-light text-sm leading-relaxed mb-3">
              We may collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside text-charcoal-light text-sm leading-relaxed space-y-2 ml-2">
              <li><strong className="text-charcoal">Contact Information:</strong> Full name, email address, phone number, and postal address</li>
              <li><strong className="text-charcoal">Account Details:</strong> Login credentials for the client portal</li>
              <li><strong className="text-charcoal">Transaction Data:</strong> Payment records, property purchase details, and financial information</li>
              <li><strong className="text-charcoal">Communication Data:</strong> Enquiries, feedback, and correspondence with our team</li>
              <li><strong className="text-charcoal">Usage Data:</strong> How you interact with our website and portal, including IP address and browser type</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-charcoal-light text-sm leading-relaxed space-y-2 ml-2">
              <li>To process property enquiries and transactions</li>
              <li>To manage your client portal account and provide updates on your property</li>
              <li>To communicate construction progress, payment schedules, and important notices</li>
              <li>To respond to your enquiries and provide customer support</li>
              <li>To comply with legal and regulatory obligations</li>
              <li>To improve our website, services, and customer experience</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">4. Data Protection</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal data against
              unauthorised access, alteration, disclosure, or destruction. This includes encryption, secure server
              infrastructure, and access controls. We retain your data only for as long as necessary to fulfil the
              purposes outlined in this policy or as required by law.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">5. Third-Party Sharing</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              We do not sell or rent your personal information. We may share data with trusted service providers
              (such as payment processors, legal advisors, and cloud hosting services) who assist in delivering
              our services, subject to strict confidentiality agreements. We may also disclose information when
              required by law or to protect our legal rights.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-charcoal-light text-sm leading-relaxed mb-3">
              In accordance with the Nigeria Data Protection Regulation (NDPR), you have the right to:
            </p>
            <ul className="list-disc list-inside text-charcoal-light text-sm leading-relaxed space-y-2 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Withdraw consent for data processing</li>
              <li>Lodge a complaint with the National Information Technology Development Agency (NITDA)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              For questions about this Privacy Policy or to exercise your data protection rights, contact us at:
            </p>
            <div className="mt-4 bg-white rounded-[12px] p-6 border border-cream-divider">
              <p className="text-charcoal text-sm font-medium">MiddlePark Properties Limited</p>
              <p className="text-charcoal-light text-sm mt-1">No. 72 Ahmadu Bello Way, Central Business District, Abuja</p>
              <p className="text-charcoal-light text-sm mt-1">Email: info@middleparkproperties.com</p>
              <p className="text-charcoal-light text-sm mt-1">Phone: 0805 526 9579</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
