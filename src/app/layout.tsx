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
    'MiddlePark Properties builds carefully crafted estates across Nigeria\'s most sought-after neighbourhoods. Every unit is designed to last. Every title is clean.',
  keywords: [
    'MiddlePark Properties',
    'Nigeria real estate',
    'property developer Nigeria',
    'estates in Abuja',
    'property Lagos',
    'buy property Nigeria',
    'Dakibiyu estate',
    'Katampe property',
    'real estate Kano',
    'Port Harcourt property',
  ],
  openGraph: {
    title: 'MiddlePark Properties Limited',
    description:
      'Built with intention. Priced with purpose. Building to Serve Generations.',
    siteName: 'MiddlePark Properties',
    locale: 'en_NG',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

import { Providers } from '@/components/Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-cream text-charcoal">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
