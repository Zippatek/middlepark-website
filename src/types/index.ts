// ─────────────────────────────────────────────────────────────────────────────
// MIDDLEPARK PROPERTIES LIMITED — TYPE DEFINITIONS
// Version 1.0 | Zippatek Digital Ltd | April 2026
// ─────────────────────────────────────────────────────────────────────────────

export type DevelopmentStatus = 'for-sale' | 'off-plan' | 'completed' | 'sold-out'
export type PaymentStatus = 'paid' | 'upcoming' | 'overdue'
export type SiteVisitStatus = 'upcoming' | 'completed' | 'cancelled'
export type UserIntent = 'buy' | 'invest' | 'unknown'
export type ConstructionStage = 'allocation' | 'foundation' | 'roofing' | 'finishing' | 'handover'

// ─── CORE ENTITIES ────────────────────────────────────────────────────────────

export interface Development {
  id: string                     // e.g. "MP-ABJ-0012"
  name: string                   // e.g. "Dakibiyu Estate Phase 2"
  slug: string                   // URL-safe slug
  tagline?: string               // Short marketing tagline
  description: string            // Full description
  status: DevelopmentStatus
  location: string               // Full display address
  neighborhood: string           // e.g. "Wuye"
  city: 'Abuja' | 'Kaduna' | 'Minna'
  coordinates?: { lat: number; lng: number }
  priceFrom: number              // Minimum price across all unit types
  priceTo?: number               // Maximum price
  unitTypes: UnitType[]          // All available unit types
  totalUnits: number
  availableUnits: number
  bedrooms: number[]             // e.g. [3, 4, 5]
  bathrooms: number[]
  sizeRange: string              // e.g. "200–280 SQM"
  images: string[]               // Array of image paths
  siteMapImage?: string          // Site plan image path
  amenities: string[]
  highlights: DevelopmentHighlight[]
  paymentPlan?: PaymentPlanInfo
  certifications: string[]       // e.g. ["AGIS Title Verified", "FCDA Approved"]
  createdAt: string
  completionDate?: string        // Projected or actual handover date
  developer: DeveloperInfo
}

export interface UnitType {
  id: string
  name: string                   // e.g. "4-Bedroom Terrace Duplex"
  bedrooms: number
  bathrooms: number
  parking?: number
  floorArea: string              // e.g. "280 SQM"
  price: number
  availableUnits: number
  totalUnits: number
  floorPlan?: string             // Image path
}

export interface DevelopmentHighlight {
  icon: string                   // Lucide icon name
  label: string
  description: string
}

export interface PaymentPlanInfo {
  depositPercent: number         // e.g. 30
  milestones: PaymentMilestone[]
  flexiblePlansAvailable: boolean
  note?: string
}

export interface PaymentMilestone {
  label: string                  // e.g. "Foundation"
  percent: number
  dueAtStage: string
}

export interface DeveloperInfo {
  name: string                   // Always "MiddlePark Sales Team"
  email: string
  phone: string
  whatsapp?: string
}


// ─── CLIENT / USER ────────────────────────────────────────────────────────────

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string                  // WhatsApp number
  avatar?: string
  unit?: ClientUnit              // Their purchased unit (if any)
  createdAt: string
  preferences?: ClientPreferences
}

export interface ClientPreferences {
  intent: UserIntent
  budgetMin?: number
  budgetMax?: number
  preferredAreas: string[]
  minBedrooms?: number
  developmentsInterested: string[]  // Development IDs
  marketingOptIn: boolean
}

export interface ClientUnit {
  developmentId: string
  developmentName: string
  developmentSlug: string
  unitType: string               // e.g. "4-Bedroom Terrace Duplex"
  unitNumber: string             // e.g. "A-14"
  block?: string
  totalPrice: number
  amountPaid: number
  percentPaid: number
  constructionStage: ConstructionStage
  allocationDate: string
  projectedHandover?: string
  nextPayment?: NextPayment
  image?: string
}

export interface NextPayment {
  amount: number
  dueDate: string
  reference: string
  milestoneLabel: string
}


// ─── PORTAL ENTITIES ──────────────────────────────────────────────────────────

export interface PaymentRecord {
  id: string
  clientId: string
  developmentId: string
  instalment: number             // Instalment number (1, 2, 3...)
  milestoneLabel: string         // e.g. "Foundation Stage"
  amount: number
  dueDate: string
  paidDate?: string
  status: PaymentStatus
  receiptPath?: string           // Path to receipt PDF
  reference: string              // Payment reference
}

export interface Document {
  id: string
  clientId: string
  developmentId?: string
  name: string                   // e.g. "Allocation Letter - Dakibiyu Estate"
  category: DocumentCategory
  filePath: string
  fileSize: string               // e.g. "2.4 MB"
  uploadedAt: string
  issuedAt: string
}

export type DocumentCategory =
  | 'allocation-letter'
  | 'sale-agreement'
  | 'payment-receipt'
  | 'handover-document'
  | 'title-document'
  | 'other'

export interface SiteVisit {
  id: string
  clientId: string
  developmentId: string
  development?: Development      // Populated on fetch
  date: string
  time: string
  confirmationNumber: string     // e.g. "CONF-MP-20260415"
  status: SiteVisitStatus
  notes?: string
  conductedBy?: string           // Sales team member name
}


// ─── ENQUIRY ──────────────────────────────────────────────────────────────────

export interface Enquiry {
  id: string
  fullName: string
  phone: string
  email: string
  developmentId?: string
  development?: string           // Development name
  message?: string
  intent: UserIntent
  source: 'website' | 'portal' | 'referral' | 'walk-in'
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
  createdAt: string
}


// ─── TESTIMONIAL ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  clientName: string
  unitPurchased: string          // e.g. "4-Bed Terrace, Dakibiyu Phase 2"
  rating: number                 // 1-5
  quote: string
  avatar?: string
  purchaseYear: number
}


// ─── TEAM MEMBER ──────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  avatar?: string
  email?: string
  linkedin?: string
}


// ─── UI COMPONENT PROPS ───────────────────────────────────────────────────────

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'white-on-dark' | 'ghost-white'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  fullWidth?: boolean
  href?: string
}

export interface DevelopmentCardProps {
  development: Development
  compact?: boolean
}

export interface StatCardProps {
  icon: React.ElementType
  iconBgColor: string
  iconColor: string
  value: string | number
  label: string
  subLabel?: string
}

export interface EmptyStateProps {
  illustration: 'units' | 'payments' | 'documents' | 'site-visits' | 'search'
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export interface SectionHeaderProps {
  overline: string
  heading: string
  subCopy?: string
  align?: 'left' | 'center'
  onDark?: boolean               // Adjusts colors for dark backgrounds
}

export interface MiddleParkSealProps {
  className?: string
  size?: 'sm' | 'md'
}


// ─── API RESPONSE TYPES ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface DevelopmentSearchFilters {
  status?: DevelopmentStatus
  city?: string
  neighborhood?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  amenities?: string[]
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}


// ─── NAVIGATION ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon?: string                  // Lucide icon name (portal sidebar)
  badge?: string                 // Optional notification badge
  subItems?: NavItem[]
}


// ─── FORM TYPES ───────────────────────────────────────────────────────────────

export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  developmentInterest?: string
  password: string
  confirmPassword: string
  terms: true
}

export interface EnquiryFormValues {
  fullName: string
  phone: string
  email: string
  development: string
  message?: string
}

export interface WaitlistFormValues {
  email: string
}
