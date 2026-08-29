# 16 — Target Architecture
**Inviting You** · Future State Blueprint
**Audited**: 2026-08-29

---

This document outlines the desired architectural state of the platform to achieve scale, security, and velocity.

## 1. The Headless Shared Engine
The most critical shift. All logic must live in a central `src/engine/` directory, completely devoid of CSS.

```text
src/engine/
 ├─ useRSVP.ts          (Form state, validation, fetch POST)
 ├─ useCountdown.ts     (Date math, setInterval, timezone handling)
 ├─ GalleryProvider.tsx (Lightbox state context, keyboard nav)
 └─ AudioController.ts  (Autoplay workaround logic)
```
Templates will import these hooks/providers and apply their own UI wrappers, ensuring that 50 templates share 1 underlying business logic core.

## 2. Versioned Template Registry
The dynamic router must explicitly resolve a tuple of `[templateId, templateVersion]`.

```typescript
// src/templates/registry.ts
const templateLoaders = {
  'noor@1': () => import('@/templates/noor-v1/NoorInvitation'),
  'noor@2': () => import('@/templates/noor-v2/NoorInvitation'),
  'velvet@1': () => import('@/templates/velvet-v1/VelvetInvitation'),
}
```
This ensures a client who paid for Noor V1 in 2025 does not suddenly have their invitation break when Noor V2 is released in 2026.

## 3. Secured API Layer
All API routes under `/api/weddings/*` and `GET /api/rsvp` must be guarded by NextAuth middleware or inline session checks.

```typescript
export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  // Proceed...
}
```

## 4. Admin Wizard & AI Import
The monolithic `/admin/weddings/new` form must be replaced by a step-by-step wizard.
- **Step 1:** Magic Import (Upload a PDF/Image of physical card → LLM extracts data).
- **Step 2:** Verify Couple Details.
- **Step 3:** Verify Events.
- **Step 4:** Media Upload (Direct to Vercel Blob with auto-compression).
- **Step 5:** Template Selection & Preview.

## 5. Media Pipeline
A fully automated media pipeline ensuring blazing fast mobile load times:
1. Admin uploads raw 5MB JPG.
2. Next.js API route / Edge function processes image.
3. Converts to WebP.
4. Uploads to Vercel Blob.
5. Saves Blob URL to Prisma.
6. Templates render using `<Image src={blobUrl} />`.