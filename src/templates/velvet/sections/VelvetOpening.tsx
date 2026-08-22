'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'
import { useEffect, useRef } from 'react'
import WeddingMonogram from '../components/WeddingMonogram'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
  onOpen: () => void
  isOpened: boolean
  isValima?: boolean
}

export default function VelvetOpening({ couple, family, onOpen, isOpened, isValima }: Props) {
  // ── Parse monogram field if set (e.g. "Z & A" or "I & M") ──
  const monogramLetters = couple?.monogram
    ? couple.monogram.split(/\s*[&\/]\s*/).map(s => s.trim()).filter(s => s.length === 1)
    : null

  // Helper: find first name-part starting with a given initial across all name parts
  const findPartByInitial = (names: string[], initial: string): string => {
    for (const fullName of names) {
      const parts = fullName.split(/\s+/)
      const match = parts.find(p => p[0]?.toUpperCase() === initial.toUpperCase())
      if (match) return match
    }
    return initial
  }

  const allNames = [couple?.brideName ?? '', couple?.groomName ?? '']

  // Initials & names for the OPENING MARK (before tap)
  const leftInitial  = monogramLetters?.[0] ?? couple?.brideName?.trim()[0]  ?? 'I'
  const rightInitial = monogramLetters?.[1] ?? couple?.groomName?.trim()[0] ?? 'M'
  const leftName  = monogramLetters ? findPartByInitial(allNames, leftInitial)  : (couple?.brideName?.split(' ')[0]  ?? 'Iqra')
  const rightName = monogramLetters ? findPartByInitial(allNames, rightInitial) : (couple?.groomName?.split(' ')[0] ?? 'Mufassir')

  // Name parts for the HERO CONTENT (after tap) — always derived from actual full names
  const brideParts = couple?.brideName?.split(' ') ?? ['Iqra', 'Bismi']
  const groomParts = couple?.groomName?.split(' ')  ?? ['Mohammed', 'Mufassir']
  const brideFn = brideParts[0]
  const groomFn = groomParts[0]

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpened && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [isOpened])

  return (
    <section
      id="hero"
      className={`hero${isOpened ? ' is-open' : ' is-closed'}`}
      role="button"
      tabIndex={0}
      aria-label="Tap to open the wedding invitation"
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen() }}
    >
      {/* Theatrical Curtains */}
      <div className="velvet-curtain-left" aria-hidden="true" />
      <div className="velvet-curtain-right" aria-hidden="true" />

      {/* Background video (revealed when curtains open) */}
      <video
        ref={videoRef}
        id="introVideo"
        className="hero-video"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/images/velvet-hero-poster.webp"
      >
        <source id="introVideoSource" src="/assets/images/velvet-intro.mp4" type="video/mp4" />
      </video>

      {/* Dark gradient veil */}
      <div className="hero-veil" />

      {/* Geometric border frame */}
      <div className="hero-geometry" aria-hidden="true">
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </div>

      {/* ══════════════════════════════════════════════
          OPENING MARK — shows BEFORE the user taps.
          Has: initials, divider, date hint, ripple
          ══════════════════════════════════════════════ */}
      <div id="openingMark" className="opening-mark">

        {/* Top label — dynamic based on event type */}
        <span className="opening-label-top">
          {isValima ? 'Valima Invitation' : 'Nikah Invitation'}
        </span>

        {/* Premium SVG Monogram */}
        <WeddingMonogram brideInitial={leftInitial} groomInitial={rightInitial} />

        {/* Couple name hint */}
        <p className="opening-names-hint">
          {leftName} <span style={{fontStyle:'normal',color:'var(--champagne)',margin:'0 4px'}}>&amp;</span> {rightName}
        </p>

        {/* Date hint */}
        <p className="opening-date-hint">
          {couple?.gregorianDisplay || 'Friday, 2 October 2026'}
        </p>

        {/* Tap prompt */}
        <span className="opening-tap-label" style={{ zIndex: 20, position: 'relative' }}>Tap to open</span>
      </div>

      {/* ══════════════════════════════════════════════
          HERO CONTENT — shows AFTER the user taps.
          ══════════════════════════════════════════════ */}
      <div className="hero-content">
        {/* Bismillah */}
        <p className="bismillah" lang="ar" aria-label="Bismillah">﷽</p>
        <p className="translation">In The Name of Allah, The Most Beneficent, The Most Merciful</p>

        <div className="hero-divider"><span>✦</span></div>

        <p className="hero-welcome">
          We request the honour of your{'\n'}presence at the Nikah of
        </p>

        <div className="couple-names">
          <div>
            <h1 id="brideName">
              <span>{brideFn}</span>
              {brideParts.length > 1 ? ` ${brideParts.slice(1).join(' ')}` : ''}
            </h1>
            <p style={{ marginBottom: 8, letterSpacing: '0.2em' }}>Daughter of</p>
            <strong style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              {family?.brideParents ?? ''}
            </strong>
            {family?.bridePaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.65rem', marginTop: 6, opacity: 0.8, fontStyle: 'italic' }}>
                Paternal Grand D/o. {family.bridePaternalGrandfather}
              </small>
            )}
            {family?.brideMaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.65rem', marginTop: 4, opacity: 0.8, fontStyle: 'italic' }}>
                Maternal Grand D/o. {family.brideMaternalGrandfather}
              </small>
            )}
          </div>

          <span className="name-ampersand">&amp;</span>

          <div>
            <h1 id="groomName">
              <span>{groomFn}</span>
              {groomParts.length > 1 ? ` ${groomParts.slice(1).join(' ')}` : ''}
            </h1>
            <p style={{ marginBottom: 8, letterSpacing: '0.2em' }}>Son of</p>
            <strong style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              {family?.groomFather ?? ''}
            </strong>
            {family?.groomPaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.65rem', marginTop: 6, opacity: 0.8, fontStyle: 'italic' }}>
                Paternal Grand S/o. {family.groomPaternalGrandfather}
              </small>
            )}
            {family?.groomMaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.65rem', marginTop: 4, opacity: 0.8, fontStyle: 'italic' }}>
                Maternal Grand S/o. {family.groomMaternalGrandfather}
              </small>
            )}
          </div>
        </div>

        <p className="hero-closing">
          as they begin their forever in{'\n'}faith and love.
        </p>

        <a
          className="scroll-cue"
          href="#welcome"
          onClick={(e) => e.stopPropagation()}
          aria-label="Scroll to invitation"
        >
          <span>Scroll</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
