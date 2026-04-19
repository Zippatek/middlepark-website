import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MiddlePark Properties Limited — Building to Serve Generations',
    template: '%s | MiddlePark Properties',
  },
  description:
    'MiddlePark Properties builds carefully crafted estates across Abuja\'s most sought-after neighbourhoods. Every unit is designed to last. Every title is clean.',
  keywords: [
    'MiddlePark Properties',
    'Abuja real estate',
    'property developer Abuja',
    'estates in Abuja',
    'terrace duplex Abuja',
    'buy property Abuja Nigeria',
    'Dakibiyu estate',
    'Katampe property',
    'Apo residences',
  ],
  openGraph: {
    title: 'MiddlePark Properties Limited',
    description:
      'Built with intention. Priced with purpose. Building to Serve Generations.',
    siteName: 'MiddlePark Properties',
    locale: 'en_NG',
    type: 'website',
  },
}

import { CustomCursor } from '@/components/ui/CustomCursor'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-cream text-charcoal">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
