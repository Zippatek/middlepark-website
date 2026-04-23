'use client'
export const dynamic = 'force-dynamic'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { adminCreateDevelopment } from '@/lib/api'
import DevelopmentForm from '../_form'

export default function NewDevelopmentPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    if (!session?.accessToken) throw new Error('No session')
    const res = await adminCreateDevelopment(session.accessToken as string, data)
    if (!res.success) throw new Error(res.error || 'Create failed')
    router.push('/admin/developments')
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-cormorant text-charcoal text-3xl font-bold mb-6">New Development</h1>
      <DevelopmentForm onSubmit={handleSubmit} submitLabel="Create Development" />
    </div>
  )
}
