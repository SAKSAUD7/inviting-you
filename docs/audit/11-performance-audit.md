# Performance Audit
**Strengths**: Dynamic imports keep initial load times low.
**Risks**: Heavy unoptimized PNGs and deep Framer Motion component trees can cause jank on lower-end Android devices. Use `next/image` strictly.