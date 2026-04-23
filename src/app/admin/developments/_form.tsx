'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { adminUploadImage } from '@/lib/api'
import { Upload, X } from 'lucide-react'

export interface DevelopmentFormData {
  id?: string
  name: string
  tagline?: string
  description?: string
  status: string
  location: string
  neighborhood: string
  city: string
  priceFrom: string
  priceTo?: string
  totalUnits: number
  availableUnits: number
  bedrooms: number[]
  bathrooms: number[]
  sizeRange?: string
  images: string[]
  amenities: string[]
  isFeatured: boolean
  completionDate?: string
}

export default function DevelopmentForm({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial?: Partial<DevelopmentFormData>
  onSubmit: (data: any) => Promise<void>
  submitLabel: string
}) {
  const { data: session } = useSession()
  const [f, setF] = useState<DevelopmentFormData>({
    id: initial?.id,
    name: initial?.name || '',
    tagline: initial?.tagline || '',
    description: initial?.description || '',
    status: initial?.status || 'for-sale',
    location: initial?.location || '',
    neighborhood: initial?.neighborhood || '',
    city: initial?.city || 'Abuja',
    priceFrom: initial?.priceFrom?.toString() || '',
    priceTo: initial?.priceTo?.toString() || '',
    totalUnits: initial?.totalUnits || 0,
    availableUnits: initial?.availableUnits || 0,
    bedrooms: initial?.bedrooms || [],
    bathrooms: initial?.bathrooms || [],
    sizeRange: initial?.sizeRange || '',
    images: initial?.images || [],
    amenities: initial?.amenities || [],
    isFeatured: initial?.isFeatured || false,
    completionDate: initial?.completionDate || '',
  })
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')

  const upd = (k: keyof DevelopmentFormData, v: any) => setF(p => ({ ...p, [k]: v }))

  const handleImageUpload = async (file: File) => {
    if (!session?.accessToken) return
    setUploading(true)
    try {
      const res = await adminUploadImage(session.accessToken as string, file)
      if (res.success && res.data) upd('images', [...f.images, res.data.url])
    } catch (e: any) { setErr(e.message || 'Upload failed') }
    finally { setUploading(false) }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      await onSubmit({
        ...f,
        priceFrom: f.priceFrom,
        priceTo: f.priceTo || undefined,
        bedrooms: f.bedrooms.map(Number),
        bathrooms: f.bathrooms.map(Number),
        totalUnits: Number(f.totalUnits),
        availableUnits: Number(f.availableUnits),
      })
    } catch (e: any) { setErr(e.message || 'Save failed') }
    finally { setBusy(false) }
  }

  const Label = ({ children }: { children: React.ReactNode }) =>
    <label className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mb-1 block">{children}</label>
  const inputCls = "w-full p-2 bg-cream rounded text-sm outline-none focus:ring-1 focus:ring-green"

  return (
    <form onSubmit={submit} className="bg-white border border-cream-divider rounded-card p-6 space-y-6">
      <section>
        <h3 className="font-cormorant text-lg font-bold mb-4 text-charcoal">Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!initial?.id && <div>
            <Label>ID (e.g. MP-ABJ-0030)</Label>
            <input required value={f.id || ''} onChange={e => upd('id', e.target.value)} className={inputCls} />
          </div>}
          <div>
            <Label>Name</Label>
            <input required value={f.name} onChange={e => upd('name', e.target.value)} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <Label>Tagline</Label>
            <input value={f.tagline} onChange={e => upd('tagline', e.target.value)} className={inputCls} />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea rows={5} value={f.description} onChange={e => upd('description', e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-cormorant text-lg font-bold mb-4 text-charcoal">Location & Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Status</Label>
            <select value={f.status} onChange={e => upd('status', e.target.value)} className={inputCls}>
              <option value="for-sale">For Sale</option>
              <option value="off-plan">Off Plan</option>
              <option value="completed">Completed</option>
              <option value="sold-out">Sold Out</option>
            </select>
          </div>
          <div><Label>City</Label><input value={f.city} onChange={e => upd('city', e.target.value)} className={inputCls} /></div>
          <div><Label>Neighborhood</Label><input value={f.neighborhood} onChange={e => upd('neighborhood', e.target.value)} className={inputCls} /></div>
          <div><Label>Full Location</Label><input value={f.location} onChange={e => upd('location', e.target.value)} className={inputCls} /></div>
          <div><Label>Completion Date</Label><input type="date" value={f.completionDate} onChange={e => upd('completionDate', e.target.value)} className={inputCls} /></div>
          <div className="flex items-center gap-2 mt-6">
            <input type="checkbox" checked={f.isFeatured} onChange={e => upd('isFeatured', e.target.checked)} id="featured" />
            <label htmlFor="featured" className="text-sm text-charcoal">Featured</label>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-cormorant text-lg font-bold mb-4 text-charcoal">Pricing & Inventory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Price From (NGN)</Label><input required type="number" value={f.priceFrom} onChange={e => upd('priceFrom', e.target.value)} className={inputCls} /></div>
          <div><Label>Price To (NGN)</Label><input type="number" value={f.priceTo} onChange={e => upd('priceTo', e.target.value)} className={inputCls} /></div>
          <div><Label>Total Units</Label><input type="number" value={f.totalUnits} onChange={e => upd('totalUnits', Number(e.target.value))} className={inputCls} /></div>
          <div><Label>Available Units</Label><input type="number" value={f.availableUnits} onChange={e => upd('availableUnits', Number(e.target.value))} className={inputCls} /></div>
          <div><Label>Bedrooms (comma-separated)</Label>
            <input value={f.bedrooms.join(',')} onChange={e => upd('bedrooms', e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n)))} className={inputCls} />
          </div>
          <div><Label>Bathrooms (comma-separated)</Label>
            <input value={f.bathrooms.join(',')} onChange={e => upd('bathrooms', e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n)))} className={inputCls} />
          </div>
          <div className="md:col-span-2"><Label>Size Range</Label><input value={f.sizeRange} onChange={e => upd('sizeRange', e.target.value)} className={inputCls} placeholder="e.g. 180–320 sqm" /></div>
        </div>
      </section>

      <section>
        <h3 className="font-cormorant text-lg font-bold mb-4 text-charcoal">Amenities</h3>
        <Label>Amenities (comma-separated)</Label>
        <input value={f.amenities.join(',')} onChange={e => upd('amenities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className={inputCls} />
      </section>

      <section>
        <h3 className="font-cormorant text-lg font-bold mb-4 text-charcoal">Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {f.images.map((url, i) => (
            <div key={i} className="relative aspect-square rounded overflow-hidden border border-cream-divider group">
              <img src={url} alt="" className="object-cover w-full h-full" />
              <button type="button" onClick={() => upd('images', f.images.filter((_, j) => j !== i))} className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded opacity-0 group-hover:opacity-100"><X size={12} /></button>
            </div>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-cream hover:bg-cream-dark rounded cursor-pointer text-xs font-bold uppercase">
          <Upload size={14} /> {uploading ? 'Uploading…' : 'Add Image'}
          <input type="file" accept="image/*" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); e.target.value = '' }} />
        </label>
      </section>

      {err && <p className="text-red text-sm">{err}</p>}

      <div className="flex justify-end gap-3 pt-4 border-t border-cream-divider">
        <button type="submit" disabled={busy || uploading} className="px-6 py-2.5 bg-green text-white rounded text-xs font-bold uppercase tracking-widest disabled:opacity-50">
          {busy ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
