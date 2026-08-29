# 14 — Scalability Audit
**Inviting You** · Growth & Expansion Assessment
**Audited**: 2026-08-29

---

## 1. Hosting & Infrastructure
**Status: Excellent**

- **Compute**: Deployed on Vercel Edge Network. Serverless functions scale infinitely with traffic spikes (e.g., when a client blasts their invitation link to 1,000 guests simultaneously).
- **Database**: PostgreSQL on Neon (Serverless). Connections are pooled efficiently.
- **Verdict**: Infrastructure will easily support 10,000+ simultaneous guests without modification.

## 2. Template Codebase Scaling
**Status: Failing**

- **Current State**: 2 active templates (Velvet, Noor).
- **Issue**: Each template implements its own core logic (Countdowns, RSVPs, Galleries). The attempt to build a Shared Engine (Phase 1) failed because the engine components were not adopted, hardcoded visual styles, and contained fake API calls.
- **Verdict**: We cannot scale to 10, 20, or 50 templates. The technical debt of maintaining 50 separate RSVP implementations and 50 separate countdown timers is unacceptable.
- **Requirement**: A strictly enforced, purely headless Shared Engine must be completed before Template 3 (Sultan) is built.

## 3. Database Scaling
**Status: Good**

- **Current State**: A single PostgreSQL database.
- **Verdict**: Relational structure is sound. As RSVP rows grow, database indexes on `weddingId` will ensure queries remain fast. The schema is robust enough for thousands of clients.

## 4. Multi-Tenancy & Agency Scaling
**Status: Failing**

- **Current State**: A single hardcoded Super Admin (`ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`).
- **Verdict**: We cannot currently invite designers, freelancers, or franchise partners into the platform to create invitations. 
- **Requirement**: The `User` model exists but is not fully utilized. We need to implement a full Role-Based Access Control (RBAC) system where users can only edit the weddings they created.

## Conclusion
The infrastructure is ready for massive scale, but the codebase architecture (specifically the lack of a shared engine and lack of a robust multi-tenant auth system) is bottlenecking expansion.