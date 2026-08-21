# ADMIN PORTAL — MASTER IMPLEMENTATION PROMPT

Turn the current admin dashboard into a professional invitation studio.

## DESIGN DIRECTION

The admin must be:

- fast
- clear
- calm
- professional
- desktop-first
- responsive
- information-dense without being cluttered

Do not copy the luxury visual style of the public invitations into the admin.

The admin is a studio tool.

---

# NAVIGATION

Dashboard
Weddings
Templates
Media
Guests
RSVP
Analytics
Domains
Settings

---

# DASHBOARD

Show:

Total Invitations
Published
Drafts
Pending Review
RSVPs
Views
Recent Weddings
Recent Activity

Charts should be useful, not decorative.

---

# WEDDINGS

Table/list:

Couple
Template
Status
Event Date
Views
RSVPs
Updated
Actions

Actions:

Edit
Preview
Publish
Unpublish
Duplicate
QR
Share
Analytics
Archive

---

# NEW WEDDING

Wizard:

01 Basic
02 Couple
03 Family
04 Events
05 Media
06 RSVP
07 Appearance
08 Review
09 Publish

Autosave draft.

Prevent accidental data loss.

---

# WEDDING EDITOR

Use a left navigation:

Overview
Couple
Family
Story
Events
Gallery
Venue
Music
RSVP
SEO
Appearance
Preview
Publish

Right side:

contextual editor

Top:

Save
Preview
Publish

---

# APPEARANCE

Controlled options:

Template
Theme preset
Opening preset
Decoration preset
Motion intensity
Music
Optional sections

Do not expose arbitrary CSS.

---

# TEMPLATE MANAGEMENT

Template table:

Name
Category
Culture
Version
Status
Price
Usage
Updated

Actions:

Preview
Edit Metadata
Duplicate
Create Version
Publish
Archive

---

# TEMPLATE DETAIL

Show:

Design preview
Metadata
Supported sections
Capabilities
Theme
Motion
Decorations
Assets
Versions
Client usage

---

# MEDIA

Organize:

Images
Videos
Audio
Posters
Template assets

Show:

file
dimensions
size
format
usage
uploaded
delete/replace

Validate:

MIME
extension
size

---

# RSVP

Dashboard:

Invited
Attending
Declined
Pending
Seats
By Event

Guest list:

Name
Contact
Events
Seats
Dietary
Response
Message
Created

Export CSV.

---

# ANALYTICS

Per wedding:

views
unique sessions where technically possible
opening started
opening completed
scroll depth
gallery interactions
RSVP starts
RSVP completions
map clicks
music interactions
share clicks
device breakdown
referrer

Respect privacy and do not collect unnecessary data.

---

# SECURITY

Every mutation must be authorized server-side.

Roles:

SUPER_ADMIN
ADMIN
EDITOR

Define exact permissions.

Never trust UI visibility as authorization.

---

# UX

Use:

- keyboard shortcuts only where useful
- confirmation dialogs for destructive actions
- toast feedback
- empty states
- skeletons
- validation
- optimistic UI only where safe
- undo where practical

---

# MOBILE ADMIN

Support tablet/mobile for quick operations, but prioritize desktop productivity.
