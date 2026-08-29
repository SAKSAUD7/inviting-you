# Security Audit
- **NextAuth**: Correctly implemented for admin authentication.
- **IDOR Risks**: API routes mutating wedding data must strictly verify `session.user.id === wedding.userId`.