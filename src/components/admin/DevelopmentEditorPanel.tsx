'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Upload, GripVertical, Trash2, Plus, Loader2, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  adminGetDevelopment,
  adminUpdateDevelopment,
  adminUploadImage,
} from '@/lib/api'
import { cn } from '@/lib/utils'
import type { Development } from '@/types'

const STATUS_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'for-sale', label: 'For Sale' },
  { value: 'off-plan', label: 'Off Plan' },
  { value: 'completed', label: 'Completed' },
  { value: 'sold-out', label: 'Sold Out' },
]

const CITY_OPTIONS = ['Abuja', 'Kaduna', 'Minna']

type Form = Partial<Development> & {
  id: string
  bedroomsRaw?: string
  bathroomsRaw?: string
  amenitiesRaw?: string
  certificationsRaw?: string
  lat?: number | string
  lng?: number | string
}

interface Props {
  open: boolean
  developmentId: string | null
  token: string | undefined
  onClose: () => void
  onSaved: (dev: Development) => void
}

function SortableImage({ id, url, onRemove }: { id: string; url: string; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group aspect-[4/3] rounded-md overflow-hidden bg-cream border border-cream-divider"
    >
      <img src={url} alt="" className="w-full h-full object-cover" />
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 p-1 bg-white/80 backdrop-blur rounded text-charcoal cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition"
        title="Drag to reorder"
      >
        <GripVertical size={12} />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 p-1 bg-white/90 backdrop-blur rounded text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition"
        title="Remove image"
      >
        <X size={12} />
      </button>
    </div>
  )
}

