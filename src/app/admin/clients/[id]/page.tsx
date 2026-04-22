'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  CreditCard,
  Settings,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  ChevronRight,
  Shield
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { adminGetClient } from '@/lib/api'
import { cn, formatNaira } from '@/lib/utils'
import Link from 'next/link'

export default function AdminClientDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchClient = async () => {
      if (!session?.accessToken || !id) return
      try {
        const res = await adminGetClient(session.accessToken as string, id as string)
        if (res.success) {
          setClient(res.data)
        }
      } catch (error) {
        console.error('Failed to fetch client:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [session, id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-green-tint border-t-green rounded-full animate-spin" />
      </div>
    )
  }

  if (!client) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-cormorant font-bold text-charcoal">Client Not Found</h2>
        <button onClick={() => router.back()} className="mt-4 text-green font-medium">← Go Back</button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-charcoal-light hover:text-green transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> CLIENT LIST
        </button>
        <div className="flex gap-2">
          <button className={cn(
            "px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all",
            client.isActive ? "bg-red/10 text-red hover:bg-red/20" : "bg-green/10 text-green hover:bg-green/20"
          )}>
            {client.isActive ? 'Suspend Account' : 'Activate Account'}
          </button>
        </div>
      </div>

      {/* User Info Bar */}
      <div className="bg-white p-8 border border-cream-divider rounded-card flex flex-col md:flex-row gap-8 items-center">
        <div className="w-20 h-20 rounded-2xl bg-green flex items-center justify-center text-white text-3xl font-bold">
          {client.firstName[0]}{client.lastName[0]}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-cormorant text-charcoal text-4xl font-bold">{client.firstName} {client.lastName}</h1>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 mt-2">
            <div className="flex items-center gap-2 text-charcoal-light text-sm">
              <Mail size={14} className="text-green" /> {client.email}
            </div>
            <div className="flex items-center gap-2 text-charcoal-light text-sm">
              <Phone size={14} className="text-green" /> {client.phone || 'N/A'}
            </div>
            <div className="flex items-center gap-2 text-charcoal-light text-sm uppercase font-bold tracking-widest text-[10px]">
              <Shield size={14} className="text-green" /> {client.role}
            </div>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest mb-1">Total Paid</p>
          <p className="font-cormorant text-green text-3xl font-bold">
            {client.clientUnit ? formatNaira(Number(client.clientUnit.amountPaid)) : '₦0'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-cream-divider flex gap-8">
        {['overview', 'payments', 'documents', 'site-visits', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-4 text-xs font-bold uppercase tracking-widest transition-all relative",
              activeTab === tab ? "text-green" : "text-charcoal-light hover:text-charcoal"
            )}
          >
            {tab.replace('-', ' ')}
            {activeTab === tab && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-green" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Unit Card */}
              <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-cream-divider flex items-center justify-between">
                  <h3 className="font-cormorant text-charcoal text-lg font-bold">Property Allocation</h3>
                  {!client.clientUnit && (
                    <button className="text-green text-xs font-bold flex items-center gap-1">
                      <Plus size={14} /> ASSIGN UNIT
                    </button>
                  )}
                </div>
                <div className="p-6">
                  {client.clientUnit ? (
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 bg-cream rounded-lg overflow-hidden relative">
                         {client.clientUnit.image ? (
                           <img src={client.clientUnit.image} alt="Unit" className="w-full h-full object-cover" />
                         ) : (
                           <div className="flex items-center justify-center h-full text-cream-divider">
                             <Building2 size={32} />
                           </div>
                         )}
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest">Development</p>
                          <p className="text-charcoal text-sm font-bold">{client.clientUnit.development?.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest">Unit Number</p>
                          <p className="text-charcoal text-sm font-bold">{client.clientUnit.unitNumber}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest">Type</p>
                          <p className="text-charcoal text-sm font-bold">{client.clientUnit.unitType}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-charcoal-light/40 uppercase tracking-widest">Total Price</p>
                          <p className="text-charcoal text-sm font-bold">{formatNaira(Number(client.clientUnit.totalPrice))}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-cream/30 rounded-lg border-2 border-dashed border-cream-divider">
                      <p className="text-charcoal-light italic text-sm">No unit currently assigned to this client.</p>
                      <button className="mt-4 px-4 py-2 bg-green text-white rounded-sm text-xs font-bold uppercase tracking-widest">
                        CHOOSE UNIT
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-cream-divider">
                  <h3 className="font-cormorant text-charcoal text-lg font-bold">Recent History</h3>
                </div>
                <div className="divide-y divide-cream-divider">
                  {client.payments?.slice(0, 3).map((p: any) => (
                    <div key={p.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-tint text-green rounded">
                          <CreditCard size={14} />
                        </div>
                        <div>
                          <p className="text-charcoal text-xs font-bold">Payment Received</p>
                          <p className="text-charcoal-light text-[10px] uppercase font-bold tracking-widest">Instalment #{p.instalment}</p>
                        </div>
                      </div>
                      <p className="text-charcoal text-xs font-bold">{formatNaira(Number(p.amount))}</p>
                    </div>
                  ))}
                  {client.siteVisits?.slice(0, 2).map((v: any) => (
                    <div key={v.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded">
                          <Building2 size={14} />
                        </div>
                        <div>
                          <p className="text-charcoal text-xs font-bold">Site Visit {v.status}</p>
                          <p className="text-charcoal-light text-[10px] uppercase font-bold tracking-widest">
                            {new Date(v.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'payments' && (
             <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-cream-divider flex items-center justify-between">
                  <h3 className="font-cormorant text-charcoal text-lg font-bold">Payment Schedule</h3>
                  <button className="text-green text-xs font-bold flex items-center gap-1">
                    <Plus size={14} /> ADD PAYMENT
                  </button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead className="bg-cream/50">
                        <tr>
                          <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Ref</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Amount</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Due Date</th>
                          <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Status</th>
                          <th className="px-6 py-3"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-cream-divider">
                        {client.payments?.map((p: any) => (
                          <tr key={p.id}>
                            <td className="px-6 py-4 font-mono text-[10px] text-charcoal-light">{p.reference}</td>
                            <td className="px-6 py-4 text-charcoal text-xs font-bold">{formatNaira(Number(p.amount))}</td>
                            <td className="px-6 py-4 text-charcoal-light text-xs">{new Date(p.dueDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                               <span className={cn(
                                 "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                                 p.status === 'PAID' ? "bg-green/10 text-green" : "bg-amber-100 text-amber-600"
                               )}>
                                 {p.status}
                               </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <button className="text-charcoal-light hover:text-green"><Settings size={14} /></button>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
             </div>
          )}

          {activeTab === 'documents' && (
             <div className="bg-white border border-cream-divider rounded-card overflow-hidden">
                <div className="px-6 py-4 border-b border-cream-divider flex items-center justify-between">
                  <h3 className="font-cormorant text-charcoal text-lg font-bold">Client Vault</h3>
                  <button className="text-green text-xs font-bold flex items-center gap-1">
                    <Plus size={14} /> UPLOAD NEW
                  </button>
                </div>
                <div className="divide-y divide-cream-divider">
                   {client.documents?.map((doc: any) => (
                      <div key={doc.id} className="px-6 py-4 flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-cream text-charcoal-light rounded">
                               <FileText size={16} />
                            </div>
                            <div>
                               <p className="text-charcoal text-sm font-medium">{doc.name}</p>
                               <p className="text-charcoal-light text-[10px] uppercase font-bold tracking-widest">{doc.category.replace('_', ' ')} · {doc.fileSize}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-cream rounded text-charcoal-light" title="View"><Eye size={16} /></button>
                            <button className="p-2 hover:bg-cream rounded text-red/60 hover:text-red" title="Delete"><Trash2 size={16} /></button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-card border border-cream-divider">
              <h4 className="text-xs font-bold text-charcoal-light uppercase tracking-widest mb-4">Quick Actions</h4>
              <div className="space-y-2">
                 <button className="w-full text-left px-4 py-3 rounded-lg bg-cream hover:bg-cream-dark text-charcoal text-xs font-medium flex items-center justify-between transition-all">
                    Generate Statement <ChevronRight size={14} />
                 </button>
                 <button className="w-full text-left px-4 py-3 rounded-lg bg-cream hover:bg-cream-dark text-charcoal text-xs font-medium flex items-center justify-between transition-all">
                    Reset Portal Password <ChevronRight size={14} />
                 </button>
                 <button className="w-full text-left px-4 py-3 rounded-lg bg-cream hover:bg-cream-dark text-charcoal text-xs font-medium flex items-center justify-between transition-all">
                    Send Welcome Packet <ChevronRight size={14} />
                 </button>
              </div>
           </div>

           <div className="bg-white p-6 rounded-card border border-cream-divider">
              <h4 className="text-xs font-bold text-charcoal-light uppercase tracking-widest mb-4">Support Notes</h4>
              <textarea 
                placeholder="Add private note about this client..."
                className="w-full h-32 bg-cream border-none rounded-lg p-3 text-xs text-charcoal placeholder-charcoal-light focus:ring-1 focus:ring-green-tint"
              />
              <button className="w-full mt-2 py-2 bg-charcoal text-white rounded text-[10px] font-bold uppercase tracking-widest">
                SAVE NOTES
              </button>
           </div>
        </div>
      </div>
    </div>
  )
}
