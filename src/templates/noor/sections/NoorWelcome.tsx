import React from 'react'
import { motion } from 'framer-motion'
import { NoorIslamicGeometry, NoorGoldLine, NoorJasmineGarland } from '../NoorOrnaments'

interface Props {
  couple: any
}

export default function NoorWelcome({ couple }: Props) {
  if (!couple) return null

  return (
    <section className="noor-section" style={{ position: 'relative', overflow: 'hidden', padding: '7rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NoorIslamicGeometry style={{ top: 0, left: 0, width: '100%', height: '100%' }} />
      
      {/* ── Botanical top-left spray ── */}
      <NoorJasmineGarland style={{ position: 'absolute', top: '-10%', left: '-10%', width: '280px', opacity: 0.8 }} />

      {/* ── Botanical top-right spray (mirrored) ── */}
      <NoorJasmineGarland style={{ position: 'absolute', top: '-10%', right: '-10%', width: '280px', opacity: 0.8, transform: 'scaleX(-1)' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: '2rem' }}
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L53 47L100 50L53 53L50 100L47 53L0 50L47 47L50 0Z" fill="var(--noor-gold-champagne)" opacity="0.8"/>
        </svg>
      </motion.div>

      {/* Animated Bismillah SVG */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '300px', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 300 100" fill="none" stroke="var(--noor-gold-champagne)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="noor-bismillah-svg">
          <path d="M40 70 Q 60 50 80 70 T 120 70 Q 140 30 160 60 T 200 65 Q 220 40 240 60 T 260 70" />
          <path d="M120 20 L 120 60" />
          <path d="M160 20 L 160 50" />
          <path d="M220 20 L 220 45" />
          <circle cx="80" cy="85" r="2" fill="var(--noor-gold-champagne)" stroke="none" />
          <circle cx="160" cy="80" r="2" fill="var(--noor-gold-champagne)" stroke="none" />
          <circle cx="170" cy="80" r="2" fill="var(--noor-gold-champagne)" stroke="none" />
          <circle cx="240" cy="25" r="2" fill="var(--noor-gold-champagne)" stroke="none" />
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}
      >
        <h3 className="noor-letterpress" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--noor-emerald-deep)' }}>
          {couple.islamicVerse || "In the Name of Allah, The Most Gracious, The Most Merciful"}
        </h3>

        <NoorGoldLine active={true} vertical style={{ height: '50px', margin: '2rem auto' }} />

        <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--noor-ink-light)', fontSize: '0.95rem', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 2 }}>
          {couple.invitationMessage || "With the blessings of our families, we request the honour of your presence at the Nikah of"}
        </p>
      </motion.div>

    </section>
  )
}