export default function DevelopmentEditorPanel({
  open,
  developmentId,
  token,
  onClose,
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<Form | null>(null)
  const [dirty, setDirty] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  // Load record
  useEffect(() => {
    if (!open || !developmentId || !token) return
    let cancelled = false
    setLoading(true)
    setError(null)
    setDirty(false)
    adminGetDevelopment(token, developmentId)
      .then((res) => {
        if (cancelled) return
        if (res.success && res.data) {
          const d = res.data
          setForm({
            ...d,
            bedroomsRaw: (d.bedrooms ?? []).join(', '),
            bathroomsRaw: (d.bathrooms ?? []).join(', '),
            amenitiesRaw: (d.amenities ?? []).join(', '),
            certificationsRaw: (d.certifications ?? []).join(', '),
            lat: d.coordinates?.lat ?? '',
            lng: d.coordinates?.lng ?? '',
          })
        } else {
          setError(res.error || 'Failed to load development')
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [open, developmentId, token])

  // Escape to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const update = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))
    setDirty(true)
  }

  const handleUpload = async (file: File) => {
    if (!token) return
    setUploading(true)
    try {
      const res = await adminUploadImage(token, file)
      if (res.success && res.data?.url) {
        setForm((prev) => (prev ? { ...prev, images: [...(prev.images ?? []), res.data!.url] } : prev))
        setDirty(true)
      } else {
        setError(res.error || 'Upload failed')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (idx: number) => {
    setForm((prev) =>
      prev ? { ...prev, images: (prev.images ?? []).filter((_, i) => i !== idx) } : prev
    )
    setDirty(true)
  }

  const onImageDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    setForm((prev) => {
      if (!prev) return prev
      const imgs = prev.images ?? []
      const oldIdx = imgs.findIndex((u) => u === active.id)
      const newIdx = imgs.findIndex((u) => u === over.id)
      if (oldIdx < 0 || newIdx < 0) return prev
      return { ...prev, images: arrayMove(imgs, oldIdx, newIdx) }
    })
    setDirty(true)
  }

  const handleSave = async () => {
    if (!form || !token) return
    setSaving(true)
    setError(null)
    try {
      const parseNumList = (s?: string): number[] =>
        (s ?? '')
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean)
          .map(Number)
          .filter((n) => !Number.isNaN(n))
      const parseStrList = (s?: string): string[] =>
        (s ?? '')
          .split(',')
          .map((x) => x.trim())
          .filter(Boolean)

      const lat = form.lat === '' || form.lat == null ? null : Number(form.lat)
      const lng = form.lng === '' || form.lng == null ? null : Number(form.lng)

      const payload: Record<string, unknown> = {
        name: form.name,
        slug: form.slug,
        tagline: form.tagline ?? null,
        description: form.description,
        status: form.status,
        location: form.location,
        neighborhood: form.neighborhood,
        city: form.city,
        priceFrom: form.priceFrom != null ? Number(form.priceFrom) : 0,
        priceTo: form.priceTo != null && form.priceTo !== ('' as unknown as number) ? Number(form.priceTo) : null,
        totalUnits: form.totalUnits != null ? Number(form.totalUnits) : 0,
        availableUnits: form.availableUnits != null ? Number(form.availableUnits) : 0,
        bedrooms: parseNumList(form.bedroomsRaw),
        bathrooms: parseNumList(form.bathroomsRaw),
        sizeRange: form.sizeRange,
        amenities: parseStrList(form.amenitiesRaw),
        certifications: parseStrList(form.certificationsRaw),
        images: form.images ?? [],
        completionDate: form.completionDate || null,
        isFeatured: !!(form as any).isFeatured,
        coordinates: lat != null && lng != null ? { lat, lng } : null,
      }
      const res = await adminUpdateDevelopment(token, form.id, payload)
      if (res.success && res.data) {
        onSaved(res.data)
        setDirty(false)
        onClose()
      } else {
        setError(res.error || 'Save failed')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-divider">
              <div className="min-w-0">
                <h3 className="font-cormorant text-charcoal text-xl font-bold truncate">
                  {form?.name || (loading ? 'Loading…' : 'Edit development')}
                </h3>
                <p className="text-[11px] text-charcoal-light font-mono truncate">{form?.id}</p>
              </div>
              <div className="flex items-center gap-2">
                {dirty && (
                  <span className="text-[11px] text-amber-600 font-medium">Unsaved changes</span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 hover:bg-cream rounded-sm text-charcoal-light"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-sm">
                  {error}
                </div>
              )}
              {loading || !form ? (
                <div className="flex items-center justify-center py-20 text-charcoal-light">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              ) : (
                <>
                  {/* Status / Featured */}
                  <Section title="Visibility">
                    <Row>
                      <Field label="Status">
                        <select
                          value={form.status ?? ''}
                          onChange={(e) => update('status', e.target.value as Development['status'])}
                          className={inputCls}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Featured">
                        <label className="flex items-center gap-2 mt-2 text-sm text-charcoal">
                          <input
                            type="checkbox"
                            checked={!!(form as any).isFeatured}
                            onChange={(e) => update('isFeatured' as keyof Form, e.target.checked as any)}
                            className="accent-green"
                          />
                          Show on homepage
                        </label>
                      </Field>
                    </Row>
                  </Section>

                  {/* Basics */}
                  <Section title="Basics">
                    <Field label="Listing title">
                      <input
                        className={inputCls}
                        value={form.name ?? ''}
                        onChange={(e) => update('name', e.target.value)}
                      />
                    </Field>
                    <Field label="Slug">
                      <input
                        className={inputCls}
                        value={form.slug ?? ''}
                        onChange={(e) => update('slug', e.target.value)}
                      />
                    </Field>
                    <Field label="Tagline">
                      <input
                        className={inputCls}
                        value={form.tagline ?? ''}
                        onChange={(e) => update('tagline', e.target.value)}
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        rows={5}
                        className={cn(inputCls, 'resize-y')}
                        value={form.description ?? ''}
                        onChange={(e) => update('description', e.target.value)}
                      />
                    </Field>
                  </Section>

                  {/* Location */}
                  <Section title="Location">
                    <Row>
                      <Field label="Neighborhood">
                        <input
                          className={inputCls}
                          value={form.neighborhood ?? ''}
                          onChange={(e) => update('neighborhood', e.target.value)}
                        />
                      </Field>
                      <Field label="City">
                        <select
                          className={inputCls}
                          value={form.city ?? ''}
                          onChange={(e) => update('city', e.target.value as Development['city'])}
                        >
                          {CITY_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </Row>
                    <Field label="Full address">
                      <input
                        className={inputCls}
                        value={form.location ?? ''}
                        onChange={(e) => update('location', e.target.value)}
                      />
                    </Field>
                    <Row>
                      <Field label="Latitude">
                        <input
                          type="number"
                          step="any"
                          className={inputCls}
                          value={form.lat ?? ''}
                          onChange={(e) => update('lat', e.target.value)}
                        />
                      </Field>
                      <Field label="Longitude">
                        <input
                          type="number"
                          step="any"
                          className={inputCls}
                          value={form.lng ?? ''}
                          onChange={(e) => update('lng', e.target.value)}
                        />
                      </Field>
                    </Row>
                  </Section>

                  {/* Pricing & inventory */}
                  <Section title="Pricing & inventory">
                    <Row>
                      <Field label="Price from (₦)">
                        <input
                          type="number"
                          className={inputCls}
                          value={form.priceFrom ?? ''}
                          onChange={(e) => update('priceFrom', Number(e.target.value) as any)}
                        />
                      </Field>
                      <Field label="Price to (₦)">
                        <input
                          type="number"
                          className={inputCls}
                          value={form.priceTo ?? ''}
                          onChange={(e) => update('priceTo', e.target.value === '' ? (undefined as any) : (Number(e.target.value) as any))}
                        />
                      </Field>
                    </Row>
                    <Row>
                      <Field label="Total units">
                        <input
                          type="number"
                          className={inputCls}
                          value={form.totalUnits ?? ''}
                          onChange={(e) => update('totalUnits', Number(e.target.value) as any)}
                        />
                      </Field>
                      <Field label="Available units">
                        <input
                          type="number"
                          className={inputCls}
                          value={form.availableUnits ?? ''}
                          onChange={(e) => update('availableUnits', Number(e.target.value) as any)}
                        />
                      </Field>
                    </Row>
                    <Row>
                      <Field label="Bedrooms (comma-separated)">
                        <input
                          className={inputCls}
                          value={form.bedroomsRaw ?? ''}
                          onChange={(e) => update('bedroomsRaw', e.target.value)}
                          placeholder="3, 4, 5"
                        />
                      </Field>
                      <Field label="Bathrooms">
                        <input
                          className={inputCls}
                          value={form.bathroomsRaw ?? ''}
                          onChange={(e) => update('bathroomsRaw', e.target.value)}
                          placeholder="3, 4"
                        />
                      </Field>
                    </Row>
                    <Field label="Size range">
                      <input
                        className={inputCls}
                        value={form.sizeRange ?? ''}
                        onChange={(e) => update('sizeRange', e.target.value)}
                        placeholder="200–280 SQM"
                      />
                    </Field>
                    <Field label="Completion date">
                      <input
                        type="date"
                        className={inputCls}
                        value={form.completionDate ? form.completionDate.slice(0, 10) : ''}
                        onChange={(e) => update('completionDate', e.target.value)}
                      />
                    </Field>
                  </Section>

                  {/* Amenities & certs */}
                  <Section title="Amenities & certifications">
                    <Field label="Amenities (comma-separated)">
                      <textarea
                        rows={3}
                        className={cn(inputCls, 'resize-y')}
                        value={form.amenitiesRaw ?? ''}
                        onChange={(e) => update('amenitiesRaw', e.target.value)}
                      />
                    </Field>
                    <Field label="Certifications (comma-separated)">
                      <textarea
                        rows={2}
                        className={cn(inputCls, 'resize-y')}
                        value={form.certificationsRaw ?? ''}
                        onChange={(e) => update('certificationsRaw', e.target.value)}
                      />
                    </Field>
                  </Section>

                  {/* Images */}
                  <Section title="Images">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onImageDragEnd}>
                      <SortableContext items={(form.images ?? []) as string[]} strategy={rectSortingStrategy}>
                        <div className="grid grid-cols-3 gap-2">
                          {(form.images ?? []).map((url, idx) => (
                            <SortableImage
                              key={url}
                              id={url}
                              url={url}
                              onRemove={() => removeImage(idx)}
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="aspect-[4/3] rounded-md border-2 border-dashed border-cream-divider flex flex-col items-center justify-center text-charcoal-light hover:border-green hover:text-green transition-colors"
                          >
                            {uploading ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <>
                                <Upload size={16} />
                                <span className="text-[10px] mt-1">Add image</span>
                              </>
                            )}
                          </button>
                        </div>
                      </SortableContext>
                    </DndContext>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) handleUpload(f)
                        e.target.value = ''
                      }}
                    />
                  </Section>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-cream-divider flex items-center justify-between bg-cream/40">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-charcoal-light hover:text-charcoal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!dirty || saving || loading}
                className={cn(
                  'px-5 py-2 rounded-sm text-sm font-medium flex items-center gap-2 transition-colors',
                  dirty && !saving
                    ? 'bg-green text-white hover:bg-green-dark'
                    : 'bg-cream-divider text-charcoal-light cursor-not-allowed'
                )}
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                Save changes
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

const inputCls =
  'w-full px-3 py-2 bg-cream rounded-sm text-sm text-charcoal border border-transparent focus:border-green-tint focus:outline-none transition-all'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[11px] uppercase tracking-widest text-charcoal-light font-semibold">
        {title}
      </h4>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] text-charcoal-light mb-1">{label}</span>
      {children}
    </label>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}

// Suppress unused import warnings for items used in JSX
void Image
void ExternalLink
void Plus
void Trash2
