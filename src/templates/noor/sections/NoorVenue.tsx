'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { NoorJasmine } from '../NoorOrnaments'

interface Props {
  events: any[]
}

// Build a Google Maps search / directions URL from address string
function getMapsUrl(mapsUrl: string | null | undefined, venueName: string, venueAddress: string) {
  if (mapsUrl) return mapsUrl
  const query = encodeURIComponent(`${venueName}, ${venueAddress}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

function EventVenueCard({ event, index }: { event: any; index: number }) {
  const mapsUrl = getMapsUrl(event.mapsUrl, event.venueName, event.venueAddress)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(199,168,107,0.25)',
        borderRadius: '6px',
        padding: 'clamp(1.5rem, 5vw, 2.5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft corner glow */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: 'radial-gradient(circle at top right, rgba(199,168,107,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '80px', height: '80px', background: 'radial-gradient(circle at bottom left, rgba(199,168,107,0.06), transparent 70%)', pointerEvents: 'none' }} />

      {/* Event label */}
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '0.8rem' }}>
        {event.isPrimary ? 'Main Ceremony' : `Event ${index + 1}`}
      </div>

      {/* Event name */}
      <h3 style={{
        fontFamily: 'var(--font-names)',
        fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
        color: 'var(--noor-emerald-deep)',
        fontWeight: 400,
        margin: '0 0 0.8rem',
        lineHeight: 1.1,
        letterSpacing: '0.03em',
      }}>
        {event.name}
      </h3>

      {/* Date & Time */}
      <div style={{ marginBottom: '1.5rem' }}>
        {event.date && (
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.65rem, 2.2vw, 0.78rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--noor-emerald)', fontWeight: 500, marginBottom: '0.35rem' }}>
            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        )}
        {event.timeDisplay && (
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: 'var(--noor-gold-antique)', fontStyle: 'italic' }}>
            {event.timeDisplay}
          </div>
        )}
      </div>

      {/* Hairline divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: '30px', height: '1px', background: 'rgba(199,168,107,0.4)' }} />
        <NoorJasmine style={{ width: '14px', height: '14px' }} />
        <div style={{ width: '30px', height: '1px', background: 'rgba(199,168,107,0.4)' }} />
      </div>

      {/* Venue name */}
      <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: 'var(--noor-emerald-deep)', fontWeight: 400, letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
        {event.venueName}
      </div>

      {/* Venue address */}
      {event.venueAddress && (
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: 'var(--noor-emerald)', lineHeight: 1.8, margin: '0 auto 1.8rem', maxWidth: '320px', whiteSpace: 'pre-line', fontStyle: 'italic' }}>
          {event.venueAddress}
        </p>
      )}

      {/* Google Maps button */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 2rem',
          color: 'var(--noor-emerald-deep)',
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          border: '1px solid rgba(199,168,107,0.5)',
          borderRadius: '30px',
          transition: 'all 0.3s ease',
          background: 'rgba(255,255,255,0.5)',
        }}
        onMouseOver={e => {
          e.currentTarget.style.backgroundColor = 'rgba(199,168,107,0.08)'
          e.currentTarget.style.borderColor = 'rgba(199,168,107,0.8)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)'
          e.currentTarget.style.borderColor = 'rgba(199,168,107,0.5)'
        }}
      >
        {/* Map pin icon */}
        <svg width="12" height="15" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5c-.83 0-1.5-.67-1.5-1.5S5.17 3.5 6 3.5 7.5 4.17 7.5 5 6.83 6.5 6 6.5z" fill="currentColor" opacity="0.7" />
        </svg>
        Open in Google Maps
      </a>
    </motion.div>
  )
}

export default function NoorVenue({ events }: Props) {
  const activeEvents = events?.filter(e => e.enabled).sort((a, b) => a.order - b.order) || []
  if (activeEvents.length === 0) return null

  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #f8f4ea 0%, #fdfaf4 100%)',
      }}
    >
      {/* Botanical top corner */}
      <img src="/images/noor_bouquet_top.png" alt="" style={{ position: 'absolute', top: '-50px', right: '-30px', width: 'clamp(120px, 22vw, 200px)', opacity: 0.3, mixBlendMode: 'multiply', pointerEvents: 'none', transform: 'scaleX(-1)' }} />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '0.8rem' }}>
          The Venue
        </p>
        <h2 style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2rem, 6vw, 3.2rem)', color: 'var(--noor-emerald-deep)', fontWeight: 400, margin: 0, lineHeight: 1.1 }}>
          {activeEvents.length === 1 ? 'Location & Directions' : 'Locations & Directions'}
        </h2>
        <div style={{ width: '40px', height: '1px', background: 'var(--noor-gold-champagne)', margin: '1.2rem auto 0', opacity: 0.5 }} />
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: activeEvents.length > 1 ? 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' : '1fr',
        gap: 'clamp(1.5rem, 4vw, 2.5rem)',
        maxWidth: activeEvents.length === 1 ? '480px' : '900px',
        margin: '0 auto',
      }}>
        {activeEvents.map((event, i) => (
          <EventVenueCard key={event.id || i} event={event} index={i} />
        ))}
      </div>
    </section>
  )
}
