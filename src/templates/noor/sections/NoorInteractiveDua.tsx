import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NoorGoldMehrab, NoorIslamicGeometry, NoorJasmineGarland } from '../NoorOrnaments'

export default function NoorInteractiveDua() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (clicked) return
    setClicked(true)
  }

  return (
    <section className="noor-section noor-bg-emerald" style={{ padding: '8rem 1.5rem', overflow: 'hidden', position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Ornaments */}
      <NoorIslamicGeometry style={{ top: '5%', left: '-50px', width: '250px', opacity: 0.1 }} />
      <NoorIslamicGeometry style={{ bottom: '5%', right: '-50px', width: '250px', opacity: 0.1 }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`reveal-hidden ${clicked ? 'noor-dua-active' : ''}`} 
        onClick={handleClick}
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          cursor: clicked ? 'default' : 'pointer',
          position: 'relative',
          transition: 'all 1s ease',
          zIndex: 2
        }}
      >
        <div style={{ position: 'relative' }}>
          
          <NoorGoldMehrab style={{ opacity: clicked ? 1 : 0.6, transition: 'opacity 1s ease' }} />
          
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            
            {/* The Noor Effect Light Wash */}
            {clicked && (
               <motion.div 
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: [0, 1.2, 1.3], opacity: [0, 1, 0] }}
                 transition={{ duration: 3, ease: "easeOut" }}
                 style={{
                   position: 'absolute', inset: '-20%', background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.4), transparent 60%)',
                   zIndex: 0, pointerEvents: 'none', mixBlendMode: 'screen'
                 }} 
               />
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-gold-champagne)', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
                {clicked ? "Jazakallah Khair" : "Keep Us In Your Duas"}
              </h2>
              
              <p style={{ color: 'var(--noor-ivory)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', marginBottom: '2.5rem', letterSpacing: '0.1em', opacity: 0.9 }}>
                {clicked ? "Your blessings have been received." : "Tap to send your Dua and blessings to the couple."}
              </p>
              
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: clicked ? 'var(--noor-gold-champagne)' : 'transparent',
                border: '1px solid var(--noor-gold-champagne)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                color: clicked ? 'var(--noor-emerald-deep)' : 'var(--noor-gold-champagne)',
                boxShadow: clicked ? '0 0 30px rgba(212, 175, 55, 0.5)' : 'none'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={clicked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            
            {/* Blooming Florals on Click */}
            <NoorJasmineGarland className={clicked ? 'revealed' : ''} style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '120px', opacity: 0, transform: 'translateY(20px) rotate(-10deg)', transition: 'all 1.5s ease 0.5s', zIndex: 2 }} />
            <NoorJasmineGarland className={clicked ? 'revealed' : ''} style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '120px', opacity: 0, transform: 'translateY(20px) rotate(10deg) scaleX(-1)', transition: 'all 1.5s ease 0.7s', zIndex: 2 }} />

          </div>
        </div>
        
        <style>{`
          .noor-dua-active .revealed {
            opacity: 1 !important;
            transform: translateY(0) rotate(0) scaleX(var(--sx, 1)) !important;
          }
        `}</style>
      </motion.div>
    </section>
  )
}
