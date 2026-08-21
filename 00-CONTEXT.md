# INVITING YOU — MASTER PROJECT CONTEXT

## Mission

Build a premium digital invitation design house and scalable invitation platform.

This is not merely a template website. The product should combine:

- luxury digital invitation experiences
- cinematic motion design
- culturally-aware Indian wedding design
- client-specific live invitation URLs
- admin/client management
- RSVP and guest workflows
- reusable template infrastructure
- future self-service personalization
- future wedding/guest platform capabilities
- future white-label SaaS for planners and agencies

The quality target is: **luxury design studio + cinematic website + interactive invitation + robust SaaS architecture**.

The user wants the system to feel unusually beautiful, polished, fast, emotional and premium.

---

# CURRENT CODEBASE — IMPORTANT

The uploaded project is `inviting-you-main`.

Current stack:

- Next.js 16.3.1
- React 19.2.8
- TypeScript
- Prisma 5
- PostgreSQL
- NextAuth
- GSAP
- Vercel Blob
- QRCode
- bcryptjs

Current important paths:

- `src/app/page.tsx` — main homepage
- `src/app/templates/page.tsx` — template gallery
- `src/app/templates/[id]/page.tsx` — template detail
- `src/app/i/[slug]/page.tsx` — live invitation route
- `src/app/admin/dashboard/page.tsx` — admin dashboard
- `src/app/admin/weddings/new/page.tsx` — create invitation
- `src/app/admin/weddings/[id]/edit/page.tsx` — edit invitation
- `src/app/admin/weddings/[id]/rsvp/page.tsx` — RSVP management
- `src/app/api/weddings/route.ts`
- `src/app/api/weddings/[id]/route.ts`
- `src/app/api/rsvp/route.ts`
- `src/templates/registry.ts`
- `src/templates/noor/NoorInvitation.tsx`
- `src/templates/noor/noor.css`
- `src/templates/velvet/VelvetInvitation.tsx`
- `src/templates/velvet/sections/*`
- `src/templates/velvet/velvet.css`
- `src/types/wedding.ts`
- `prisma/schema.prisma`

Existing templates:

- Velvet — implemented
- Noor — implemented
- Garden — registry metadata exists, implementation commented
- Pearl — registry metadata exists, implementation commented

The current template registry is already dynamically importing templates. Preserve and improve this approach.

---

# CURRENT DATABASE

Current models include:

- User
- Wedding
- WeddingCouple
- WeddingFamily
- WeddingEvent
- GalleryImage
- WeddingMusic
- RSVPConfig
- RSVPResponse
- Compliment
- WeddingSEO
- WeddingAnalytic

Current Wedding has:

- unique slug
- title
- templateId
- status
- publishedAt
- userId

Current couple data includes:

- bride/groom names
- qualifications
- photos
- couple photo
- monogram
- Gregorian date
- Hijri date
- Islamic verse
- invitation message

This is a good MVP foundation.

Do not throw away the database.

Evolve it safely.

---

# CURRENT NOOR STATE

Noor is currently a light ivory/green/gold Islamic invitation.

Current opening:

- fixed full-screen panel
- "You are invited"
- couple names
- date
- Open Invitation button
- panel slides upward

Current content:

- Islamic verse/invitation
- couple presentation
- family references
- events
- compliments
- RSVP/closing

Current CSS uses:

- ivory/cream
- green
- gold
- serif/sans
- simple arch
- simple reveal-hidden IntersectionObserver animation

This is the template that must receive the largest visual upgrade.

Noor should become a flagship design rather than a basic template.

---

# CURRENT VELVET STATE

Velvet already contains a much richer collection of sections and interactions:

- opening
- monogram
- welcome
- scratch reveal
- gallery
- countdown
- program
- events
- venue
- family
- blessings
- compliments
- gifts
- RSVP
- closing
- music
- particles/canvas/video in parts

Use Velvet as a source for extracting reusable capabilities into the shared Invitation Engine.

Do not destroy Velvet's visual identity.

---

# ARCHITECTURAL NORTH STAR

Separate four concerns:

1. CONTENT
2. TEMPLATE
3. THEME
4. MOTION/DECORATION

Conceptually:

Wedding Data
+
Template Definition
+
Theme
+
Motion
+
Decorations
=
Final Invitation

A template may reuse shared components, but its visual composition, art direction, typography, decorations, animation choreography and section ordering must remain distinctive.

---

# NON-NEGOTIABLE DESIGN PRINCIPLE

Reuse **engineering primitives**, not **visual identity**.

Good reuse:

- Gallery engine
- RSVP engine
- Countdown engine
- Event engine
- Map component
- Music engine
- Image optimization
- Intersection observer utility
- GSAP utility
- modal/lightbox
- media loader

Bad reuse:

- same exact hero
- same exact section layout
- same exact ornament placement
- same exact animation sequence
- same color system
- same typography pairing
- same decoration package

Every flagship template should look and feel independently art-directed.

---

# COMPETITIVE RESEARCH INSIGHTS

Research has covered:

