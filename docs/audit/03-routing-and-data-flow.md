# Routing and Data Flow
**Public Routing**: `/` routes to the generic landing page.
**Invitation Routing**: `/i/[slug]` acts as a dynamic resolver. It queries Prisma, matches the `slug`, pulls the `templateId`, and renders the appropriate template component with `WeddingData`.
**Admin Routing**: `/admin/*` routes are protected by NextAuth middleware.