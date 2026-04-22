/**
 * MIDDLEPARK PROPERTIES — CENTRAL API CLIENT
 * ============================================
 * All API calls go through this file.
 * Base URL is set via NEXT_PUBLIC_API_URL environment variable.
 * Authenticated calls pass token as Bearer header.
 */

import type {
  Development,
  DevelopmentStatus,
  Testimonial,
  TeamMember,
  PaymentRecord,
  Document,
  SiteVisit,
} from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://middlepark-backend-480235407496.us-central1.run.app/api/v1'

// ─── Response shape from backend ────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ─── Core fetch wrapper ──────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {}
): Promise<T> {
  const { token, ...fetchOptions } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string> || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers,
    // Next.js cache control — public data: revalidate every 60s, portal: no-store
    next: token
      ? { revalidate: 0 }
      : { revalidate: 60 },
  } as RequestInit)

  if (!res.ok) {
    let errorMessage = `API error ${res.status}`
    try {
      const errBody = await res.json()
      errorMessage = errBody.error || errBody.message || errorMessage
    } catch {
      // ignore parse errors
    }
    throw new Error(errorMessage)
  }

  return res.json() as Promise<T>
}

// ─── Public: Stats ───────────────────────────────────────────────────────────

export interface SiteStats {
  completedDevelopments: number
  totalUnitsDelivered: number
  totalPropertyValue: string
  yearsActive: number
}

export async function getSiteStats(): Promise<ApiResponse<SiteStats>> {
  return apiFetch<ApiResponse<SiteStats>>('/stats')
}

// ─── Public: Testimonials ────────────────────────────────────────────────────

export async function getTestimonials(): Promise<ApiResponse<Testimonial[]>> {
  return apiFetch<ApiResponse<Testimonial[]>>('/testimonials')
}

// ─── Public: Team ────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<ApiResponse<TeamMember[]>> {
  return apiFetch<ApiResponse<TeamMember[]>>('/team')
}

// ─── Public: Waitlist ────────────────────────────────────────────────────────

