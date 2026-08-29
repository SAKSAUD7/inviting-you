# 01 — Repository Map
**Inviting You** · Complete File & Directory Inventory
**Audited**: 2026-08-29 · **Stack**: Next.js 16.3.1 / React 19 / Prisma 5.22 / PostgreSQL

---

## Root Directory

| Item | Type | Purpose |
|---|---|---|
| `package.json` | Config | Dependencies, scripts, Prisma seed config |
| `next.config.ts` | Config | **Nearly empty** — no image domains, no headers, no rewrites |
| `tsconfig.json` | Config | Standard Next.js TS config with path alias `@/` → `src/` |
| `eslint.config.mjs` | Config | Standard Next.js ESLint config |
| `prisma/schema.prisma` | DB Schema | Full Prisma data model for the platform |
| `prisma/dev.db` | SQLite | **0-byte placeholder** — not the actual DB (production is PostgreSQL on Neon) |
| `prisma/seed*.js` | Seed Scripts | Multiple manual seed scripts for clients 1–3; no unified seeder |
| `.env` | Environment | `DATABASE_URL`, `DIRECT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET` |
| `Recording *.mp4` | Video | **Three raw screen recordings in the root** — dev artifacts, not assets |
| `noor_original_app.js` | Orphaned | Legacy standalone Noor JS prototype — not imported anywhere |
| `noor_original_styles.css` | Orphaned | Legacy Noor CSS — not imported anywhere |
| `noor_html.html` / `velvet_html.html` | Orphaned | HTML prototype files — not part of the Next.js app |
| `velvet_config.js` | Orphaned | Legacy Velvet config — not imported anywhere |
| `process_images.py` | Script | One-off Python/PIL script for image masking — not automated |
| `generate_audit_docs.js` | Orphaned | Audit scaffolding script — should be deleted |
| `AGENTS.md` | AI Config | Next.js version notice injected by `next dev` |
| `CLAUDE.md` | AI Config | Empty (11 bytes) |

---

## `/src` — Application Source

### `/src/app` — Next.js App Router

| Route | Type | Description |
|---|---|---|
| `/` | Client Component | Public marketing home page (`page.tsx`, `home.css`) |
| `/(auth)/` | Group Route | Auth route group (login) |
| `/admin/` | Layout + Pages | Admin Studio (protected by NextAuth session check) |
| `/admin/dashboard/` | Server Component | Stats + wedding list table |
| `/admin/weddings/new/` | Page | New invitation creation form |
| `/admin/weddings/[id]/edit/` | Page | Edit existing invitation |
| `/admin/weddings/[id]/rsvp/` | Page | View RSVP responses for a wedding |
| `/api/auth/[...nextauth]/` | API Route | NextAuth handler |
| `/api/rsvp/` | API Route | Public RSVP POST + authenticated GET |
| `/api/weddings/` | API Route | Wedding list (GET) + creation (POST) — **no auth guard** |
| `/api/weddings/[id]/` | API Route | Wedding CRUD by ID — **no auth guard on any method** |
| `/i/[slug]/` | Server Component | **Core invitation renderer** — dynamic template loader |
| `/templates/` | Static Page | Template gallery listing |
| `/templates/[id]/` | Static Pages | Per-template preview pages (velvet, noor, garden, pearl, sultan) |
| `globals.css` | Styles | Minimal global resets |
| `layout.tsx` | Root Layout | Providers wrapper |
| `Providers.tsx` | Client Component | SessionProvider wrapper |

### `/src/auth.ts`
NextAuth v5 configuration. Uses `CredentialsProvider` only. A single "super admin" is hardcoded using environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD`). No user lookup from the database during authentication.

### `/src/lib`
| File | Purpose |
|---|---|
| `prisma.ts` | Global Prisma singleton (prevents connection pool exhaustion in dev) |

### `/src/types`
| File | Purpose |
|---|---|
| `wedding.ts` | Complete TypeScript interfaces for `WeddingData`, `WeddingCouple`, `WeddingEvent`, `GalleryImage`, `TemplateId`, etc. |

### `/src/templates` — Template Engine

| Directory | Status | Description |
|---|---|---|
| `registry.ts` | Active | Template registry + dynamic loaders |
| `velvet/` | ✅ Production | Full dark luxury template (19 sections) |
| `noor/` | ✅ Production | Botanical light template (15 sections) |
| `sultan/` | 🚧 Stub | Basic palace door opening only (3 sections) |

### `/src/engine` — Shared Component Engine (NEW — Phase 1)

| File | Status | Problem |
|---|---|---|
| `EngineGallery.tsx` | Created | Hardcoded visual styles; not used by any template |
| `EngineCountdown.tsx` | Created | Logic is good; not used by any template |
| `EngineRSVP.tsx` | Created | Fake submission (setTimeout); not used by any template |

---

## `/public` — Static Assets

| Path | Content |
|---|---|
| `/images/` | Noor-specific assets: `bismillah_gold_transparent.png`, `noor_white_floral_divider_transparent.png`, etc. |
| `/assets/images/` | `noor-custom-opening.mp4` — video asset |
| `/templates/` | Thumbnail images for template cards |

**Concern**: All public images are flat under `/public/images/` — no per-template subdirectory organization. Velvet and Sultan have no assets in `/public/`.

---

## `/docs` — Documentation

| Path | Content |
|---|---|
| `docs/audit/` | This audit suite (20 files) |
| `docs/templates/noor/` | Noor-specific design audit notes |

---

## Orphaned Files (No Active Import)

| File | Should Be |
|---|---|
| `noor_original_app.js` | Deleted or archived |
| `noor_original_styles.css` | Deleted or archived |
| `noor_styles.css` | Deleted or archived |
| `noor_html.html` | Deleted or archived |
| `velvet_html.html` | Deleted or archived |
| `velvet_reference.html` | Deleted or archived |
| `velvet_config.js` | Deleted or archived |
| `process_images.py` | Moved to `scripts/` |
| `generate_audit_docs.js` | Deleted |
| `Recording *.mp4` (3 files, ~64MB) | Moved out of repo root |
| `prisma/dev.db` (0 bytes) | Should be in `.gitignore` |