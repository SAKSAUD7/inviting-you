# 06 — Velvet Template Audit
**Inviting You** · Template Specific Assessment
**Audited**: 2026-08-29

---

## Design System

| Element | Specification |
|---|---|
| **Theme** | Cinematic midnight luxury |
| **Primary Color** | Deep Maroon / Crimson (`--velvet-bg`) |
| **Accent Color** | Gold / Champagne (`--velvet-gold`) |
| **Typography** | Serif (headings), Sans-serif (body), Script (accents) |
| **Vibe** | Dramatic, heavy, traditional, commanding |

## Architecture

- **Entry Point**: `src/templates/velvet/VelvetInvitation.tsx`
- **Sections**: 19 independent React components in `src/templates/velvet/sections/`
- **Styling**: Single CSS file (`velvet.css`) heavily utilizing CSS variables for themeing. No inline hardcoded styles outside of React animation logic.
- **Animations**: Uses Intersection Observer for scroll-reveal animations (`.reveal` and `.is-visible` classes).

## Technical Assessment

### What Works Well
- **Modularity**: Velvet is broken down into 19 logical components (`VelvetWelcome`, `VelvetGallery`, `VelvetRSVP`, etc.).
- **Conditional Rendering**: Sections gracefully hide if the underlying database data is missing (e.g., if there are no gallery images, the gallery section is omitted).
- **Interactive Elements**: The `VelvetScratchReveal` provides a highly engaging micro-interaction for guests.
- **Audio Integration**: The `VelvetMusicPlayer` correctly hooks into the global opening interaction.

### Architecture Violations
- **Logic Duplication**: Velvet implements its own RSVP `fetch` call and form state, and its own Countdown math. It does not use the Shared Engine.

### Design Audit Status
- Velvet's design is considered **Complete and Premium**. No immediate UI overhaul is required.