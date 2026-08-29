# 09 — Public Website Audit
**Inviting You** · Marketing & Landing Page Assessment
**Audited**: 2026-08-29

---

## Overview

The public marketing presence consists of a single landing page (`src/app/page.tsx`) and template preview pages (`/templates/[id]`).

### Content Structure
- **Hero**: Value proposition with a static CSS/HTML phone mockup showcasing the Velvet template.
- **Template Grid**: Displays 6 templates (Velvet, Noor, Meher, Zariya, Sukoon, Sultan). Only Velvet is marked "Live", the rest are "Coming Soon".
- **Features**: Grid of 8 features (Live Countdown, Photo Gallery, etc.).
- **How It Works**: 4-step process.
- **FAQ**: Pricing, delivery times, and customization details.

## Technical Assessment

### Strengths
- **Performance**: The entire public page is a Client Component but is statically optimized. It loads extremely fast.
- **No Heavy Dependencies**: The phone mockup in the hero section is built entirely with CSS and `div`s, rather than loading a massive image or 3D model.
- **Scroll Animations**: A lightweight IntersectionObserver is used to trigger `.animate-on-scroll` classes. This avoids the overhead of loading Framer Motion for the marketing site.

### Weaknesses & Growth Areas

#### 1. Static Data Source
The `templates` array in `page.tsx` is hardcoded. It duplicates data that should logically live in `src/templates/registry.ts` (the `TEMPLATE_REGISTRY` constant). If a new template is added, it must be manually updated in both places.

#### 2. WhatsApp Conversion Flow
The primary call-to-action is a direct `wa.me` WhatsApp link. While effective for MVP high-touch sales, it doesn't capture any structured lead data or track conversion events programmatically.

#### 3. No Actual Template Preview Pages
Clicking "Preview" on a template card currently links to `/templates/[id]`, but these pages are extremely thin wrappers that just load the template with fake data. There is no dedicated marketing showcase per-template explaining its typography or inspiration.

---

## Conclusion
The public website is highly performant and achieves its goal as an MVP marketing asset. The next evolutionary step is pulling template data dynamically from the central registry and building out dedicated showcase pages for each theme.