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
  hasNikah?: boolean
}

export default function VelvetOpening({ couple, family, onOpen, isOpened, isValima, hasNikah }: Props) {
  // ── Parse monogram field if set (e.g. "Z & A" or "I & M") ──
  const monogramLetters = couple?.monogram
    ? couple.monogram.split(/\s*[&\/]\s*/).map(s => s.trim()).filter(s => s.length === 1)
    : null

  // Helper: extract primary name part (skipping common prefixes like Mohammed)
  const getPrimaryName = (names: string[], initial: string, fullName?: string): string => {
    const fallback = fullName ? fullName.split(' ')[0] : ''
    
    // If monogram is present, find matching initial
    if (initial) {
      for (const name of names) {
        const parts = name.split(/\s+/)
        // Check if there's a part matching the initial (skip Mohammed if it also matches but there's another match)
        const match = parts.find(p => p[0]?.toUpperCase() === initial.toUpperCase() && p.toLowerCase() !== 'mohammed')
        if (match) return match
        // Fallback to Mohammed if it's the only match
        const backup = parts.find(p => p[0]?.toUpperCase() === initial.toUpperCase())
        if (backup) return backup
      }
    }
    
    // If no monogram or no match, just skip Mohammed prefix if possible
    if (fullName) {
      const parts = fullName.split(/\s+/)
      if (parts.length > 1 && (parts[0].toLowerCase() === 'mohammed' || parts[0].toLowerCase() === 'md.')) {
        return parts[1]
      }
    }
    return fallback
  }

  const allNames = [couple?.brideName ?? '', couple?.groomName ?? '']

  // Initials & names for the OPENING MARK (before tap)
  const leftInitial  = monogramLetters?.[0] ?? couple?.brideName?.trim()[0]  ?? 'I'
  const rightInitial = monogramLetters?.[1] ?? couple?.groomName?.trim()[0] ?? 'M'
  const leftName  = getPrimaryName(allNames, monogramLetters ? leftInitial : '', couple?.brideName ?? 'Iqra')
  const rightName = getPrimaryName(allNames, monogramLetters ? rightInitial : '', couple?.groomName ?? 'Mufassir')

  // Name parts for the HERO CONTENT (after tap) — always derived from actual full names
  const brideParts = couple?.brideName?.split(' ') ?? ['Iqra', 'Bismi']
  const rawGroomParts = couple?.groomName?.split(' ')  ?? ['Mohammed', 'Mufassir']
  // Abbreviate 'Mohammed' prefix to 'Md.' for display so the name fits on mobile
  const groomParts = rawGroomParts[0]?.toLowerCase() === 'mohammed'
    ? ['Md.', ...rawGroomParts.slice(1)]
    : rawGroomParts
  const brideFn = brideParts[0]
  const groomFn = groomParts[0]

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpened && videoRef.current) {
      videoRef.current.play().catch(() => {})
      
      // Auto-scroll hint after curtain animation finishes
      setTimeout(() => {
        window.scrollBy({ top: window.innerHeight * 0.15, behavior: 'smooth' })
      }, 2500)
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
          {hasNikah && isValima ? 'Nikah & Reception Invitation' : isValima ? 'Reception Invitation' : 'Nikah Invitation'}
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
        {/* Bismillah — only shown if islamicVerse is set */}
        {couple?.islamicVerse === 'ENGLISH_ONLY' ? (
          <p className="translation">In The Name of Allah, The Most Beneficent, The Most Merciful</p>
        ) : couple?.islamicVerse ? (
          <>
            <p className="bismillah" lang="ar" aria-label="Bismillah">﷽</p>
            <p className="translation">In The Name of Allah, The Most Beneficent, The Most Merciful</p>
          </>
        ) : null}

        <div className="hero-divider"><span>✦</span></div>

        {family?.groomFather && family?.brideParents ? (
          <div className="hero-parents-invite" style={{ marginBottom: '2rem' }}>
            <strong style={{ display: 'block', fontSize: '0.85rem', letterSpacing: '0.05em', color: 'var(--ivory)' }}>
              {family.groomFather}
            </strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--champagne)', margin: '4px 0' }}>&amp;</span>
            <strong style={{ display: 'block', fontSize: '0.85rem', letterSpacing: '0.05em', color: 'var(--ivory)' }}>
              {family.brideParents}
            </strong>
            <p className="hero-welcome" style={{ marginTop: '1rem', marginBottom: 0 }}>
              solicit your gracious presence with family and friends on the auspicious occasion of the wedding of our children
            </p>
          </div>
        ) : (
          <p className="hero-welcome">
            We request the honour of your{'\n'}presence at the {hasNikah && isValima ? 'Nikah & Valima' : isValima ? 'Valima' : 'Nikah'} of
          </p>
        )}

        <div className="couple-names">
          {/* GROOM (Left) */}
          <div>
            <h1 id="groomName" style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontWeight: 400,
              color: '#c9a96e', 
              textShadow: '0 1px 8px rgba(201,169,110,0.4)',
              letterSpacing: '0.04em',
              lineHeight: 1.2,
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              marginBottom: 8,
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}>
              {groomParts.join(' ')}
              {couple?.groomQualification && (
                <span style={{ fontSize: '0.45em', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--champagne)', fontFamily: 'var(--font-sans)', marginLeft: '6px' }}>
                  , {couple.groomQualification}
                </span>
              )}
            </h1>
            {family?.groomPaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.58rem', marginTop: 6, opacity: 0.8, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Paternal Grand S/o. {family.groomPaternalGrandfather}
              </small>
            )}
            {family?.groomMaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.58rem', marginTop: 4, opacity: 0.8, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Maternal Grand S/o. {family.groomMaternalGrandfather}
              </small>
            )}
          </div>

          <span className="name-ampersand" style={{ color: '#c9a96e', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>&amp;</span>

          {/* BRIDE (Right) */}
          <div>
            <h1 id="brideName" style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontWeight: 400,
              color: '#c9a96e', 
              textShadow: '0 1px 8px rgba(201,169,110,0.4)',
              letterSpacing: '0.04em',
              lineHeight: 1.2,
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              marginBottom: 8,
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}>
              {brideParts.join(' ')}
              {couple?.brideQualification && (
                <span style={{ fontSize: '0.45em', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--champagne)', fontFamily: 'var(--font-sans)', marginLeft: '6px' }}>
                  , {couple.brideQualification}
                </span>
              )}
            </h1>
            {family?.bridePaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.58rem', marginTop: 6, opacity: 0.8, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Paternal Grand D/o. {family.bridePaternalGrandfather}
              </small>
            )}
            {family?.brideMaternalGrandfather && (
              <small style={{ display: 'block', fontSize: '0.58rem', marginTop: 4, opacity: 0.8, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Maternal Grand D/o. {family.brideMaternalGrandfather}
              </small>
            )}
          </div>
        </div>

        <p className="hero-closing" style={{ marginTop: '2rem' }}>
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
