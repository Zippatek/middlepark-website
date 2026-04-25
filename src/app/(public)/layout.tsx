import React from 'react'
import { PublicNavbar } from '@/components/layout/PublicNavbar'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PublicNavbar />
      <main className="min-h-screen">{children}</main>
      <PublicFooter />
      <ScrollToTopButton />
    </>
  )
}
