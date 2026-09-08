'use client'
import { useState, useEffect, useCallback } from 'react'

interface Petal {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  color: string
}

function generatePetals(count: number): Petal[] {
  const colors = ['rgba(242,196,196,0.65)', 'rgba(232,212,208,0.55)', 'rgba(247,221,224,0.6)', 'rgba(212,136,138,0.4)']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    size: 8 + Math.random() * 14,
    color: colors[Math.floor(Math.random() * colors.length)],
  }))
}

export default function WalimaBlessings() {
  const [state, setState] = useState<'idle' | 'thankyou'>('idle')
  const [petals] = useState<Petal[]>(() => generatePetals(24))
  const [visible, setVisible] = useState(false)

  const handleBless = useCallback(() => {
    setState('thankyou')
    setTimeout(() => setVisible(true), 50)
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(() => setState('idle'), 700)
  }, [])

  useEffect(() => {
    if (state !== 'thankyou') return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [state, handleClose])

  return (
    <>
      {/* ── Section ── */}
      <section className="walima-blessings-section walima-section-pad">
        <div className="walima-shell walima-reveal" style={{ maxWidth: '560px', textAlign: 'center' }}>

          {/* Top ornament */}
          <div style={{ marginBottom: '24px', opacity: 0.45 }} aria-hidden="true">
            <svg viewBox="0 0 260 28" fill="none" width="220" style={{ maxWidth: '100%' }}>
              <path d="M10 14 Q65 4 130 14 Q195 24 250 14" stroke="#d4888a" strokeWidth="0.8" fill="none" opacity="0.6"/>
              <path d="M40 14 Q85 9 130 14 Q175 19 220 14" stroke="#d4888a" strokeWidth="0.4" fill="none" opacity="0.35"/>
              <circle cx="130" cy="14" r="2.5" fill="#d4888a" opacity="0.7"/>
              <path d="M108 14 L112 10 L116 14 L112 18 Z" fill="#d4888a" opacity="0.5"/>
              <path d="M144 14 L148 10 L152 14 L148 18 Z" fill="#d4888a" opacity="0.5"/>
            </svg>
          </div>

          <span className="walima-eyebrow">With Love</span>
          <h2>Give Us Your Blessings</h2>
          <p>
            Your heartfelt duas and blessings are the greatest gift you can offer this couple as they begin their journey together in faith and love.
          </p>

          <button
            className="walima-blessings-btn"
            onClick={handleBless}
            aria-label="Send your blessings"
          >
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#d4888a" opacity="0.9"/>
            </svg>
            Send Blessings
          </button>

          {/* Bottom ornament */}
          <div style={{ marginTop: '28px', opacity: 0.45 }} aria-hidden="true">
            <svg viewBox="0 0 260 28" fill="none" width="220" style={{ maxWidth: '100%' }}>
              <path d="M10 14 Q65 24 130 14 Q195 4 250 14" stroke="#d4888a" strokeWidth="0.8" fill="none" opacity="0.6"/>
              <circle cx="130" cy="14" r="2.5" fill="#d4888a" opacity="0.7"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── Thank You Overlay ── */}
      {state === 'thankyou' && (
        <div
          className={`walima-blessings-overlay ${visible ? 'is-in' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Thank you for your blessings"
          onClick={handleClose}
        >
          {/* Falling petals */}
          <div className="walima-overlay-petals" aria-hidden="true">
            {petals.map((p) => (
              <div
                key={p.id}
                className="walima-overlay-petal"
                style={{
                  left: `${p.x}%`,
                  '--size': `${p.size}px`,
                  '--delay': `${p.delay}s`,
                  '--dur': `${p.duration}s`,
                  '--color': p.color,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Dialog content */}
          <div
            className="walima-blessings-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner border */}
            <div style={{ position: 'absolute', inset: '10px', border: '1px solid color-mix(in srgb, var(--champagne) 30%, transparent)', pointerEvents: 'none' }} />

            <p className="walima-overlay-dua" lang="ar">
              بَارَكَ اللَّهُ لَكُمَا
            </p>
            <p className="walima-overlay-dua-tr">May Allah bless you both</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '16px auto', opacity: 0.4 }}>
              <div style={{ height: 1, width: 36, background: 'var(--dusty-rose)' }} />
              <span style={{ color: 'var(--dusty-rose)', fontSize: '0.6rem' }}>✦</span>
              <div style={{ height: 1, width: 36, background: 'var(--dusty-rose)' }} />
            </div>

            <h2 className="walima-overlay-thankyou">
              Jazak Allah Khairan
            </h2>
            <p className="walima-overlay-sub">
              Thank you for your heartfelt blessings. We are truly grateful.
            </p>

            <button
              className="walima-overlay-close"
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
