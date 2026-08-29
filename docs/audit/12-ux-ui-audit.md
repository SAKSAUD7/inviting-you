# 12 — UX / UI Audit
**Inviting You** · User Experience Assessment
**Audited**: 2026-08-29

---

## 1. The Guest Experience (The Invitations)

This is the core product. The UX goal is to elicit a "wow" reaction while ensuring absolute clarity on event logistics.

### Strengths
- **Cinematic Pacing**: The flow of the templates (Hero → Welcome → Date Reveal → Story/Gallery → Events → RSVP) mimics a well-paced film trailer.
- **The Scratch Reveal**: The interactive scratch-off component is a brilliant micro-interaction that forces engagement and makes the digital medium feel tactile.
- **Typography Hierarchy**: Clear distinction between ornamental script (for emotion) and rigid sans-serif/serif (for logistics like times and addresses).

### Weaknesses
- **Audio Autoplay UX**: While the music player exists, browsers block autoplay. The UI forcing the user to tap "Open Invitation" to bypass this is clever, but the audio controls (mute/unmute) are sometimes lost against complex backgrounds.
- **RSVP Form Friction**: If a guest declines, they are still asked for "Guest Count". The form logic should dynamically hide irrelevant fields.
- **Map Links**: Ensure all venue addresses have a highly visible "Get Directions" button utilizing the `mapsUrl` field from the database.

---

## 2. The Admin Experience (The Studio)

This is the internal tool. The UX goal is speed, accuracy, and minimizing data entry errors.

### Strengths
- **Clear Dashboard**: The visual statistics and simple table layout make it easy to see the business state at a glance.
- **Color Coding**: Template statuses (`DRAFT`, `PUBLISHED`, etc.) are clearly color-coded.

### Weaknesses (Critical UX Failures)
- **The "Wall of Inputs"**: The `/admin/weddings/new` route is a massive, scrolling wall of 50+ input fields. This violates modern form design principles.
- **No Data Persistence**: If an admin accidentally hits 'Back' or refreshes while filling out the 4th event, all data is lost.
- **No Live Preview**: Admins must save the form, go to the dashboard, and click the `/i/[slug]` link to see what the invitation actually looks like. There is no split-screen live preview.

## Conclusion
The guest-facing UI is extremely strong and represents the premium nature of the brand. The Admin UI is an MVP that requires a complete overhaul into a step-by-step wizard with a live preview pane.