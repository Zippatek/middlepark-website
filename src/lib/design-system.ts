/**
 * MIDDLEPARK PROPERTIES LIMITED — DESIGN SYSTEM
 * ===============================================
 * Single source of truth for all design tokens.
 * Import into components for dynamic/computed styles only.
 * Use Tailwind CSS classes wherever possible.
 * 
 * Brand: MiddlePark Properties Limited
 * Palette: Red, Grey (Charcoal), White
 * Version: 2.0 | Zippatek Digital Ltd | April 2026
 */

export const colors = {
  // ─── PRIMARY BRAND PALETTE ────────────────────────────────────
  red: {
    DEFAULT: '#ED1B24',           // MiddlePark Red — primary CTA, headings accent, active states
    dark: '#C41720',              // Deep red — hover/pressed
    light: '#F04950',             // Lighter red — secondary
    tint: '#FDF2F2',              // Rose tint — hover fills, section backgrounds
    muted: '#F5C6C8',             // Muted — borders, dividers
    alpha10: 'rgba(237, 27, 36, 0.10)',
    alpha20: 'rgba(237, 27, 36, 0.20)',
  },

  // ─── STRUCTURAL ───────────────────────────────────────────────
  charcoal: {
    DEFAULT: '#5A5B5F',           // Primary text, nav, footer
    dark: '#3A3B3F',              // Strong emphasis, headings on white
    light: '#8A8B8F',             // Captions, placeholders, muted text
    alpha50: 'rgba(90, 91, 95, 0.5)',
  },

  // ─── SURFACES ─────────────────────────────────────────────────
  cream: {
    DEFAULT: '#F8F7F3',           // Page canvas
    dark: '#EEE9E0',              // Section alternate background
    border: '#D6D3C8',            // Input/card borders
    divider: '#E8E4DC',           // Section dividers
  },
  white: '#FFFFFF',

  // ─── STATUS ───────────────────────────────────────────────────
  success: {
    DEFAULT: '#1E7A3A',
    light: 'rgba(30, 122, 58, 0.1)',
  },
  warning: {
    DEFAULT: '#D97706',
    light: 'rgba(217, 119, 6, 0.1)',
  },
  danger: {
    DEFAULT: '#ED1B24',
    light: 'rgba(237, 27, 36, 0.1)',
  },
} as const


export const typography = {
  // Cormorant Garamond for all display / headings
  // DM Sans for body, UI, labels, navigation
  families: {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
  },
  scale: {
    display: { size: '72px', weight: 700, lineHeight: 1.02, letterSpacing: '-0.02em', family: 'display' },
    h1: { size: '64px', weight: 700, lineHeight: 1.05, letterSpacing: '-0.015em', family: 'display' },
    h2: { size: '42px', weight: 700, lineHeight: 1.1, letterSpacing: '-0.01em', family: 'display' },
    h3: { size: '28px', weight: 600, lineHeight: 1.2, letterSpacing: '-0.005em', family: 'display' },
    h4: { size: '20px', weight: 600, lineHeight: 1.35, family: 'body' },
    bodyLg: { size: '17px', weight: 400, lineHeight: 1.7, family: 'body' },
    body: { size: '16px', weight: 400, lineHeight: 1.7, family: 'body' },
    bodySm: { size: '14px', weight: 400, lineHeight: 1.6, family: 'body' },
    caption: { size: '12px', weight: 400, lineHeight: 1.4, family: 'body' },
    overline: { size: '11px', weight: 600, lineHeight: 1.3, letterSpacing: '0.1em', family: 'body' },
    badge: { size: '11px', weight: 600, lineHeight: 1.3, letterSpacing: '0.05em', family: 'body' },
    nav: { size: '13px', weight: 500, lineHeight: 1, letterSpacing: '0.04em', family: 'body' },
  },
} as const


