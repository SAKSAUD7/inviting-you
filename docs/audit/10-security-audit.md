# 10 — Security Audit
**Inviting You** · Vulnerability & Access Assessment
**Audited**: 2026-08-29

---

## 🚨 CRITICAL VULNERABILITIES (P0)

### 1. Unauthenticated API Routes (Data Exposure & Tampering)
**Location:** `src/app/api/weddings/route.ts` and `src/app/api/weddings/[id]/route.ts`

The core API routes that power the Admin Dashboard have **no authentication guards**.

- **Impact**: Any user with Postman or `curl` can send a `GET` request to `https://invitingyou.in/api/weddings` and receive a full JSON payload of every client on the platform, including their names and slugs.
- **Impact**: Any user can send a `DELETE` or `PUT` request to `https://invitingyou.in/api/weddings/[uuid]` and maliciously delete or alter a client's invitation.
- **Root Cause**: The developer relied on `NextAuth` protecting the `/admin/*` frontend pages, but forgot to protect the `/api/*` endpoints the frontend calls.

### 2. Unauthenticated RSVP Data (PII Exposure)
**Location:** `src/app/api/rsvp/route.ts`

The `GET` method on the RSVP route takes a `weddingId` query parameter and returns all RSVP responses.
- **Impact**: Anyone who intercepts or finds a `weddingId` (which is visible in the network tab when the client loads the invite) can fetch the full list of guests, their names, attendance status, and personal messages.

---

## Medium & Low Risks

### 1. Hardcoded Super Admin (Medium)
**Location:** `src/auth.ts`

Authentication bypasses the database entirely. It checks if the provided email/password matches `process.env.ADMIN_EMAIL`. 
- **Risk**: If the `.env` file is compromised, the attacker has permanent super-admin access. There is no mechanism to rotate passwords via UI or invalidate active sessions immediately.

### 2. Predictable URL Slugs (Low)
**Location:** `src/app/api/weddings/route.ts`

Slugs are generated based on names (e.g., `iqra-mufassir`).
- **Risk**: A curious party could easily guess the URLs of upcoming weddings for prominent individuals.
- **Mitigation**: Add a random 4-character hash suffix to all generated slugs (e.g., `iqra-mufassir-a7x9`).

### 3. Lack of Rate Limiting (Low)
**Location:** All API Routes

There is no rate limiting on the RSVP POST endpoint.
- **Risk**: A malicious bot could spam thousands of fake RSVPs to a client's invitation.

---

## Action Plan

1. **IMMEDIATE (Next PR)**: Wrap all `GET`, `POST`, `PUT`, and `DELETE` handlers in `src/app/api/weddings/*` with `const session = await auth(); if (!session) return 401`.
2. **IMMEDIATE (Next PR)**: Protect the `GET` handler in `src/app/api/rsvp/route.ts` with the same auth check.