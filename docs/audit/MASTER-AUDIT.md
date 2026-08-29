# MASTER PROJECT AUDIT: INVITING YOU
**Date**: 2026-08-29
**Phase**: 0 (Read-Only Complete Repository Inspection)

## 1. Project Overview
"Inviting You" is a digital wedding invitation SaaS platform built on Next.js 16 (App Router) and React 19. It operates as a multi-tenant application serving three major surfaces: a public marketing website, an admin studio for invitation management, and a dynamic template engine for rendering client invitations.

## 2. Current Architecture
The architecture follows a standard Next.js App Router pattern:
- **Frontend/Backend**: Unified in Next.js.
- **Database**: PostgreSQL (via Prisma ORM).
- **Styling**: Mixed (Vanilla CSS for templates, some Tailwind potential globally).
- **Animation**: Framer Motion and GSAP.
- **Authentication**: NextAuth.js v5 (beta).
- **Storage**: Vercel Blob.

The core strength of the architecture is the `/i/[slug]` route which acts as a dynamic resolver. It prevents the need to deploy separate applications for clients.

## 3. Current Data Flow
1. Client requests `inviting-you.com/i/saud-ayesha`
2. Next.js App Router hits `src/app/i/[slug]/page.tsx`
3. Server Component queries Prisma: `prisma.wedding.findUnique({ where: { slug } })`
4. Associated records (`couple`, `events`, `gallery`, `seo`) are joined.
5. The record is cast to `WeddingData`.
6. The `TemplateRegistry` dynamically imports the component mapped to `wedding.templateId`.
7. `WeddingData` is passed as props to the Template Component.
8. The server renders the initial HTML; client takes over for Framer Motion interactions.

## 4. Current Route Flow
- `/` -> Public Marketing Site.
- `/admin/*` -> Admin Portal (requires NextAuth session).
- `/i/[slug]` -> Dynamic Client Invitation Renderer.
- `/api/*` -> Next.js API Routes for Auth, RSVP mutations, and data management.

## 5. Current Template Flow
Templates are registered in `src/templates/registry.ts`.
- `velvet`: `src/templates/velvet/VelvetInvitation.tsx`
- `noor`: `src/templates/noor/NoorInvitation.tsx`
- `sultan`: `src/templates/sultan/SultanInvitation.tsx`

The `getDynamicTemplate` function returns a `next/dynamic` import. This is excellent for performance, as visitors to a `velvet` invite do not download the JS bundle for `noor`.

## 6. Current Admin Flow
The Admin Portal (`src/app/admin`) is functional but basic. It features a sidebar layout (`layout.tsx`) and routes for dashboard and wedding creation.
- **Issue**: Admin UX is highly manual. There is no fluid "wizard" for non-technical users to input data.
- **Issue**: Missing visual "Template Selection" previews inside the admin flow.

## 7. Current Public Website
The public website at `/` (`src/app/page.tsx`) uses `home.css`. It acts as a basic landing page.
- **Issue**: It does not function as a premium digital showroom. It lacks interactive template previews, deep filtering, and conversion-optimized pricing blocks.

## 8. Velvet Assessment
**Status**: Reference Implementation
- **Strengths**: Excellent separation of logic into semantic components (`VelvetEvents`, `VelvetGallery`). The CSS (`velvet.css`) effectively utilizes CSS variables for design tokens. The cinematic curtain reveal is high-quality.
- **Weaknesses**: Heavy reliance on fixed animations that may not adapt well to missing data. 

## 9. Noor Assessment
**Status**: Completed but Brittle
- **Strengths**: Successfully achieved the "Moonlit Nikah" botanical aesthetic with custom gold seals, scratch cards, and floral dividers.
- **Weaknesses**: High usage of absolute positioning and `mix-blend-mode` CSS tricks which are notoriously unstable on older mobile Safari versions. Assets are tightly coupled to the design.

## 10. Database Assessment
**Status**: Robust & Scalable
- **Strengths**: The `schema.prisma` is exceptionally well-designed. `Wedding` is the core model with optional 1:1 and 1:M relations (`WeddingCouple`, `WeddingEvent`, `GalleryImage`, `RSVPConfig`).
- **Weaknesses**: 
  - `templateId` is a `String` without a `templateVersion` integer/string field.
  - No `draftData` JSON field on the `Wedding` model to support the future AI Card-to-Data import feature before publishing.

## 11. Security Assessment
**Status**: Standard
- **Strengths**: NextAuth handles session management effectively.
- **Risks (Medium)**: Must ensure that all `/api/weddings/*` mutation routes explicitly verify `session.user.id === wedding.userId` or `session.user.role === 'SUPER_ADMIN'`. Fetching by ID without this check will lead to insecure direct object reference (IDOR).

## 12. Performance Assessment
**Status**: Good, with optimization opportunities.
- **Strengths**: Dynamic imports for templates keep initial JS payloads small. Next.js 16 Turbopack provides fast server responses.
- **Risks**: Loading heavy, unoptimized `.png` assets (like `noor_white_floral_divider_transparent.png`) blocks the main thread. Next/Image should be enforced strictly. Framer Motion `<AnimatePresence>` wrappers are deep; overusing them on mobile can cause battery drain and jank.

