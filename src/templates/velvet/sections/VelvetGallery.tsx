'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { GalleryImage } from '@/types/wedding'

interface Props { images: GalleryImage[] }

export default function VelvetGallery({ images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<GalleryImage | null>(null)

  const sorted = [...images].sort((a, b) => a.order - b.order)

  return (
    <section className="velvet-gallery">
      <h2 className="velvet-gallery__heading reveal-hidden">Memories</h2>

      <div ref={trackRef} className="velvet-gallery__track">
        {sorted.map((img) => (
          <div
            key={img.id}
            className="velvet-gallery__item"
            onClick={() => setActive(img)}
            role="button"
            tabIndex={0}
            aria-label={img.altText ?? img.caption ?? 'Gallery photo'}
            onKeyDown={(e) => e.key === 'Enter' && setActive(img)}
          >
            <Image
              src={img.url}
              alt={img.altText ?? img.caption ?? 'Wedding photo'}
              fill
              sizes="(max-width: 640px) 80vw, 40vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(26,4,4,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            cursor: 'zoom-out',
          }}
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', width: '100%', height: '100%' }}>
            <Image
              src={active.url}
              alt={active.altText ?? active.caption ?? 'Wedding photo'}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
          {active.caption && (
            <p style={{
              position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--font-elegant)', fontStyle: 'italic',
              color: 'rgba(245,237,216,0.7)', fontSize: '0.95rem',
            }}>
              {active.caption}
            </p>
          )}
          <button
            onClick={() => setActive(null)}
            aria-label="Close"
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              width: '40px', height: '40px', borderRadius: '50%',
              border: '1px solid rgba(201,151,26,0.4)',
              color: 'rgba(212,172,90,0.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', background: 'rgba(26,4,4,0.7)',
            }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  )
}
