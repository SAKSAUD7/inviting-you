import React from 'react'
import { GalleryImage } from '@/types/wedding'

interface Props { images: GalleryImage[] }

export default function VelvetGallery({ images }: Props) {
  const activeImages = images.sort((a, b) => a.order - b.order)

  if (activeImages.length === 0) return null

  return (
    <section className="gallery-section section-pad" aria-label="Gallery">
      <div className="section-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">Our story</span>
          <h2>Moments, softly held</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        <div className="velvet-editorial-gallery reveal">
          {activeImages.map((img, idx) => (
            <figure key={img.id} className="velvet-gallery-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.altText || img.caption || `Wedding photo ${idx + 1}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 50%, rgba(30,0,3,0.5) 100%)' }} />
              {img.caption && (
                <figcaption style={{ 
                  position: 'absolute', bottom: 0, left: 0, right: 0, 
                  padding: '2rem 1rem 1rem', background: 'linear-gradient(to top, rgba(30,0,3,0.8), transparent)',
                  textAlign: 'center', fontStyle: 'italic', color: 'var(--champagne)', fontSize: '0.85rem' 
                }}>
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
