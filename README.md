# MiddlePark Properties Limited — Official Website & Client Portal

> **MiddlePark Properties Limited** — Building Places. Building Lives.
> A premium real estate developer based in Abuja, Nigeria.

---

## About This Project

This is the official website and client portal for **MiddlePark Properties Limited**, a real estate development company competing in Abuja's high-end property space alongside Cosgrove, Urban Shelter, and Bilaad Realty.

The application is a **Next.js 14** full-stack platform comprising:
- A **public-facing marketing website** (homepage, developments catalogue, about, contact)
- A **client portal** for property buyers to track unit progress, payments, documents, and site visits

---

## Brand Identity

| Token | Value |
|---|---|
| Primary Green | `#286B38` (Forest Green) |
| Accent Red | `#ED1B24` (MiddlePark Red — accent/alert only) |
| Charcoal | `#5A5B5F` (body text, structural) |
| White | `#FFFFFF` |
| Cream | `#F8F7F3` (page canvas) |
| Mint Tint | `#F0F4F1` (hover, section bg) |
| Display Font | Cormorant Garamond (headings, H1–H3) |
| Body Font | DM Sans (UI, body, navigation) |

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS (custom design system) |
| Auth | NextAuth.js v5 |
| Icons | Lucide React (stroke only) |
| Animations | Framer Motion |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Maps | Mapbox GL JS |

---

## Project Structure

```
middlepark-website/
├── FOUNDATION.md               ← Master spec (READ FIRST)
├── ANTIGRAVITY_PROMPT.md       ← Generation prompt for Antigravity
├── IMAGE_PROMPTS.md            ← Image generation prompts
├── tailwind.config.ts          ← Custom Tailwind design tokens
├── package.json
├── public/
│   └── images/                 ← All site images (see IMAGE_PROMPTS.md)
└── src/
    ├── app/
    │   ├── (public)/           ← Marketing website pages
    │   ├── (auth)/             ← Login, Register, Forgot Password
    │   ├── portal/             ← Client portal (authenticated)
    │   └── layout.tsx
    ├── components/
    │   ├── layout/             ← Navbar, Footer, Portal Shell
    │   ├── ui/                 ← Reusable UI components
    │   └── development/        ← Development-specific components
    ├── lib/
    │   ├── design-system.ts    ← JS design tokens
    │   └── auth.ts             ← NextAuth configuration
    └── types/
        └── index.ts            ← TypeScript type definitions
```

---

## Pages

### Public Website
| Route | Page |
|---|---|
| `/` | Homepage (hero, stats, featured developments, why MiddlePark, testimonials) |
| `/developments` | All developments with filter and sort |
| `/developments/[slug]` | Development detail (gallery, tabs, enquiry sidebar) |
| `/about` | Company story, values, team, track record |
| `/contact` | Contact form, office cards, social links |

### Authentication
| Route | Page |
|---|---|
| `/login` | Split-screen client login |
| `/register` | Split-screen account creation |
| `/forgot-password` | Password reset |

### Client Portal (authenticated)
| Route | Page |
|---|---|
| `/portal` | Dashboard overview |
| `/portal/my-unit` | Unit details and construction progress |
| `/portal/payments` | Payment schedule and receipts |
| `/portal/documents` | Allocation letters, agreements, receipts |
| `/portal/site-visits` | Book and manage site visits |
| `/portal/settings` | Profile, notifications, security |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Image Generation

All images are documented in `IMAGE_PROMPTS.md`. Generate them using **NanoBanana** on Antigravity, then place in `/public/images/`.

---

## Code Generation

Feed `ANTIGRAVITY_PROMPT.md` to Antigravity as your system prompt, then generate phase by phase following the **BUILD ORDER** in `FOUNDATION.md`.

---

## Competitor Reference

| Competitor | Website |
|---|---|
| Cosgrove | cosgrove.ng |
| Urban Shelter | aminuurban.com |
| Bilaad Realty | bilaadrealty.com |

MiddlePark's website must match or exceed these in design quality, content depth, and client experience.

---

## Key Copy Rules

✅ **Use**: "MiddlePark Certified", "Title Verified Before We Break Ground", "Built with intention. Priced with purpose."

❌ **Never use**: "luxury", "premium", "world-class", "seamless", "innovative", "state-of-the-art"

---

*MiddlePark Properties Limited | Zippatek Digital Ltd | Abuja, Nigeria | 2026*
