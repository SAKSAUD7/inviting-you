'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'
import { useEffect, useRef, useState } from 'react'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
  onOpen: () => void
  isOpened: boolean
  isValima: boolean
}

type Phase = 'idle' | 'opening' | 'opened'

export default function WalimaOpening({ couple, onOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [showCard, setShowCard] = useState(false)

  const handleTap = () => {
    if (phase !== 'idle') return
    setPhase('opening')
    onOpen()
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
    // After curtain fully parts (2.4s), show the invitation card
    setTimeout(() => {
      setPhase('opened')
      setTimeout(() => setShowCard(true), 400)
    }, 2400)
  }

  const brideInitial  = couple?.brideName?.charAt(0)  || 'I'
  const groomInitial  = couple?.groomName?.charAt(0)  || 'M'

  return (
    <section
      className={`walima-hero phase-${phase}`}
      onClick={phase === 'idle' ? handleTap : undefined}
      style={{ cursor: phase === 'idle' ? 'pointer' : 'default' }}
    >
      {/* ── Looping video ── */}
      <div className="walima-video-container">
        <video
          ref={videoRef}
          src="/assets/videos/walima-new-hero.mp4"
          playsInline muted loop
          className="walima-grand-video"
          style={{ opacity: phase === 'idle' ? 0 : 1, transition: 'opacity 1.2s ease 1.8s' }}
        />
      </div>

      {/* ══════════ CINEMATIC OPENER ══════════
          A deep-purple full-screen canvas that slides away on tap.
          Rendered entirely in CSS — no images needed.
      ═════════════════════════════════════════ */}
      <div className={`walima-opener-canvas ${phase !== 'idle' ? 'parting' : ''}`} aria-hidden={phase !== 'idle'}>

        {/* Animated bokeh glow orbs */}
        <div className="wo-orb wo-orb-1" />
        <div className="wo-orb wo-orb-2" />
        <div className="wo-orb wo-orb-3" />
        <div className="wo-orb wo-orb-4" />
        <div className="wo-orb wo-orb-5" />

        {/* ── Left curtain panel ── */}
        <div className="wo-panel wo-panel-left">
          <div className="wo-fabric-folds" />
          <div className="wo-gold-trim wo-gold-trim-top" />
          <div className="wo-tassel" />
        </div>

        {/* ── Right curtain panel ── */}
        <div className="wo-panel wo-panel-right">
          <div className="wo-fabric-folds" />
          <div className="wo-gold-trim wo-gold-trim-top" />
          <div className="wo-tassel" />
        </div>

        {/* ── Center seal (only visible when curtains are closed) ── */}
        <div className={`wo-seal ${phase !== 'idle' ? 'wo-seal-fading' : ''}`}>
          {/* Outer glow ring */}
          <div className="wo-seal-glow" />
          {/* Ornate SVG border ring */}
          <svg className="wo-seal-ring" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="94" stroke="url(#goldRing)" strokeWidth="1.5" strokeDasharray="4 3"/>
            <circle cx="100" cy="100" r="86" stroke="url(#goldRing)" strokeWidth="0.5"/>
            {/* 8 decorative diamond points */}
            {[0,45,90,135,180,225,270,315].map(deg => {
              const rad = (deg * Math.PI) / 180
              const x = 100 + 91 * Math.sin(rad)
              const y = 100 - 91 * Math.cos(rad)
              return <circle key={deg} cx={x} cy={y} r="2.5" fill="#d4af70" opacity="0.9"/>
            })}
            <defs>
              <linearGradient id="goldRing" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#8a6a2e"/>
                <stop offset="30%"  stopColor="#d4af70"/>
                <stop offset="60%"  stopColor="#f0d080"/>
                <stop offset="100%" stopColor="#8a6a2e"/>
              </linearGradient>
            </defs>
          </svg>
          {/* Monogram */}
          <div className="wo-monogram">
            {brideInitial} &amp; {groomInitial}
          </div>
          {/* Subtitle */}
          <p className="wo-dawat-label">Dawat-e-Valima</p>
        </div>

        {/* Tap hint */}
        <div className={`wo-tap-hint ${phase !== 'idle' ? 'wo-tap-hint-hidden' : ''}`}>
          <div className="wo-tap-ring" />
          <span>Tap to Open</span>
        </div>
      </div>

      {/* ── Post-open: invitation text floats over video ── */}
      {showCard && (
        <div className="walima-detailed-content active" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
          <div className="replica-bismillah" style={{ color: '#fff', opacity: 0.9 }}>
            In the name of ALLAH the most beneficent &amp; merciful
          </div>
          <h2 className="replica-hosts" style={{ color: '#fff' }}>Mrs. &amp; Mr. Nawaz Ahmed</h2>
          <p className="replica-address" style={{ color: '#eee' }}>
            # 32, 3rd Main, Ayyappa Reddy Garden, LIC Colony, Yeshwantpur, Bangalore-560022
          </p>
          <p className="replica-solicit" style={{ color: '#eee' }}>
            Solicit your gracious presence on the auspicious occasion of Dawat-e-Valima of our son
          </p>

          <div className="replica-person" style={{ textAlign: 'center' }}>
            <h1 className="replica-name gold-foil-ultra" style={{ fontFamily: '"Playfair Display","Cinzel","Cormorant Garamond",serif', fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '2px', fontWeight: 500 }}>
              Mohammed Mufassir
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '-6px', marginBottom: '10px', fontStyle: 'italic' }}>B.Sc.</p>
            <p className="replica-grandparents" style={{ color: '#ddd' }}>
              Paternal Grand S/o Late Janab Abdul Wahab Saheb &nbsp;&nbsp; Maternal Grand S/o Late Janab Syed Yusuf Saheb
            </p>
          </div>

          <div className="replica-with" style={{ color: '#fff' }}>With</div>

          <div className="replica-person" style={{ textAlign: 'center' }}>
            <h1 className="replica-name gold-foil-ultra" style={{ fontFamily: '"Playfair Display","Cinzel","Cormorant Garamond",serif', fontSize: 'clamp(2rem,5vw,3.5rem)', letterSpacing: '2px', fontWeight: 500 }}>
              Iqra Bismi
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '-6px', marginBottom: '10px', fontStyle: 'italic' }}>B.com.</p>
            <p className="replica-parents-hint" style={{ color: '#eee' }}>D/o Mrs. &amp; Mr. MOHAMMED ASIF Saheb</p>
            <p className="replica-grandparents" style={{ color: '#ddd' }}>
              Paternal Grand D/o Janab Haji Abdul Rasheed Saheb &nbsp;&nbsp; Maternal Grand D/o Late Janab Mohammed Ismail Shariff Saheb
            </p>
          </div>

          {/* Animated scroll cue */}
          <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', margin: 0, textShadow: '0 0 12px rgba(203,169,214,0.8)' }}>Scroll</p>
            <svg width="22" height="30" viewBox="0 0 24 32" fill="none">
              <rect x="1" y="1" width="22" height="30" rx="11" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5"/>
              <circle cx="12" cy="9" r="3" fill="rgba(203,169,214,1)">
                <animate attributeName="cy" values="9;20;9" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}
