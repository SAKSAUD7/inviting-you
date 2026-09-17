'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import NoorHero from './sections/NoorHero'
import NoorWelcome from './sections/NoorWelcome'
import NoorCouple from './sections/NoorCouple'
import NoorStory from './sections/NoorStory'
import NoorScratchReveal from './sections/NoorScratchReveal'
import NoorEvents from './sections/NoorEvents'
import NoorVenue from './sections/NoorVenue'
import NoorRSVP from './sections/NoorRSVP'
import NoorGallery from './sections/NoorGallery'
import NoorCountdown from './sections/NoorCountdown'
import NoorInteractiveDua from './sections/NoorInteractiveDua'
import NoorBlessings from './sections/NoorBlessings'
import NoorClosing from './sections/NoorClosing'
import NoorMusicPlayer from './sections/NoorMusicPlayer'
import { NoorJasmine } from './NoorOrnaments'
import './noor.css'

interface Props {
  wedding: any
}

// ── Slim elegant divider ──────────────────────────────────
const NoorDivider = () => (
  <div
    aria-hidden="true"
    style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 2rem', gap: '0.8rem',
      width: '100%', maxWidth: '400px',
      margin: '0 auto',
    }}
  >
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(199,168,107,0.35))', maxWidth: '100px' }} />
    <NoorJasmine style={{ width: '18px', height: '18px', opacity: 0.65 }} />
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(199,168,107,0.35))', maxWidth: '100px' }} />
  </div>
)

// ── Particles ─────────────────────────────────────────────
function NoorParticles() {
  const [petals, setPetals] = useState<{ id: number; left: string; dur: string; delay: string; size: number }[]>([])
  const [motes, setMotes] = useState<{ id: number; left: string; dur: string; delay: string; size: number }[]>([])

  useEffect(() => {
    setPetals(Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: `${8 + Math.random() * 84}vw`,
      dur: `${16 + Math.random() * 14}s`,
      delay: `${Math.random() * 10}s`,
      size: 10 + Math.random() * 7,
    })))
    setMotes(Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${12 + Math.random() * 76}vw`,
      dur: `${11 + Math.random() * 9}s`,
      delay: `${Math.random() * 8}s`,
      size: 3 + Math.random() * 4,
    })))
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {petals.map(p => (
        <div key={`petal-${p.id}`} className="noor-falling-petal" style={{ left: p.left, width: `${p.size}px`, height: `${p.size * 1.2}px`, animationDuration: p.dur, animationDelay: p.delay }} />
      ))}
      {motes.map(m => (
        <div key={`mote-${m.id}`} className="noor-gold-dust" style={{ left: m.left, top: '100%', width: `${m.size}px`, height: `${m.size}px`, animationDuration: m.dur, animationDelay: m.delay }} />
      ))}
    </div>
  )
}

export default function NoorInvitation({ wedding }: Props) {
  const { couple, events, galleryImages, family } = wedding
  const [opened, setOpened] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const primaryEvent = events?.find((e: any) => e.isPrimary) || events?.[0]
  const dateDisplay = primaryEvent?.date
    ? new Date(primaryEvent.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : wedding.couple?.gregorianDisplay?.replace(/\n/g, ' ') || 'Coming Soon'

  // Check if family section has data using the correct DB field names
  const hasFamilyData = !!(
    family?.brideParents ||
    family?.bridePaternalGrandfather ||
    family?.brideMaternalGrandfather ||
    family?.groomFather ||
    family?.groomPaternalGrandfather ||
    family?.groomMaternalGrandfather
  )

  // Scroll reveal on section elements
  useEffect(() => {
    if (!opened) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )
    const elements = mainRef.current?.querySelectorAll('.reveal-hidden')
    elements?.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [opened])

  return (
    <div ref={mainRef} className="noor-shell">
      {opened && <NoorParticles />}

      <NoorHero wedding={wedding} opened={opened} onOpen={() => setOpened(true)} />

      {opened && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="noor-main"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Couple / monogram section */}
          <NoorWelcome couple={couple} />
          <NoorDivider />
          <NoorCouple couple={couple} />

          {/* Story (optional) */}
          {(couple?.story || couple?.howTheyMet) && (
            <>
              <NoorDivider />
              <NoorStory couple={couple} />
            </>
          )}

          {/* ── Our Families — BEFORE scratch reveal ── */}
          {hasFamilyData && (
            <>
              <NoorDivider />
              <NoorBlessings family={family} />
            </>
          )}

          {/* Scratch reveal + countdown */}
          <NoorDivider />
          <NoorScratchReveal dateDisplay={dateDisplay} venueName={primaryEvent?.venueName || undefined} />

          {primaryEvent?.date && (
            <>
              <NoorDivider />
              <NoorCountdown targetDate={new Date(primaryEvent.date)} />
            </>
          )}

          {/* Events */}
          {events && events.length > 0 && (
            <>
              <NoorDivider />
              <NoorEvents events={events} />
            </>
          )}

          {/* Venue + Google Maps */}
          {events && events.length > 0 && (
            <>
              <NoorDivider />
              <NoorVenue events={events} />
            </>
          )}

          {/* RSVP - Disabled for this specific client per request */}
          {wedding.slug !== 'client3-asfiya-zuhaib' && (
            <>
              <NoorDivider />
              <NoorRSVP weddingId={wedding.id} rsvpConfig={wedding.rsvpConfig} />
            </>
          )}

          {/* Gallery */}
          {galleryImages && galleryImages.length > 0 && (
            <>
              <NoorDivider />
              <NoorGallery gallery={galleryImages} />
            </>
          )}

          {/* Interactive dua */}
          <NoorDivider />
          <NoorInteractiveDua />

          {/* Closing */}
          <NoorClosing couple={couple} />

          {/* ── Call to Action / Branding ── */}
          <div style={{
            backgroundColor: '#fff',
            padding: '3rem 1rem 4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            borderTop: '1px solid rgba(199, 168, 107, 0.15)'
          }}>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: '#8b8478',
              letterSpacing: '0.05em',
              margin: 0
            }}>
              Create your own premium digital invitation
            </p>
            <a
              href="https://inviting-you-eta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.6rem 1.5rem',
                border: '1px solid #c7a86b',
                borderRadius: '4px',
                color: '#c7a86b',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                background: 'transparent'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(199, 168, 107, 0.05)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Visit Inviting You
            </a>
          </div>
        </motion.main>
      )}

      <NoorMusicPlayer music={wedding.music} opened={opened} />
    </div>
  )
}
