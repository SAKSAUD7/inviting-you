import React from 'react'
import { motion } from 'framer-motion'
import { NoorBotanicalWatermark } from '../NoorOrnaments'

interface Props {
  family: any
}

export default function NoorBlessings({ family }: Props) {
  if (!family || (!family.parents && !family.grandparents)) return null

  return (
    <section className="noor-section" style={{ padding: '3rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <NoorBotanicalWatermark className="noor-sway-slow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, width: 'min(700px, 120vw)' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '1rem' }}>With The Blessings Of</p>
        <h2 style={{ fontFamily: 'var(--font-names)', color: 'var(--noor-emerald-deep)', fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '0.5rem', fontWeight: 400 }}>
          Our Families
        </h2>
        <div style={{ width: '60px', height: '1px', background: 'var(--noor-gold-champagne)', margin: '1.5rem auto 3.5rem', opacity: 0.6 }} />

        {family.parents && (
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--noor-gold-champagne)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              With the blessings of
            </h3>
            <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-emerald-deep)', fontSize: '1.2rem', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
              {family.parents}
            </p>
          </div>
        )}

        {family.grandparents && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--noor-gold-champagne)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              And grandparents
            </h3>
            <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-emerald-deep)', fontSize: '1.2rem', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
              {family.grandparents}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  )
}
