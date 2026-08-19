'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { GalleryImage } from '@/types/wedding'

interface Props { images: GalleryImage[] }

export default function VelvetGallery({ images }: Props) {
  const [current, setCurrent] = useState(0)
  const [isAuto, setIsAuto] = useState(true)
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef({ x: 0, y: 0 })
  const total = images.length

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + total) % total)
    setIsAuto(false)
    if (pauseRef.current) clearTimeout(pauseRef.current)
    pauseRef.current = setTimeout(() => setIsAuto(true), 5000)
  }, [total])

  useEffect(() => {
    if (!isAuto || total <= 1) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 4500)
    return () => clearInterval(id)
  }, [isAuto, total])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame || total <= 1) return

    const onDown = (e: PointerEvent) => {
      pointerStart.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = (e: PointerEvent) => {
      const dx = pointerStart.current.x - e.clientX
      const dy = pointerStart.current.y - e.clientY
      if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) {
        goTo(dx > 0 ? current + 1 : current - 1)
      }
    }
    frame.addEventListener('pointerdown', onDown)
    frame.addEventListener('pointerup', onUp)
    return () => { frame.removeEventListener('pointerdown', onDown); frame.removeEventListener('pointerup', onUp) }
  }, [current, goTo, total])

  if (total === 0) return null

  return (
    <section className="gallery-section section-pad" aria-label="Gallery">
      <div className="section-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">Our story</span>
          <h2>Moments, softly held</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        <div id="galleryFrame" className="gallery-frame reveal" ref={frameRef}>
          <div id="gallerySlides">
            {images.map((img, i) => (
              <figure
                key={img.id}
                className={`gallery-slide${i === current ? ' is-active' : ''}`}
                aria-hidden={i !== current}
                style={{ display: i === current ? 'block' : 'none', opacity: i === current ? 1 : 0, transition: 'opacity 0.6s' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.altText || img.caption || `Wedding photo ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
                />
                {img.caption && (
                  <figcaption style={{ textAlign: 'center', marginTop: '16px', fontStyle: 'italic', color: 'color-mix(in srgb, var(--plum) 55%, transparent)' }}>
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
          <span className="gallery-corner gallery-corner-a" aria-hidden="true"></span>
          <span className="gallery-corner gallery-corner-b" aria-hidden="true"></span>
        </div>

        {total > 1 && (
          <div id="galleryDots" className="gallery-dots reveal" aria-label="Choose gallery image">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === current ? 'is-active' : ''}
                aria-label={`Show image ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
