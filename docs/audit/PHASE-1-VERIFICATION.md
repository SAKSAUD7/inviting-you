# PHASE 1 — ARCHITECTURE VERIFICATION REPORT
**Date**: 2026-08-29  
**Status**: EVIDENCE-BASED, READ-ONLY

---

## VERDICT FIRST

> [!CAUTION]
> ## ❌ PHASE 1 NOT APPROVED
> The Phase 1 Completion Report overstated what was actually accomplished. The database field exists, the engine files exist, but the critical runtime integration is incomplete and several items are structurally incorrect. Detailed evidence follows.

---

## 1. TEMPLATE VERSIONING — END-TO-END TRACE

### A. `templateVersion` exists in the database schema
**CONFIRMED.** `prisma/schema.prisma` line 27:
```
templateVersion Int @default(1)
```
✅ Field exists with a safe non-null default.

---

### B. `templateVersion` exists in `WeddingData` TypeScript type
**FAILED.** `src/types/wedding.ts` — the `WeddingData` interface is:
```typescript
export interface WeddingData {
  id: string
  slug: string
  title: string
  templateId: TemplateId
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  // ...
}
```
`templateVersion` is **absent** from `WeddingData`. It exists only in the `InvitationTemplateProps` intersection type in `registry.ts` as an optional `{ templateVersion?: number }`. This means the TypeScript contract for the entire application does not formally recognize `templateVersion` as part of the wedding data object.

---

