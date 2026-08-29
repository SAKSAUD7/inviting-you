# Database Audit
**Schema**: `prisma/schema.prisma`
**Core Model**: `Wedding` (1:1 with `WeddingCouple`, `RSVPConfig`; 1:M with `WeddingEvent`, `GalleryImage`).
**Scalability**: Highly scalable relational structure. Needs a `templateVersion` integer field to prevent breaking changes on older invites.