'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Trash2,
  Save,
  Eye,
  EyeOff,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

const settingsTabs = [
  { label: 'Profile', value: 'profile', icon: User },
  { label: 'Notifications', value: 'notifications', icon: Bell },
  { label: 'Security', value: 'security', icon: Shield },
  { label: 'Account', value: 'account', icon: Trash2 },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [profile, setProfile] = useState({
    firstName: 'Aisha',
    lastName: 'Bello',
    email: 'demo@middleparkng.com',
    phone: '+234 901 234 5678',
  })

  const [notifications, setNotifications] = useState({
    email_payment: true,
    email_construction: true,
    email_documents: false,
    email_marketing: false,
    sms_payment: true,
    sms_construction: true,
    sms_visits: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const toggleNotif = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  return (
    <div className="max-w-portal mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ═══ SIDEBAR TABS ═══ */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-card p-3 border border-cream-divider space-y-1 lg:sticky lg:top-[96px]">
            {settingsTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  activeTab === tab.value
                    ? 'bg-green-tint text-charcoal'
                    : 'text-charcoal-light hover:bg-cream hover:text-charcoal'
                )}
              >
                <tab.icon
                  size={18}
                  className={activeTab === tab.value ? 'text-green' : ''}
                  strokeWidth={1.5}
                />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ═══ CONTENT ═══ */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          key={activeTab}
        >
          {/* ─── PROFILE ─── */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-card p-6 lg:p-8 border border-cream-divider">
              <h3 className="font-cormorant text-charcoal text-xl font-bold mb-6">Personal Information</h3>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-avatar bg-green-tint flex items-center justify-center">
                  <span className="text-green text-lg font-bold">AB</span>
                </div>
                <div>
                  <p className="text-charcoal text-sm font-medium">Aisha Bello</p>
                  <p className="text-charcoal-light text-xs">Client since January 2025</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="settings-first" className="mp-label">First Name</label>
                    <input
                      type="text"
                      id="settings-first"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      className="mp-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="settings-last" className="mp-label">Last Name</label>
                    <input
                      type="text"
                      id="settings-last"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      className="mp-input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="settings-email" className="mp-label">Email Address</label>
                  <input
                    type="email"
                    id="settings-email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="mp-input"
                  />
                </div>
                <div>
                  <label htmlFor="settings-phone" className="mp-label">Phone Number</label>
                  <input
                    type="tel"
                    id="settings-phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mp-input"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                <Button variant="primary" onClick={handleSave}>
                  <Save size={14} /> SAVE CHANGES
                </Button>
                {saved && (
                  <motion.span
                    className="flex items-center gap-1.5 text-green text-xs font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <CheckCircle2 size={14} /> Saved
                  </motion.span>
                )}
              </div>
            </div>
          )}

          {/* ─── NOTIFICATIONS ─── */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-card p-6 lg:p-8 border border-cream-divider">
              <h3 className="font-cormorant text-charcoal text-xl font-bold mb-2">Notification Preferences</h3>
              <p className="text-charcoal-light text-sm mb-8">Choose how and when you want to hear from us.</p>

              {/* Email Notifications */}
              <div className="mb-8">
                <h4 className="text-charcoal text-sm font-semibold mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'email_payment', label: 'Payment reminders & receipts', desc: 'Get notified when payments are due or received' },
                    { key: 'email_construction', label: 'Construction updates', desc: 'Progress reports and milestone notifications' },
                    { key: 'email_documents', label: 'New documents available', desc: 'When new documents are uploaded to your portal' },
                    { key: 'email_marketing', label: 'New developments & offers', desc: 'Updates about new MiddlePark projects' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between gap-4 py-2">
                      <div>
                        <p className="text-charcoal text-sm font-medium">{item.label}</p>
                        <p className="text-charcoal-light text-xs">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotif(item.key)}
                        className={cn(
                          'relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0',
                          notifications[item.key as keyof typeof notifications] ? 'bg-green' : 'bg-cream-border'
                        )}
                      >
                        <span className={cn(
                          'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                          notifications[item.key as keyof typeof notifications] ? 'left-[22px]' : 'left-0.5'
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SMS Notifications */}
              <div>
                <h4 className="text-charcoal text-sm font-semibold mb-4">SMS Notifications</h4>
                <div className="space-y-4">
                  {[
                    { key: 'sms_payment', label: 'Payment alerts', desc: 'SMS when payments are due' },
                    { key: 'sms_construction', label: 'Construction milestones', desc: 'SMS when major stages are completed' },
                    { key: 'sms_visits', label: 'Site visit confirmations', desc: 'SMS reminders for scheduled visits' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between gap-4 py-2">
                      <div>
                        <p className="text-charcoal text-sm font-medium">{item.label}</p>
                        <p className="text-charcoal-light text-xs">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => toggleNotif(item.key)}
                        className={cn(
                          'relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0',
                          notifications[item.key as keyof typeof notifications] ? 'bg-green' : 'bg-cream-border'
                        )}
                      >
                        <span className={cn(
                          'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                          notifications[item.key as keyof typeof notifications] ? 'left-[22px]' : 'left-0.5'
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Button variant="primary" onClick={handleSave}>
                  <Save size={14} /> SAVE PREFERENCES
                </Button>
              </div>
            </div>
          )}

          {/* ─── SECURITY ─── */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-card p-6 lg:p-8 border border-cream-divider">
              <h3 className="font-cormorant text-charcoal text-xl font-bold mb-2">Security</h3>
              <p className="text-charcoal-light text-sm mb-8">Update your password and security settings.</p>

              <div className="space-y-5 max-w-[400px]">
                <div>
                  <label htmlFor="sec-old-pw" className="mp-label">Current Password</label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      id="sec-old-pw"
                      placeholder="Enter current password"
                      className="mp-input pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal transition-colors"
                    >
                      {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="sec-new-pw" className="mp-label">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="sec-new-pw"
                      placeholder="Enter new password"
                      className="mp-input pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-light hover:text-charcoal transition-colors"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="sec-confirm-pw" className="mp-label">Confirm New Password</label>
                  <input
                    type="password"
                    id="sec-confirm-pw"
                    placeholder="Confirm new password"
                    className="mp-input"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button variant="primary" onClick={handleSave}>
                  <Save size={14} /> UPDATE PASSWORD
                </Button>
              </div>
            </div>
          )}

          {/* ─── ACCOUNT ─── */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="bg-white rounded-card p-6 lg:p-8 border border-cream-divider">
                <h3 className="font-cormorant text-charcoal text-xl font-bold mb-2">Account Information</h3>
                <p className="text-charcoal-light text-sm mb-6">Details about your MiddlePark client account.</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-cream-divider">
                    <span className="text-charcoal-light text-sm">Client ID</span>
                    <span className="text-charcoal text-sm font-medium">MP-CLT-00248</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-cream-divider">
                    <span className="text-charcoal-light text-sm">Account Type</span>
                    <span className="text-charcoal text-sm font-medium">Property Owner</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-cream-divider">
                    <span className="text-charcoal-light text-sm">Member Since</span>
                    <span className="text-charcoal text-sm font-medium">January 2025</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-charcoal-light text-sm">Portal Status</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-badge bg-green-tint text-green text-[10px] font-semibold uppercase">
                      <CheckCircle2 size={10} /> ACTIVE
                    </span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-card p-6 lg:p-8 border border-green-muted">
                <h3 className="font-cormorant text-charcoal text-xl font-bold mb-2">Danger Zone</h3>
                <p className="text-charcoal-light text-sm mb-6">
                  Permanently delete your portal account. This action cannot be undone. Your property
                  records will remain with MiddlePark.
                </p>
                <Button variant="danger">
                  <Trash2 size={14} /> DELETE ACCOUNT
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
