# Executive Summary

## 1. Is the project fundamentally viable?
Yes. The foundational architecture (Next.js App Router, Prisma, framer-motion) is highly capable of scaling to a SaaS platform. The core data models (`Wedding`, `Couple`, `Events`, `Gallery`) are robust enough to support dynamic rendering across different visual templates without tight coupling to the data structure.

## 2. What is already good?
- **Universal Data Contract**: The Prisma schema provides a clean, template-agnostic data foundation.
- **Dynamic Routing**: The `/i/[slug]` route brilliantly resolves a single database record and passes it to the `TemplateRegistry`, preventing the need to deploy individual apps for clients.
- **Velvet Architecture**: Velvet provides an excellent reference for how to separate layout, animation, and static data inside a unique design system.
- **Modern Tech Stack**: Next.js 16 (Turbopack), React 19, and Tailwind/Vanilla CSS combo ensure high performance if optimized correctly.

## 3. What is currently dangerous?
- **Template Versioning**: There is no immutable template-version reference on the `Wedding` model. If `Noor` is updated, it automatically affects all past clients using `Noor`, potentially breaking their layouts or causing unintended aesthetic shifts.
- **Data Isolation (Multi-Tenancy)**: The Admin UI and API routes need strict verification to ensure `User A` cannot query or mutate `Wedding B`. 
- **Type Safety Gaps**: Component props occasionally drift from the main `InvitationTemplateProps` contract (as seen in the recent Sultan type mismatch).

## 4. What is currently slowing development?
- **Manual Asset Curation**: Sourcing, processing, and cropping ornaments (like floral dividers) consumes massive amounts of engineering time.
- **Lack of a Design System Abstraction**: While the data contract is clean, the visual contract (colors, fonts, borders) must be manually hardcoded for every new template.
- **No Component Factory**: Building a new template currently requires manually rewriting sections (`Hero`, `Gallery`, `Events`) even if the underlying logic is identical to previous templates.

## 5. Why are templates taking so long?
Because engineers are functioning as art directors. Building a template requires sourcing assets, tweaking CSS blend modes, adjusting Framer Motion timing curves, and testing responsiveness. There is no separation between the "Design Definition" and the "Code Implementation."

## 6. Why is Noor difficult to build?
Noor relies on an "Editorial Botanical" aesthetic, which requires high-quality, transparent, well-masked assets (florals, gold foils). Implementing these assets requires complex CSS trickery (like `mix-blend-mode: multiply`) which frequently breaks across mobile Safari and different stacking contexts.

## 7. What prevents thousands of client invitations?
Nothing fundamentally prevents this at the data level. However, the Admin Portal currently lacks the workflow to easily manage, filter, duplicate, and publish thousands of client records. Generating invitations is still too manual.

## 8. What prevents adding 50+ templates?
The lack of a shared component engine. If 50 templates are built using the current manual method, maintaining them will become a nightmare. If a bug is found in the `Gallery` slider, it would need to be fixed in 50 separate `[Template]Gallery.tsx` files.

## 9. What prevents admin-based automatic invitation generation?
The Admin Portal is still in its infancy. It lacks a comprehensive form wizard to input all required `WeddingData`, map it to the template, and generate the slug automatically without developer intervention.

## 10. What prevents card-image-to-invitation automation?
The system lacks the OCR/AI ingestion layer. While the Prisma schema is ready to receive structured JSON, there is no API endpoint or admin workflow to accept an image, pass it to an LLM Vision model, parse the JSON, and map it to a new `Wedding` draft.

## 11. What should be fixed FIRST?
**Template Versioning and the Shared Component Engine.** Before adding the 3rd or 4th template, the engine must abstract the structural logic (Sliders, Countdowns, Modals) away from the visual styling. 

## 12. What should NOT be touched yet?
The core Prisma schema and the dynamic routing infrastructure (`/i/[slug]`). These are currently the strongest and most scalable parts of the application.
