# 05 — Template Engine Audit
**Inviting You** · Dynamic Template System Assessment
**Audited**: 2026-08-29

---

## The Registry System

The template engine is driven by a central registry located at `src/templates/registry.ts`. 

### Dynamic Loading
It utilizes Next.js `next/dynamic` to lazy-load template bundles based on the `templateId` assigned to a wedding record. 

```typescript
const templateLoaders: Record<string, () => Promise<any>> = {
  velvet: () => import('@/templates/velvet/VelvetInvitation'),
  noor: () => import('@/templates/noor/NoorInvitation'),
  sultan: () => import('@/templates/sultan/SultanInvitation'),
  // garden and pearl are currently stubbed out
}
```

**Verdict:** ✅ Highly efficient. When a guest visits a `velvet` invitation, they do not download the code, styles, or assets for `noor` or `sultan`. This is critical for scaling to 50+ templates.

---

## Phase 1 Verification Findings (FAILED)

A previous development phase (Phase 1) attempted to introduce **Template Versioning** and a **Shared Engine**. The audit has revealed that these features are completely non-functional.

### 1. Template Versioning is Dead Code
- **DB Level**: `templateVersion` column was added to the `Wedding` model (`Int @default(1)`).
- **TS Level**: `templateVersion` was **omitted** from the `WeddingData` type interface.
- **Runtime**: The dynamic router (`src/app/i/[slug]/page.tsx`) explicitly ignores versioning. It only resolves by `templateId`. `noor-v1` and `noor-v2` cannot coexist.

### 2. The Shared Engine is Dead Code
- **Files created**: `src/engine/EngineGallery.tsx`, `EngineCountdown.tsx`, `EngineRSVP.tsx`.
- **Adoption**: **Zero templates** import any code from `src/engine`. Velvet and Noor use their own independent implementations of Galleries, Countdowns, and RSVPs.
- **Defects**: `EngineRSVP.tsx` has a fake `setTimeout` submission handler. `EngineGallery.tsx` hardcodes CSS styles (`height: 300px`, background colors) which breaks the core requirement of being visually headless.

---

## Data Injection Architecture

All templates conform to a single interface: `InvitationTemplateProps`, which expects a `wedding: WeddingData` object.

```tsx
<TemplateComponent wedding={wedding} />
```

Inside the templates, data is destructured and passed down to sections:

```tsx
export default function VelvetInvitation({ wedding }: { wedding: WeddingData }) {
  return (
    <main>
       <VelvetWelcome couple={wedding.couple} />
       <VelvetGallery images={wedding.gallery} />
       <VelvetEvents events={wedding.events} />
    </main>
  )
}
```

**Verdict:** ✅ Excellent. This prop-drilling is shallow (only one level deep) and ensures strict type safety between the database and the presentation layer.

---

## Blockers for Scale

Currently, if we build 50 templates, we will have 50 separate implementations of:
- Countdown logic (date math, `setInterval` cleanup)
- RSVP submission (form state, fetch calls, loading states)
- Photo Gallery lightbox (DOM locking, array navigation)

**Action Required:** Phase 1 (Shared Engine) must be properly completed and adopted by Sultan (Phase 2) before we can consider the platform scalable. The engine components must become purely headless hooks or unstyled structural components.