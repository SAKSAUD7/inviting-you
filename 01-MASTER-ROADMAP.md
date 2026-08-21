# INVITING YOU — MASTER ROADMAP

## Goal

Take the current MVP to a production-quality premium invitation platform.

---

# PHASE 0 — BASELINE AND SAFETY

Do not add new templates yet.

Tasks:

- inspect repository
- run app locally
- run lint
- run build
- test admin login
- test create wedding
- test edit wedding
- test publish
- test invitation URL
- test RSVP
- test Velvet
- test Noor
- inspect database
- inspect API authorization
- remove placeholder credentials
- validate admin mutations
- validate file uploads
- review environment variables

Deliverable:

`docs/BASELINE.md`

---

# PHASE 1 — INVITATION ENGINE

Create shared infrastructure.

Suggested:

src/invitation/
  core/
  components/
  sections/
  motion/
  decorations/
  media/
  themes/
  types/
  utils/

Extract reusable capabilities from Velvet and Noor.

Do not force templates into identical layouts.

---

# PHASE 2 — TEMPLATE SYSTEM

Improve registry.

Template metadata should eventually include:

- id
- slug
- name
- tagline
- description
- category
- culture
- mood
- style
- price
- priceTier
- features
- preview
- cover
- version
- status
- tags
- designStory
- supportedSections
- capabilities
- theme definition

One source of truth should drive:

- homepage
- gallery
- template pages
- admin
- routing
- live preview
- SEO

---

# PHASE 3 — TEMPLATE VERSIONING

Introduce a safe version model.

Example:

NOOR v1
NOOR v2

Existing clients remain on their selected version.

New clients use the current published version.

Provide controlled migration later.

---

# PHASE 4 — THEME SYSTEM

Create tokens for:

- typography
- colors
- spacing
- radius
- borders
- shadows
- textures
- motion timing
- easing
- backgrounds

Do not expose raw CSS to clients.

Expose controlled theme presets.

---

# PHASE 5 — MOTION ENGINE

Build reusable motion primitives:

- fade
- reveal
- mask
- blur
- scale
- parallax
- text reveal
- image reveal
- curtain
- door
- envelope
- manuscript
- constellation
- scratch
- page turn
- particles
- cinematic intro

Motion should be configurable but each template choreographs it differently.

---

# PHASE 6 — DECORATION ENGINE

Reusable but configurable:

Atmosphere:
- grain
- dust
- haze
- glow
- light leaks
- stars
- fireflies
- petals

Cultural:
- Islamic geometry
- crescent
- lantern
- arch
- diya
- marigold
- lotus
- jharokha
- kasavu-inspired lines
- jasmine

Each template selects a subset and uses unique placement/composition.

---

# PHASE 7 — MEDIA ENGINE

Support:

- responsive images
- WebP/AVIF
- video poster
- mobile/desktop video
- audio
- lazy loading
- preload strategy
- compression
- safe file validation

---

# PHASE 8 — ADMIN PORTAL

Admin sections:

Dashboard
Weddings
Templates
Media
Guests
RSVP
Analytics
Domains
Settings

Wedding editor:

Overview
Couple
Family
Events
Story
Gallery
Venue
Music
RSVP
SEO
Appearance
Opening
Decorations
Preview
Publish

---

# PHASE 9 — TEMPLATE BUILDER FOUNDATION

Build configuration infrastructure first.

Eventually:

New Template
→ metadata
→ section list
→ section order
→ theme
→ motion
→ decorations
→ assets
→ preview
→ publish

Do not build a giant drag-and-drop editor before the schema is stable.

---

# PHASE 10 — NOOR FLAGSHIP

Redesign Noor completely.

Concept:

NOOR — A Moonlit Nikah

Opening:
moon + stars + architecture + names

Sections:
opening
invitation
couple
story
events
gallery
venue
RSVP
closing

Signature moments:
Moon Reveal
Architectural Reveal
Constellation Couple Reveal
Lantern Event Reveal
Moonset Closing

Noor must become the visual benchmark.

---

# PHASE 11 — VELVET REFACTOR

Keep Velvet's visual identity.

Extract reusable:

- scratch
- opening
- gallery
- countdown
- event
- venue
- music
- RSVP
- closing
- particles
- video

Then keep Velvet-specific art direction.

---

# PHASE 12 — FIRST FLAGSHIP COLLECTION

Build 10:

1. Noor — Moonlit Nikah
2. Sultan — Royal Nikah
3. Mehr — Eternal Manuscript
4. Qamar — Under the Crescent
5. Andalus — Garden of Promises
6. Rajwada — Royal Indian
7. Kasavu — Kerala Heritage
8. Afterglow — Golden Hour Editorial
9. The Love Letter — Story-driven
10. The Wedding Film — Cinematic

Do not build all simultaneously.

Finish one to production quality before starting the next.

---

# PHASE 13 — MAIN WEBSITE

Main website should become a luxury showroom.

Sections:

Hero
Featured experience
Template collections
How it works
Features
Live demo
Pricing
Testimonials
FAQ
CTA

Gallery filters:

Culture
Mood
Style
Experience
Region
Occasion

Each template card should have:

- live motion preview
- story
- tags
- experience
- customize/try names

---

# PHASE 14 — TEMPLATE DETAIL PAGES

Each template gets:

- cinematic hero
- live demo
- story
- feature list
- supported events
- mobile preview
- try-your-names
- pricing
- CTA

SEO page per template.

---

# PHASE 15 — LIVE PERSONALIZATION

Allow a visitor to enter:

Bride
Groom
Date

Then render a temporary preview.

No account required.

CTA:

Create this invitation.

---

# PHASE 16 — GUEST/RSVP SYSTEM

Expand RSVP:

Guest
- name
- phone/email
- events
- seats
- dietary
- message
- response
- reminders

Admin:

invited
attending
declined
pending
seats
event breakdown

---

# PHASE 17 — GUEST-SPECIFIC LINKS

Eventually:

/i/noor/saud-ayesha/ahmed

Guest sees:

- personalized greeting
- reserved seats
- selected events
- RSVP state

---

# PHASE 18 — SOCIAL/WHATSAPP

Every invitation gets:

- Open Graph image
- title
- description
- couple names
- date
- QR code
- WhatsApp share
- copy link

Test on:

- WhatsApp
- Instagram link preview where applicable
- iMessage
- Facebook
- Telegram

---

# PHASE 19 — REEL GENERATION

Create a reusable 9:16 promotional scene system.

15 seconds:

Hook
→ opening
→ couple
→ wow moment
→ event
→ CTA

Generate from template assets.

---

# PHASE 20 — CUSTOM DOMAINS

Allow:

brand.com/i/slug

and later:

coupledomain.com

SSL, routing and verification.

---

# PHASE 21 — POST-WEDDING MEMORIES

After the event:

Invitation
→ memories mode

Gallery
guest messages
wedding film
timeline
archive

---

# PHASE 22 — B2B / WHITE LABEL

Target:

- wedding planners
- photographers
- invitation designers
- event agencies

Features:

- organization
- staff
- client workspaces
- branding
- custom domain
- bulk invitations
- white-label
- planner dashboard

---

# PHASE 23 — SELF-SERVICE SAAS

Customer flow:

Discover
→ template
→ try names
→ create account
→ personalize
→ pay
→ publish
→ share

---

# PHASE 24 — AI LATER

Do not make AI a dependency for MVP.

Later:

- template recommendation
- story assistance
- copy suggestions
- photo layout
- personalized design recommendations
- Reel generation
- multilingual assistance

AI should enhance the product, not define its quality.