## 13. UX/UI Assessment
- **Public**: Generic. Needs an editorial overhaul to match the luxury of the templates.
- **Admin**: Functional but lacks premium polish.
- **Templates**: Extremely high quality, pushing the boundaries of web UI.

## 14. Scalability Assessment
**Can it support 50+ templates?**
*No.* Not in its current state. Building 50 templates by manually duplicating `<Hero>`, `<Gallery>`, and `<Events>` components 50 times will result in massive tech debt. We must build a **Shared Component Engine** before Phase 15.

## 15. AI Automation Opportunities
- **Card-to-Data Import**: High value. Can be implemented using the Vercel Blob SDK to upload an image and pass it to an LLM Vision model (e.g., GPT-4o or Claude 3.5 Sonnet) to return a JSON object mapping perfectly to `WeddingData`.
- **Ornament Generation**: Use Antigravity to run batch Python/PIL scripts to automatically mask, crop, and compress floral dividers generated by Midjourney.

## 16. Critical Problems
| ID | Category | Problem | Why It Matters | Recommended Solution |
|---|---|---|---|---|
| P1 | Architecture | No Template Versioning | Updating a template breaks live client invites. | Add `templateVersion` to `Wedding` schema. Lock older clients to older versions. |
| P2 | Engine | Component Duplication | Adding templates requires rewriting standard features (Galleries, Modals). | Create `src/components/engine` for headless components. |
| P3 | Admin | Manual Data Entry | Takes too long to onboard a client. | Build the OCR Card-to-Data pipeline. |

## 17. Recommended Fixes
1. Update Prisma Schema to include `templateVersion`.
2. Refactor `Velvet` and `Noor` to inherit from a unified `EngineGallery` rather than bespoke gallery implementations.
3. Overhaul the Admin Dashboard to include a visual template selector.

## 18. Dependencies
- **Component Engine** depends on **Template Versioning** (to ensure refactoring doesn't break existing invites).
- **OCR Import** depends on **Admin UI Overhaul**.

## 19. Target Architecture
```text
                    INVITING YOU (Next.js 16)
                         |
        +----------------+----------------+
        |                |                |
   PUBLIC WEBSITE     ADMIN STUDIO    INVITATION ENGINE
   (Marketing)        (Management)    (Renderer)
        |                |                |
   / (Home)           /admin/new       /i/[slug]
   /templates         /admin/[id]          |
        |                |                 v
        |                |            TemplateRegistry
        +----------------+                 |
                         |                 v
                 DB: Prisma (PostgreSQL)
                 (WeddingData + Relations)
```

## 20. Recommended Implementation Order
1. **PHASE 1**: Architecture & Engine Refactor (Implement Template Versioning & Shared Headless Components).
2. **PHASE 2**: The Sultan Template (Build it using the new Shared Engine to prove it works).
3. **PHASE 3**: Admin Workflow Upgrade (Build the visual selector and draft saving).
4. **PHASE 4**: OCR AI Card-to-Data Pipeline.
5. **PHASE 5**: Main Website Redesign (The Luxury Showroom).
6. **PHASE 6**: Mass Template Production (Using AI Agents).

## 21. What NOT to change
- **The Prisma Data Contract**: It is excellent.
- **The `/i/[slug]` Routing Pattern**: Do not move to subdomains or complicated tenant architectures yet. URL parameters are perfectly fine for this scale.
- **The `next/dynamic` Template Registry**: It is exactly how a scalable frontend should load heavy conditional components.

## 22. What MUST change
- **Hardcoded template visual assets**: Templates must pull their configurations from a JSON design token system rather than hardcoding `mix-blend-mode` and hex codes directly into `.tsx` style tags.

## 23. Definition of Done for Major Phases
- **Phase 1 (Engine)**: A new template can be added by defining a JSON configuration and passing it to a generic `<InvitationRenderer />` without writing a single `motion.div`.
- **Phase 2 (Admin)**: A user can upload a PDF wedding card and generate a live URL in under 60 seconds.

---
# WHAT WE SHOULD DO NEXT

**1. Implement Template Versioning in Prisma**
- **Objective**: Protect existing clients from future code changes.
- **Files Affected**: `prisma/schema.prisma`, `src/app/i/[slug]/page.tsx`
- **Reason**: As we refactor the engine, we cannot break `Noor` and `Velvet` for existing records.
- **Expected Result**: A migration adding `templateVersion Int @default(1)` to the DB.

**2. Extract Headless Components to `src/engine`**
- **Objective**: Prevent component duplication for future templates.
- **Files Affected**: `src/engine/Gallery.tsx`, `src/engine/Countdown.tsx`
- **Reason**: The Sultan template shouldn't need a completely rewritten slider.
- **Expected Result**: Reusable logic wrappers that accept template-specific CSS classes.

**3. Build the Sultan Template (Phase 12)**
- **Objective**: Validate the new Shared Engine.
- **Files Affected**: `src/templates/sultan/*`
- **Reason**: Proves the architecture works.
- **Expected Result**: A production-ready Royal template built in half the time it took to build Noor.
