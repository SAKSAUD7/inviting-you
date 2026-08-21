import React from 'react'
import { motion } from 'framer-motion'
import { NoorGoldLine, NoorGoldMehrab, NoorJasmineGarland, NoorArchFrame } from '../NoorOrnaments'

interface Props {
  events: any[]
}

export default function NoorEvents({ events }: Props) {
  const activeEvents = events.filter((e) => e.enabled).sort((a, b) => a.order - b.order)
  
  if (activeEvents.length === 0) return null

  const primaryEvent = activeEvents.find(e => e.isPrimary) || activeEvents[0]
  const secondaryEvents = activeEvents.filter(e => e.id !== primaryEvent.id)

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      
      {/* ── THE CLIMAX: MEHFIL-E-NIKAH ── */}
      <section className="noor-section noor-bg-emerald" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 1.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Floating dust over the Nikah section */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1), transparent 70%)' }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 2 }}
        >
          <NoorArchFrame style={{ minHeight: '70vh', padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'transparent' }}>
            
            {/* Hanging florals */}
            <NoorJasmineGarland className="noor-sway-slow" style={{ position: 'absolute', top: 0, left: '-20px', width: '160px', opacity: 0.9, zIndex: 3 }} />
            <NoorJasmineGarland className="noor-sway-slow" style={{ position: 'absolute', top: 0, right: '-20px', width: '160px', opacity: 0.9, transform: 'scaleX(-1)', zIndex: 3 }} />

            <h3 className="noor-gold-foil" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '2rem 0', letterSpacing: '0.05em' }}>
              {primaryEvent.name || 'Mehfil-e-Nikah'}
            </h3>

            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-ivory)', marginBottom: '1rem', fontWeight: 500 }}>
              {new Date(primaryEvent.date || '').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--noor-gold-champagne)', fontStyle: 'italic', marginBottom: '3rem' }}>
              {primaryEvent.timeDisplay || 'After Namaz-e-Asar'}
            </div>

            <div style={{ width: '80px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.5, margin: '0 auto 2rem' }} />

            <strong style={{ display: 'block', fontSize: '1.3rem', color: 'var(--noor-ivory)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.05em' }}>
              {primaryEvent.venueName}
            </strong>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line', lineHeight: 1.8, maxWidth: '400px', margin: '0 auto' }}>
              {primaryEvent.venueAddress}
            </p>

            {primaryEvent.mapsUrl && (
              <a href={primaryEvent.mapsUrl} target="_blank" rel="noreferrer" 
                style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '3rem', 
                  padding: '1rem 3rem', color: 'var(--noor-ivory)', textDecoration: 'none', 
                  textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', 
                  border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '2px',
                  transition: 'all 0.4s ease', position: 'relative', zIndex: 10
                }}
              >
                Directions
              </a>
            )}
          </NoorArchFrame>
        </motion.div>
      </section>

      {/* ── SECONDARY EVENTS ── */}
      {secondaryEvents.length > 0 && (
        <section className="noor-section noor-shell" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--noor-ink-light)', marginBottom: '0.6rem' }}>
              Continued Celebrations
            </p>
          </motion.div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            
            {/* ── Gold vertical timeline ── */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>
              <NoorGoldLine active={true} vertical style={{ height: '100%', width: '1px' }} />
            </div>

            {secondaryEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', maxWidth: '560px', position: 'relative' }}
              >
                
                <div className="noor-event-card" style={{ position: 'relative', background: 'rgba(253, 252, 247, 0.9)', backdropFilter: 'blur(10px)' }}>
                  
                  {/* Event number badge */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--noor-gold-champagne)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--noor-gold-champagne)' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <h3 className="noor-event-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--noor-ink)', margin: '0 0 1rem' }}>
                    {event.name}
                  </h3>
                  
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-emerald-deep)', marginBottom: '0.75rem', fontWeight: 500 }}>
                    {new Date(event.date || '').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--noor-gold-antique)', fontStyle: 'italic', marginBottom: '2rem' }}>
                    {event.timeDisplay}
                  </div>

                  {event.description && <p style={{ margin: '0 auto 1.5rem', maxWidth: '400px', fontSize: '0.92rem', color: 'var(--noor-ink-light)', lineHeight: 1.7, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>{event.description}</p>}
                  
                  <div style={{ borderTop: '1px solid var(--noor-gold-whisper)', paddingTop: '1.5rem' }}>
                    <strong style={{ display: 'block', fontSize: '1.15rem', color: 'var(--noor-emerald)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>{event.venueName}</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--noor-ink-light)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{event.venueAddress}</p>
                  </div>

                  {event.mapsUrl && (
                    <a href={event.mapsUrl} target="_blank" rel="noreferrer" 
                      style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--noor-gold-champagne)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.72rem' }}
                    >
                      View Location
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
