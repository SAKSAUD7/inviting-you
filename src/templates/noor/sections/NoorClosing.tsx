import React from 'react'
import { NoorBotanicalWatermark } from '../NoorOrnaments'

interface Props {
  couple: any
}

export default function NoorClosing({ couple }: Props) {
  return (
    <section className="noor-section" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem 8rem', background: 'linear-gradient(to bottom, var(--noor-ivory), var(--noor-pearl))' }}>
      
      {/* Large cinematic floral garden watermark */}
      <NoorBotanicalWatermark 
        className="noor-sway-slow" 
        style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(900px, 150vw)', opacity: 0.05 }} 
      />

      <div className="reveal-hidden" style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>

        {/* Gold diamond ornament */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 2rem' }} aria-hidden="true">
          <polygon points="12,0 15,9 12,18 9,9" fill="#D4AF37" fillOpacity="0.7"/>
          <circle cx="12" cy="9" r="2.5" fill="none" stroke="#D4AF37" strokeWidth="0.8"/>
        </svg>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-ink-light)', marginBottom: '2rem' }}>
          With Love &amp; Blessings
        </p>

        <h2 className="noor-gold-foil" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.1, margin: 0 }}>
          {couple?.brideName}
        </h2>
        <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-gold-champagne)', fontSize: '1.8rem', fontStyle: 'italic', margin: '0.5rem 0' }}>
          &amp;
        </div>
        <h2 className="noor-gold-foil" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.1, margin: 0 }}>
          {couple?.groomName}
        </h2>

        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--noor-gold-champagne), transparent)', margin: '2rem auto' }} />

        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-ink-light)', fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '3rem' }}>
          Thank you for celebrating this blessed occasion with us.
          <br />Your presence, prayers, and blessings mean the world to us.
        </p>

        {/* Bottom Gold Line */}
        <div style={{ width: '100px', height: '1px', background: 'var(--noor-gold-champagne)', margin: '0 auto', opacity: 0.5 }} />
      </div>
    </section>
  )
}
