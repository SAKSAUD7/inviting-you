'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SultanDivider, SultanCrown, SultanLantern } from '../SultanOrnaments'

interface Props {
  photos: string[]
}

export default function SultanGallery({ photos }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  if (!photos || photos.length === 0) return null

  const shown = photos.slice(0, 4)
  const extra = photos.length - 4

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      backgroundColor: 'var(--sultan-midnight)',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Palace BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, filter: 'brightness(0.6)' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(7,20,33,0.3) 0%, rgba(7,20,33,0.88) 80%)' }}/>

      {/* Florals */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.7, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.7, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', opacity: 0.5, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', transform: 'scaleX(-1)', opacity: 0.5, pointerEvents: 'none' }}/>

      {/* Arch frame */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(203,164,93,0.35)', pointerEvents: 'none', borderRadius: '200px 200px 0 0', zIndex: 1 }}/>
      <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(203,164,93,0.18)', pointerEvents: 'none', borderRadius: '190px 190px 0 0', zIndex: 1 }}/>

      {/* Lanterns */}
      <SultanLantern style={{ position: 'absolute', top: '60px', left: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '60px', right: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '680px', margin: '0 auto', padding: '5rem 1.5rem' }}
      >
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <SultanCrown size={38} style={{ marginBottom: '1rem' }}/>
          <div className="sultan-script" style={{ fontSize: '2.5rem', color: 'var(--sultan-champagne)', marginBottom: '0.1rem' }}>The</div>
          <h2 className="sultan-title" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '0.5rem' }}>
            ROYAL PORTRAITS
          </h2>
          <div className="sultan-label" style={{ opacity: 0.7, lineHeight: 1.8 }}>
            BEAUTIFUL MEMORIES<br/>LEADING TO FOREVER
          </div>
          <SultanDivider style={{ margin: '1.5rem auto 0' }} width={200}/>
        </div>

        {/* Gallery grid — matches reference: 1 large left, 3 small right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '200px 200px', gap: '8px' }}>
          
          {/* Large portrait — first photo spans 2 rows */}
          {shown[0] && (
            <motion.div
              className="sultan-gallery-item"
              style={{ gridRow: 'span 2', border: '1px solid rgba(203,164,93,0.5)', position: 'relative' }}
              onClick={() => setSelected(0)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img src={shown[0]} alt="Gallery 1" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
              <div className="sultan-gallery-overlay">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--sultan-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(7,20,33,0.6)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              {/* Inner gold border */}
              <div style={{ position: 'absolute', inset: '5px', border: '1px solid rgba(203,164,93,0.2)', pointerEvents: 'none', zIndex: 2 }}/>
            </motion.div>
          )}

          {/* 3 small photos on right */}
          {shown.slice(1).map((photo, i) => (
            <motion.div
              key={i + 1}
              className="sultan-gallery-item"
              style={{ border: '1px solid rgba(203,164,93,0.5)', position: 'relative' }}
              onClick={() => setSelected(i + 1)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: (i + 1) * 0.12 }}
            >
              <img src={photo} alt={`Gallery ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
              {/* +N overlay on last visible slot */}
              {i === 2 && extra > 0 && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(7,20,33,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2
                }}>
                  <span className="sultan-heading" style={{ fontSize: '2.5rem', color: 'var(--sultan-champagne)', fontStyle: 'normal' }}>+{extra}</span>
                </div>
              )}
              <div className="sultan-gallery-overlay">
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--sultan-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(7,20,33,0.6)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div style={{ position: 'absolute', inset: '4px', border: '1px solid rgba(203,164,93,0.2)', pointerEvents: 'none', zIndex: 2 }}/>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              backgroundColor: 'rgba(7,20,33,0.97)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(12px)'
            }}
          >
            {/* Background arch */}
            <div style={{ position: 'absolute', inset: '2rem', border: '1px solid rgba(203,164,93,0.2)', borderRadius: '200px 200px 0 0', pointerEvents: 'none', backgroundImage: 'url(/images/noor-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07 }}/>
            
            {/* Close */}
            <button onClick={() => setSelected(null)} style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
              background: 'transparent', border: '1px solid var(--sultan-gold)', borderRadius: '50%',
              width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--sultan-champagne)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {/* Prev */}
            <button onClick={() => setSelected((selected - 1 + photos.length) % photos.length)} style={{
              position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: 'rgba(7,20,33,0.6)', border: '1px solid var(--sultan-gold)', borderRadius: '50%',
              width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--sultan-champagne)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            {/* Next */}
            <button onClick={() => setSelected((selected + 1) % photos.length)} style={{
              position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
              background: 'rgba(7,20,33,0.6)', border: '1px solid var(--sultan-gold)', borderRadius: '50%',
              width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--sultan-champagne)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '85vw', maxHeight: '80vh' }}
            >
              <img src={photos[selected]} alt="Enlarged" style={{
                maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain',
                border: '2px solid var(--sultan-gold)', padding: '8px', backgroundColor: 'var(--sultan-midnight)'
              }}/>
              <div style={{ display: 'flex', gap: '8px', marginTop: '1.2rem', overflowX: 'auto', padding: '4px' }}>
                {photos.map((p, i) => (
                  <div key={i} onClick={() => setSelected(i)} style={{
                    width: '52px', height: '52px', flexShrink: 0, cursor: 'pointer',
                    border: i === selected ? '2px solid var(--sultan-gold)' : '2px solid rgba(203,164,93,0.3)',
                    opacity: i === selected ? 1 : 0.5, transition: 'all 0.3s'
                  }}>
                    <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
