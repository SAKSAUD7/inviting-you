'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SultanArchHero, SultanMoon, SultanLantern, SultanCrown } from '../SultanOrnaments'

interface Props {
  opened: boolean
  onOpen: () => void
  data: any
}

export default function SultanHero({ opened, onOpen, data }: Props) {
  const coupleNames = data.couple ? `${data.couple.groomName?.split(' ')[0]} & ${data.couple.brideName?.split(' ')[0]}` : 'Ayaan & Zara'
  const displayDate = data.couple?.gregorianDisplay || '12th July 2025'
  const invMsg = data.couple?.invitationMessage || '"Together by His Grace"'

  const [doorsOpening, setDoorsOpening] = useState(false)

  const handleOpen = () => {
    setDoorsOpening(true)
    setTimeout(() => onOpen(), 2800)
  }

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100vh',
      backgroundColor: 'var(--sultan-midnight)',
      overflow: 'hidden'
    }}>

      {/* ── Background palace painting ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/noor-hero.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center bottom',
        opacity: 0.55, filter: 'brightness(0.7) contrast(1.1)'
      }}/>
      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--sultan-midnight) 0%, rgba(7,20,33,0.2) 40%, rgba(7,20,33,0.4) 70%, var(--sultan-midnight) 100%)' }}/>
      {/* Floral corner TL */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '350px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.7, zIndex: 3, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '220px', height: '350px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.7, zIndex: 3, pointerEvents: 'none' }}/>

      {/* ── Grand Arch Frame ── */}
      <div style={{ position: 'absolute', inset: '20px', pointerEvents: 'none', zIndex: 4 }}>
        <SultanArchHero />
      </div>

      {/* ── Hanging Lanterns ── */}
      <SultanLantern style={{ position: 'absolute', top: '6%', left: '12%', zIndex: 5 }}/>
      <SultanLantern style={{ position: 'absolute', top: '10%', right: '12%', zIndex: 5 }}/>
      <SultanLantern style={{ position: 'absolute', top: '3%', left: '26%', transform: 'scale(0.75)', zIndex: 5 }}/>
      <SultanLantern style={{ position: 'absolute', top: '6%', right: '26%', transform: 'scale(0.75)', zIndex: 5 }}/>

      {/* ── Crescent Moon ── */}
      <SultanMoon size={50} style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}/>

      {/* ── Main Text Content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 6,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 2rem'
      }}>
        {/* Crown */}
        <SultanCrown size={50} style={{ marginBottom: '1.2rem' }}/>

        {/* SULTAN */}
        <h1 className="sultan-title" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', letterSpacing: '0.3em', marginBottom: '0.3rem', textShadow: '0 0 40px rgba(203,164,93,0.5)' }}>
          SULTAN
        </h1>
        <div className="sultan-label" style={{ letterSpacing: '0.3em', marginBottom: '14vh', opacity: 0.8 }}>
          A ROYAL WEDDING INVITATION
        </div>

        {/* Couple Names Script */}
        <div className="sultan-script" style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.6)', marginBottom: '0.8rem' }}>
          {coupleNames}
        </div>
        <div className="sultan-title" style={{ fontSize: '0.85rem', letterSpacing: '0.3em', marginBottom: '1.2rem', opacity: 0.85 }}>
          {displayDate}
        </div>
        <div className="sultan-label" style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '0.5rem' }}>
          "TOGETHER"
        </div>
        <div className="sultan-label" style={{ fontSize: '0.6rem', opacity: 0.6, marginBottom: '6vh' }}>
          BY HIS GRACE
        </div>

        {/* Bismillah */}
        <div className="sultan-body" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', opacity: 0.7, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
          Bismillahir Rahmanir Rahim
        </div>
        <div className="sultan-body" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', opacity: 0.55, marginBottom: '2.5rem', fontStyle: 'italic' }}>
          "And We created you in pairs" (Qur&apos;an 78:8)
        </div>

        {/* TAP TO OPEN */}
        <button onClick={handleOpen} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
          color: 'var(--sultan-champagne)', fontFamily: 'var(--font-sultan-display)',
          fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase'
        }}>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              border: '1px solid var(--sultan-gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(203,164,93,0.1)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
          </motion.div>
          TAP TO OPEN
        </button>
      </div>

      {/* ── THE DOORS ── */}
      <AnimatePresence>
        {!doorsOpening && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', pointerEvents: 'none' }}>
            
            {/* Left Door */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 3, ease: [0.25, 1, 0.5, 1] }}
              style={{
                flex: 1, height: '100%',
                backgroundColor: 'var(--sultan-midnight)',
                borderRight: '2px solid var(--sultan-gold)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '10px 0 40px rgba(0,0,0,0.9)'
              }}
            >
              {/* Door texture */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'cover', opacity: 0.3 }}/>
              <div style={{ position: 'absolute', inset: '20px', border: '1px solid rgba(203,164,93,0.3)', borderRight: 'none', borderRadius: '180px 0 0 0' }}/>
              {/* Door handle */}
              <div style={{
                position: 'absolute', top: '48%', right: '28px',
                width: '14px', height: '55px',
                border: '2px solid var(--sultan-gold)', borderRadius: '7px',
                backgroundColor: 'rgba(203,164,93,0.2)', boxShadow: '0 0 12px rgba(203,164,93,0.3)'
              }}/>
            </motion.div>

            {/* Right Door */}
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 3, ease: [0.25, 1, 0.5, 1] }}
              style={{
                flex: 1, height: '100%',
                backgroundColor: 'var(--sultan-midnight)',
                borderLeft: '2px solid var(--sultan-gold)',
                position: 'relative', overflow: 'hidden',
                boxShadow: '-10px 0 40px rgba(0,0,0,0.9)'
              }}
            >
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'cover', opacity: 0.3, transform: 'scaleX(-1)' }}/>
              <div style={{ position: 'absolute', inset: '20px', border: '1px solid rgba(203,164,93,0.3)', borderLeft: 'none', borderRadius: '0 180px 0 0' }}/>
              <div style={{
                position: 'absolute', top: '48%', left: '28px',
                width: '14px', height: '55px',
                border: '2px solid var(--sultan-gold)', borderRadius: '7px',
                backgroundColor: 'rgba(203,164,93,0.2)', boxShadow: '0 0 12px rgba(203,164,93,0.3)'
              }}/>
            </motion.div>

            {/* Light crack */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              exit={{ opacity: [0, 1, 0], scaleX: [0, 1, 20] }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              style={{
                position: 'absolute', left: '50%', top: 0, bottom: 0, width: '3px',
                backgroundColor: 'var(--sultan-champagne)', transform: 'translateX(-50%)',
                filter: 'blur(8px)', boxShadow: '0 0 40px 15px rgba(230,201,138,0.6)'
              }}
            />

            {/* Central OPEN button */}
            <motion.div
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', zIndex: 30, pointerEvents: 'auto'
              }}
            >
              <button onClick={handleOpen} style={{
                background: 'var(--sultan-midnight)', border: '2px solid var(--sultan-gold)',
                color: 'var(--sultan-champagne)', borderRadius: '50%',
                width: '130px', height: '130px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '0.7rem', cursor: 'pointer',
                fontFamily: 'var(--font-sultan-display)', fontSize: '0.7rem', letterSpacing: '0.2em',
                textTransform: 'uppercase',
                boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 25px rgba(203,164,93,0.15)',
                transition: 'all 0.4s ease'
              }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(203,164,93,0.4), inset 0 0 30px rgba(203,164,93,0.3)'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(0,0,0,0.8), inset 0 0 25px rgba(203,164,93,0.15)'}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                OPEN
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
