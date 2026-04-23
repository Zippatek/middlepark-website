'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, Users, Building2, ArrowUpRight, ArrowDownRight, Globe, PieChart, Download
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { adminGetAnalytics } from '@/lib/api'
import { cn, formatNaira } from '@/lib/utils'

export default function AdminAnalytics() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!session?.accessToken) return
    adminGetAnalytics(session.accessToken as string).then(r => { if (r.success) setData(r.data) }).catch(console.error)
  }, [session])

  const salesTrends = data?.salesTrends || []
  const maxValue = Math.max(...salesTrends.map((t: any) => t.value), 1)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-cormorant text-charcoal text-3xl font-bold">Analytics & Growth</h2>
          <p className="text-charcoal-light text-sm">Monitor sales velocity, demographic insights, and site performance.</p>
        </div>
        <button className="bg-green text-white px-5 py-2.5 rounded-sm text-sm font-medium flex items-center gap-2 w-fit">
          <Download size={16} /> GENERATE REPORT
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Revenue (Quarter)', value: data ? formatNaira(data.revenueQuarter || 0) : '…', trend: '', up: true, icon: TrendingUp },
          { label: 'New Leads (7d)', value: data ? `${data.newLeadsLastWeek ?? 0}` : '…', trend: '', up: true, icon: Users },
          { label: 'Inventory Turnover', value: data ? `${data.inventoryTurnover ?? 0}%` : '…', trend: '', up: true, icon: Building2 },
          { label: 'Portal Retention', value: '—', trend: '', up: true, icon: Globe },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-card border border-cream-divider"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-cream rounded-lg text-green">
                <kpi.icon size={20} />
              </div>
              <div className={cn(
                "flex items-center gap-0.5 text-[10px] font-bold uppercase",
                kpi.up ? "text-green" : "text-red"
              )}>
                {kpi.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {kpi.trend}
              </div>
            </div>
            <p className="text-charcoal-light text-xs font-medium mb-1">{kpi.label}</p>
            <p className="font-cormorant text-charcoal text-2xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend Chart (Visual Representation) */}
        <div className="bg-white p-8 rounded-card border border-cream-divider">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-cormorant text-charcoal text-xl font-bold">Sales Velocity</h3>
              <p className="text-charcoal-light text-xs">Monthly revenue across all developments</p>
            </div>
            <select className="bg-cream border-none rounded-sm px-3 py-1 text-[10px] font-bold uppercase text-charcoal">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {salesTrends.map((trend: any, i: number) => (
              <div key={trend.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-green/20 group-hover:bg-green transition-all duration-300 rounded-t-sm relative"
                  style={{ height: `${(trend.value / maxValue) * 100}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {formatNaira(trend.value)}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest">{trend.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources / Demographics */}
        <div className="bg-white p-8 rounded-card border border-cream-divider">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-cormorant text-charcoal text-xl font-bold">Acquisition Sources</h3>
              <p className="text-charcoal-light text-xs">Where our clients discover MiddlePark</p>
            </div>
            <PieChart size={20} className="text-green" />
          </div>

          <div className="space-y-6">
            {[
              { label: 'Referrals & Direct', value: 45, color: 'bg-green' },
              { label: 'Instagram / Digital Ads', value: 28, color: 'bg-green-tint' },
              { label: 'Outdoor Billboard', value: 15, color: 'bg-amber-100' },
              { label: 'Search Engine', value: 12, color: 'bg-cream' },
            ].map((source) => (
              <div key={source.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-charcoal">{source.label}</span>
                  <span className="text-xs font-bold text-green">{source.value}%</span>
                </div>
                <div className="h-2 w-full bg-cream rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all duration-1000", source.color)}
                    style={{ width: `${source.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geo Performance */}
      <div className="bg-white p-8 rounded-card border border-cream-divider">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cream rounded-lg text-green">
            <Globe size={20} />
          </div>
          <div>
            <h3 className="font-cormorant text-charcoal text-xl font-bold">Geographic Performance</h3>
            <p className="text-charcoal-light text-xs">Interest density by neighbourhood</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { location: 'Katampe Extension', interest: 'High', conversion: '12%', color: 'text-green' },
            { location: 'Dakibiyu Ph 2', interest: 'Extreme', conversion: '18%', color: 'text-green' },
            { location: 'Guzape', interest: 'Medium', conversion: '8%', color: 'text-amber-600' },
            { location: 'Maitama', interest: 'High', conversion: '5%', color: 'text-blue-600' },
          ].map((loc) => (
            <div key={loc.location} className="border-l border-cream-divider pl-6">
              <p className="text-xs font-bold text-charcoal mb-1">{loc.location}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-charcoal-light uppercase tracking-widest">Conversion</span>
                <span className={cn("text-sm font-bold", loc.color)}>{loc.conversion}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-charcoal-light uppercase tracking-widest">Interest</span>
                <span className="text-[10px] font-bold text-charcoal">{loc.interest}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
