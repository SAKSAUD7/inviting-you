'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WeddingEvent } from '@/types/wedding'
import { SultanDivider, SultanCrown, SultanLantern } from '../SultanOrnaments'

interface Props {
  events: WeddingEvent[]
}

export default function SultanEvents({ events }: Props) {
  const activeEvents = events.filter(e => e.enabled).sort((a, b) => a.order - b.order)
  if (activeEvents.length === 0) return null

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      backgroundColor: 'var(--sultan-midnight)',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0'
    }}>
      {/* Palace BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, filter: 'brightness(0.7)' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(7,20,33,0.2) 0%, rgba(7,20,33,0.88) 80%)' }}/>

      {/* Florals */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.7, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.7, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', opacity: 0.5, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', transform: 'scaleX(-1)', opacity: 0.5, pointerEvents: 'none' }}/>

      {/* Arch frame border */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(203,164,93,0.35)', pointerEvents: 'none', borderRadius: '200px 200px 0 0', zIndex: 1 }}/>
      <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(203,164,93,0.18)', pointerEvents: 'none', borderRadius: '190px 190px 0 0', zIndex: 1 }}/>

      {/* Lanterns */}
      <SultanLantern style={{ position: 'absolute', top: '60px', left: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '60px', right: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '600px', margin: '0 auto', padding: '5rem 1.5rem' }}
      >
        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <SultanCrown size={38} style={{ marginBottom: '1rem' }}/>
          <div className="sultan-script" style={{ fontSize: '2.5rem', color: 'var(--sultan-champagne)', marginBottom: '0.1rem' }}>The</div>
          <h2 className="sultan-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '0.6rem' }}>
            ROYAL CEREMONIES
          </h2>
          <div className="sultan-label" style={{ opacity: 0.7, lineHeight: 1.8 }}>
            JOIN US IN CELEBRATING<br/>OUR SPECIAL DAYS
          </div>
          <SultanDivider style={{ margin: '1.5rem auto 0' }} width={200}/>
        </div>

        {/* Event cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {activeEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, delay: idx * 0.15 }}
              className="sultan-event-card"
            >
              {/* Card photo with arch */}
              <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', backgroundColor: 'var(--sultan-emerald)' }}>
                {/* Image */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'url(/images/noor-hero.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.8
                }}/>
                {/* Arch gradient fade */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--sultan-ivory) 100%)' }}/>
                {/* Gold arch overlay */}
                <svg viewBox="0 0 600 200" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80%', pointerEvents: 'none' }}>
                  <path d="M0 200 L0 100 Q300 -20 600 100 L600 200 Z" fill="var(--sultan-ivory)" opacity="0.15"/>
                  <path d="M0 200 L0 120 Q300 10 600 120 L600 200" stroke="var(--sultan-gold)" strokeWidth="1.5" fill="none" opacity="0.5"/>
                </svg>
                {/* Garland decoration */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100px', height: '150px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.7 }}/>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '150px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.7 }}/>
              </div>

              {/* Card details */}
              <div style={{ backgroundColor: 'var(--sultan-ivory)', padding: '2rem 2.5rem 2.5rem', position: 'relative' }}>
                {/* Parchment texture */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-ivory-paper.png)', backgroundSize: 'cover', opacity: 0.4 }}/>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 className="sultan-heading" style={{ fontSize: '1.8rem', color: 'var(--sultan-brown)', fontStyle: 'normal', textAlign: 'center', marginBottom: '1.5rem' }}>
                    {event.name}
                  </h3>

                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '380px', margin: '0 auto' }}>
                    {event.date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ width: '28px', height: '28px', border: '1px solid var(--sultan-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: 'rgba(203,164,93,0.1)' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        </div>
                        <span className="sultan-body" style={{ fontSize: '0.88rem', color: 'var(--sultan-brown)' }}>
                          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                    {event.timeDisplay && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ width: '28px', height: '28px', border: '1px solid var(--sultan-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: 'rgba(203,164,93,0.1)' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <span className="sultan-body" style={{ fontSize: '0.88rem', color: 'var(--sultan-brown)' }}>{event.timeDisplay}</span>
                      </div>
                    )}
                    {event.description && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                        <div style={{ width: '28px', height: '28px', border: '1px solid var(--sultan-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', backgroundColor: 'rgba(203,164,93,0.1)' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
                        </div>
                        <span className="sultan-body" style={{ fontSize: '0.88rem', color: 'var(--sultan-brown)', lineHeight: 1.6, paddingTop: '2px' }}>{event.description}</span>
                      </div>
                    )}
                    {(event.venueName || event.venueAddress) && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                        <div style={{ width: '28px', height: '28px', border: '1px solid var(--sultan-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', backgroundColor: 'rgba(203,164,93,0.1)' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <div style={{ paddingTop: '2px' }}>
                          {event.venueName && <div className="sultan-body" style={{ fontSize: '0.88rem', color: 'var(--sultan-brown)', fontWeight: 500 }}>{event.venueName}</div>}
                          {event.venueAddress && <div className="sultan-body" style={{ fontSize: '0.82rem', color: 'rgba(42,28,18,0.7)' }}>{event.venueAddress}</div>}
                        </div>
                      </div>
                    )}
                  </div>

                  {event.mapsUrl && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                      <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="sultan-btn-primary">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        VIEW LOCATION
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
