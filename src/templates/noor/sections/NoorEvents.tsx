import React from 'react'
import { motion } from 'framer-motion'
import { NoorGoldLine, NoorBotanicalCrest, NoorBotanicalCorner, NoorFloralDivider } from '../NoorOrnaments'

interface Props {
  events: any[]
}

export default function NoorEvents({ events }: Props) {
  const activeEvents = events.filter((e) => e.enabled).sort((a, b) => a.order - b.order)
  
  if (activeEvents.length === 0) return null

  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: 'var(--noor-paper)' }}>
      
      <section className="noor-section" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '1rem' }}>
            The Ceremonies
          </div>
          <NoorGoldLine active={true} style={{ width: '60px', margin: '0 auto', opacity: 0.5 }} />
        </motion.div>

        {/* The Events List */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8rem' }}>
          
          {activeEvents.map((event, index) => (
            <div key={event.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', padding: '3rem 1.5rem' }}
              >
                {/* Botanical Corners replaced with lush watercolor bouquets */}
                <motion.img 
                  src="/images/noor_bouquet_isolated.png"
                  alt=""
                  style={{ 
                    position: 'absolute', top: '-60px', left: '-60px', width: '220px', 
                    pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.9, zIndex: 0,
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)'
                  }}
                  animate={{ y: [0, 8, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img 
                  src="/images/noor_bouquet_isolated.png"
                  alt=""
                  style={{ 
                    position: 'absolute', bottom: '-60px', right: '-60px', width: '220px', 
                    pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.9, transform: 'rotate(180deg)', zIndex: 0,
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)'
                  }}
                  animate={{ y: [0, -8, 0], rotate: [180, 179, 180] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <NoorBotanicalCrest style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }} />
                  
                {event.isPrimary && (
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '2rem' }}>
                    Main Ceremony
                  </div>
                )}

                <h3 style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: '0 0 2rem', color: 'var(--noor-emerald-deep)', letterSpacing: '0.05em', lineHeight: 1.1, fontWeight: 400 }}>
                  {event.name}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '3rem' }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-emerald)', fontWeight: 500 }}>
                    {new Date(event.date || '').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--noor-gold-antique)', fontStyle: 'italic' }}>
                    {event.timeDisplay}
                  </div>
                </div>

                {event.description && (
                  <p style={{ margin: '0 auto 3rem', maxWidth: '400px', fontSize: '1rem', color: 'var(--noor-emerald-deep)', lineHeight: 2, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                    "{event.description}"
                  </p>
                )}
                
                <div style={{ padding: '0 1rem' }}>
                  <strong style={{ display: 'block', fontSize: '1.2rem', color: 'var(--noor-emerald-deep)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {event.venueName}
                  </strong>
                  <p style={{ fontSize: '1rem', color: 'var(--noor-emerald)', whiteSpace: 'pre-line', lineHeight: 2, maxWidth: '400px', margin: '0 auto' }}>
                    {event.venueAddress}
                  </p>
                </div>

                {event.mapsUrl && (
                  <a href={event.mapsUrl} target="_blank" rel="noreferrer" 
                    style={{ 
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '4rem', 
                      padding: '1rem 3rem', color: 'var(--noor-emerald-deep)', textDecoration: 'none', 
                      textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', 
                      border: '1px solid rgba(193, 160, 99, 0.4)', borderRadius: '30px',
                      transition: 'all 0.4s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(193, 160, 99, 0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    View Map
                  </a>
                )}
              </motion.div>

              {/* Separator between events */}
              {index < activeEvents.length - 1 && (
                <div style={{ margin: '2rem 0', width: '100%', maxWidth: '300px' }}>
                  <NoorFloralDivider variant={2} />
                </div>
              )}

            </div>
          ))}

        </div>
      </section>
    </div>
  )
}
