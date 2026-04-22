import React from 'react'

export const metadata = {
  title: 'Terms of Service | MiddlePark Properties',
  description: 'Terms and conditions governing the use of MiddlePark Properties website and services.',
}

export default function TermsPage() {
  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal-dark py-24 lg:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-green text-xs uppercase tracking-widest font-semibold mb-4">Legal</p>
          <h1 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Terms of Service
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
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              By accessing and using the MiddlePark Properties Limited (&quot;MiddlePark&quot;) website and client portal,
              you agree to be bound by these Terms of Service. If you do not agree with any part of these terms,
              please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">2. Services Description</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              MiddlePark provides a website and client portal for viewing property developments, submitting enquiries,
              managing property purchases, tracking construction progress, and accessing property-related documents.
              The information on our website is for general informational purposes and does not constitute a binding
              offer or contract.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">3. User Accounts</h2>
            <p className="text-charcoal-light text-sm leading-relaxed mb-3">
              When you create a client portal account:
            </p>
            <ul className="list-disc list-inside text-charcoal-light text-sm leading-relaxed space-y-2 ml-2">
              <li>You are responsible for maintaining the confidentiality of your login credentials</li>
              <li>You agree to provide accurate and current information</li>
              <li>You must notify us immediately of any unauthorised access to your account</li>
              <li>MiddlePark reserves the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">4. Property Information</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              While we make every effort to ensure accuracy, property details, pricing, floor plans, and availability
              shown on our website are subject to change without notice. All property purchases are governed by
              separate sale agreements. Images and renders are for illustration purposes and may differ from the
              final delivered product in minor details.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">5. Payment Terms</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              Payment schedules, amounts, and terms are outlined in individual sale agreements between MiddlePark
              and the buyer. The payment information displayed on the client portal is for reference and tracking
              purposes. All payments should be made to the official MiddlePark bank accounts as provided in your
              sale agreement.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              All content on this website — including text, images, logos, designs, and software — is the property
              of MiddlePark Properties Limited and is protected by copyright and intellectual property laws. You may
              not reproduce, distribute, or use any content without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              MiddlePark shall not be liable for any indirect, incidental, or consequential damages arising from
              the use of our website or services. Our liability is limited to the extent permitted by Nigerian law.
              We do not guarantee uninterrupted or error-free access to our website or portal.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">8. Governing Law</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of the Federal
              Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive
              jurisdiction of the courts in the Federal Capital Territory, Abuja.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">9. Changes to Terms</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              MiddlePark reserves the right to update these Terms of Service at any time. Changes will be posted
              on this page with an updated &quot;Last updated&quot; date. Continued use of our services after changes
              constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">10. Contact</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              For questions about these Terms of Service, contact us at:
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
