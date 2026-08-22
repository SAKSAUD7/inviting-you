import React from 'react'
import { motion } from 'framer-motion'
import { SultanDivider } from '../SultanOrnaments'

interface Props {
  events: any[]
}

export default function SultanEvents({ events }: Props) {
  const activeEvents = events.filter((e) => e.enabled).sort((a, b) => a.order - b.order)
  
  if (activeEvents.length === 0) return null

  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: 'var(--sultan-crimson)' }}>
      
      <section className="sultan-section" style={{ padding: '8rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <h2 className="sultan-h1">The Royal Ceremonies</h2>
          <SultanDivider style={{ margin: '1.5rem auto' }} />
        </motion.div>

        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {activeEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
              style={{ 
                background: 'rgba(26, 13, 13, 0.4)', // Ink with opacity
                border: '1px solid rgba(193, 154, 91, 0.2)', // Metallic gold
                padding: '3rem 2rem',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ fontFamily: 'var(--font-sultan-display)', color: 'var(--sultan-gold-metallic)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                {new Date(event.date || '').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              
              <h3 className="sultan-h2" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--sultan-gold-bright)' }}>
                {event.name}
              </h3>
              
              <div style={{ fontFamily: 'var(--font-sultan-body)', color: 'var(--sultan-ivory)', fontStyle: 'italic', marginBottom: '2rem' }}>
                {event.timeDisplay}
              </div>
              
              {event.description && (
                <p className="sultan-body-text" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
                  "{event.description}"
                </p>
              )}
              
              <div>
                <strong style={{ display: 'block', fontFamily: 'var(--font-sultan-display)', color: 'var(--sultan-gold-metallic)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {event.venueName}
                </strong>
                <p className="sultan-body-text" style={{ margin: 0, opacity: 0.8 }}>
                  {event.venueAddress}
                </p>
              </div>
              
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
