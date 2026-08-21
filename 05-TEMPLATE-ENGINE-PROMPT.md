# TEMPLATE ENGINE — MASTER PROMPT

Create a scalable template engine that can support 50–100+ templates without turning each template into an isolated application.

## PRINCIPLE

Shared engineering.

Unique art direction.

---

# CORE LAYERS

## Content

Wedding data.

## Template

Composition and section choices.

## Theme

Typography/colors/materials.

## Motion

Animation choreography.

## Decoration

Visual atmosphere.

## Media

Images/video/audio.

---

# SHARED COMPONENTS

Build configurable:

InvitationShell
Section
Hero
Couple
Story
Events
EventCard
Countdown
Gallery
Venue
Map
RSVP
Guestbook
Music
Footer
Lightbox
Modal
Button
Image
Video

---

# SECTION CONTRACT

Each section should support:

- enabled
- order
- content
- visual variant
- animation variant
- theme tokens
- responsive behavior

Do not require every template to use every section.

---

# MOTION CONTRACT

Motion presets:

fade
slide
mask
clip
blur
scale
parallax
text
image
particle
cinematic

Each preset should support:

duration
delay
easing
distance
intensity
reducedMotionFallback

---

# DECORATION CONTRACT

Each decoration:

id
type
enabled
opacity
scale
speed
position
color
animation

Examples:

stars
crescent
lantern
petals
grain
dust
geometric
light
fireflies

---

# TEMPLATE CONFIGURATION

Example concept:

{
  "template": "noor",
  "version": 2,
  "theme": "moonlit-ivory",
  "opening": "moon-architecture",
  "sections": [
    "hero",
    "invitation",
    "couple",
    "story",
    "events",
    "gallery",
    "venue",
    "rsvp",
    "closing"
  ],
  "decorations": [
    "stars",
    "lantern-glow",
    "geometry"
  ]
}

Do not blindly use this exact JSON in production; design the type system around the real application.

---

# TEMPLATE CREATION PROCESS

Every new template:

1. concept
2. design brief
3. asset plan
4. section architecture
5. motion storyboard
6. responsive plan
7. implementation
8. QA
9. performance
10. gallery thumbnail
11. template detail page
12. Reel concept

---

# TEMPLATE VERSIONING

Never silently mutate an active client's design.

Use immutable published versions or an equivalent safe strategy.
