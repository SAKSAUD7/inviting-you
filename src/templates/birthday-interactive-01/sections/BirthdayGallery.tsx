'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GalleryImage } from '@/types/wedding'

interface Props {
  images: GalleryImage[]
  onComplete: () => void
}

const FALLBACK_IMAGES = [
  { url: '/templates/birthday/hero_bears.png', caption: 'A special memory 💕', altText: 'Photo 1' },
  { url: '/templates/birthday/hero_bears.png', caption: 'Always in my heart ❤️', altText: 'Photo 2' },
  { url: '/templates/birthday/hero_bears.png', caption: 'The best of times 🌸', altText: 'Photo 3' },
]

export default function BirthdayGallery({ images, onComplete }: Props) {
  const displayImages = images.length > 0 ? images : FALLBACK_IMAGES
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const touchStartX = useRef(0)

  const isLast = currentIndex === displayImages.length - 1

  const goNext = () => {
    if (isLast) {
      onComplete()
      return
    }
    setDirection(1)
    setCurrentIndex(i => i + 1)
  }

  const goPrev = () => {
    if (currentIndex === 0) return
    setDirection(-1)
    setCurrentIndex(i => i - 1)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      delta > 0 ? goNext() : goPrev()
    }
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.95 }),
  }

  const img = displayImages[currentIndex]

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ justifyContent: 'space-between', paddingTop: '2rem', paddingBottom: '2rem' }}
    >
      {/* Header */}
      <motion.div
        style={{ textAlign: 'center', zIndex: 10, marginBottom: '0.75rem' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p style={{ fontFamily: 'var(--font-birthday-heading)', fontSize: '1rem', color: '#ff758c', margin: 0, opacity: 0.8 }}>
          Our Beautiful Memories 📷
        </p>
        <h2 style={{ fontSize: '1.8rem', color: '#e05070', margin: '0.25rem 0 0' }}>
          A Gallery of Love
        </h2>
      </motion.div>

      {/* Photo frame */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          padding: '0 0.5rem',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={goNext}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '88%',
              maxWidth: '380px',
              background: 'white',
              borderRadius: '4px',
              padding: '12px 12px 50px 12px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(255,117,140,0.15)',
              display: 'flex',
              flexDirection: 'column',
              transform: `rotate(${currentIndex % 2 === 0 ? -1.5 : 1.5}deg)`,
            }}
          >
            {/* Tape effect */}
            <div style={{
              position: 'absolute',
              top: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 28,
              background: 'rgba(255, 230, 180, 0.7)',
              borderRadius: 4,
              backdropFilter: 'blur(4px)',
            }} />
            
            {/* Photo */}
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '2px',
              overflow: 'hidden',
              background: '#f0ebe5',
            }}>
              <img
                src={img.url}
                alt={img.altText || img.caption || 'Memory'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Caption */}
            <p style={{
              fontFamily: 'var(--font-birthday-heading)',
              fontSize: '1.2rem',
              color: '#594a4e',
              textAlign: 'center',
              marginTop: '0.75rem',
              marginBottom: 0,
              lineHeight: 1.3,
            }}>
              {img.caption || '💕'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 10,
          marginTop: '0.5rem',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {displayImages.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === currentIndex ? 24 : 8,
                background: i === currentIndex ? '#ff758c' : '#ffc0cb',
              }}
              style={{
                height: 8,
                borderRadius: 4,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={(e) => { e.stopPropagation(); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {currentIndex > 0 && (
            <button
              className="birthday-btn"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}
            >
              ← Back
            </button>
          )}
          <motion.button
            className="birthday-btn primary"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLast ? 'Continue 💌' : `Next →`}
          </motion.button>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#d06080', opacity: 0.6, margin: 0 }}>
          {currentIndex + 1} / {displayImages.length} · Tap photo or swipe to navigate
        </p>
      </motion.div>
    </motion.section>
  )
}
