# QA / PERFORMANCE / SECURITY CHECKLIST

## BUILD

- npm run lint
- npm run build
- no TypeScript errors
- no console errors

---

# PUBLIC INVITATION

Test:

- direct URL
- refresh
- back button
- forward button
- mobile
- desktop
- tablet
- slow connection
- no images
- missing event
- no RSVP
- no music
- long names
- short names
- long venue
- long address
- multiple events
- zero events
- many gallery images
- no gallery
- reduced motion

---

# MOBILE

Test:

360
375
390
412
430

Check:

- no horizontal overflow
- readable typography
- buttons
- opening
- scroll
- gallery
- RSVP
- map
- video
- audio

---

# PERFORMANCE

Check:

- initial JS
- image sizes
- video sizes
- font loading
- LCP
- CLS
- animation frame rate
- memory use
- canvas usage
- WebGL usage

Avoid:

- huge uncompressed videos
- eager-loading entire galleries
- unnecessary client components
- repeated animation loops
- expensive layout reads

---

# ACCESSIBILITY

Check:

- keyboard
- focus
- contrast
- labels
- buttons
- reduced motion
- screen reader semantics

Opening must have a usable fallback.

---

# SECURITY

Check:

- admin authentication
- server-side authorization
- role permissions
- API validation
- upload validation
- rate limiting where appropriate
- no secrets in client
- no insecure direct object access
- slug access behavior
- RSVP abuse
- analytics privacy

---

# DATA

Check:

- cascading deletes
- unique slugs
- duplicate slugs
- version compatibility
- migration safety
- empty values
- optional sections
