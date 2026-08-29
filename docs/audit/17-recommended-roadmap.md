# 17 — Recommended Roadmap
**Inviting You** · Execution Plan
**Audited**: 2026-08-29

---

To safely scale Inviting You into a multi-tenant, 50-template luxury platform, development must proceed in strict phases. Building new features on the current foundation will exponentially increase technical debt.

## Phase 1.5: Architecture Remediation (Immediate)
*We must fix the critical failures of Phase 1 before proceeding.*

1. **Secure the API (P0)**: Apply NextAuth middleware to `/api/weddings/*` and `GET /api/rsvp`.
2. **True Template Versioning (P0)**: Update `WeddingData` type to include `templateVersion`, and refactor `src/app/i/[slug]/page.tsx` and `registry.ts` to actually route based on version (e.g., `noor@1`).
3. **Formal Migrations**: Run `npx prisma migrate dev --name init` to establish a schema baseline instead of relying on `db push`.

## Phase 2: The Shared Engine Completion
*Make the engine truly headless and adopt it.*

1. **Refactor Engine**: Rewrite `EngineCountdown`, `EngineRSVP`, and `EngineGallery` to be purely logical (Hooks) or visually completely headless. 
2. **Wire RSVP**: Connect `EngineRSVP` to the real `/api/rsvp` endpoint.
3. **Template Refactor**: Refactor Velvet and Noor to delete their bespoke logic and import the shared engine hooks. This proves the engine works across visually disparate templates.

## Phase 3: The Sultan Template (New Feature)
*Now that the engine is proven, build the 3rd template rapidly.*

1. Build `SultanInvitation.tsx`.
2. It should take 1/3rd of the time it took to build Velvet, because it will simply import the Engine hooks for RSVP, Countdown, and Gallery, requiring only CSS/UI work.

## Phase 4: Image Optimization & Pipeline
*Solve the mobile performance bottleneck.*

1. Configure `next.config.ts` for external image domains (Vercel Blob).
2. Refactor all templates to use `next/image` exclusively.
3. Add an Edge API route to auto-compress and convert admin uploads to WebP/AVIF.

## Phase 5: Admin UI Overhaul & AI Import
*Solve the studio bottleneck.*

1. Replace the massive `/admin/weddings/new` form with a step-by-step React wizard state.
2. Implement "Magic Import" — an API route that accepts an image/PDF of a traditional wedding card, sends it to an LLM, and auto-fills the creation wizard.