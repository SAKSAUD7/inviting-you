# 11 — Performance Audit
**Inviting You** · Speed & Optimization Assessment
**Audited**: 2026-08-29

---

## Build & Server Performance

- **Framework**: Next.js 16 (App Router)
- **Deployment**: Vercel Edge Network
- **Build Time**: Extremely fast (~10 seconds).
- **Bundle Size**: Efficient due to aggressive use of `next/dynamic`.
- **Database**: Prisma client is properly cached in development (`globalThis.prisma`) preventing connection leaks.

## Client-Side Performance (The Invitations)

The most critical performance metric is how fast a specific invitation (`/i/[slug]`) loads on a guest's mobile device on a 3G/4G connection.

### Strengths
1. **Server-Side Rendering (SSR)**: The entire invitation's HTML, including the couple's names and event details, is generated on the server. The guest does not see a loading spinner while waiting for a database query.
2. **Dynamic Imports**: A guest opening a Velvet invite downloads 0 bytes of Noor code.
3. **Intersection Observers**: Animations are only triggered (and painted) when elements scroll into view, keeping the main thread free during initial load.

### Weaknesses & Bottlenecks

1. **Unoptimized Images (Major Issue)**
   - Templates currently use standard `<img src="...">` tags or CSS `background-image` for high-resolution gallery and hero assets.
   - Next.js `<Image>` component is severely underutilized.
   - **Impact**: Massive payload sizes (potentially 10MB+ per invite), slow Largest Contentful Paint (LCP), and high data usage for mobile guests.

2. **Heavy Animation Libraries**
   - The Noor template uses `framer-motion`, which adds ~30-40kb of parsed JavaScript. While acceptable for a luxury product, if future templates all use different animation libraries (e.g., GSAP, Spring), the overall repository bloat will increase.

3. **Audio Preloading**
   - Background music currently uses native `<audio>` elements. Behavior across iOS Safari and Android Chrome regarding autoplay and preloading varies wildly, occasionally causing main-thread stuttering when audio decodes.

## Conclusion

The Next.js/Server architecture is flawless for performance. The frontend implementation of the templates requires an immediate refactor to mandate the use of `next/image` for all user-uploaded media.