# 02 — Architecture Audit
**Inviting You** · Architecture Assessment
**Audited**: 2026-08-29

---

## Overview

The project follows a **monolithic Next.js** architecture — frontend, backend API routes, and server-side rendering all live inside a single Next.js 16 application deployed on Vercel. This is an appropriate and cost-effective choice for the current scale.

---

## Layer Breakdown

```
Browser
  └─ Next.js 16 App Router (Vercel Edge Network)
       ├─ Server Components   → /admin/*, /i/[slug]
       ├─ Client Components   → Template UIs, Home Page
       ├─ API Routes          → /api/rsvp, /api/weddings/*
       └─ Static Pages        → /, /templates/*

Prisma ORM
  └─ PostgreSQL (Neon Serverless)
       └─ Direct Connection via DIRECT_URL

Authentication
  └─ NextAuth v5 (CredentialsProvider)
       └─ Super Admin credentials via ENV VARS
```

---

## What Works Well

### 1. Server-Side Rendering for Invitations
`/i/[slug]` is a `async` Server Component. It queries Prisma directly — no client-side fetch, no waterfall. The initial HTML is pre-rendered with all invitation data. This is excellent for SEO and first-paint performance.

**Evidence** — `src/app/i/[slug]/page.tsx`:
```typescript
export default async function InvitationPage(props: Props) {
  const weddingRecord = await prisma.wedding.findUnique({ ... })
  return <TemplateComponent wedding={wedding} />
}
```

### 2. Dynamic Template Imports
`getDynamicTemplate` returns a `next/dynamic` import. Visitors to a `velvet` invite do **not** download the Noor or Sultan JS bundle.

**Evidence** — `src/templates/registry.ts`:
```typescript
return dynamic(loader)  // next/dynamic — code split per template
```

### 3. Global Prisma Singleton
`src/lib/prisma.ts` correctly implements the global singleton pattern to prevent connection pool exhaustion in Next.js development (hot reload creates new module instances).

---

## Architectural Weaknesses

### 1. No Middleware Authentication on API Routes
**Severity: P0 — Critical**

The `admin/layout.tsx` correctly checks session with `await auth()`. However, the API routes at `/api/weddings/` and `/api/weddings/[id]/` have **no authentication whatsoever**. Any anonymous internet user can:
- `GET /api/weddings` → list all client records
- `PUT /api/weddings/[id]` → update any client's invitation
- `DELETE /api/weddings/[id]` → delete any client's invitation

**Evidence** — `src/app/api/weddings/[id]/route.ts`:
```typescript
export async function PUT(request, { params }) {
  const { id } = await params
  // No auth check. No session check. Proceeds directly to database.
  const wedding = await prisma.wedding.update({ where: { id }, data: {...} })
}
```

### 2. `as unknown as WeddingData` Double Cast
**Severity: P1**

The Prisma query result is cast to `WeddingData` using a double unsafe cast, bypassing TypeScript's type checker entirely. If the DB adds a new field (like `templateVersion`) and it's not in the `WeddingData` interface, TypeScript will not catch the mismatch.

**Evidence** — `src/app/i/[slug]/page.tsx:81`:
```typescript
const wedding = weddingRecord as unknown as WeddingData
```

### 3. Development Fallback in Production Code
**Severity: P1**

If no wedding is found by slug, the page silently falls back to `client3-asfiya-zuhaib`. This means any invalid URL (e.g., `/i/wrong-slug`) renders a real client's invitation rather than a proper 404.

**Evidence** — `src/app/i/[slug]/page.tsx:59-73`:
```typescript
// Fallback to client 3 data if not found
if (!weddingRecord) {
  weddingRecord = await prisma.wedding.findUnique({
    where: { slug: 'client3-asfiya-zuhaib' }, ...
  })
}
```

### 4. No Image Domain Configuration
**Severity: P2**

`next.config.ts` is nearly empty — only 8 lines. There is no `images.remotePatterns` configuration. This means `next/image` cannot optimize any externally-hosted images (e.g., Vercel Blob URLs for gallery photos). Next.js will throw errors if templates try to use `next/image` with Blob storage URLs.

**Evidence** — `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  /* config options here */
}
```

### 5. No Formal Migration System
**Severity: P2**

All schema changes have been applied via `prisma db push`. There is no `/prisma/migrations/` directory. This means:
- Schema history is not tracked
- Rolling back a change is not possible via Prisma
- Vercel deployments cannot safely reproduce the exact schema state

---

## Scalability Assessment

| Concern | Current | Limit |
|---|---|---|
| Client records | ~3 | No limit (PostgreSQL scales well) |
| Concurrent visitors per invitation | Unknown | Vercel serverless scales automatically |
| Template count | 3 active | No hard limit, but code duplication grows linearly |
| Admin users | 1 (hardcoded) | Only one super admin possible in current auth system |
| File storage | Vercel Blob | Appropriate for current scale |