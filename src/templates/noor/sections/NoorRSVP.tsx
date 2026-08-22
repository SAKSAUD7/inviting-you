import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NoorGoldLine, NoorBotanicalStem, NoorBotanicalCorner } from '../NoorOrnaments'

export default function NoorRSVP() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="noor-section" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 1.5rem', backgroundColor: 'var(--noor-paper)', display: 'flex', justifyContent: 'center' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--noor-white)', border: '1px solid var(--noor-gold-soft)', padding: '4rem 2rem', position: 'relative', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}
      >
        <NoorBotanicalCorner position="top-left" style={{ top: 0, left: 0, opacity: 0.3, pointerEvents: 'none' }} />
        <NoorBotanicalCorner position="bottom-right" style={{ bottom: 0, right: 0, opacity: 0.3, pointerEvents: 'none' }} />
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              style={{ textAlign: 'center' }}
            >
              <h2 style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1.2, margin: '0 0 1rem', fontWeight: 400 }}>
                We Would Love <br />To Celebrate With You
              </h2>
              
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '3rem' }}>
                Kindly Reply by 14 January
              </div>

              <NoorGoldLine active={true} style={{ width: '60px', margin: '0 auto 3rem', opacity: 0.5 }} />

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                
                {/* Name Input */}
                <div style={{ width: '100%', borderBottom: '1px solid var(--noor-gold-champagne)', position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder="M." 
                    required
                    style={{ 
                      width: '100%', padding: '0.5rem 0', background: 'transparent', border: 'none', outline: 'none',
                      fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--noor-emerald-deep)', fontStyle: 'italic'
                    }} 
                  />
                </div>

                {/* Attendance Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <input type="radio" name="attending" value="yes" required style={{ accentColor: 'var(--noor-emerald-deep)' }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--noor-emerald-deep)' }}>
                      Joyfully Accepts
                    </span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <input type="radio" name="attending" value="no" style={{ accentColor: 'var(--noor-emerald-deep)' }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--noor-emerald-deep)' }}>
                      Regretfully Declines
                    </span>
                  </label>
                </div>

                <button 
                  type="submit"
                  style={{ 
                    marginTop: '2rem', width: '100%', padding: '1rem',
                    backgroundColor: 'transparent', color: 'var(--noor-emerald-deep)',
                    border: '1px solid var(--noor-emerald-deep)', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => { 
                    e.currentTarget.style.backgroundColor = 'var(--noor-emerald-deep)'
                    e.currentTarget.style.color = 'var(--noor-white)'
                  }}
                  onMouseOut={(e) => { 
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = 'var(--noor-emerald-deep)'
                  }}
                >
                  Reply
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
              style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '350px' }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <NoorBotanicalStem animated={true} style={{ height: '60px' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1.2, margin: '0 0 1rem', fontWeight: 400 }}>
                Thank You
              </h2>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--noor-emerald)', fontStyle: 'italic' }}>
                Your reply has been beautifully received.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
