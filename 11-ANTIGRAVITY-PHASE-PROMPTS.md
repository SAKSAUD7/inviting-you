# ANTIGRAVITY PHASE PROMPTS

Use these sequentially. Do not paste all of them at once.

---

# PROMPT 01 — AUDIT

Read:

00-CONTEXT.md
01-MASTER-ROADMAP.md
02-MASTER-ANTIGRAVITY-CONTROLLER.md

Inspect the entire repository.

Do not modify code.

Produce:

- architecture map
- current feature map
- database map
- template map
- admin map
- API map
- security findings
- performance findings
- duplication findings
- Noor findings
- Velvet findings
- migration risks

Save:

docs/AUDIT.md

---

# PROMPT 02 — BASELINE FIXES

Implement only critical baseline/security issues identified in AUDIT.

Do not redesign templates yet.

Run lint/build.

Document changes.

---

# PROMPT 03 — ENGINE FOUNDATION

Implement the shared Invitation Engine.

Start with types and boundaries.

Do not migrate every component immediately.

Keep Velvet and Noor working.

Run build.

---

# PROMPT 04 — EXTRACT VELVET

Extract reusable capabilities from Velvet.

Preserve Velvet's visual output.

Do not redesign Velvet.

Compare before/after.

---

# PROMPT 05 — MIGRATE NOOR

Move Noor onto the shared engine while preserving current content.

Do not perform the visual redesign yet.

Verify that Noor still renders.

---

# PROMPT 06 — NOOR CREATIVE REDESIGN

Read:

06-NOOR-REDESIGN-PROMPT.md

Redesign Noor completely.

Make it the flagship.

Do not add random effects.

Use the five signature moments.

---

# PROMPT 07 — ADMIN FOUNDATION

Read:

04-ADMIN-PORTAL-PROMPT.md

Upgrade admin.

Do not build unnecessary enterprise features.

Prioritize:

weddings
editor
templates
media
RSVP

---

# PROMPT 08 — TEMPLATE SYSTEM

Read:

05-TEMPLATE-ENGINE-PROMPT.md

Implement template metadata/version architecture.

Make registry the source of truth.

---

# PROMPT 09 — MAIN WEBSITE

Read:

03-MAIN-WEBSITE-PROMPT.md

Upgrade public site into a luxury showroom.

---

# PROMPT 10 — COLLECTION

Read:

07-TEMPLATE-COLLECTION-BRIEFS.md

Implement template #3 only.

Do not start all templates.

Finish one completely.

---

# PROMPT 11 — QA

Read:

09-QA-PERFORMANCE-SECURITY.md

Test everything.

Fix regressions.

---

# PROMPT 12 — REPEAT

Repeat template process:

research
→ brief
→ design
→ implementation
→ QA
→ social assets
→ publish

for each next template.

---

# PROMPT 13 — SOCIAL

Read:

08-REEL-AND-SOCIAL-PROMPT.md

Create template social concepts.

---

# PROMPT 14 — GUEST PLATFORM

Only after the invitation engine and first collection are stable.

Implement:

guest model
event-specific RSVP
guest-specific links
reminders
analytics

---

# PROMPT 15 — SAAS

Only after product-market validation.

Implement:

organization
team members
client workspaces
billing
domains
white-label
usage
roles
