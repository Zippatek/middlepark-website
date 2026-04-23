'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Users, Plus, Edit2, Trash2, Mail, Phone, Linkedin, Image as ImageIcon
} from 'lucide-react'
import { 
  adminListTeam, 
  adminCreateTeamMember, 
  adminUpdateTeamMember, 
  adminDeleteTeamMember,
  adminUploadImage
} from '@/lib/api'
import type { TeamMember } from '@/types'

export default function AdminTeam() {
  const { data: session } = useSession()
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    bio: '',
    avatar: '',
    linkedin: ''
  })
  const [formLoading, setFormLoading] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    const fetchTeam = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminListTeam(session.accessToken as string)
        if (res.success && res.data) {
          setTeam(res.data)
        }
      } catch (error) {
        console.error('Failed to fetch team:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [session])

  const handleOpenModal = (member?: TeamMember) => {
    if (member) {
      setIsEditing(member.id)
      setForm({
        name: member.name,
        title: member.title,
        email: member.email || '',
        bio: member.bio || '',
        avatar: member.avatar || '',
        linkedin: member.linkedin || ''
      })
    } else {
      setIsEditing(null)
      setForm({ name: '', title: '', email: '', bio: '', avatar: '', linkedin: '' })
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
        const res = await adminUpdateTeamMember(session.accessToken as string, isEditing, form)
        if (res.success && res.data) {
          setTeam(prev => prev.map(t => t.id === isEditing ? res.data! : t))
        }
      } else {
        const res = await adminCreateTeamMember(session.accessToken as string, form)
        if (res.success && res.data) {
          setTeam([...team, res.data])
        }
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error(error)
      alert('Failed to save team member')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    if (!session?.accessToken) return

    try {
      await adminDeleteTeamMember(session.accessToken as string, id)
      setTeam(prev => prev.filter(t => t.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete team member')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Team Members</h2>
          <p className="text-charcoal-light text-sm">Manage executive and sales team profiles shown on the website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-green-dark transition-colors"
        >
          <Plus size={16} /> ADD MEMBER
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-cream-divider rounded-card p-6 h-64 animate-pulse" />
          ))}
        </div>
      ) : team.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-divider rounded-card">
          <Users size={48} className="text-cream-divider mx-auto mb-4" />
          <h3 className="font-cormorant text-charcoal text-xl font-bold mb-2">No Team Members</h3>
          <p className="text-charcoal-light text-sm mb-6">Start building your team roster.</p>
          <button 
            onClick={() => handleOpenModal()}
            className="text-green text-sm font-bold uppercase tracking-widest hover:underline"
          >
            Add the first member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(member => (
            <div key={member.id} className="bg-white border border-cream-divider rounded-card overflow-hidden group">
              <div className="h-48 bg-cream relative">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-cream-divider">
                    <Users size={48} />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(member)} className="p-2 bg-white/90 hover:bg-white text-charcoal rounded shadow-sm backdrop-blur">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="p-2 bg-white/90 hover:bg-white text-red rounded shadow-sm backdrop-blur">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-cormorant text-charcoal text-xl font-bold">{member.name}</h3>
                <p className="text-green text-xs uppercase tracking-widest font-bold mb-3">{member.title}</p>
                <div className="space-y-1">
                  {member.email && (
                    <div className="flex items-center gap-2 text-charcoal-light text-sm">
                      <Mail size={12} className="text-charcoal" /> {member.email}
                    </div>
                  )}
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
                {isEditing ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-charcoal-light hover:text-charcoal">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-charcoal mb-1">Profile Photo</label>
                  <div className="flex items-center gap-4">
                    {form.avatar ? (
                      <img src={form.avatar} alt="Preview" className="w-16 h-16 rounded object-cover border border-cream-divider" />
                    ) : (
                      <div className="w-16 h-16 rounded bg-cream border border-cream-divider flex items-center justify-center text-charcoal-light">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Full Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Role / Position</label>
                  <input type="text" required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">Email Address (Optional)</label>
                  <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">LinkedIn URL (Optional)</label>
                  <input type="url" value={form.linkedin} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Short Bio</label>
                <textarea 
                  rows={4}
                  value={form.bio} 
                  onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} 
                  className="w-full p-2.5 border border-cream-divider rounded-sm text-sm text-charcoal" 
                />
              </div>

              <button disabled={formLoading} type="submit" className="w-full mt-6 bg-green text-white py-3.5 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-green-dark transition-colors">
                {formLoading ? 'Saving...' : 'Save Member'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
