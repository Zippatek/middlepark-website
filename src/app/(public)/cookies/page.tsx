import React from 'react'

export const metadata = {
  title: 'Cookie Policy | MiddlePark Properties',
  description: 'How MiddlePark Properties Limited uses cookies and similar technologies on our website.',
}

export default function CookiesPage() {
  return (
    <div className="w-full bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-charcoal-dark py-24 lg:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-green text-xs uppercase tracking-widest font-semibold mb-4">Legal</p>
          <h1 className="font-cormorant text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Cookie Policy
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
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">1. What Are Cookies</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help the website
              remember your preferences and improve your browsing experience. This policy explains how MiddlePark
              Properties Limited (&quot;MiddlePark&quot;) uses cookies on our website.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">2. How We Use Cookies</h2>
            <p className="text-charcoal-light text-sm leading-relaxed mb-4">
              We use the following types of cookies:
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-[12px] p-5 border border-cream-divider">
                <h3 className="text-charcoal text-sm font-semibold mb-2">Essential Cookies</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  Required for the website to function properly. These include authentication cookies for the client
                  portal, session management, and security tokens. You cannot opt out of these cookies.
                </p>
              </div>

              <div className="bg-white rounded-[12px] p-5 border border-cream-divider">
                <h3 className="text-charcoal text-sm font-semibold mb-2">Functional Cookies</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  Help us remember your preferences, such as language settings and display options. These cookies
                  enhance your experience but are not strictly necessary.
                </p>
              </div>

              <div className="bg-white rounded-[12px] p-5 border border-cream-divider">
                <h3 className="text-charcoal text-sm font-semibold mb-2">Analytics Cookies</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  Help us understand how visitors use our website by collecting anonymous usage data. This information
                  helps us improve our website and services. We may use third-party analytics services.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">3. Third-Party Cookies</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              Some cookies on our website are placed by third-party services we use, such as Google Analytics
              and embedded map services. These third parties have their own privacy and cookie policies, which
              we encourage you to review.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">4. Managing Cookies</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              Most web browsers allow you to control cookies through their settings. You can set your browser
              to refuse cookies, delete existing cookies, or alert you before a cookie is placed. Please note
              that disabling essential cookies may affect the functionality of our website, particularly the
              client portal.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">5. Cookie Retention</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              Session cookies are deleted when you close your browser. Persistent cookies remain on your device
              for a set period (typically up to 12 months) or until you delete them. Authentication cookies for
              the client portal are retained for up to 30 days.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">6. Updates to This Policy</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              We may update this Cookie Policy from time to time. Changes will be posted on this page with
              an updated &quot;Last updated&quot; date.
            </p>
          </div>

          <div>
            <h2 className="font-cormorant text-charcoal text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-charcoal-light text-sm leading-relaxed">
              If you have questions about our use of cookies, contact us at:
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
