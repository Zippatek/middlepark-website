# MIDDLEPARK PROPERTIES — THE MASTER PLAN
## Full-Stack Ecosystem | Website + AI Service + Admin CRM
**Version 2.1 | Zippatek Digital Ltd | April 2026**

---

## 1. PROJECT ECOSYSTEM
The project is split into two specialized repositories sharing a single **Google Cloud SQL (PostgreSQL)** database.

### Repo A: [middlepark-website](https://github.com/mmtukut/middlepark-website)
**Role**: The "Face" and "Brain" (Next.js 14).
- **Public Site**: High-conversion marketing pages.
- **Client Portal**: Post-purchase dashboard for unit owners.
- **Admin Dashboard**: CMS for property info & CRM for AI-handoffs.
- **Tech**: Drizzle ORM, NextAuth v5, Tailwind, Mapbox.

### Repo B: [middlepark-ai-service](https://github.com/Zippatek/middlepark-ai-service)
**Role**: The "Conversational Sales Agent" (Next.js/Node.js).
- **Orchestration**: `agent.ts` handles LLM (Gemini/OpenAI) calls.
- **UI Signals**: Uses `[HANDOFF_REQUESTED]` for escalations and `[PROPERTY_CARDS]` for rich UI rendering.
- **Data Hardening**: Moving from in-memory `Map` to shared Cloud SQL tables.

---

## 2. DATABASE ARCHITECTURE (Shared Heart)
Both repos connect to **Google Cloud SQL**.
- **Core Portfolio**: Developments, Unit Types (The "Knowledge Base" for the AI).
- **CRM**: Enquiries, Chat Conversations, Messages, Site Visit Bookings.
- **Audit Logs**: Tracking LLM performance and handoff rates.

---

## 3. INTEGRATION & HANDSHAKE PROTOCOLS

### 1. The Handoff (AI -> Admin)
When the AI detects a `[HANDOFF_REQUESTED]` sentinel:
1.  The AI Service flags the conversation in the DB as `status: 'handoff_requested'`.
2.  The **Admin Dashboard** (Repo A) triggers a real-time notification for a human agent to take over.

### 2. Rich UI Rendering
- The AI returns structured IDs like `[PROPERTY_CARDS: MP-ABJ-0012]`.
- The `ChatWidget.tsx` (Repo B) or the Main Website (Repo A) resolves these IDs against the shared `developments` table to render the `PropertyCard.tsx` component.

### 3. Knowledge Synchronization
- Property data moves from `knowledge.ts` (Repo B) to the SQL `developments` table (Shared).
- Admin edits property details in Repo A -> AI immediately reflects these in its next chat session.

---

## 4. UPDATED DEVELOPMENT ROADMAP

### Phase 1 — Database & Auth (CRITICAL)
- [ ] Initialize Drizzle schema supporting both Website and AI entities.
- [ ] Migrate AI `knowledge.ts` data into PostgreSQL.
- [ ] Set up `conversations` and `messages` tables for AI persistence.

### Phase 2 — Admin Dashboard (CRM & CMS)
- [ ] **Live Chat Desk**: Dashboard to view active AI sessions and "Take Over" chats.
- [ ] **Property CMS**: Edit pricing/amenities that sync to the AI's knowledge base.

### Phase 3 — Public Website & AI Widget
- [ ] Embed the `ChatWidget` into the main website.
- [ ] Connect the widget to the production AI Service API.
- [ ] Implement Mapbox integration for development locations.