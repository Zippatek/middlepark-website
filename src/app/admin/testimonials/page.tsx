'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, Plus, Edit2, Trash2, Star, Image as ImageIcon, Loader2
} from 'lucide-react'
import { 
  adminListTestimonials, 
  adminCreateTestimonial, 
  adminUpdateTestimonial, 
  adminDeleteTestimonial,
  adminUploadImage
} from '@/lib/api'
import type { Testimonial } from '@/types'
import { cn } from '@/lib/utils'

export default function AdminTestimonials() {
  const { data: session } = useSession()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [form, setForm] = useState({
    clientName: '',
    unitPurchased: '',
    quote: '',
    rating: 5,
    avatar: '',
    purchaseYear: new Date().getFullYear()
  })
  const [formLoading, setFormLoading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    const fetchTestimonials = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminListTestimonials(session.accessToken as string)
        if (res.success && res.data) {
          setTestimonials(res.data)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [session])

  const handleOpenModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setIsEditing(testimonial.id)
      setForm({
        clientName: testimonial.clientName,
        unitPurchased: testimonial.unitPurchased || '',
        quote: testimonial.quote,
        rating: testimonial.rating,
        avatar: testimonial.avatar || '',
        purchaseYear: testimonial.purchaseYear || new Date().getFullYear()
      })
    } else {
      setIsEditing(null)
      setForm({ clientName: '', unitPurchased: '', quote: '', rating: 5, avatar: '', purchaseYear: new Date().getFullYear() })
    }
    setIsModalOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !session?.accessToken) return

    setUploadingImage(true)
    try {
      const res = await adminUploadImage(session.accessToken as string, file)
      if (res.success && res.data?.url) {
        setForm(p => ({ ...p, avatar: res.data!.url }))
      }
    } catch (err) {
      console.error('Upload failed', err)
      alert('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.accessToken) return
    setFormLoading(true)

    try {
      if (isEditing) {
        const res = await adminUpdateTestimonial(session.accessToken as string, isEditing, form)
        if (res.success && res.data) {
          setTestimonials(prev => prev.map(t => t.id === isEditing ? res.data! : t))
        }
      } else {
        const res = await adminCreateTestimonial(session.accessToken as string, form)
        if (res.success && res.data) {
          setTestimonials([res.data, ...testimonials])
        }
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error(error)
      alert('Failed to save testimonial')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    if (!session?.accessToken) return

    try {
      await adminDeleteTestimonial(session.accessToken as string, id)
      setTestimonials(prev => prev.filter(t => t.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete testimonial')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Testimonials</h2>
          <p className="text-charcoal-light text-sm">Manage client reviews displayed on the marketing website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-green-dark transition-colors"
        >
          <Plus size={16} /> ADD TESTIMONIAL
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-cream-divider rounded-card p-6 h-48 animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-divider rounded-card">
          <MessageSquare size={48} className="text-cream-divider mx-auto mb-4" />
          <h3 className="font-cormorant text-charcoal text-xl font-bold mb-2">No Testimonials</h3>
          <p className="text-charcoal-light text-sm mb-6">You haven't added any client testimonials yet.</p>
          <button 
            onClick={() => handleOpenModal()}
            className="text-green text-sm font-bold uppercase tracking-widest hover:underline"
          >
            Add the first one
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white border border-cream-divider rounded-card p-6 flex flex-col group">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < t.rating ? "fill-green text-green" : "text-cream-divider"} />
                ))}
              </div>
              <p className="text-charcoal text-sm italic mb-6 flex-1 line-clamp-4">"{t.quote}"</p>
              
              <div className="flex items-center justify-between border-t border-cream-divider pt-4 mt-auto">
                <div className="flex items-center gap-3">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.clientName} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-charcoal-light font-cormorant font-bold text-xl">
                      {t.clientName[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-charcoal text-sm font-bold">{t.clientName}</p>
                    <p className="text-charcoal-light text-[10px] uppercase tracking-widest font-bold">
                      {t.unitPurchased} · {t.purchaseYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(t)} className="p-2 text-charcoal-light hover:text-green hover:bg-green-tint rounded">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-2 text-charcoal-light hover:text-red hover:bg-red/10 rounded">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="bg-white rounded-card w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-cormorant text-charcoal text-2xl font-bold">
                {isEditing ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-charcoal-light hover:text-charcoal">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-charcoal mb-1">Client Image</label>
                  <div className="flex items-center gap-4">
                    {form.avatar ? (
                      <img src={form.avatar} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-cream-divider" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-cream border border-cream-divider flex items-center justify-center text-charcoal-light">
                        <ImageIcon size={20} />
                      </div>
                    )}
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border border-cream-divider text-xs font-bold text-charcoal rounded-sm hover:bg-cream"
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? 'UPLOADING...' : 'UPLOAD IMAGE'}
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-charcoal mb-1">Rating</label>
                  <select 
                    value={form.rating} 
                    onChange={e => setForm(p => ({ ...p, rating: parseInt(e.target.value) }))}
                    className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal bg-white"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Client Name</label>
                  <input type="text" required value={form.clientName} onChange={e => setForm(p => ({ ...p, clientName: e.target.value }))} className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Unit Purchased</label>
                  <input type="text" placeholder="e.g. 4-Bed Terrace" value={form.unitPurchased} onChange={e => setForm(p => ({ ...p, unitPurchased: e.target.value }))} className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Purchase Year</label>
                  <input type="number" required value={form.purchaseYear || ''} onChange={e => setForm(p => ({ ...p, purchaseYear: parseInt(e.target.value) || new Date().getFullYear() }))} className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Testimonial Quote</label>
                <textarea 
                  required 
                  rows={4}
                  value={form.quote} 
                  onChange={e => setForm(p => ({ ...p, quote: e.target.value }))} 
                  className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" 
                />
              </div>

              <button disabled={formLoading} type="submit" className="w-full mt-6 bg-green text-white py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-green-dark transition-colors">
                {formLoading ? 'Saving...' : 'Save Testimonial'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