export async function addToWaitlist(email: string): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>('/waitlist', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

// ─── Public: Contact ─────────────────────────────────────────────────────────

export interface ContactPayload {
  fullName: string
  phone: string
  email: string
  development?: string
  message?: string
}

export async function submitContact(data: ContactPayload): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ─── Public: Enquiries ───────────────────────────────────────────────────────

export interface EnquiryPayload {
  fullName: string
  phone: string
  email: string
  development?: string
  message?: string
}

export async function submitEnquiry(data: EnquiryPayload): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>('/enquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function submitDevelopmentEnquiry(
  developmentId: string,
  data: Omit<EnquiryPayload, 'development'>
): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>(`/enquiries/development/${developmentId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ─── Public: Developments ────────────────────────────────────────────────────

export interface DevelopmentFilters {
  status?: DevelopmentStatus | 'all'
  city?: string
  neighborhood?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  amenities?: string
  search?: string
  page?: number
  pageSize?: number
}

export async function getDevelopments(
  filters: DevelopmentFilters = {}
): Promise<ApiResponse<PaginatedData<Development>>> {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== 'all') {
      params.set(k, String(v))
    }
  })
  const qs = params.toString()
  return apiFetch<ApiResponse<PaginatedData<Development>>>(`/developments${qs ? `?${qs}` : ''}`)
}

export async function getFeaturedDevelopments(): Promise<ApiResponse<Development[]>> {
  return apiFetch<ApiResponse<Development[]>>('/developments/featured')
}

export async function getDevelopmentBySlug(slug: string): Promise<ApiResponse<Development>> {
  return apiFetch<ApiResponse<Development>>(`/developments/${slug}`)
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  accessToken: string
  refreshToken: string
}

export async function loginUser(data: LoginPayload): Promise<ApiResponse<AuthUser>> {
  return apiFetch<ApiResponse<AuthUser>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    next: undefined, // no caching for auth
  } as RequestInit & { token?: string; next?: undefined })
}

export async function googleLogin(idToken: string): Promise<ApiResponse<AuthUser>> {
  return apiFetch<ApiResponse<AuthUser>>('/auth/google-login', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  })
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  developmentInterest?: string
  terms: true
}

export async function registerUser(data: RegisterPayload): Promise<ApiResponse<AuthUser>> {
  return apiFetch<ApiResponse<AuthUser>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function forgotPasswordRequest(email: string): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function logoutUser(token: string): Promise<void> {
  await apiFetch('/auth/logout', {
    method: 'POST',
    token,
  })
}

// ─── Portal: Overview ────────────────────────────────────────────────────────

export interface PortalStat {
  label: string
  value: string
  change: string
}

export interface TimelineStep {
  label: string
  date: string
  completed: boolean
  active?: boolean
}

export interface NextPaymentInfo {
  amount: number
  dueDate: string
  reference: string
  milestoneLabel: string
  daysUntilDue: number
}

export interface RecentDoc {
  id: string
  name: string
  date: string
  type: string
}

export interface PortalOverview {
  user: {
    firstName: string
    lastName: string
  }
  unit: {
    developmentName: string
    unitType: string
    unitNumber: string
    constructionProgress: number
    projectedHandover?: string
  } | null
  stats: {
    propertyValue: number
    totalPaid: number
    balanceRemaining: number
    constructionProgress: number
    percentPaid: number
    instalmentCount: number
  }
  timeline: TimelineStep[]
  nextPayment: NextPaymentInfo | null
  recentDocuments: RecentDoc[]
}

export async function getPortalOverview(token: string): Promise<ApiResponse<PortalOverview>> {
  return apiFetch<ApiResponse<PortalOverview>>('/portal/overview', { token })
}

// ─── Portal: My Unit ─────────────────────────────────────────────────────────

export interface PortalUnit {
  developmentName: string
  developmentSlug: string
  unitType: string
  unitNumber: string
  block?: string
  floorArea: string
  bedrooms: number
  bathrooms: number
  totalPrice: number
  amountPaid: number
  percentPaid: number
  allocationDate: string
  projectedHandover?: string
  constructionProgress: number
  currentStage: string
  stages: TimelineStep[]
  siteMapImage?: string
  unitImage?: string
}

export async function getMyUnit(token: string): Promise<ApiResponse<PortalUnit>> {
  return apiFetch<ApiResponse<PortalUnit>>('/portal/my-unit', { token })
}

// ─── Portal: Payments ────────────────────────────────────────────────────────

export interface PaymentSummary {
  totalPrice: number
  totalPaid: number
  balance: number
  percentPaid: number
  nextPayment: NextPaymentInfo | null
}

export interface PortalPayments {
  summary: PaymentSummary
  schedule: PaymentRecord[]
}

export async function getPayments(token: string): Promise<ApiResponse<PortalPayments>> {
  return apiFetch<ApiResponse<PortalPayments>>('/portal/payments', { token })
}

export async function getPaymentReceipt(
  token: string,
  id: number
): Promise<ApiResponse<{ receiptUrl: string }>> {
  return apiFetch<ApiResponse<{ receiptUrl: string }>>(`/portal/payments/${id}/receipt`, { token })
}

// ─── Portal: Documents ───────────────────────────────────────────────────────

export interface DocumentFilters {
  category?: string
  search?: string
}

export async function getDocuments(
  token: string,
  filters: DocumentFilters = {}
): Promise<ApiResponse<Document[]>> {
  const params = new URLSearchParams()
  if (filters.category) params.set('category', filters.category)
  if (filters.search) params.set('search', filters.search)
  const qs = params.toString()
  return apiFetch<ApiResponse<Document[]>>(`/portal/documents${qs ? `?${qs}` : ''}`, { token })
}

export async function downloadDocument(
  token: string,
  id: string
): Promise<ApiResponse<{ downloadUrl: string }>> {
  return apiFetch<ApiResponse<{ downloadUrl: string }>>(`/portal/documents/${id}/download`, { token })
}

// ─── Portal: Site Visits ─────────────────────────────────────────────────────

export interface PortalSiteVisits {
  upcoming: SiteVisit[]
  past: SiteVisit[]
}

export async function getSiteVisits(token: string): Promise<ApiResponse<PortalSiteVisits>> {
  return apiFetch<ApiResponse<PortalSiteVisits>>('/portal/site-visits', { token })
}

export async function bookSiteVisit(
  token: string,
  data: { date: string; time: string }
): Promise<ApiResponse<SiteVisit>> {
  return apiFetch<ApiResponse<SiteVisit>>('/portal/site-visits', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  })
}

// ─── Portal: Settings ────────────────────────────────────────────────────────

export interface NotificationPrefs {
  email_payment: boolean
  email_construction: boolean
  email_documents: boolean
  email_marketing: boolean
  sms_payment: boolean
  sms_construction: boolean
  sms_visits: boolean
}

export interface PortalSettings {
  profile: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  notifications: NotificationPrefs
}

export async function getSettings(token: string): Promise<ApiResponse<PortalSettings>> {
  return apiFetch<ApiResponse<PortalSettings>>('/portal/settings', { token })
}

export async function updateProfile(
  token: string,
  data: Partial<{ firstName: string; lastName: string; email: string; phone: string }>
): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>('/portal/settings/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
    token,
  })
}

export async function updatePassword(
  token: string,
  data: { currentPassword: string; newPassword: string }
): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>('/portal/settings/password', {
    method: 'PUT',
    body: JSON.stringify(data),
    token,
  })
}

export async function updateNotifications(
  token: string,
  data: Partial<NotificationPrefs>
): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>('/portal/settings/notifications', {
    method: 'PUT',
    body: JSON.stringify(data),
    token,
  })
}

// ─── Admin ───────────────────────────────────────────────────

export async function adminGetStats(token: string): Promise<ApiResponse<any>> {
  return apiFetch<ApiResponse<any>>('/admin/stats', { token })
}

export async function adminListClients(token: string, params: { page?: number; pageSize?: number } = {}): Promise<ApiResponse<PaginatedData<any>>> {
  const qs = new URLSearchParams(params as any).toString()
  return apiFetch<ApiResponse<PaginatedData<any>>>(`/admin/clients${qs ? `?${qs}` : ''}`, { token })
}

export async function adminGetClient(token: string, id: string): Promise<ApiResponse<any>> {
  return apiFetch<ApiResponse<any>>(`/admin/clients/${id}`, { token })
}

export async function adminListDevelopments(token: string, params: { page?: number; pageSize?: number; status?: string; search?: string } = {}): Promise<ApiResponse<PaginatedData<Development>>> {
  const qs = new URLSearchParams(params as any).toString()
  return apiFetch<ApiResponse<PaginatedData<Development>>>(`/admin/developments${qs ? `?${qs}` : ''}`, { token })
}

export async function adminListEnquiries(token: string, params: { page?: number; pageSize?: number; status?: string } = {}): Promise<ApiResponse<PaginatedData<any>>> {
  const qs = new URLSearchParams(params as any).toString()
  return apiFetch<ApiResponse<PaginatedData<any>>>(`/admin/enquiries${qs ? `?${qs}` : ''}`, { token })
}

export async function adminUpdateEnquiryStatus(token: string, id: string, status: string): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>(`/admin/enquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    token,
  })
}

export async function adminListPayments(token: string, params: { page?: number; pageSize?: number; status?: string } = {}): Promise<ApiResponse<PaginatedData<any>>> {
  const qs = new URLSearchParams(params as any).toString()
  return apiFetch<ApiResponse<PaginatedData<any>>>(`/admin/payments${qs ? `?${qs}` : ''}`, { token })
}

export async function adminUpdatePaymentStatus(token: string, id: string, status: string): Promise<ApiResponse<void>> {
  return apiFetch<ApiResponse<void>>(`/admin/payments/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    token,
  })
}

export async function adminUploadDocument(token: string, data: any): Promise<ApiResponse<any>> {
  return apiFetch<ApiResponse<any>>('/admin/documents', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  })
}
