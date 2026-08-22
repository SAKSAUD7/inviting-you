import React from 'react'
import { motion } from 'framer-motion'
import { NoorGoldLine, NoorIslamicGeometry, NoorBotanicalCorner } from '../NoorOrnaments'

interface Props {
  events: any[]
}

export default function NoorVenue({ events }: Props) {
  const activeEvents = events?.filter((e) => e.enabled).sort((a, b) => a.order - b.order) || []
  if (activeEvents.length === 0) return null

  // Usually the venue section focuses on the primary event
  const primaryEvent = activeEvents.find(e => e.isPrimary) || activeEvents[0]

  return (
    <section className="noor-section" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 1.5rem', backgroundColor: 'var(--noor-ivory)' }}>
      
      {/* ── Background Ornaments ── */}
      <NoorIslamicGeometry style={{ top: '10%', right: '-50px', width: '400px', opacity: 0.04, filter: 'sepia(1) hue-rotate(90deg)' }} />
      <NoorBotanicalCorner position="top-left" style={{ top: 0, left: 0, opacity: 0.15, pointerEvents: 'none' }} />
      <NoorBotanicalCorner position="bottom-right" style={{ bottom: 0, right: 0, opacity: 0.15, pointerEvents: 'none' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}
      >
        
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '1rem' }}>
          Location
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1.1, margin: '0 0 2rem', fontWeight: 400 }}>
          {primaryEvent.venueName}
        </h2>

        <NoorGoldLine active={true} vertical style={{ height: '40px', margin: '0 auto 2rem', opacity: 0.8 }} />

        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-emerald)', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 auto 3rem', maxWidth: '400px', whiteSpace: 'pre-line' }}>
          {primaryEvent.venueAddress}
        </p>

        {primaryEvent.mapsUrl && (
          <div style={{ marginBottom: '4rem' }}>
            <a href={primaryEvent.mapsUrl} target="_blank" rel="noreferrer" 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
                padding: '1rem 3rem', color: 'var(--noor-emerald-deep)', textDecoration: 'none', 
                textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', 
                border: '1px solid rgba(193, 160, 99, 0.6)', borderRadius: '30px',
                transition: 'all 0.4s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(193, 160, 99, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Get Directions
            </a>
          </div>
        )}

        {/* Minimal Subordinate Map representation (placeholder styling since actual map iframe needs API key) */}
        {primaryEvent.mapsUrl && (
          <div style={{ width: '100%', height: '300px', background: 'var(--noor-ivory-dim)', borderRadius: '8px', border: '1px solid rgba(193, 160, 99, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--noor-emerald)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Map View Available
            </span>
          </div>
        )}

      </motion.div>
    </section>
  )
}
