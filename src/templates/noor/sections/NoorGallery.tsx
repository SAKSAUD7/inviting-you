import React, { useState } from 'react'
import { GalleryImage } from '@/types/wedding'

interface Props {
  gallery: GalleryImage[]
}

export default function NoorGallery({ gallery }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImages = gallery.sort((a, b) => a.order - b.order)

  if (activeImages.length === 0) return null

  return (
    <section className="noor-section reveal-hidden" style={{ background: 'var(--noor-paper)', paddingBottom: '6rem', position: 'relative' }}>
      
      {/* ── Background Botanical Watermark ── */}
      <svg aria-hidden="true" style={{ position: 'absolute', top: '10%', right: '0', width: '300px', opacity: 0.04, pointerEvents: 'none' }} viewBox="0 0 300 400" fill="none">
        <path d="M300 400 Q200 200 300 0 Q100 100 0 200 Q100 300 300 400" stroke="#1F3624" strokeWidth="2" fill="none"/>
      </svg>

      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--noor-ink-light)', marginBottom: '0.6rem' }}>
          Captured Moments
        </p>
        <h2 className="noor-gold-foil" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0 }}>
          Memories
        </h2>
        <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, var(--noor-gold-champagne), transparent)', margin: '1.5rem auto 0' }} />
      </div>
      
      <div className="noor-gallery" style={{ position: 'relative', padding: '2rem 1rem' }}>
        
        {/* Embossed Ivory Arch Background */}
        <div style={{ 
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', 
          width: 'min(90vw, 800px)', height: '100%', 
          background: 'var(--noor-ivory)', borderRadius: '400px 400px 20px 20px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.03), 0 20px 40px rgba(0,0,0,0.05)',
          border: '1px solid rgba(255,255,255,0.5)',
          zIndex: 0
        }} />

        <div className="noor-gallery__track" style={{ position: 'relative', zIndex: 1 }}>
          {activeImages.map((img, idx) => (
            <figure 
              key={img.id} 
              className={`noor-gallery__slide noor-3d-tilt ${idx === activeIndex ? 'is-active' : ''}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.caption || `Gallery image ${idx + 1}`} style={{ borderRadius: '8px' }} />
              
              {/* Overlapping botanical frame for the active slide */}
              {idx === activeIndex && (
                <svg aria-hidden="true" style={{ position: 'absolute', top: '-10px', left: '-10px', width: '100px', opacity: 0.6, pointerEvents: 'none', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} viewBox="0 0 100 100" fill="none">
                  <path d="M0 0 Q50 0 100 50 Q50 100 0 100 Z" fill="var(--noor-ivory)"/>
                  <path d="M10 50 Q30 30 50 10" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                  <circle cx="50" cy="10" r="3" fill="#1F3624"/>
                </svg>
              )}
            </figure>
          ))}
        </div>
        
        {activeImages.length > 1 && (
          <div className="noor-gallery__dots">
            {activeImages.map((_, idx) => (
              <button 
                key={idx} 
                className={idx === activeIndex ? 'is-active' : ''}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
