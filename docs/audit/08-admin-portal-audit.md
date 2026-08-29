# 08 — Admin Portal Audit
**Inviting You** · Studio Backend Assessment
**Audited**: 2026-08-29

---

## Overview

The Admin Portal (referred to as "Studio") lives under `/admin/*` and is the internal CMS for creating and managing client invitations.

### Core Routes
- `/admin/login` - Simple credentials form
- `/admin/dashboard` - Global statistics and client list
- `/admin/weddings/new` - Giant multi-step form to provision a new wedding
- `/admin/weddings/[id]/edit` - Edits an existing record
- `/admin/weddings/[id]/rsvp` - Tabular view of guest RSVPs

## Technical Assessment

### Strengths
- **Comprehensive Form**: The creation form handles all nested relations (Couple, Family, Events, RSVP config) in a single massive Prisma transaction.
- **Dashboard UI**: Clean, functional overview of the business (total invites, drafts, published, RSVP counts).
- **Session Protection**: The layout correctly enforces `NextAuth` session presence.

### Weaknesses & Risks

#### 1. Form Complexity (UX)
The `new` and `edit` forms are monolithic and overwhelming. Entering data for 4 events, 6 family members, and couple details on a single page is prone to error and data loss if the browser refreshes. 

#### 2. Lack of Image Upload UI
There is currently no way to upload Gallery Images via the Admin UI. Images must be manually uploaded to Vercel Blob/S3, and their URLs pasted into the database manually or via a custom script.

#### 3. No Template Configuration
The admin selects a Template ID (e.g., "noor"), but there is no UI to configure template-specific settings (e.g., turning off the scratch reveal, or changing the primary accent color).

#### 4. Hardcoded Super Admin
There is no concept of multiple agency users. The entire system is hardcoded to a single `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the environment variables.

---

## Target State (Future)
The Admin Studio requires a UX overhaul to become a stepped wizard interface, with integrated drag-and-drop image uploading connected directly to Vercel Blob storage.