- Zareqia
- Zinggly
- TyingKnot
- Shagna
- ASHWEB
- GlowGreet
- Wishlys
- Wedmet
- Dreams Invite
- Luxury Invites
- EnviteYou
- eInvit
- WedCraft
- VowNote
- Riwaaz
- MyShaadhi Link
- TheAshNow
- Wedora
- SuPraKu
- Shaadi.digital
- iWed.ai
- other current invitation products and founder/customer discussions

Useful current references:

Zareqia:
https://zareqia.com/
https://zareqia.com/templates
https://zareqia.com/invite/demo
https://zareqia.com/terms

Zinggly:
https://www.zinggly.com/

TyingKnot:
https://tyingknot.in/templates
https://www.tyingknot.in/blog/best-wedding-invitation-templates-india
https://www.tyingknot.in/blog/wedding-invitation-website
https://www.tyingknot.in/blog/whatsapp-wedding-invitation

Other references:
https://shagna.in/
https://www.ashweb.site/templates
https://www.glowgreet.studio/
https://wishlys.com/wedding-invitations
https://invite.wedmet.com/
https://www.dreamsinvite.com/
https://theluxuryinvites.com/
https://enviteyou.com/
https://einvit.in/
https://www.wedcraft.in/
https://www.vownote.in/
https://www.riwaaz.in/
https://myshaadhilink.in/
https://tools.theashnow.com/invitation/
https://www.wedoradesign.com/
https://www.supraku.in/
https://shaadi.digital/

---

# MARKET OBSERVATIONS

The market is converging on:

- mobile-first
- WhatsApp sharing
- cinematic openings
- RSVP
- event schedules
- maps
- galleries
- music
- multilingual typography
- guest management
- custom domains
- template switching
- analytics
- increasingly AI-assisted creation
- wedding websites rather than static cards

TyingKnot currently positions 54 signature designs across luxury, minimalist, floral, traditional, cinematic, romantic, destination and interactive categories.

Zinggly currently emphasizes 21 hand-crafted designs, cinematic/mobile-first UX, live RSVP, sound, multilingual typography and a very fast creation flow.

Zareqia currently emphasizes animated templates, scratch reveal, 3D door/curtain animations, music, maps, galleries and optional sections.

These are research signals, not designs to copy.

---

# LEGAL / ORIGINALITY RULE

Competitor websites are research inputs.

Do not copy:

- source code
- HTML/CSS/JS
- proprietary assets
- photographs
- illustrations
- videos
- music
- logos
- branding
- exact text
- exact template names
- pixel-level layouts
- exact animation sequences
- watermarked assets

Do not download competitor assets for reuse.

Use the following transformation:

REFERENCE
→ ABSTRACT PRINCIPLE
→ NEW STORY
→ NEW VISUAL METAPHOR
→ NEW COMPOSITION
→ ORIGINAL ART DIRECTION
→ ORIGINAL ASSETS
→ ORIGINAL MOTION
→ ORIGINAL TEMPLATE

The goal is to create independently authored designs inspired by broad market principles.

---

# PRODUCT POSITIONING

Do not position the business as:

"cheap digital invitation maker."

Target:

**Premium Digital Wedding Experiences**

Eventually offer:

- Starter
- Signature
- Luxury
- Bespoke
- Planner/Agency white-label

Long-term product:

Invitation
→ RSVP
→ Guests
→ Events
→ Accommodation
→ Transport
→ reminders
→ gallery
→ memories
→ analytics
→ white-label planner platform

---

# DESIGN QUALITY BAR

Every design should be:

- mobile-first
- cinematic where appropriate
- emotionally coherent
- culturally respectful
- editorial
- premium
- fast
- accessible
- responsive
- intentional

Avoid:

- generic Canva aesthetics
- random gradients
- random particles
- excessive gold
- identical layouts
- excessive glassmorphism
- animation everywhere
- stock-looking cultural imagery
- clutter

Luxury should come from composition, typography, spacing, materiality, lighting and motion discipline.

---

# AI AGENT BEHAVIOR

The AI coding/design agent must:

1. Inspect before modifying.
2. Research before inventing when the task involves design.
3. Think through architecture before coding.
4. Prefer reusable systems.
5. Preserve existing working functionality.
6. Make incremental changes.
7. Run lint/build/tests after significant work.
8. Check mobile and desktop.
9. Check accessibility.
10. Check performance.
11. Never silently make destructive migrations.
12. Document important architectural decisions.
13. Maintain a changelog.
14. Maintain a template inventory.
15. Keep design rationale for each template.
16. Ask for clarification only when a decision truly cannot be inferred; otherwise choose the strongest professional option and document it.

---

# DEFINITION OF DONE

A feature is not done because it renders.

It is done when:

- correct on mobile
- correct on desktop
- keyboard/accessibility reviewed
- loading/performance reviewed
- data edge cases handled
- empty states handled
- error states handled
- API protected
- no console errors
- lint passes
- build passes
- existing templates still work
- admin flow still works
- direct invitation URL works
- refresh/deep-link works
- no regression introduced
