import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NoorJasmine, NoorBotanicalStem, NoorGoldLine } from '../NoorOrnaments'

export default function NoorInteractiveDua() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
  }

  return (
    <section className="noor-section" style={{ padding: '8rem 1.5rem', overflow: 'hidden', position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--noor-paper)' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        onClick={handleClick}
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          cursor: clicked ? 'default' : 'pointer',
          position: 'relative',
          zIndex: 2,
          padding: '4rem 2rem',
          backgroundColor: 'var(--noor-white)',
          border: '1px solid var(--noor-gold-soft)',
        }}
      >
        <AnimatePresence mode="wait">
          {!clicked ? (
            <motion.div 
              key="unclicked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '2rem' }}>
                A Moment of Prayer
              </div>
              
              <h2 style={{ fontFamily: 'var(--font-names)', color: 'var(--noor-emerald-deep)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: 400, lineHeight: 1.1 }}>
                Keep Us In<br/>Your Duas
              </h2>
              
              <p style={{ color: 'var(--noor-emerald)', fontFamily: 'var(--font-serif)', fontSize: '1rem', fontStyle: 'italic', marginBottom: '3rem', letterSpacing: '0.05em' }}>
                Tap to send your blessings to the couple.
              </p>
              
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'transparent',
                border: '1px solid var(--noor-gold-champagne)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--noor-gold-champagne)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--noor-gold-champagne)'
                e.currentTarget.style.color = 'var(--noor-white)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--noor-gold-champagne)'
              }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="clicked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}
            >
              <NoorBotanicalStem animated={true} style={{ height: '60px', marginBottom: '1rem' }} />
              
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <NoorJasmine />
              </motion.div>

              <NoorGoldLine active={true} style={{ width: '40px', margin: '2rem auto', opacity: 0.5 }} />

              <h2 style={{ fontFamily: 'var(--font-names)', color: 'var(--noor-emerald-deep)', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', fontWeight: 400 }}>
                Jazakallah Khair
              </h2>
              
              <p style={{ color: 'var(--noor-emerald)', fontFamily: 'var(--font-serif)', fontSize: '1rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
                Your blessings have been beautifully received.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
