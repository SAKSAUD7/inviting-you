# INVITING YOU — MASTER PROJECT AUDIT
**Audited**: 2026-08-29

> **Note**: This file serves as the table of contents for the complete architectural and UX audit of the Inviting You platform. Read `00-executive-summary.md` for the high-level verdict.

---

## Part 1: The Core Systems

* **[00 — Executive Summary](./00-executive-summary.md)**
  High-level verdict, critical P0 discoveries, and recommended path forward.

* **[01 — Repository Map](./01-repository-map.md)**
  Complete file and directory inventory, highlighting orphaned files and structure.

* **[02 — Architecture Audit](./02-architecture-audit.md)**
  Assessment of the Next.js 16 monolithic structure, server-side rendering, and weaknesses.

* **[03 — Routing & Data Flow](./03-routing-and-data-flow.md)**
  Complete runtime trace of how a slug resolves to a rendered invitation, and admin data flows.

* **[04 — Database & Schema Audit](./04-database-audit.md)**
  Prisma relational model assessment, migration strategy risks, and seed data state.

* **[05 — Template Engine Audit](./05-template-engine-audit.md)**
  Analysis of the dynamic `next/dynamic` registry, data injection, and the failures of the Shared Engine attempt.

---

## Part 2: The Templates

* **[06 — Velvet Template Audit](./06-velvet-audit.md)**
  Assessment of the cinematic midnight luxury template.

* **[07 — Noor Template Audit](./07-noor-audit.md)**
  Assessment of the light botanical template (including Framer Motion usage).

---

## Part 3: The Platforms

* **[08 — Admin Portal Audit](./08-admin-portal-audit.md)**
  UX and technical assessment of the Studio backend (forms, dashboard, data entry).

* **[09 — Public Website Audit](./09-public-website-audit.md)**
  Assessment of the marketing landing page and sales funnel.

---

## Part 4: Technical & UX Deep Dives

* **[10 — Security Audit](./10-security-audit.md)**
  🚨 **CRITICAL**: Details the unauthenticated API routes and data exposure risks.

* **[11 — Performance Audit](./11-performance-audit.md)**
  Speed, bundle size, and the massive unoptimized images bottleneck.

* **[12 — UX / UI Audit](./12-ux-ui-audit.md)**
  Analysis of the guest experience (audio, forms) and admin data entry friction.

* **[13 — AI & Automation Audit](./13-ai-automation-audit.md)**
  Opportunities for LLM-based "Magic Import" to speed up admin workflows.

* **[14 — Scalability Audit](./14-scalability-audit.md)**
  Assessment of infrastructure vs codebase scalability (multi-tenancy blockers).

---

## Part 5: Action Plans

* **[15 — Critical Problems (The P0 List)](./15-critical-problems.md)**
  The absolute blockers that must be fixed before any new features are built.

* **[16 — Target Architecture](./16-target-architecture.md)**
  Blueprint for the Headless Engine, Versioned Registry, and Media Pipeline.

* **[17 — Recommended Roadmap](./17-recommended-roadmap.md)**
  Strict phased execution plan starting with Architecture Remediation.

* **[18 — Antigravity Agent Strategy](./18-antigravity-agent-strategy.md)**
  Directives for any AI working on this codebase to prevent technical debt.

* **[PHASE-1-VERIFICATION](./PHASE-1-VERIFICATION.md)**
  The deep-dive evidence document proving why Phase 1 (Shared Engine/Versioning) failed its completion criteria.
