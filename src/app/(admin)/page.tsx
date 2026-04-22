'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Building2, 
  TrendingUp, 
  ArrowRight,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'


import { adminGetStats } from '@/lib/api'

export default function AdminOverview() {
  const { data: session } = useSession()
  const [data, setData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      if (!session?.accessToken) return
      try {
        const res = await adminGetStats(session.accessToken as string)
        if (res.success) {
          setData(res.data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [session])

  const stats = data?.stats || [
    { label: 'Total Clients', value: '...', change: '0', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Developments', value: '...', change: '0', icon: Building2, color: 'text-green', bg: 'bg-green-tint' },
    { label: 'New Enquiries', value: '...', change: '0', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Sales', value: '...', change: '0', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  // Map icon strings to components
  const iconMap: Record<string, any> = {
    users: Users,
    building: Building2,
    message: MessageSquare,
    trending: TrendingUp
  }

  const recentEnquiries = data?.recentEnquiries || []

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-card p-8 border border-cream-divider relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-cormorant text-charcoal text-3xl font-bold mb-2">Systems Overview</h2>
          <p className="text-charcoal-light text-sm max-w-lg">
            Welcome to the MiddlePark Admin Control Center. Monitor leads, manage developments, 
            and track platform performance across Abuja.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-green/5 -translate-y-1/2 translate-x-1/4 rounded-full" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: any, i: number) => {
          const IconComp = typeof stat.icon === 'string' ? iconMap[stat.icon] || Users : stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-card p-6 border border-cream-divider"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn('p-2 rounded-lg', stat.bg || 'bg-cream')}>
                  <IconComp className={stat.color || 'text-green'} size={20} />
                </div>
                <span className="text-[10px] font-bold text-green uppercase tracking-wider">{stat.change}</span>
              </div>
              <p className="text-charcoal-light text-xs mb-1 font-medium">{stat.label}</p>
              <p className="font-cormorant text-charcoal text-2xl font-bold">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-card border border-cream-divider overflow-hidden">
          <div className="px-6 py-4 border-b border-cream-divider flex items-center justify-between">
            <h3 className="font-cormorant text-charcoal text-lg font-bold">Recent Enquiries</h3>
            <Link href="/admin/enquiries" className="text-green text-xs font-bold hover:underline">View All →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cream/50 text-left">
                  <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Client</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Development</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Time</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-charcoal-light uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-divider">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-charcoal text-sm font-medium">{enq.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-charcoal-light text-xs">{enq.development}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-charcoal-light text-xs">
                        <Clock size={12} />
                        {enq.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
                        enq.status === 'New' ? "bg-green/10 text-green" : "bg-blue-100 text-blue-600"
                      )}>
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <div className="bg-white rounded-card p-6 border border-cream-divider">
            <h3 className="font-cormorant text-charcoal text-lg font-bold mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green" />
                  <span className="text-charcoal text-xs">Auth Service</span>
                </div>
                <span className="text-green text-[10px] font-bold uppercase">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green" />
                  <span className="text-charcoal text-xs">Storage Bucket</span>
                </div>
                <span className="text-green text-[10px] font-bold uppercase">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-amber-500" />
                  <span className="text-charcoal text-xs">SMS Gateway</span>
                </div>
                <span className="text-amber-500 text-[10px] font-bold uppercase">Checking</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-cream-divider">
              <p className="text-charcoal-light text-[10px] mb-2 uppercase font-bold tracking-widest">Admin Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 bg-cream hover:bg-cream-dark rounded text-[10px] font-bold text-charcoal transition-all">REBOOT AI</button>
                <button className="px-3 py-2 bg-cream hover:bg-cream-dark rounded text-[10px] font-bold text-charcoal transition-all">VIEW LOGS</button>
              </div>
            </div>
          </div>

          <div className="bg-green rounded-card p-6 text-white border border-green-dark shadow-lg shadow-green/10">
            <h3 className="font-cormorant text-lg font-bold mb-2">MiddlePark Seal</h3>
            <p className="text-white/70 text-xs mb-4">
              All properties are verified before listing. 
              AGIS and FCDA titles are current.
            </p>
            <button className="w-full py-2 bg-white text-green rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-all">
              VERIFY PENDING
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

