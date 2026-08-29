# 04 — Database & Schema Audit
**Inviting You** · Prisma & PostgreSQL Assessment
**Audited**: 2026-08-29

---

## Data Model Structure

The Prisma schema (`prisma/schema.prisma`) is well-designed and robust. It uses a relational model with `Wedding` as the central entity.

### Entities

| Model | Purpose | Status |
|---|---|---|
| `User` | Admin users | Used (super admin only) |
| `Wedding` | Core invitation record | ✅ Complete |
| `WeddingCouple` | Bride/Groom details & dates | ✅ 1-to-1 with Wedding |
| `WeddingFamily` | Parent/Grandparent names | ✅ 1-to-1 with Wedding |
| `WeddingEvent` | Nikkah, Valima, Reception | ✅ 1-to-many, ordered |
| `WeddingMusic` | Background audio track | ✅ 1-to-1 with Wedding |
| `GalleryImage` | Pre-wedding photo URLs | ✅ 1-to-many, ordered |
| `Compliment` | "With best compliments from..." | ✅ 1-to-many, ordered |
| `WeddingSEO` | Metadata & OG Image | ✅ 1-to-1 with Wedding |
| `RSVPConfig` | Settings for RSVP collection | ✅ 1-to-1 with Wedding |
| `RSVPResponse` | Guest submissions | ✅ 1-to-many with Wedding |
| `WeddingAnalytic`| Page view & RSVP events | ✅ 1-to-many with Wedding |

### Schema Highlights

- **Strong relationships**: Explicit foreign keys and `onDelete: Cascade` rules are implemented correctly. Deleting a wedding will clean up all associated data.
- **Ordered data**: `WeddingEvent`, `GalleryImage`, and `Compliment` have an `order Int` field, essential for controlling display order in templates.
- **Type safety**: Enums are used appropriately (`WeddingStatus`, `UserRole`, `EventType`).
- **Template versioning**: `templateVersion Int @default(1)` exists on `Wedding` (added in Phase 1) but is not yet utilized in runtime routing.

---

## Migration Strategy

**Severity: P2 — Moderate Risk**

- **Current State**: The project has never used `prisma migrate`. Changes have been applied directly to the database using `prisma db push`.
- **Directory**: There is no `/prisma/migrations` folder in the repository.
- **Impact**: Without migrations, there is no reproducible history of database changes. If a deploy fails or a schema change needs to be rolled back, `db push` cannot handle it safely.
- **Action Required**: The next schema change must be applied via `npx prisma migrate dev --name <migration_name>`, establishing the initial migration history.

---

## Seed Data

- **Current State**: Seed data is managed via multiple ad-hoc JS/TS scripts (`seed.ts`, `seed_client.js`, `seed_client2.js`, etc.) located in the `prisma/` folder.
- **Impact**: There is no unified, idempotent seed script. Running `npx prisma db seed` may yield unpredictable results depending on which script is set in `package.json`.
- **Action Required**: Consolidate seed scripts into a single `seed.ts` that safely upserts test data or handles specific environments cleanly.

---

## Database Connection

- **Provider**: PostgreSQL (Neon serverless).
- **Pooling**: `DIRECT_URL` is configured for migrations, and `DATABASE_URL` is used for application queries.
- **Next.js Integration**: `src/lib/prisma.ts` correctly instantiates a global Prisma singleton to prevent connection pool exhaustion during hot-reloads in development.

---

## Conclusion

The schema design is excellent and scalable. The only architectural weakness in the data layer is the lack of formal Prisma migrations, which is a common artifact of fast MVP development but must be corrected before Phase 2.