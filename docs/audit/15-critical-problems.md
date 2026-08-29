# 15 — Critical Problems (The P0 List)
**Inviting You** · Immediate Action Required
**Audited**: 2026-08-29

---

This document outlines the absolute critical vulnerabilities and architectural failures that must be addressed before any new feature work (including building the Sultan template) begins.

## P0 — Security (Fix Immediately)

### B-01: Unauthenticated Mutation Routes
Any internet user can send a `PUT` or `DELETE` request to `https://invitingyou.in/api/weddings/[uuid]` and maliciously alter or destroy a client's invitation. The Admin dashboard checks session, but the API routes do not.
- **Action**: Add `auth()` session checks to all methods in `src/app/api/weddings/route.ts` and `src/app/api/weddings/[id]/route.ts`.

### B-02: Unauthenticated RSVP Exposure
Any internet user with a wedding UUID can send a `GET` request to `https://invitingyou.in/api/rsvp?weddingId=[uuid]` and download the full list of guests, their names, and attendance status.
- **Action**: Add `auth()` session checks to the `GET` method in `src/app/api/rsvp/route.ts`.

---

## P0 — Architecture (Blockers for Phase 2)

### B-03: Template Versioning is Fake
The Phase 1 implementation added `templateVersion` to the database, but it is **never read by the Next.js router** and is **omitted from the `WeddingData` TypeScript type**. If we deploy Noor V2, it will override Noor V1 for all existing clients.
- **Action**: Add `templateVersion: number` to the `WeddingData` interface. Update `getDynamicTemplate` to accept a version string (e.g., `"noor@1"`) and map it accordingly.

### B-04: The Shared Engine is Unusable Dead Code
The Engine created in Phase 1 (`EngineGallery`, `EngineCountdown`, `EngineRSVP`) is not imported by any template. Furthermore:
1. `EngineRSVP` is a fake `setTimeout` submission. It never calls the database.
2. `EngineGallery` hardcodes visual styles (`height: 300px`, backgrounds), violating the rule that engines must be visually headless.
- **Action**: Fix `EngineRSVP` to call `POST /api/rsvp`. Strip all hardcoded styles from `EngineGallery`.

---

## P1 — High Priority Refactors

### B-05: Missing Image Optimization
Templates currently use standard `<img>` or CSS backgrounds. This causes massive payload sizes for mobile users.
- **Action**: Mandate `next/image`. Configure `next.config.ts` with `remotePatterns` for Vercel Blob/S3.

### B-06: Database Migrations
Changes are currently applied via `prisma db push`. There is no reproducible migration history.
- **Action**: Initialize a formal `prisma migrate dev` baseline.