export const spacing = {
  // 8pt system
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const


export const radius = {
  card: '12px',
  button: '6px',
  badge: '20px',
  container: '8px',
  input: '6px',
  avatar: '50%',
  sm: '4px',
} as const


export const shadows = {
  card: '0 4px 24px rgba(237, 27, 36, 0.06)',
  cardHover: '0 10px 40px rgba(237, 27, 36, 0.12)',
  seal: '0 2px 12px rgba(237, 27, 36, 0.14)',
  sidebar: '2px 0 16px rgba(90, 91, 95, 0.06)',
  topbar: '0 2px 8px rgba(90, 91, 95, 0.06)',
  modal: '0 20px 60px rgba(237, 27, 36, 0.15)',
  cta: '0 8px 32px rgba(237, 27, 36, 0.25)',
  heroFloat: '0 12px 48px rgba(0, 0, 0, 0.20)',
} as const


export const layout = {
  navbarHeight: '80px',
  sidebarWidth: '240px',
  sidebarCollapsed: '72px',
  topbarHeight: '72px',
  maxSiteWidth: '1320px',
  maxPortalWidth: '1280px',
  authCardMaxWidth: '480px',
} as const


/**
 * MIDDLEPARK SEAL — GLASSMORPHISM STYLES
 * Apply to MiddleParkSeal component
 */
export const sealStyles = {
  background: 'rgba(255, 255, 255, 0.88)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.65)',
  borderRadius: '20px',
  padding: '6px 14px',
  boxShadow: shadows.seal,
} as const


/**
 * DEVELOPMENT STATUS PILL COLORS
 */
export const developmentStatusPill = {
  'for-sale': {
    background: colors.red.DEFAULT,
    color: colors.white,
    label: 'FOR SALE',
  },
  'off-plan': {
    background: colors.charcoal.DEFAULT,
    color: colors.white,
    label: 'OFF-PLAN',
  },
  'completed': {
    background: colors.charcoal.dark,
    color: colors.white,
    label: 'COMPLETED',
  },
  'sold-out': {
    background: colors.red.dark,
    color: colors.white,
    label: 'SOLD OUT',
  },
} as const


/**
 * PORTAL NAVIGATION ITEM STATES
 */
export const portalNavStyles = {
  active: {
    background: colors.red.tint,
    borderLeft: `3px solid ${colors.red.DEFAULT}`,
    iconColor: colors.red.DEFAULT,
    textColor: colors.charcoal.DEFAULT,
  },
  hover: {
    background: colors.red.tint,
    iconColor: colors.charcoal.DEFAULT,
    textColor: colors.charcoal.DEFAULT,
  },
  inactive: {
    background: 'transparent',
    iconColor: colors.charcoal.light,
    textColor: colors.charcoal.light,
  },
} as const


/**
 * BUTTON VARIANTS
 */
export const buttonVariants = {
  primary: {
    background: colors.red.DEFAULT,
    color: colors.white,
    border: 'none',
    hover: { background: colors.red.dark },
    shadow: shadows.cta,
  },
  secondary: {
    background: 'transparent',
    color: colors.charcoal.DEFAULT,
    border: `1.5px solid ${colors.charcoal.DEFAULT}`,
    hover: { background: colors.red.tint },
  },
  ghost: {
    background: colors.red.tint,
    color: colors.charcoal.DEFAULT,
    border: 'none',
    hover: { background: colors.red.muted },
  },
  danger: {
    background: 'transparent',
    color: colors.red.DEFAULT,
    border: `1.5px solid ${colors.red.DEFAULT}`,
    hover: { background: colors.red.alpha10 },
  },
  whiteOnDark: {
    background: colors.white,
    color: colors.red.DEFAULT,
    border: 'none',
    hover: { background: 'rgba(255,255,255,0.9)' },
  },
  ghostWhite: {
    background: 'transparent',
    color: colors.white,
    border: `1.5px solid rgba(255,255,255,0.7)`,
    hover: { background: 'rgba(255,255,255,0.1)' },
  },
} as const


/**
 * SECTION HEADER OVERLINE COLORS BY SECTION THEME
 */
export const overlineColors = {
  default: colors.red.DEFAULT,
  onDark: 'rgba(255,255,255,0.7)',
  subtle: colors.charcoal.light,
} as const


/**
 * PAYMENT STATUS COLORS (for portal payments table)
 */
export const paymentStatus = {
  paid: {
    background: colors.success.light,
    color: colors.success.DEFAULT,
    label: 'PAID',
  },
  upcoming: {
    background: 'rgba(217, 119, 6, 0.1)',
    color: '#D97706',
    label: 'UPCOMING',
  },
  overdue: {
    background: colors.danger.light,
    color: colors.danger.DEFAULT,
    label: 'OVERDUE',
  },
} as const


/**
 * CONSTRUCTION STAGE LABELS & COLORS
 */
export const constructionStages = [
  { id: 'allocation', label: 'Allocation Confirmed', icon: 'FileCheck' },
  { id: 'foundation', label: 'Foundation Complete', icon: 'Layers' },
  { id: 'roofing', label: 'Roofing Complete', icon: 'Home' },
  { id: 'finishing', label: 'Finishing Works', icon: 'Paintbrush' },
  { id: 'handover', label: 'Handover', icon: 'Key' },
] as const
