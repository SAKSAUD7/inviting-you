import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WeddingData } from '@/types/wedding'
import { NoorBotanicalStem, NoorFlowerSmall, NoorGoldLine, NoorBotanicalCorner, NoorJasmine } from '../NoorOrnaments'

interface Props {
  wedding: WeddingData
  onOpen: () => void
  opened: boolean
}

export default function NoorHero({ wedding, onOpen, opened }: Props) {
  const { couple } = wedding
  const [opening, setOpening] = useState(false)
  const [skipAvailable, setSkipAvailable] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Allow skipping the intro after 2 seconds
  useEffect(() => {
    if (!opened) {
      const timer = setTimeout(() => setSkipAvailable(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [opened])

  // Custom 4-second looping logic
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 4.0) {
      videoRef.current.currentTime = 0.0
    }
  }

  const handleOpen = () => {
    setOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1500) // Slower, softer exit
  }

  return (
    <>
      {/* 1. Botanical Cinematic Reveal Sequence (Phase 04) */}
      <AnimatePresence>
        {!opened && (
          <motion.div 
            className="noor-cinematic-intro"
            style={{ 
              position: 'fixed', inset: 0, zIndex: 9999,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              pointerEvents: opening ? 'none' : 'auto'
            }}
          >
            {/* The Split Doors (Background) */}
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: '-100%', transition: { duration: 1.2, ease: [0.75, 0, 0.25, 1], delay: 0.2 } }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50vh', backgroundColor: 'var(--noor-paper)', borderBottom: '1px solid var(--noor-gold-soft)', zIndex: 1 }}
            />
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: '100%', transition: { duration: 1.2, ease: [0.75, 0, 0.25, 1], delay: 0.2 } }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50vh', backgroundColor: 'var(--noor-paper)', borderTop: '1px solid var(--noor-gold-soft)', zIndex: 1 }}
            />

            {/* The Brilliant Light Burst */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              exit={{ scale: [0, 20], opacity: [0, 1, 0], transition: { duration: 1.4, ease: 'easeOut', times: [0, 0.2, 1] } }}
              style={{ 
                position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', 
                x: '-50%', y: '-50%', 
                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,248,225,0.8) 30%, rgba(255,255,255,0) 70%)', 
                borderRadius: '50%', zIndex: 3, pointerEvents: 'none', mixBlendMode: 'screen'
              }}
            />

            {/* The Content Overlay */}
            <motion.div
              animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.95 : 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }}
            >
              {/* Botanical Signature */}
              <NoorBotanicalStem animated={true} style={{ height: '80px', marginBottom: '-10px' }} />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
                style={{ marginBottom: '2rem' }}
              >
                <NoorJasmine />
              </motion.div>

              {/* Text Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 1.2 } }}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '1.5rem' }}
              >
                You are cordially invited
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1.5 } }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
              >
                <div className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1 }}>
                  {couple?.brideName}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--noor-gold-antique)', fontStyle: 'italic' }}>
                  &
                </div>
                <div className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1 }}>
                  {couple?.groomName}
                </div>
              </motion.div>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '40px', opacity: 1, transition: { delay: 3, duration: 1.2 } }}
                style={{ height: '1px', background: 'var(--noor-gold-champagne)', margin: '2rem 0' }}
              />

              {/* The Gold Seal Button */}
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: skipAvailable ? 1 : 0, scale: skipAvailable ? 1 : 0.8, transition: { duration: 1 } }}
                onClick={handleOpen}
                disabled={!skipAvailable || opening}
                style={{ 
                  marginTop: '2rem', 
                  background: 'transparent',
                  border: 'none',
                  cursor: skipAvailable ? 'pointer' : 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  outline: 'none'
                }}
              >
                <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: 0, border: '1px dashed var(--noor-gold-champagne)', borderRadius: '50%', opacity: 0.5 }}
                  />
                  <div style={{ position: 'absolute', inset: '4px', border: '1px solid var(--noor-gold-soft)', borderRadius: '50%' }} />
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', color: 'var(--noor-emerald-deep)', fontStyle: 'italic' }}>
                    Open
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. The Main Hero Experience */}
      {/* 2. The Main Hero Experience */}
      <section className="noor-section noor-hero-content" style={{ minHeight: '100vh', padding: '15vh 1.5rem 6rem', position: 'relative', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--noor-ivory)', overflow: 'hidden' }}>
        
        {/* Floating Bouquets */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={{ opacity: 0.9, x: 0, y: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1 }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', maxWidth: '400px', pointerEvents: 'none', mixBlendMode: 'multiply', zIndex: 1, maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)', WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)' }}
        >
          <motion.img 
            src="/images/noor_bouquet_isolated.png" 
            alt="" 
            style={{ width: '100%', height: 'auto' }}
            animate={{ y: [0, 15, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={{ opacity: 0.9, x: 0, y: 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
          style={{ position: 'absolute', bottom: '-5%', right: '-10%', width: '60vw', maxWidth: '400px', pointerEvents: 'none', mixBlendMode: 'multiply', transform: 'rotate(180deg)', zIndex: 1, maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)', WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)' }}
        >
          <motion.img 
            src="/images/noor_bouquet_isolated.png" 
            alt="" 
            style={{ width: '100%', height: 'auto' }}
            animate={{ y: [0, -15, 0], rotate: [180, 178, 180] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 30 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Stunning Editorial Image Composition */}
          <NoorGoldLine active={true} vertical style={{ height: '60px', marginBottom: '3rem', opacity: 0.5 }} />

          {/* The Bismillah Graphic */}
          <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '300px' }}>
            <img 
              src="/images/bismillah_gold_transparent.png" 
              alt="Bismillah" 
              style={{ width: '100%', height: 'auto', opacity: 0.9 }} 
            />
          </div>
          
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--noor-emerald)', margin: '0 0 4rem', fontStyle: 'italic', letterSpacing: '0.05em', textAlign: 'center', maxWidth: '400px', lineHeight: 1.8 }}>
            {couple?.invitationMessage || "We request the honour of your presence at the Nikah of"}
          </p>
        
          <h1 className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3.5rem, 12vw, 6rem)', margin: 0, lineHeight: 1, fontWeight: 400, textAlign: 'center' }}>
            {couple?.brideName}
          </h1>
          
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--noor-emerald)', margin: '1rem 0 3rem', textAlign: 'center' }}>
            {couple?.brideQualification || "Daughter"}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '1rem 0 3rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.3 }} />
            <NoorJasmine />
            <div style={{ width: '40px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.3 }} />
          </div>
          
          <h1 className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3.5rem, 12vw, 6rem)', margin: 0, lineHeight: 1, fontWeight: 400, textAlign: 'center' }}>
            {couple?.groomName}
          </h1>
          
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--noor-emerald)', margin: '1rem 0 4rem', textAlign: 'center' }}>
            {couple?.groomQualification || "Son"}
          </div>

          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--noor-emerald)', fontStyle: 'italic', maxWidth: '400px', textAlign: 'center', lineHeight: 1.8 }}>
            as they begin their journey of love, faith, and togetherness.
          </p>

          <NoorGoldLine active={true} vertical style={{ height: '80px', marginTop: '5rem', opacity: 0.5 }} />

        </motion.div>
      </section>
    </>
  )
}
