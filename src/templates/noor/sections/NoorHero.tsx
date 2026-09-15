'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WeddingData } from '@/types/wedding'
import { NoorJasmine, NoorBotanicalStem } from '../NoorOrnaments'

interface Props {
  wedding: WeddingData
  onOpen: () => void
  opened: boolean
}

type Phase = 'intro' | 'video' | 'card'

function getInitial(name?: string | null) {
  if (!name) return ''
  const words = name.trim().split(' ')
  const skip = ['syed', 'syeda', 'mohammed', 'muhammad', 'mr', 'mrs', 'dr', 'miss']
  if (words.length > 1 && skip.includes(words[0].toLowerCase())) return words[1][0].toUpperCase()
  return words[0][0].toUpperCase()
}

const GOLD = 'linear-gradient(135deg, #bd9a33 0%, #e8d070 35%, #bd9a33 65%, #f5e080 82%, #a68427 100%)'

export default function NoorHero({ wedding, onOpen, opened }: Props) {
  const { couple } = wedding
  const [phase, setPhase] = useState<Phase>('intro')
  const [skipAvailable, setSkipAvailable] = useState(false)
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [videoSkipAvailable, setVideoSkipAvailable] = useState(false)
  const introVideoRef = useRef<HTMLVideoElement>(null)
  const mainVideoRef = useRef<HTMLVideoElement>(null)

  const brideInitial = getInitial(couple?.brideName)
  const groomInitial = getInitial(couple?.groomName)

  // Allow open button after 2.5s on intro
  useEffect(() => {
    if (opened || phase !== 'intro') return
    const t = setTimeout(() => setSkipAvailable(true), 2500)
    return () => clearTimeout(t)
  }, [opened, phase])

  // Allow skip after 3s on video
  useEffect(() => {
    if (phase !== 'video') return
    setVideoSkipAvailable(false)
    const t = setTimeout(() => setVideoSkipAvailable(true), 3000)
    return () => clearTimeout(t)
  }, [phase])

  // Intro video: loop first 5s as ambient bg
  const handleIntroTimeUpdate = () => {
    if (introVideoRef.current && introVideoRef.current.currentTime >= 5) {
      introVideoRef.current.currentTime = 0
    }
  }

  // Curtain opens → play video
  const handleOpen = () => {
    setCurtainOpen(true)
    setTimeout(() => {
      setPhase('video')
      mainVideoRef.current?.play()
    }, 1400)
  }

  // Video ends / skipped → reveal card + onOpen
  const handleVideoEnd = () => { setPhase('card'); onOpen() }
  const handleVideoSkip = () => { mainVideoRef.current?.pause(); setPhase('card'); onOpen() }

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          PHASE 1 — INTRO: Curtain + golden initials + open
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 1.2 } }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              overflow: 'hidden',
              pointerEvents: curtainOpen ? 'none' : 'auto',
            }}
          >
            {/* Looping ambient video */}
            <video
              ref={introVideoRef}
              src="/assets/videos/fda9e49a1880e12f29d1db747d76270d_720w.mp4"
              autoPlay muted playsInline
              onTimeUpdate={handleIntroTimeUpdate}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, zIndex: 0 }}
            />
            {/* Warm vignette */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at 50% 45%, rgba(248,244,234,0.5) 0%, rgba(248,244,234,0.9) 100%)', pointerEvents: 'none' }} />

            {/* TOP curtain */}
            <motion.div
              animate={{ y: curtainOpen ? '-100%' : '0%' }}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', backgroundColor: 'var(--noor-paper)', zIndex: 5 }}
            />

            {/* BOTTOM curtain */}
            <motion.div
              animate={{ y: curtainOpen ? '100%' : '0%' }}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', backgroundColor: 'var(--noor-paper)', zIndex: 5 }}
            />

            {/* Centre content — shifted slightly above centre so names clear the curtain seam */}
            <motion.div
              animate={{ opacity: curtainOpen ? 0 : 1, scale: curtainOpen ? 0.97 : 1 }}
              transition={{ duration: 0.45 }}
              style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 1.5rem', textAlign: 'center', transform: 'translateY(-5%)' }}
            >
              <NoorBotanicalStem animated style={{ height: '52px', marginBottom: '-4px' }} />

              {/* Golden initials ring */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(199,168,107,0.35)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(199,168,107,0.2)', borderRadius: '50%' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.05rem', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.6rem, 11vw, 4rem)', lineHeight: 1, background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))' }}>{brideInitial}</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--noor-gold-champagne)', fontStyle: 'italic', margin: '0 0.15rem', lineHeight: 1, opacity: 0.6 }}>&</span>
                  <span style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.6rem, 11vw, 4rem)', lineHeight: 1, background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))' }}>{groomInitial}</span>
                </div>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.9 }}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '0.6rem' }}>
                You are cordially invited
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.3rem, 5.5vw, 2rem)', background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{couple?.brideName}</span>
                <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-gold-antique)', fontStyle: 'italic', fontSize: '0.85rem' }}>&</span>
                <span style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.3rem, 5.5vw, 2rem)', background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{couple?.groomName}</span>
              </motion.div>

              <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: '36px', opacity: 1 }} transition={{ delay: 2.4, duration: 0.9 }}
                style={{ height: '1px', background: 'var(--noor-gold-champagne)', marginBottom: '2rem' }} />

              {/* Open button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: skipAvailable ? 1 : 0, scale: skipAvailable ? 1 : 0.85 }}
                transition={{ duration: 0.7 }}
                onClick={handleOpen}
                disabled={!skipAvailable || curtainOpen}
                style={{ background: 'transparent', border: 'none', cursor: skipAvailable ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', outline: 'none' }}
              >
                <div style={{ position: 'relative', width: '68px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(199,168,107,0.45)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', inset: '5px', border: '1px solid rgba(199,168,107,0.2)', borderRadius: '50%' }} />
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.7rem', color: 'var(--noor-emerald-deep)', fontStyle: 'italic', position: 'relative', zIndex: 1 }}>Open</span>
                </div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', opacity: 0.65 }}>Tap to reveal</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          PHASE 2 — VIDEO: Full-screen cinematic playback
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {phase === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.6 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9998, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <video
              ref={mainVideoRef}
              src="/assets/videos/fda9e49a1880e12f29d1db747d76270d_720w.mp4"
              autoPlay muted={false} playsInline
              onEnded={handleVideoEnd}
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)', pointerEvents: 'none', zIndex: 1 }} />

            {/* Names overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1.2 }}
              style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, textAlign: 'center', zIndex: 2, pointerEvents: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                <div style={{ width: '30px', height: '1px', background: 'rgba(199,168,107,0.5)' }} />
                <span style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1rem, 4vw, 1.5rem)', background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{couple?.brideName}</span>
                <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-gold-champagne)', fontStyle: 'italic', opacity: 0.7, fontSize: '0.9rem' }}>&</span>
                <span style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1rem, 4vw, 1.5rem)', background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{couple?.groomName}</span>
                <div style={{ width: '30px', height: '1px', background: 'rgba(199,168,107,0.5)' }} />
              </div>
            </motion.div>

            {/* Skip button */}
            <AnimatePresence>
              {videoSkipAvailable && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={handleVideoSkip}
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(199,168,107,0.35)', borderRadius: '20px', color: 'rgba(199,168,107,0.85)', fontFamily: 'var(--font-sans)', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', padding: '0.5rem 1.1rem', cursor: 'pointer', backdropFilter: 'blur(6px)' }}
                >
                  Skip →
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          PHASE 3 — CARD: Full-screen arch background + content
          The user-provided arch/chandelier image fills the screen.
          Invitation details float in the lower arch opening.
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: '100svh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Arch background — full screen, portrait-optimised */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/noor_arch_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }} />

        {/* Soft warm gradient at bottom to improve text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 42%, rgba(252,248,238,0.2) 65%, rgba(245,238,222,0.55) 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── Invitation text block — sits in the lower arch area ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 28 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'relative', zIndex: 3,
            width: '100%', maxWidth: '400px',
            margin: '38vh auto 0',
            padding: '0 clamp(1.2rem, 5vw, 2rem) 2rem',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center',
            gap: '0.42rem',
          }}
        >

          {/* Invitation message */}
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.7rem, 3vw, 0.92rem)',
            color: '#4a5e3a',
            fontStyle: 'italic',
            lineHeight: 1.7,
            margin: 0,
            textShadow: '0 1px 4px rgba(255,255,255,0.9)',
          }}>
            {couple?.invitationMessage || 'Request the honour of your gracious presence at the Nikah of'}
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.7 }} />
            <NoorJasmine style={{ width: '16px', height: '16px' }} />
            <div style={{ width: '28px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.7 }} />
          </div>

          {/* Bride */}
          <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.55rem, 8vw, 2.4rem)', lineHeight: 1.0, background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 6px rgba(255,255,255,0.7))' }}>
            {couple?.brideName}
          </div>
          {couple?.brideQualification && (
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.55rem, 2.2vw, 0.68rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a5e3a', opacity: 0.85, textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}>
              {couple.brideQualification}
            </div>
          )}

          {/* & */}
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', color: 'var(--noor-gold-antique)', fontStyle: 'italic', lineHeight: 1, filter: 'drop-shadow(0 1px 3px rgba(255,255,255,0.7))' }}>
            &amp;
          </div>

          {/* Groom */}
          <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.55rem, 8vw, 2.4rem)', lineHeight: 1.0, background: GOLD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 6px rgba(255,255,255,0.7))' }}>
            {couple?.groomName}
          </div>
          {couple?.groomQualification && (
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.55rem, 2.2vw, 0.68rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a5e3a', opacity: 0.85, textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}>
              {couple.groomQualification}
            </div>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.7 }} />
            <NoorJasmine style={{ width: '16px', height: '16px' }} />
            <div style={{ width: '28px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.7 }} />
          </div>

          {/* Date / Time / Venue */}
          {wedding.events?.[0] && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
              {wedding.events[0].date && (
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.54rem, 2.3vw, 0.7rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4a5e3a', opacity: 0.9, lineHeight: 1.4, textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}>
                  {new Date(wedding.events[0].date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}
              {wedding.events[0].timeDisplay && (
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(0.76rem, 3.2vw, 1rem)', color: 'var(--noor-gold-antique)', fontStyle: 'italic', lineHeight: 1.2, filter: 'drop-shadow(0 1px 3px rgba(255,255,255,0.6))' }}>
                  {wedding.events[0].timeDisplay}
                </div>
              )}
              {wedding.events[0].venueName && (
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.54rem, 2.2vw, 0.68rem)', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4a5e3a', opacity: 0.9, lineHeight: 1.3, textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}>
                  {wedding.events[0].venueName}
                </div>
              )}
            </div>
          )}

          {/* Scroll cue */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', marginTop: '0.8rem' }}
          >
            <div style={{ width: '1px', height: '26px', background: 'linear-gradient(to bottom, rgba(199,168,107,0.7), transparent)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(180,140,60,0.8)' }}>
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
