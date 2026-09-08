'use client'
import React, { useState } from 'react'
import { GalleryImage } from '@/types/wedding'

interface Props { images: GalleryImage[] }

export default function WalimaGallery({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const activeImages = images.sort((a, b) => a.order - b.order)

  if (activeImages.length === 0) return null

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % activeImages.length)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + activeImages.length) % activeImages.length)
    }
  }

  return (
    <>
      <section className="walima-gallery-section walima-section-pad" aria-label="Gallery">
        <div className="walima-shell">
          <header className="walima-section-heading walima-reveal">
            <span className="walima-eyebrow">Our Story</span>
            <h2>Moments, softly held</h2>
            <div className="walima-ornament" aria-hidden="true"><i /></div>
          </header>

          <div className="walima-gallery-grid walima-reveal">
            {activeImages.map((img, idx) => (
              <figure 
                key={img.id} 
                style={{ margin: 0, cursor: 'pointer' }}
                onClick={() => setSelectedIndex(idx)}
              >
                <div className="walima-gallery-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.altText || img.caption || `Wedding photo ${idx + 1}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  {img.caption && (
                    <figcaption className="walima-gallery-caption">
                      {img.caption}
                    </figcaption>
                  )}
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedIndex !== null && (
        <div 
          className="walima-lightbox" 
          onClick={() => setSelectedIndex(null)}
        >
          <button className="walima-lightbox-close" aria-label="Close lightbox">✕</button>
          
          <button className="walima-lightbox-nav prev" onClick={handlePrev} aria-label="Previous image">‹</button>
          
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={activeImages[selectedIndex].url} 
            alt={activeImages[selectedIndex].altText || 'Fullscreen gallery image'} 
            className="walima-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          
          <button className="walima-lightbox-nav next" onClick={handleNext} aria-label="Next image">›</button>

          {activeImages[selectedIndex].caption && (
            <div className="walima-lightbox-caption">
              {activeImages[selectedIndex].caption}
            </div>
          )}
        </div>
      )}
    </>
  )
}
