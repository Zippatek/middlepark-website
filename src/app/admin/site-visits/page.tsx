'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle2, 
  XCircle, 
  MoreVertical,
  Plus
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

export default function AdminSiteVisits() {
  const { data: session } = useSession()
  const [visits, setVisits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Mocking site visits for now as the backend API might be different
  useEffect(() => {
    setTimeout(() => {
      setVisits([
        { id: 1, client: 'Tunde Bakare', development: 'Dakibiyu Estate Ph 2', date: '2026-05-15', time: '10:00 AM', status: 'UPCOMING', guide: 'Musa Ibrahim' },
        { id: 2, client: 'Aisha Yusuf', development: 'MiddlePark Heights', date: '2026-05-18', time: '02:00 PM', status: 'UPCOMING', guide: 'Unassigned' },
        { id: 3, client: 'Chidi Okoro', development: 'The Residences', date: '2026-04-10', time: '11:00 AM', status: 'COMPLETED', guide: 'Sarah Okon' },
      ])
      setLoading(false)
    }, 800)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Site Visits</h2>
          <p className="text-charcoal-light text-sm">Coordinate property tours and site inspections with prospective and existing clients.</p>
        </div>
        <button className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit">
          <Plus size={16} /> SCHEDULE VISIT
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-2 border border-cream-divider rounded-card inline-flex gap-1 mb-4">
              {['Upcoming', 'Completed', 'Cancelled'].map(status => (
                <button
                  key={status}
                  className={cn(
                    "px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                    status === 'Upcoming' ? "bg-green text-white" : "text-charcoal-light hover:bg-cream"
                  )}
                >
                  {status}
                </button>
              ))}
           </div>

           <div className="space-y-4">
              {visits.map((v) => (
                <div key={v.id} className="bg-white p-6 border border-cream-divider rounded-card hover:shadow-md transition-shadow">
                   <div className="flex flex-col md:flex-row gap-6 md:items-center">
                      <div className="flex flex-col items-center justify-center w-20 h-20 bg-cream rounded-xl border border-cream-divider">
                         <p className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest">
                           {new Date(v.date).toLocaleString('default', { month: 'short' })}
                         </p>
                         <p className="text-2xl font-cormorant font-bold text-charcoal">
                           {new Date(v.date).getDate()}
                         </p>
                      </div>

                      <div className="flex-1 space-y-2">
                         <div className="flex items-center gap-2">
                            <h4 className="text-charcoal text-sm font-bold">{v.client}</h4>
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest",
                              v.status === 'UPCOMING' ? "bg-blue-50 text-blue-600" : "bg-green-tint text-green"
                            )}>
                              {v.status}
                            </span>
                         </div>
                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                            <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                               <Building2 size={12} className="text-green" /> {v.development}
                            </div>
                            <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                               <Clock size={12} className="text-green" /> {v.time}
                            </div>
                            <div className="flex items-center gap-1.5 text-charcoal-light text-[10px] uppercase font-bold">
                               <User size={12} className="text-green" /> Guide: {v.guide}
                            </div>
                         </div>
                      </div>

                      <div className="flex gap-2">
                         <button className="px-3 py-1.5 bg-cream hover:bg-cream-dark rounded text-[10px] font-bold uppercase tracking-widest text-charcoal transition-all">
                            RESCHEDULE
                         </button>
                         <button className="p-2 hover:bg-cream rounded text-charcoal-light">
                            <MoreVertical size={16} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Calendar View Placeholder */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-card border border-cream-divider">
              <h4 className="text-xs font-bold text-charcoal-light uppercase tracking-widest mb-4">Calendar Glance</h4>
              <div className="aspect-square bg-cream rounded-lg flex items-center justify-center border-2 border-dashed border-cream-divider">
                 <div className="text-center">
                    <Calendar size={32} className="mx-auto text-cream-divider mb-2" />
                    <p className="text-[10px] text-charcoal-light uppercase font-bold tracking-widest">Interactive Calendar<br/>Coming Soon</p>
                 </div>
              </div>
           </div>

           <div className="bg-green rounded-card p-6 text-white border border-green-dark shadow-lg shadow-green/10">
              <h3 className="font-cormorant text-lg font-bold mb-2">Guide Availability</h3>
              <div className="space-y-3 mt-4">
                 {[
                   { name: 'Musa Ibrahim', status: 'On Site', color: 'bg-white' },
                   { name: 'Sarah Okon', status: 'Available', color: 'bg-white/40' },
                   { name: 'James Ade', status: 'Off Duty', color: 'bg-white/20' },
                 ].map(guide => (
                   <div key={guide.name} className="flex items-center justify-between">
                      <span className="text-xs">{guide.name}</span>
                      <span className={cn("px-2 py-0.5 rounded text-[8px] font-bold uppercase text-green", guide.color)}>
                        {guide.status}
                      </span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
