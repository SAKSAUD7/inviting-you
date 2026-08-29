# 03 — Routing & Data Flow Audit
**Inviting You** · Complete Route Trace
**Audited**: 2026-08-29

---

## Route Map

| Route | Type | Auth Required | Data Source |
|---|---|---|---|
| `/` | Client Static | None | Hardcoded in `page.tsx` |
| `/templates` | Static SSG | None | `TEMPLATE_REGISTRY` |
| `/templates/[id]` | Static SSG | None | `TEMPLATE_REGISTRY` |
| `/admin/login` | Static | None (public) | ENV VARS |
| `/admin/dashboard` | Server Dynamic | ✅ Session | Prisma — all weddings |
| `/admin/weddings/new` | Server/Client | ✅ Session | Prisma — create |
| `/admin/weddings/[id]/edit` | Server/Client | ✅ Session | Prisma — by ID |
| `/admin/weddings/[id]/rsvp` | Server | ✅ Session | Prisma — responses |
| `/i/[slug]` | Server Dynamic | None (public) | Prisma — by slug |
| `/api/weddings` (GET/POST) | API | ❌ **NONE** | Prisma |
| `/api/weddings/[id]` (GET/PUT/DELETE) | API | ❌ **NONE** | Prisma |
| `/api/rsvp` (POST) | API | None (intentional) | Prisma |
| `/api/rsvp` (GET) | API | None | Prisma |
| `/api/auth/[...nextauth]` | API | N/A | NextAuth |

---

## Critical Flow: Invitation Rendering

### Complete runtime trace for `/i/client3-asfiya-zuhaib`:

```
1. Browser → GET https://invitingyou.in/i/client3-asfiya-zuhaib

2. Vercel Edge Network → Next.js Server Component
   File: src/app/i/[slug]/page.tsx
   params.slug = "client3-asfiya-zuhaib"

3. Prisma Query (Server-Side):
   prisma.wedding.findUnique({
     where: { slug: "client3-asfiya-zuhaib" },
     include: {
       couple: true, family: true,
       events: { orderBy: { order: 'asc' } },
       gallery: { orderBy: { order: 'asc' } },
       music: true, rsvpConfig: true,
       compliments: { orderBy: { order: 'asc' } },
       seo: true
     }
   })

4. Result: weddingRecord = {
     id: "...", slug: "client3-asfiya-zuhaib",
     templateId: "noor",
     templateVersion: 1,   ← present in DB, but...
     couple: { brideName: "Asfiya", groomName: "Zuhaib", ... },
     events: [...], gallery: [...], ...
   }

5. TYPE CAST (UNSAFE):
   const wedding = weddingRecord as unknown as WeddingData
   ⚠️ templateVersion is silently discarded here — WeddingData has no templateVersion field.

6. Template Resolution:
   const TemplateComponent = getDynamicTemplate(wedding.templateId as TemplateId)
   → getDynamicTemplate("noor")
   → templateLoaders["noor"]()
   → dynamic(() => import('@/templates/noor/NoorInvitation'))
   ⚠️ templateVersion is NEVER consulted. All Noor clients get the same latest code.

7. React renders: <NoorInvitation wedding={wedding} />
   - NoorInvitation destructures wedding data
   - Renders 15 sections

8. Response: Server-rendered HTML streamed to browser
   Client JS hydrates Framer Motion animations.
```

---

## Slug System Audit

| Question | Answer |
|---|---|
| How is slug generated? | Admin manually types it during wedding creation |
| Is slug unique? | ✅ Yes — `@unique` constraint in Prisma schema |
| Duplicate slug handling | ✅ API returns 409 with message "A wedding with this URL slug already exists" |
| Can slug be edited? | ✅ Yes — via PUT `/api/weddings/[id]` |
| Does changing slug break existing links? | ✅ Yes — no redirect exists for old slugs |
| Are unpublished invitations protected? | ❌ No — any slug resolves regardless of `status: 'DRAFT'` |
| Invalid slug → proper 404? | ❌ No — falls back to `client3-asfiya-zuhaib` invitation in dev mode |
| Can client data leak via URL manipulation? | ❌ Partial risk — all slugs resolve publicly, including DRAFT status |

---

## RSVP Data Flow

```
1. Guest fills form in VelvetRSVP / NoorRSVP (template-specific form)
2. Template calls /api/rsvp via fetch POST:
   { weddingId, guestName, attending, guestCount, message }
3. API validates weddingId exists and rsvpConfig.enabled === true
4. Creates RSVPResponse record
5. Creates WeddingAnalytic event = "rsvp"
6. Returns { success: true, id: response.id }
```

**Note**: `EngineRSVP.tsx` (the shared engine component) does NOT perform this flow. Its `handleSubmit` is a `setTimeout` placeholder that never calls the API.

---

## Admin Data Flow

```
1. Admin navigates to /admin/weddings/new
2. Fills form: slug, title, templateId, couple data, events, music
3. Submits → POST /api/weddings
4. API creates Wedding + related records in one transaction
5. Redirects to /admin/dashboard
6. Dashboard queries all weddings + RSVP counts
7. Admin clicks Edit → /admin/weddings/[id]/edit
8. Edit page fetches GET /api/weddings/[id]
9. Admin saves → PUT /api/weddings/[id]
```

**Security gap**: Steps 3, 8, and 9 have no authentication. Any user who knows a wedding UUID can GET, PUT, or DELETE it.

---

## Open Graph / Metadata Flow

```
generateMetadata() in /i/[slug]/page.tsx
  → prisma.wedding.findUnique (seo, couple included)
  → Returns: title, description, openGraph.images
```

`ogImage` from `WeddingSEO` is used if set. Otherwise no image is generated — WhatsApp/social previews will show a generic placeholder.