# 18 — Antigravity Agent Strategy
**Inviting You** · AI Development Guidelines
**Audited**: 2026-08-29

---

## Directives for AI Agents Working on "Inviting You"

When Antigravity or any sub-agent operates on this codebase, they MUST adhere to the following principles.

### 1. The P0 Security Rule
Never deploy a new mutation API route (`POST`, `PUT`, `DELETE`) without wrapping it in a session check. The default pattern must be:
```typescript
import { auth } from '@/auth'
// ...
const session = await auth()
if (!session || session.user.role !== 'SUPER_ADMIN') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### 2. The Headless Engine Rule
When building a new template (e.g., Sultan, Meher), agents must **never** write new countdown math, RSVP `fetch` logic, or Gallery array navigation logic.
- They must use `src/engine/`.
- If the engine lacks a feature, the agent must update the engine in a backwards-compatible way, not fork the logic into the template.
- The engine must NEVER contain CSS styles (`style={{}}` or `.css` imports).

### 3. The Template Versioning Rule
If an agent needs to make a structural or design change to an existing template (e.g., redesigning Noor's hero section):
- **DO NOT** edit `NoorInvitation.tsx`.
- Duplicate the template to a `noor-v2` directory.
- Register it in `registry.ts` as `noor@2`.
- Make the changes in the V2 copy. This ensures past clients are never unexpectedly broken.

### 4. The Media Rule
Agents must never use standard HTML `<img>` tags for user-generated content (Gallery, Couple Photos). They must strictly use `next/image` to ensure WebP delivery and automatic resizing.

### 5. Migration Safety
Agents must not use `npx prisma db push` on this repository moving forward. Any schema alterations must be accompanied by `npx prisma migrate dev --name <descriptive_name>`.