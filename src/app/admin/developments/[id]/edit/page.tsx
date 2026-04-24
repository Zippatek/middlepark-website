'use client'
export const dynamic = 'force-dynamic'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { adminGetDevelopment, adminUpdateDevelopment } from '@/lib/api'
import DevelopmentForm from '../../_form'

export default function EditDevelopmentPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [dev, setDev] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.accessToken || !id) return
    adminGetDevelopment(session.accessToken as string, id)
      .then(r => { if (r.success) setDev(r.data) })
      .finally(() => setLoading(false))
  }, [session, id])

  const handleSubmit = async (data: any) => {
    if (!session?.accessToken) throw new Error('No session')
    const res = await adminUpdateDevelopment(session.accessToken as string, id, data)
    if (!res.success) throw new Error(res.error || 'Update failed')
    router.push('/admin/developments')
  }

  if (loading) return <div className="text-charcoal-light text-sm">Loading…</div>
  if (!dev) return <div className="text-charcoal-light text-sm">Development not found.</div>

  return (
    <div className="max-w-4xl">
      <h1 className="font-cormorant text-charcoal text-3xl font-bold mb-6">Edit Development</h1>
      <DevelopmentForm
        initial={{
          id: dev.id,
          name: dev.name,
          tagline: dev.tagline,
          description: dev.description,
          status: (dev.status || 'for-sale').toLowerCase().replace('_', '-'),
          location: dev.location,
          neighborhood: dev.neighborhood,
          city: dev.city,
          latitude: dev.latitude,
          longitude: dev.longitude,
          priceFrom: String(dev.priceFrom ?? ''),
          priceTo: dev.priceTo ? String(dev.priceTo) : '',
          totalUnits: dev.totalUnits,
          availableUnits: dev.availableUnits,
          bedrooms: dev.bedrooms || [],
          bathrooms: dev.bathrooms || [],
          sizeRange: dev.sizeRange,
          images: dev.images || [],
          amenities: dev.amenities || [],
          isFeatured: dev.isFeatured,
          completionDate: dev.completionDate ? dev.completionDate.substring(0, 10) : '',
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  )
}
