import React from 'react'
import { motion } from 'framer-motion'
import { SultanArch, SultanDivider } from '../SultanOrnaments'

interface Props {
  opened: boolean
  onOpen: () => void
  data: any
}

export default function SultanHero({ opened, onOpen, data }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'var(--sultan-crimson-dark)', overflow: 'hidden' }}>
      
      {/* 1. The Majestic Palace Door Opening Screen */}
      <motion.div 
        initial={false}
        animate={{ opacity: opened ? 0 : 1, pointerEvents: opened ? 'none' : 'auto' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0, zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'var(--sultan-crimson)',
        }}
      >
        <SultanArch style={{ position: 'absolute', top: 0, width: '100%', height: '50vh', opacity: 0.2 }} />
        
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ textAlign: 'center', zIndex: 2 }}
        >
          <div style={{ fontFamily: 'var(--font-sultan-display)', color: 'var(--sultan-gold-metallic)', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '2rem' }}>
            {data.date ? new Date(data.date).toLocaleDateString('en-US', { year: 'numeric' }) : '2026'}
          </div>
          <h1 style={{ fontFamily: 'var(--font-sultan-display)', color: 'var(--sultan-gold-bright)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '0 0 1rem', letterSpacing: '0.1em' }}>
            {data.bride?.firstName} & {data.groom?.firstName}
          </h1>
          <SultanDivider style={{ margin: '2rem auto' }} />
          <button className="sultan-button" onClick={onOpen}>
            Enter the Palace
          </button>
        </motion.div>
      </motion.div>

      {/* 2. The Grand Reveal */}
      <section className="sultan-section" style={{ minHeight: '100vh', padding: '15vh 1.5rem 6rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: opened ? 1 : 0, scale: opened ? 1 : 0.95 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
          style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}
        >
          <div style={{ fontFamily: 'var(--font-sultan-body)', color: 'var(--sultan-ivory)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '2rem' }}>
            Bismillah ir-Rahman ir-Rahim
          </div>
          
          <div style={{ padding: '3rem 2rem', border: '1px solid rgba(193, 154, 91, 0.3)', borderRadius: '4px', position: 'relative' }}>
            <SultanArch style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '120%', maxWidth: '500px', opacity: 0.1, pointerEvents: 'none' }} />
            
            <h2 style={{ fontFamily: 'var(--font-sultan-heading)', color: 'var(--sultan-gold-bright)', fontSize: 'clamp(3rem, 8vw, 5rem)', margin: '0 0 1rem', fontStyle: 'normal' }}>
              {data.bride?.firstName}
            </h2>
            <div style={{ fontFamily: 'var(--font-sultan-display)', color: 'var(--sultan-gold-metallic)', fontSize: '1.5rem', margin: '1rem 0' }}>
              &
            </div>
            <h2 style={{ fontFamily: 'var(--font-sultan-heading)', color: 'var(--sultan-gold-bright)', fontSize: 'clamp(3rem, 8vw, 5rem)', margin: '0 0 2rem', fontStyle: 'normal' }}>
              {data.groom?.firstName}
            </h2>
            
            <SultanDivider style={{ margin: '3rem auto' }} />
            
            <p style={{ fontFamily: 'var(--font-sultan-body)', color: 'var(--sultan-ivory)', fontSize: '1.1rem', lineHeight: 2, maxWidth: '500px', margin: '0 auto', opacity: 0.9 }}>
              Request the honor of your presence to celebrate their union and bestow your blessings upon them.
            </p>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