### C. The invitation renderer reads `templateVersion`
**FAILED.** `src/app/i/[slug]/page.tsx` line 84:
```typescript
const TemplateComponent = getDynamicTemplate(wedding.templateId as TemplateId)
```
The renderer **only reads `templateId`**. `templateVersion` is fetched from the database (it comes with the Prisma query since it's on the `Wedding` model), cast to `WeddingData`, and then **completely ignored**. It is never passed to `getDynamicTemplate`.

---

### D. TemplateRegistry resolves `templateId + templateVersion`
**FAILED.** `src/templates/registry.ts` `getDynamicTemplate` function:
```typescript
export function getDynamicTemplate(id: TemplateId) {
  const loader = templateLoaders[id as string]
  if (!loader) return null
  return dynamic(loader)
}
```
The function only accepts a single `TemplateId` string. There is no version parameter. The `templateLoaders` map contains only one entry per template name:
```typescript
const templateLoaders = {
  velvet: () => import('@/templates/velvet/VelvetInvitation'),
  noor:   () => import('@/templates/noor/NoorInvitation'),
  sultan: () => import('@/templates/sultan/SultanInvitation'),
}
```
There is no mechanism for `noor-v1`, `noor-v2`, or any versioned resolution.

---

### E. Full runtime path trace
```
Wedding DB record: { templateId: "noor", templateVersion: 1, ... }
          ↓
src/app/i/[slug]/page.tsx
  weddingRecord fetched from Prisma (templateVersion is in the row)
  wedding = weddingRecord as unknown as WeddingData
  (WeddingData has no templateVersion field — it is silently dropped by the TS cast)
          ↓
getDynamicTemplate(wedding.templateId as TemplateId)
  → getDynamicTemplate("noor")
  → templateLoaders["noor"]()
  → import('@/templates/noor/NoorInvitation')
  (templateVersion is NEVER consulted at any step)
          ↓
<TemplateComponent wedding={wedding} />
```
**Conclusion: `templateVersion` is stored in the database and floats silently through the cast, but is never read, never routed on, and has no effect whatsoever on which component is rendered.**

---

### F. How Noor V1 and Noor V2 would coexist — can they?
**No. Not with the current architecture.**

For version-based rendering to work, the following would need to exist:
1. A `templateLoaders` map keyed by `"noor-v1"` and `"noor-v2"`.
2. A `getDynamicTemplate(id, version)` function that constructs the lookup key.
3. Separate files: `NoorInvitationV1.tsx` and `NoorInvitationV2.tsx`.
4. `templateVersion` must be included in the `WeddingData` TS type.
5. The route page must pass both `templateId` and `templateVersion` to the resolver.

**None of these exist.** The versioning field is an orphaned database column.

---

## 2. DATABASE MIGRATION SAFETY

### No formal migration exists
**CONFIRMED RISK.** The `prisma/` directory contains:
```
schema.prisma
dev.db (empty, 0 bytes)
seed.ts / seed_client.js / seed_client2.js / seed_client3.js
```
There is **no `/prisma/migrations/` directory**. The field was applied using `prisma db push`, not `prisma migrate dev`.

**Implications of `db push`:**
- No migration history is tracked. The change cannot be rolled back via Prisma.
- On a fresh Vercel deployment, there is no migration to re-apply. Vercel's recommended flow is `prisma migrate deploy`, not `prisma db push`.
- The entire project has never used formal migrations. This is consistent with an early-stage MVP but will become dangerous as the schema grows.
- Existing rows will have received `templateVersion = 1` from the database default. ✅
- Null values are impossible (`Int @default(1)` with no `?`). ✅

---

## 3. EXISTING CLIENT REGRESSION CHECK

**Build: ✅ PASSED** (no errors, no TypeScript failures)

`client3-asfiya-zuhaib` will still resolve correctly because:
- The slug is found by `prisma.wedding.findUnique({ where: { slug } })`.
- `templateId = "noor"` is in `templateLoaders`.
- `templateVersion` is silently discarded at the cast step.
- All existing invitation data (`couple`, `events`, `gallery`, etc.) is unaffected.

**The fallback to `client3-asfiya-zuhaib` for unknown slugs is still present** at lines 60–73 of `page.tsx`. This is a development convenience that must be removed before production.

---

## 4. SHARED ENGINE — ACTUAL CODE INSPECTION

### EngineGallery (`src/engine/EngineGallery.tsx`)

| Property | Verdict |
|---|---|
| Responsibilities | State management for selected photo, renders grid + lightbox |
| Props | `photos`, `containerClassName`, `imageClassName`, `titleComponent`, `overlayClassName` |
| Hardcoded styles | **YES — CRITICAL VIOLATION** |
| Template independence | **PARTIAL** |

**Evidence of style leakage (lines 22, 32, 52–57, 63):**
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', width: '100%', padding: '1rem' }}>
  <motion.div style={{ position: 'relative', height: '300px', cursor: 'pointer', overflow: 'hidden' }}>
```
```tsx
style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.9)', ... }}
```

The `height: '300px'`, `gap: '1rem'`, and `backgroundColor: 'rgba(0,0,0,0.9)'` are all **visual decisions baked into the engine**. A dark crimson Sultan template and a light ivory Noor template cannot both use this gallery without overriding these hardcoded values. The engine leaks presentation.

---

### EngineCountdown (`src/engine/EngineCountdown.tsx`)

| Property | Verdict |
|---|---|
| Countdown logic | ✅ Correct (interval, cleanup, past-date handling) |
| Timezone | ⚠️ Uses `new Date()` which respects local timezone — no explicit UTC handling |
| Hardcoded styles | Minor: `gap: '2rem'`, `flexDirection: 'column'` inline |
| Template independence | **MOSTLY YES** |

The countdown logic is clean and reusable. The minor inline styles are low risk.

---

### EngineRSVP (`src/engine/EngineRSVP.tsx`)

**TWO CRITICAL DEFECTS:**

**Defect 1 — Not connected to any real API:**
```typescript
// In a real app, this would be an actual API call to /api/rsvp
await new Promise(resolve => setTimeout(resolve, 1500))
setStatus('success')
```
The `weddingId` prop is received but **never used**. The submission is a fake 1.5-second delay. If a Sultan template used this engine, submitting an RSVP would silently "succeed" without writing anything to the database.

**Defect 2 — Contains template-specific copy:**
```tsx
Joyfully Accepts
Regretfully Declines
Thank You!
Your RSVP has been successfully received.
```
These are visible user-facing strings baked into the engine. An engine should have no copy. Copy belongs to the template layer.

---

## 5. ENGINE ADOPTION — CRITICAL FINDING

**Neither Velvet nor Noor uses any engine component.**

Velvet uses `VelvetCountdown.tsx` (its own implementation).  
Noor uses `NoorCountdown.tsx` (its own implementation).

**Both countdown implementations are independent and contain the same math:**
- `VelvetCountdown`: `diff / 86400000` for days
- `NoorCountdown`: `distance / (1000 * 60 * 60 * 24)` for days
- `EngineCountdown`: `difference / (1000 * 60 * 60 * 24)` for days

**Three separate countdown implementations exist right now.** The engine was created as new files but was never integrated. It is dead code.

---

## 6. TEMPLATE REGISTRY VERIFICATION

| Check | Result |
|---|---|
| Templates registered | velvet, noor, garden, pearl, sultan |
| garden/pearl have loaders | ❌ No (commented out) |
| garden/pearl in TEMPLATE_REGISTRY metadata | ✅ Yes |
| Missing template handled | ✅ `if (!loader) return null` |
| Invalid templateId handled | Returns `null` → renders `<div>Template not found</div>` (not a proper 404) |
| Version support | ❌ None |

**Discrepancy:** `garden` and `pearl` are listed in `TEMPLATE_REGISTRY` metadata (and thus appear in the public templates page) but their dynamic loaders are commented out. Attempting to load them will render the plain `Template not found` div — no 404, no proper error state.

---

## 7. VELVET REGRESSION CHECK

**BUILD: ✅ PASSED**  
**TYPESCRIPT: ✅ PASSED** (0 errors)

`VelvetInvitation` receives `{ wedding: WeddingData }` directly (not through `InvitationTemplateProps`). This means the `templateVersion?: number` addition in the registry type has no effect on Velvet. Velvet renders identically to before Phase 1.

---

## 8. NOOR REGRESSION CHECK

**BUILD: ✅ PASSED**  
**TYPESCRIPT: ✅ PASSED**

`NoorInvitation` similarly bypasses the `InvitationTemplateProps` type. Phase 1 changes have no runtime effect on Noor. It renders identically to before.

---

## 9. TYPE SAFETY

TypeScript check result: **✅ 0 errors**

However, these type-level weaknesses exist:

| Issue | Location | Severity |
|---|---|---|
| `templateVersion` absent from `WeddingData` | `src/types/wedding.ts` | High |
| `wedding = weddingRecord as unknown as WeddingData` — double cast bypasses TS safety | `src/app/i/[slug]/page.tsx` line 81 | High |
| `any` used in API event handlers | `src/app/api/weddings/route.ts` lines 84, 102 | Medium |
| Sultan uses `any` for wedding data internally | `SultanInvitation.tsx` | Medium |

---

## 10. BUILD VERIFICATION

**✅ BUILD PASSED — Zero TypeScript errors, zero route errors.**

```
✓ Compiled successfully in 9.7s
✓ TypeScript passed
✓ 13 static pages generated
```

---

## 11. SECURITY REGRESSION CHECK

Phase 1 did not change security. However, these pre-existing issues are documented:

| Route | Issue | Severity |
|---|---|---|
| `GET /api/weddings` | No authentication. Any public user can list all wedding records. | **P0 — CRITICAL** |
| `GET /api/weddings/[id]` | No authentication. Any public user can fetch any wedding by ID. | **P0 — CRITICAL** |
| `PUT /api/weddings/[id]` | No authentication. Any user can update any wedding. | **P0 — CRITICAL** |
| `DELETE /api/weddings/[id]` | No authentication. Any user can delete any wedding. | **P0 — CRITICAL** |
| `GET /api/rsvp?weddingId=` | No auth — guest names/responses visible to anyone with weddingId | **P1** |

The admin layout checks auth via NextAuth. The API routes behind it do **not**. These routes are protected only by obscurity (UUID-based IDs), not by authentication.

---

## 12. PERFORMANCE CHECK

- ✅ Dynamic `next/dynamic` imports still work correctly per build output.
- ✅ Engine components are `'use client'` correctly.
- ⚠️ Engine components are unused, so they add no bundle cost yet, but also provide no benefit.
- ⚠️ `EngineGallery` uses `AnimatePresence` from Framer Motion even when no photo is selected, keeping the motion runtime loaded even during idle state.

---

## 13. ARCHITECTURAL TEST

**"Could we now create a fourth template with a completely different visual identity without copying the Gallery, Countdown, and RSVP business logic?"**

**ANSWER: NO.**

Here is why:

1. **EngineGallery** has hardcoded `height: 300px` and `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`. A masonry layout or horizontal scroll gallery is impossible without forking.
2. **EngineRSVP** submits to a fake timeout. It must be forked to be usable.
3. No template currently imports from `src/engine`. The directory is dead code.

A fourth template builder today would do exactly what Velvet and Noor did: write their own gallery, their own countdown, their own RSVP.

---

## 14. 50-TEMPLATE TEST

| Code | Today | With Current Engine |
|---|---|---|
| Countdown logic | Written 3 times (Velvet, Noor, Engine) | Would be written 50 times |
| Gallery state/lightbox | Written 2+ times | Would be written 50 times |
| RSVP submit logic | Written 2+ times, Engine version is fake | Would be written 50 times |
| Template CSS variables | Each template owns its own (✅ correct) | Stays per-template |
| Section ordering | Hardcoded per template (risky) | Would be hardcoded 50 times |

---

## 15. PHASE 1 COMPLETION SCORES

| Area | Score | Rationale |
|---|---|---|
| Database Versioning (field) | 6/10 | Field exists, default is correct, but `prisma db push` not `migrate`. No migration history. |
| Template Version Runtime | 0/10 | `templateVersion` is never read by the renderer. Completely non-functional. |
| Shared Engine (creation) | 4/10 | Files created, reasonable structure, but have critical defects. |
| Template Independence | 3/10 | Engine leaks visual styles. EngineRSVP is not real. No template uses the engine. |
| Regression Safety | 8/10 | Build passes, Velvet/Noor unaffected, tests would confirm but don't exist. |
| Type Safety | 5/10 | Build passes but `templateVersion` absent from `WeddingData`, double-cast bypasses TS. |
| Security | 2/10 | P0 unauthed API routes existed before and remain. Phase 1 did not fix or worsen them. |
| Performance | 7/10 | Build clean, dynamic imports working, engine is unused dead code. |
| Scalability | 3/10 | Three countdown implementations. Engine not adopted. Versioning not functional. |

**Overall Phase 1 Score: 4.2 / 10**

---

## 16. BLOCKERS BEFORE PHASE 2

### P0 — MUST FIX BEFORE ANY NEW TEMPLATE

| ID | Problem | Location |
|---|---|---|
| **B-01** | `templateVersion` is not in `WeddingData` type. The field exists in DB but is invisible to the TypeScript application. | `src/types/wedding.ts` |
| **B-02** | The renderer never reads `templateVersion`. Versioning is a dead database column. | `src/app/i/[slug]/page.tsx` |
| **B-03** | `EngineRSVP.handleSubmit` is a fake `setTimeout`. It never calls `/api/rsvp`. Any template using it has broken RSVP. | `src/engine/EngineRSVP.tsx` |
| **B-04** | All API mutation routes (`/api/weddings/*`) have no authentication. Any public user can list, read, update, or delete any wedding. | `src/app/api/weddings/route.ts` and `[id]/route.ts` |

### P1 — FIX BEFORE PHASE 2 IS MEANINGFUL

| ID | Problem | Location |
|---|---|---|
| **B-05** | `EngineGallery` has hardcoded `height: 300px`, `gap: 1rem`, and lightbox background color. It is not truly template-independent. | `src/engine/EngineGallery.tsx` |
| **B-06** | `EngineRSVP` contains hardcoded English copy ("Joyfully Accepts", "Thank You!"). Copy belongs in templates. | `src/engine/EngineRSVP.tsx` |
| **B-07** | `getDynamicTemplate` only accepts `templateId`. It needs to accept a version to make versioning functional. | `src/templates/registry.ts` |
| **B-08** | `garden` and `pearl` are in `TEMPLATE_REGISTRY` metadata but have no loaders. Navigating to them renders a plain div. | `src/templates/registry.ts` |

### P2 — IMPORTANT BUT NOT BLOCKING

| ID | Problem |
|---|---|
| **B-09** | Dev fallback to `client3-asfiya-zuhaib` for any unknown slug is in the production code path. |
| **B-10** | No formal Prisma migration history (`prisma db push` only). |
| **B-11** | No tests exist anywhere in the project. |

### P3 — NICE TO HAVE

| ID | Problem |
|---|---|
| **B-12** | `as unknown as WeddingData` double-cast in the route page bypasses TypeScript. |
| **B-13** | `any` types in API route event handlers. |

---

## 17. EXACT CHANGES REQUIRED BEFORE APPROVAL

To achieve genuine Phase 1 approval, the following changes must be made:

**Change 1 — Add `templateVersion` to `WeddingData` type:**
```typescript
// src/types/wedding.ts
export interface WeddingData {
  templateId: TemplateId
  templateVersion: number  // ADD THIS
  ...
}
```

**Change 2 — Make the renderer read `templateVersion`:**
```typescript
// src/app/i/[slug]/page.tsx
const TemplateComponent = getDynamicTemplate(
  wedding.templateId as TemplateId,
  wedding.templateVersion ?? 1
)
```

**Change 3 — Make `getDynamicTemplate` accept a version:**
```typescript
// src/templates/registry.ts
const templateLoaders: Record<string, () => ...> = {
  'velvet@1': () => import('@/templates/velvet/VelvetInvitation'),
  'noor@1':   () => import('@/templates/noor/NoorInvitation'),
  'sultan@1': () => import('@/templates/sultan/SultanInvitation'),
}

export function getDynamicTemplate(id: TemplateId, version: number = 1) {
  const key = `${id}@${version}`
  const loader = templateLoaders[key] ?? templateLoaders[`${id}@1`]
  if (!loader) return null
  return dynamic(loader)
}
```

**Change 4 — Wire EngineRSVP to the real `/api/rsvp` endpoint.**

**Change 5 — Add auth guards to `/api/weddings/*` mutation routes.**

**Change 6 — Remove hardcoded visual styles from EngineGallery.**

---

## 18. FINAL DECISION

## ❌ PHASE 1 NOT APPROVED

**Reason:** The completion report claimed template versioning and a shared engine were implemented. The evidence shows:

- `templateVersion` is a database field with no runtime effect. It does not influence which component renders. Noor V2 cannot coexist with Noor V1 under the current architecture.
- The engine components exist as files but are dead code. No template imports from `src/engine`.
- `EngineRSVP` has a fake submission handler that never writes to the database.
- `EngineGallery` bakes in visual decisions that prevent true template independence.

**What is genuinely good and should be preserved:**
- The Prisma `templateVersion` column with a safe default.
- The `EngineCountdown` countdown logic (clean, just needs the inline styles removed).
- The overall engine directory structure and prop-driven design pattern.
- The successful build and TypeScript compilation.

**What must be fixed before Phase 2:**
See Blockers B-01 through B-06 above.

Phase 2 (building the Sultan template to validate the engine) will produce incorrect results if started now, because the engine Sultan would use contains a broken RSVP and non-functional versioning.
