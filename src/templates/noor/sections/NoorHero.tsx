import React, { useState, useEffect } from 'react'
import { WeddingData } from '@/types/wedding'
import { NoorArchFrame, NoorBotanicalWatermark, NoorJasmineGarland } from '../NoorOrnaments'

interface Props {
  wedding: WeddingData
  onOpen: () => void
  opened: boolean
}

const getInitial = (name?: string | null) => {
  if (!name) return ''
  const words = name.split(' ')
  const titles = ['syed', 'syeda', 'mohammed', 'muhammad', 'mr', 'mrs', 'dr']
  if (words.length > 1 && titles.includes(words[0].toLowerCase())) {
    return words[1][0]
  }
  return words[0][0]
}

export default function NoorHero({ wedding, onOpen, opened }: Props) {
  const { couple, family } = wedding
  const [opening, setOpening] = useState(false)
  const [videoMounted, setVideoMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setVideoMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpen = () => {
    setOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1200) // Match the 1.2s transition in CSS
  }

  return (
    <>
      {/* 1. The Wax Seal Envelope Sequence */}
      {!opened && (
        <div className={`noor-envelope-wrapper ${opening ? 'is-opening' : ''}`}>
          
          {/* Subtle ivory paper texture for envelope back */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-ivory-paper.png)', backgroundSize: 'cover', opacity: 0.8 }} />

          {/* Envelope Flap (Points downwards, opens upwards) */}
          <div className="noor-envelope-flap">
            {/* Flap Texture */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-ivory-paper.png)', backgroundSize: 'cover', opacity: 0.8 }} />
            {/* Flap Border Detail */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', borderBottom: '2px solid rgba(212,175,55,0.2)', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </div>

          {/* Wax Seal Container (Placed at the tip of the flap) */}
          <div className="noor-wax-seal-container" onClick={handleOpen}>
            
            {/* Top Half of Wax Seal */}
            <div className="noor-wax-seal-half top">
              <div className="noor-wax-seal top-inner">
                <span className="noor-seal-text">{getInitial(couple?.brideName)}&amp;{getInitial(couple?.groomName)}</span>
              </div>
            </div>

            {/* Bottom Half of Wax Seal */}
            <div className="noor-wax-seal-half bottom">
              <div className="noor-wax-seal bottom-inner">
                <span className="noor-seal-text">{getInitial(couple?.brideName)}&amp;{getInitial(couple?.groomName)}</span>
              </div>
            </div>
            
            {/* Pulse instruction text below seal */}
            <div style={{ 
              position: 'absolute', top: '160px', left: '50%', transform: 'translateX(-50%)', 
              color: 'var(--noor-gold-champagne)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              whiteSpace: 'nowrap', animation: 'pulseRing 3s infinite', opacity: opening ? 0 : 0.8,
              transition: 'opacity 0.3s'
            }}>
              Tap to Open
            </div>
          </div>
        </div>
      )}

      {/* 2. The Main Hero Content (The Arch) */}
      <section className="noor-section noor-hero-content" style={{ minHeight: '100vh', padding: '8vh 1.5rem 4rem', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <NoorBotanicalWatermark className="noor-sway-slow" style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '120vw', minWidth: '600px' }} />
        
        <div className="reveal-hidden" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          
          <NoorArchFrame style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Hanging Jasmine Garlands */}
            <NoorJasmineGarland className="noor-sway-slow" style={{ position: 'absolute', top: 0, left: 0, width: '140px', opacity: 0.8, zIndex: 3 }} />
            <NoorJasmineGarland className="noor-sway-slow" style={{ position: 'absolute', top: 0, right: 0, width: '140px', opacity: 0.8, transform: 'scaleX(-1)', zIndex: 3 }} />

            <div className="noor-bismillah noor-light-sweep" style={{ marginTop: '3rem' }}>
              {couple?.islamicVerse || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}
            </div>
            
            <p style={{ position: 'relative', zIndex: 2, fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--noor-muted)', margin: '1rem 0 3rem', fontStyle: 'italic', letterSpacing: '0.05em', textAlign: 'center' }}>
              {couple?.invitationMessage || "We request the honour of your presence at the Nikah of"}
            </p>
          
            <h1 className="noor-name">{couple?.brideName}</h1>
            
            <div className="noor-parents">
              {family?.brideParents ? `Daughter of ${family.brideParents}` : couple?.brideQualification}
            </div>
            
            <div className="noor-ampersand">&</div>
            
            <h1 className="noor-name">{couple?.groomName}</h1>
            
            <div className="noor-parents">
              {family?.groomFather ? `Son of ${family.groomFather}` : couple?.groomQualification}
            </div>

            <p style={{ position: 'relative', zIndex: 2, fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--noor-emerald-deep)', marginTop: '3rem', fontStyle: 'italic', maxWidth: '300px', margin: '3rem auto 0', textAlign: 'center' }}>
              as they begin their journey of love, faith, and togetherness.
            </p>

            <div style={{ position: 'relative', zIndex: 2, marginTop: '3rem', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--noor-gold-champagne)', textAlign: 'center' }}>
              Discover
              <br />
              <span style={{ display: 'inline-block', marginTop: '8px', animation: 'pulseRing 2s infinite' }}>↓</span>
            </div>
          </NoorArchFrame>
        </div>
      </section>
    </>
  )
}
