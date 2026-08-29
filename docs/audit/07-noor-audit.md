# 07 — Noor Template Audit
**Inviting You** · Template Specific Assessment
**Audited**: 2026-08-29

---

## Design System

| Element | Specification |
|---|---|
| **Theme** | Light, elegant, serene botanical |
| **Primary Color** | Ivory / Pearl (`--noor-bg`) |
| **Accent Color** | Sage Green & Gold (`--noor-sage`, `--noor-gold`) |
| **Typography** | Serif (headings), Sans-serif (body), Script (accents) |
| **Vibe** | Graceful, airy, Islamic architectural motifs |

## Architecture

- **Entry Point**: `src/templates/noor/NoorInvitation.tsx`
- **Sections**: 15 independent React components in `src/templates/noor/sections/`
- **Styling**: Uses CSS Modules/Variables within its domain.
- **Animations**: Heavy reliance on `framer-motion` for fluid, physics-based animations (unlike Velvet which uses raw CSS transitions).

## Technical Assessment

### What Works Well
- **Framer Motion Integration**: The use of `framer-motion` provides a much smoother, app-like feel compared to standard CSS transitions.
- **Component Cleanliness**: The codebase for Noor is generally cleaner and more modernized than Velvet.
- **Specific Micro-interactions**: Includes `NoorInteractiveDua` and `NoorParticles` which elevate the visual premium feel.

### Architecture Violations
- **Logic Duplication**: Like Velvet, Noor implements its own RSVP state/submit logic and its own Countdown logic (`NoorCountdown.tsx`).
- **Heavy Bundle**: Using `framer-motion` adds bundle size, but since this is dynamically loaded only for Noor clients, the impact on other templates is zero.

### Design Audit Status
- Noor has undergone a recent intensive design audit. Several sections (Interactive Dua, Bismillah Intro, specific typography spacing) have been flagged for refinement to hit the true "Premium/Ultra-Luxury" bar.
- See `docs/templates/noor/noor-design-audit.md` for the deep-dive UX findings.