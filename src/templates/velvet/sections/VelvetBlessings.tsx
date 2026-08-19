'use client'
import { useState, useEffect, useCallback } from 'react'

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  rotation: number
  drift: number
}

function generatePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    size: 8 + Math.random() * 14,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 120,
  }))
}

export default function VelvetBlessings() {
  const [state, setState] = useState<'idle' | 'thankyou'>('idle')
  const [petals] = useState<Petal[]>(() => generatePetals(28))
  const [visible, setVisible] = useState(false)

  const handleBless = useCallback(() => {
    setState('thankyou')
    setTimeout(() => setVisible(true), 50)
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(() => setState('idle'), 800)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (state !== 'thankyou') return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [state, handleClose])

  return (
    <>
      {/* ── Section ── */}
      <section className="blessings-section section-pad">
        <div className="blessings-shell reveal">

          {/* Ornamental top flourish */}
          <div className="blessings-ornament" aria-hidden="true">
            <svg viewBox="0 0 260 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 14 Q65 4 130 14 Q195 24 250 14" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/>
              <path d="M40 14 Q85 9 130 14 Q175 19 220 14" stroke="currentColor" strokeWidth="0.4" fill="none" opacity="0.35"/>
              <circle cx="130" cy="14" r="2.5" fill="currentColor" opacity="0.8"/>
              <circle cx="90"  cy="13" r="1.2" fill="currentColor" opacity="0.5"/>
              <circle cx="170" cy="13" r="1.2" fill="currentColor" opacity="0.5"/>
              <path d="M108 14 L112 10 L116 14 L112 18 Z" fill="currentColor" opacity="0.6"/>
              <path d="M144 14 L148 10 L152 14 L148 18 Z" fill="currentColor" opacity="0.6"/>
            </svg>
          </div>

          <span className="eyebrow">With Love</span>
          <h2 className="blessings-title">Give Us Your Blessings</h2>
          <p className="blessings-body">
            Your heartfelt duas and blessings are the greatest gift you can offer this couple as they begin their journey together in faith and love.
          </p>

          <button
            className="blessings-btn"
            onClick={handleBless}
            aria-label="Send your blessings"
          >
            <span className="blessings-btn-inner">
              <i className="blessings-btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" opacity="0.9"/>
                </svg>
              </i>
              Send Blessings
            </span>
            <span className="blessings-btn-ripple" aria-hidden="true" />
          </button>

          {/* Bottom ornament */}
          <div className="blessings-ornament" aria-hidden="true">
            <svg viewBox="0 0 260 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 14 Q65 24 130 14 Q195 4 250 14" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/>
              <circle cx="130" cy="14" r="2.5" fill="currentColor" opacity="0.8"/>
            </svg>
          </div>

        </div>
      </section>

      {/* ── Thank You Overlay ── */}
      {state === 'thankyou' && (
        <div
          className={`blessings-overlay ${visible ? 'blessings-overlay--in' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Thank you for your blessings"
          onClick={handleClose}
        >
          {/* Falling rose petals */}
          <div className="petals-container" aria-hidden="true">
            {petals.map((p) => (
              <span
                key={p.id}
                className="petal"
                style={{
                  left: `${p.x}%`,
                  '--delay': `${p.delay}s`,
                  '--dur': `${p.duration}s`,
                  '--size': `${p.size}px`,
                  '--rot': `${p.rotation}deg`,
                  '--drift': `${p.drift}px`,
                } as React.CSSProperties}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Gold shimmer ring */}
          <div className="overlay-ring" aria-hidden="true" />

          {/* Content */}
          <div
            className="overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bismillah-style dua */}
            <p className="overlay-dua" lang="ar">
              بَارَكَ اللَّهُ لَكُمَا
            </p>
            <p className="overlay-dua-tr">May Allah bless you both</p>

            <div className="overlay-divider"><span>✦</span></div>

            <h2 className="overlay-thankyou">
              <span>JazakAllah Khairan</span>
            </h2>
            <p className="overlay-sub">
              Thank you for your heartfelt blessings. We are truly grateful.
            </p>

            <button
              className="overlay-close-btn"
              onClick={handleClose}
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
